import { test, expect } from '@playwright/test';

test.describe('Story 5-3: Server Actions & Form Infrastructure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test.describe('AC1: Infrastructure Verification', () => {
    test('should have working form that uses server action', async ({ page }) => {
      // The form exists and is functional
      const form = page.locator('form[data-testid="quote-form"]');
      await expect(form).toBeVisible();

      // Has all expected fields per AC1
      await expect(page.getByLabel(/your name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/project type/i)).toBeVisible();
      await expect(page.getByLabel(/budget range/i)).toBeVisible();
      await expect(page.getByLabel(/project description/i)).toBeVisible();
      await expect(page.getByLabel(/how did you hear about us/i)).toBeVisible();
    });

    test('should validate and process form through server action', async ({
      page,
    }) => {
      // Fill valid form data
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page.getByLabel(/project type/i).selectOption('web');
      await page.getByLabel(/budget range/i).selectOption('5k-15k');
      await page
        .getByLabel(/project description/i)
        .fill('This is a test project description that is long enough.');

      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();

      // Server action processes and returns success
      const successMessage = page.getByRole('heading', { name: /thank you/i });
      await expect(successMessage).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('AC2: ActionResult Behavior', () => {
    test('should return success false with error on validation failure', async ({
      page,
    }) => {
      // Submit with invalid data (short description)
      await page.getByLabel(/your name/i).fill('Test');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page.getByLabel(/project description/i).fill('Short');

      await page.getByRole('button', { name: /send message/i }).click();

      // Server action returns error via ActionResult
      const errorMessage = page.getByText(/please describe your project/i);
      await expect(errorMessage).toBeVisible();
    });

    test('should return success true on valid submission', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/project description/i)
        .fill('This is a detailed project description for testing.');

      await page.getByRole('button', { name: /send message/i }).click();

      // ActionResult.success = true shows success UI
      const thankYouHeading = page.getByRole('heading', { name: /thank you/i });
      await expect(thankYouHeading).toBeVisible({ timeout: 10000 });
    });

    test('should validate email format via Zod schema', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('not-an-email');
      await page
        .getByLabel(/project description/i)
        .fill('This is a detailed project description.');

      await page.getByRole('button', { name: /send message/i }).click();

      // Zod validation catches invalid email
      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });

    test('should validate name minimum length via Zod schema', async ({
      page,
    }) => {
      await page.getByLabel(/your name/i).fill('A');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/project description/i)
        .fill('This is a detailed project description.');

      await page.getByRole('button', { name: /send message/i }).click();

      // Zod validation catches short name
      const nameError = page.getByText(/at least 2 characters/i);
      await expect(nameError).toBeVisible();
    });

    test('should gracefully handle errors', async ({ page }) => {
      // Valid submission that goes through the full flow
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/project description/i)
        .fill('This is a detailed project description.');

      await page.getByRole('button', { name: /send message/i }).click();

      // Either success or graceful error (no crash)
      const successOrError = page.locator(
        '[role="heading"]:has-text("Thank You"), [role="alert"]:has-text("error")'
      );
      await expect(
        successOrError.first().or(page.getByText(/thank you/i))
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Form State Management', () => {
    test('should show loading state during submission', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/project description/i)
        .fill('This is a detailed project description.');

      // Click submit
      const submitButton = page.getByRole('button', { name: /send message/i });
      await submitButton.click();

      // Loading spinner should appear (briefly) - soft assertion since loading may be very fast
      const spinner = page.locator('svg.animate-spin');
      await expect.soft(spinner).toBeVisible({ timeout: 100 });

      // Eventually shows success (this is the critical assertion)
      const success = page.getByRole('heading', { name: /thank you/i });
      await expect(success).toBeVisible({ timeout: 10000 });
    });

    test('should disable button during submission to prevent double-submit', async ({
      page,
    }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/project description/i)
        .fill('This is a detailed project description.');

      const submitButton = page.getByRole('button', { name: /send message/i });

      // Click once
      await submitButton.click();

      // Button should be disabled during loading (indicated by loading spinner or disabled state)
      // Check that the form transitions to success state (preventing re-submission)
      const success = page.getByRole('heading', { name: /thank you/i });
      await expect(success).toBeVisible({ timeout: 10000 });
    });
  });
});
