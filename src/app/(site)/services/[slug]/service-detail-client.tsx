'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Globe, Smartphone, Layers, ShoppingCart, Share2, Lightbulb, ArrowRight, type LucideIcon } from 'lucide-react'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import { ShareButtons } from '@/components/ui/share-buttons'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/pricing/price'
import { TIERS, APP_TIERS, APP_CARE, ECOM_TIERS, RETAINERS, STRATEGY, type PriceSet } from '@/lib/pricing'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/* ─── Pricing per service slug ─────────────────────────────
   Every price literal traces back to `src/lib/pricing.ts`. */
interface PricingItem {
  name: string
  price: PriceSet
  suffix?: string
}

const webTiers = TIERS.filter((t) => t.id === 'launchpad' || t.id === 'launch' || t.id === 'growth')
const platformTiers = TIERS.filter((t) => t.id === 'platform' || t.id === 'platformScale')
const appCare = APP_CARE
const mobileTiers = APP_TIERS.filter((t) => t.id !== 'appCare')

const PRICING_BY_SLUG: Record<string, PricingItem[]> = {
  'web-development': webTiers.map((t) => ({ name: t.name, price: t.price })),
  'mobile-development': mobileTiers.map((t) => ({ name: t.name, price: t.price })),
  'platform-development': platformTiers.map((t) => ({ name: t.name, price: t.price })),
  ecommerce: ECOM_TIERS.map((t) => ({ name: t.name, price: t.price })),
  'social-media': RETAINERS.map((t) => ({ name: t.name, price: t.price, suffix: '/mo' })),
  'digital-strategy': [
    { name: STRATEGY.sprint.name, price: STRATEGY.sprint.price },
    { name: STRATEGY.advisory.name, price: STRATEGY.advisory.price, suffix: '/mo' },
  ],
}

/* ─── Icon mapping ─────────────────────────────────────── */
const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  layers: Layers,
  'shopping-cart': ShoppingCart,
  share2: Share2,
  lightbulb: Lightbulb,
}

/* ─── Process steps ────────────────────────────────────── */
const processSteps = [
  { step: 1, title: 'Discovery', description: 'We learn about your business, goals, and challenges' },
  { step: 2, title: 'Strategy', description: 'We create a detailed roadmap for your project success' },
  { step: 3, title: 'Design', description: 'We craft beautiful, intuitive, and functional designs' },
  { step: 4, title: 'Development', description: 'We build with precision, quality, and attention to detail' },
  { step: 5, title: 'Launch', description: 'We deploy, optimize, and ensure everything runs smoothly' },
]

interface ServiceDetailClientProps {
  service: {
    slug: string
    title: string
    description: string
    longDescription: string
    features: string[]
    technologies: string[]
    iconName: string
    gradient: string
    iconColor: string
  }
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const Icon = iconMap[service.iconName] || Globe

  return (
    <>
      {/* Hero */}
      <SubpageHero
        id="service-hero-heading"
        tag={`// ${service.title}`}
        headline={
          <>
            <HeadlineWord thin>{service.title.split(' ').slice(0, -1).join(' ').toUpperCase() || service.title.toUpperCase()}</HeadlineWord>
            <HeadlineWord coral>{service.title.split(' ').slice(-1)[0].toUpperCase()}</HeadlineWord>
          </>
        }
        subtitle={service.description}
        testId="service-hero"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-2xl backdrop-blur-xl border border-surface-border flex items-center justify-center" style={{ background: 'var(--color-surface-overlay)' }}>
            <Icon className="w-8 h-8 text-coral-400" aria-hidden="true" />
          </div>
          <ShareButtons title={`${service.title} - Invenex Solutions`} />
        </div>
      </SubpageHero>

      {/* Description — CharRevealText style */}
      <DescriptionSection text={service.longDescription} />

      {/* Features */}
      <FeaturesSection features={service.features} />

      {/* Pricing */}
      <PricingSection slug={service.slug} />

      {/* Technologies */}
      <TechSection technologies={service.technologies} />

      {/* Process */}
      <ProcessSection title={service.title} />

      {/* Portfolio link */}
      <PortfolioLink title={service.title} />

      {/* CTA */}
      <SubpageCTA
        headline="READY TO"
        highlightedText="GET STARTED"
        subtitle={`Let's discuss your ${service.title.toLowerCase()} project and see how we can help.`}
        primaryCTA={{ label: 'See Pricing', href: '/pricing' }}
      />
    </>
  )
}

/* ─── Description Section ──────────────────────────────── */
function DescriptionSection({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-sdesc]', { opacity: 1 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        const chars = section.querySelectorAll('[data-sdesc]')
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.008,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="service-description" className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-lg md:text-xl text-foreground-muted max-w-3xl leading-relaxed">
          {text.split('').map((char, i) => (
            <span
              key={i}
              data-sdesc
              style={{ opacity: 0.1 }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

/* ─── Features Section ─────────────────────────────────── */
function FeaturesSection({ features }: { features: string[] }) {
  return (
    <section aria-labelledby="features-heading" className="py-16 bg-background-secondary relative overflow-hidden">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 id="features-heading" className="text-3xl font-bold mb-12">What We Offer</h2>
        <GSAPStaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GSAPStaggerItem key={feature}>
              <div
                data-testid="feature-card"
                className="p-6 rounded-xl backdrop-blur-xl border border-surface-border transition-all duration-300 hover:border-coral-500/20"
                style={{ background: 'var(--color-surface-overlay)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" aria-hidden="true" />
                  </div>
                  <p className="text-foreground">{feature}</p>
                </div>
              </div>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Pricing Section ──────────────────────────────────── */
function PricingSection({ slug }: { slug: string }) {
  const items = PRICING_BY_SLUG[slug]
  if (!items || items.length === 0) return null

  return (
    <section aria-labelledby="pricing-heading" data-testid="service-pricing" className="py-16 bg-background-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <h2 id="pricing-heading" className="text-3xl font-bold mb-4">What It Costs</h2>
        <p className="text-foreground-muted max-w-2xl mb-10">
          Every price traces back to the same sheet everyone else sees — no quote call required.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {items.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-xl backdrop-blur-xl border border-surface-border"
              style={{ background: 'var(--color-surface-overlay)' }}
            >
              <p className="text-sm text-foreground-muted mb-2">{item.name}</p>
              <p className="font-mono text-2xl md:text-3xl text-coral-500 font-semibold">
                <Price amount={item.price} suffix={item.suffix} />
              </p>
            </div>
          ))}
        </div>

        {slug === 'mobile-development' && (
          <p className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
            <span
              data-testid="app-care-required"
              className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold uppercase tracking-wide border border-amber-500/20 shrink-0"
            >
              Required
            </span>
            <span>
              App Care{' '}
              <span className="font-mono text-coral-500 font-semibold">
                <Price amount={appCare.price} suffix="/mo" />
              </span>{' '}
              — an app that stops being updated eventually stops being downloadable. This isn&apos;t an upsell, it&apos;s the cost of your app continuing to exist.
            </span>
          </p>
        )}

        {slug === 'ecommerce' && (
          <p className="text-sm text-foreground-muted italic mb-6">Priced by catalogue size, not page count.</p>
        )}

        {slug === 'social-media' && (
          <p className="text-sm text-foreground-muted mb-6">{RETAINERS[0].adSpendNote}</p>
        )}

        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-sm font-medium"
        >
          See full pricing
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  )
}

/* ─── Technologies Section ─────────────────────────────── */
function TechSection({ technologies }: { technologies: string[] }) {
  return (
    <section aria-labelledby="tech-heading" className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <h2 id="tech-heading" className="text-3xl font-bold mb-12">Technologies We Use</h2>
        <GSAPStaggerContainer className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <GSAPStaggerItem key={tech}>
              <span
                data-testid="tech-badge"
                className="inline-block px-4 py-2 rounded-full backdrop-blur-xl border border-surface-border text-sm text-foreground-muted transition-all duration-300 hover:border-coral-500/20 hover:text-foreground hover:shadow-[0_0_15px_rgba(255,106,55,0.1)]"
                style={{ background: 'var(--color-surface-overlay)' }}
              >
                {tech}
              </span>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Process Section ──────────────────────────────────── */
function ProcessSection({ title }: { title: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const connectorRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-sp]', { opacity: 1, y: 0 })
        if (connectorRef.current) gsap.set(connectorRef.current, { scaleX: 1 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        if (connectorRef.current) {
          gsap.fromTo(connectorRef.current, { scaleX: 0 }, {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 60%', end: 'center 40%', scrub: 1 },
          })
        }

        gsap.fromTo(section.querySelectorAll('[data-sp="step"]'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} aria-labelledby="process-heading" data-testid="service-process" className="py-16 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="process-heading" className="text-3xl font-bold">Our Process</h2>
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto">How we deliver exceptional {title.toLowerCase()} solutions</p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div ref={connectorRef} className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-coral-500/50 via-coral-400/50 to-coral-500/50 origin-left" aria-hidden="true" style={{ transform: 'scaleX(0)' }} />

          {processSteps.map((step) => (
            <div key={step.step} className="flex-1 relative" data-sp="step" data-testid="process-step">
              <div className="flex items-start gap-4 md:block md:text-center">
                <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center md:mx-auto md:mb-4 font-bold text-white text-sm md:text-lg shadow-[0_0_20px_rgba(255,106,55,0.3)]" style={{ background: 'linear-gradient(135deg, var(--color-coral-500), var(--color-coral-600))' }}>
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-xs md:text-sm text-foreground-muted">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Portfolio Link ───────────────────────────────────── */
function PortfolioLink({ title }: { title: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-plink]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-plink]', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} aria-labelledby="portfolio-heading" data-testid="service-portfolio" className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12 text-center" data-plink>
        <h2 id="portfolio-heading" className="text-3xl font-bold mb-4">Our {title} Work</h2>
        <p className="text-foreground-muted max-w-2xl mx-auto mb-8">Explore our portfolio of successful {title.toLowerCase()} projects.</p>
        <Button asChild variant="secondary" size="lg">
          <Link href="/portfolio">View Full Portfolio</Link>
        </Button>
      </div>
    </section>
  )
}
