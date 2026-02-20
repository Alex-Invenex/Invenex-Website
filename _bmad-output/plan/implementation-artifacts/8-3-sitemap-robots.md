# Story 8.3: Sitemap & Robots.txt

Status: ready-for-dev

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

- [ ] Task 1: Create Sitemap (AC: 1, 2)
  - [ ] Create `src/app/sitemap.ts`
  - [ ] Add static pages
  - [ ] Fetch dynamic pages from Sanity
  - [ ] Set priorities

- [ ] Task 2: Create Robots.txt (AC: 3)
  - [ ] Create `src/app/robots.ts`
  - [ ] Configure allow/disallow rules
  - [ ] Reference sitemap

## Dev Notes

### Sitemap Configuration

```tsx
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

// Queries to fetch dynamic content slugs
const projectSlugsQuery = groq`*[_type == "project"]{ "slug": slug.current, _updatedAt }`
const serviceSlugsQuery = groq`*[_type == "service"]{ "slug": slug.current, _updatedAt }`
const jobSlugsQuery = groq`*[_type == "job" && active == true]{ "slug": slug.current, _updatedAt }`
const blogSlugsQuery = groq`*[_type == "blogPost"]{ "slug": slug.current, _updatedAt }`

interface SanitySlug {
  slug: string
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Fetch dynamic content from Sanity
  const [projects, services, jobs, blogPosts] = await Promise.all([
    client.fetch<SanitySlug[]>(projectSlugsQuery),
    client.fetch<SanitySlug[]>(serviceSlugsQuery),
    client.fetch<SanitySlug[]>(jobSlugsQuery),
    client.fetch<SanitySlug[]>(blogSlugsQuery),
  ])

  // Generate project URLs
  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Generate service URLs
  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(service._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Generate job URLs
  const jobUrls: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${siteUrl}/careers/${job.slug}`,
    lastModified: new Date(job._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Generate blog URLs (for future)
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...serviceUrls,
    ...projectUrls,
    ...jobUrls,
    ...blogUrls,
  ]
}
```

### Robots.txt Configuration

```tsx
// src/app/robots.ts
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',
          '/api/',
          '/login',
          '/_next/',
          '/private/',
        ],
      },
      // Block specific bots if needed
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
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
| Dynamic content | Fetches from Sanity CMS |
| Proper priorities | Homepage 1.0, services 0.9, etc. |
| Excluded routes | /studio, /api, /login |

### Testing Checklist

- [ ] `/sitemap.xml` returns valid XML
- [ ] All static pages included
- [ ] Dynamic projects included
- [ ] Dynamic services included
- [ ] Active jobs included
- [ ] Blog posts included (future)
- [ ] `/robots.txt` returns proper rules
- [ ] Sitemap URL in robots.txt
- [ ] Studio route disallowed
- [ ] API routes disallowed
- [ ] Validate with Google Search Console

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
