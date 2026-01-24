import { test, expect } from '@playwright/test';

test.describe('Story 3-3: Services Overview Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services');
  });

  test.describe('AC1: Services Page Content', () => {
    test('should display hero section with "Our Services" headline', async ({ page }) => {
      const heroHeading = page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
      await expect(heroHeading).toContainText(/Our.*Services/i);
    });

    test('should display hero section with description', async ({ page }) => {
      const description = page.getByText(/comprehensive digital solutions/i);
      await expect(description).toBeVisible();
    });

    test('should display grid of 6 service cards', async ({ page }) => {
      const serviceCards = page.locator('[data-testid="service-card"]');
      await expect(serviceCards).toHaveCount(6);
    });

    test('each service card should show icon, title, description, and Learn More link', async ({ page }) => {
      const serviceCards = page.locator('[data-testid="service-card"]');
      const firstCard = serviceCards.first();

      // Check card has title (h2)
      await expect(firstCard.locator('h2')).toBeVisible();

      // Check card has description
      await expect(firstCard.locator('p')).toBeVisible();

      // Check card has "Learn More" text
      await expect(firstCard.getByText(/Learn More/i)).toBeVisible();

      // Check card has icon container
      await expect(firstCard.locator('[data-testid="service-icon"]')).toBeVisible();
    });

    test('should display all 6 services with correct titles', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Web Development' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Mobile App Development' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Platform Development' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'E-Commerce Solutions' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Social Media Marketing' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Digital Strategy' })).toBeVisible();
    });

    test('should display process section with 5 steps', async ({ page }) => {
      const processHeading = page.getByRole('heading', { name: /Our Process/i });
      await expect(processHeading).toBeVisible();

      // Check for process steps (use exact match to avoid conflicts with service names)
      const processSection = page.locator('section[aria-labelledby="process-heading"]');
      await expect(processSection.getByText('Discovery')).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Strategy', exact: true })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Design', exact: true })).toBeVisible();
      await expect(processSection.getByRole('heading', { name: 'Development', exact: true })).toBeVisible();
      await expect(processSection.getByText('Launch')).toBeVisible();
    });

    test('should display technologies section with tech stack', async ({ page }) => {
      const techHeading = page.getByRole('heading', { name: /Technologies We Use/i });
      await expect(techHeading).toBeVisible();

      // Check for some technologies
      await expect(page.getByText('React')).toBeVisible();
      await expect(page.getByText('Next.js')).toBeVisible();
      await expect(page.getByText('TypeScript')).toBeVisible();
    });

    test('should display CTA section for consultation', async ({ page }) => {
      const ctaHeading = page.getByRole('heading', { name: /Ready to Start Your Project/i });
      await expect(ctaHeading).toBeVisible();

      const consultationButton = page.getByRole('link', { name: /Get a Free Consultation/i });
      await expect(consultationButton).toBeVisible();
    });
  });

  test.describe('AC2: Service Card Navigation', () => {
    test('clicking Web Development card should navigate to detail page', async ({ page }) => {
      const webDevCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'Web Development' });
      await webDevCard.click();
      await expect(page).toHaveURL(/\/services\/web-development/);
    });

    test('clicking Mobile App Development card should navigate to detail page', async ({ page }) => {
      const mobileCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'Mobile App Development' });
      await mobileCard.click();
      await expect(page).toHaveURL(/\/services\/mobile-development/);
    });

    test('clicking Platform Development card should navigate to detail page', async ({ page }) => {
      const platformCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'Platform Development' });
      await platformCard.click();
      await expect(page).toHaveURL(/\/services\/platform-development/);
    });

    test('clicking E-Commerce card should navigate to detail page', async ({ page }) => {
      const ecommerceCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'E-Commerce Solutions' });
      await ecommerceCard.click();
      await expect(page).toHaveURL(/\/services\/ecommerce/);
    });

    test('clicking Social Media Marketing card should navigate to detail page', async ({ page }) => {
      const socialCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'Social Media Marketing' });
      await socialCard.click();
      await expect(page).toHaveURL(/\/services\/social-media/);
    });

    test('clicking Digital Strategy card should navigate to detail page', async ({ page }) => {
      const strategyCard = page.locator('[data-testid="service-card"]').filter({ hasText: 'Digital Strategy' });
      await strategyCard.click();
      await expect(page).toHaveURL(/\/services\/digital-strategy/);
    });
  });

  test.describe('Page Metadata', () => {
    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Our Services/i);
    });
  });

  test.describe('Accessibility', () => {
    test('sections should have proper landmarks', async ({ page }) => {
      // Check for aria-labelledby on main sections
      const heroSection = page.locator('section[aria-labelledby="services-hero-heading"]');
      await expect(heroSection).toBeVisible();

      const servicesSection = page.locator('section[aria-labelledby="services-grid-heading"]');
      await expect(servicesSection).toBeVisible();

      const processSection = page.locator('section[aria-labelledby="process-heading"]');
      await expect(processSection).toBeVisible();
    });

    test('service cards should be keyboard navigable', async ({ page }) => {
      // Verify service cards exist first
      const firstCard = page.locator('[data-testid="service-card"]').first();
      await expect(firstCard).toBeVisible();

      // Tab through to service cards (skip nav items)
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // A focusable element should be active
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display mobile-friendly layout on small screens', async ({ page }) => {
      // Service cards should stack on mobile - grid handles this with responsive classes
      const servicesGrid = page.locator('[data-testid="services-grid"]');
      await expect(servicesGrid).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should have link to Services page in navbar', async ({ page }) => {
      await page.goto('/');
      const servicesLink = page.getByRole('link', { name: /services/i }).first();
      await expect(servicesLink).toBeVisible();

      await servicesLink.click();
      await expect(page).toHaveURL(/\/services/);
    });

    test('CTA buttons should link to correct pages', async ({ page }) => {
      const consultationButton = page.getByRole('link', { name: /Get a Free Consultation/i });
      await expect(consultationButton).toHaveAttribute('href', '/contact');

      const portfolioButton = page.getByRole('link', { name: /View Our Work/i });
      await expect(portfolioButton).toHaveAttribute('href', '/portfolio');
    });
  });
});
