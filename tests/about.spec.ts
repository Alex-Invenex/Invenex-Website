import { test, expect } from '@playwright/test';

test.describe('Story 3-2: About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test.describe('AC1: About Page Content', () => {
    test('should display hero section with company tagline', async ({ page }) => {
      // Hero section should be visible
      const heroHeading = page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();

      // Should contain the tagline text
      await expect(heroHeading).toContainText(/Building.*Future|One Project at a Time/i);
    });

    test('should display company story section', async ({ page }) => {
      const storyHeading = page.getByRole('heading', { name: /our story/i });
      await expect(storyHeading).toBeVisible();

      // Story content should be present
      const storyContent = page.getByText(/founded in kochi|digital solutions/i).first();
      await expect(storyContent).toBeVisible();
    });

    test('should display mission and values section', async ({ page }) => {
      const valuesHeading = page.getByRole('heading', { name: /our values/i });
      await expect(valuesHeading).toBeVisible();

      // Check for value items
      await expect(page.getByText(/excellence/i)).toBeVisible();
      await expect(page.getByText(/partnership/i)).toBeVisible();
      await expect(page.getByText(/innovation/i)).toBeVisible();
      await expect(page.getByText(/speed/i)).toBeVisible();
    });

    test('should display team grid section', async ({ page }) => {
      const teamHeading = page.getByRole('heading', { name: /meet the team/i });
      await expect(teamHeading).toBeVisible();

      // Team member cards should be present
      const teamCards = page.locator('[data-testid="team-member-card"]');
      await expect(teamCards.first()).toBeVisible();
    });
  });

  test.describe('AC2: Team Member Cards', () => {
    test('should display team member card with hover effects', async ({ page }) => {
      const teamCard = page.locator('[data-testid="team-member-card"]').first();
      await expect(teamCard).toBeVisible();

      // Check for member name and role
      await expect(teamCard.locator('h3')).toBeVisible();
      await expect(teamCard.locator('p')).toBeVisible();
    });

    test('should reveal LinkedIn link on hover', async ({ page }) => {
      const teamCard = page.locator('[data-testid="team-member-card"]').first();
      await expect(teamCard).toBeVisible();

      // LinkedIn link should exist
      const linkedInLink = teamCard.locator('a[href*="linkedin"], a[aria-label*="LinkedIn"]');
      await expect(linkedInLink).toBeAttached();
    });

    test('LinkedIn link should open in new tab', async ({ page }) => {
      const teamCard = page.locator('[data-testid="team-member-card"]').first();
      const linkedInLink = teamCard.locator('a[href*="linkedin"], a[aria-label*="LinkedIn"]').first();

      await expect(linkedInLink).toHaveAttribute('target', '_blank');
      await expect(linkedInLink).toHaveAttribute('rel', /noopener/);
    });
  });

  test.describe('Page Metadata', () => {
    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/about/i);
    });
  });

  test.describe('Responsive Design', () => {
    test('team grid should be responsive', async ({ page }) => {
      const teamSection = page.locator('section').filter({ hasText: /meet the team/i });
      await expect(teamSection).toBeVisible();

      // Grid should adjust based on screen size
      const teamGrid = teamSection.locator('[data-testid="team-grid"]');
      await expect(teamGrid).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should have link to About page in navbar', async ({ page }) => {
      await page.goto('/');
      const aboutLink = page.getByRole('link', { name: /about/i }).first();
      await expect(aboutLink).toBeVisible();

      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    });
  });
});
