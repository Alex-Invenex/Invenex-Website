import { test, expect } from "@playwright/test";

test.describe("Story 9-7: Bento Box Portfolio Grid - Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
  });

  // Basic Structure Tests
  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio|Our Work.*Invenex/i);
  });

  test("displays hero section with Our Work headline", async ({ page }) => {
    const heroSection = page.getByTestId("portfolio-hero");
    await expect(heroSection).toBeVisible();

    const heading = page.getByRole("heading", {
      name: /Our Work|Portfolio/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("displays project count in hero section", async ({ page }) => {
    const heroSection = page.getByTestId("portfolio-hero");
    const projectCount = heroSection.getByTestId("project-count");
    await expect(projectCount).toBeVisible();
    await expect(projectCount).toContainText(/\d+.*Project/i);
  });

  // AC1: Bento Grid Layout
  test("renders a uniform grid of project cards", async ({ page }) => {
    const grid = page.locator('[data-testid="bento-portfolio-grid"]');
    await expect(grid).toBeVisible();
    const cards = page.locator('[data-testid="bento-project-card"]');
    expect(await cards.count()).toBe(14);
  });

  test("grid uses 2 columns on desktop", async ({ page }) => {
    const grid = page.locator('[data-testid="bento-portfolio-grid"]');
    await expect(grid).toHaveClass(/lg:grid-cols-2/);
  });

  // Filter Tabs
  test("displays filter tabs", async ({ page }) => {
    const filterSection = page.getByTestId("portfolio-filters");
    await expect(filterSection).toBeVisible();

    const allFilter = page.getByRole("button", { name: /^All$/i });
    await expect(allFilter).toBeVisible();

    const webFilter = page.getByRole("button", { name: /^Web$/i });
    await expect(webFilter).toBeVisible();

    const mobileFilter = page.getByRole("button", { name: /^Mobile$/i });
    await expect(mobileFilter).toBeVisible();

    const platformFilter = page.getByRole("button", { name: /^Platform$/i });
    await expect(platformFilter).toBeVisible();

    const ecommerceFilter = page.getByRole("button", {
      name: /E-Commerce|E Commerce|Ecommerce/i,
    });
    await expect(ecommerceFilter).toBeVisible();
  });

  test("All filter is active by default", async ({ page }) => {
    const allButton = page.getByRole("button", { name: /^All$/i });
    await expect(allButton).toHaveAttribute("aria-pressed", "true");
  });

  test("filter changes URL parameter", async ({ page }) => {
    await page.click('button:has-text("Web")');
    await page.waitForURL(/category=web/);
    expect(page.url()).toContain("category=web");

    await page.click('button:has-text("Platform")');
    await page.waitForURL(/category=platform/);
    expect(page.url()).toContain("category=platform");
  });

  test("filter shows only matching projects", async ({ page }) => {
    // Count Web projects
    await page.click('button:has-text("Web")');
    await page.waitForURL(/category=web/);
    // Wait for animation to complete
    await page.waitForTimeout(600);
    const webCards = page.locator('[data-testid="bento-project-card"]');
    await expect(webCards.first()).toBeVisible();
    const webCount = await webCards.count();

    // Count Platform projects (simpler - only 2)
    await page.click('button:has-text("Platform")');
    await page.waitForURL(/category=platform/);
    await page.waitForTimeout(600);
    const platformCards = page.locator('[data-testid="bento-project-card"]');
    await expect(platformCards.first()).toBeVisible();
    const platformCount = await platformCards.count();

    // Different categories have different counts
    expect(webCount).not.toBe(platformCount);
    // Web has more projects than Platform
    expect(webCount).toBeGreaterThan(platformCount);
  });

  // AC2: Editorial hover — desaturation via CSS class, no browser chrome
  test("card image desaturates by default and has no browser chrome", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop DOM check");
    const img = page.locator('[data-testid="bento-card-image"] img').first();
    await expect(img).toBeVisible();
    await expect(img).toHaveClass(/pf-card-img/);
    const chrome = await page
      .locator('[data-testid="bento-project-card"]').first()
      .locator('text=/^●/').count();
    expect(chrome).toBe(0);
  });

  // AC3: FLIP Transitions on Filter
  test("rapid filter changes work without errors", async ({ page }) => {
    await page.click('button:has-text("Web")');
    await page.waitForTimeout(100);
    await page.click('button:has-text("Platform")');
    await page.waitForTimeout(100);
    await page.click('button:has-text("E-Commerce")');
    await page.waitForTimeout(100);
    await page.click('button:has-text("All")');
    await page.waitForTimeout(500);

    const cards = page.locator('[data-testid="bento-project-card"]');
    expect(await cards.count()).toBe(14);
  });

  // Card Content
  test("cards contain required elements", async ({ page }) => {
    const card = page.locator('[data-testid="bento-project-card"]').first();

    await expect(card.locator('[data-testid="bento-card-title"]')).toBeVisible();
    await expect(
      card.locator('[data-testid="bento-card-category"]')
    ).toBeVisible();
    await expect(card.locator('[data-testid="bento-card-image"]')).toBeVisible();
  });

  test("cards are clickable links to case studies", async ({ page }) => {
    const firstCard = page.locator('[data-testid="bento-project-card"]').first();
    await expect(firstCard).toHaveAttribute("href", /\/portfolio\/[a-z0-9-]+/);
  });

  test("cards use flat website screenshots (no device-mockup, no portrait png)", async ({ page }) => {
    const srcs = await page.$$eval(
      '[data-testid="bento-card-image"] img',
      (imgs) => imgs.map((i) => (i as HTMLImageElement).getAttribute("src") || "")
    );
    expect(srcs.length).toBeGreaterThan(0);
    for (const s of srcs) {
      const decoded = decodeURIComponent(s);
      expect(decoded).not.toContain("-mockup.webp");
      expect(decoded).toMatch(/\.webp(\?|&|$)/);
    }
  });
});

test.describe("Story 9-7: Bento Box Portfolio Grid - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
  });

  test("displays single column grid on mobile", async ({ page }) => {
    const grid = page.locator('[data-testid="bento-portfolio-grid"]');
    await expect(grid).toHaveClass(/grid-cols-1/);
  });

  test("all cards are visible on mobile", async ({ page }) => {
    const cards = page.locator('[data-testid="bento-project-card"]');
    expect(await cards.count()).toBe(14);
  });

  test("filter buttons work on mobile", async ({ page }) => {
    await page.click('button:has-text("Web")');
    await page.waitForURL(/category=web/);
    expect(page.url()).toContain("category=web");
  });

  test("hero section is visible on mobile", async ({ page }) => {
    const heroSection = page.getByTestId("portfolio-hero");
    await expect(heroSection).toBeVisible();
  });
});

test.describe("Story 9-7: Bento Box Portfolio Grid - Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
  });

  test("displays 2 column grid on tablet", async ({ page }) => {
    const grid = page.locator('[data-testid="bento-portfolio-grid"]');
    await expect(grid).toHaveClass(/md:grid-cols-2/);
  });
});

test.describe("Story 9-7: Bento Box Portfolio Grid - Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
  });

  test("section has proper aria-labelledby", async ({ page }) => {
    const section = page.locator(
      '[data-testid="bento-portfolio-grid-section"]'
    );
    await expect(section).toHaveAttribute(
      "aria-labelledby",
      "bento-portfolio-grid-title"
    );
  });

  test("filter group has aria-label", async ({ page }) => {
    const filterGroup = page.locator('[data-testid="portfolio-filters"]');
    await expect(filterGroup).toHaveAttribute(
      "aria-label",
      "Filter projects by category"
    );
  });

  test("filter buttons have aria-pressed state", async ({ page }) => {
    const allButton = page.getByRole("button", { name: /^All$/i });
    await expect(allButton).toHaveAttribute("aria-pressed", "true");

    const webButton = page.getByRole("button", { name: /^Web$/i });
    await expect(webButton).toHaveAttribute("aria-pressed", "false");

    await webButton.click();
    await page.waitForTimeout(300);

    await expect(webButton).toHaveAttribute("aria-pressed", "true");
    await expect(allButton).toHaveAttribute("aria-pressed", "false");
  });

  test("cards are keyboard accessible", async ({ page }) => {
    // Cards should be focusable links
    const firstCard = page.locator('[data-testid="bento-project-card"]').first();

    // Focus the first card directly
    await firstCard.focus();

    // Verify it received focus
    await expect(firstCard).toBeFocused();
  });
});

test.describe("Story 9-7: Bento Box Portfolio Grid - Reduced Motion (AC5)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
  });

  test("grid renders correctly with reduced motion", async ({ page }) => {
    await expect(
      page.locator('[data-testid="bento-portfolio-grid"]')
    ).toBeVisible();

    const cards = page.locator('[data-testid="bento-project-card"]');
    expect(await cards.count()).toBe(14);
  });

  test("filters still work with reduced motion", async ({ page }) => {
    await page.click('button:has-text("Platform")');
    // Wait for URL change or cards to update
    await page.waitForFunction(
      () => window.location.search.includes("category=platform"),
      { timeout: 5000 }
    );
    expect(page.url()).toContain("category=platform");

    const cards = page.locator('[data-testid="bento-project-card"]');
    await page.waitForTimeout(500); // Wait for filter to apply
    expect(await cards.count()).toBe(2); // 2 Platform projects
  });
});

test.describe("Story 9-7: Bento Box Portfolio Grid - Performance", () => {
  test("page loads within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test("images are optimized", async ({ page }) => {
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="bento-portfolio-grid"]');

    // Verify grid images exist and have proper attributes
    const cards = page.locator('[data-testid="bento-project-card"]');
    await expect(cards.first()).toBeVisible();

    // Verify at least one card has an image container
    const imageContainers = page.locator('[data-testid="bento-card-image"]');
    expect(await imageContainers.count()).toBeGreaterThan(0);

    // Verify images inside containers
    const image = imageContainers.first().locator("img");
    await expect(image).toBeVisible();
  });
});
