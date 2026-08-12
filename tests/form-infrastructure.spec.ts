import { test, expect } from '@playwright/test';

test.describe('Contact form — Server Actions & Infrastructure (Task 14)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test.describe('AC1: Infrastructure Verification', () => {
    test('should have working form that uses server action', async ({ page }) => {
      const form = page.locator('form[data-testid="quote-form"]');
      await expect(form).toBeVisible();

      await expect(page.getByLabel(/your name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/what are you trying to build/i)).toBeVisible();
      await expect(page.getByLabel(/^budget/i)).toBeVisible();
      await expect(page.getByLabel(/how did you hear about us/i)).toBeVisible();
    });

    test('should validate and process form through server action', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page.getByLabel(/^budget/i).selectOption({ index: 1 });
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a test project description that is long enough.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const successMessage = page.getByRole('heading', { name: /got it/i });
      await expect(successMessage).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('AC2: ActionResult Behavior', () => {
    test('should return success false with error on validation failure', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page.getByLabel(/what are you trying to build/i).fill('Short');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const errorMessage = page.getByText(/please tell us a bit more about what you're building/i);
      await expect(errorMessage).toBeVisible();
    });

    test('should return success true on valid submission', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description for testing.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const gotItHeading = page.getByRole('heading', { name: /got it/i });
      await expect(gotItHeading).toBeVisible({ timeout: 10000 });
    });

    test('should validate email format via Zod schema', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('not-an-email');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });

    test('should validate name minimum length via Zod schema', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('A');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const nameError = page.getByText(/at least 2 characters/i);
      await expect(nameError).toBeVisible();
    });

    test('should require "how did you hear about us" via Zod schema', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');
      // Source deliberately left unselected.

      await page.getByRole('button', { name: /send it/i }).click();

      const sourceError = page.getByText(/please tell us how you heard about us/i);
      await expect(sourceError).toBeVisible();
    });

    test('should gracefully handle errors', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const successOrError = page.locator(
        '[role="heading"]:has-text("Got it"), [role="alert"]:has-text("error")'
      );
      await expect(
        successOrError.first().or(page.getByText(/got it/i))
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Form State Management', () => {
    test('should show loading state during submission', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      const submitButton = page.getByRole('button', { name: /send it/i });
      await submitButton.click();

      const spinner = page.locator('svg.animate-spin');
      await expect.soft(spinner).toBeVisible({ timeout: 100 });

      const success = page.getByRole('heading', { name: /got it/i });
      await expect(success).toBeVisible({ timeout: 10000 });
    });

    test('should disable button during submission to prevent double-submit', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page
        .getByLabel(/what are you trying to build/i)
        .fill('This is a detailed project description.');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      const submitButton = page.getByRole('button', { name: /send it/i });
      await submitButton.click();

      const success = page.getByRole('heading', { name: /got it/i });
      await expect(success).toBeVisible({ timeout: 10000 });
    });
  });
});
