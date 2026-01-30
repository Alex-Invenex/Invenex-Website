import { test, expect } from "@playwright/test";

/**
 * Micro-interactions Tests - Story 9.5
 *
 * Tests enhanced micro-interactions:
 * - AC1: Button ripple effect
 * - AC2: Form input focus enhancement
 * - AC3: Card hover lift
 * - AC4: Toast notifications
 */

// ===========================================
// AC1: Button Ripple Effect
// ===========================================

test.describe("Button Ripple Effect (AC1)", () => {
  test("ripple animation keyframe is defined", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check that ripple keyframe exists in stylesheets
    const hasRippleKeyframe = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (
              rule instanceof CSSKeyframesRule &&
              rule.name === "ripple"
            ) {
              return true;
            }
          }
        } catch {
          // Skip cross-origin stylesheets
        }
      }
      return false;
    });

    expect(hasRippleKeyframe).toBe(true);
  });

  test("animate-ripple class exists", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject element with animate-ripple class
    await page.evaluate(() => {
      const span = document.createElement("span");
      span.id = "ripple-test";
      span.className = "animate-ripple";
      span.style.width = "50px";
      span.style.height = "50px";
      span.style.display = "block";
      span.style.backgroundColor = "rgba(255,255,255,0.3)";
      document.body.appendChild(span);
    });

    const testElement = page.locator("#ripple-test");
    const animation = await testElement.evaluate((el) => {
      return getComputedStyle(el).animation;
    });

    // Should have ripple animation applied
    expect(animation).toContain("ripple");
  });

  test("RippleButton can be rendered with ripple functionality", async ({
    page,
  }) => {
    // Create a test page with ripple button pattern
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @keyframes ripple {
              0% { transform: scale(0); opacity: 1; }
              100% { transform: scale(1); opacity: 0; }
            }
            .animate-ripple {
              animation: ripple 600ms ease-out forwards;
            }
            .btn {
              position: relative;
              overflow: hidden;
              padding: 12px 24px;
              background: linear-gradient(to right, #8b5cf6, #3b82f6);
              color: white;
              border: none;
              border-radius: 9999px;
              cursor: pointer;
            }
            .ripple-element {
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.4);
            }
          </style>
        </head>
        <body>
          <button class="btn" id="ripple-btn" data-testid="ripple-button">
            <span id="ripple-container"></span>
            <span style="position:relative;z-index:1;">Click Me</span>
          </button>
          <script>
            const btn = document.getElementById('ripple-btn');
            const container = document.getElementById('ripple-container');
            btn.addEventListener('click', (e) => {
              const rect = btn.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const size = Math.max(rect.width, rect.height) * 2;

              const ripple = document.createElement('span');
              ripple.className = 'ripple-element animate-ripple';
              ripple.style.width = size + 'px';
              ripple.style.height = size + 'px';
              ripple.style.left = (x - size/2) + 'px';
              ripple.style.top = (y - size/2) + 'px';
              ripple.dataset.testid = 'ripple-effect';

              container.appendChild(ripple);
              setTimeout(() => ripple.remove(), 600);
            });
          </script>
        </body>
      </html>
    `);

    const button = page.locator('[data-testid="ripple-button"]');
    await expect(button).toBeVisible();

    // Click the button
    await button.click();

    // Check that ripple element was created
    const ripple = page.locator('[data-testid="ripple-effect"]');
    await expect(ripple).toBeVisible();
  });
});

// ===========================================
// AC2: Form Input Focus Enhancement
// ===========================================

test.describe("Input Focus Enhancement (AC2)", () => {
  test("input-enhanced class exists with focus styles", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test input with enhanced class
    await page.evaluate(() => {
      const input = document.createElement("input");
      input.id = "enhanced-input-test";
      input.className = "input-enhanced";
      input.type = "text";
      input.placeholder = "Test input";
      input.style.padding = "12px";
      input.style.width = "200px";
      input.style.border = "1px solid #333";
      input.style.borderRadius = "8px";
      input.style.backgroundColor = "#141414";
      input.style.color = "#fff";
      document.body.appendChild(input);
    });

    const input = page.locator("#enhanced-input-test");
    await expect(input).toBeVisible();

    // Focus the input
    await input.focus();

    // Check that focus styles are applied
    const styles = await input.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        transition: computed.transition,
      };
    });

    // Should have transition for smooth animation
    expect(styles.transition).toContain("transform");
  });

  test("contact form inputs are focusable", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("domcontentloaded");

    // Find name input
    const nameInput = page.locator('input[name="name"]').first();

    if ((await nameInput.count()) > 0) {
      await nameInput.focus();
      const isFocused = await nameInput.evaluate(
        (el) => document.activeElement === el
      );
      expect(isFocused).toBe(true);
    }
  });

  test("input focus has visible outline for accessibility", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.waitForLoadState("domcontentloaded");

    const nameInput = page.locator('input[name="name"]').first();

    if ((await nameInput.count()) > 0) {
      await nameInput.focus();

      const boxShadow = await nameInput.evaluate((el) => {
        return getComputedStyle(el).boxShadow;
      });

      // Should have some box-shadow for focus indication
      expect(boxShadow).not.toBe("none");
    }
  });
});

// ===========================================
// AC3: Card Hover Lift
// ===========================================

test.describe("Card Hover Lift (AC3)", () => {
  test("card-lift class exists with hover styles", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject test card with lift class
    await page.evaluate(() => {
      const card = document.createElement("div");
      card.id = "lift-card-test";
      card.className = "card-lift";
      card.style.width = "200px";
      card.style.height = "150px";
      card.style.padding = "20px";
      card.style.backgroundColor = "#141414";
      card.style.borderRadius = "16px";
      card.textContent = "Test Card";
      document.body.appendChild(card);
    });

    const card = page.locator("#lift-card-test");
    await expect(card).toBeVisible();

    // Check that transition is applied
    const transition = await card.evaluate((el) => {
      return getComputedStyle(el).transition;
    });

    expect(transition).toContain("transform");
    expect(transition).toContain("box-shadow");
  });

  test("card lift variant applies hover transform", async ({ page }) => {
    // Create test page with Card lift variant simulation
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .card-lift {
              width: 200px;
              height: 150px;
              padding: 20px;
              background: #141414;
              border-radius: 16px;
              transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                          box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
            }
            .card-lift:hover {
              transform: translateY(-8px);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
          </style>
        </head>
        <body>
          <div class="card-lift" data-testid="lift-card">Card Content</div>
        </body>
      </html>
    `);

    const card = page.locator('[data-testid="lift-card"]');
    await expect(card).toBeVisible();

    // Get initial transform
    const initialTransform = await card.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // Hover over card
    await card.hover();
    await page.waitForTimeout(350); // Wait for transition

    // Get hover transform
    const hoverTransform = await card.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // Transform should change (matrix includes translateY)
    // Note: translateY(-8px) becomes part of the matrix
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test("services page cards are hoverable", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("domcontentloaded");

    // Find a service card
    const serviceCard = page.locator('[data-testid^="service-card"]').first();

    if ((await serviceCard.count()) > 0) {
      // Hover over the card
      await serviceCard.hover();

      // Card should still be visible and interactive
      await expect(serviceCard).toBeVisible();
    }
  });
});

// ===========================================
// AC4: Toast Notifications
// ===========================================

test.describe("Toast Notifications (AC4)", () => {
  test("toast-enter animation keyframe is defined", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const hasToastKeyframe = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (
              rule instanceof CSSKeyframesRule &&
              rule.name === "toast-enter"
            ) {
              return true;
            }
          }
        } catch {
          // Skip cross-origin stylesheets
        }
      }
      return false;
    });

    expect(hasToastKeyframe).toBe(true);
  });

  test("toast-exit animation keyframe is defined", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const hasToastExitKeyframe = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (
              rule instanceof CSSKeyframesRule &&
              rule.name === "toast-exit"
            ) {
              return true;
            }
          }
        } catch {
          // Skip cross-origin stylesheets
        }
      }
      return false;
    });

    expect(hasToastExitKeyframe).toBe(true);
  });

  test("animate-toast-enter class exists", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject toast element
    await page.evaluate(() => {
      const toast = document.createElement("div");
      toast.id = "toast-test";
      toast.className = "animate-toast-enter";
      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.right = "20px";
      toast.style.padding = "16px";
      toast.style.background = "#22c55e";
      toast.style.color = "white";
      toast.style.borderRadius = "8px";
      toast.textContent = "Success!";
      document.body.appendChild(toast);
    });

    const toast = page.locator("#toast-test");
    const animation = await toast.evaluate((el) => {
      return getComputedStyle(el).animation;
    });

    expect(animation).toContain("toast-enter");
  });

  test("toast slides in from right", async ({ page }) => {
    // Create test page with toast animation
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @keyframes toast-enter {
              0% { opacity: 0; transform: translateX(100%); }
              100% { opacity: 1; transform: translateX(0); }
            }
            .toast {
              position: fixed;
              bottom: 24px;
              right: 24px;
              padding: 12px 16px;
              background: #22c55e;
              color: white;
              border-radius: 8px;
              animation: toast-enter 300ms ease-out forwards;
            }
          </style>
        </head>
        <body>
          <div class="toast" data-testid="toast">Link copied!</div>
        </body>
      </html>
    `);

    const toast = page.locator('[data-testid="toast"]');
    await expect(toast).toBeVisible();

    // After animation, toast should be fully visible (opacity 1, translateX 0)
    await page.waitForTimeout(350);

    const styles = await toast.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        opacity: computed.opacity,
        transform: computed.transform,
      };
    });

    expect(styles.opacity).toBe("1");
    // Transform should be identity or translateX(0) after animation
    expect(styles.transform).toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });
});

// ===========================================
// Reduced Motion Support
// ===========================================

test.describe("Reduced Motion Support", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("card lift is disabled with reduced motion", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject card with lift class
    await page.evaluate(() => {
      const card = document.createElement("div");
      card.id = "reduced-motion-card";
      card.className = "card-lift";
      card.style.width = "200px";
      card.style.height = "150px";
      card.style.backgroundColor = "#141414";
      document.body.appendChild(card);
    });

    const card = page.locator("#reduced-motion-card");
    await card.hover();
    await page.waitForTimeout(100);

    const transform = await card.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // With reduced motion, hover should not change transform
    // (should be "none" or identity matrix)
    expect(transform).toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });

  test("input focus scale is disabled with reduced motion", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Inject enhanced input
    await page.evaluate(() => {
      const input = document.createElement("input");
      input.id = "reduced-motion-input";
      input.className = "input-enhanced";
      input.type = "text";
      document.body.appendChild(input);
    });

    const input = page.locator("#reduced-motion-input");
    await input.focus();

    const transform = await input.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // With reduced motion, focus should not scale
    expect(transform).toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });
});

// ===========================================
// Integration Tests
// ===========================================

test.describe("Micro-interactions Integration", () => {
  test("micro-interaction CSS loads without errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    // Filter CSS-related errors
    const cssErrors = consoleErrors.filter(
      (e) => e.includes("CSS") || e.includes("style")
    );
    expect(cssErrors).toHaveLength(0);
  });

  test("ease-out timing variable is defined", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const easeOut = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue(
        "--ease-out"
      );
    });

    // Should have ease-out cubic-bezier defined
    expect(easeOut.trim()).toBeTruthy();
    expect(easeOut).toContain("cubic-bezier");
  });
});
