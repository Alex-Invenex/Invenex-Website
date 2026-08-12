import { test, expect } from '@playwright/test';

test.describe('Story 3-1: Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Hero Section', () => {
    test('should display hero section with headline', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      // Check for main headline
      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toBeVisible();
    });

    test('should have CTA buttons', async ({ page }) => {
      // The hero now leads with the published price, not a project pitch:
      // "See Pricing" → /pricing, "Book a 15-min fit call" → /contact.
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible();
      await expect(page.getByTestId('hero-cta-primary')).toContainText(/see pricing/i);
      await expect(page.getByTestId('hero-cta-secondary')).toBeVisible();
      await expect(page.getByTestId('hero-cta-secondary')).toContainText(/book a 15-min fit call/i);
    });
  });

  test.describe('Navigation', () => {
    test('should display navbar with logo', async ({ page }) => {
      const nav = page.locator('header');
      await expect(nav).toBeVisible();

      // Check for Invenex logo/brand (text includes "Solutions")
      const logo = page.getByText(/Invenex/i).first();
      await expect(logo).toBeVisible();
    });

    test('should have navigation links', async ({ page }) => {
      const servicesLink = page.getByRole('link', { name: /services/i }).first();
      await expect(servicesLink).toBeVisible();
    });
  });

  test.describe('Services Section', () => {
    test('should display services preview section', async ({ page }) => {
      const servicesHeading = page.getByRole('heading', { name: /services|what we do/i }).first();
      await expect(servicesHeading).toBeVisible();
    });
  });

  test.describe('Portfolio Section', () => {
    test('should display portfolio preview', async ({ page }) => {
      const portfolioSection = page.getByRole('heading', { name: /portfolio|work|projects/i }).first();
      await expect(portfolioSection).toBeVisible();
    });
  });

  test.describe('Products Section', () => {
    test('should display products preview', async ({ page }) => {
      const productsHeading = page.getByRole('heading', { name: /products|solutions/i }).first();
      await expect(productsHeading).toBeVisible();
    });
  });

  // NOTE: `wordpress-plugins.tsx` exists in the codebase but is not imported
  // by any route (checked `src/app/(site)/page.tsx` and
  // `src/components/sections/below-fold-sections.tsx`) — it is dead code, not
  // a homepage section. There is nothing on the homepage to assert against,
  // so the old "WordPress Plugins Section" test is removed rather than
  // retargeted.

  test.describe('How We Work Section', () => {
    test('should display the how-we-work (process) section', async ({ page }) => {
      // Current copy: eyebrow "Our Process", h2 "How We Work" (was "Why Choose Us").
      const howHeading = page.getByRole('heading', { name: /how.*work/i }).first();
      await expect(howHeading).toBeVisible();
    });
  });

  test.describe('Instagram Reels Section', () => {
    test('should display Instagram reels section', async ({ page }) => {
      // Current copy: h2 "WHAT'S HAPPENING" (was "Creative Journey").
      const instagramHeading = page.getByRole('heading', { name: /what.*happening|instagram/i }).first();
      await expect(instagramHeading).toBeVisible();
    });

    test('should have Instagram follow link', async ({ page }) => {
      const followLink = page.getByRole('link', { name: /follow.*journey|instagram/i }).first();
      await expect(followLink).toBeVisible();
    });
  });

  test.describe('Testimonials Section', () => {
    test('should display testimonials section', async ({ page }) => {
      const testimonialsHeading = page.getByRole('heading', { name: /testimonial|client.*say|reviews/i }).first();
      await expect(testimonialsHeading).toBeVisible();
    });
  });

  test.describe('Client Logos Section', () => {
    test('should display client logos section', async ({ page }) => {
      const clientsHeading = page.getByRole('heading', { name: /client|trusted|partner/i }).first();
      await expect(clientsHeading).toBeVisible();
    });
  });

  test.describe('CTA Section', () => {
    test('should display final CTA section', async ({ page }) => {
      // Current copy: h2 "LET'S BUILD SOMETHING EPIC." (was "Ready to start?" style copy).
      const ctaHeading = page.getByRole('heading', { name: /let.?s build|ready|start|contact|get.*started/i }).first();
      await expect(ctaHeading).toBeVisible();
    });
  });

  test.describe('Footer', () => {
    test('should display footer with company info', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const companyName = footer.getByText(/Invenex/i).first();
      await expect(companyName).toBeVisible();
    });

    test('should have social media links', async ({ page }) => {
      const footer = page.locator('footer');
      const socialLinks = footer.locator('a[href*="instagram"], a[href*="linkedin"], a[href*="twitter"]');
      await expect(socialLinks.first()).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should be mobile responsive', async ({ page, isMobile }) => {
      if (isMobile) {
        // Mobile menu button should be visible on mobile
        const menuButton = page.getByTestId('mobile-menu-button');
        await expect(menuButton).toBeVisible();
      }
    });
  });

  test.describe('Performance', () => {
    test('page should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });
});
