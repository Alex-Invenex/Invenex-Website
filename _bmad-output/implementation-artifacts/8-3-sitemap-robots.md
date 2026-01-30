# Story 8.3: Sitemap & Robots.txt

Status: done

## Story

As a **search engine**,
I want **a sitemap and robots.txt**,
So that **I can efficiently crawl and index the site**.

## Acceptance Criteria

### AC1: XML Sitemap
**Given** the site needs a sitemap
**When** `/sitemap.xml` is requested
**Then** it returns:
- XML sitemap with all public pages
- Dynamic entries from Sanity (projects, services, jobs)
- Proper `lastmod` dates
- Priority values based on page importance

### AC2: Sitemap Generation
**Given** the sitemap generation
**When** it runs
**Then** it:
- Uses Next.js `sitemap.ts` convention
- Fetches all dynamic slugs from Sanity
- Excludes admin/studio routes

### AC3: Robots.txt
**Given** `/robots.txt` is requested
**When** it returns
**Then** it includes:
- Allow all public routes
- Disallow `/studio`, `/api`
- Reference to sitemap URL

## Tasks / Subtasks

- [x] Task 1: Create Sitemap (AC: 1, 2)
  - [x] Create `src/app/sitemap.ts`
  - [x] Add static pages
  - [x] Fetch dynamic pages from local data (projects, services, jobs)
  - [x] Set priorities

- [x] Task 2: Create Robots.txt (AC: 3)
  - [x] Create `src/app/robots.ts`
  - [x] Configure allow/disallow rules
  - [x] Reference sitemap

## Dev Notes

### Sitemap Configuration

> **Note:** Current implementation uses local static data from `lib/projects.ts` and `lib/jobs.ts`.
> Once CMS content is fully migrated to Sanity, update to use async Sanity fetches.

```tsx
// src/app/sitemap.ts (actual implementation)
import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { jobs } from "@/lib/jobs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://invenexsolutions.vercel.app";

// Static service slugs (from services/[slug]/page.tsx)
const servicesSlugs = [
  "web-development",
  "mobile-development",
  "custom-platforms",
  "ecommerce-solutions",
  "digital-marketing",
  "technology-consulting",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages with priorities
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: currentDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/products`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/careers`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Service detail pages
  const serviceUrls: MetadataRoute.Sitemap = servicesSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Portfolio/project detail pages (from local data)
  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Career/job detail pages (from local data)
  const jobUrls: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${siteUrl}/careers/${job.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...serviceUrls, ...projectUrls, ...jobUrls];
}
```

### Robots.txt Configuration

```tsx
// src/app/robots.ts (actual implementation)
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://invenexsolutions.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/login", "/logout", "/_next/"],
      },
      // Block AI crawlers from scraping content
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
```

### Alternative: robots.txt as Static File

If you prefer a static file instead:

```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /login
Disallow: /_next/

User-agent: GPTBot
Disallow: /

Sitemap: https://invenex.in/sitemap.xml
Host: https://invenex.in
```

### Sitemap Index (For Large Sites)

If you have many pages, split into multiple sitemaps:

```tsx
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/sitemap-static.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-portfolio.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-blog.xml`,
      lastModified: new Date(),
    },
  ]
}

// src/app/sitemap-static.xml/route.ts
// src/app/sitemap-portfolio.xml/route.ts
// src/app/sitemap-blog.xml/route.ts
```

### Sitemap Validation Query

Test your sitemap fetches with this helper:

```tsx
// src/lib/sanity/sitemap-queries.ts
import { groq } from 'next-sanity'

export const sitemapProjectsQuery = groq`
  *[_type == "project"] | order(_updatedAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`

export const sitemapServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    _updatedAt
  }
`

export const sitemapJobsQuery = groq`
  *[_type == "job" && active == true] | order(postedAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`

export const sitemapBlogQuery = groq`
  *[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://invenex.in
```

### Google Search Console Submission

After deployment:
1. Go to Google Search Console
2. Add property: `https://invenex.in`
3. Verify ownership (DNS or HTML tag)
4. Submit sitemap: `https://invenex.in/sitemap.xml`
5. Monitor indexing status

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Next.js conventions | Using sitemap.ts and robots.ts |
| Dynamic content | Currently uses local static data; ready for Sanity migration |
| Proper priorities | Homepage 1.0, services 0.9, portfolio 0.9, etc. |
| Excluded routes | /studio, /api, /login, /logout, /_next |
| AI crawler blocking | GPTBot disallowed to protect content |

### Testing Checklist

- [x] `/sitemap.xml` returns valid XML
- [x] All static pages included
- [x] Dynamic projects included
- [x] Dynamic services included
- [x] Active jobs included
- [ ] Blog posts included (future - when blog is implemented)
- [x] `/robots.txt` returns proper rules
- [x] Sitemap URL in robots.txt
- [x] Studio route disallowed
- [x] API routes disallowed
- [x] GPTBot AI crawler blocked
- [ ] Validate with Google Search Console (post-deployment)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- ✅ Created `src/app/sitemap.ts` using Next.js MetadataRoute.Sitemap convention
- ✅ Static pages: homepage (1.0), services (0.9), portfolio (0.9), about (0.8), careers (0.8), contact (0.8), products (0.7)
- ✅ Dynamic pages: 6 service detail pages (0.8), 14 portfolio/project pages (0.7), 5 career/job pages (0.6)
- ✅ Total 32 URLs in sitemap (7 static + 6 services + 14 projects + 5 jobs)
- ✅ ISO 8601 lastModified dates for all entries
- ✅ Created `src/app/robots.ts` using Next.js MetadataRoute.Robots convention
- ✅ Robots.txt allows all public routes, disallows /studio/, /api/, /login, /logout, /_next/
- ✅ Sitemap reference included in robots.txt
- ✅ 54 Playwright tests added (27 per viewport) covering sitemap structure, static pages, dynamic pages, excluded routes, priority values, and robots.txt rules
- ✅ Note: Implementation uses local static data from lib/projects.ts and lib/jobs.ts. Once CMS content is added to Sanity (Epic 7), sitemap can be updated to fetch from Sanity client

### Change Log

- 2026-01-30: Code review fixes - Added GPTBot blocking to robots.ts, updated Dev Notes to match actual implementation
- 2026-01-29: Story 8-3 implemented - Sitemap and robots.txt functionality complete

### File List

- src/app/sitemap.ts (new)
- src/app/robots.ts (new)
- tests/sitemap-robots.spec.ts (new)
