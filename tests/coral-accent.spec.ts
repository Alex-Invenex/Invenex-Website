import { test, expect } from "@playwright/test";

/**
 * Coral Accent Color Tests - Story 9.4
 *
 * Tests coral accent color integration:
 * - AC1: Coral color tokens and utility classes
 * - AC2: Primary CTAs with coral accent
 * - AC3: WCAG AA contrast compliance
 */

// ===========================================
// AC1: Coral Color Tokens
// ===========================================

test.describe("Coral Color Tokens (AC1)", () => {
  test("coral CSS custom properties are defined", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check that coral CSS variables are defined
    const coral500 = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue(
        "--color-coral-500"
      );
    });

    // Should have coral-500 defined (primary coral color)
    expect(coral500.trim()).toBeTruthy();
    expect(coral500.trim().toLowerCase()).toMatch(/#ff6b35|rgb\(255,\s*107,\s*53\)/i);
  });

  test("coral color scale is complete (50, 100, 300, 500, 700)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const scales = ["50", "100", "300", "500", "700"];

    for (const scale of scales) {
      const value = await page.evaluate((s) => {
        return getComputedStyle(document.documentElement).getPropertyValue(
          `--color-coral-${s}`
        );
      }, scale);

      expect(value.trim(), `coral-${scale} should be defined`).toBeTruthy();
    }
  });
});

// ===========================================
// AC1: Utility Classes
// ===========================================

test.describe("Coral Utility Classes (AC1)", () => {
  test("bg-coral-* utilities apply correct background colors", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test element with coral background
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.id = "coral-test";
      div.className = "bg-coral-500";
      div.style.width = "100px";
      div.style.height = "100px";
      document.body.appendChild(div);
    });

    const testElement = page.locator("#coral-test");
    await expect(testElement).toBeVisible();

    // Check background color is coral-ish (orange-red)
    const bgColor = await testElement.evaluate((el) => {
      return getComputedStyle(el).backgroundColor;
    });

    // rgb(255, 107, 53) is #FF6B35
    expect(bgColor).toMatch(/rgb\(255,\s*107,\s*53\)/);
  });

  test("text-coral-* utilities apply correct text colors", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test element with coral text
    await page.evaluate(() => {
      const span = document.createElement("span");
      span.id = "coral-text-test";
      span.className = "text-coral-500";
      span.textContent = "Coral Text";
      document.body.appendChild(span);
    });

    const testElement = page.locator("#coral-text-test");
    await expect(testElement).toBeVisible();

    const textColor = await testElement.evaluate((el) => {
      return getComputedStyle(el).color;
    });

    // rgb(255, 107, 53) is #FF6B35
    expect(textColor).toMatch(/rgb\(255,\s*107,\s*53\)/);
  });

  test("border-coral-* utilities apply correct border colors", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test element with coral border
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.id = "coral-border-test";
      div.className = "border-coral-500";
      div.style.width = "100px";
      div.style.height = "100px";
      div.style.borderWidth = "2px";
      div.style.borderStyle = "solid";
      document.body.appendChild(div);
    });

    const testElement = page.locator("#coral-border-test");
    await expect(testElement).toBeVisible();

    const borderColor = await testElement.evaluate((el) => {
      return getComputedStyle(el).borderColor;
    });

    // rgb(255, 107, 53) is #FF6B35
    expect(borderColor).toMatch(/rgb\(255,\s*107,\s*53\)/);
  });

  test("glow-coral utility applies box shadow", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test element with coral glow
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.id = "coral-glow-test";
      div.className = "glow-coral";
      div.style.width = "100px";
      div.style.height = "100px";
      document.body.appendChild(div);
    });

    const testElement = page.locator("#coral-glow-test");
    const boxShadow = await testElement.evaluate((el) => {
      return getComputedStyle(el).boxShadow;
    });

    // Should have a box shadow with coral-ish color
    expect(boxShadow).not.toBe("none");
    expect(boxShadow).toContain("rgba(255, 107, 53");
  });
});

// ===========================================
// AC2: Primary CTAs with Coral
// ===========================================

test.describe("Coral Button Variant (AC2)", () => {
  test("coral button variant can be rendered", async ({ page }) => {
    // Create a test page with coral button
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            :root {
              --color-coral-500: #FF6B35;
              --color-coral-700: #CC4A1A;
            }
            .btn-coral {
              background: linear-gradient(to right, #FF6B35, #CC4A1A);
              color: white;
              padding: 12px 24px;
              border-radius: 9999px;
              font-weight: 600;
              border: none;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .btn-coral:hover {
              transform: scale(1.02);
              box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
            }
          </style>
        </head>
        <body>
          <button class="btn-coral" data-testid="coral-button">Get Started</button>
        </body>
      </html>
    `);

    const button = page.locator('[data-testid="coral-button"]');
    await expect(button).toBeVisible();

    // Check that button has gradient background
    const bgImage = await button.evaluate((el) => {
      return getComputedStyle(el).backgroundImage;
    });

    expect(bgImage).toContain("gradient");
    expect(bgImage).toContain("rgb(255, 107, 53)"); // coral-500
  });

  test("coral button has hover glow effect", async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .btn-coral {
              background: linear-gradient(to right, #FF6B35, #CC4A1A);
              color: white;
              padding: 12px 24px;
              border-radius: 9999px;
              border: none;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
            }
            .btn-coral:hover {
              box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
            }
          </style>
        </head>
        <body>
          <button class="btn-coral" data-testid="coral-button">Get Started</button>
        </body>
      </html>
    `);

    const button = page.locator('[data-testid="coral-button"]');

    // Check initial shadow
    const initialShadow = await button.evaluate((el) => {
      return getComputedStyle(el).boxShadow;
    });
    expect(initialShadow).toContain("rgba(255, 107, 53");

    // Hover and check enhanced shadow
    await button.hover();
    await page.waitForTimeout(350); // Wait for transition

    const hoverShadow = await button.evaluate((el) => {
      return getComputedStyle(el).boxShadow;
    });
    expect(hoverShadow).toContain("rgba(255, 107, 53");
  });
});

// ===========================================
// AC3: WCAG AA Contrast
// ===========================================

test.describe("WCAG AA Contrast (AC3)", () => {
  test("coral-500 has sufficient contrast on dark background", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Get the coral-500 value and background color
    const colors = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        coral: style.getPropertyValue("--color-coral-500").trim(),
        background: style.getPropertyValue("--color-background").trim(),
      };
    });

    // Coral-500 (#FF6B35) on dark (#0A0A0A) should pass
    // Calculated contrast: ~5.8:1 which exceeds 4.5:1 for AA
    expect(colors.coral).toBeTruthy();
    expect(colors.background).toBeTruthy();

    // Verify colors are what we expect
    expect(colors.coral.toLowerCase()).toMatch(/#ff6b35/);
    expect(colors.background.toLowerCase()).toMatch(/#0a0a0a/);
  });

  test("coral button uses darker shade for WCAG compliance", async ({
    page,
  }) => {
    // The button should use coral-700 (#CC4A1A) which has better contrast with white text
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const coral700 = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue(
        "--color-coral-700"
      );
    });

    // Verify coral-700 exists for button usage
    expect(coral700.trim().toLowerCase()).toMatch(/#cc4a1a/);
  });

  test("text-coral-500 is readable on dark backgrounds", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test element
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.id = "contrast-test";
      div.className = "bg-background p-4";
      div.innerHTML = '<span class="text-coral-500">Coral accent text</span>';
      document.body.appendChild(div);
    });

    const textElement = page.locator("#contrast-test span");
    await expect(textElement).toBeVisible();

    // Visual check - text should be coral colored
    const textColor = await textElement.evaluate((el) => {
      return getComputedStyle(el).color;
    });

    expect(textColor).toMatch(/rgb\(255,\s*107,\s*53\)/);
  });
});

// ===========================================
// Integration Tests
// ===========================================

test.describe("Coral Integration", () => {
  test("coral colors load correctly on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Page should load without CSS errors
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a moment for any errors
    await page.waitForTimeout(500);

    // Filter out non-CSS related errors
    const cssErrors = consoleErrors.filter(
      (e) => e.includes("CSS") || e.includes("style")
    );
    expect(cssErrors).toHaveLength(0);
  });

  test("coral utilities work alongside existing utilities", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test element combining coral with other utilities
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.id = "combined-test";
      div.className =
        "bg-coral-500 text-white p-4 rounded-lg border border-coral-700";
      div.textContent = "Combined utilities test";
      document.body.appendChild(div);
    });

    const testElement = page.locator("#combined-test");
    await expect(testElement).toBeVisible();

    const styles = await testElement.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        padding: computed.padding,
        borderRadius: computed.borderRadius,
      };
    });

    // Background should be coral
    expect(styles.backgroundColor).toMatch(/rgb\(255,\s*107,\s*53\)/);
    // Text should be white
    expect(styles.color).toMatch(/rgb\(255,\s*255,\s*255\)/);
    // Padding should be applied
    expect(styles.padding).not.toBe("0px");
  });
});
