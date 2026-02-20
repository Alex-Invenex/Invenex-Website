'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Monitor, Home, BookOpen, Wallet, Building } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import { JobListings } from '@/components/sections/job-listings'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const benefits = [
  { icon: Monitor, title: 'Modern Tech Stack', description: 'Work with Next.js, TypeScript, React, and more' },
  { icon: Home, title: 'Flexible Work', description: 'Remote-friendly with flexible hours' },
  { icon: BookOpen, title: 'Learning Budget', description: 'Annual budget for courses and conferences' },
  { icon: Wallet, title: 'Competitive Pay', description: 'Market-rate compensation + bonuses' },
]

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Sanity', 'Vercel']

export function CareersClient() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        id="careers-hero-title"
        tag="// We're Hiring"
        headline={
          <>
            <HeadlineWord thin>JOIN</HeadlineWord>
            <HeadlineWord coral>OUR TEAM.</HeadlineWord>
          </>
        }
        subtitle="Build amazing products with a team that values innovation, growth, and work-life balance."
      >
        <Button asChild size="lg" className="bg-coral-500 hover:bg-coral-600 text-white shadow-[0_0_20px_rgba(255,106,55,0.3)]">
          <Link href="#positions">View Open Positions</Link>
        </Button>
      </SubpageHero>

      {/* Life at Invenex */}
      <LifeSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* Tech Stack */}
      <TechStackSection />

      {/* Open Positions */}
      <PositionsSection />

      {/* CTA */}
      <SubpageCTA
        headline="DON'T SEE"
        highlightedText="YOUR ROLE"
        subtitle="We're always looking for talented people. Send us your resume and we'll keep you in mind."
        primaryCTA={{ label: 'Send Your Resume', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/portfolio' }}
      />
    </>
  )
}

/* ─── Life Section ─────────────────────────────────────── */
function LifeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-life]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        gsap.fromTo(section.querySelectorAll('[data-life]'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-24 bg-background-secondary relative overflow-hidden" aria-labelledby="careers-life-title" data-testid="careers-life-section">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="careers-life-title" className="text-3xl font-bold mb-6" data-life>Life at Invenex</h2>
            <div className="space-y-4 text-foreground-muted">
              <p data-life>
                We&apos;re a small, focused team that believes in doing meaningful work. With remote team members, we combine the best of in-person collaboration with the flexibility of remote work.
              </p>
              <p data-life>
                Our culture is built on trust, ownership, and continuous learning. We ship fast, learn from our users, and iterate quickly.
              </p>
            </div>
          </div>

          {/* Glassmorphic culture card */}
          <div data-life>
            <div className="rounded-2xl overflow-hidden relative backdrop-blur-xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-0 right-0 rounded-full blur-[80px]" style={{ width: 300, height: 300, background: 'rgba(255,106,55,0.08)' }} />
                <div className="absolute bottom-0 left-0 rounded-full blur-[60px]" style={{ width: 200, height: 200, background: 'rgba(255,106,55,0.05)' }} />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center p-8 min-h-[250px] gap-6">
                <div className="w-16 h-16 rounded-2xl bg-coral-500/20 border border-coral-500/30 flex items-center justify-center">
                  <Building className="w-8 h-8 text-coral-400" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Remote-Friendly', 'Modern Stack', 'Growth Culture'].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full backdrop-blur-xl border border-white/[0.08] text-sm text-foreground-muted" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits Section ─────────────────────────────────── */
function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-ben]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-ben="head"]', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} id="benefits" className="py-24 bg-background" aria-labelledby="careers-benefits-title" data-testid="careers-benefits-section">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 id="careers-benefits-title" className="text-3xl font-bold" data-ben="head">Why Join Us?</h2>
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto" data-ben="head">We offer competitive benefits and a culture that supports your growth</p>
        </div>

        <GSAPStaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <GSAPStaggerItem key={benefit.title}>
                <div
                  data-testid="benefit-card"
                  className="p-6 text-center h-full rounded-2xl backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/20 group relative overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {/* Hover accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-coral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="w-14 h-14 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-coral-500" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground-muted">{benefit.description}</p>
                </div>
              </GSAPStaggerItem>
            )
          })}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Tech Stack Section ───────────────────────────────── */
function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-tss]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-tss="head"]', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-24 bg-background-secondary" aria-labelledby="careers-tech-title" data-testid="careers-tech-section">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 id="careers-tech-title" className="text-3xl font-bold" data-tss="head">Our Tech Stack</h2>
          <p className="mt-4 text-foreground-muted" data-tss="head">Work with modern, industry-leading tools</p>
        </div>

        <GSAPStaggerContainer className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <GSAPStaggerItem key={tech}>
              <span className="inline-block px-4 py-2 text-base rounded-full backdrop-blur-xl border border-white/[0.08] text-foreground-muted transition-all duration-300 hover:border-coral-500/20 hover:text-foreground hover:shadow-[0_0_15px_rgba(255,106,55,0.1)]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {tech}
              </span>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Positions Section ────────────────────────────────── */
function PositionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-pos]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-pos="head"]', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })

        gsap.fromTo('[data-pos="list"]', { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} id="positions" className="py-24 bg-background" aria-labelledby="careers-positions-title" data-testid="careers-positions-section">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 id="careers-positions-title" className="text-3xl font-bold" data-pos="head">Open Positions</h2>
          <p className="mt-4 text-foreground-muted" data-pos="head">Find your next opportunity</p>
        </div>
        <div data-pos="list">
          <JobListings />
        </div>
      </div>
    </section>
  )
}
