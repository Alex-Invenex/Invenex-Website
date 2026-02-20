'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Globe, Smartphone, Layers, ShoppingCart, Share2, Lightbulb, ArrowUpRight } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/* ─── Data ─────────────────────────────────────────────── */
const services = [
  { title: 'Web Development', description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.', icon: Globe, href: '/services/web-development', num: '01' },
  { title: 'Mobile App Development', description: 'Native iOS and Android applications that deliver exceptional user experiences across all devices.', icon: Smartphone, href: '/services/mobile-development', num: '02' },
  { title: 'Platform Development', description: 'Enterprise platforms and SaaS solutions designed for scale, reliability, and seamless growth.', icon: Layers, href: '/services/platform-development', num: '03' },
  { title: 'E-Commerce Solutions', description: 'Online stores and marketplaces that convert visitors into customers and drive revenue growth.', icon: ShoppingCart, href: '/services/ecommerce', num: '04' },
  { title: 'Social Media Marketing', description: 'Strategic social media campaigns that grow your brand presence and engage your audience effectively.', icon: Share2, href: '/services/social-media', num: '05' },
  { title: 'Digital Strategy', description: 'Technology consulting and roadmapping for digital transformation that drives measurable results.', icon: Lightbulb, href: '/services/digital-strategy', num: '06' },
]

const process = [
  { step: 1, title: 'Discovery', description: 'We learn about your business, goals, and challenges' },
  { step: 2, title: 'Strategy', description: 'We create a detailed roadmap for your project success' },
  { step: 3, title: 'Design', description: 'We craft beautiful, intuitive, and functional designs' },
  { step: 4, title: 'Development', description: 'We build with precision, quality, and attention to detail' },
  { step: 5, title: 'Launch', description: 'We deploy, optimize, and ensure everything runs smoothly' },
]

const technologies = [
  { name: 'React', abbr: 'Re' },
  { name: 'Next.js', abbr: 'N' },
  { name: 'Node.js', abbr: 'No' },
  { name: 'TypeScript', abbr: 'TS' },
  { name: 'Python', abbr: 'Py' },
  { name: 'AWS', abbr: 'AW' },
  { name: 'PostgreSQL', abbr: 'Pg' },
  { name: 'MongoDB', abbr: 'Mg' },
]

/* ─── Component ────────────────────────────────────────── */
export function ServicesClient() {
  return (
    <>
      {/* Hero */}
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

      {/* Services Grid */}
      <ServicesGrid />

      {/* Process */}
      <ProcessSection />

      {/* Technologies */}
      <TechSection />

      {/* CTA */}
      <SubpageCTA
        headline="READY TO"
        highlightedText="GET STARTED"
        subtitle="Let's discuss how we can help you achieve your digital goals and transform your business."
      />
    </>
  )
}

/* ─── Services Grid ────────────────────────────────────── */
function ServicesGrid() {
  return (
    <section aria-labelledby="services-grid-heading" className="py-24 bg-background relative overflow-hidden">
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,106,55,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 id="services-grid-heading" className="sr-only">Our Services</h2>
        <GSAPStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <GSAPStaggerItem key={service.title}>
                <Link
                  href={service.href}
                  className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
                  data-testid="service-card"
                >
                  <div className="relative h-full p-8 rounded-2xl backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/20 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {/* Outlined coral number */}
                    <span
                      className="absolute top-6 right-6 text-5xl font-bold leading-none select-none"
                      aria-hidden="true"
                      style={{
                        WebkitTextStroke: '1px rgba(255,106,55,0.15)',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {service.num}
                    </span>

                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true">
                      <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-coral-500/20 via-coral-400/10 to-transparent" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', padding: 1 }} />
                    </div>

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl backdrop-blur-xl border border-white/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Icon className="w-7 h-7 text-coral-400" aria-hidden="true" />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">{service.title}</h2>
                        <ArrowUpRight className="w-5 h-5 text-foreground-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                      </div>

                      <p className="text-foreground-muted leading-relaxed mb-6">{service.description}</p>

                      <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-white transition-colors">
                        Learn More
                        <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </GSAPStaggerItem>
            )
          })}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Process Section ──────────────────────────────────── */
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const connectorRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-proc]', { opacity: 1, y: 0 })
        if (connectorRef.current) gsap.set(connectorRef.current, { scaleX: 1 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        // Header
        gsap.fromTo(
          section.querySelectorAll('[data-proc="head"]'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } }
        )

        // Connector line scaleX scrub
        if (connectorRef.current) {
          gsap.fromTo(
            connectorRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                end: 'center 40%',
                scrub: 1,
              },
            }
          )
        }

        // Step cards stagger
        gsap.fromTo(
          section.querySelectorAll('[data-proc="step"]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 60%' },
          }
        )
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} aria-labelledby="process-heading" className="py-16 md:py-24 bg-background-secondary relative overflow-hidden">
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <p className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 font-mono" data-proc="head">// How We Work</p>
          <h2 id="process-heading" className="text-3xl md:text-4xl font-bold" data-proc="head">Our Process</h2>
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto" data-proc="head">A proven methodology that brings your vision to life</p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          {/* Coral connector line — desktop only */}
          <div
            ref={connectorRef}
            className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-coral-500/50 via-coral-400/50 to-coral-500/50 origin-left"
            aria-hidden="true"
            style={{ transform: 'scaleX(0)' }}
          />

          {process.map((step) => (
            <div key={step.step} className="flex-1 relative" data-proc="step">
              {/* Mobile: horizontal compact | Desktop: centered vertical */}
              <div className="flex items-start gap-4 md:block md:text-center">
                <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center md:mx-auto md:mb-4 font-bold text-white text-sm md:text-lg backdrop-blur-xl border border-coral-500/30 shadow-[0_0_20px_rgba(255,106,55,0.3)]" style={{ background: 'linear-gradient(135deg, var(--color-coral-500), var(--color-coral-600))' }}>
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

/* ─── Technologies Section ─────────────────────────────── */
function TechSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-tech]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        gsap.fromTo(
          section.querySelectorAll('[data-tech="head"]'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } }
        )
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} aria-labelledby="tech-heading" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 font-mono" data-tech="head">// Tech Stack</p>
          <h2 id="tech-heading" className="text-3xl md:text-4xl font-bold" data-tech="head">Technologies We Use</h2>
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto" data-tech="head">Modern tools and frameworks for cutting-edge solutions</p>
        </div>

        <GSAPStaggerContainer className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {technologies.map((tech) => (
            <GSAPStaggerItem key={tech.name}>
              <div className="group p-6 rounded-xl backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/20 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-12 h-12 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-coral-500/20 group-hover:shadow-[0_0_15px_rgba(255,106,55,0.15)] transition-all duration-300" aria-hidden="true">
                  <span className="text-sm font-bold text-coral-500">{tech.abbr}</span>
                </div>
                <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{tech.name}</span>
              </div>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}
