'use client'

import { useRef, useEffect, useState, type ComponentType } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import {
  WebDevCard,
  MobileAppCard,
  PlatformCard,
  ECommerceCard,
  SocialMediaCard,
  StrategyCard,
} from '@/components/ui/service-visual-cards'
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { Price } from '@/components/pricing/price'
import { TIERS, APP_TIERS, APP_CARE, ECOM_TIERS, RETAINERS, STRATEGY, BLUEPRINT, CARE_PLANS, type PriceSet } from '@/lib/pricing'

const momentum = CARE_PLANS.find((p) => p.id === 'momentum')!

/* ─── Pricing slices ──────────────────────────────────────
   Every price literal traces back to `src/lib/pricing.ts` — nothing here is
   invented, only sliced into the groupings each service card needs. */
const webTiers = TIERS.filter((t) => t.id === 'launchpad' || t.id === 'launch' || t.id === 'growth')
const platformTiers = TIERS.filter((t) => t.id === 'platform' || t.id === 'platformScale')
const appCare = APP_CARE
const mobileTiers = APP_TIERS.filter((t) => t.id !== 'appCare')

interface PriceItem {
  name: string
  price: PriceSet
  suffix?: string
}

interface ServiceEntry {
  num: string
  title: string
  description: string
  tags: string[]
  href: string
  card: ComponentType
  prices: PriceItem[]
  /** Platform only — the CaterFlow proof line. */
  proof?: string
  /** Small qualifier under the price row (e.g. "priced by catalogue size"). */
  note?: string
  /** Mobile only — App Care is mandatory, not an upsell. */
  careRequired?: boolean
}

/* ─── Data ─────────────────────────────────────── */
/* Order: Platform Development leads, then Web / Mobile / E-Commerce as the
   supporting row, then Social Media Marketing and Digital Strategy demoted
   into a small "Ongoing" strip beneath. */
const primaryServices: ServiceEntry[] = [
  {
    num: '01',
    title: 'Platform Development',
    description:
      "Scalable SaaS platforms and internal systems. We don't just build these — we run one. CaterFlow has processed 12,000 orders for 50 catering businesses, which means we've already made the expensive mistakes at our own cost.",
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    href: '/services/platform-development',
    card: PlatformCard,
    prices: platformTiers.map((t) => ({ name: t.name, price: t.price })),
    proof:
      "CaterFlow: 12,000 orders processed for 50+ catering businesses. We don't just build platforms — we run one.",
  },
  {
    num: '02',
    title: 'Web Development',
    description:
      'Custom websites and web applications built with Next.js, React, and TypeScript. Blazing-fast performance, SEO-optimized, and designed to convert.',
    tags: ['Next.js', 'React', 'TypeScript'],
    href: '/services/web-development',
    card: WebDevCard,
    prices: webTiers.map((t) => ({ name: t.name, price: t.price })),
  },
  {
    num: '03',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android. Smooth, responsive interfaces that users love to interact with.',
    tags: ['React Native', 'iOS', 'Android'],
    href: '/services/mobile-development',
    card: MobileAppCard,
    prices: mobileTiers.map((t) => ({ name: t.name, price: t.price })),
    careRequired: true,
  },
  {
    num: '04',
    title: 'E-Commerce Solutions',
    description:
      'End-to-end online stores and marketplaces. From product catalogs to checkout flows, we build commerce experiences that drive revenue.',
    tags: ['Shopify', 'WooCommerce', 'Stripe'],
    href: '/services/ecommerce',
    card: ECommerceCard,
    prices: ECOM_TIERS.map((t) => ({ name: t.name, price: t.price })),
    note: 'Priced by catalogue size, not page count.',
  },
]

const ongoingServices: ServiceEntry[] = [
  {
    num: '05',
    title: 'Social Media Marketing',
    description:
      'Data-driven social media strategies that grow your audience and engagement. Content creation, ad campaigns, and performance analytics.',
    tags: ['Instagram', 'Meta Ads', 'Analytics'],
    href: '/services/social-media',
    card: SocialMediaCard,
    prices: RETAINERS.map((t) => ({ name: t.name, price: t.price, suffix: '/mo' })),
  },
  {
    num: '06',
    title: 'Digital Strategy',
    description:
      'Comprehensive digital roadmaps that align technology with business goals. Market research, competitive analysis, and growth frameworks.',
    tags: ['Consulting', 'Analytics', 'Growth'],
    href: '/services/digital-strategy',
    card: StrategyCard,
    prices: [
      { name: STRATEGY.sprint.name, price: STRATEGY.sprint.price },
      { name: STRATEGY.advisory.name, price: STRATEGY.advisory.price, suffix: '/mo' },
    ],
  },
]

/* ─── Compact price row — mono, coral numbers ─────────────── */
function PriceList({ items }: { items: PriceItem[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4 font-mono text-sm" data-testid="service-price-row">
      {items.map((item) => (
        <span key={item.name} className="inline-flex items-baseline gap-1.5">
          <span className="text-foreground-muted/60">{item.name}</span>
          <span className="text-coral-500 font-semibold">
            <Price amount={item.price} suffix={item.suffix} />
          </span>
        </span>
      ))}
    </div>
  )
}

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    duration: 'Week 1',
    description: (
      <>
        Discovery is where most agencies guess. We don&apos;t — for larger projects it&apos;s a
        paid Blueprint (<Price amount={BLUEPRINT.price} />), credited back in full when you
        build with us.
      </>
    ),
    highlight: 'Research & Strategy',
  },
  {
    number: '02',
    title: 'Strategy',
    duration: 'Week 1',
    description: 'We create a detailed roadmap for your project. From technology choices to timeline milestones, every decision is deliberate and purposeful.',
    highlight: 'Planning & Roadmap',
  },
  {
    number: '03',
    title: 'Design',
    duration: 'Weeks 2–3',
    description: 'From wireframes to high-fidelity prototypes, we craft pixel-perfect interfaces that balance beauty with usability and align with your brand identity.',
    highlight: 'UI/UX & Prototyping',
  },
  {
    number: '04',
    title: 'Development',
    duration: 'Weeks 3–5',
    description: 'Clean, scalable code built with Next.js, React, and modern technologies. Every feature is tested, optimized, and ready for production at scale.',
    highlight: 'Engineering & QA',
  },
  {
    number: '05',
    title: 'Launch',
    duration: 'Week 6',
    description: (
      <>
        Launch day is just the beginning. We provide ongoing support, analytics insights, and
        iterative improvements to keep your product ahead of the curve — and Growth and Platform
        builds include the first month of Momentum care (
        <Price amount={momentum.price} suffix="/mo" />) — most clients keep it.
      </>
    ),
    highlight: 'Deploy & Growth',
  },
]

/* Cut from 16 to 8: React, Next.js, TypeScript, Node.js, PostgreSQL,
   React Native, Tailwind CSS, Vercel. Sixteen logos said "we'll use
   whatever" — eight says "we're deliberate". */
const technologies = [
  { name: 'React', abbr: 'Re' },
  { name: 'Next.js', abbr: 'Nx' },
  { name: 'TypeScript', abbr: 'TS' },
  { name: 'Node.js', abbr: 'No' },
  { name: 'PostgreSQL', abbr: 'Pg' },
  { name: 'React Native', abbr: 'RN' },
  { name: 'Tailwind CSS', abbr: 'TW' },
  { name: 'Vercel', abbr: 'Vc' },
]

/* ─── Component ────────────────────────────────────────── */
export function ServicesClient() {
  return (
    <>
      <SubpageHero
        id="services-hero-heading"
        tag="// Services & Expertise"
        headline={
          <>
            <HeadlineWord thin>WHAT WE</HeadlineWord>
            <HeadlineWord coral>BUILD</HeadlineWord>
          </>
        }
        subtitle="Six things we build, and what each one costs. No quote calls — the prices are on this page."
      />

      <ServicesShowcase />
      <ProcessSection />
      <TechSection />

      <SubpageCTA
        headline="READY TO"
        highlightedText="GET STARTED"
        subtitle="Let's discuss how we can help you achieve your digital goals and transform your business."
      />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   Service Showcase — full-width magazine spreads (Platform,
   Web, Mobile, E-Commerce), then a demoted "Ongoing" strip for
   Social Media Marketing and Digital Strategy.
   ═══════════════════════════════════════════════════════════ */
function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const rmRef = useRef(false)

  useEffect(() => {
    rmRef.current = shouldSkipAnimations()
    setMounted(true)
  }, [])

  useGSAP(
    () => {
      if (!mounted) return
      const section = sectionRef.current
      if (!section) return

      if (rmRef.current) {
        gsap.set('[data-svc-spread]', { opacity: 1, x: 0, y: 0 })
        gsap.set('[data-svc-card]', { opacity: 1, x: 0, y: 0 })
        gsap.set('[data-svc-ongoing-item]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        await registerScrollTrigger()

        section.querySelectorAll('[data-svc-row]').forEach((row) => {
          const isEven = row.getAttribute('data-svc-even') === 'true'
          const textEl = row.querySelector('[data-svc-spread]')
          const cardEl = row.querySelector('[data-svc-card]')

          if (textEl) {
            gsap.fromTo(
              textEl,
              { opacity: 0, x: isEven ? 60 : -60 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: row, start: 'top 75%' },
              }
            )
          }
          if (cardEl) {
            gsap.fromTo(
              cardEl,
              { opacity: 0, x: isEven ? -60 : 60 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.1,
                scrollTrigger: { trigger: row, start: 'top 75%' },
              }
            )
          }
        })

        // Mobile stagger entrance
        gsap.fromTo(
          '[data-svc-mobile-item]',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%' },
          }
        )

        // Ongoing strip stagger entrance
        gsap.fromTo(
          '[data-svc-ongoing-item]',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: '[data-svc-ongoing]', start: 'top 85%' },
          }
        )
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-showcase-heading"
      className="relative bg-background overflow-clip"
    >
      <h2 id="services-showcase-heading" className="sr-only">Our Services</h2>

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full blur-[180px]"
          style={{ width: 700, height: 700, top: '10%', left: '30%', background: 'rgba(255,107,53,0.04)' }}
        />
        <div
          className="absolute rounded-full blur-[140px]"
          style={{ width: 500, height: 500, bottom: '5%', right: '20%', background: 'rgba(255,107,53,0.025)' }}
        />
      </div>

      {/* ═══ DESKTOP LAYOUT (lg+) ═══ */}
      <div className="hidden lg:block relative z-10 py-24">
        {primaryServices.map((service, i) => {
          const Card = service.card
          const isEven = i % 2 === 1
          return (
            <div key={service.num} data-testid="service-block" data-service-title={service.title}>
              <div
                data-svc-row
                data-svc-even={String(isEven)}
                className={cn(
                  'container mx-auto px-6 lg:px-16 xl:px-20 flex items-center gap-12 xl:gap-20 py-20',
                  isEven && 'flex-row-reverse'
                )}
              >
                {/* Text side */}
                <div data-svc-spread className="flex-1 min-w-0">
                  <span
                    className="block font-mono leading-none mb-6 select-none"
                    style={{
                      fontSize: 'clamp(3rem, 5vw, 5rem)',
                      fontWeight: 200,
                      WebkitTextStroke: '1px var(--color-coral-500)',
                      WebkitTextFillColor: 'transparent',
                    }}
                    aria-hidden="true"
                  >
                    {service.num}
                  </span>
                  <h3
                    className="font-bold tracking-tight mb-4"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mb-6" style={{ maxWidth: '28rem' }}>
                    {service.description}
                  </p>

                  <PriceList items={service.prices} />

                  {service.careRequired && (
                    <p className="flex items-center gap-2 text-sm text-foreground-muted mb-6" style={{ maxWidth: '28rem' }}>
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
                        — an app that stops being updated eventually stops being downloadable.
                      </span>
                    </p>
                  )}

                  {service.note && (
                    <p className="text-sm text-foreground-muted/70 italic mb-6">{service.note}</p>
                  )}

                  {service.proof && (
                    <blockquote
                      className="text-sm text-foreground-muted border-l-2 border-coral-500/40 pl-4 mb-6"
                      style={{ maxWidth: '28rem' }}
                    >
                      {service.proof}
                    </blockquote>
                  )}

                  <div className="flex gap-2 flex-wrap mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full font-mono text-foreground-muted/70 border border-surface-border"
                        style={{ background: 'var(--color-surface-overlay)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-sm font-medium"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Visual side */}
                <div data-svc-card className="flex-1 min-w-0 flex items-center justify-center">
                  <div style={{ maxWidth: 340, width: '100%' }}>
                    <Card />
                  </div>
                </div>
              </div>

              {/* Separator line */}
              <div className="container mx-auto px-6 lg:px-16 xl:px-20">
                <div
                  className="h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.15) 30%, rgba(255,107,53,0.15) 70%, transparent)',
                  }}
                />
              </div>
            </div>
          )
        })}

        <OngoingStrip />
      </div>

      {/* ═══ MOBILE / TABLET LAYOUT (<lg) ═══ */}
      <div className="lg:hidden relative z-10 py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          {primaryServices.map((service) => {
            const Card = service.card
            return (
              <div key={service.num} data-svc-mobile-item data-testid="service-block" data-service-title={service.title}>
                <div className="flex justify-center mb-6">
                  <div style={{ maxWidth: 280, width: '100%' }}>
                    <Card />
                  </div>
                </div>
                <span
                  className="block font-mono leading-none mb-3 select-none"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 200,
                    WebkitTextStroke: '1px var(--color-coral-500)',
                    WebkitTextFillColor: 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {service.num}
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground-muted text-sm md:text-base leading-relaxed mb-4">
                  {service.description}
                </p>

                <PriceList items={service.prices} />

                {service.careRequired && (
                  <p className="flex items-center gap-2 text-sm text-foreground-muted mb-4">
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
                      </span>
                    </span>
                  </p>
                )}

                {service.note && (
                  <p className="text-sm text-foreground-muted/70 italic mb-4">{service.note}</p>
                )}

                {service.proof && (
                  <blockquote className="text-sm text-foreground-muted border-l-2 border-coral-500/40 pl-4 mb-4">
                    {service.proof}
                  </blockquote>
                )}

                <div className="flex gap-2 flex-wrap mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-mono text-foreground-muted/70 border border-surface-border"
                      style={{ background: 'var(--color-surface-overlay)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={service.href}
                  className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-sm font-medium"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                {/* Separator */}
                <div
                  className="mt-12 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.12) 30%, rgba(255,107,53,0.12) 70%, transparent)',
                  }}
                />
              </div>
            )
          })}

          <OngoingStrip />
        </div>
      </div>
    </section>
  )
}

/* ─── Ongoing strip — Social Media + Digital Strategy, demoted ────── */
function OngoingStrip() {
  return (
    <div data-svc-ongoing className="container mx-auto px-6 lg:px-16 xl:px-20 pt-16 pb-4">
      <p className="text-xs text-foreground-muted/60 tracking-[0.25em] uppercase mb-6 font-mono">
        // Ongoing
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {ongoingServices.map((service) => (
          <div
            key={service.num}
            data-svc-ongoing-item
            data-testid="service-block"
            data-service-title={service.title}
            className="rounded-xl border border-surface-border p-5 md:p-6"
            style={{ background: 'var(--color-surface-overlay)' }}
          >
            <h4 className="text-base md:text-lg font-semibold mb-2">{service.title}</h4>
            <p className="text-sm text-foreground-muted mb-4">{service.description}</p>
            <PriceList items={service.prices} />
            <Link
              href={service.href}
              className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-xs font-medium"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Process Section — horizontal scroll (like WhyChooseUs)
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const rmRef = useRef(false)

  useEffect(() => {
    rmRef.current = shouldSkipAnimations()
    setMounted(true)
  }, [])

  useGSAP(
    () => {
      if (!mounted) return

      if (rmRef.current) {
        gsap.set('[data-proc-step]', { opacity: 1, y: 0 })
        gsap.set('[data-proc-header]', { opacity: 1, y: 0 })
        gsap.set('[data-proc-context]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger()
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        // Header entrance
        gsap.fromTo(
          '[data-proc-header]',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' },
          }
        )

        // Context panel entrance
        gsap.fromTo(
          '[data-proc-context]',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%' },
          }
        )

        const mm = gsap.matchMedia()

        // Desktop: horizontal scroll with sticky left context
        mm.add('(min-width: 768px)', () => {
          const cards = track.querySelectorAll('[data-proc-step]')
          const totalWidth = track.scrollWidth - window.innerWidth * 0.65

          const scrollTween = gsap.to(track, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${totalWidth * 1.1}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const spacer = (scrollTween.scrollTrigger as any)?.spacer as HTMLElement | undefined
          if (spacer) {
            spacer.style.backgroundColor = getComputedStyle(section).backgroundColor
          }

          // Per-card entrance + step counter update
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { opacity: 0.3, scale: 0.92 },
              {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: 'left 80%',
                  end: 'left 40%',
                  scrub: 1,
                },
                ease: 'power2.out',
              }
            )

            ScrollTrigger.create({
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 60%',
              end: 'left 30%',
              onEnter: () => setActiveStep(i),
              onEnterBack: () => setActiveStep(i),
            })
          })

          // Progress bar
          const progressEl = section.querySelector('[data-proc-progress]') as HTMLElement
          if (progressEl) {
            gsap.fromTo(
              progressEl,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: `+=${totalWidth * 1.1}`,
                  scrub: 0.8,
                },
              }
            )
          }
        })

        // Mobile: stagger entrance
        mm.add('(max-width: 767px)', () => {
          gsap.fromTo(
            '[data-proc-mobile-step]',
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 70%' },
            }
          )
        })

        requestAnimationFrame(() => {
          ScrollTrigger.sort()
          ScrollTrigger.refresh()
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section
      ref={sectionRef}
      className="relative bg-background-secondary"
      style={{ zIndex: 5 }}
      aria-labelledby="process-heading"
    >
      {/* Background orbs */}
      <div className="absolute top-0 right-0 rounded-full blur-[150px]" style={{ width: 600, height: 600, background: 'rgba(255,107,53,0.04)' }} />
      <div className="absolute bottom-0 left-0 rounded-full blur-[120px]" style={{ width: 500, height: 500, background: 'rgba(255,107,53,0.03)' }} />

      {/* Header */}
      <div className="pt-32 md:pt-44 pb-12 md:pb-16 container mx-auto px-6 relative z-10">
        <div data-proc-header>
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            // How We Work
          </span>
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>Our </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>Process</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl">
            A proven methodology refined over years to deliver exceptional results, every time.
          </p>
        </div>
      </div>

      {/* ═══ DESKTOP: horizontal scroll ═══ */}
      <div className="hidden md:block pb-16">
        <div className="flex">
          {/* Sticky left context panel */}
          <div className="w-[35%] shrink-0 pl-6 lg:pl-[calc((100vw-1280px)/2+1.5rem)] relative z-20">
            <div data-proc-context className="sticky top-[40vh] pb-20">
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-3 transition-all duration-300">
                {processSteps[activeStep].title}
              </h3>

              {/* Step indicator dots */}
              <div className="flex items-center gap-3 mb-8">
                {processSteps.map((step, i) => (
                  <div
                    key={step.number}
                    className={cn(
                      'flex items-center gap-1.5 text-xs font-mono transition-all duration-300',
                      i === activeStep ? 'text-coral-500' : 'text-foreground-muted/40'
                    )}
                  >
                    {i === activeStep && (
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                    )}
                    {step.number}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-[200px] h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  data-proc-progress
                  className="h-full rounded-full origin-left"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-coral-500), var(--color-coral-400))',
                    transform: 'scaleX(0)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scrolling card track */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-8 pr-[20vw] relative z-10"
              style={{ width: 'fit-content' }}
            >
              {processSteps.map((step) => (
                <div key={step.number} data-proc-step className="flex-shrink-0" style={{ width: 480 }}>
                  <div
                    className={cn(
                      'relative h-full p-8 md:p-10 rounded-2xl overflow-hidden',
                      'border border-surface-border',
                      'hover:border-coral-500/30',
                      'transition-all duration-500',
                      'group'
                    )}
                    style={{
                      background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)',
                    }}
                  >
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(90deg, var(--color-coral-500) 0%, var(--color-coral-400) 50%, transparent 100%)',
                      }}
                    />

                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="block font-mono leading-none select-none"
                        style={{
                          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                          fontWeight: 200,
                          WebkitTextStroke: '1px var(--color-coral-500)',
                          WebkitTextFillColor: 'transparent',
                        }}
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <span
                        data-testid="process-duration"
                        className="text-xs font-mono text-foreground-muted/60 px-2.5 py-1 rounded-full border border-surface-border mt-2"
                      >
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-foreground-muted text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                      {step.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-coral-500/10 text-coral-500 border border-coral-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0" aria-hidden="true" />
                      {step.highlight}
                    </span>

                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4 w-8 h-[1px] bg-coral-500/30" />
                      <div className="absolute top-4 right-4 w-[1px] h-8 bg-coral-500/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE: vertical stacked ═══ */}
      <div className="md:hidden pb-24 px-6">
        <div className="space-y-6">
          {processSteps.map((step) => (
            <div
              key={step.number}
              data-proc-mobile-step
              className={cn(
                'relative p-6 rounded-2xl overflow-hidden',
                'border border-surface-border'
              )}
              style={{
                background: 'linear-gradient(135deg, var(--color-surface-overlay) 0%, transparent 100%)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, var(--color-coral-500) 0%, transparent 60%)',
                  opacity: 0.4,
                }}
              />
              <div className="flex items-start justify-between mb-4">
                <span
                  className="block font-mono leading-none select-none"
                  style={{
                    fontSize: '3rem',
                    fontWeight: 200,
                    WebkitTextStroke: '1px var(--color-coral-500)',
                    WebkitTextFillColor: 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <span
                  data-testid="process-duration"
                  className="text-xs font-mono text-foreground-muted/60 px-2.5 py-1 rounded-full border border-surface-border mt-2"
                >
                  {step.duration}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">{step.title}</h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-4">{step.description}</p>
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-coral-500/10 text-coral-500 border border-coral-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0" aria-hidden="true" />
                {step.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   Tech Section — infinite CSS marquee
   ═══════════════════════════════════════════════════════════ */
function TechSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const rmRef = useRef(false)

  useEffect(() => {
    rmRef.current = shouldSkipAnimations()
    setMounted(true)
  }, [])

  useGSAP(
    () => {
      if (!mounted) return
      const section = sectionRef.current
      if (!section) return

      if (rmRef.current) {
        gsap.set('[data-tech-head]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        await registerScrollTrigger()
        gsap.fromTo(
          section.querySelectorAll('[data-tech-head]'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } }
        )
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  // Split technologies into two rows
  const half = Math.ceil(technologies.length / 2)
  const row1 = technologies.slice(0, half)
  const row2 = technologies.slice(half)

  return (
    <section ref={sectionRef} aria-labelledby="tech-heading" className="py-24 md:py-32 bg-background relative overflow-clip">
      <div className="relative z-10">
        <div className="text-center mb-16 container mx-auto px-6">
          <p className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 font-mono" data-tech-head>
            // Tech Stack
          </p>
          <h2 id="tech-heading" className="text-3xl md:text-4xl lg:text-5xl tracking-tight" data-tech-head>
            <span style={{ fontWeight: 200 }}>Technologies We </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>Use</span>
          </h2>
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto" data-tech-head data-testid="tech-justification">
            We build on Next.js because it&apos;s the fastest route to a site that loads under
            two seconds and ranks. That&apos;s not a preference — it&apos;s why your Core Web
            Vitals come back green.
          </p>
        </div>

        {/* Marquee rows */}
        <div className="space-y-6">
          <MarqueeRow items={row1} direction="left" duration={40} />
          <MarqueeRow items={row2} direction="right" duration={45} />
        </div>
      </div>
    </section>
  )
}

/* ─── Marquee Row ─────────────────────────────────────── */
function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: { name: string; abbr: string }[]
  direction: 'left' | 'right'
  duration: number
}) {
  // Duplicate items enough times for seamless loop
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div
      className="group relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className="marquee-track flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: 'running',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused' }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running' }}
      >
        {repeated.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-surface-border transition-all duration-300 hover:border-coral-500/30 hover:shadow-[0_0_20px_rgba(255,107,53,0.08)]"
            style={{ background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)' }}
          >
            <div
              className="w-10 h-10 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-sm font-bold text-coral-500">{tech.abbr}</span>
            </div>
            <span className="text-sm font-medium text-foreground-muted whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-play-state: paused !important; }
        }
      ` }} />
    </div>
  )
}
