'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Building2, Check } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const caterflowFeatures = [
  'Order Management System',
  'Inventory Tracking',
  'Staff Scheduling',
  'Financial Reports',
  'Customer Portal',
  'Mobile App for Field Staff',
]

const erpFeatures = [
  'CRM & Sales Pipeline',
  'Project Management',
  'HR & Payroll',
  'Accounting & Invoicing',
  'Inventory Management',
  'Custom Workflows',
]

export function ProductsClient() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        id="products-hero-title"
        tag="// Our Products"
        headline={
          <>
            <HeadlineWord thin>WE BUILD</HeadlineWord>
            <HeadlineWord coral>PRODUCTS TOO.</HeadlineWord>
          </>
        }
        subtitle="Beyond client work, we create products that solve real business problems. This proves our commitment to excellence and innovation."
      />

      {/* CaterFlow */}
      <CaterFlowSection />

      {/* Invenex ERP */}
      <ERPSection />

      {/* CTA */}
      <SubpageCTA
        headline="WANT US TO"
        highlightedText="BUILD YOURS"
        subtitle="We bring the same dedication and expertise to client projects."
      />
    </>
  )
}

/* ─── CaterFlow Section ────────────────────────────────── */
function CaterFlowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-cf]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        // Text content
        gsap.fromTo(section.querySelectorAll('[data-cf="text"]'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        })

        // Image with parallax
        gsap.fromTo(section.querySelector('[data-cf="img"]'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        })

        // Website preview
        gsap.fromTo(section.querySelector('[data-cf="site"]'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('[data-cf="site"]'), start: 'top 80%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden" aria-labelledby="caterflow-title" data-testid="caterflow-section">
      {/* Atmospheric */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] right-[5%] rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="success" className="mb-4" data-cf="text">Live Product</Badge>
            <h2 id="caterflow-title" className="text-4xl font-bold mb-6" data-cf="text">CaterFlow</h2>
            <p className="text-xl text-foreground-muted mb-6" data-cf="text">
              The complete ERP solution for the catering industry. Manage orders, inventory, staff, and finances in one place.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-8" data-cf="text">
              <div className="p-4 rounded-xl backdrop-blur-xl border border-surface-border" style={{ background: 'var(--color-surface-overlay)' }}>
                <div className="text-2xl font-bold"><AnimatedCounter value={500} suffix="+" /></div>
                <div className="text-xs text-foreground-muted">Active Users</div>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-xl border border-surface-border" style={{ background: 'var(--color-surface-overlay)' }}>
                <div className="text-2xl font-bold"><AnimatedCounter value={99} suffix="%" /></div>
                <div className="text-xs text-foreground-muted">Uptime</div>
              </div>
            </div>

            <GSAPStaggerContainer className="space-y-3 mb-8" aria-label="CaterFlow features">
              {caterflowFeatures.map((feature) => (
                <GSAPStaggerItem key={feature}>
                  <div className="flex items-center gap-3">
                    <span className="text-success" aria-hidden="true"><Check className="w-4 h-4" /></span>
                    <span className="text-foreground-muted">{feature}</span>
                  </div>
                </GSAPStaggerItem>
              ))}
            </GSAPStaggerContainer>

            <div data-cf="text">
              <Button asChild size="lg" className="bg-coral-500 hover:bg-coral-600 text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]">
                <a href="https://caterflow.in" target="_blank" rel="noopener noreferrer" data-testid="caterflow-link">
                  Visit CaterFlow &rarr;
                </a>
              </Button>
            </div>
          </div>

          {/* Image — glassmorphic frame with parallax */}
          <div data-cf="img">
            <div className="rounded-2xl overflow-hidden relative border border-surface-border backdrop-blur-xl" style={{ background: 'var(--color-surface-overlay)' }}>
              <div className="aspect-video relative">
                <Image
                  src="/products/caterflow-cover.png"
                  alt="CaterFlow — Catering management platform"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Website preview */}
        <div data-cf="site" className="mt-16">
          <div className="rounded-2xl overflow-hidden border border-surface-border shadow-2xl shadow-black/20">
            <Image
              src="/products/caterflow-website.png"
              alt="CaterFlow website — Take control of your food business"
              width={1920}
              height={900}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Invenex ERP Section ──────────────────────────────── */
function ERPSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-erp]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        gsap.fromTo(section.querySelectorAll('[data-erp]'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-24 bg-background-secondary relative overflow-hidden" aria-labelledby="invenex-erp-title" data-testid="invenex-erp-section">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Glassmorphic card with atmospheric orbs */}
          <div data-erp className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden relative backdrop-blur-xl border border-surface-border" style={{ background: 'var(--color-surface-overlay)' }}>
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-0 left-0 rounded-full blur-[80px]" style={{ width: 300, height: 300, background: 'rgba(255,106,55,0.08)' }} />
                <div className="absolute bottom-0 right-0 rounded-full blur-[60px]" style={{ width: 200, height: 200, background: 'rgba(255,106,55,0.05)' }} />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center p-8 min-h-[280px]">
                <div className="w-20 h-20 rounded-2xl bg-coral-500/20 border border-coral-500/30 flex items-center justify-center mb-4">
                  <Building2 className="w-10 h-10 text-coral-400" aria-hidden="true" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-1">Invenex ERP</p>
                {/* Pulsing Coming Soon badge */}
                <span className="px-3 py-1 rounded-full bg-coral-500/10 border border-coral-500/20 text-xs text-coral-400 animate-pulse-glow">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="warning" className="mb-4" data-erp>Coming Soon</Badge>
            <h2 id="invenex-erp-title" className="text-4xl font-bold mb-6" data-erp>Invenex ERP</h2>
            <p className="text-xl text-foreground-muted mb-6" data-erp>
              A modern, affordable alternative to Zoho One. Complete business management for growing companies.
            </p>

            <GSAPStaggerContainer className="space-y-3 mb-8" aria-label="Invenex ERP planned features">
              {erpFeatures.map((feature) => (
                <GSAPStaggerItem key={feature}>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground-muted" aria-hidden="true">&bull;</span>
                    <span className="text-foreground-muted">{feature}</span>
                  </div>
                </GSAPStaggerItem>
              ))}
            </GSAPStaggerContainer>

            <div className="flex items-center gap-4" data-erp>
              <Button variant="secondary" disabled aria-describedby="notify-description">
                Notify Me When Ready
              </Button>
              <span id="notify-description" className="text-sm text-foreground-muted">2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
