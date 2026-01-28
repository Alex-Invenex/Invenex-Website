import { test, expect } from '@playwright/test';

test.describe('Story 6-4: Job Application Form', () => {
  test.describe('AC1: Application Page', () => {
    test('should display application page with job title', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Page should load (not 404)
      await expect(page).toHaveURL(/\/careers\/senior-frontend-developer\/apply/);

      // Should display job title in heading
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/Apply for Senior Frontend Developer/i);
    });

    test('should display back link to job detail page', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      const backLink = page.getByRole('link', { name: /Back to Senior Frontend Developer/i });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/careers/senior-frontend-developer');
    });

    test('should display instruction text', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      await expect(page.getByText(/Fill out the form below/i)).toBeVisible();
    });
  });

  test.describe('AC1: Application Form Fields', () => {
    test('should display all required form fields', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Full Name field
      const nameInput = page.getByLabel(/Full Name/i);
      await expect(nameInput).toBeVisible();
      await expect(nameInput).toHaveAttribute('required');

      // Email field
      const emailInput = page.getByLabel(/Email/i);
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(emailInput).toHaveAttribute('required');

      // Phone field
      const phoneInput = page.getByLabel(/Phone Number/i);
      await expect(phoneInput).toBeVisible();
      await expect(phoneInput).toHaveAttribute('required');

      // Resume upload
      const resumeLabel = page.getByText(/Resume.*PDF or DOC/i);
      await expect(resumeLabel).toBeVisible();

      // Portfolio URL (optional)
      const portfolioInput = page.getByLabel(/Portfolio URL/i);
      await expect(portfolioInput).toBeVisible();

      // Cover Letter (optional)
      const coverLetterLabel = page.getByText(/Cover Letter/i);
      await expect(coverLetterLabel).toBeVisible();

      // Submit button
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await expect(submitButton).toBeVisible();
    });
  });

  test.describe('AC2: File Upload Component', () => {
    test('should display file upload drop zone', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      const dropZone = page.locator('[data-testid="file-upload"]');
      await expect(dropZone).toBeVisible();

      // Should have browse button/text
      await expect(page.getByText(/browse files/i)).toBeVisible();
      await expect(page.getByText(/Drag and drop/i)).toBeVisible();
    });

    test('should show error for file too large', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Create a fake large file (6MB)
      const largeBuffer = Buffer.alloc(6 * 1024 * 1024);
      await page.locator('input[type="file"]').setInputFiles({
        name: 'large-resume.pdf',
        mimeType: 'application/pdf',
        buffer: largeBuffer,
      });

      // Should show size error
      await expect(page.getByText(/File too large|Max size/i)).toBeVisible();
    });

    test('should show error for invalid file type', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Upload an image file instead of PDF/DOC
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.from('fake image content'),
      });

      // Should show type error
      await expect(page.getByText(/Invalid file type|Allowed:/i)).toBeVisible();
    });

    test('should display file name after valid selection', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Upload a valid PDF file
      await page.locator('input[type="file"]').setInputFiles({
        name: 'my-resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
      });

      // Should show file name
      await expect(page.getByText('my-resume.pdf')).toBeVisible();
    });

    test('should allow removing selected file', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Upload a file
      await page.locator('input[type="file"]').setInputFiles({
        name: 'my-resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
      });

      // Click remove button
      const removeButton = page.getByRole('button', { name: /Remove/i });
      await expect(removeButton).toBeVisible();
      await removeButton.click();

      // File should be removed, drop zone visible again
      await expect(page.getByText(/Drag and drop/i)).toBeVisible();
      await expect(page.getByText('my-resume.pdf')).not.toBeVisible();
    });
  });

  test.describe('AC3: Form Validation', () => {
    test('should show validation errors for empty required fields', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Click submit without filling any fields
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Should show validation errors
      await expect(page.getByText(/Name is required/i)).toBeVisible();
      await expect(page.getByText(/Email is required/i)).toBeVisible();
      await expect(page.getByText(/Phone is required/i)).toBeVisible();
      await expect(page.getByText(/Resume is required/i)).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill invalid email
      await page.getByLabel(/Email/i).fill('invalid-email');

      // Submit
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Should show email validation error
      await expect(page.getByText(/Invalid email/i)).toBeVisible();
    });

    test('should validate phone number format', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill valid name and email but invalid phone
      await page.getByLabel(/Full Name/i).fill('John Doe');
      await page.getByLabel(/Email/i).fill('john@example.com');
      await page.getByLabel(/Phone Number/i).fill('123'); // Too short

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
      });

      // Submit
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Should show phone validation error
      await expect(page.getByText(/Invalid phone number/i)).toBeVisible();
    });
  });

  test.describe('AC3: Form Submission', () => {
    test('should show loading state during submission', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill out the form
      await page.getByLabel(/Full Name/i).fill('John Doe');
      await page.getByLabel(/Email/i).fill('john@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
      });

      // Submit
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Should show loading state (button text changes)
      await expect(page.getByText(/Submitting/i)).toBeVisible();
    });

    test('should show success message after submission', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill out the form completely
      await page.getByLabel(/Full Name/i).fill('John Doe');
      await page.getByLabel(/Email/i).fill('john@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
      });

      // Fill optional fields
      await page.getByLabel(/Portfolio URL/i).fill('https://johndoe.com');
      await page.getByLabel(/Cover Letter/i).fill('I am excited about this opportunity...');

      // Submit
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Wait for success message
      await expect(page.getByRole('heading', { name: /Application Submitted/i })).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Navigation from Job Detail', () => {
    test('Apply Now button should link to application page', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer');

      // Find Apply Now button
      const applyButton = page.getByRole('link', { name: /Apply Now/i });
      await expect(applyButton).toBeVisible();

      // Click and verify navigation
      await applyButton.click();

      await expect(page).toHaveURL(/\/careers\/senior-frontend-developer\/apply/);
    });
  });

  test.describe('404 Handling', () => {
    test('should show 404 for invalid job slug', async ({ page }) => {
      const response = await page.goto('/careers/invalid-job/apply');
      expect(response?.status()).toBe(404);
    });
  });

  test.describe('Accessibility', () => {
    test('form should have proper labels and aria attributes', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // All inputs should have labels
      const nameInput = page.getByLabel(/Full Name/i);
      await expect(nameInput).toBeVisible();

      const emailInput = page.getByLabel(/Email/i);
      await expect(emailInput).toBeVisible();

      const phoneInput = page.getByLabel(/Phone Number/i);
      await expect(phoneInput).toBeVisible();
    });

    test('submit button should be keyboard accessible', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.focus();

      await expect(submitButton).toBeFocused();
    });
  });

  test.describe('SEO Metadata', () => {
    test('should have dynamic page title', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      await expect(page).toHaveTitle(/Apply.*Senior Frontend Developer/i);
    });
  });
});
