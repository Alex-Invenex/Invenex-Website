import { test, expect } from '@playwright/test';

const jobs = [
  { slug: 'senior-frontend-developer', title: 'Senior Frontend Developer', department: 'Engineering' },
  { slug: 'full-stack-developer', title: 'Full Stack Developer', department: 'Engineering' },
  { slug: 'mobile-developer', title: 'Mobile Developer', department: 'Engineering' },
  { slug: 'ui-ux-designer', title: 'UI/UX Designer', department: 'Design' },
  { slug: 'digital-marketing-manager', title: 'Digital Marketing Manager', department: 'Marketing' },
];

test.describe('Story 6-3: Job Detail Pages', () => {
  test.describe('AC1: Job Detail Content', () => {
    test('should display job header with title and department', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      // Job title in hero
      const heroTitle = page.getByRole('heading', { level: 1 });
      await expect(heroTitle).toBeVisible();
      await expect(heroTitle).toContainText('Senior Frontend Developer');

      // Department badge
      const departmentBadge = page.locator('[data-testid="job-department-badge"]');
      await expect(departmentBadge).toBeVisible();
      await expect(departmentBadge).toContainText('Engineering');
    });

    test('should display job meta info (location, type, experience)', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const metaSection = page.locator('[data-testid="job-meta"]');
      await expect(metaSection).toBeVisible();

      // Location
      await expect(metaSection).toContainText(/Kochi/i);

      // Employment type
      await expect(metaSection).toContainText(/Full-time/i);

      // Experience level
      await expect(metaSection).toContainText(/Senior/i);
    });

    test('should display job description section', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const descriptionHeading = page.getByRole('heading', { name: /About This Role/i });
      await expect(descriptionHeading).toBeVisible();

      const descriptionSection = page.locator('[data-testid="job-description"]');
      await expect(descriptionSection).toBeVisible();
    });

    test('should display requirements list', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const requirementsHeading = page.getByRole('heading', { name: /Requirements/i });
      await expect(requirementsHeading).toBeVisible();

      const requirementsList = page.locator('[data-testid="job-requirements"] li');
      const count = await requirementsList.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display responsibilities list', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const responsibilitiesHeading = page.getByRole('heading', { name: /Responsibilities/i });
      await expect(responsibilitiesHeading).toBeVisible();

      const responsibilitiesList = page.locator('[data-testid="job-responsibilities"] li');
      const count = await responsibilitiesList.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display tech stack badges for engineering roles', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const techHeading = page.getByRole('heading', { name: /Tech Stack/i });
      await expect(techHeading).toBeVisible();

      const techBadges = page.locator('[data-testid="job-tech-stack"] [data-testid="tech-badge"]');
      const count = await techBadges.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display benefits reminder section', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const benefitsHeading = page.getByRole('heading', { name: /Why Join Invenex/i });
      await expect(benefitsHeading).toBeVisible();
    });

    test('should display Apply CTA button', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const applyButton = page.getByRole('link', { name: /Apply Now|Apply for this Position/i });
      await expect(applyButton).toBeVisible();
      // TODO: Update href check to /careers/senior-frontend-developer/apply when Story 6-4 is implemented
      // Currently using mailto: as temporary workaround
      await expect(applyButton).toHaveAttribute('href', /mailto:careers@invenex\.in/);
    });

    test('should display back link to careers page', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const backLink = page.getByRole('link', { name: /Back to Careers/i });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/careers');
    });
  });

  test.describe('AC2: All Job Pages', () => {
    for (const job of jobs) {
      test(`should display complete content for ${job.title}`, async ({ page }) => {
        await page.goto(`/careers/${job.slug}`);

        // Should have the correct title
        const title = page.getByRole('heading', { level: 1 });
        await expect(title).toContainText(job.title);

        // Should have department badge
        const departmentBadge = page.locator('[data-testid="job-department-badge"]');
        await expect(departmentBadge).toContainText(job.department);

        // Should have description section
        const descriptionHeading = page.getByRole('heading', { name: /About This Role/i });
        await expect(descriptionHeading).toBeVisible();

        // Should have requirements
        const requirementsHeading = page.getByRole('heading', { name: /Requirements/i });
        await expect(requirementsHeading).toBeVisible();

        // Should have responsibilities
        const responsibilitiesHeading = page.getByRole('heading', { name: /Responsibilities/i });
        await expect(responsibilitiesHeading).toBeVisible();

        // Should have Apply CTA
        const applyButton = page.getByRole('link', { name: /Apply Now|Apply for this Position/i });
        await expect(applyButton).toBeVisible();
      });
    }
  });

  test.describe('404 Handling', () => {
    test('should show 404 for invalid job slug', async ({ page }) => {
      const response = await page.goto('/careers/invalid-job-position');
      expect(response?.status()).toBe(404);
    });
  });

  test.describe('SEO Metadata', () => {
    test('should have dynamic page title based on job', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');
      await expect(page).toHaveTitle(/Senior Frontend Developer/i);
    });

    test('should have meta description', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate from careers page to job detail', async ({ page }) => {
      await page.goto('/careers');

      const jobCard = page.locator('[data-testid="job-card"]').filter({ hasText: 'Senior Frontend Developer' });
      await jobCard.click();

      await expect(page).toHaveURL(/\/careers\/senior-frontend-developer/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Senior Frontend Developer');
    });

    test('back link should navigate to careers page', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      const backLink = page.getByRole('link', { name: /Back to Careers/i });
      await backLink.click();

      await expect(page).toHaveURL('/careers');
    });
  });

  test.describe('Accessibility', () => {
    test('sections should have proper landmarks', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      // Hero section
      const heroSection = page.locator('[data-testid="job-hero"]');
      await expect(heroSection).toBeVisible();

      // Description section with aria-labelledby
      const descriptionSection = page.locator('section[aria-labelledby="about-role-heading"]');
      await expect(descriptionSection).toBeVisible();
    });

    test('apply button should be keyboard accessible', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      // Tab through page to reach Apply button
      const applyButton = page.getByRole('link', { name: /Apply Now|Apply for this Position/i });
      await applyButton.focus();

      // Apply button should have visible focus
      await expect(applyButton).toBeFocused();
    });
  });
});
