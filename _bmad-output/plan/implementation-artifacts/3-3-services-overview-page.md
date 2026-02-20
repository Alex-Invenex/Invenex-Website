# Story 3.3: Services Overview Page

Status: ready-for-dev

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

- [ ] Task 1: Create Services Page Route (AC: 1)
  - [ ] Create `src/app/services/page.tsx`
  - [ ] Add page metadata

- [ ] Task 2: Build Services Hero Section
  - [ ] Headline and description
  - [ ] Animated background

- [ ] Task 3: Build Service Cards Grid (AC: 1, 2)
  - [ ] Large format cards
  - [ ] Icon, title, description, link
  - [ ] Hover effects
  - [ ] Links to detail pages

- [ ] Task 4: Build Process Section
  - [ ] Step-by-step process explanation
  - [ ] Visual indicators

- [ ] Task 5: Build Technologies Section
  - [ ] Tech stack logos
  - [ ] Grayscale to color on hover

- [ ] Task 6: Build CTA Section
  - [ ] Consultation call to action

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

- [ ] All 6 services displayed
- [ ] Cards link to correct detail pages
- [ ] Process steps visible
- [ ] CTA button works
- [ ] Mobile responsive

### References

- [Source: prd.md#FR3-Services-Overview]
- [Source: ux-design-specification.md#Services-Page]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
