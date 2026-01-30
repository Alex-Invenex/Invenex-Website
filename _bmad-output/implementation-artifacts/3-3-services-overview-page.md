# Story 3.3: Services Overview Page

Status: done

## Story

As a **potential client**,
I want **to see all services Invenex offers**,
So that **I can find the right solution for my needs**.

## Acceptance Criteria

### AC1: Services Page Content
**Given** I navigate to the Services page
**When** the page loads
**Then** I see:
- Hero section with "Our Services" headline
- Grid of 6 service cards (large format)
- Each card shows: icon, title, description, "Learn More" link
- Process section explaining how they work
- Technologies section showing tech stack logos
- CTA for consultation

### AC2: Service Card Navigation
**Given** I click on a service card
**When** the navigation occurs
**Then** I am taken to the individual service detail page

## Tasks / Subtasks

- [x] Task 1: Create Services Page Route (AC: 1)
  - [x] Create `src/app/services/page.tsx`
  - [x] Add page metadata

- [x] Task 2: Build Services Hero Section
  - [x] Headline and description
  - [x] Animated background

- [x] Task 3: Build Service Cards Grid (AC: 1, 2)
  - [x] Large format cards
  - [x] Icon, title, description, link
  - [x] Hover effects
  - [x] Links to detail pages

- [x] Task 4: Build Process Section
  - [x] Step-by-step process explanation
  - [x] Visual indicators

- [x] Task 5: Build Technologies Section
  - [x] Tech stack logos
  - [x] Grayscale to color on hover

- [x] Task 6: Build CTA Section
  - [x] Consultation call to action

## Dev Notes

### Services Page Structure

```tsx
// src/app/services/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive range of web development, mobile app, and digital services.',
}

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance.',
    icon: '🌐',
    href: '/services/web-development',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: '📱',
    href: '/services/mobile-apps',
  },
  {
    title: 'Platform Development',
    description: 'Custom SaaS platforms and enterprise solutions built to scale.',
    icon: '🏗️',
    href: '/services/platform-development',
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Online stores and marketplaces that convert visitors into customers.',
    icon: '🛒',
    href: '/services/e-commerce',
  },
  {
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns that grow your brand presence.',
    icon: '📣',
    href: '/services/social-media-marketing',
  },
  {
    title: 'Digital Strategy',
    description: 'Technology consulting and roadmapping for digital transformation.',
    icon: '🎯',
    href: '/services/digital-strategy',
  },
]

const process = [
  { step: 1, title: 'Discovery', description: 'We learn about your business and goals' },
  { step: 2, title: 'Strategy', description: 'We create a roadmap for success' },
  { step: 3, title: 'Design', description: 'We craft beautiful, functional designs' },
  { step: 4, title: 'Development', description: 'We build with precision and care' },
  { step: 5, title: 'Launch', description: 'We deploy and optimize for success' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold">Our Services</h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Link href={service.href}>
                  <Card variant="interactive" className="h-full p-8 group">
                    <span className="text-5xl block mb-6">{service.icon}</span>
                    <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
                    <p className="text-foreground-muted mb-6">{service.description}</p>
                    <span className="text-sm font-medium text-foreground group-hover:underline">
                      Learn More →
                    </span>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Process</h2>
            <p className="mt-4 text-foreground-muted">How we bring your vision to life</p>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row justify-between gap-8">
            {process.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.1} className="flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-foreground-muted">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Let's discuss how we can help you achieve your digital goals.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get a Free Consultation</Link>
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
| Page Route | /services with metadata |
| Service Cards | Link to detail pages |
| Process | 5-step visual flow |
| CTA | Links to contact |

### Testing Checklist

- [x] All 6 services displayed
- [x] Cards link to correct detail pages
- [x] Process steps visible
- [x] CTA button works
- [x] Mobile responsive

### References

- [Source: prd.md#FR3-Services-Overview]
- [Source: ux-design-specification.md#Services-Page]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Created `/services` route with comprehensive services overview page
- Implemented hero section with animated gradient background and "Our Services" headline
- Built 6 service cards (Web Development, Mobile Apps, Platform Development, E-Commerce, Social Media Marketing, Digital Strategy) with Lucide icons matching the existing design system
- Each card includes: icon with color gradient, title, description, "Learn More" link, hover effects with gradient backgrounds and glow effects
- Cards link to respective detail pages (e.g., `/services/web-development`)
- Implemented 5-step process section with numbered steps and visual indicators
- Added technologies section with 8 tech logos featuring grayscale-to-color hover effect
- Built CTA section with consultation button and "View Our Work" secondary button
- Created layout.tsx for metadata (title, description) since page is a client component
- Followed existing design patterns from services-preview.tsx and about page
- Build verified successful with Next.js 16.1.3

### File List
- src/app/services/page.tsx (created, updated with review fixes)
- src/app/services/layout.tsx (created)
- tests/services.spec.ts (created)

## Senior Developer Review (AI)

**Review Date:** 2026-01-23
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)
**Outcome:** Approved (Issues Fixed)

### Issues Found: 4 High, 3 Medium, 3 Low

### Action Items (All Resolved)

- [x] [HIGH] Missing Tests - Created comprehensive Playwright tests (tests/services.spec.ts)
- [x] [HIGH] Broken Connector Lines - Fixed positioning by moving to parent container with proper relative context
- [x] [HIGH] Missing Accessibility Landmarks - Added aria-labelledby, aria-hidden, role="img" attributes
- [x] [HIGH] Missing focus styles - Added focus-visible styles matching hover effects
- [x] [MEDIUM] Focus Styles on Cards - Added group-focus-visible classes for keyboard navigation
- [x] [MEDIUM] Data-testid attributes - Added for testing (service-card, service-icon, services-grid)
- [x] [MEDIUM] Emoji accessibility - Added role="img" and aria-label to technology logos
- [x] [LOW] Animation concerns - Noted for future optimization (kept existing pattern)
- [x] [LOW] Technologies grid - Noted, current implementation works for 8 items
- [x] [LOW] Hardcoded data - Noted for future centralization (low priority)

### Summary
All HIGH and MEDIUM issues were fixed. The page now has:
- Comprehensive Playwright test coverage (matching homepage and about page patterns)
- Proper ARIA landmarks for accessibility (aria-labelledby on all sections)
- Focus-visible styles for keyboard navigation
- Fixed process section connector line positioning
- Test IDs for reliable E2E testing

## Change Log
- 2026-01-23: Initial implementation of Services Overview Page (Story 3.3) - All 6 tasks completed, build verified successful
- 2026-01-23: Code review completed - Fixed 7 HIGH/MEDIUM issues: added tests, accessibility landmarks, focus styles, data-testid attributes
- 2026-01-23: Playwright tests executed - 40/40 passed (20 chromium + 20 mobile-chrome)
