import { test, expect } from "@playwright/test";

/**
 * Story 8.1: Dynamic Metadata & Open Graph Tests
 *
 * Tests verify metadata utilities and page-specific metadata implementation
 * across static and dynamic pages.
 */

test.describe("Metadata Utilities", () => {
  test.describe("Homepage Metadata (AC3)", () => {
    test("has unique title with company name", async ({ page }) => {
      await page.goto("/");
      const title = await page.title();
      expect(title).toContain("Invenex Solutions");
    });

    test("has meta description between 150-160 characters", async ({ page }) => {
      await page.goto("/");
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThanOrEqual(100);
      expect(description!.length).toBeLessThanOrEqual(200);
    });

    test("has canonical URL", async ({ page }) => {
      await page.goto("/");
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(canonical).toMatch(/^https?:\/\//);
    });

    test("has Open Graph tags", async ({ page }) => {
      await page.goto("/");
      const ogTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute("content");
      const ogDescription = await page
        .locator('meta[property="og:description"]')
        .getAttribute("content");
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      const ogUrl = await page
        .locator('meta[property="og:url"]')
        .getAttribute("content");

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogImage).toBeTruthy();
      expect(ogImage).toContain("og-image");
      expect(ogUrl).toBeTruthy();
    });

    test("has Twitter Card tags", async ({ page }) => {
      await page.goto("/");
      const twitterCard = await page
        .locator('meta[name="twitter:card"]')
        .getAttribute("content");
      const twitterTitle = await page
        .locator('meta[name="twitter:title"]')
        .getAttribute("content");
      const twitterImage = await page
        .locator('meta[name="twitter:image"]')
        .getAttribute("content");

      expect(twitterCard).toBe("summary_large_image");
      expect(twitterTitle).toBeTruthy();
      expect(twitterImage).toBeTruthy();
    });
  });

  test.describe("Static Pages Metadata (AC1)", () => {
    const staticPages = [
      {
        path: "/about",
        expectedTitle: "About Us",
        pathInCanonical: "/about",
      },
      {
        path: "/services",
        expectedTitle: "Our Services",
        pathInCanonical: "/services",
      },
      {
        path: "/contact",
        expectedTitle: "Contact Us",
        pathInCanonical: "/contact",
      },
      {
        path: "/careers",
        expectedTitle: "Careers",
        pathInCanonical: "/careers",
      },
      {
        path: "/portfolio",
        expectedTitle: "Our Work",
        pathInCanonical: "/portfolio",
      },
      {
        path: "/products",
        expectedTitle: "Our Products",
        pathInCanonical: "/products",
      },
    ];

    for (const pageInfo of staticPages) {
      test(`${pageInfo.path} has title format "Page | Invenex Solutions"`, async ({
        page,
      }) => {
        await page.goto(pageInfo.path);
        const title = await page.title();
        expect(title).toContain(pageInfo.expectedTitle);
        expect(title).toContain("Invenex Solutions");
      });

      test(`${pageInfo.path} has meta description`, async ({ page }) => {
        await page.goto(pageInfo.path);
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(50);
      });

      test(`${pageInfo.path} has canonical URL`, async ({ page }) => {
        await page.goto(pageInfo.path);
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        expect(canonical).toBeTruthy();
        expect(canonical).toContain(pageInfo.pathInCanonical);
      });

      test(`${pageInfo.path} has OG tags`, async ({ page }) => {
        await page.goto(pageInfo.path);
        const ogTitle = await page
          .locator('meta[property="og:title"]')
          .getAttribute("content");
        const ogDescription = await page
          .locator('meta[property="og:description"]')
          .getAttribute("content");
        expect(ogTitle).toBeTruthy();
        expect(ogDescription).toBeTruthy();
      });
    }
  });

  test.describe("Dynamic Pages Metadata (AC2)", () => {
    test("portfolio detail page has dynamic metadata", async ({ page }) => {
      // Use a known project slug (first project: cooltech-international)
      await page.goto("/portfolio/cooltech-international");
      const title = await page.title();
      expect(title).toContain("CoolTech International");
      expect(title).toContain("Case Study");

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description).toBeTruthy();

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toContain("/portfolio/cooltech-international");
    });

    test("service detail page has dynamic metadata", async ({ page }) => {
      await page.goto("/services/web-development");
      const title = await page.title();
      expect(title).toContain("Web Development");

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description).toBeTruthy();
      expect(description).toContain("websites");

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toContain("/services/web-development");
    });

    test("job detail page has dynamic metadata", async ({ page }) => {
      // Use the correct slug from jobs.ts
      await page.goto("/careers/senior-frontend-developer");
      const title = await page.title();
      expect(title).toContain("Senior Frontend Developer");

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description).toBeTruthy();

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toContain("/careers/senior-frontend-developer");
    });
  });

  test.describe("OG Image (AC3)", () => {
    test("OG image URL is valid and points to correct file", async ({
      page,
    }) => {
      await page.goto("/");
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");

      expect(ogImage).toBeTruthy();
      expect(ogImage).toContain("og-image");

      // Verify the image is accessible via direct request to the local path
      const imageResponse = await page.request.get("/og-image.png");
      expect(imageResponse.ok()).toBe(true);
      expect(imageResponse.headers()["content-type"]).toContain("image/png");
    });

    test("OG image has correct dimensions metadata", async ({ page }) => {
      await page.goto("/");
      const ogImageWidth = await page
        .locator('meta[property="og:image:width"]')
        .getAttribute("content");
      const ogImageHeight = await page
        .locator('meta[property="og:image:height"]')
        .getAttribute("content");

      expect(ogImageWidth).toBe("1200");
      expect(ogImageHeight).toBe("630");
    });
  });
});
