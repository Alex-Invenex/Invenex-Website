import { test, expect } from '@playwright/test';

// The dev server compiles /pricing on first hit; be generous.
test.describe.configure({ timeout: 120_000 });

const TIER_NAMES = [
  'Launchpad',
  'Launch',
  'Growth',
  'Platform',
  'Platform Scale',
];

test.describe('/pricing', () => {
  test('renders the copy deck §1 heading', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Our prices\.\s*All of them\./
    );
  });

  test('renders all five build tiers, in ladder order', async ({ page }) => {
    await page.goto('/pricing');

    for (const name of TIER_NAMES) {
      await expect(
        page.getByRole('heading', { name, exact: true })
      ).toBeVisible();
    }

    // Ladder order is load-bearing: the contrast effect only works if the
    // tiers read cheapest-to-dearest (strategy rules §1), on every viewport.
    const rendered = await page.locator('[data-tier] h3').allTextContents();
    expect(rendered).toEqual(TIER_NAMES);
  });

  test('badges exactly one tier as "Most chosen"', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText('Most chosen', { exact: true })).toHaveCount(1);
    await expect(page.getByText('Most chosen', { exact: true })).toBeVisible();
    // ...and it is Growth, the pre-selected default.
    await expect(
      page.locator('[data-tier]:has(article[data-default="true"])')
    ).toHaveAttribute('data-tier', 'growth');
  });

  test('keeps the exclusion lists visible on the entry tiers', async ({
    page,
  }) => {
    await page.goto('/pricing');
    // Launchpad and Launch each publish what they deliberately exclude.
    const exclusionHeadings = page.getByText('Not included — on purpose:');
    expect(await exclusionHeadings.count()).toBeGreaterThanOrEqual(2);
    await expect(exclusionHeadings.first()).toBeVisible();
  });

  test('publishes the out-of-scope hourly rate', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText(/2,400/).first()).toBeVisible();
  });

  test('shows the "probably not for you" section', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText(/probably not for you/i).first()).toBeVisible();
    // ...and its landmark is named, not anonymous.
    await expect(
      page.getByRole('region', { name: /probably not for you/i }).first()
    ).toBeVisible();
  });

  // Open-ended pricing reintroduces the negotiation the published ladder
  // exists to remove. Scoped to <main>: the site-wide nav CTA is Task 6's.
  test('uses no open-ended pricing language', async ({ page }) => {
    await page.goto('/pricing');
    const main = (await page.textContent('main')) ?? '';
    expect(main).not.toMatch(/starting at|starting from|prices from|onwards/i);
    expect(main).not.toMatch(/from ₹|from AED|from \$|\bPOA\b/i);
    expect(main).not.toMatch(
      /contact for pricing|contact us for a price|price on request/i
    );
    expect(main).not.toMatch(/get a quote|request a quote|get an estimate/i);
  });

  test('has no horizontal body scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/pricing');
    await page.waitForLoadState('load');

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);

    // Behavioural check: the window must refuse to scroll sideways.
    const scrolledX = await page.evaluate(() => {
      window.scrollTo(400, 0);
      return window.scrollX;
    });
    expect(scrolledX).toBe(0);
  });

  test('every pricing table scrolls inside its own container', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/pricing');

    const tables = page.locator('table');
    const count = await tables.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const overflowX = await tables.nth(i).evaluate((table) => {
        const wrapper = table.parentElement!;
        return getComputedStyle(wrapper).overflowX;
      });
      expect(overflowX).toBe('auto');
    }
  });

  test('prices the other service lines too', async ({ page }) => {
    await page.goto('/pricing');
    for (const heading of [
      /Care Plans/i,
      /Mobile apps/i,
      /E-commerce/i,
      /Digital strategy/i,
      /Social retainers/i,
    ]) {
      await expect(
        page.getByRole('heading', { name: heading }).first()
      ).toBeVisible();
    }
  });

  test('presents App Care as mandatory, not an upsell', async ({ page }) => {
    await page.goto('/pricing');
    await expect(
      page.getByRole('heading', { name: /Why App Care isn.t optional/i })
    ).toBeVisible();
    await expect(page.getByText(/Mandatory/i).first()).toBeVisible();
  });

  test('prices e-commerce by catalogue size, not page count', async ({
    page,
  }) => {
    await page.goto('/pricing');
    await expect(
      page.getByText(/Priced by catalogue size, not page count/i).first()
    ).toBeVisible();
  });

  test('discloses that ad spend is never marked up', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText(/never marked up/i).first()).toBeVisible();
  });

  test('links to the Blueprint', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('a[href="/blueprint"]').first()).toBeVisible();
  });

  test('renders the pricing FAQ', async ({ page }) => {
    await page.goto('/pricing');
    await expect(
      page.getByRole('heading', { name: 'Pricing FAQ', exact: true })
    ).toBeVisible();
    await expect(page.getByText('Who owns the code?')).toBeVisible();
  });
});
