import { test, expect } from '@playwright/test';

test.describe('Story 5-4: WhatsApp Floating Button', () => {
  test.describe('AC1: Button Visibility', () => {
    test('should display WhatsApp button on homepage', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toBeVisible();
    });

    test('should display WhatsApp button on contact page', async ({ page }) => {
      await page.goto('/contact');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toBeVisible();
    });

    test('should display WhatsApp button on portfolio page', async ({ page }) => {
      await page.goto('/portfolio');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toBeVisible();
    });

    test('should display WhatsApp button on services page', async ({ page }) => {
      await page.goto('/services');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toBeVisible();
    });

    test('should have WhatsApp icon (SVG)', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const svg = whatsappButton.locator('svg');
      await expect(svg).toBeVisible();
    });

    test('should have pulse animation element', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const pulseElement = whatsappButton.locator('[data-testid="whatsapp-pulse"]');
      await expect(pulseElement).toBeVisible();
    });

    test('should be positioned in bottom-right corner', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toHaveCSS('position', 'fixed');

      // Check approximate positioning (bottom-right)
      const box = await whatsappButton.boundingBox();
      const viewport = page.viewportSize();

      if (box && viewport) {
        // Button should be near bottom-right corner
        expect(box.x + box.width).toBeGreaterThan(viewport.width - 100);
        expect(box.y + box.height).toBeGreaterThan(viewport.height - 100);
      }
    });

    test('should have proper z-index (above content)', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const zIndex = await whatsappButton.evaluate((el) =>
        window.getComputedStyle(el).zIndex
      );

      // z-index should be 50 or higher
      expect(parseInt(zIndex)).toBeGreaterThanOrEqual(50);
    });
  });

  test.describe('AC2: WhatsApp Action', () => {
    test('should have correct WhatsApp link with pre-filled message', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const href = await whatsappButton.getAttribute('href');

      // Should use wa.me URL format
      expect(href).toContain('https://wa.me/');

      // Should have pre-filled message
      expect(href).toContain('text=');
      expect(decodeURIComponent(href!)).toContain("I'm interested in learning more about your services");
    });

    test('should open in new tab', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');

      await expect(whatsappButton).toHaveAttribute('target', '_blank');
      await expect(whatsappButton).toHaveAttribute('rel', /noopener/);
    });

    test('should have accessible label', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toHaveAttribute('aria-label', /whatsapp/i);
    });
  });

  test.describe('AC3: Mobile Optimization', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should be visible on mobile', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await expect(whatsappButton).toBeVisible();
    });

    test('should have minimum touch target size (48px)', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const box = await whatsappButton.boundingBox();

      if (box) {
        // Touch target should be at least 48px
        expect(box.width).toBeGreaterThanOrEqual(48);
        expect(box.height).toBeGreaterThanOrEqual(48);
      }
    });

    test('should be in thumb-friendly zone on mobile', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const box = await whatsappButton.boundingBox();
      const viewport = page.viewportSize();

      if (box && viewport) {
        // Button should be in bottom portion of screen (thumb-friendly)
        const buttonBottomEdge = box.y + box.height;
        expect(buttonBottomEdge).toBeGreaterThan(viewport.height * 0.7);
      }
    });

    test('should have proper spacing from screen edge', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      const box = await whatsappButton.boundingBox();
      const viewport = page.viewportSize();

      if (box && viewport) {
        // Should have at least 16px spacing from edges
        const rightSpacing = viewport.width - (box.x + box.width);
        const bottomSpacing = viewport.height - (box.y + box.height);

        expect(rightSpacing).toBeGreaterThanOrEqual(16);
        expect(bottomSpacing).toBeGreaterThanOrEqual(16);
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should be keyboard focusable', async ({ page }) => {
      await page.goto('/');

      // Tab through page to reach WhatsApp button
      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await whatsappButton.focus();
      await expect(whatsappButton).toBeFocused();
    });

    test('should have focus-visible styles', async ({ page }) => {
      await page.goto('/');

      const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
      await whatsappButton.focus();

      // Check that the element has focus state styling
      const outline = await whatsappButton.evaluate((el) =>
        window.getComputedStyle(el).outline
      );

      // Should have some focus indication (not 'none')
      expect(outline).not.toBe('none');
    });
  });
});
