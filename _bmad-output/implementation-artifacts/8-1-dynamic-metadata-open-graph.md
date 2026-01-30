# Story 8.1: Dynamic Metadata & Open Graph

Status: done

## Story

As a **search engine** and **social media platform**,
I want **proper metadata on all pages**,
So that **the site ranks well and shared links display rich previews**.

## Acceptance Criteria

### AC1: Page Metadata
**Given** any page on the site
**When** it renders
**Then** it includes:
- Unique `<title>` tag (format: "Page Title | Invenex Solutions")
- Meta description (150-160 characters)
- Canonical URL
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags (twitter:card, twitter:title, twitter:image)

### AC2: Dynamic Pages Metadata
**Given** dynamic pages (portfolio, services, jobs)
**When** `generateMetadata()` runs
**Then** it:
- Fetches page-specific data from Sanity
- Returns dynamic title and description
- Generates appropriate OG image or uses default

### AC3: Homepage Metadata
**Given** the homepage
**When** its metadata renders
**Then** it includes:
- Full company name and tagline in title
- Comprehensive description
- High-quality OG image (1200x630)

## Tasks / Subtasks

- [x] Task 1: Create Metadata Utilities (AC: 1, 2, 3)
  - [x] Create `src/lib/metadata.ts`
  - [x] Create default metadata config
  - [x] Create generateMetadata helper

- [x] Task 2: Add Metadata to Static Pages (AC: 1)
  - [x] Homepage metadata (via defaultMetadata in root layout)
  - [x] About page metadata
  - [x] Services page metadata
  - [x] Contact page metadata
  - [x] Careers page metadata
  - [x] Portfolio page metadata
  - [x] Products page metadata

- [x] Task 3: Add Metadata to Dynamic Pages (AC: 2)
  - [x] Portfolio detail pages
  - [x] Service detail pages
  - [x] Job detail pages
  - [ ] Blog post pages (deferred to CMS integration)

- [x] Task 4: Create OG Image (AC: 3)
  - [x] Design default OG image (SVG source + PNG)
  - [x] Place in public folder (public/og-image.png, 1200x630)

## Dev Notes

### Metadata Utilities

```tsx
// src/lib/metadata.ts
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenexsolutions.vercel.app'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Invenex Solutions - Software Development & Digital Solutions',
    template: '%s | Invenex Solutions',
  },
  description:
    'Invenex Solutions delivers premium web development, mobile apps, and digital transformation services. Based in Kochi, India, serving clients worldwide.',
  keywords: [
    'software development',
    'web development',
    'mobile app development',
    'digital solutions',
    'Kochi',
    'Kerala',
    'India',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Invenex Solutions', url: siteUrl }],
  creator: 'Invenex Solutions',
  publisher: 'Invenex Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Invenex Solutions',
    title: 'Invenex Solutions - Software Development & Digital Solutions',
    description:
      'Invenex Solutions delivers premium web development, mobile apps, and digital transformation services.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Invenex Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invenex Solutions - Software Development & Digital Solutions',
    description:
      'Invenex Solutions delivers premium web development, mobile apps, and digital transformation services.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@invenex',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

interface PageMetadataOptions {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`
  const ogImage = image || `${siteUrl}/og-image.png`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
```

### Root Layout with Default Metadata

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { defaultMetadata } from '@/lib/metadata'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Static Page Metadata Examples

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description:
    'Learn about Invenex Solutions, our mission, values, and the team behind our innovative digital solutions. Based in Kochi, Kerala.',
  path: '/about',
})

export default function AboutPage() {
  return (/* content */)
}
```

```tsx
// src/app/services/page.tsx
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services',
  description:
    'Explore our comprehensive digital services: Web Development, Mobile Apps, Platform Development, E-Commerce, and Digital Marketing.',
  path: '/services',
})

export default function ServicesPage() {
  return (/* content */)
}
```

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Invenex Solutions. Request a quote, discuss your project, or visit our office in Kochi, Kerala.',
  path: '/contact',
})

export default function ContactPage() {
  return (/* content */)
}
```

### Dynamic Page Metadata Example

```tsx
// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { projectBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { Project } from '@/types/sanity'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project', `project:${params.slug}`],
  })

  if (!project) {
    return { title: 'Project Not Found' }
  }

  const ogImage = project.featuredImage
    ? urlFor(project.featuredImage).width(1200).height(630).url()
    : undefined

  return {
    title: `${project.title} - Case Study`,
    description: project.excerpt || `View our ${project.title} case study`,
    alternates: {
      canonical: `/portfolio/${params.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project', `project:${params.slug}`],
  })

  if (!project) notFound()

  return (/* content */)
}
```

### Job Detail Page Metadata

```tsx
// src/app/careers/[slug]/page.tsx
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { jobBySlugQuery } from '@/lib/sanity/queries'
import type { Job } from '@/types/sanity'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await sanityFetch<Job | null>({
    query: jobBySlugQuery,
    params: { slug: params.slug },
    tags: ['job', `job:${params.slug}`],
  })

  if (!job) {
    return { title: 'Job Not Found' }
  }

  return {
    title: `${job.title} - Careers`,
    description: `Join Invenex as a ${job.title}. ${job.location}, ${job.employmentType}. Apply now!`,
    alternates: {
      canonical: `/careers/${params.slug}`,
    },
    openGraph: {
      title: `${job.title} at Invenex Solutions`,
      description: `Join Invenex as a ${job.title}. ${job.location}, ${job.employmentType}.`,
    },
  }
}
```

### OG Image Specifications

Create `public/og-image.png`:
- Dimensions: 1200x630px
- Format: PNG
- Design: Company logo, tagline, premium dark aesthetic
- File size: Optimize < 200KB

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Next.js Metadata API | Using generateMetadata for dynamic |
| Template titles | "%s | Invenex Solutions" format |
| Canonical URLs | Set on all pages |
| OG/Twitter cards | Full implementation |

### Testing Checklist

- [x] Homepage has full metadata
- [x] All static pages have metadata
- [x] Dynamic pages fetch and use data
- [x] OG image displays in social previews
- [x] Twitter cards render correctly
- [x] Canonical URLs are correct
- [x] No duplicate title tags

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Implementation Plan
1. Created centralized metadata utilities in `src/lib/metadata.ts`
2. Updated root layout to use `defaultMetadata` from utilities
3. Updated all static pages to use `generatePageMetadata` helper
4. Refactored Services page from client to server component pattern
5. Updated dynamic pages (portfolio, services, jobs) with canonical URLs and OG tags
6. Created OG image (SVG source converted to PNG via sharp)
7. Added 68 Playwright tests covering all acceptance criteria

### Completion Notes List
- Task 1: Created `src/lib/metadata.ts` with `defaultMetadata` config and `generatePageMetadata` helper function. Also exports `getSiteUrl()` for dynamic pages.
- Task 2: All 7 static pages now have proper metadata with title, description, canonical URL, OG tags, and Twitter cards.
- Task 3: All 3 dynamic page types updated with `generateMetadata` including canonical URLs.
- Task 4: Created OG image as SVG source and converted to PNG (1200x630, 88KB).

### File List
- src/lib/metadata.ts (new)
- src/app/layout.tsx (modified)
- src/app/(site)/layout.tsx (modified - WhatsApp button integration)
- src/app/(site)/page.tsx (modified - structured data)
- src/app/(site)/about/page.tsx (modified)
- src/app/(site)/contact/page.tsx (modified)
- src/app/(site)/careers/page.tsx (modified)
- src/app/(site)/portfolio/page.tsx (modified)
- src/app/(site)/products/page.tsx (modified)
- src/app/(site)/services/page.tsx (modified - server component)
- src/app/(site)/services/services-client.tsx (new - client component)
- src/app/(site)/portfolio/[slug]/page.tsx (modified)
- src/app/(site)/services/[slug]/page.tsx (modified)
- src/app/(site)/careers/[slug]/page.tsx (modified)
- public/og-image.svg (new)
- public/og-image.png (new)
- tests/metadata.spec.ts (new - 68 tests)

### Change Log
- 2026-01-29: Implemented comprehensive metadata system across all pages. Created centralized utilities, updated 10 pages with proper SEO metadata, added OG image, and created 68 Playwright tests.
- 2026-01-30: **Code Review Fixes** - Fixed 1 HIGH, 3 MEDIUM issues:
  - [H1] Removed non-existent icon references (favicon-16x16.png, apple-touch-icon.png) from metadata
  - [M1] Added missing files to File List (src/app/(site)/layout.tsx, src/app/(site)/page.tsx)
  - [M2] Shortened homepage description from 183 to 151 characters (within 150-160 target)
  - [M3] Updated Dev Notes code samples to match actual implementation
