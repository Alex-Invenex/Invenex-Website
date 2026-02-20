# Story 8.1: Dynamic Metadata & Open Graph

Status: ready-for-dev

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

- [ ] Task 1: Create Metadata Utilities (AC: 1, 2, 3)
  - [ ] Create `src/lib/metadata.ts`
  - [ ] Create default metadata config
  - [ ] Create generateMetadata helper

- [ ] Task 2: Add Metadata to Static Pages (AC: 1)
  - [ ] Homepage metadata
  - [ ] About page metadata
  - [ ] Services page metadata
  - [ ] Contact page metadata
  - [ ] Careers page metadata

- [ ] Task 3: Add Metadata to Dynamic Pages (AC: 2)
  - [ ] Portfolio detail pages
  - [ ] Service detail pages
  - [ ] Job detail pages
  - [ ] Blog post pages (future)

- [ ] Task 4: Create OG Image (AC: 3)
  - [ ] Design default OG image
  - [ ] Place in public folder

## Dev Notes

### Metadata Utilities

```tsx
// src/lib/metadata.ts
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Invenex Solutions - Software Development & Digital Solutions',
    template: '%s | Invenex Solutions',
  },
  description:
    'Invenex Solutions delivers premium web development, mobile apps, and digital transformation services. Based in Kochi, serving clients worldwide.',
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
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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

- [ ] Homepage has full metadata
- [ ] All static pages have metadata
- [ ] Dynamic pages fetch and use data
- [ ] OG image displays in social previews
- [ ] Twitter cards render correctly
- [ ] Canonical URLs are correct
- [ ] No duplicate title tags

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
