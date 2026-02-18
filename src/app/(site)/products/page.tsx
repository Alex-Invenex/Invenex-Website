import Image from 'next/image'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/animated-section'
import { HeroHeading } from '@/components/ui/hero-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Our Products',
  description: 'Discover our own products - CaterFlow catering ERP and upcoming Invenex ERP. We build products that solve real business problems.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden" aria-labelledby="products-hero-title">
        {/* Animated gradient background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-coral-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-coral-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <Badge className="mb-6">Our Products</Badge>
          </AnimatedSection>
          <HeroHeading id="products-hero-title">
            We Build Our Own Products Too
          </HeroHeading>
          <AnimatedSection delay={0.1}>
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
              <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/5">
                <Image
                  src="/products/caterflow-cover.png"
                  alt="CaterFlow — Catering management platform"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Invenex ERP Teaser */}
      <section className="py-24 bg-background-secondary" aria-labelledby="invenex-erp-title" data-testid="invenex-erp-section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="aspect-video rounded-2xl overflow-hidden relative bg-gradient-to-br from-coral-500/10 via-background-secondary to-coral-400/5 border border-white/5">
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-coral-500/15 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-coral-400/10 rounded-full blur-[60px]" />
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-coral-500/20 border border-coral-500/30 flex items-center justify-center mb-4">
                    <Building2 className="w-10 h-10 text-coral-400" aria-hidden="true" />
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1">Invenex ERP</p>
                  <p className="text-sm text-foreground-muted">Coming Soon</p>
                </div>
              </div>
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
