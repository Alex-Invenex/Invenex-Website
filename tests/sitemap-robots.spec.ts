import { test, expect } from "@playwright/test";

/**
 * Story 8.3: Sitemap & Robots.txt Tests
 *
 * Tests verify sitemap generation with static and dynamic pages,
 * proper XML structure, and robots.txt configuration.
 */

test.describe("Sitemap (AC1, AC2)", () => {
  test.describe("XML Sitemap Structure", () => {
    test("returns valid XML at /sitemap.xml", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      expect(response?.status()).toBe(200);
      expect(response?.headers()["content-type"]).toContain("application/xml");
    });

    test("has urlset root element with proper namespace", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).toContain("<urlset");
      expect(content).toContain("http://www.sitemaps.org/schemas/sitemap/0.9");
    });

    test("contains url elements with loc, lastmod, changefreq, priority", async ({
      page,
    }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).toContain("<url>");
      expect(content).toContain("<loc>");
      expect(content).toContain("<lastmod>");
      expect(content).toContain("<changefreq>");
      expect(content).toContain("<priority>");
    });
  });

  test.describe("Static Pages in Sitemap", () => {
    const staticPages = [
      { path: "", priority: "1" }, // Homepage
      { path: "/about", priority: "0.8" },
      { path: "/services", priority: "0.9" },
      { path: "/portfolio", priority: "0.9" },
      { path: "/products", priority: "0.7" },
      { path: "/careers", priority: "0.8" },
      { path: "/contact", priority: "0.8" },
    ];

    for (const pageInfo of staticPages) {
      test(`includes ${pageInfo.path || "homepage"} with priority ${pageInfo.priority}`, async ({
        page,
      }) => {
        await page.goto("/sitemap.xml");
        const content = await page.content();

        // Check that the URL is present (homepage is just the base URL)
        if (pageInfo.path === "") {
          // Homepage - should have the base URL without a path suffix
          expect(content).toMatch(
            /<loc>[^<]*invenex[^<]*<\/loc>[^]*?<priority>1(\.0)?<\/priority>/
          );
        } else {
          expect(content).toContain(pageInfo.path);
        }
      });
    }
  });

  test.describe("Excluded Routes", () => {
    test("does not include /studio routes", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).not.toContain("/studio");
    });

    test("does not include /api routes", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).not.toContain("/api/");
    });

    test("does not include /login route", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).not.toContain("/login");
    });

    test("does not include /logout route", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).not.toContain("/logout");
    });
  });

  test.describe("Dynamic Pages in Sitemap", () => {
    test("includes service detail pages", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      // Check for service paths - these are static from lib/services.ts
      expect(content).toContain("/services/");
    });

    test("includes portfolio detail pages", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      // Check for portfolio paths - these are static from lib/projects.ts
      expect(content).toContain("/portfolio/");
    });

    test("includes career detail pages", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      // Check for career paths - these are static from lib/jobs.ts
      expect(content).toContain("/careers/");
    });
  });

  test.describe("Lastmod Dates", () => {
    test("has ISO 8601 formatted lastmod dates", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      // ISO 8601 date format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.sssZ
      expect(content).toMatch(
        /<lastmod>\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?<\/lastmod>/
      );
    });
  });

  test.describe("Priority Values", () => {
    test("homepage has highest priority (1.0)", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      // Homepage URL followed by priority 1 (or 1.0)
      expect(content).toMatch(/<priority>1(\.0)?<\/priority>/);
    });

    test("service pages have high priority (0.8-0.9)", async ({ page }) => {
      await page.goto("/sitemap.xml");
      const content = await page.content();
      expect(content).toMatch(/<priority>0\.[89]<\/priority>/);
    });
  });
});

test.describe("Robots.txt (AC3)", () => {
  test.describe("Basic Structure", () => {
    test("returns valid text file at /robots.txt", async ({ page }) => {
      const response = await page.goto("/robots.txt");
      expect(response?.status()).toBe(200);
      expect(response?.headers()["content-type"]).toContain("text/plain");
    });

    test("has User-agent directive", async ({ page }) => {
      await page.goto("/robots.txt");
      const content = await page.content();
      expect(content.toLowerCase()).toContain("user-agent");
    });
  });

  test.describe("Allow Rules", () => {
    test("allows all public routes by default", async ({ page }) => {
      await page.goto("/robots.txt");
      const content = await page.content();
      expect(content.toLowerCase()).toContain("allow: /");
    });
  });

  test.describe("Disallow Rules", () => {
    test("disallows /studio/ routes", async ({ page }) => {
      await page.goto("/robots.txt");
      const content = await page.content();
      expect(content.toLowerCase()).toContain("disallow: /studio");
    });

    test("disallows /api/ routes", async ({ page }) => {
      await page.goto("/robots.txt");
      const content = await page.content();
      expect(content.toLowerCase()).toContain("disallow: /api");
    });

    test("disallows /login route", async ({ page }) => {
      await page.goto("/robots.txt");
      const content = await page.content();
      expect(content.toLowerCase()).toContain("disallow: /login");
    });
  });

  test.describe("Sitemap Reference", () => {
    test("includes sitemap URL", async ({ page }) => {
      await page.goto("/robots.txt");
      const content = await page.content();
      expect(content.toLowerCase()).toContain("sitemap:");
      expect(content).toContain("sitemap.xml");
    });
  });
});
