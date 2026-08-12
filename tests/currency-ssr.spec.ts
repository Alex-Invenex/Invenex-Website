import { test, expect } from '@playwright/test';

/**
 * T5 — server-rendered currency. This is the test that protects the whole
 * commercial point: roughly 60% of InveneX clients are Gulf-based and must
 * never see the India sheet, not even for 200ms.
 *
 * The three literals below are the Growth tier in each currency. They are
 * deliberately hard-coded HERE (and only here) — the test's job is to fail if
 * the rendered number ever stops matching the published one.
 */
const GROWTH_INR = '3,85,000';
const GROWTH_AED = '28,400';
const GROWTH_USD = '12,900';

/**
 * The only legitimate rupee sign on a non-INR page is the currency toggle's
 * own "₹ INR" button label — it has to name the option it switches to. Every
 * other ₹ is the India sheet leaking into a market that does not pay in
 * rupees. Note the escaped HTML entities: React emits "₹" literally, but a
 * label written as an entity would slip past a naive check.
 */
function rupeesOutsideTheToggle(html: string): number {
  const stripped = html
    .replaceAll('₹ INR', '')
    .replaceAll('&#x20B9; INR', '')
    .replaceAll('&#8377; INR', '');
  return (stripped.match(/₹|&#x20B9;|&#8377;/gi) ?? []).length;
}

// The dev server compiles /pricing on first hit; be generous.
test.describe.configure({ timeout: 120_000 });

test.describe('regional currency', () => {
  test('serves AED in the initial server HTML for a UAE visitor', async ({
    request,
  }) => {
    const res = await request.get('/pricing', {
      headers: { 'x-vercel-ip-country': 'AE' },
    });
    expect(res.status()).toBe(200);

    const html = await res.text();
    expect(html).toContain(GROWTH_AED);
    // Must NOT contain the INR price anywhere in the served document.
    expect(html).not.toContain(GROWTH_INR);
    // ...nor any other rupee figure: not in the ad-spend disclosure, not in a
    // form label, not in body copy.
    expect(rupeesOutsideTheToggle(html)).toBe(0);
  });

  test('serves USD in the initial server HTML for a US visitor', async ({
    request,
  }) => {
    const res = await request.get('/pricing', {
      headers: { 'x-vercel-ip-country': 'US' },
    });
    expect(res.status()).toBe(200);

    const html = await res.text();
    expect(html).toContain(GROWTH_USD);
    expect(html).not.toContain(GROWTH_INR);
    expect(rupeesOutsideTheToggle(html)).toBe(0);
  });

  test('serves INR in the initial server HTML for an Indian visitor', async ({
    request,
  }) => {
    const res = await request.get('/pricing', {
      headers: { 'x-vercel-ip-country': 'IN' },
    });
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain(GROWTH_INR);
  });

  test('falls back to INR when no country header is present', async ({
    request,
  }) => {
    const res = await request.get('/pricing');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain(GROWTH_INR);
  });

  test('never flashes the wrong currency on a slow connection', async ({
    page,
  }) => {
    // Delay every request so any client-side currency correction would have a
    // wide window in which to become visible.
    await page.route('**/*', (route) => {
      setTimeout(() => route.continue(), 120);
    });
    await page.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'AE' });

    // `commit` returns as soon as the navigation response starts, so the
    // samples below are taken WHILE the document streams and hydrates —
    // exactly the window a currency flash would live in. Waiting for `load`
    // and inspecting the settled DOM would prove nothing.
    await page.goto('/pricing', { waitUntil: 'commit' });

    const samples: string[] = [await page.content().catch(() => '')];
    let loaded = false;
    const load = page
      .waitForLoadState('load')
      .then(() => {
        loaded = true;
      })
      .catch(() => {
        loaded = true;
      });

    const deadline = Date.now() + 20_000;
    while (!loaded && Date.now() < deadline) {
      await page.waitForTimeout(50);
      samples.push(await page.content().catch(() => ''));
    }
    await load;
    samples.push(await page.content());

    // Guard the guard: a single post-load sample would make every assertion
    // below trivially true.
    expect(samples.length).toBeGreaterThan(1);

    const preLoad = samples.slice(0, -1);
    expect(preLoad.some((html) => html.includes('<body'))).toBe(true);
    // The correct currency was already in the DOM before load completed.
    expect(preLoad.some((html) => html.includes(GROWTH_AED))).toBe(true);

    // ...and no sample, at any point, showed the India sheet.
    expect(samples.some((html) => html.includes(GROWTH_INR))).toBe(false);
    expect(samples.some((html) => rupeesOutsideTheToggle(html) > 0)).toBe(
      false
    );
  });

  test('an explicit toggle choice survives a reload and persists', async ({
    page,
    context,
  }) => {
    await page.goto('/pricing');

    const aedButton = page.getByRole('button', { name: /AED/i });
    await expect(aedButton).toBeVisible();
    await aedButton.click();

    await expect(aedButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText(GROWTH_AED).first()).toBeVisible();

    // The choice is persisted in a cookie so the SERVER can honour it on the
    // next request — a localStorage-only choice would still flash INR.
    const cookie = (await context.cookies()).find(
      (c) => c.name === 'invenex.currency'
    );
    expect(cookie?.value).toBe('AED');

    await page.reload();
    await expect(page.getByRole('button', { name: /AED/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page.getByText(GROWTH_AED).first()).toBeVisible();
    await expect(page.getByText(GROWTH_INR)).toHaveCount(0);
  });
});
