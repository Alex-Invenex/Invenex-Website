import { test, expect } from '@playwright/test';

test.describe('Story 5-1: Contact Page with Quote Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test.describe('AC1: Form Fields', () => {
    test('should display hero section with headline', async ({ page }) => {
      const heroHeading = page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
      await expect(heroHeading).toContainText(/Let's Build Something Great/i);
    });

    test('should display quote request form', async ({ page }) => {
      const form = page.locator('form[data-testid="quote-form"]');
      await expect(form).toBeVisible();
    });

    test('should have Name field (required)', async ({ page }) => {
      const nameInput = page.getByLabel(/your name/i);
      await expect(nameInput).toBeVisible();
      await expect(nameInput).toHaveAttribute('required', '');
    });

    test('should have Email field (required)', async ({ page }) => {
      const emailInput = page.getByLabel(/email address/i);
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('required', '');
      await expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('should have Project Type select', async ({ page }) => {
      const projectTypeSelect = page.getByLabel(/project type/i);
      await expect(projectTypeSelect).toBeVisible();

      // Check options
      await expect(projectTypeSelect.locator('option')).toHaveCount(5);
    });

    test('should have Budget Range select', async ({ page }) => {
      const budgetSelect = page.getByLabel(/budget range/i);
      await expect(budgetSelect).toBeVisible();

      // Check options
      await expect(budgetSelect.locator('option')).toHaveCount(4);
    });

    test('should have Project Description textarea (required)', async ({ page }) => {
      const descriptionTextarea = page.getByLabel(/project description/i);
      await expect(descriptionTextarea).toBeVisible();
    });

    test('should have "How did you hear about us" select (optional)', async ({ page }) => {
      const sourceSelect = page.getByLabel(/how did you hear about us/i);
      await expect(sourceSelect).toBeVisible();

      // Should have empty option plus choices
      await expect(sourceSelect.locator('option')).toHaveCount(5);
    });

    test('should have submit button', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /send message|submit/i });
      await expect(submitButton).toBeVisible();
    });

    test('should display alternative contact section', async ({ page }) => {
      const contactSection = page.locator('[data-testid="contact-info"]');
      await expect(contactSection).toBeVisible();

      // Email
      await expect(page.getByRole('heading', { name: 'Email' })).toBeVisible();
      await expect(contactSection.locator('a[href^="mailto:"]')).toBeVisible();

      // Phone
      await expect(page.getByRole('heading', { name: 'Phone' })).toBeVisible();
      await expect(contactSection.locator('a[href^="tel:"]')).toBeVisible();

      // WhatsApp
      await expect(page.getByRole('heading', { name: 'WhatsApp' })).toBeVisible();
      await expect(contactSection.locator('a[href^="https://wa.me/"]')).toBeVisible();

      // Address
      await expect(page.getByRole('heading', { name: 'Address' })).toBeVisible();

      // Business Hours
      await expect(page.getByRole('heading', { name: 'Business Hours' })).toBeVisible();
    });
  });

  test.describe('AC2: Form Submission', () => {
    test('should show loading state on submit', async ({ page }) => {
      // Fill required fields
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/project description/i).fill('Test project description');

      // Submit form
      const submitButton = page.getByRole('button', { name: /send message/i });
      await submitButton.click();

      // Check for loading spinner
      const loadingSpinner = page.locator('form svg.animate-spin');
      await expect(loadingSpinner).toBeVisible();
    });

    test('should show success message after valid submission', async ({ page }) => {
      // Fill required fields
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/project description/i).fill('Test project description');

      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();

      // Wait for success message
      const successMessage = page.getByText(/thank you/i);
      await expect(successMessage).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('AC3: Validation', () => {
    test('should show error for empty name', async ({ page }) => {
      // Leave name empty, fill other required fields
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/project description/i).fill('Test description');

      // Submit
      await page.getByRole('button', { name: /send message/i }).click();

      // Check for error
      const nameError = page.getByText(/name is required/i);
      await expect(nameError).toBeVisible();
    });

    test('should show error for empty email', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/project description/i).fill('Test description');

      await page.getByRole('button', { name: /send message/i }).click();

      const emailError = page.getByText(/email is required/i);
      await expect(emailError).toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('invalid-email');
      await page.getByLabel(/project description/i).fill('Test description');

      await page.getByRole('button', { name: /send message/i }).click();

      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });

    test('should show error for email missing domain', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('test@');
      await page.getByLabel(/project description/i).fill('Test description');

      await page.getByRole('button', { name: /send message/i }).click();

      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });

    test('should show error for email missing local part', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('@test.com');
      await page.getByLabel(/project description/i).fill('Test description');

      await page.getByRole('button', { name: /send message/i }).click();

      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });

    test('should show error for empty description', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      // Leave description empty

      await page.getByRole('button', { name: /send message/i }).click();

      const descError = page.getByText(/please describe your project/i);
      await expect(descError).toBeVisible();
    });

    test('should focus on first error field after validation failure', async ({ page }) => {
      // Submit empty form
      await page.getByRole('button', { name: /send message/i }).click();

      // First field (name) should be focused
      const nameInput = page.getByLabel(/your name/i);
      await expect(nameInput).toBeFocused();
    });
  });

  test.describe('Page Metadata', () => {
    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/contact/i);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper section landmarks', async ({ page }) => {
      const heroSection = page.locator('section[aria-labelledby="contact-hero-heading"]');
      await expect(heroSection).toBeVisible();

      const formSection = page.locator('section[aria-labelledby="contact-form-heading"]');
      await expect(formSection).toBeVisible();
    });

    test('form fields should have proper ARIA attributes on error', async ({ page }) => {
      // Submit empty form to trigger errors
      await page.getByRole('button', { name: /send message/i }).click();

      // Name input should have aria-invalid
      const nameInput = page.getByLabel(/your name/i);
      await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test.describe('Responsive Design', () => {
    test('form and contact info should stack on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/contact');

      const form = page.locator('form[data-testid="quote-form"]');
      const contactInfo = page.locator('[data-testid="contact-info"]');

      await expect(form).toBeVisible();
      await expect(contactInfo).toBeVisible();
    });
  });
});
