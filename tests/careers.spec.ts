import { test, expect } from '@playwright/test';

test.describe('Story 6-1: Careers Page with Culture Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
  });

  test.describe('AC1: Careers Page Content', () => {
    test('should display hero section with "Join Our Team" headline', async ({ page }) => {
      const heroSection = page.locator('[data-testid="careers-hero-section"]');
      await expect(heroSection).toBeVisible();

      const heroHeading = page.getByRole('heading', { level: 1, name: /join our team/i });
      await expect(heroHeading).toBeVisible();

      // Should have "We're Hiring" badge
      await expect(page.getByText(/we're hiring/i)).toBeVisible();
    });

    test('should display culture statement with modern tech and growth emphasis', async ({ page }) => {
      const heroSection = page.locator('[data-testid="careers-hero-section"]');
      await expect(heroSection).toBeVisible();

      // Culture statement should mention innovation, growth, or work-life balance
      const cultureText = page.getByText(/innovation|growth|work-life balance/i).first();
      await expect(cultureText).toBeVisible();
    });

    test('should display "Life at Invenex" section with description', async ({ page }) => {
      const lifeSection = page.locator('[data-testid="careers-life-section"]');
      await expect(lifeSection).toBeVisible();

      const sectionHeading = page.getByRole('heading', { name: /life at invenex/i });
      await expect(sectionHeading).toBeVisible();

      // Should mention Kochi and remote work
      await expect(page.getByText(/kochi/i)).toBeVisible();
      await expect(page.getByText(/remote/i)).toBeVisible();
    });

    test('should display benefits grid with 4 benefit items', async ({ page }) => {
      const benefitsSection = page.locator('[data-testid="careers-benefits-section"]');
      await expect(benefitsSection).toBeVisible();

      const benefitCards = page.locator('[data-testid="benefit-card"]');
      await expect(benefitCards).toHaveCount(4);

      // Check for specific benefits
      await expect(page.getByRole('heading', { name: /modern tech stack/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /flexible work/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /learning budget/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /competitive pay/i })).toBeVisible();
    });

    test('should display tech stack showcase with badges', async ({ page }) => {
      const techSection = page.locator('[data-testid="careers-tech-section"]');
      await expect(techSection).toBeVisible();

      const sectionHeading = page.getByRole('heading', { name: /our tech stack/i });
      await expect(sectionHeading).toBeVisible();

      // Check for specific tech stack items
      await expect(page.getByText('Next.js')).toBeVisible();
      await expect(page.getByText('TypeScript')).toBeVisible();
      await expect(page.getByText('Tailwind CSS')).toBeVisible();
      await expect(page.getByText('React')).toBeVisible();
    });

    test('should display open positions section with anchor link', async ({ page }) => {
      const positionsSection = page.locator('[data-testid="careers-positions-section"]');
      await expect(positionsSection).toBeVisible();

      const sectionHeading = page.getByRole('heading', { name: /open positions/i });
      await expect(sectionHeading).toBeVisible();

      // Hero CTA should link to positions section
      const ctaLink = page.getByRole('link', { name: /view open positions/i });
      await expect(ctaLink).toHaveAttribute('href', '#positions');
    });

    test('clicking "View Open Positions" should scroll to positions section', async ({ page }) => {
      const ctaLink = page.getByRole('link', { name: /view open positions/i });
      await ctaLink.click();

      // URL should have #positions hash
      await expect(page).toHaveURL(/\/careers#positions/);
    });
  });

  test.describe('Page Metadata', () => {
    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/careers/i);
    });

    test('should have meta description', async ({ page }) => {
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription?.toLowerCase()).toContain('invenex');
    });
  });

  test.describe('Accessibility', () => {
    test('hero section should have proper accessibility landmarks', async ({ page }) => {
      const heroSection = page.locator('[data-testid="careers-hero-section"]');
      await expect(heroSection).toHaveAttribute('aria-labelledby');
    });

    test('benefits section should have proper accessibility landmarks', async ({ page }) => {
      const benefitsSection = page.locator('[data-testid="careers-benefits-section"]');
      await expect(benefitsSection).toHaveAttribute('aria-labelledby');
    });

    test('tech stack section should have proper accessibility landmarks', async ({ page }) => {
      const techSection = page.locator('[data-testid="careers-tech-section"]');
      await expect(techSection).toHaveAttribute('aria-labelledby');
    });

    test('positions section should have proper accessibility landmarks', async ({ page }) => {
      const positionsSection = page.locator('[data-testid="careers-positions-section"]');
      await expect(positionsSection).toHaveAttribute('aria-labelledby');
    });
  });

  test.describe('Responsive Design', () => {
    test('benefits grid should be responsive', async ({ page }) => {
      const benefitsSection = page.locator('[data-testid="careers-benefits-section"]');
      await expect(benefitsSection).toBeVisible();

      // Grid should be visible and contain 4 cards
      const benefitCards = page.locator('[data-testid="benefit-card"]');
      await expect(benefitCards.first()).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to careers page from homepage', async ({ page }) => {
      await page.goto('/');

      // Find Careers link in navigation
      const careersLink = page.getByRole('link', { name: /careers/i }).first();
      await expect(careersLink).toBeVisible();

      await careersLink.click();
      await expect(page).toHaveURL(/\/careers/);
    });
  });
});

test.describe('Story 6-1: Careers Page - Mobile Viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
  });

  test('should display hero section on mobile', async ({ page }) => {
    const heroHeading = page.getByRole('heading', { level: 1, name: /join our team/i });
    await expect(heroHeading).toBeVisible();
  });

  test('should display benefits grid stacked on mobile', async ({ page }) => {
    const benefitCards = page.locator('[data-testid="benefit-card"]');
    await expect(benefitCards).toHaveCount(4);
    await expect(benefitCards.first()).toBeVisible();
  });

  test('should display tech stack badges on mobile', async ({ page }) => {
    const techSection = page.locator('[data-testid="careers-tech-section"]');
    await expect(techSection).toBeVisible();
    await expect(page.getByText('Next.js')).toBeVisible();
  });
});
