'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { VISUAL_CARDS } from '@/components/ui/service-visual-cards'
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/* ─── Data ─────────────────────────────────────────────── */
const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with Next.js, React, and TypeScript. Blazing-fast performance, SEO-optimized, and designed to convert.',
    tags: ['Next.js', 'React', 'TypeScript'],
    href: '/services/web-development',
    num: '01',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Smooth, responsive interfaces that users love to interact with.',
    tags: ['React Native', 'iOS', 'Android'],
    href: '/services/mobile-development',
    num: '02',
  },
  {
    title: 'Platform Development',
    description: 'Scalable SaaS platforms and enterprise systems built on cloud infrastructure. Reliable, secure, and engineered for growth.',
    tags: ['AWS', 'Node.js', 'PostgreSQL'],
    href: '/services/platform-development',
    num: '03',
  },
  {
    title: 'E-Commerce Solutions',
    description: 'End-to-end online stores and marketplaces. From product catalogs to checkout flows, we build commerce experiences that drive revenue.',
    tags: ['Shopify', 'WooCommerce', 'Stripe'],
    href: '/services/ecommerce',
    num: '04',
  },
  {
    title: 'Social Media Marketing',
    description: 'Data-driven social media strategies that grow your audience and engagement. Content creation, ad campaigns, and performance analytics.',
    tags: ['Instagram', 'Meta Ads', 'Analytics'],
    href: '/services/social-media',
    num: '05',
  },
  {
    title: 'Digital Strategy',
    description: 'Comprehensive digital roadmaps that align technology with business goals. Market research, competitive analysis, and growth frameworks.',
    tags: ['Consulting', 'Analytics', 'Growth'],
    href: '/services/digital-strategy',
    num: '06',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business, audience, and goals. Through collaborative workshops and research, we uncover the insights that shape exceptional solutions.',
    highlight: 'Research & Strategy',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We create a detailed roadmap for your project. From technology choices to timeline milestones, every decision is deliberate and purposeful.',
    highlight: 'Planning & Roadmap',
  },
  {
    number: '03',
    title: 'Design',
    description: 'From wireframes to high-fidelity prototypes, we craft pixel-perfect interfaces that balance beauty with usability and align with your brand identity.',
    highlight: 'UI/UX & Prototyping',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Clean, scalable code built with Next.js, React, and modern technologies. Every feature is tested, optimized, and ready for production at scale.',
    highlight: 'Engineering & QA',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Launch day is just the beginning. We provide ongoing support, analytics insights, and iterative improvements to keep your product ahead of the curve.',
    highlight: 'Deploy & Growth',
  },
]

const technologies = [
  { name: 'React', abbr: 'Re' },
  { name: 'Next.js', abbr: 'Nx' },
  { name: 'Node.js', abbr: 'No' },
  { name: 'TypeScript', abbr: 'TS' },
  { name: 'Python', abbr: 'Py' },
  { name: 'AWS', abbr: 'AW' },
  { name: 'PostgreSQL', abbr: 'Pg' },
  { name: 'MongoDB', abbr: 'Mg' },
  { name: 'Tailwind CSS', abbr: 'TW' },
  { name: 'Docker', abbr: 'Dk' },
  { name: 'GraphQL', abbr: 'GQ' },
  { name: 'Redis', abbr: 'Rd' },
  { name: 'Stripe', abbr: 'St' },
  { name: 'Vercel', abbr: 'Vc' },
  { name: 'Figma', abbr: 'Fg' },
  { name: 'Firebase', abbr: 'Fb' },
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
        subtitle="Comprehensive digital solutions tailored to your business needs. From concept to launch, we've got you covered."
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
   Service Showcase — full-width magazine spreads
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
        {services.map((service, i) => {
          const Card = VISUAL_CARDS[i]
          const isEven = i % 2 === 1
          return (
            <div key={service.num}>
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
                  <div className="flex gap-2 flex-wrap mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full font-mono text-foreground-muted/70 border border-white/[0.08]"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
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
              {i < services.length - 1 && (
                <div className="container mx-auto px-6 lg:px-16 xl:px-20">
                  <div
                    className="h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.15) 30%, rgba(255,107,53,0.15) 70%, transparent)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ═══ MOBILE / TABLET LAYOUT (<lg) ═══ */}
      <div className="lg:hidden relative z-10 py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          {services.map((service, i) => {
            const Card = VISUAL_CARDS[i]
            return (
              <div key={service.num} data-svc-mobile-item>
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
                <div className="flex gap-2 flex-wrap mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-mono text-foreground-muted/70 border border-white/[0.08]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
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
                {i < services.length - 1 && (
                  <div
                    className="mt-12 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.12) 30%, rgba(255,107,53,0.12) 70%, transparent)',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
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
                      'border border-white/[0.08]',
                      'hover:border-coral-500/30',
                      'transition-all duration-500',
                      'group'
                    )}
                    style={{
                      background: 'linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%)',
                    }}
                  >
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(90deg, var(--color-coral-500) 0%, var(--color-coral-400) 50%, transparent 100%)',
                      }}
                    />

                    <span
                      className="block font-mono leading-none mb-6 select-none"
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
                'border border-white/[0.08]'
              )}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, var(--color-coral-500) 0%, transparent 60%)',
                  opacity: 0.4,
                }}
              />
              <span
                className="block font-mono leading-none mb-4 select-none"
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
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto" data-tech-head>
            Modern tools and frameworks for cutting-edge solutions
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
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/30 hover:shadow-[0_0_20px_rgba(255,107,53,0.08)]"
            style={{ background: 'linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%)' }}
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
