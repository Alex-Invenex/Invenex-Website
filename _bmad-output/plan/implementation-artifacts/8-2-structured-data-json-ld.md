# Story 8.2: Structured Data (JSON-LD)

Status: ready-for-dev

## Story

As a **search engine**,
I want **structured data on the site**,
So that **I can understand the content and display rich results**.

## Acceptance Criteria

### AC1: Site-wide Structured Data
**Given** the site-wide layout
**When** it renders
**Then** it includes JSON-LD for:
- Organization schema (name, logo, URL, social profiles)
- WebSite schema (search action, URL)

### AC2: Homepage Structured Data
**Given** the homepage
**When** it renders
**Then** it includes JSON-LD for:
- LocalBusiness schema (for Kochi office)

### AC3: Page-specific Structured Data
**Given** service pages
**When** they render
**Then** they include JSON-LD for Service schema

**Given** case study pages
**When** they render
**Then** they include JSON-LD for CreativeWork schema

**Given** job detail pages
**When** they render
**Then** they include JSON-LD for JobPosting schema

## Tasks / Subtasks

- [ ] Task 1: Create JSON-LD Components (AC: 1, 2, 3)
  - [ ] Create `src/components/seo/json-ld.tsx`
  - [ ] Create Organization schema component
  - [ ] Create WebSite schema component
  - [ ] Create LocalBusiness schema component

- [ ] Task 2: Add Site-wide JSON-LD (AC: 1)
  - [ ] Add to root layout

- [ ] Task 3: Add Page-specific JSON-LD (AC: 2, 3)
  - [ ] Homepage LocalBusiness
  - [ ] Service pages Service schema
  - [ ] Portfolio pages CreativeWork schema
  - [ ] Job pages JobPosting schema

## Dev Notes

### JSON-LD Component

```tsx
// src/components/seo/json-ld.tsx
interface JsonLdProps {
  data: object
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### Organization Schema

```tsx
// src/components/seo/organization-schema.tsx
import { JsonLd } from './json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

export function OrganizationSchema() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Invenex Solutions',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Premium software development and digital solutions company based in Kochi, Kerala.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      postalCode: '682001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Malayalam'],
    },
    sameAs: [
      'https://twitter.com/invenex',
      'https://linkedin.com/company/invenex',
      'https://github.com/invenex',
    ],
    founder: {
      '@type': 'Person',
      name: 'Founder Name',
    },
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50',
    },
  }

  return <JsonLd data={organizationData} />
}
```

### WebSite Schema

```tsx
// src/components/seo/website-schema.tsx
import { JsonLd } from './json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

export function WebSiteSchema() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Invenex Solutions',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={websiteData} />
}
```

### LocalBusiness Schema (Homepage)

```tsx
// src/components/seo/local-business-schema.tsx
import { JsonLd } from './json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

export function LocalBusinessSchema() {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: 'Invenex Solutions',
    image: `${siteUrl}/og-image.png`,
    url: siteUrl,
    telephone: '+91-XXX-XXX-XXXX',
    email: 'hello@invenex.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      postalCode: '682001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.9312,
      longitude: 76.2673,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 9.9312,
        longitude: 76.2673,
      },
      geoRadius: '50000',
    },
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'Digital Marketing',
      'E-Commerce Solutions',
    ],
  }

  return <JsonLd data={localBusinessData} />
}
```

### Service Schema

```tsx
// src/components/seo/service-schema.tsx
import { JsonLd } from './json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

interface ServiceSchemaProps {
  name: string
  description: string
  slug: string
}

export function ServiceSchema({ name, description, slug }: ServiceSchemaProps) {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${siteUrl}/services/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Invenex Solutions',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteUrl}/contact`,
      serviceSmsNumber: '+91-XXX-XXX-XXXX',
    },
  }

  return <JsonLd data={serviceData} />
}
```

### CreativeWork Schema (Portfolio)

```tsx
// src/components/seo/creative-work-schema.tsx
import { JsonLd } from './json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

interface CreativeWorkSchemaProps {
  name: string
  description: string
  slug: string
  client: string
  image?: string
  datePublished?: string
}

export function CreativeWorkSchema({
  name,
  description,
  slug,
  client,
  image,
  datePublished,
}: CreativeWorkSchemaProps) {
  const creativeWorkData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${siteUrl}/portfolio/${slug}`,
    image: image || `${siteUrl}/og-image.png`,
    datePublished,
    creator: {
      '@type': 'Organization',
      name: 'Invenex Solutions',
      url: siteUrl,
    },
    client: {
      '@type': 'Organization',
      name: client,
    },
    genre: 'Software Development',
  }

  return <JsonLd data={creativeWorkData} />
}
```

### JobPosting Schema

```tsx
// src/components/seo/job-posting-schema.tsx
import { JsonLd } from './json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://invenex.in'

interface JobPostingSchemaProps {
  title: string
  description: string
  slug: string
  location: string
  employmentType: string
  datePosted: string
  salary?: string
}

export function JobPostingSchema({
  title,
  description,
  slug,
  location,
  employmentType,
  datePosted,
  salary,
}: JobPostingSchemaProps) {
  // Map employment type to schema.org format
  const employmentTypeMap: Record<string, string> = {
    'full-time': 'FULL_TIME',
    'part-time': 'PART_TIME',
    contract: 'CONTRACTOR',
    internship: 'INTERN',
  }

  const jobPostingData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    url: `${siteUrl}/careers/${slug}`,
    datePosted,
    validThrough: new Date(
      new Date(datePosted).getTime() + 90 * 24 * 60 * 60 * 1000
    ).toISOString(), // 90 days from posting
    employmentType: employmentTypeMap[employmentType] || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Invenex Solutions',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.includes('Remote') ? 'Remote' : 'Kochi',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
    applicantLocationRequirements: location.includes('Remote')
      ? {
          '@type': 'Country',
          name: 'India',
        }
      : undefined,
    jobLocationType: location.includes('Remote') ? 'TELECOMMUTE' : undefined,
    baseSalary: salary
      ? {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: {
            '@type': 'QuantitativeValue',
            value: salary,
            unitText: 'YEAR',
          },
        }
      : undefined,
  }

  // Remove undefined values
  Object.keys(jobPostingData).forEach((key) => {
    if (jobPostingData[key as keyof typeof jobPostingData] === undefined) {
      delete jobPostingData[key as keyof typeof jobPostingData]
    }
  })

  return <JsonLd data={jobPostingData} />
}
```

### Root Layout Integration

```tsx
// src/app/layout.tsx (add to existing)
import { OrganizationSchema } from '@/components/seo/organization-schema'
import { WebSiteSchema } from '@/components/seo/website-schema'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
      </body>
    </html>
  )
}
```

### Homepage Integration

```tsx
// src/app/page.tsx (add LocalBusiness)
import { LocalBusinessSchema } from '@/components/seo/local-business-schema'

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      {/* rest of homepage */}
    </>
  )
}
```

### Portfolio Page Integration

```tsx
// src/app/portfolio/[slug]/page.tsx (add CreativeWork)
import { CreativeWorkSchema } from '@/components/seo/creative-work-schema'
import { urlFor } from '@/lib/sanity/image'

export default async function ProjectPage({ params }: Props) {
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project'],
  })

  if (!project) notFound()

  return (
    <>
      <CreativeWorkSchema
        name={project.title}
        description={project.excerpt || ''}
        slug={params.slug}
        client={project.client}
        image={project.featuredImage ? urlFor(project.featuredImage).url() : undefined}
        datePublished={project.publishedAt}
      />
      {/* rest of page */}
    </>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| JSON-LD format | Schema.org structured data |
| Multiple schemas | Organization + page-specific |
| Dynamic data | Props from Sanity CMS |
| Google requirements | JobPosting includes all required fields |

### Testing Checklist

- [ ] Organization schema in all pages
- [ ] WebSite schema in all pages
- [ ] LocalBusiness on homepage
- [ ] Service schema on service pages
- [ ] CreativeWork on portfolio pages
- [ ] JobPosting on job pages
- [ ] Validate with Google Rich Results Test
- [ ] Validate with Schema.org validator

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
