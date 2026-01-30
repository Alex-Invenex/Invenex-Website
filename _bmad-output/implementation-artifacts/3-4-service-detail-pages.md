# Story 3.4: Service Detail Pages

Status: done

## Story

As a **potential client**,
I want **detailed information about a specific service**,
So that **I can understand if it meets my needs**.

## Acceptance Criteria

### AC1: Service Detail Content
**Given** I navigate to a service detail page (e.g., /services/web-development)
**When** the page loads
**Then** I see:
- Service title and comprehensive description
- Key features/benefits list
- Relevant portfolio examples
- Technologies used for this service
- Process steps for this service type
- CTA to request a quote for this service

### AC2: All 6 Service Pages
**Given** 6 service pages exist
**When** each is accessed
**Then** unique content is displayed for:
- Web Development
- Mobile App Development
- Platform Development
- E-Commerce Solutions
- Social Media Marketing
- Digital Strategy

## Tasks / Subtasks

- [x] Task 1: Create Dynamic Route (AC: 1, 2)
  - [x] Create `src/app/services/[slug]/page.tsx`
  - [x] Create `generateStaticParams` for all 6 services
  - [x] Create `generateMetadata` for dynamic SEO

- [x] Task 2: Create Service Data
  - [x] Define service content structure
  - [x] Create content for all 6 services

- [x] Task 3: Build Service Detail Layout (AC: 1)
  - [x] Hero with service title
  - [x] Description section
  - [x] Features list
  - [x] Technologies grid
  - [x] Process steps section (5-step process)
  - [x] Portfolio section (links to /portfolio)
  - [x] CTA section

## Dev Notes

### Service Detail Page

```tsx
// src/app/services/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Service data
const services = {
  'web-development': {
    title: 'Web Development',
    description: 'We build modern, fast, and scalable websites and web applications using the latest technologies.',
    longDescription: `Our web development services cover everything from simple landing pages to complex
    web applications. We specialize in React, Next.js, and modern JavaScript frameworks to deliver
    exceptional user experiences.`,
    features: [
      'Custom website design and development',
      'Progressive Web Apps (PWA)',
      'E-commerce solutions',
      'Content Management Systems',
      'API development and integration',
      'Performance optimization',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    icon: '🌐',
  },
  'mobile-apps': {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that users love.',
    longDescription: `We create mobile applications for iOS and Android using React Native
    and native technologies. Our apps are fast, beautiful, and built to scale.`,
    features: [
      'iOS app development',
      'Android app development',
      'Cross-platform solutions',
      'App Store optimization',
      'Push notifications',
      'Offline-first architecture',
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    icon: '📱',
  },
  'platform-development': {
    title: 'Platform Development',
    description: 'Custom SaaS platforms and enterprise solutions built to scale.',
    longDescription: `We design and build custom platforms that power your business operations.
    From internal tools to customer-facing SaaS products, we deliver scalable solutions.`,
    features: [
      'SaaS platform development',
      'Multi-tenant architecture',
      'User management systems',
      'Analytics dashboards',
      'Integration capabilities',
      'Scalable infrastructure',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    icon: '🏗️',
  },
  'e-commerce': {
    title: 'E-Commerce Solutions',
    description: 'Online stores and marketplaces that convert visitors into customers.',
    longDescription: `We build e-commerce solutions that drive sales. From product catalogs
    to payment processing, we handle every aspect of your online store.`,
    features: [
      'Custom e-commerce stores',
      'Marketplace development',
      'Payment gateway integration',
      'Inventory management',
      'Order tracking',
      'Analytics and reporting',
    ],
    technologies: ['Shopify', 'WooCommerce', 'Next.js', 'Stripe', 'PayPal'],
    icon: '🛒',
  },
  'social-media-marketing': {
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns that grow your brand presence.',
    longDescription: `Our social media marketing services help you build a strong online presence,
    engage with your audience, and drive meaningful business results.`,
    features: [
      'Social media strategy',
      'Content creation',
      'Community management',
      'Paid advertising',
      'Influencer partnerships',
      'Analytics and reporting',
    ],
    technologies: ['Meta Business Suite', 'LinkedIn Ads', 'Google Ads', 'Hootsuite'],
    icon: '📣',
  },
  'digital-strategy': {
    title: 'Digital Strategy',
    description: 'Technology consulting and roadmapping for digital transformation.',
    longDescription: `We help businesses navigate their digital transformation journey with
    strategic planning, technology selection, and implementation roadmaps.`,
    features: [
      'Digital transformation consulting',
      'Technology assessment',
      'Roadmap development',
      'Vendor selection',
      'Process optimization',
      'Change management',
    ],
    technologies: ['Project Management', 'Business Analysis', 'Data Analytics'],
    icon: '🎯',
  },
}

type ServiceSlug = keyof typeof services

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services[params.slug as ServiceSlug]
  if (!service) return { title: 'Service Not Found' }

  return {
    title: service.title,
    description: service.description,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as ServiceSlug]

  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <span className="text-6xl block mb-6">{service.icon}</span>
            <h1 className="text-5xl md:text-6xl font-bold">{service.title}</h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl">
              {service.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="text-lg text-foreground-muted max-w-3xl">
              {service.longDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold">What We Offer</h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature) => (
              <StaggerItem key={feature}>
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-success">✓</span>
                    <p>{feature}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold">Technologies We Use</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <Badge key={tech} size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Let's discuss your {service.title.toLowerCase()} project.
            </p>
            <Button asChild size="lg">
              <Link href={`/contact?service=${params.slug}`}>Request a Quote</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Dynamic Route | [slug] with generateStaticParams |
| Static Generation | All 6 pages pre-rendered |
| SEO | Dynamic metadata per service |
| Data | Inline for now, CMS later |

### Testing Checklist

- [x] All 6 service URLs work
- [x] Each page has unique content
- [x] Features list displays correctly
- [x] Technologies shown with badges
- [x] Process steps section displays (5 steps)
- [x] Portfolio section with link to /portfolio
- [x] CTA links to contact with service param
- [x] 404 for invalid slugs
- [x] Accessibility: focus-visible styles on feature cards

### References

- [Source: prd.md#FR4-Service-Detail]
- [Source: architecture.md#Dynamic-Routes]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Implementation Plan
1. Created dynamic route with [slug] folder structure
2. Implemented server component (page.tsx) for static generation and metadata
3. Implemented client component (service-detail-client.tsx) for animations
4. Used icon name mapping to pass serializable data from server to client
5. Added comprehensive Playwright tests covering all ACs

### Debug Log
- Initial implementation failed due to passing React component (LucideIcon) from server to client
- Fixed by using icon name strings and mapping to icons on the client side

### Completion Notes List
- All 6 service detail pages implemented with unique content
- Dynamic routing with generateStaticParams for static generation
- Dynamic SEO metadata per service page
- Responsive layout with Framer Motion animations
- Accessible sections with aria-labelledby landmarks
- Process steps section added (5-step workflow)
- Portfolio section with link to /portfolio page
- Feature cards have focus-visible styles for accessibility
- All AC1 requirements now implemented

### File List
- src/app/services/[slug]/page.tsx (new)
- src/app/services/[slug]/service-detail-client.tsx (new, updated with process/portfolio sections)
- tests/service-detail.spec.ts (new, updated with process/portfolio tests)

## Senior Developer Review (AI)

**Review Date:** 2026-01-23
**Reviewer:** Claude Opus 4.5
**Review Outcome:** Changes Requested → Fixed

### Action Items
- [x] [CRITICAL] Add process steps section (AC1 requirement)
- [x] [CRITICAL] Add portfolio section placeholder (AC1 requirement)
- [x] [MEDIUM] Add focus-visible styles to feature cards
- [x] [MEDIUM] Update tests to verify process and portfolio sections
- [x] [MEDIUM] Update story file tasks to match implementation

### Fixes Applied
1. Added 5-step process section matching services overview page
2. Added portfolio section with link to /portfolio
3. Added focus-visible accessibility styles to feature cards
4. Added 2 new tests for process and portfolio sections
5. Updated story tasks and testing checklist

## Change Log
- 2026-01-23: Implemented service detail pages with all 6 services, dynamic routing, and comprehensive tests
- 2026-01-23: [Code Review] Added process steps, portfolio section, accessibility fixes per AC1 requirements
