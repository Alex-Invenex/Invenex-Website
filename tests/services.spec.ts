import { test, expect } from '@playwright/test';

/**
 * Helper for locating a single service block. The page renders both a
 * desktop and a mobile/tablet layout simultaneously (one hidden via CSS
 * depending on viewport), so every lookup must be scoped to `:visible` to
 * avoid Playwright strict-mode violations on the duplicate hidden copy.
 */
function serviceBlock(page: import('@playwright/test').Page, title: string) {
  return page.locator(`[data-testid="service-block"][data-service-title="${title}"]:visible`);
}

test.describe('Services Overview Page — restructure (Task 11)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services');
  });

  test.describe('Hero', () => {
    test('should display hero headline "What We Build"', async ({ page }) => {
      const heroHeading = page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
      // The headline is two stacked <span> blocks ("WHAT WE" / "BUILD") with
      // no literal space between them in raw textContent, so tolerate zero
      // or more whitespace between the words.
      await expect(heroHeading).toContainText(/what\s*we\s*build/i);
    });

    test('should display the new pricing-led subtitle', async ({ page }) => {
      const subtitle = page.getByText(
        /Six things we build, and what each one costs\. No quote calls — the prices are on this page\./i
      );
      await expect(subtitle).toBeVisible();
    });
  });

  test.describe('Service order — Platform first', () => {
    test('all six services appear, in Platform → Web → Mobile → E-Commerce → Ongoing order', async ({ page }) => {
      const order = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-service-title]')).map((el) =>
          el.getAttribute('data-service-title')
        )
      );
      const expectedOrder = [
        'Platform Development',
        'Web Development',
        'Mobile App Development',
        'E-Commerce Solutions',
        'Social Media Marketing',
        'Digital Strategy',
      ];
      const firstIndices = expectedOrder.map((t) => order.indexOf(t));
      expect(firstIndices.every((i) => i !== -1)).toBe(true);
      for (let i = 1; i < firstIndices.length; i++) {
        expect(firstIndices[i]).toBeGreaterThan(firstIndices[i - 1]);
      }
    });

    test('Platform Development appears before Web Development in the DOM', async ({ page }) => {
      const platformBlock = serviceBlock(page, 'Platform Development');
      const webBlock = serviceBlock(page, 'Web Development');
      await expect(platformBlock).toBeVisible();
      await expect(webBlock).toBeVisible();

      const order = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-testid="service-block"][data-service-title]')).map((n) =>
          n.getAttribute('data-service-title')
        )
      );
      const platformIdx = order.indexOf('Platform Development');
      const webIdx = order.indexOf('Web Development');
      expect(platformIdx).toBeGreaterThanOrEqual(0);
      expect(webIdx).toBeGreaterThan(platformIdx);
    });

    test('Social Media Marketing and Digital Strategy are demoted into an "Ongoing" strip', async ({ page }) => {
      await expect(page.getByText('// Ongoing').first()).toBeVisible();
      const ongoingStrip = page.locator('[data-svc-ongoing]:visible').first();
      await expect(ongoingStrip.getByText('Social Media Marketing')).toBeVisible();
      await expect(ongoingStrip.getByText('Digital Strategy')).toBeVisible();
    });
  });

  test.describe('Pricing on every service block', () => {
    test('all six services show at least one price (INR default)', async ({ page }) => {
      const priceRows = page.locator('[data-testid="service-price-row"]:visible');
      const count = await priceRows.count();
      expect(count).toBe(6);
      for (let i = 0; i < count; i++) {
        await expect(priceRows.nth(i)).toContainText('₹');
      }
    });

    test('Web Development shows Launchpad, Launch and Growth prices', async ({ page }) => {
      const row = serviceBlock(page, 'Web Development').locator('[data-testid="service-price-row"]');
      await expect(row).toContainText('Launchpad');
      await expect(row).toContainText('₹48,000');
      await expect(row).toContainText('Launch');
      await expect(row).toContainText('₹1,45,000');
      await expect(row).toContainText('Growth');
      await expect(row).toContainText('₹3,85,000');
    });

    test('Platform Development shows Platform and Platform Scale prices plus the CaterFlow proof line', async ({ page }) => {
      const block = serviceBlock(page, 'Platform Development');
      await expect(block.locator('[data-testid="service-price-row"]')).toContainText('₹9,60,000');
      await expect(block.locator('[data-testid="service-price-row"]')).toContainText('₹18,75,000');
      await expect(block.getByText(/CaterFlow: 12,000 orders processed for 50\+ catering businesses/i)).toBeVisible();
    });

    test('Mobile App Development shows App Lite / Cross-Platform / Native and marks App Care required', async ({ page }) => {
      const block = serviceBlock(page, 'Mobile App Development');
      const priceRow = block.locator('[data-testid="service-price-row"]');
      await expect(priceRow).toContainText('₹2,95,000');
      await expect(priceRow).toContainText('₹6,40,000');
      await expect(priceRow).toContainText('₹11,50,000');

      const careRequired = block.locator('[data-testid="app-care-required"]');
      await expect(careRequired).toBeVisible();
      await expect(careRequired).toContainText(/required/i);
      await expect(block.getByText(/App Care/i)).toBeVisible();
      await expect(block.getByText('₹28,000/mo')).toBeVisible();
    });

    test('E-Commerce shows Storefront / Commerce / Marketplace and the catalogue-size note', async ({ page }) => {
      const block = serviceBlock(page, 'E-Commerce Solutions');
      const priceRow = block.locator('[data-testid="service-price-row"]');
      await expect(priceRow).toContainText('₹2,85,000');
      await expect(priceRow).toContainText('₹5,40,000');
      await expect(priceRow).toContainText('₹12,50,000');
      await expect(block.getByText(/Priced by catalogue size, not page count\./i)).toBeVisible();
    });

    test('Ongoing: Social Media shows monthly retainer prices', async ({ page }) => {
      const card = page.locator('[data-svc-ongoing-item][data-service-title="Social Media Marketing"]:visible');
      await expect(card).toContainText('₹32,000/mo');
      await expect(card).toContainText('₹68,000/mo');
    });

    test('Ongoing: Digital Strategy shows sprint and advisory prices', async ({ page }) => {
      const card = page.locator('[data-svc-ongoing-item][data-service-title="Digital Strategy"]:visible');
      await expect(card).toContainText('₹1,25,000');
      await expect(card).toContainText('₹55,000/mo');
    });
  });

  test.describe('Process section', () => {
    test('should display "Our Process" with 5 steps and a duration on each', async ({ page }) => {
      const processHeading = page.getByRole('heading', { name: /Our Process/i });
      await expect(processHeading).toBeVisible();

      const durations = page.locator('[data-testid="process-duration"]:visible');
      await expect(durations).toHaveCount(5);
      await expect(durations.nth(0)).toHaveText('Week 1');
      await expect(durations.nth(4)).toHaveText('Week 6');
    });

    test('step 01 sells the Blueprint with its price', async ({ page }) => {
      await expect(page.getByText(/Discovery is where most agencies guess/i).first()).toBeVisible();
      await expect(page.getByText('₹15,000').first()).toBeVisible();
    });

    test('step 05 mentions the Momentum care plan', async ({ page }) => {
      await expect(page.getByText(/first month of Momentum care/i).first()).toBeVisible();
    });
  });

  test.describe('Tech stack', () => {
    test('shows exactly 8 technologies with the Next.js justification line', async ({ page }) => {
      const techHeading = page.getByRole('heading', { name: /Technologies We Use/i });
      await expect(techHeading).toBeVisible();

      for (const name of ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'React Native', 'Tailwind CSS', 'Vercel']) {
        await expect(page.getByText(name, { exact: true }).first()).toBeVisible();
      }
      // Removed from the old 16-logo list.
      await expect(page.getByText('MongoDB', { exact: true })).toHaveCount(0);
      await expect(page.getByText('GraphQL', { exact: true })).toHaveCount(0);

      await expect(page.getByTestId('tech-justification').first()).toContainText(/Core Web Vitals come back green/i);
    });
  });

  test.describe('CTA section', () => {
    test('should display the closing CTA with See Pricing', async ({ page }) => {
      const ctaHeading = page.getByRole('heading', { name: /READY TO GET STARTED/i });
      await expect(ctaHeading).toBeVisible();

      const seePricing = page
        .locator('section[aria-labelledby="subpage-cta-title"]')
        .getByRole('link', { name: /See Pricing/i });
      await expect(seePricing).toBeVisible();
      await expect(seePricing).toHaveAttribute('href', '/pricing');
    });
  });

  test.describe('Navigation', () => {
    test('opening the Services nav menu and picking Platform Development lands on /services/platform-development', async ({ page }) => {
      await page.goto('/');
      // "Services" is a dropdown trigger button (has children), not a plain
      // link — the mega-menu lists each service, no bare "/services" link.
      const servicesTrigger = page.getByRole('button', { name: /^services$/i });
      await expect(servicesTrigger).toBeVisible();
      await servicesTrigger.click();

      const platformLink = page.getByRole('link', { name: /Platform Development/i }).first();
      await expect(platformLink).toBeVisible();
      await platformLink.click();
      await expect(page).toHaveURL(/\/services\/platform-development/);
    });

    test('clicking Learn More on the Platform block navigates to the detail page', async ({ page }) => {
      const platformBlock = serviceBlock(page, 'Platform Development');
      await platformBlock.getByRole('link', { name: /Learn More/i }).click();
      await expect(page).toHaveURL(/\/services\/platform-development/);
    });
  });

  test.describe('Accessibility', () => {
    test('sections should have proper landmarks', async ({ page }) => {
      const heroSection = page.locator('section[aria-labelledby="services-hero-heading"]');
      await expect(heroSection).toBeVisible();

      const showcaseSection = page.locator('section[aria-labelledby="services-showcase-heading"]');
      await expect(showcaseSection).toBeVisible();

      const processSection = page.locator('section[aria-labelledby="process-heading"]');
      await expect(processSection).toBeVisible();
    });
  });

  test.describe('Page Metadata', () => {
    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Web & Mobile App Development Services/i);
    });
  });
});
