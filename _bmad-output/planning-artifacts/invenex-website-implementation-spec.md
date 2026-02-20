# Invenex Solutions Website - Implementation Specification

**Version:** 1.0
**Date:** 2026-01-18
**Project:** Premium Agency Website
**Domain:** invenexsolutions.com

---

## Executive Summary

Build a premium, fast-loading website for Invenex Solutions using Next.js 15, featuring a black/white luxury design, comprehensive service showcase, portfolio, careers section, and client quote system. Optimized for SEO and performance.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 (App Router) | React framework with SSR/SSG |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS |
| **UI Components** | Aceternity UI (Free) + Magic UI + Custom | Premium animated components |
| **Animations** | Framer Motion + GSAP | UI transitions + scroll effects |
| **CMS** | Sanity.io | Content management |
| **Auth** | NextAuth.js v5 | Admin authentication |
| **Email** | Resend + React Email | Transactional emails |
| **Forms** | React Hook Form + Zod | Form handling + validation |
| **Analytics** | Vercel Analytics + Google Analytics 4 | Traffic + performance |
| **Hosting** | Vercel (Free Tier) | Edge deployment |
| **Version Control** | GitHub | Source control |
| **Domain** | invenexsolutions.com | Primary domain |

---

## Project Structure

```
invenex-website/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public site routes
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx          # Services overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual service
│   │   ├── portfolio/
│   │   │   ├── page.tsx          # Portfolio grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Case study
│   │   ├── careers/
│   │   │   ├── page.tsx          # Job listings
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Job detail + apply
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Blog post
│   │   └── contact/
│   │       └── page.tsx          # Quote request
│   ├── (admin)/                  # Admin routes (protected)
│   │   └── admin/
│   │       ├── page.tsx          # Dashboard
│   │       ├── portfolio/
│   │       ├── jobs/
│   │       └── blog/
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/
│   │   ├── contact/
│   │   ├── career-apply/
│   │   └── sanity/
│   │       └── revalidate/
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── aceternity/               # Aceternity UI components
│   │   ├── spotlight.tsx
│   │   ├── floating-dock.tsx
│   │   ├── text-reveal.tsx
│   │   ├── bento-grid.tsx
│   │   └── ...
│   ├── magic-ui/                 # Magic UI components
│   │   ├── animated-beam.tsx
│   │   ├── blur-fade.tsx
│   │   ├── marquee.tsx
│   │   └── ...
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── portfolio-showcase.tsx
│   │   ├── testimonials.tsx
│   │   ├── team.tsx
│   │   ├── cta-section.tsx
│   │   └── footer.tsx
│   ├── forms/                    # Form components
│   │   ├── contact-form.tsx
│   │   ├── career-apply-form.tsx
│   │   └── newsletter-form.tsx
│   └── layout/                   # Layout components
│       ├── navbar.tsx
│       ├── mobile-nav.tsx
│       └── page-transition.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client
│   │   ├── queries.ts            # GROQ queries
│   │   └── image.ts              # Image URL builder
│   ├── auth.ts                   # NextAuth config
│   ├── resend.ts                 # Email client
│   ├── utils.ts                  # Utility functions
│   └── validations/              # Zod schemas
│       ├── contact.ts
│       └── career.ts
├── emails/                       # React Email templates
│   ├── contact-notification.tsx
│   ├── contact-confirmation.tsx
│   ├── career-application.tsx
│   └── career-confirmation.tsx
├── sanity/                       # Sanity Studio
│   ├── schemas/
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── job.ts
│   │   ├── post.ts
│   │   ├── team.ts
│   │   └── testimonial.ts
│   ├── lib/
│   └── sanity.config.ts
├── public/
│   ├── fonts/
│   ├── images/
│   └── og/                       # Open Graph images
├── styles/
│   └── animations.css            # Custom animations
├── types/
│   └── index.ts                  # TypeScript types
├── .env.local                    # Environment variables
├── .env.example                  # Example env file
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System

### Color Palette

```css
/* tailwind.config.ts - extend colors */
colors: {
  background: {
    DEFAULT: '#0A0A0A',      /* Primary dark background */
    secondary: '#141414',    /* Card/section backgrounds */
    tertiary: '#1A1A1A',     /* Elevated elements */
  },
  foreground: {
    DEFAULT: '#FAFAFA',      /* Primary text */
    muted: '#A3A3A3',        /* Secondary text */
    subtle: '#737373',       /* Tertiary text */
  },
  border: {
    DEFAULT: '#262626',      /* Default borders */
    hover: '#404040',        /* Hover state borders */
  },
  accent: {
    DEFAULT: '#FFFFFF',      /* White accent for CTAs */
    muted: '#E5E5E5',        /* Muted accent */
  },
}
```

### Typography

```css
/* Font Stack */
--font-heading: 'Inter', sans-serif;     /* Bold, geometric */
--font-body: 'Inter', sans-serif;        /* Clean, readable */
--font-mono: 'JetBrains Mono', monospace; /* Code blocks */

/* Scale */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */
--text-8xl: 6rem;        /* 96px - Hero headlines */
```

### Spacing System

```css
/* 8px base grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Animation Tokens

```css
/* Durations */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;

/* Easings */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Page Specifications

### 1. Homepage (`/`)

**Sections:**
1. **Hero Section**
   - Large headline with text reveal animation
   - Subheadline describing value proposition
   - Two CTAs: "Get a Quote" (primary), "View Our Work" (secondary)
   - Animated background (subtle gradient mesh or particles)
   - Stats bar: Projects completed, Clients served, Years experience

2. **Services Overview**
   - Bento grid layout (Aceternity UI)
   - 6 service cards with icons and hover effects
   - Link to full services page

3. **Portfolio Showcase**
   - 3-4 featured projects with image hover effects
   - Project cards with category tags
   - "View All Projects" CTA

4. **Why Choose Us**
   - 4 key differentiators with icons
   - Brief descriptions
   - Animated on scroll

5. **Testimonials**
   - Marquee/carousel of client testimonials
   - Client logos section

6. **CTA Section**
   - "Ready to start your project?"
   - Contact form or link to contact page

7. **Footer**
   - Navigation links
   - Social media
   - Newsletter signup
   - Copyright

### 2. About Page (`/about`)

**Sections:**
1. Story/Mission statement
2. Team grid with hover effects
3. Values/Principles
4. Timeline (company milestones)
5. Office/Culture gallery

### 3. Services Page (`/services`)

**Sections:**
1. Services hero
2. Service pillars grid (6 categories):
   - Web Development
   - Mobile App Development
   - Platform Development
   - E-Commerce Solutions
   - Social Media Marketing
   - Digital Strategy
3. Process section (how we work)
4. Technologies we use
5. CTA for consultation

### 4. Individual Service Page (`/services/[slug]`)

**Dynamic content from Sanity:**
- Service title and description
- Key features/deliverables
- Process steps
- Related projects
- Pricing indication (if applicable)
- CTA form

### 5. Portfolio Page (`/portfolio`)

**Sections:**
1. Portfolio hero
2. Filter by category (tabs or dropdown)
3. Project grid with:
   - Project image
   - Client name
   - Project type
   - Hover effect showing brief description
4. Pagination or infinite scroll

### 6. Case Study Page (`/portfolio/[slug]`)

**Dynamic content:**
- Project hero with full-width image
- Client name and industry
- Challenge/Problem statement
- Solution description
- Key features implemented
- Technologies used
- Results/Metrics (if available)
- Image gallery
- Client testimonial
- Related projects
- CTA

### 7. Careers Page (`/careers`)

**Sections:**
1. Careers hero with culture statement
2. "Life at Invenex" gallery
3. Benefits grid (6 benefits with icons)
4. Open positions by department
5. Application CTA

### 8. Job Detail Page (`/careers/[slug]`)

**Dynamic content:**
- Job title and department
- Location and work mode (Remote/Hybrid/Onsite)
- Experience required
- Job description
- Responsibilities
- Requirements
- Nice-to-haves
- Application form:
  - Name, Email, Phone
  - Resume upload (PDF)
  - Cover letter (optional)
  - Portfolio URL (optional)

### 9. Blog Page (`/blog`)

**Sections:**
1. Featured post (large)
2. Post grid with:
   - Featured image
   - Title
   - Excerpt
   - Date
   - Category tag
3. Category filter
4. Pagination

### 10. Blog Post Page (`/blog/[slug]`)

**Dynamic content:**
- Title
- Author info
- Date and read time
- Featured image
- Content (rich text from Sanity)
- Table of contents (auto-generated)
- Share buttons
- Author bio
- Related posts

### 11. Contact Page (`/contact`)

**Sections:**
1. Contact hero
2. Quote request form:
   - Name (required)
   - Email (required)
   - Company (optional)
   - Project type (dropdown)
   - Budget range (dropdown)
   - Project description (textarea)
   - How did you hear about us? (optional)
3. Alternative contact methods:
   - Email address
   - Phone number
   - WhatsApp link
   - Office address (if applicable)
4. Social media links

---

## Sanity CMS Schemas

### Project Schema

```typescript
// sanity/schemas/project.ts
export const project = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Project Title' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'client', type: 'string', title: 'Client Name' },
    { name: 'industry', type: 'string', title: 'Industry' },
    { name: 'category', type: 'string', title: 'Category',
      options: { list: ['web', 'mobile', 'platform', 'ecommerce', 'marketing'] }
    },
    { name: 'featured', type: 'boolean', title: 'Featured Project' },
    { name: 'thumbnail', type: 'image', title: 'Thumbnail Image' },
    { name: 'heroImage', type: 'image', title: 'Hero Image' },
    { name: 'gallery', type: 'array', of: [{ type: 'image' }], title: 'Gallery' },
    { name: 'excerpt', type: 'text', title: 'Short Description' },
    { name: 'challenge', type: 'text', title: 'Challenge/Problem' },
    { name: 'solution', type: 'array', of: [{ type: 'block' }], title: 'Solution' },
    { name: 'technologies', type: 'array', of: [{ type: 'string' }], title: 'Technologies' },
    { name: 'results', type: 'array', of: [{ type: 'block' }], title: 'Results' },
    { name: 'testimonial', type: 'object', fields: [
      { name: 'quote', type: 'text' },
      { name: 'author', type: 'string' },
      { name: 'role', type: 'string' },
    ]},
    { name: 'liveUrl', type: 'url', title: 'Live URL' },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
  ],
  orderings: [{ title: 'Published', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
}
```

### Job Schema

```typescript
// sanity/schemas/job.ts
export const job = {
  name: 'job',
  title: 'Job Openings',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Job Title' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'department', type: 'string', title: 'Department',
      options: { list: ['development', 'design', 'marketing', 'operations'] }
    },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'workMode', type: 'string', title: 'Work Mode',
      options: { list: ['remote', 'hybrid', 'onsite'] }
    },
    { name: 'experienceLevel', type: 'string', title: 'Experience Level',
      options: { list: ['entry', 'mid', 'senior', 'lead'] }
    },
    { name: 'experienceYears', type: 'string', title: 'Experience (e.g., 2-4 years)' },
    { name: 'description', type: 'array', of: [{ type: 'block' }], title: 'Description' },
    { name: 'responsibilities', type: 'array', of: [{ type: 'string' }], title: 'Responsibilities' },
    { name: 'requirements', type: 'array', of: [{ type: 'string' }], title: 'Requirements' },
    { name: 'niceToHave', type: 'array', of: [{ type: 'string' }], title: 'Nice to Have' },
    { name: 'isActive', type: 'boolean', title: 'Active Listing', initialValue: true },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
  ],
}
```

### Service Schema

```typescript
// sanity/schemas/service.ts
export const service = {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Service Title' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
    { name: 'shortDescription', type: 'text', title: 'Short Description' },
    { name: 'fullDescription', type: 'array', of: [{ type: 'block' }], title: 'Full Description' },
    { name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Key Features' },
    { name: 'process', type: 'array', of: [
      { type: 'object', fields: [
        { name: 'step', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
      ]}
    ], title: 'Process Steps' },
    { name: 'technologies', type: 'array', of: [{ type: 'string' }], title: 'Technologies' },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
}
```

### Blog Post Schema

```typescript
// sanity/schemas/post.ts
export const post = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'author', type: 'reference', to: [{ type: 'team' }], title: 'Author' },
    { name: 'featuredImage', type: 'image', title: 'Featured Image' },
    { name: 'excerpt', type: 'text', title: 'Excerpt' },
    { name: 'content', type: 'array', of: [
      { type: 'block' },
      { type: 'image' },
      { type: 'code' },
    ], title: 'Content' },
    { name: 'categories', type: 'array', of: [{ type: 'string' }], title: 'Categories' },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'readTime', type: 'number', title: 'Read Time (minutes)' },
  ],
}
```

### Team Schema

```typescript
// sanity/schemas/team.ts
export const team = {
  name: 'team',
  title: 'Team Members',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'role', type: 'string', title: 'Role/Title' },
    { name: 'photo', type: 'image', title: 'Photo' },
    { name: 'bio', type: 'text', title: 'Short Bio' },
    { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
    { name: 'twitter', type: 'url', title: 'Twitter URL' },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
}
```

### Testimonial Schema

```typescript
// sanity/schemas/testimonial.ts
export const testimonial = {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    { name: 'quote', type: 'text', title: 'Testimonial Quote' },
    { name: 'author', type: 'string', title: 'Author Name' },
    { name: 'role', type: 'string', title: 'Role/Title' },
    { name: 'company', type: 'string', title: 'Company' },
    { name: 'photo', type: 'image', title: 'Author Photo' },
    { name: 'companyLogo', type: 'image', title: 'Company Logo' },
    { name: 'featured', type: 'boolean', title: 'Featured' },
  ],
}
```

---

## API Routes

### Contact Form API

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import ContactNotification from '@/emails/contact-notification';
import ContactConfirmation from '@/emails/contact-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // Send notification to team
    await resend.emails.send({
      from: 'Invenex Website <noreply@invenexsolutions.com>',
      to: ['hello@invenexsolutions.com'],
      subject: `New Quote Request: ${validated.projectType}`,
      react: ContactNotification({ ...validated }),
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'Invenex Solutions <hello@invenexsolutions.com>',
      to: [validated.email],
      subject: 'We received your project inquiry!',
      react: ContactConfirmation({ name: validated.name }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

### Career Application API

```typescript
// app/api/career-apply/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { careerSchema } from '@/lib/validations/career';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resume = formData.get('resume') as File;

    // Upload resume to storage (Vercel Blob or similar)
    // Send email with attachment

    await resend.emails.send({
      from: 'Invenex Careers <careers@invenexsolutions.com>',
      to: ['hr@invenexsolutions.com'],
      subject: `New Application: ${formData.get('position')}`,
      react: CareerApplication({ ... }),
      attachments: [{ filename: resume.name, content: Buffer.from(await resume.arrayBuffer()) }],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
```

---

## Environment Variables

```bash
# .env.local

# App
NEXT_PUBLIC_SITE_URL=https://invenexsolutions.com

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Auth (NextAuth)
NEXTAUTH_URL=https://invenexsolutions.com
NEXTAUTH_SECRET=generate_a_secret_here
ADMIN_EMAIL=admin@invenexsolutions.com
ADMIN_PASSWORD_HASH=bcrypt_hash_here

# Resend
RESEND_API_KEY=re_your_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Vercel (auto-set on Vercel)
VERCEL_URL=
```

---

## Performance Optimization Checklist

### Images
- [ ] Use `next/image` for all images
- [ ] Set appropriate `sizes` prop for responsive images
- [ ] Use WebP/AVIF formats (automatic with next/image)
- [ ] Implement lazy loading for below-fold images
- [ ] Optimize Sanity images with URL parameters

### Fonts
- [ ] Use `next/font` for Google Fonts (Inter)
- [ ] Subset fonts to used characters
- [ ] Use `display: swap` for fast text render

### JavaScript
- [ ] Server Components by default
- [ ] Dynamic imports for heavy components (GSAP, charts)
- [ ] Tree-shake unused code
- [ ] Analyze bundle with `@next/bundle-analyzer`

### CSS
- [ ] Tailwind CSS purge unused styles
- [ ] Critical CSS inlined automatically by Next.js
- [ ] Minimize custom CSS

### Caching
- [ ] Set appropriate cache headers
- [ ] Use ISR for dynamic pages with `revalidate`
- [ ] Cache Sanity queries

### Core Web Vitals Targets
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1

---

## SEO Implementation

### Technical SEO
- [ ] Generate `sitemap.xml` dynamically
- [ ] Create `robots.txt`
- [ ] Implement canonical URLs
- [ ] Add structured data (Organization, WebSite, LocalBusiness)
- [ ] Create dynamic OG images

### Meta Tags (Example)

```typescript
// app/(site)/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://invenexsolutions.com'),
  title: {
    default: 'Invenex Solutions - Web & App Development Agency',
    template: '%s | Invenex Solutions',
  },
  description: 'Premium web development, mobile apps, and digital solutions. Transform your ideas into powerful digital products.',
  keywords: ['web development', 'mobile app development', 'digital agency', 'India'],
  authors: [{ name: 'Invenex Solutions' }],
  creator: 'Invenex Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://invenexsolutions.com',
    siteName: 'Invenex Solutions',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invenexsolutions',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Structured Data

```typescript
// components/structured-data.tsx
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Invenex Solutions',
          url: 'https://invenexsolutions.com',
          logo: 'https://invenexsolutions.com/logo.png',
          sameAs: [
            'https://twitter.com/invenexsolutions',
            'https://linkedin.com/company/invenexsolutions',
            'https://instagram.com/invenexsolutions',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@invenexsolutions.com',
            contactType: 'customer service',
          },
        }),
      }}
    />
  );
}
```

---

## Deployment Configuration

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["bom1"],  // Mumbai for India
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### Domain Configuration

1. Add `invenexsolutions.com` to Vercel project
2. Configure DNS:
   - A record: `76.76.21.21`
   - CNAME for www: `cname.vercel-dns.com`
3. Enable automatic HTTPS
4. Configure Resend domain verification for email

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Initialize Next.js 15 project
- [ ] Set up TypeScript, Tailwind, ESLint
- [ ] Create design system (colors, typography, spacing)
- [ ] Build base UI components
- [ ] Set up Sanity Studio
- [ ] Create Sanity schemas
- [ ] Configure Vercel deployment
- [ ] Set up GitHub repository
- [ ] Connect domain

### Phase 2: Core Pages (Week 2-3)
- [ ] Homepage with all sections
- [ ] About page
- [ ] Services overview page
- [ ] Contact page with form
- [ ] Navigation and footer
- [ ] Mobile responsiveness
- [ ] Page transitions with Framer Motion

### Phase 3: Portfolio System (Week 3-4)
- [ ] Portfolio grid page
- [ ] Case study template
- [ ] Sanity integration for projects
- [ ] Image optimization
- [ ] Filtering functionality

### Phase 4: Careers & Blog (Week 4-5)
- [ ] Careers page
- [ ] Job listing template
- [ ] Application form with file upload
- [ ] Blog listing page
- [ ] Blog post template
- [ ] Resend email integration

### Phase 5: Premium Features (Week 5-6)
- [ ] GSAP scroll animations
- [ ] Aceternity UI components
- [ ] Advanced hover effects
- [ ] Loading animations
- [ ] 404 page
- [ ] Error boundaries

### Phase 6: SEO & Performance (Week 6-7)
- [ ] SEO meta tags
- [ ] Structured data
- [ ] Sitemap generation
- [ ] Performance optimization
- [ ] Lighthouse audit (target: 90+ all categories)
- [ ] Analytics setup

### Phase 7: Admin & Polish (Week 7-8)
- [ ] Admin authentication
- [ ] Admin dashboard (view submissions)
- [ ] Final testing
- [ ] Content population
- [ ] Launch preparation

---

## Package Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@sanity/client": "^6.0.0",
    "@sanity/image-url": "^1.0.0",
    "next-sanity": "^9.0.0",
    "next-auth": "^5.0.0",
    "resend": "^4.0.0",
    "@react-email/components": "^0.0.25",
    "framer-motion": "^12.0.0",
    "gsap": "^3.12.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "@next/bundle-analyzer": "^15.0.0",
    "sanity": "^3.0.0"
  }
}
```

---

## Git Repository Setup Commands

```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit: Invenex Solutions website"

# Create GitHub repository (using GitHub CLI)
gh repo create invenex-website --private --source=. --remote=origin

# Push to GitHub
git push -u origin main

# Connect to Vercel
vercel link
vercel env pull .env.local

# Deploy
vercel --prod
```

---

## Resources & Documentation

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sanity.io](https://www.sanity.io/docs)
- [Resend](https://resend.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com/docs/)

### UI Component Sources
- [Aceternity UI](https://ui.aceternity.com/components)
- [Magic UI](https://magicui.design/)
- [Shadcn UI](https://ui.shadcn.com/)

### Design Inspiration
- [Awwwards Agency Websites](https://www.awwwards.com/websites/design-agencies/)
- [Awwwards Dark Websites](https://www.awwwards.com/websites/black/)

---

*Document prepared for Invenex Solutions by Mary, Business Analyst*
*Generated: 2026-01-18*
