import { test, expect } from "@playwright/test";

test.describe("Job Listings - Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/careers");
  });

  test.describe("AC1: Job Listings Display", () => {
    test("shows department filter tabs", async ({ page }) => {
      const positionsSection = page.locator(
        '[data-testid="careers-positions-section"]'
      );

      // All required departments should be visible
      await expect(
        positionsSection.getByRole("button", { name: /All/i })
      ).toBeVisible();
      await expect(
        positionsSection.getByRole("button", { name: /Engineering/i })
      ).toBeVisible();
      await expect(
        positionsSection.getByRole("button", { name: /Design/i })
      ).toBeVisible();
      await expect(
        positionsSection.getByRole("button", { name: /Marketing/i })
      ).toBeVisible();
      await expect(
        positionsSection.getByRole("button", { name: /Operations/i })
      ).toBeVisible();
    });

    test("displays job listing cards with required information", async ({
      page,
    }) => {
      const jobCards = page.locator('[data-testid="job-card"]');

      // Should have at least one job card
      await expect(jobCards.first()).toBeVisible();

      // First job card should have required elements
      const firstCard = jobCards.first();

      // Job title
      await expect(firstCard.locator("h3")).toBeVisible();

      // Department badge
      await expect(firstCard.locator('[data-testid="job-department"]')).toBeVisible();

      // Location
      await expect(firstCard.locator('[data-testid="job-location"]')).toBeVisible();

      // Experience level
      await expect(firstCard.locator('[data-testid="job-experience"]')).toBeVisible();

      // Apply button
      await expect(
        firstCard.getByRole("link", { name: /Apply Now/i })
      ).toBeVisible();
    });

    test("displays tech stack tags on job cards", async ({ page }) => {
      const jobCards = page.locator('[data-testid="job-card"]');
      const firstCard = jobCards.first();

      // Should have tech stack tags
      const techTags = firstCard.locator('[data-testid="job-tech-tag"]');
      await expect(techTags.first()).toBeVisible();
    });

    test("Apply button links to email application", async ({ page }) => {
      const jobCards = page.locator('[data-testid="job-card"]');
      const firstCard = jobCards.first();

      const applyLink = firstCard.getByRole("link", { name: /Apply Now/i });
      const href = await applyLink.getAttribute("href");

      // Should link to mailto: with job title (until Story 6-3 job detail pages are built)
      expect(href).toMatch(/^mailto:/);
      expect(href).toContain("Application%20for");
    });
  });

  test.describe("AC2: Filter Functionality", () => {
    test("All filter is active by default", async ({ page }) => {
      const allButton = page.locator(
        '[data-testid="careers-positions-section"]'
      ).getByRole("button", { name: /All/i });

      // All button should be active (has different styling)
      await expect(allButton).toHaveAttribute("data-active", "true");
    });

    test("clicking department filter filters jobs", async ({ page }) => {
      const positionsSection = page.locator(
        '[data-testid="careers-positions-section"]'
      );

      // Get initial job count
      const initialCards = positionsSection.locator('[data-testid="job-card"]');
      const initialCount = await initialCards.count();

      // Click Engineering filter
      await positionsSection
        .getByRole("button", { name: /Engineering/i })
        .click();

      // Wait for animation
      await page.waitForTimeout(500);

      // All visible jobs should be Engineering
      const filteredCards = positionsSection.locator('[data-testid="job-card"]');
      const filteredCount = await filteredCards.count();

      // If Engineering jobs exist, verify they're all Engineering
      if (filteredCount > 0) {
        for (let i = 0; i < filteredCount; i++) {
          const dept = filteredCards.nth(i).locator('[data-testid="job-department"]');
          await expect(dept).toContainText("Engineering");
        }
      }
    });

    test("filter buttons show job count", async ({ page }) => {
      const positionsSection = page.locator(
        '[data-testid="careers-positions-section"]'
      );

      // Engineering button should show count
      const engineeringButton = positionsSection.getByRole("button", {
        name: /Engineering/i,
      });

      // Should contain a number in parentheses
      const buttonText = await engineeringButton.textContent();
      expect(buttonText).toMatch(/Engineering\s*\(\d+\)/i);
    });

    test("clicking filter changes active state", async ({ page }) => {
      const positionsSection = page.locator(
        '[data-testid="careers-positions-section"]'
      );

      // Click Engineering
      await positionsSection
        .getByRole("button", { name: /Engineering/i })
        .click();

      // Engineering should now be active
      const engineeringButton = positionsSection.getByRole("button", {
        name: /Engineering/i,
      });
      await expect(engineeringButton).toHaveAttribute("data-active", "true");

      // All should no longer be active
      const allButton = positionsSection.getByRole("button", { name: /All/i });
      await expect(allButton).toHaveAttribute("data-active", "false");
    });
  });

  test.describe("AC3: Empty State", () => {
    test("shows empty state message when no jobs in department", async ({
      page,
    }) => {
      const positionsSection = page.locator(
        '[data-testid="careers-positions-section"]'
      );

      // Click a department that has no jobs (Operations in our sample data)
      await positionsSection
        .getByRole("button", { name: /Operations/i })
        .click();

      // Wait for animation
      await page.waitForTimeout(500);

      // Should show empty state
      const emptyState = positionsSection.locator('[data-testid="job-listings-empty"]');
      await expect(emptyState).toBeVisible();
      await expect(emptyState).toContainText(/No open positions/i);
    });
  });

  test.describe("Accessibility", () => {
    test("filter buttons are keyboard accessible", async ({ page }) => {
      const positionsSection = page.locator(
        '[data-testid="careers-positions-section"]'
      );

      // Tab to first filter button
      const allButton = positionsSection.getByRole("button", { name: /All/i });
      await allButton.focus();

      // Should be focused
      await expect(allButton).toBeFocused();

      // Press Tab to move to next button
      await page.keyboard.press("Tab");

      const engineeringButton = positionsSection.getByRole("button", {
        name: /Engineering/i,
      });
      await expect(engineeringButton).toBeFocused();
    });

    test("job cards have proper focus styles", async ({ page }) => {
      const firstCard = page.locator('[data-testid="job-card"]').first();
      const applyLink = firstCard.getByRole("link", { name: /Apply Now/i });

      await applyLink.focus();
      await expect(applyLink).toBeFocused();
    });
  });
});

test.describe("Job Listings - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/careers");
  });

  test("filter tabs wrap properly on mobile", async ({ page }) => {
    const positionsSection = page.locator(
      '[data-testid="careers-positions-section"]'
    );

    // All filter tabs should be visible
    await expect(
      positionsSection.getByRole("button", { name: /All/i })
    ).toBeVisible();
    await expect(
      positionsSection.getByRole("button", { name: /Operations/i })
    ).toBeVisible();
  });

  test("job cards display properly in single column", async ({ page }) => {
    const jobCards = page.locator('[data-testid="job-card"]');

    // Should be visible
    await expect(jobCards.first()).toBeVisible();

    // Cards should have full width on mobile
    const firstCard = jobCards.first();
    const box = await firstCard.boundingBox();
    expect(box).not.toBeNull();

    // Card should be close to container width (accounting for padding)
    if (box) {
      expect(box.width).toBeGreaterThan(300);
    }
  });

  test("Apply button is tappable on mobile", async ({ page }) => {
    const jobCards = page.locator('[data-testid="job-card"]');
    const firstCard = jobCards.first();

    const applyButton = firstCard.getByRole("link", { name: /Apply Now/i });
    await expect(applyButton).toBeVisible();

    // Button should have adequate tap target size
    const box = await applyButton.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("filtering works on mobile", async ({ page }) => {
    const positionsSection = page.locator(
      '[data-testid="careers-positions-section"]'
    );

    // Tap Engineering filter
    await positionsSection
      .getByRole("button", { name: /Engineering/i })
      .tap();

    // Wait for animation
    await page.waitForTimeout(500);

    // Should show filtered results
    const engineeringButton = positionsSection.getByRole("button", {
      name: /Engineering/i,
    });
    await expect(engineeringButton).toHaveAttribute("data-active", "true");
  });
});
