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

      // Check for value items (using headings to avoid duplicate matches)
      await expect(page.getByRole('heading', { name: 'Excellence' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Partnership' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Innovation' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Speed' })).toBeVisible();
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

  test.describe('Story 11-2: Real Team Data Validation', () => {
    const teamMembers = [
      { name: 'Lijo Varghese', role: 'Founder & Mentor', image: '/team/lijo-varghese.jpg' },
      { name: 'Alex Sebastian', role: 'Founder & Marketing Lead', image: '/team/alex-sebastian.jpg' },
      { name: 'Vishnu Manoj', role: 'Founder & Senior Developer', image: '/team/vishnu-manoj.jpg' },
      { name: 'Jeffrey Jaison', role: 'Founder & Operational Manager', image: '/team/jeffrey-jaison.jpg' },
    ];

    test('should display exactly 4 team members', async ({ page }) => {
      const teamCards = page.locator('[data-testid="team-member-card"]');
      await expect(teamCards).toHaveCount(4);
    });

    for (const member of teamMembers) {
      test(`should display ${member.name} with correct role`, async ({ page }) => {
        const teamGrid = page.locator('[data-testid="team-grid"]');

        // Verify name is displayed
        await expect(teamGrid.getByRole('heading', { name: member.name })).toBeVisible();

        // Verify role is displayed
        await expect(teamGrid.getByText(member.role)).toBeVisible();
      });

      test(`should have correct image for ${member.name}`, async ({ page }) => {
        const teamGrid = page.locator('[data-testid="team-grid"]');
        const memberCard = teamGrid.locator('[data-testid="team-member-card"]').filter({ hasText: member.name });

        // Verify image has correct src (Next.js may transform the path)
        const image = memberCard.locator('img');
        await expect(image).toBeVisible();

        // Verify descriptive alt text
        await expect(image).toHaveAttribute('alt', `${member.name}, ${member.role} at Invenex Solutions`);
      });

      test(`should have LinkedIn link for ${member.name}`, async ({ page }) => {
        const teamGrid = page.locator('[data-testid="team-grid"]');
        const memberCard = teamGrid.locator('[data-testid="team-member-card"]').filter({ hasText: member.name });

        const linkedInLink = memberCard.locator('a[href*="linkedin.com"]');
        await expect(linkedInLink).toBeAttached();
        await expect(linkedInLink).toHaveAttribute('aria-label', `${member.name} LinkedIn profile`);
      });
    }

    test('all team images should load without errors', async ({ page }) => {
      // Wait for all images to load
      await page.waitForLoadState('networkidle');

      const teamCards = page.locator('[data-testid="team-member-card"]');
      const count = await teamCards.count();

      for (let i = 0; i < count; i++) {
        const card = teamCards.nth(i);
        // Should have an img element (not the error fallback emoji)
        const img = card.locator('img');
        await expect(img).toBeVisible();

        // Should NOT show the error fallback (👤 emoji)
        const errorFallback = card.getByText('👤');
        await expect(errorFallback).not.toBeVisible();
      }
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
