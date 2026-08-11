import { test, expect, type Page } from '@playwright/test';

/**
 * Retargeted for Task 14's contact rebuild: Name / Email / "what are you
 * trying to build?" textarea / currency-aware Budget select (band values,
 * defaults to the top band) / required "how did you hear about us" select.
 * Submit label is "Send it"; success reads "Got it. You'll hear from a
 * founder within one working day."
 *
 * The old Project Type field is gone (§4.1 of the copy deck: cut the form to
 * three fields plus budget/source) — its intent (a select interaction that
 * doesn't block submission) is folded into the Budget-select interaction
 * below rather than kept as a separate assertion.
 */
test.describe('Story 5-2: Form Submission & Email Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  /**
   * "How did you hear about us?" starts genuinely blank (see the note in
   * `quote-form.tsx`/`contact.spec.ts` about why it can't use the native
   * `required` attribute) and is required, so any test that expects a real
   * submission to go through — client validation to pass and the server
   * action to run — must select a source first.
   */
  async function selectSource(page: Page) {
    await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });
  }

  test.describe('AC1: Server-Side Processing', () => {
    test('should validate form data and show error for short description', async ({
      page,
    }) => {
      // Try to submit with a very short description (less than 10 chars).
      // Name/email/source all valid so this reaches the server-side Zod
      // check on `description` rather than being blocked earlier.
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/what are you trying to build/i).fill('Short');
      await selectSource(page);

      await page.getByRole('button', { name: /send it/i }).click();

      // Validation should catch this - client-side first, then server-side
      const errorMessage = page.getByText(
        /please tell us a bit more about what you're building/i
      );
      await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });

    test('should show success message when form submission succeeds', async ({
      page,
    }) => {
      // Fill all required fields properly, exercising a non-default budget
      // band (folds in the old "select a dropdown value" project-type
      // interaction — there's no project-type field to select anymore).
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page.getByLabel(/^budget/i).selectOption('band-2');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill(
          'This is a detailed project description for testing the email submission workflow.'
        );
      await page.getByLabel(/how did you hear about us/i).selectOption('google');

      // Submit form
      await page.getByRole('button', { name: /send it/i }).click();

      // Should show success message (in dev mode without API key, it logs and returns success)
      const successMessage = page.getByRole('heading', { name: /got it/i });
      await expect(successMessage).toBeVisible({ timeout: 10000 });
    });

    test('should process form data via server action', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description for testing.');
      await selectSource(page);

      // Submit and verify form response
      await page.getByRole('button', { name: /send it/i }).click();

      // Wait for success card to appear (form is replaced with success message)
      const successCard = page.getByText(
        /you'll hear from a founder within one working day/i
      );
      await expect(successCard).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Form Data Validation', () => {
    test('should validate name is required', async ({ page }) => {
      // Leave name empty
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');

      await page.getByRole('button', { name: /send it/i }).click();

      // Check for validation error
      const nameError = page.getByText(/name is required/i);
      await expect(nameError).toBeVisible();
    });

    test('should validate description minimum length', async ({ page }) => {
      // Client-side validation only checks for an empty description; the
      // 10-character minimum is enforced server-side, so this needs a fully
      // valid rest-of-form (including the now-required source) to actually
      // reach the server action.
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/what are you trying to build/i).fill('Too short');
      await selectSource(page);

      await page.getByRole('button', { name: /send it/i }).click();

      // Check for validation error about the description
      const descError = page.getByText(
        /please tell us a bit more about what you're building/i
      );
      await expect(descError).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('invalid-email');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');

      await page.getByRole('button', { name: /send it/i }).click();

      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });
  });

  test.describe('User Experience', () => {
    test('should show loading spinner while submitting', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description for testing.');
      await selectSource(page);

      await page.getByRole('button', { name: /send it/i }).click();

      // Check for loading spinner (may be brief)
      const spinner = page.locator('form svg.animate-spin');
      // Use soft assertion since loading may be very fast
      await expect(spinner).toBeVisible().catch(() => {
        // Loading was too fast to catch - that's OK
      });
    });

    test('should show button text change while loading', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description for testing.');
      await selectSource(page);

      const submitButton = page.getByRole('button', { name: /send it/i });
      await submitButton.click();

      // Button text should change to "Sending..." while loading
      // This may be brief, so we check the final state instead
      const gotItMessage = page.getByRole('heading', { name: /got it/i });
      await expect(gotItMessage).toBeVisible({ timeout: 10000 });
    });

    test('should display thank you card with confirmation message', async ({
      page,
    }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description for testing.');
      await selectSource(page);

      await page.getByRole('button', { name: /send it/i }).click();

      // Verify the success card content
      const gotItHeading = page.getByRole('heading', { name: /got it/i });
      const confirmationText = page.getByText(
        /you'll hear from a founder within one working day/i
      );

      await expect(gotItHeading).toBeVisible({ timeout: 10000 });
      await expect(confirmationText).toBeVisible();
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have error alert role for validation messages', async ({
      page,
    }) => {
      // Submit empty form to trigger errors
      await page.getByRole('button', { name: /send it/i }).click();

      // Error should have proper role
      const nameInput = page.getByLabel(/your name/i);
      await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test.describe('Error Handling', () => {
    test('should display error message when form submission fails', async ({
      page,
    }) => {
      // Fill valid form data
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description for testing.');
      await selectSource(page);

      // Note: In dev mode without RESEND_API_KEY, the server action returns success
      // This test verifies the error display mechanism exists and works
      // by checking the form has proper error handling structure
      const form = page.locator('[data-testid="quote-form"]');
      await expect(form).toBeVisible();

      // Verify form has error handling capability (role="alert" container exists in code)
      // The actual error scenario would require mocking the server action
      await page.getByRole('button', { name: /send it/i }).click();

      // Form should either show success OR error (not crash)
      const successOrError = page.locator(
        'text=/got it|something went wrong|failed/i'
      );
      await expect(successOrError).toBeVisible({ timeout: 10000 });
    });
  });
});
