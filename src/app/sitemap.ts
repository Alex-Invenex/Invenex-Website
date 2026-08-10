import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { jobs } from "@/lib/jobs";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://invenexsolutions.com";

/**
 * Content revision date. Bump this when page copy meaningfully changes.
 *
 * Deliberately a fixed date rather than `new Date()` — a sitemap that claims
 * every URL changed "just now" on every crawl teaches Google to ignore the
 * lastmod signal entirely.
 */
const CONTENT_REVISED = "2026-07-31T00:00:00.000Z";

// Static service slugs — must stay in sync with the `services` map in
// src/app/(site)/services/[slug]/page.tsx
const servicesSlugs = [
  "web-development",
  "mobile-development",
  "platform-development",
  "ecommerce",
  "social-media",
  "digital-strategy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Primary money pages — the ones we want ranking for commercial terms.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: CONTENT_REVISED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/build-your-project`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/careers`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/profile`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // Legal pages — indexable (they build trust signals) but low priority.
    {
      url: `${siteUrl}/privacy`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Service detail pages — the main head-term landing pages.
  const serviceUrls: MetadataRoute.Sitemap = servicesSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Portfolio / case study detail pages — long-tail + proof of expertise.
  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Job detail pages — indexed for Google Jobs via JobPosting schema.
  const jobUrls: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${siteUrl}/careers/${job.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...serviceUrls, ...projectUrls, ...jobUrls];
}
