'use client'

import { useRef, useEffect, useState, type ComponentType, type ReactNode } from 'react'
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
import { useCurrency } from '@/components/providers/currency-provider'
import { formatPrice } from '@/lib/format-price'
import {
  TIERS,
  APP_TIERS,
  APP_CARE,
  ECOM_TIERS,
  RETAINERS,
  STRATEGY,
  BLUEPRINT,
  CARE_PLANS,
  MIN_AD_SPEND,
  minAdSpendNote,
  type PriceSet,
} from '@/lib/pricing'

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
  /** One-line scope, shown in the middle column once the panel is wide enough. */
  scope?: string
  /** App Care only — the row is mandatory, not an upsell. */
  required?: boolean
  /** Straight from `Tier.badge` — only the default tier carries one. */
  badge?: string
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
  /** Small qualifier inside the rate card's footer (e.g. "priced by catalogue size"). */
  note?: string
  /** Mobile only — the sentence that explains why App Care is mandatory. */
  careRequired?: boolean
  /** Social only — the ad-spend disclosure needs the visitor's own currency. */
  adSpend?: boolean
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
      "Scalable SaaS platforms and internal systems. We don't just build these — we run one. CaterFlow has processed 12,000 orders for 50+ catering businesses, which means we've already made the expensive mistakes at our own cost.",
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    href: '/services/platform-development',
    card: PlatformCard,
    prices: platformTiers.map((t) => ({ name: t.name, price: t.price, scope: t.timeline })),
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
    prices: webTiers.map((t) => ({ name: t.name, price: t.price, scope: t.timeline, badge: t.badge })),
  },
  {
    num: '03',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android. Smooth, responsive interfaces that users love to interact with.',
    tags: ['React Native', 'iOS', 'Android'],
    href: '/services/mobile-development',
    card: MobileAppCard,
    prices: [
      ...mobileTiers.map((t) => ({ name: t.name, price: t.price, scope: t.timeline })),
      {
        name: appCare.name,
        price: appCare.price,
        suffix: '/mo',
        scope: 'Ongoing',
        required: true,
      },
    ],
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
    prices: ECOM_TIERS.map((t) => ({ name: t.name, price: t.price, scope: t.scope[0] })),
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
    prices: RETAINERS.map((t) => ({
      name: t.name,
      price: t.price,
      suffix: '/mo',
      scope: t.scope[0],
    })),
    adSpend: true,
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
      { name: STRATEGY.sprint.name, price: STRATEGY.sprint.price, scope: STRATEGY.sprint.timeline },
      {
        name: STRATEGY.advisory.name,
        price: STRATEGY.advisory.price,
        suffix: '/mo',
        scope: `${STRATEGY.advisory.minimumMonths}-month minimum`,
      },
    ],
  },
]

/* ─── Rate card ────────────────────────────────────────────
   The visual anchor of every service block: a glass panel of hairline-divided
   rows — product name, one-line scope, price. Prices are rendered by <Price>
   so they are in the visitor's own currency and present in the server HTML. */
function RateCard({
  items,
  footnote,
  header = true,
  className,
}: {
  items: PriceItem[]
  footnote?: ReactNode
  header?: boolean
  className?: string
}) {
  return (
    <div className={cn('svc-rate-card', className)}>
      {header && (
        <div className="svc-rate-head">
          <span className="svc-rate-eyebrow">Rates</span>
          <Link href="/pricing" className="svc-rate-link group">
            See full pricing
            <ArrowRight
              className="svc-arrow w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}

      <div data-testid="service-price-row">
        {items.map((item) => (
          <div key={item.name} className="svc-rate-row">
            <span className="svc-rate-name">
              {item.name}
              {item.required && (
                <span data-testid="app-care-required" className="svc-rate-req">
                  Required
                </span>
              )}
              {item.badge && <span className="svc-rate-badge">{item.badge}</span>}
            </span>
            <span className="svc-rate-scope">{item.scope ?? ''}</span>
            <span className="svc-rate-price">
              <Price amount={item.price} suffix={item.suffix} />
            </span>
          </div>
        ))}
      </div>

      {footnote && <div className="svc-rate-foot">{footnote}</div>}
    </div>
  )
}

/* Footer lines that belong to the rate card rather than the prose: the App
   Care justification, the catalogue-size qualifier, the ad-spend disclosure. */
function RateFootnote({ service }: { service: ServiceEntry }) {
  const { currency } = useCurrency()
  const lines: ReactNode[] = []

  if (service.careRequired) {
    lines.push(
      <p key="care">An app that stops being updated eventually stops being downloadable.</p>
    )
  }
  if (service.note) {
    lines.push(
      <p key="note" className="italic">
        {service.note}
      </p>
    )
  }
  if (service.adSpend) {
    lines.push(
      <p key="ads">
        {RETAINERS[0].adSpendNote} {minAdSpendNote(formatPrice(MIN_AD_SPEND[currency], currency))}
      </p>
    )
  }

  if (lines.length === 0) return null
  return <>{lines}</>
}

function hasFootnote(service: ServiceEntry): boolean {
  return Boolean(service.careRequired || service.note || service.adSpend)
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
      <div className="hidden lg:block relative z-10 py-14">
        {primaryServices.map((service, i) => {
          const Card = service.card
          const isEven = i % 2 === 1
          return (
            <div key={service.num} data-testid="service-block" data-service-title={service.title}>
              <div
                data-svc-row
                data-svc-even={String(isEven)}
                className={cn(
                  'container mx-auto px-6 lg:px-16 xl:px-20 flex items-center gap-10 xl:gap-16 py-12',
                  isEven && 'flex-row-reverse'
                )}
              >
                {/* Text side */}
                <div data-svc-spread className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span
                      className="block font-mono leading-none select-none"
                      style={{
                        fontSize: 'clamp(2rem, 3vw, 3rem)',
                        fontWeight: 200,
                        WebkitTextStroke: '1px var(--color-coral-500)',
                        WebkitTextFillColor: 'transparent',
                      }}
                      aria-hidden="true"
                    >
                      {service.num}
                    </span>
                    <h3
                      className="font-bold tracking-tight"
                      style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)' }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-foreground-muted text-sm leading-relaxed mb-5" style={{ maxWidth: '32rem' }}>
                    {service.description}
                  </p>

                  <RateCard
                    items={service.prices}
                    footnote={hasFootnote(service) ? <RateFootnote service={service} /> : undefined}
                    className="mb-5"
                  />

                  {service.proof && (
                    <blockquote
                      className="text-sm text-foreground-muted border-l-2 border-coral-500/40 pl-4 mb-5"
                      style={{ maxWidth: '32rem' }}
                    >
                      {service.proof}
                    </blockquote>
                  )}

                  <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full font-mono text-foreground-muted/70 border border-surface-border"
                        style={{ background: 'var(--color-surface-overlay)' }}
                      >
                        {tag}
                      </span>
                    ))}
                    <Link
                      href={service.href}
                      className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-sm font-medium ml-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-500 rounded"
                    >
                      Learn More
                      <ArrowRight className="svc-arrow w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
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
      <div className="lg:hidden relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 space-y-6">
          {primaryServices.map((service) => {
            const Card = service.card
            return (
              <div key={service.num} data-svc-mobile-item data-testid="service-block" data-service-title={service.title}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="block font-mono leading-none select-none"
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 200,
                      WebkitTextStroke: '1px var(--color-coral-500)',
                      WebkitTextFillColor: 'transparent',
                    }}
                    aria-hidden="true"
                  >
                    {service.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="flex justify-center my-3">
                  <div style={{ maxWidth: 220, width: '100%' }}>
                    <Card />
                  </div>
                </div>

                <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <RateCard
                  items={service.prices}
                  footnote={hasFootnote(service) ? <RateFootnote service={service} /> : undefined}
                  className="mb-4"
                />

                {service.proof && (
                  <blockquote className="text-sm text-foreground-muted border-l-2 border-coral-500/40 pl-4 mb-4">
                    {service.proof}
                  </blockquote>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full font-mono text-foreground-muted/70 border border-surface-border"
                      style={{ background: 'var(--color-surface-overlay)' }}
                    >
                      {tag}
                    </span>
                  ))}
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-sm font-medium ml-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-500 rounded"
                  >
                    Learn More
                    <ArrowRight className="svc-arrow w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Separator */}
                <div
                  className="mt-6 h-px"
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
    <div data-svc-ongoing className="container mx-auto px-6 lg:px-16 xl:px-20 pt-12 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-5">
        <p className="text-xs text-foreground-muted/60 tracking-[0.25em] uppercase font-mono whitespace-nowrap">
          // Ongoing
        </p>
        <span className="text-xs text-foreground-muted/50">
          Billed monthly, cancel with notice — not a build.
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {ongoingServices.map((service) => (
          <div
            key={service.num}
            data-svc-ongoing-item
            data-testid="service-block"
            data-service-title={service.title}
            className="svc-ongoing-card"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="text-base font-semibold">{service.title}</h4>
              <span className="svc-tag shrink-0">Ongoing</span>
            </div>
            <p className="text-[13px] leading-relaxed text-foreground-muted/80 mb-3.5">
              {service.description}
            </p>
            <RateCard
              items={service.prices}
              header={false}
              footnote={hasFootnote(service) ? <RateFootnote service={service} /> : undefined}
              className="mb-3.5"
            />
            <Link
              href={service.href}
              className="group mt-auto inline-flex items-center gap-2 self-start text-coral-500 hover:text-coral-400 transition-colors text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-500 rounded"
            >
              Learn More
              <ArrowRight className="svc-arrow w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
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
/* The rail is the goal gradient: five nodes on a track that fills as the
   pinned panels scrub past. Node states are driven by React (`activeStep`),
   the fill by the same ScrollTrigger that moves the track, so the two never
   fight over the same inline transform. */
function ProcessRail({
  activeStep,
  allDone,
  fillAttr,
}: {
  activeStep: number
  allDone: boolean
  fillAttr: 'data-proc-progress' | 'data-proc-progress-m'
}) {
  return (
    <div className="svc-rail">
      <div className="svc-rail-line" aria-hidden="true" />
      <div className="svc-rail-fill" aria-hidden="true" {...{ [fillAttr]: '' }} />
      <ol className="svc-rail-steps">
        {processSteps.map((step, i) => {
          const done = allDone || i < activeStep
          const active = !allDone && i === activeStep
          return (
            <li
              key={step.number}
              className="svc-rail-step"
              data-state={done ? 'done' : active ? 'active' : 'upcoming'}
              aria-current={active ? 'step' : undefined}
            >
              <span className="svc-node" aria-hidden="true" />
              <span className="svc-rail-num">{step.number}</span>
              <span className="svc-rail-title">{step.title}</span>
              <span className="svc-rail-dur">{step.duration}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [railStatic, setRailStatic] = useState(false)
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
        // No scrub to fill the rail with — show the finished state instead.
        gsap.set('[data-proc-progress], [data-proc-progress-m]', { scaleX: 1 })
        setRailStatic(true)
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
          // The track now spans the full width, so it should come to rest with
          // its trailing padding flush to the right edge — not 35% short of it.
          const totalWidth = track.scrollWidth - window.innerWidth

          const scrollTween = gsap.to(track, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${totalWidth}`,
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
                  end: `+=${totalWidth}`,
                  scrub: 0.8,
                },
              }
            )
          }
        })

        // Mobile: stagger entrance, plus the rail tracking the stacked panels
        mm.add('(max-width: 767px)', () => {
          const mobileSteps = section.querySelectorAll('[data-proc-mobile-step]')

          gsap.fromTo(
            mobileSteps,
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

          const mobileList = section.querySelector('[data-proc-mobile-list]')
          const mobileFill = section.querySelector('[data-proc-progress-m]') as HTMLElement | null
          if (mobileList && mobileFill) {
            gsap.fromTo(
              mobileFill,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: mobileList,
                  start: 'top 70%',
                  end: 'bottom 70%',
                  scrub: 0.6,
                },
              }
            )
          }

          mobileSteps.forEach((card, i) => {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 65%',
              end: 'bottom 45%',
              onEnter: () => setActiveStep(i),
              onEnterBack: () => setActiveStep(i),
            })
          })
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
      <div className="pt-20 md:pt-28 pb-8 md:pb-10 container mx-auto px-6 relative z-10">
        <div data-proc-header>
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-3 block font-mono">
            // How We Work
          </span>
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>Our </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>Process</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-foreground-muted max-w-2xl">
            A proven methodology refined over years to deliver exceptional results, every time.
          </p>
        </div>
      </div>

      {/* ═══ DESKTOP: progress rail + horizontal scroll ═══ */}
      <div className="hidden md:block pb-12">
        <div data-proc-context className="container mx-auto px-6 relative z-20 mb-10">
          <ProcessRail activeStep={activeStep} allDone={railStatic} fillAttr="data-proc-progress" />
        </div>

        {/* Scrolling card track. With animations skipped there is no pinned
            scrub to move it, so it becomes a plain horizontally scrollable
            region — otherwise steps 04 and 05 would be unreachable. */}
        <div
          className={cn(railStatic ? 'overflow-x-auto pb-3' : 'overflow-hidden')}
          {...(railStatic
            ? { role: 'region', 'aria-label': 'Process steps', tabIndex: 0 }
            : {})}
        >
          <div
            ref={trackRef}
            className="flex gap-6 pr-[12vw] relative z-10"
            style={{
              width: 'fit-content',
              paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
            }}
          >
            {processSteps.map((step, i) => (
              <div key={step.number} data-proc-step className="flex-shrink-0" style={{ width: 420 }}>
                <div
                  className={cn(
                    'relative h-full flex flex-col p-7 rounded-2xl overflow-hidden',
                    'border border-surface-border',
                    'hover:border-coral-500/30',
                    'transition-all duration-500',
                    'group'
                  )}
                  style={{
                    minHeight: 320,
                    background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)',
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-coral-500) 0%, var(--color-coral-400) 50%, transparent 100%)',
                      opacity: i === activeStep ? 1 : 0.15,
                    }}
                  />

                  {/* Consistent header row: step number, title, duration chip */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="font-mono leading-none select-none"
                      style={{
                        fontSize: '2.25rem',
                        fontWeight: 200,
                        WebkitTextStroke: '1px var(--color-coral-500)',
                        WebkitTextFillColor: 'transparent',
                      }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h3>
                    <span
                      data-testid="process-duration"
                      className="ml-auto text-xs font-mono text-foreground-muted/60 px-2.5 py-1 rounded-full border border-surface-border shrink-0"
                    >
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-foreground-muted text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  <span className="mt-auto self-start inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-coral-500/10 text-coral-500 border border-coral-500/20">
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

      {/* ═══ MOBILE: rail + vertical stack ═══ */}
      <div className="md:hidden pb-16 px-6">
        <div className="mb-6">
          <ProcessRail activeStep={activeStep} allDone={railStatic} fillAttr="data-proc-progress-m" />
        </div>

        <div className="space-y-4" data-proc-mobile-list>
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              data-proc-mobile-step
              className={cn(
                'relative p-5 rounded-2xl overflow-hidden',
                'border transition-colors duration-300',
                i === activeStep ? 'border-coral-500/30' : 'border-surface-border'
              )}
              style={{
                background: 'linear-gradient(135deg, var(--color-surface-overlay) 0%, transparent 100%)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, var(--color-coral-500) 0%, transparent 60%)',
                  opacity: i === activeStep ? 0.9 : 0.3,
                }}
              />
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono leading-none select-none"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 200,
                    WebkitTextStroke: '1px var(--color-coral-500)',
                    WebkitTextFillColor: 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <span
                  data-testid="process-duration"
                  className="ml-auto text-[11px] font-mono text-foreground-muted/60 px-2 py-0.5 rounded-full border border-surface-border shrink-0"
                >
                  {step.duration}
                </span>
              </div>
              <p className="text-foreground-muted text-sm leading-relaxed mb-3">{step.description}</p>
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
    <section ref={sectionRef} aria-labelledby="tech-heading" className="py-16 md:py-24 bg-background relative overflow-clip">
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
