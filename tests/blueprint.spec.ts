import { test, expect } from '@playwright/test';

// The dev server compiles /blueprint on first hit; be generous.
test.describe.configure({ timeout: 120_000 });

test.describe('/blueprint', () => {
  test('serves AED in the initial server HTML for a UAE visitor', async ({
    request,
  }) => {
    const res = await request.get('/blueprint', {
      headers: { 'x-vercel-ip-country': 'AE' },
    });
    expect(res.status()).toBe(200);

    const html = await res.text();
    expect(html).toContain('1,750');
    // Must NOT contain the INR Blueprint price anywhere in the served
    // document. (The AED threshold, "AED 15,000", legitimately contains the
    // digits "15,000" — so we assert the absence of the rupee-prefixed form
    // specifically, not the bare digits.)
    expect(html).not.toContain('₹15,000');
  });

  test('shows the INR Blueprint price and threshold sentence by default', async ({
    page,
  }) => {
    await page.goto('/blueprint');

    await expect(page.getByText('₹15,000').first()).toBeVisible();
    await expect(
      page.getByText(/The Blueprint is for projects above/i)
    ).toBeVisible();
    await expect(page.getByText('₹2,00,000').first()).toBeVisible();
  });

  test('displays all three guarantees', async ({ page }) => {
    await page.goto('/blueprint');

    await expect(page.getByText('Credited in full.')).toBeVisible();
    await expect(page.getByText('Refundable.')).toBeVisible();
    await expect(page.getByText('Yours to keep.')).toBeVisible();
  });

  test('has exactly one primary CTA, pointing at the contact fallback', async ({
    page,
  }) => {
    await page.goto('/blueprint');

    const cta = page.getByRole('link', { name: /Start my Blueprint/i });
    await expect(cta).toHaveCount(1);
    await expect(cta).toBeVisible();

    const href = await cta.getAttribute('href');
    // Razorpay link is unset in this environment, so the button must fall
    // back to the contact page with intent -- but tolerate either the
    // fallback or a configured Razorpay URL, matching the component's own
    // `razorpayBlueprintUrl ?? '/contact?intent=blueprint'` logic.
    expect(
      href === '/contact?intent=blueprint' || /^https?:\/\//.test(href ?? '')
    ).toBe(true);
  });

  test('carries a currency choice made on /pricing over to /blueprint', async ({
    page,
  }) => {
    await page.goto('/pricing');

    const aedButton = page.getByRole('button', { name: /AED/i });
    await expect(aedButton).toBeVisible();
    await aedButton.click();
    await expect(aedButton).toHaveAttribute('aria-pressed', 'true');

    await page.goto('/blueprint');
    await expect(page.getByText('AED 1,750').first()).toBeVisible();
  });
});
