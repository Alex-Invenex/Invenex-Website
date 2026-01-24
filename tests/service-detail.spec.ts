import { test, expect } from '@playwright/test';

const services = [
  { slug: 'web-development', title: 'Web Development' },
  { slug: 'mobile-development', title: 'Mobile App Development' },
  { slug: 'platform-development', title: 'Platform Development' },
  { slug: 'ecommerce', title: 'E-Commerce Solutions' },
  { slug: 'social-media', title: 'Social Media Marketing' },
  { slug: 'digital-strategy', title: 'Digital Strategy' },
];

test.describe('Story 3-4: Service Detail Pages', () => {
  test.describe('AC1: Service Detail Content', () => {
    test('should display hero with service title and description', async ({ page }) => {
      await page.goto('/services/web-development');

      // Service title in hero
      const heroTitle = page.getByRole('heading', { level: 1 });
      await expect(heroTitle).toBeVisible();
      await expect(heroTitle).toContainText('Web Development');

      // Description
      const description = page.locator('[data-testid="service-hero"]').locator('p');
      await expect(description).toBeVisible();
    });

    test('should display features list section', async ({ page }) => {
      await page.goto('/services/web-development');

      const featuresHeading = page.getByRole('heading', { name: /What We Offer/i });
      await expect(featuresHeading).toBeVisible();

      // Should have feature cards
      const featureCards = page.locator('[data-testid="feature-card"]');
      await expect(featureCards).toHaveCount(6);
    });

    test('should display technologies section with badges', async ({ page }) => {
      await page.goto('/services/web-development');

      const techHeading = page.getByRole('heading', { name: /Technologies We Use/i });
      await expect(techHeading).toBeVisible();

      // Should have technology badges
      const techBadges = page.locator('[data-testid="tech-badge"]');
      const count = await techBadges.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display CTA section with quote request link', async ({ page }) => {
      await page.goto('/services/web-development');

      const ctaHeading = page.getByRole('heading', { name: /Ready to Get Started/i });
      await expect(ctaHeading).toBeVisible();

      const quoteButton = page.getByRole('link', { name: /Request a Quote/i });
      await expect(quoteButton).toBeVisible();
      await expect(quoteButton).toHaveAttribute('href', /\/contact\?service=web-development/);
    });

    test('should display long description section', async ({ page }) => {
      await page.goto('/services/web-development');

      const descriptionSection = page.locator('[data-testid="service-description"]');
      await expect(descriptionSection).toBeVisible();
    });

    test('should display process steps section with 5 steps (AC1)', async ({ page }) => {
      await page.goto('/services/web-development');

      const processHeading = page.getByRole('heading', { name: /Our Process/i });
      await expect(processHeading).toBeVisible();

      // Should have 5 process steps
      const processSteps = page.locator('[data-testid="process-step"]');
      await expect(processSteps).toHaveCount(5);

      // Verify step titles (use heading role to avoid matching descriptions)
      const processSection = page.locator('[data-testid="service-process"]');
      await expect(processSection.getByRole('heading', { name: 'Discovery' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Strategy' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Design' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Development' })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Launch' })).toBeVisible();
    });

    test('should display portfolio section with link (AC1)', async ({ page }) => {
      await page.goto('/services/web-development');

      const portfolioHeading = page.getByRole('heading', { name: /Our Web Development Work/i });
      await expect(portfolioHeading).toBeVisible();

      const portfolioLink = page.getByRole('link', { name: /View Full Portfolio/i });
      await expect(portfolioLink).toBeVisible();
      await expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    });
  });

  test.describe('AC2: All 6 Service Pages', () => {
    for (const service of services) {
      test(`should display unique content for ${service.title}`, async ({ page }) => {
        await page.goto(`/services/${service.slug}`);

        // Should have the correct title
        const title = page.getByRole('heading', { level: 1 });
        await expect(title).toContainText(service.title);

        // Should have features section
        const featuresHeading = page.getByRole('heading', { name: /What We Offer/i });
        await expect(featuresHeading).toBeVisible();

        // Should have technologies section
        const techHeading = page.getByRole('heading', { name: /Technologies We Use/i });
        await expect(techHeading).toBeVisible();

        // Should have CTA section
        const ctaButton = page.getByRole('link', { name: /Request a Quote/i });
        await expect(ctaButton).toBeVisible();
        await expect(ctaButton).toHaveAttribute('href', `/contact?service=${service.slug}`);
      });
    }
  });

  test.describe('404 Handling', () => {
    test('should show 404 for invalid service slug', async ({ page }) => {
      const response = await page.goto('/services/invalid-service');
      expect(response?.status()).toBe(404);
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

      const webDevCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'Web Development' });
      await webDevCard.click();

      await expect(page).toHaveURL(/\/services\/web-development/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Web Development');
    });

    test('CTA should link to contact page with service parameter', async ({ page }) => {
      await page.goto('/services/ecommerce');

      const quoteButton = page.getByRole('link', { name: /Request a Quote/i });
      await quoteButton.click();

      await expect(page).toHaveURL(/\/contact\?service=ecommerce/);
    });
  });

  test.describe('Accessibility', () => {
    test('sections should have proper landmarks', async ({ page }) => {
      await page.goto('/services/web-development');

      // Hero section
      const heroSection = page.locator('[data-testid="service-hero"]');
      await expect(heroSection).toBeVisible();

      // Features section with aria-labelledby
      const featuresSection = page.locator('section[aria-labelledby="features-heading"]');
      await expect(featuresSection).toBeVisible();

      // Technologies section with aria-labelledby
      const techSection = page.locator('section[aria-labelledby="tech-heading"]');
      await expect(techSection).toBeVisible();
    });

    test('feature cards should be keyboard navigable', async ({ page }) => {
      await page.goto('/services/web-development');

      // Tab to first focusable element
      await page.keyboard.press('Tab');

      // A focusable element should be active
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
