import { test, expect } from '@playwright/test';
import { getBudgetBands } from '../src/lib/pricing';

test.describe('Contact page rebuild (Task 14)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test.describe('Hero', () => {
    test('should display the new headline', async ({ page }) => {
      const heroHeading = page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
      // The headline is two separate <span data-sh="word"> blocks with no
      // literal whitespace text node between them ("TELL US WHAT" +
      // "YOU'RE BUILDING.") — \s* tolerates that concatenation.
      await expect(heroHeading).toContainText(/tell us what\s*you're building/i);
    });
  });

  test.describe('AC1: Form Fields', () => {
    test('should display quote request form (no calendar configured)', async ({ page }) => {
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

    test('should NOT have a Project Type field', async ({ page }) => {
      await expect(page.getByLabel(/project type/i)).toHaveCount(0);
    });

    test('should have "What are you trying to build?" textarea (required)', async ({ page }) => {
      const textarea = page.getByLabel(/what are you trying to build/i);
      await expect(textarea).toBeVisible();
      await expect(textarea).toHaveAttribute('required', '');
    });

    test('should have a Budget select with 4 currency-aware bands, highest first', async ({
      page,
    }) => {
      const budgetSelect = page.getByLabel(/budget/i);
      await expect(budgetSelect).toBeVisible();

      const options = budgetSelect.locator('option');
      await expect(options).toHaveCount(4);

      // Default currency (no geo header) is INR — assert against the exact
      // labels `getBudgetBands` produces so this test fails the moment the
      // pricing data and the rendered form drift apart.
      const bands = getBudgetBands('INR');
      const optionTexts = await options.allTextContents();
      expect(optionTexts).toEqual(bands.map((b) => b.label));

      // Highest band ("₹10,00,000+" today) must be the first option — the
      // contrast-effect reordering from the copy deck.
      await expect(options.first()).toHaveText(bands[0].label);
      expect(bands[0].value).toBe('band-4');
    });

    test('should have a required "How did you hear about us?" select', async ({ page }) => {
      const sourceSelect = page.getByLabel(/how did you hear about us/i);
      await expect(sourceSelect).toBeVisible();
      // `aria-required`, not the native `required` attribute — the latter
      // would disable the placeholder option on this shared `Select`
      // component, and a disabled option is skipped when the browser
      // assigns a default selection, silently defaulting to "Google
      // Search" instead of starting blank. See the comment in quote-form.tsx.
      await expect(sourceSelect).toHaveAttribute('aria-required', 'true');
      await expect(sourceSelect).toHaveValue('');
      // Label no longer says "(Optional)".
      await expect(page.getByText(/how did you hear about us\?\s*\(optional\)/i)).toHaveCount(0);

      // Placeholder + 4 real choices.
      await expect(sourceSelect.locator('option')).toHaveCount(5);
    });

    test('should have "Send it" submit button', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /send it/i });
      await expect(submitButton).toBeVisible();
    });

    test('should show the goal-gradient progress bar starting at 20%, Step 1 of 2', async ({
      page,
    }) => {
      const progress = page.getByTestId('quote-form-progress');
      await expect(progress).toBeVisible();
      await expect(progress).toContainText(/step 1 of 2/i);
      await expect(progress).toContainText(/you're 20% done/i);

      const bar = page.getByTestId('quote-form-progress-bar');
      await expect(bar).toHaveCSS('width', /.+/);
      const width = await bar.evaluate((el) => el.style.width);
      expect(width).toBe('20%');
    });

    test('should display a "see pricing" link', async ({ page }) => {
      // Scoped to the form section — the nav also has a "See Pricing" CTA
      // elsewhere on the page, which would otherwise make this ambiguous.
      const formSection = page.locator('section[aria-labelledby="contact-form-heading"]');
      const pricingLink = formSection.getByRole('link', { name: 'see pricing' });
      await expect(pricingLink).toBeVisible();
      await expect(pricingLink).toHaveAttribute('href', '/pricing');
      await expect(formSection.getByText(/looking for prices\?/i)).toBeVisible();
    });

    test('should display alternative contact section with two-line business hours', async ({
      page,
    }) => {
      // Each contact card shares the same testid (5 cards) rather than a
      // single wrapping container, so scope existence checks with `.first()`.
      const contactSection = page.locator('[data-testid="contact-info"]');
      await expect(contactSection.first()).toBeVisible();
      await expect(contactSection).toHaveCount(5);

      // Email
      await expect(page.getByRole('heading', { name: 'Email' })).toBeVisible();
      await expect(page.locator('a[data-testid="contact-info"][href^="mailto:"]')).toBeVisible();

      // Phone
      await expect(page.getByRole('heading', { name: 'Phone' })).toBeVisible();
      await expect(page.locator('a[data-testid="contact-info"][href^="tel:"]')).toBeVisible();

      // WhatsApp
      await expect(page.getByRole('heading', { name: 'WhatsApp' })).toBeVisible();
      await expect(
        page.locator('a[data-testid="contact-info"][href^="https://wa.me/"]')
      ).toBeVisible();

      // Address
      await expect(page.getByRole('heading', { name: 'Address' })).toBeVisible();

      // Business Hours — both the IST line and the Gulf line.
      await expect(page.getByRole('heading', { name: 'Business Hours' })).toBeVisible();
      await expect(page.getByText(/IST/i)).toBeVisible();
      await expect(page.getByText(/Gulf clients/i)).toBeVisible();
      await expect(page.getByText(/Sun–Thu/i)).toBeVisible();
    });
  });

  test.describe('AC2: Form Submission', () => {
    async function fillRequiredFields(page: import('@playwright/test').Page) {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/what are you trying to build/i).fill('Test project description');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });
    }

    test('should show loading state on submit', async ({ page }) => {
      await fillRequiredFields(page);

      const submitButton = page.getByRole('button', { name: /send it/i });
      await submitButton.click();

      const loadingSpinner = page.locator('form svg.animate-spin');
      await expect(loadingSpinner).toBeVisible();
    });

    test('should show success message and Step 2 of 2 / 100% progress after valid submission', async ({
      page,
    }) => {
      await fillRequiredFields(page);
      await page.getByRole('button', { name: /send it/i }).click();

      const successHeading = page.getByRole('heading', { name: /got it/i });
      await expect(successHeading).toBeVisible({ timeout: 10000 });
      await expect(
        page.getByText(/you'll hear from a founder within one working day/i)
      ).toBeVisible();

      const progress = page.getByTestId('quote-form-progress');
      await expect(progress).toContainText(/step 2 of 2/i);
      await expect(progress).toContainText(/you're 100% done/i);
      const bar = page.getByTestId('quote-form-progress-bar');
      const width = await bar.evaluate((el) => el.style.width);
      expect(width).toBe('100%');
    });
  });

  test.describe('AC3: Validation', () => {
    test('should show error for empty name', async ({ page }) => {
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/what are you trying to build/i).fill('Test description');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const nameError = page.getByText(/name is required/i);
      await expect(nameError).toBeVisible();
    });

    test('should show error for empty email', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/what are you trying to build/i).fill('Test description');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const emailError = page.getByText(/email is required/i);
      await expect(emailError).toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('invalid-email');
      await page.getByLabel(/what are you trying to build/i).fill('Test description');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const emailError = page.getByText(/invalid email/i);
      await expect(emailError).toBeVisible();
    });

    test('should show error for empty description', async ({ page }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/how did you hear about us/i).selectOption({ index: 1 });

      await page.getByRole('button', { name: /send it/i }).click();

      const descError = page.getByText(/please tell us what you're building/i);
      await expect(descError).toBeVisible();
    });

    test('should show error when "how did you hear about us" is left unselected', async ({
      page,
    }) => {
      await page.getByLabel(/your name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john@example.com');
      await page.getByLabel(/what are you trying to build/i).fill('Test description');

      await page.getByRole('button', { name: /send it/i }).click();

      const sourceError = page.getByText(/please tell us how you heard about us/i);
      await expect(sourceError).toBeVisible();
    });

    test('should focus on first error field after validation failure', async ({ page }) => {
      await page.getByRole('button', { name: /send it/i }).click();

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
      await page.getByRole('button', { name: /send it/i }).click();

      const nameInput = page.getByLabel(/your name/i);
      await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test.describe('Responsive Design', () => {
    test('form and contact info should stack on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/contact');

      // `.first()` — a second (soon-removed) copy of the page can briefly
      // coexist during the route transition, and each contact card shares
      // one testid rather than a single wrapping container.
      const form = page.locator('form[data-testid="quote-form"]').first();
      const contactInfo = page.locator('[data-testid="contact-info"]').first();

      await expect(form).toBeVisible();
      await expect(contactInfo).toBeVisible();
    });
  });
});

test.describe('Contact page — currency-aware budget bands (server HTML)', () => {
  // The dev server compiles /contact on first hit; be generous.
  test.describe.configure({ timeout: 120_000 });

  test('serves AED budget labels in the initial server HTML for a UAE visitor', async ({
    request,
  }) => {
    const res = await request.get('/contact', {
      headers: { 'x-vercel-ip-country': 'AE' },
    });
    expect(res.status()).toBe(200);

    const html = await res.text();
    const aedBands = getBudgetBands('AED');
    for (const band of aedBands) {
      expect(html).toContain(band.label);
    }
    // Must not leak the INR sheet's highest band into an AED page.
    const inrTopBand = getBudgetBands('INR')[0].label;
    expect(html).not.toContain(inrTopBand);
  });

  test('serves INR budget labels by default (no country header)', async ({ request }) => {
    const res = await request.get('/contact');
    expect(res.status()).toBe(200);

    const html = await res.text();
    const inrBands = getBudgetBands('INR');
    for (const band of inrBands) {
      expect(html).toContain(band.label);
    }
  });
});
