# Story 3.5: Products Page

Status: ready-for-dev

## Story

As a **visitor**,
I want **to see Invenex's own products**,
So that **I understand they don't just build for clients but create their own solutions**.

## Acceptance Criteria

### AC1: Products Page Content
**Given** I navigate to the Products page
**When** the page loads
**Then** I see:
- Hero section emphasizing "We Build Our Own Products"
- CaterFlow showcase section with:
  - Product logo/branding
  - Description of the catering ERP
  - Key features list
  - Screenshot or demo video
  - Link to caterflow.in (external)
- Invenex ERP teaser section with:
  - "Coming Soon" badge
  - Brief description (Zoho One alternative)
  - Interest signup or notification option

### AC2: External Links
**Given** I click the CaterFlow link
**When** the navigation occurs
**Then** it opens in a new tab with proper rel attributes

## Tasks / Subtasks

- [ ] Task 1: Create Products Page Route (AC: 1)
  - [ ] Create `src/app/products/page.tsx`
  - [ ] Add page metadata

- [ ] Task 2: Build Products Hero Section
  - [ ] "We Build Our Own Products" messaging
  - [ ] Differentiator explanation

- [ ] Task 3: Build CaterFlow Section (AC: 1, 2)
  - [ ] Product branding/logo
  - [ ] Description and features
  - [ ] Screenshot placeholder
  - [ ] External link with proper attributes

- [ ] Task 4: Build Invenex ERP Teaser (AC: 1)
  - [ ] "Coming Soon" badge
  - [ ] Brief description
  - [ ] Optional: email signup form

## Dev Notes

### Products Page Structure

```tsx
// src/app/products/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Discover our own products - CaterFlow catering ERP and Invenex ERP for businesses.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <Badge className="mb-6">Our Products</Badge>
            <h1 className="text-5xl md:text-6xl font-bold">
              We Build Our Own
              <br />
              <span className="text-foreground-muted">Products Too</span>
            </h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Beyond client work, we create products that solve real business problems.
              This proves our commitment to excellence and innovation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CaterFlow Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <Badge variant="success" className="mb-4">Live Product</Badge>
              <h2 className="text-4xl font-bold mb-6">CaterFlow</h2>
              <p className="text-xl text-foreground-muted mb-6">
                The complete ERP solution for the catering industry.
                Manage orders, inventory, staff, and finances in one place.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Order Management System',
                  'Inventory Tracking',
                  'Staff Scheduling',
                  'Financial Reports',
                  'Customer Portal',
                  'Mobile App for Field Staff',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-success">✓</span>
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg">
                <a
                  href="https://caterflow.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit CaterFlow →
                </a>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              {/* Screenshot/Demo Placeholder */}
              <Card className="aspect-video flex items-center justify-center">
                <div className="text-center text-foreground-muted">
                  <p className="text-6xl mb-4">🍽️</p>
                  <p>CaterFlow Dashboard Preview</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Invenex ERP Teaser */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              {/* Teaser Visual */}
              <Card className="aspect-video flex items-center justify-center bg-gradient-to-br from-foreground/5 to-foreground/10">
                <div className="text-center">
                  <p className="text-6xl mb-4">🚀</p>
                  <p className="text-foreground-muted">Coming Soon</p>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="order-1 lg:order-2">
              <Badge variant="warning" className="mb-4">Coming Soon</Badge>
              <h2 className="text-4xl font-bold mb-6">Invenex ERP</h2>
              <p className="text-xl text-foreground-muted mb-6">
                A modern, affordable alternative to Zoho One.
                Complete business management for growing companies.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'CRM & Sales Pipeline',
                  'Project Management',
                  'HR & Payroll',
                  'Accounting & Invoicing',
                  'Inventory Management',
                  'Custom Workflows',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-foreground-muted">•</span>
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <Button variant="secondary" disabled>
                  Notify Me When Ready
                </Button>
                <span className="text-sm text-foreground-muted">2024</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want Us to Build Something for You?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              We bring the same dedication and expertise to client projects.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Start Your Project</Link>
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
| Page Route | /products with metadata |
| External Links | target="_blank" rel="noopener noreferrer" |
| Badge States | success (live), warning (coming soon) |
| Visuals | Placeholder cards for now |

### Testing Checklist

- [ ] Hero section displays correctly
- [ ] CaterFlow section shows all features
- [ ] External link opens in new tab
- [ ] Invenex ERP shows "Coming Soon" badge
- [ ] CTA links to contact page
- [ ] Mobile responsive layout

### References

- [Source: prd.md#FR5-Products-Page]
- [Source: ux-design-specification.md#Products-Page]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
