import { test, expect } from "@playwright/test";

/**
 * Story 8.2: Structured Data (JSON-LD) Tests
 *
 * Tests verify JSON-LD structured data is properly implemented
 * across all page types per schema.org requirements.
 */

// Helper to extract JSON-LD scripts from page
async function getJsonLdData(page: ReturnType<typeof test["info"]>["fixme"]) {
  const scripts = await page.locator('script[type="application/ld+json"]').all();
  const data: object[] = [];
  for (const script of scripts) {
    const content = await script.textContent();
    if (content) {
      try {
        data.push(JSON.parse(content));
      } catch {
        // Skip invalid JSON
      }
    }
  }
  return data;
}

test.describe("Structured Data (JSON-LD)", () => {
  test.describe("Site-wide Schemas (AC1)", () => {
    test("homepage has Organization schema", async ({ page }) => {
      await page.goto("/");
      const jsonLdData = await getJsonLdData(page);

      const orgSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "Organization"
      );
      expect(orgSchema).toBeTruthy();
      expect(orgSchema).toHaveProperty("name", "Invenex Solutions");
      expect(orgSchema).toHaveProperty("url");
      expect(orgSchema).toHaveProperty("sameAs");
    });

    test("homepage has WebSite schema", async ({ page }) => {
      await page.goto("/");
      const jsonLdData = await getJsonLdData(page);

      const webSiteSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "WebSite"
      );
      expect(webSiteSchema).toBeTruthy();
      expect(webSiteSchema).toHaveProperty("name", "Invenex Solutions");
      expect(webSiteSchema).toHaveProperty("url");
    });

    test("about page has Organization schema", async ({ page }) => {
      await page.goto("/about");
      const jsonLdData = await getJsonLdData(page);

      const orgSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "Organization"
      );
      expect(orgSchema).toBeTruthy();
    });

    test("services page has Organization schema", async ({ page }) => {
      await page.goto("/services");
      const jsonLdData = await getJsonLdData(page);

      const orgSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "Organization"
      );
      expect(orgSchema).toBeTruthy();
    });
  });

  test.describe("Homepage Structured Data (AC2)", () => {
    test("homepage has LocalBusiness/ProfessionalService schema", async ({
      page,
    }) => {
      await page.goto("/");
      const jsonLdData = await getJsonLdData(page);

      const localBusinessSchema = jsonLdData.find(
        (d: Record<string, unknown>) =>
          d["@type"] === "LocalBusiness" || d["@type"] === "ProfessionalService"
      );
      expect(localBusinessSchema).toBeTruthy();
      expect(localBusinessSchema).toHaveProperty("name", "Invenex Solutions");
      expect(localBusinessSchema).toHaveProperty("address");
      expect(localBusinessSchema).toHaveProperty("telephone");
    });

    test("LocalBusiness schema has required address fields", async ({
      page,
    }) => {
      await page.goto("/");
      const jsonLdData = await getJsonLdData(page);

      const localBusinessSchema = jsonLdData.find(
        (d: Record<string, unknown>) =>
          d["@type"] === "LocalBusiness" || d["@type"] === "ProfessionalService"
      ) as Record<string, unknown>;

      expect(localBusinessSchema).toBeTruthy();
      const address = localBusinessSchema.address as Record<string, unknown>;
      expect(address).toHaveProperty("@type", "PostalAddress");
      expect(address).toHaveProperty("addressLocality", "Kochi");
      expect(address).toHaveProperty("addressRegion", "Kerala");
      expect(address).toHaveProperty("addressCountry", "IN");
    });
  });

  test.describe("Page-specific Structured Data (AC3)", () => {
    test("service detail page has Service schema", async ({ page }) => {
      await page.goto("/services/web-development");
      const jsonLdData = await getJsonLdData(page);

      const serviceSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "Service"
      );
      expect(serviceSchema).toBeTruthy();
      expect(serviceSchema).toHaveProperty("name", "Web Development");
      expect(serviceSchema).toHaveProperty("description");
      expect(serviceSchema).toHaveProperty("provider");
    });

    test("Service schema has provider organization", async ({ page }) => {
      await page.goto("/services/web-development");
      const jsonLdData = await getJsonLdData(page);

      const serviceSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "Service"
      ) as Record<string, unknown>;

      expect(serviceSchema).toBeTruthy();
      const provider = serviceSchema.provider as Record<string, unknown>;
      expect(provider).toHaveProperty("@type", "Organization");
      expect(provider).toHaveProperty("name", "Invenex Solutions");
    });

    test("portfolio detail page has CreativeWork schema", async ({ page }) => {
      await page.goto("/portfolio/cooltech-international");
      const jsonLdData = await getJsonLdData(page);

      const creativeWorkSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "CreativeWork"
      );
      expect(creativeWorkSchema).toBeTruthy();
      expect(creativeWorkSchema).toHaveProperty("name");
      expect(creativeWorkSchema).toHaveProperty("description");
      expect(creativeWorkSchema).toHaveProperty("creator");
    });

    test("CreativeWork schema has creator and client", async ({ page }) => {
      await page.goto("/portfolio/cooltech-international");
      const jsonLdData = await getJsonLdData(page);

      const creativeWorkSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "CreativeWork"
      ) as Record<string, unknown>;

      expect(creativeWorkSchema).toBeTruthy();
      const creator = creativeWorkSchema.creator as Record<string, unknown>;
      expect(creator).toHaveProperty("@type", "Organization");
      expect(creator).toHaveProperty("name", "Invenex Solutions");
    });

    test("job detail page has JobPosting schema", async ({ page }) => {
      await page.goto("/careers/senior-frontend-developer");
      const jsonLdData = await getJsonLdData(page);

      const jobPostingSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "JobPosting"
      );
      expect(jobPostingSchema).toBeTruthy();
      expect(jobPostingSchema).toHaveProperty("title");
      expect(jobPostingSchema).toHaveProperty("description");
      expect(jobPostingSchema).toHaveProperty("hiringOrganization");
      expect(jobPostingSchema).toHaveProperty("jobLocation");
    });

    test("JobPosting schema has required fields per Google", async ({
      page,
    }) => {
      await page.goto("/careers/senior-frontend-developer");
      const jsonLdData = await getJsonLdData(page);

      const jobPostingSchema = jsonLdData.find(
        (d: Record<string, unknown>) => d["@type"] === "JobPosting"
      ) as Record<string, unknown>;

      expect(jobPostingSchema).toBeTruthy();
      // Google requires these fields
      expect(jobPostingSchema).toHaveProperty("datePosted");
      expect(jobPostingSchema).toHaveProperty("validThrough");
      expect(jobPostingSchema).toHaveProperty("employmentType");

      const hiringOrg = jobPostingSchema.hiringOrganization as Record<
        string,
        unknown
      >;
      expect(hiringOrg).toHaveProperty("@type", "Organization");
      expect(hiringOrg).toHaveProperty("name", "Invenex Solutions");
    });
  });

  test.describe("Schema Validation", () => {
    test("all JSON-LD scripts have valid @context", async ({ page }) => {
      await page.goto("/");
      const jsonLdData = await getJsonLdData(page);

      expect(jsonLdData.length).toBeGreaterThan(0);
      for (const schema of jsonLdData) {
        expect(schema).toHaveProperty("@context", "https://schema.org");
      }
    });

    test("all JSON-LD scripts have @type", async ({ page }) => {
      await page.goto("/");
      const jsonLdData = await getJsonLdData(page);

      for (const schema of jsonLdData) {
        expect(schema).toHaveProperty("@type");
      }
    });
  });
});
