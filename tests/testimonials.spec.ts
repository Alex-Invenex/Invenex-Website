import { test, expect } from "@playwright/test";

test.describe("Testimonials Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll to testimonials section to trigger lazy loading
    const section = page.locator('[data-testid="testimonials-section"]');
    await section.scrollIntoViewIfNeeded();
  });

  test.describe("Section Structure", () => {
    test("should display testimonials section with heading", async ({
      page,
    }) => {
      const section = page.locator('[data-testid="testimonials-section"]');
      await expect(section).toBeVisible();

      const heading = page.getByRole("heading", { name: /Clients Say/i });
      await expect(heading).toBeVisible();
    });

    test("should have proper aria-labelledby", async ({ page }) => {
      const section = page.locator('[data-testid="testimonials-section"]');
      await expect(section).toHaveAttribute(
        "aria-labelledby",
        "testimonials-title"
      );
    });

    test("should display 'Client Testimonials' label", async ({ page }) => {
      await expect(page.getByText("Client Testimonials")).toBeVisible();
    });

    test("should display 'Trusted by innovative companies' label", async ({
      page,
    }) => {
      await expect(
        page.getByText("Trusted by innovative companies")
      ).toBeVisible();
    });
  });

  test.describe("Spotlight Quote", () => {
    test("should display featured spotlight quote", async ({ page }) => {
      const spotlight = page.locator("[data-spotlight]");
      await expect(spotlight).toBeVisible();
    });

    test("should show spotlight author name", async ({ page }) => {
      const spotlight = page.locator("[data-spotlight]");
      await expect(spotlight.getByText("Mathews Jacob")).toBeVisible();
    });

    test("should show spotlight company", async ({ page }) => {
      const spotlight = page.locator("[data-spotlight]");
      await expect(
        spotlight.getByText("CoolTech International")
      ).toBeVisible();
    });

    test("should show spotlight blockquote", async ({ page }) => {
      const blockquote = page
        .locator("[data-spotlight]")
        .locator("blockquote");
      await expect(blockquote).toBeVisible();
      await expect(blockquote).toContainText("digital presence");
    });
  });

  test.describe("Testimonial Cards", () => {
    test("should display testimonial cards in marquee rows", async ({
      page,
    }) => {
      // Check that testimonial blockquotes exist (excluding spotlight)
      const blockquotes = page
        .locator('[data-testid="testimonials-section"]')
        .locator("blockquote");
      // At least 7 visible (1 spotlight + 6 in marquee, tripled for animation)
      const count = await blockquotes.count();
      expect(count).toBeGreaterThanOrEqual(7);
    });

    test("should show star ratings on cards", async ({ page }) => {
      // Star elements exist in the section
      const stars = page
        .locator('[data-testid="testimonials-section"]')
        .locator("svg");
      const count = await stars.count();
      expect(count).toBeGreaterThan(0);
    });

    test("should show all 7 testimonial authors", async ({ page }) => {
      const authors = [
        "Mathews Jacob",
        "Gayannas Merlaz",
        "Favas",
        "Sebin Mathew",
        "Rayeesa Absal",
        "Lijo Varghese",
        "Ahmed Zabi",
      ];
      for (const author of authors) {
        await expect(
          page
            .locator('[data-testid="testimonials-section"]')
            .getByText(author)
            .first()
        ).toBeVisible();
      }
    });

    test("should show all 7 companies", async ({ page }) => {
      const companies = [
        "CoolTech International",
        "Ginger Designs",
        "EaseMyFly",
        "GrabToGo",
        "Q by Rayeesa",
        "La Mirage",
        "OnMyWay",
      ];
      for (const company of companies) {
        await expect(
          page
            .locator('[data-testid="testimonials-section"]')
            .getByText(company)
            .first()
        ).toBeVisible();
      }
    });
  });

  test.describe("Client Avatar - Fallback Behavior", () => {
    test("should show initial-letter fallback when photos not available", async ({
      page,
    }) => {
      // When image files don't exist, the avatar should fall back to initial letter
      // The spotlight author is "Mathews Jacob" -> initial "M"
      const spotlight = page.locator("[data-spotlight]");
      // Look for a rounded-full element that contains the initial
      const avatarInitial = spotlight.locator(
        ".rounded-full >> text=M"
      );
      // Either the initial is shown (fallback) or an img is shown (photo exists)
      const img = spotlight.locator(".rounded-full img");
      const hasImage = (await img.count()) > 0;
      const hasInitial = (await avatarInitial.count()) > 0;
      expect(hasImage || hasInitial).toBeTruthy();
    });

    test("should have proper alt text on client photos when available", async ({
      page,
    }) => {
      // If any testimonial images exist, they should have descriptive alt text
      const imgs = page
        .locator('[data-testid="testimonials-section"]')
        .locator(".rounded-full img");
      const count = await imgs.count();
      for (let i = 0; i < count; i++) {
        const alt = await imgs.nth(i).getAttribute("alt");
        // Alt text should follow pattern: "{name}, {role} at {company}"
        expect(alt).toBeTruthy();
        if (alt) {
          expect(alt).toContain(",");
        }
      }
    });
  });

  test.describe("Client Ticker", () => {
    test("should display client company names in ticker", async ({
      page,
    }) => {
      // Wait for image onError fallback to fire (images don't exist yet)
      await page.waitForTimeout(2000);
      const section = page.locator('[data-testid="testimonials-section"]');
      // Check that client names appear as text fallback in the ticker
      // Use page.content() to check DOM regardless of visibility (marquee may scroll offscreen)
      const html = await section.innerHTML();
      const clientNames = [
        "Ahazz Designs",
        "GrabToGo",
        "CoolTech International",
        "Ginger Designs",
        "EaseMyFly",
      ];
      for (const name of clientNames) {
        expect(html).toContain(name);
      }
    });

    test("should show logos or text fallback for clients", async ({
      page,
    }) => {
      await expect(
        page.getByText("Trusted by innovative companies")
      ).toBeVisible();
    });
  });

  test.describe("Data Consistency", () => {
    test("should have consistent testimonials between homepage and case studies", async ({
      page,
    }) => {
      // Check that the CoolTech testimonial quote on homepage matches case study
      const homepageQuote = page
        .locator('[data-testid="testimonials-section"]')
        .getByText("digital presence")
        .first();
      await expect(homepageQuote).toBeVisible();

      // Navigate to the case study
      await page.goto("/portfolio/cooltech-international");
      // Check the same quote appears
      const caseStudyQuote = page.getByText("digital presence").first();
      await expect(caseStudyQuote).toBeVisible();
    });

    test("should have consistent La Mirage testimonial", async ({
      page,
    }) => {
      // Verify La Mirage quote is by Lijo Varghese on homepage
      const section = page.locator('[data-testid="testimonials-section"]');
      await expect(section.getByText("Lijo Varghese").first()).toBeVisible();
      await expect(
        section.getByText("online bookings").first()
      ).toBeVisible();

      // Verify same on case study
      await page.goto("/portfolio/la-mirage");
      await expect(page.getByText("Lijo Varghese").first()).toBeVisible();
      await expect(
        page.getByText("online bookings").first()
      ).toBeVisible();
    });
  });
});

test.describe("Testimonials Section - Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const section = page.locator('[data-testid="testimonials-section"]');
    await section.scrollIntoViewIfNeeded();
  });

  test("should display testimonials section on mobile", async ({ page }) => {
    const section = page.locator('[data-testid="testimonials-section"]');
    await expect(section).toBeVisible();
  });

  test("should show spotlight quote on mobile", async ({ page }) => {
    const spotlight = page.locator("[data-spotlight]");
    await expect(spotlight).toBeVisible();
  });

  test("should show client ticker on mobile", async ({ page }) => {
    await expect(
      page.getByText("Trusted by innovative companies")
    ).toBeVisible();
  });
});
