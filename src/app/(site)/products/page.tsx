import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Our Products | Invenex Solutions',
  description: 'Discover our own products - CaterFlow catering ERP and Invenex ERP for businesses.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16" aria-labelledby="products-hero-title">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <Badge className="mb-6">Our Products</Badge>
            <h1 id="products-hero-title" className="text-5xl md:text-6xl font-bold">
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
      <section className="py-24" aria-labelledby="caterflow-title" data-testid="caterflow-section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <Badge variant="success" className="mb-4">Live Product</Badge>
              <h2 id="caterflow-title" className="text-4xl font-bold mb-6">CaterFlow</h2>
              <p className="text-xl text-foreground-muted mb-6">
                The complete ERP solution for the catering industry.
                Manage orders, inventory, staff, and finances in one place.
              </p>

              <ul className="space-y-3 mb-8" aria-label="CaterFlow features">
                {[
                  'Order Management System',
                  'Inventory Tracking',
                  'Staff Scheduling',
                  'Financial Reports',
                  'Customer Portal',
                  'Mobile App for Field Staff',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-success" aria-hidden="true">✓</span>
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg">
                <a
                  href="https://caterflow.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="caterflow-link"
                >
                  Visit CaterFlow →
                </a>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              {/* TODO: Replace with actual CaterFlow screenshot/demo video */}
              <Card className="aspect-video flex items-center justify-center">
                <div className="text-center text-foreground-muted">
                  <p className="text-6xl mb-4" aria-hidden="true">🍽️</p>
                  <p>CaterFlow Dashboard Preview</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Invenex ERP Teaser */}
      <section className="py-24 bg-background-secondary" aria-labelledby="invenex-erp-title" data-testid="invenex-erp-section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              {/* TODO: Replace with Invenex ERP teaser visual when available */}
              <Card className="aspect-video flex items-center justify-center bg-gradient-to-br from-foreground/5 to-foreground/10">
                <div className="text-center">
                  <p className="text-6xl mb-4" aria-hidden="true">🚀</p>
                  <p className="text-foreground-muted">Coming Soon</p>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="order-1 lg:order-2">
              <Badge variant="warning" className="mb-4">Coming Soon</Badge>
              <h2 id="invenex-erp-title" className="text-4xl font-bold mb-6">Invenex ERP</h2>
              <p className="text-xl text-foreground-muted mb-6">
                A modern, affordable alternative to Zoho One.
                Complete business management for growing companies.
              </p>

              <ul className="space-y-3 mb-8" aria-label="Invenex ERP planned features">
                {[
                  'CRM & Sales Pipeline',
                  'Project Management',
                  'HR & Payroll',
                  'Accounting & Invoicing',
                  'Inventory Management',
                  'Custom Workflows',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-foreground-muted" aria-hidden="true">•</span>
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <Button variant="secondary" disabled aria-describedby="notify-description">
                  Notify Me When Ready
                </Button>
                <span id="notify-description" className="text-sm text-foreground-muted">2026</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* TODO: /contact page pending Epic 5-1 implementation */}
      <section className="py-24" aria-labelledby="products-cta-title" data-testid="products-cta-section">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 id="products-cta-title" className="text-3xl md:text-4xl font-bold mb-6">
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
