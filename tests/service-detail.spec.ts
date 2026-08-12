import { test, expect } from '@playwright/test';

const services = [
  { slug: 'web-development', title: 'Web Development' },
  { slug: 'mobile-development', title: 'Mobile App Development' },
  { slug: 'platform-development', title: 'Platform Development' },
  { slug: 'ecommerce', title: 'E-Commerce Solutions' },
  { slug: 'social-media', title: 'Social Media Marketing' },
  { slug: 'digital-strategy', title: 'Digital Strategy' },
];

/**
 * The hero headline splits the title across two stacked <span> blocks (the
 * last word gets the coral treatment) with no literal space between them in
 * raw textContent, so tolerate zero-or-more whitespace between each word.
 */
function titlePattern(title: string): RegExp {
  return new RegExp(title.split(' ').join('\\s*'), 'i');
}

// Expected price strings per slug, sourced from `src/lib/pricing.ts` (INR default).
const expectedPrices: Record<string, string[]> = {
  'web-development': ['₹48,000', '₹1,45,000', '₹3,85,000'],
  'mobile-development': ['₹2,95,000', '₹6,40,000', '₹11,50,000'],
  'platform-development': ['₹9,60,000', '₹18,75,000'],
  ecommerce: ['₹2,85,000', '₹5,40,000', '₹12,50,000'],
  'social-media': ['₹32,000', '₹68,000'],
  'digital-strategy': ['₹1,25,000', '₹55,000'],
};

test.describe('Service Detail Pages — pricing (Task 11)', () => {
  test.describe('Hero + core content', () => {
    test('should display hero with service title and description', async ({ page }) => {
      await page.goto('/services/web-development');

      const heroTitle = page.getByRole('heading', { level: 1 });
      await expect(heroTitle).toBeVisible();
      await expect(heroTitle).toContainText(titlePattern('Web Development'));

      const description = page.locator('[data-testid="service-hero"]').locator('p').last();
      await expect(description).toBeVisible();
    });

    test('should display features list section', async ({ page }) => {
      await page.goto('/services/web-development');

      const featuresHeading = page.getByRole('heading', { name: /What We Offer/i });
      await expect(featuresHeading).toBeVisible();

      const featureCards = page.locator('[data-testid="feature-card"]');
      await expect(featureCards).toHaveCount(6);
    });

    test('should display technologies section with badges', async ({ page }) => {
      await page.goto('/services/web-development');

      const techHeading = page.getByRole('heading', { name: /Technologies We Use/i });
      await expect(techHeading).toBeVisible();

      const techBadges = page.locator('[data-testid="tech-badge"]');
      const count = await techBadges.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display CTA section linking to pricing', async ({ page }) => {
      await page.goto('/services/web-development');

      const ctaHeading = page.getByRole('heading', { name: /Ready to Get Started/i });
      await expect(ctaHeading).toBeVisible();

      const seePricing = page
        .locator('section[aria-labelledby="subpage-cta-title"]')
        .getByRole('link', { name: /See Pricing/i });
      await expect(seePricing).toBeVisible();
      await expect(seePricing).toHaveAttribute('href', '/pricing');
    });

    test('should display long description section', async ({ page }) => {
      await page.goto('/services/web-development');

      const descriptionSection = page.locator('[data-testid="service-description"]');
      await expect(descriptionSection).toBeVisible();
    });

    test('should display process steps section with 5 steps', async ({ page }) => {
      await page.goto('/services/web-development');

      const processHeading = page.getByRole('heading', { name: /Our Process/i });
      await expect(processHeading).toBeVisible();

      const processSteps = page.locator('[data-testid="process-step"]');
      await expect(processSteps).toHaveCount(5);

      const processSection = page.locator('[data-testid="service-process"]');
      await expect(processSection.getByRole('heading', { name: 'Discovery' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Strategy' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Design' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Development' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Launch' })).toBeVisible();
    });

    test('should display portfolio section with link', async ({ page }) => {
      await page.goto('/services/web-development');

      const portfolioHeading = page.getByRole('heading', { name: /Our Web Development Work/i });
      await expect(portfolioHeading).toBeVisible();

      const portfolioLink = page.getByRole('link', { name: /View Full Portfolio/i });
      await expect(portfolioLink).toBeVisible();
      await expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    });
  });

  test.describe('Pricing section — one per service', () => {
    for (const service of services) {
      test(`${service.title} shows its prices and a "See full pricing" link to /pricing`, async ({ page }) => {
        await page.goto(`/services/${service.slug}`);

        const pricingSection = page.locator('[data-testid="service-pricing"]');
        await expect(pricingSection).toBeVisible();
        await expect(pricingSection.getByRole('heading', { name: /What It Costs/i })).toBeVisible();

        for (const price of expectedPrices[service.slug]) {
          await expect(pricingSection).toContainText(price);
        }

        const link = pricingSection.getByRole('link', { name: /See full pricing/i });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', '/pricing');
      });
    }

    test('Mobile App Development marks App Care as required, not optional', async ({ page }) => {
      await page.goto('/services/mobile-development');

      const pricingSection = page.locator('[data-testid="service-pricing"]');
      const careRequired = pricingSection.locator('[data-testid="app-care-required"]');
      await expect(careRequired).toBeVisible();
      await expect(careRequired).toContainText(/required/i);
      await expect(pricingSection.getByText(/App Care/i)).toBeVisible();
      await expect(pricingSection.getByText('₹28,000/mo')).toBeVisible();
    });

    test('E-Commerce pricing notes it is priced by catalogue size', async ({ page }) => {
      await page.goto('/services/ecommerce');
      const pricingSection = page.locator('[data-testid="service-pricing"]');
      await expect(pricingSection.getByText(/Priced by catalogue size, not page count\./i)).toBeVisible();
    });

    test('Social Media pricing pairs the ad-spend disclosure with the minimum-spend figure', async ({ page }) => {
      await page.goto('/services/social-media');
      const pricingSection = page.locator('[data-testid="service-pricing"]');
      await expect(pricingSection.getByText(/Ad spend is billed separately and never marked up\./i)).toBeVisible();
      // INR is the default currency — the sheet's ₹40,000 minimum useful spend
      // must not be silently dropped from the disclosure.
      await expect(pricingSection.getByText(/Minimum useful spend ₹40,000\/month\./i)).toBeVisible();
    });
  });

  test.describe('All 6 service pages', () => {
    for (const service of services) {
      test(`should display unique content for ${service.title}`, async ({ page }) => {
        await page.goto(`/services/${service.slug}`);

        const title = page.getByRole('heading', { level: 1 });
        await expect(title).toContainText(titlePattern(service.title));

        const featuresHeading = page.getByRole('heading', { name: /What We Offer/i });
        await expect(featuresHeading).toBeVisible();

        const techHeading = page.getByRole('heading', { name: /Technologies We Use/i });
        await expect(techHeading).toBeVisible();

        const ctaButton = page
          .locator('section[aria-labelledby="subpage-cta-title"]')
          .getByRole('link', { name: /See Pricing/i });
        await expect(ctaButton).toBeVisible();
        await expect(ctaButton).toHaveAttribute('href', '/pricing');
      });
    }
  });

  test.describe('Invalid slug handling', () => {
    test('renders the "Service Not Found" state for an unknown slug', async ({ page }) => {
      // Status-code assertion intentionally omitted: in `next dev`, routes
      // that call `notFound()` render the not-found UI but keep a 200
      // status (a known Next.js dev-mode quirk — reproduces identically on
      // untouched routes like /portfolio/[slug] and /careers/[slug], so it
      // is not specific to this page). Production `next build && next
      // start` returns a real 404. We assert on the rendered content
      // instead, which is what the visitor actually sees.
      await page.goto('/services/invalid-service');
      await expect(page).toHaveTitle(/Service Not Found/i);
    });
  });

  test.describe('SEO Metadata', () => {
    test('should have dynamic page title based on service', async ({ page }) => {
      await page.goto('/services/web-development');
      await expect(page).toHaveTitle(/Web Development/i);
    });

    test('should have meta description', async ({ page }) => {
      await page.goto('/services/web-development');
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate from services overview to detail page', async ({ page }) => {
      await page.goto('/services');

      const platformBlock = page.locator(
        '[data-testid="service-block"][data-service-title="Platform Development"]:visible'
      );
      await platformBlock.getByRole('link', { name: /Learn More/i }).click();

      await expect(page).toHaveURL(/\/services\/platform-development/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(titlePattern('Platform Development'));
    });

    test('CTA should link to the pricing page', async ({ page }) => {
      await page.goto('/services/ecommerce');

      const seePricing = page
        .locator('section[aria-labelledby="subpage-cta-title"]')
        .getByRole('link', { name: /See Pricing/i });
      await seePricing.click();

      await expect(page).toHaveURL(/\/pricing/);
    });
  });

  test.describe('Accessibility', () => {
    test('sections should have proper landmarks', async ({ page }) => {
      await page.goto('/services/web-development');

      const heroSection = page.locator('[data-testid="service-hero"]');
      await expect(heroSection).toBeVisible();

      const featuresSection = page.locator('section[aria-labelledby="features-heading"]');
      await expect(featuresSection).toBeVisible();

      const pricingSection = page.locator('section[aria-labelledby="pricing-heading"]');
      await expect(pricingSection).toBeVisible();

      const techSection = page.locator('section[aria-labelledby="tech-heading"]');
      await expect(techSection).toBeVisible();
    });

    test('feature cards should be keyboard navigable', async ({ page }) => {
      await page.goto('/services/web-development');

      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
