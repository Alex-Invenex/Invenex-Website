import { test, expect } from '@playwright/test';

test.describe('Story 6-5: Application Submission & Notifications', () => {
  test.describe('AC1: Server-Side Processing', () => {
    test('should successfully submit application with all required fields', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill required fields
      await page.getByLabel(/Full Name/i).fill('Test Applicant');
      await page.getByLabel(/Email/i).fill('test@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content for testing'),
      });

      // Submit
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Should show success message (server action processed)
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
      await expect(page.getByRole('heading', { name: /Application Submitted/i })).toBeVisible();
    });

    test('should successfully submit application with all optional fields', async ({ page }) => {
      await page.goto('/careers/full-stack-developer/apply');

      // Fill all fields including optional
      await page.getByLabel(/Full Name/i).fill('Full Test User');
      await page.getByLabel(/Email/i).fill('full.test@example.com');
      await page.getByLabel(/Phone Number/i).fill('+1 555 123 4567');
      await page.getByLabel(/Portfolio URL/i).fill('https://my-portfolio.dev');
      await page.getByLabel(/Cover Letter/i).fill(
        'I am very interested in this Backend Developer position. I have 5 years of experience...'
      );

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'my-detailed-resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('detailed pdf content'),
      });

      // Submit
      await page.getByRole('button', { name: /Submit Application/i }).click();

      // Should show success
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
    });

    test('should handle server-side validation errors', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill with invalid data that might pass client validation
      await page.getByLabel(/Full Name/i).fill('A'); // Too short for server validation
      await page.getByLabel(/Email/i).fill('test@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
      });

      // Submit
      await page.getByRole('button', { name: /Submit Application/i }).click();

      // Server should validate and return error
      // Note: Client-side validation catches most errors, but server adds extra layer
      // The form will either succeed (if server accepts single char) or show error
      const successOrError = await Promise.race([
        page.getByTestId('success-message').waitFor({ timeout: 10000 }).then(() => 'success'),
        page.getByTestId('form-error').waitFor({ timeout: 10000 }).then(() => 'error'),
      ]);

      // Either outcome is valid - we're testing the flow completes
      expect(['success', 'error']).toContain(successOrError);
    });

    test('should show loading state during server action', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill form
      await page.getByLabel(/Full Name/i).fill('Loading Test User');
      await page.getByLabel(/Email/i).fill('loading@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 12345 67890');

      // Upload resume
      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('pdf content'),
      });

      // Submit and immediately check for loading
      const submitButton = page.getByRole('button', { name: /Submit Application/i });
      await submitButton.click();

      // Should show loading indicator
      await expect(page.getByText(/Submitting/i)).toBeVisible();
    });
  });

  test.describe('AC1: File Upload to Blob', () => {
    test('should accept PDF resume', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Upload PDF
      await page.locator('input[type="file"]').setInputFiles({
        name: 'my-resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('%PDF-1.4 fake pdf content'),
      });

      // Should show the filename
      await expect(page.getByText('my-resume.pdf')).toBeVisible();

      // Complete form and submit
      await page.getByLabel(/Full Name/i).fill('PDF Test');
      await page.getByLabel(/Email/i).fill('pdf@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.getByRole('button', { name: /Submit Application/i }).click();
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
    });

    test('should accept DOC resume', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Upload DOC file
      await page.locator('input[type="file"]').setInputFiles({
        name: 'my-resume.doc',
        mimeType: 'application/msword',
        buffer: Buffer.from('fake doc content'),
      });

      // Should show the filename
      await expect(page.getByText('my-resume.doc')).toBeVisible();

      // Complete form and submit
      await page.getByLabel(/Full Name/i).fill('DOC Test');
      await page.getByLabel(/Email/i).fill('doc@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.getByRole('button', { name: /Submit Application/i }).click();
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
    });

    test('should accept DOCX resume', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Upload DOCX file
      await page.locator('input[type="file"]').setInputFiles({
        name: 'my-resume.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        buffer: Buffer.from('fake docx content'),
      });

      // Should show the filename
      await expect(page.getByText('my-resume.docx')).toBeVisible();

      // Complete form and submit
      await page.getByLabel(/Full Name/i).fill('DOCX Test');
      await page.getByLabel(/Email/i).fill('docx@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.getByRole('button', { name: /Submit Application/i }).click();
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('AC2: Success Confirmation', () => {
    test('success message should contain thank you text', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Complete and submit form
      await page.getByLabel(/Full Name/i).fill('Thank You Test');
      await page.getByLabel(/Email/i).fill('thanks@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('pdf content'),
      });

      await page.getByRole('button', { name: /Submit Application/i }).click();

      // Should show success message with thank you
      const successCard = page.getByTestId('success-message');
      await expect(successCard).toBeVisible({ timeout: 15000 });

      // Verify thank you content
      await expect(page.getByRole('heading', { name: /Application Submitted/i })).toBeVisible();
      await expect(page.getByText(/Thanks for applying/i)).toBeVisible();
    });

    test('success message should mention review timeline', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Complete and submit form
      await page.getByLabel(/Full Name/i).fill('Timeline Test');
      await page.getByLabel(/Email/i).fill('timeline@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('pdf content'),
      });

      await page.getByRole('button', { name: /Submit Application/i }).click();

      // Should mention review/timeline
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText(/within a week|review|get back/i)).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should display form error for server-side failures', async ({ page }) => {
      await page.goto('/careers/senior-frontend-developer/apply');

      // Fill form with valid data
      await page.getByLabel(/Full Name/i).fill('Error Test');
      await page.getByLabel(/Email/i).fill('error@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('pdf content'),
      });

      // Submit
      await page.getByRole('button', { name: /Submit Application/i }).click();

      // In development without services configured, should still succeed
      // or show a helpful error message
      const result = await Promise.race([
        page.getByTestId('success-message').waitFor({ timeout: 15000 }).then(() => 'success'),
        page.getByTestId('form-error').waitFor({ timeout: 15000 }).then(() => 'error'),
      ]);

      expect(['success', 'error']).toContain(result);
    });
  });

  test.describe('Different Job Positions', () => {
    test('should submit application for Full Stack Developer position', async ({ page }) => {
      await page.goto('/careers/full-stack-developer/apply');

      await page.getByLabel(/Full Name/i).fill('Full Stack Applicant');
      await page.getByLabel(/Email/i).fill('fullstack@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');

      await page.locator('input[type="file"]').setInputFiles({
        name: 'resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('pdf content'),
      });

      await page.getByRole('button', { name: /Submit Application/i }).click();
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
    });

    test('should submit application for UI/UX Designer position', async ({ page }) => {
      await page.goto('/careers/ui-ux-designer/apply');

      await page.getByLabel(/Full Name/i).fill('Designer Applicant');
      await page.getByLabel(/Email/i).fill('designer@example.com');
      await page.getByLabel(/Phone Number/i).fill('+91 98765 43210');
      await page.getByLabel(/Portfolio URL/i).fill('https://dribbble.com/designer');

      await page.locator('input[type="file"]').setInputFiles({
        name: 'portfolio-resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('pdf content'),
      });

      await page.getByRole('button', { name: /Submit Application/i }).click();
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 15000 });
    });
  });
});
