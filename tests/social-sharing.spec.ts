import { test, expect } from "@playwright/test";

test.describe("Social Sharing Functionality", () => {
  test.describe("Case Study Pages", () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to a case study page (CoolTech International)
      await page.goto("/portfolio/cooltech-international");
    });

    test("displays all share buttons", async ({ page }) => {
      const shareButtons = page.locator('[data-testid="share-buttons"]');
      await expect(shareButtons).toBeVisible();

      // Check all social buttons are present
      await expect(
        page.getByRole("button", { name: /share on twitter/i })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /share on linkedin/i })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /share on facebook/i })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /copy link/i })
      ).toBeVisible();
    });

    test("displays share label", async ({ page }) => {
      await expect(page.getByText("Share:")).toBeVisible();
    });

    test("Twitter share button opens correct URL", async ({ page, context }) => {
      // Listen for new page (popup)
      const popupPromise = context.waitForEvent("page");

      await page.getByRole("button", { name: /share on twitter/i }).click();

      const popup = await popupPromise;
      const url = popup.url();

      expect(url).toContain("twitter.com/intent/tweet");
      expect(url).toContain("url=");
      expect(url).toContain("text=");
    });

    test("LinkedIn share button opens correct URL", async ({
      page,
      context,
    }) => {
      const popupPromise = context.waitForEvent("page");

      await page.getByRole("button", { name: /share on linkedin/i }).click();

      const popup = await popupPromise;
      const url = popup.url();

      expect(url).toContain("linkedin.com/sharing/share-offsite");
      expect(url).toContain("url=");
    });

    test("Facebook share button opens correct URL", async ({
      page,
      context,
    }) => {
      const popupPromise = context.waitForEvent("page");

      await page.getByRole("button", { name: /share on facebook/i }).click();

      const popup = await popupPromise;
      const url = popup.url();

      expect(url).toContain("facebook.com/sharer");
      expect(url).toContain("u=");
    });

    test("Copy link button copies URL and shows checkmark", async ({
      page,
    }) => {
      // Grant clipboard permissions
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

      const copyButton = page.getByRole("button", { name: /copy link/i });
      await copyButton.click();

      // Check for checkmark icon (success state)
      const checkIcon = copyButton.locator('svg path[d*="M5 13l4 4L19 7"]');
      await expect(checkIcon).toBeVisible();

      // Verify URL is copied to clipboard
      const clipboardText = await page.evaluate(() =>
        navigator.clipboard.readText()
      );
      expect(clipboardText).toContain("/portfolio/cooltech-international");
    });

    test("Copy button shows toast notification", async ({ page }) => {
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

      await page.getByRole("button", { name: /copy link/i }).click();

      // Check for toast notification
      await expect(page.getByText("Link copied!")).toBeVisible();
    });

    test("Checkmark reverts back to copy icon after delay", async ({
      page,
    }) => {
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

      const copyButton = page.getByRole("button", { name: /copy link/i });
      await copyButton.click();

      // Check for checkmark
      const checkIcon = copyButton.locator('svg path[d*="M5 13l4 4L19 7"]');
      await expect(checkIcon).toBeVisible();

      // Wait for the state to revert (2 seconds + buffer)
      await page.waitForTimeout(2500);

      // Check copy icon is back (link/duplicate icon)
      const copyIcon = copyButton.locator('svg path[d*="M8 16H6"]');
      await expect(copyIcon).toBeVisible();
    });
  });

  test.describe("Service Detail Pages", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/services/web-development");
    });

    test("displays share buttons on service page", async ({ page }) => {
      const shareButtons = page.locator('[data-testid="share-buttons"]');
      await expect(shareButtons).toBeVisible();
    });

    test("share buttons work on service pages", async ({ page, context }) => {
      const popupPromise = context.waitForEvent("page");

      await page.getByRole("button", { name: /share on twitter/i }).click();

      const popup = await popupPromise;
      const url = popup.url();

      expect(url).toContain("twitter.com/intent/tweet");
      expect(url).toContain("/services/web-development");
    });
  });

  test.describe("Mobile Viewport", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("share buttons are visible on mobile", async ({ page }) => {
      await page.goto("/portfolio/cooltech-international");

      const shareButtons = page.locator('[data-testid="share-buttons"]');
      await expect(shareButtons).toBeVisible();
    });

    test("all social buttons are accessible on mobile", async ({ page }) => {
      await page.goto("/portfolio/cooltech-international");

      await expect(
        page.getByRole("button", { name: /share on twitter/i })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /share on linkedin/i })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /share on facebook/i })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /copy link/i })
      ).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("share buttons have proper ARIA labels", async ({ page }) => {
      await page.goto("/portfolio/cooltech-international");

      const twitterBtn = page.getByRole("button", { name: /share on twitter/i });
      const linkedinBtn = page.getByRole("button", { name: /share on linkedin/i });
      const facebookBtn = page.getByRole("button", { name: /share on facebook/i });
      const copyBtn = page.getByRole("button", { name: /copy link/i });

      // Verify aria-labels
      await expect(twitterBtn).toHaveAttribute("aria-label", "Share on Twitter");
      await expect(linkedinBtn).toHaveAttribute("aria-label", "Share on LinkedIn");
      await expect(facebookBtn).toHaveAttribute("aria-label", "Share on Facebook");
      await expect(copyBtn).toHaveAttribute("aria-label", "Copy link");
    });

    test("share buttons are keyboard accessible", async ({ page }) => {
      await page.goto("/portfolio/cooltech-international");

      // Tab to share buttons
      const twitterBtn = page.getByRole("button", { name: /share on twitter/i });
      await twitterBtn.focus();

      // Check it has focus-visible styles
      await expect(twitterBtn).toBeFocused();
    });
  });
});
