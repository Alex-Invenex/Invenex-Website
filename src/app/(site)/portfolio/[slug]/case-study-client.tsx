'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import { ShareButtons } from '@/components/ui/share-buttons'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { CaseStudyProject } from '@/lib/projects'

gsap.registerPlugin(useGSAP)

const ImageGallery = dynamic(
  () => import('@/components/ui/image-gallery').then((mod) => mod.ImageGallery),
  {
    loading: () => (
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-surface-border bg-background-secondary animate-pulse"
            style={{ aspectRatio: '16 / 10' }}
          />
        ))}
      </div>
    ),
  }
)

interface CaseStudyClientProps {
  project: CaseStudyProject
  relatedProjects: CaseStudyProject[]
}

export function CaseStudyClient({ project, relatedProjects }: CaseStudyClientProps) {
  // Most projects reuse the hero shot as gallery[0] — drop it so the gallery
  // adds new context instead of repeating the hero. Also drop mockup variants.
  const dedupedGallery = project.gallery.filter(
    (g) => g !== project.image && !g.includes('-mockup.webp')
  )
  // Prefer clean (non-hero, non-mockup) screenshots when there are multiple.
  // If only one clean image exists, relax the mockup exclusion so the gallery
  // has enough images for lightbox navigation. Fall back to full gallery if
  // hero-excluded is also exhausted.
  const heroExcluded = project.gallery.filter((g) => g !== project.image)
  const galleryImages =
    dedupedGallery.length > 1
      ? dedupedGallery
      : heroExcluded.length > 0
      ? heroExcluded
      : project.gallery

  return (
    <>
      <CaseStudyHero project={project} />
      <ChallengeAndSolutionSection challenge={project.challenge} solution={project.solution} />
      <ResultsSection results={project.results} />
      <GallerySection images={galleryImages} title={project.title} />
      <TechSection technologies={project.technologies} />
      {project.testimonial && <TestimonialSection testimonial={project.testimonial} />}
      {relatedProjects.length > 0 && <RelatedSection projects={relatedProjects} category={project.category} />}
      <div data-testid="case-study-cta">
        <SubpageCTA
          headline="READY TO START"
          highlightedText="YOUR PROJECT"
          subtitle="Let's discuss how we can help transform your vision into reality."
          primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
          secondaryCTA={{ label: 'View Our Work', href: '/portfolio' }}
        />
      </div>
    </>
  )
}

/* ─── Grain texture (shared inline SVG) ──────────────────── */
const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.03,
}

/* ─── Decorative section number — restrained, mono eyebrow ── */
function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block font-mono mb-3 text-coral-500/70"
      aria-hidden="true"
      style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 300,
        lineHeight: 1,
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </span>
  )
}

/* ─── Hero ─────────────────────────────────────────────── */
function CaseStudyHero({ project }: { project: CaseStudyProject }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-csh]', { opacity: 1, y: 0, x: 0, clipPath: 'inset(0%)', scale: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-csh="orb"]',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, stagger: 0.1 },
        0
      )

      tl.fromTo('[data-csh="back"]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, 0.2)
      tl.fromTo('[data-csh="client"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      tl.fromTo('[data-csh="title"]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.4)
      tl.fromTo('[data-csh="badge"]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
      tl.fromTo('[data-csh="meta"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      tl.fromTo('[data-csh="share"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8)

      tl.fromTo(
        '[data-csh="img"]',
        { clipPath: 'inset(8%)', opacity: 0 },
        { clipPath: 'inset(0%)', opacity: 1, duration: 1.2, ease: 'power4.out' },
        0.35
      )
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section
      ref={sectionRef}
      data-testid="case-study-hero"
      aria-labelledby="case-study-hero-title"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-background"
      style={{ overflow: 'clip' }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true" style={grainStyle} />

      {/* Triple orb atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          data-csh="orb"
          className="absolute top-[15%] right-[5%] rounded-full opacity-0 will-change-transform"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,106,55,0.08) 0%, transparent 70%)' }}
        />
        <div
          data-csh="orb"
          className="absolute top-[25%] right-[12%] rounded-full opacity-0 will-change-transform"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,106,55,0.12) 0%, transparent 60%)' }}
        />
        <div
          data-csh="orb"
          className="absolute -top-20 left-[20%] rounded-full opacity-0"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: 'linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Back to Portfolio */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-10 group"
          data-csh="back"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="max-w-4xl">
          {/* Client name — strong mono coral eyebrow (was a weak 200-weight grey) */}
          <p
            data-csh="client"
            data-testid="case-study-client"
            className="font-mono text-sm md:text-base tracking-[0.25em] uppercase text-coral-500 mb-5"
          >
            {project.client}
          </p>

          {/* Title — coral gradient, lighter stops for stronger contrast on dark */}
          <h1
            id="case-study-hero-title"
            data-csh="title"
            className="leading-[0.92] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, var(--color-coral-300) 0%, var(--color-coral-400) 45%, var(--color-coral-500) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title}
          </h1>

          {/* Category + meta strip */}
          <div data-csh="badge" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-foreground-muted">
            <span
              data-testid="case-study-category"
              className="inline-flex items-center gap-2 rounded-full border border-coral-500/30 bg-coral-500/10 px-4 py-1.5 text-xs font-medium text-coral-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-coral-500" aria-hidden="true" />
              {project.category}
            </span>
            <span className="hidden sm:inline h-4 w-px bg-surface-overlay-hover" />
            <span>{project.client}</span>
            {project.url && (
              <>
                <span className="hidden sm:inline h-4 w-px bg-surface-overlay-hover" />
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  Visit Live Site <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </>
            )}
          </div>

          {/* Excerpt with coral accent rule */}
          {project.excerpt && (
            <div data-csh="meta" className="mt-8 md:mt-10 flex">
              <div className="w-0.5 min-h-[3rem] bg-coral-500 shrink-0" />
              <p className="pl-4 md:pl-5 text-base md:text-lg lg:text-xl text-foreground-muted max-w-xl leading-relaxed">
                {project.excerpt}
              </p>
            </div>
          )}

          <div data-csh="share"><ShareButtons title={`${project.title} - Case Study`} className="mt-8" /></div>
        </div>
      </div>

      {/* Hero showcase with clip-path reveal */}
      {project.image && (
        <div data-csh="img" className="container mx-auto px-6 md:px-12 mt-14 md:mt-20 relative z-10"
             style={{ clipPath: 'inset(8%)' }}>
          <div className="pf-card-media" style={{ borderRadius: '20px' }}>
            <Image
              src={project.image}
              alt={`${project.title} — project by Invenex Solutions`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

/* ─── Challenge & Solution (split sections, editorial) ───── */
function ChallengeAndSolutionSection({ challenge, solution }: { challenge: string; solution: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-cs]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-cs]', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <div ref={sectionRef} className="bg-background relative overflow-hidden">
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] right-[5%] rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[5%] rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* 01 — THE CHALLENGE */}
      <section
        data-testid="case-study-challenge"
        aria-labelledby="challenge-heading"
        className="pt-24 md:pt-36 pb-12 md:pb-20 relative z-10"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div data-cs className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-16 items-start">
            <div>
              <SectionNumber>01</SectionNumber>
              <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground-muted font-mono" aria-hidden="true">The Challenge</p>
            </div>
            <div>
              <h2 id="challenge-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">The Challenge</h2>
              <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">{challenge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coral gradient divider */}
      <div
        data-cs
        className="container mx-auto px-6 md:px-12"
      >
        <div style={{ height: 1, background: 'linear-gradient(90deg, var(--color-coral-500), var(--color-coral-400) 30%, transparent 100%)', opacity: 0.3 }} />
      </div>

      {/* 02 — OUR SOLUTION */}
      <section
        data-testid="case-study-solution"
        aria-labelledby="solution-heading"
        className="pt-12 md:pt-20 pb-24 md:pb-36 relative z-10"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div data-cs className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-16 items-start">
            <div>
              <SectionNumber>02</SectionNumber>
              <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground-muted font-mono" aria-hidden="true">Our Solution</p>
            </div>
            <div>
              <h2 id="solution-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">Our Solution</h2>
              <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">{solution}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Results Section ──────────────────────────────────── */
function ResultsSection({ results }: { results: CaseStudyProject['results'] }) {
  return (
    <section data-testid="case-study-results" aria-labelledby="results-heading" className="py-24 md:py-36 bg-background-secondary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,106,55,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <SectionNumber>03</SectionNumber>
          <h2 id="results-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold">The Results</h2>
        </div>
        <GSAPStaggerContainer className="grid md:grid-cols-3 gap-6">
          {results.map((result) => {
            const numMatch = result.metric.match(/(\d+)/)
            const num = numMatch ? parseInt(numMatch[1]) : null
            const prefix = num !== null ? result.metric.slice(0, numMatch!.index) : ''
            const suffix = num !== null ? result.metric.slice(numMatch!.index! + numMatch![1].length) : ''

            return (
              <GSAPStaggerItem key={result.label}>
                <div
                  data-testid="result-metric"
                  className="group p-10 text-center rounded-2xl border border-surface-border transition-all duration-300 hover:border-coral-500/30 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,106,55,0.12)] relative overflow-hidden h-full"
                  style={{ background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, var(--color-coral-500) 0%, var(--color-coral-400) 50%, transparent 100%)' }} />
                  <div className="text-5xl md:text-6xl font-bold text-gradient-orange mb-4">
                    {num !== null ? (
                      <AnimatedCounter value={num} prefix={prefix} suffix={suffix} />
                    ) : (
                      result.metric
                    )}
                  </div>
                  <div className="text-foreground-muted text-sm tracking-wide uppercase">{result.label}</div>
                </div>
              </GSAPStaggerItem>
            )
          })}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Gallery Section ──────────────────────────────────── */
function GallerySection({ images, title }: { images: string[]; title: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-gal]', { opacity: 1 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-gal]', { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="case-study-gallery" aria-labelledby="gallery-heading" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={grainStyle} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 right-[5%] rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[10%] rounded-full" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionNumber>04</SectionNumber>
        <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold mb-12">Project Gallery</h2>
        <div data-gal>
          <ImageGallery images={images} projectTitle={title} />
        </div>
      </div>
    </section>
  )
}

/* ─── Technologies Section ─────────────────────────────── */
function TechSection({ technologies }: { technologies: string[] }) {
  return (
    <section data-testid="case-study-technologies" aria-labelledby="technologies-heading" className="py-24 md:py-36 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <SectionNumber>05</SectionNumber>
          <h2 id="technologies-heading" className="text-3xl md:text-4xl font-bold">Technologies Used</h2>
        </div>
        <GSAPStaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <GSAPStaggerItem key={tech}>
              <div
                data-testid="tech-badge"
                className="group p-5 rounded-2xl border border-surface-border text-center font-medium text-foreground-muted transition-all duration-300 hover:border-coral-500/30 hover:text-foreground hover:shadow-[0_0_25px_rgba(255,106,55,0.1)] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, var(--color-coral-500), transparent)' }} />
                {tech}
              </div>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Testimonial Section ──────────────────────────────── */
function TestimonialSection({ testimonial }: { testimonial: NonNullable<CaseStudyProject['testimonial']> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-test]', { opacity: 1, y: 0, scaleX: 1, scale: 1 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        gsap.fromTo(section.querySelector('[data-test="icon"]'), { opacity: 0, y: -20, scale: 0.5 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        })

        gsap.fromTo(section.querySelector('[data-test="quote"]'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        })

        gsap.fromTo(section.querySelector('[data-test="rule"]'), { scaleX: 0 }, {
          scaleX: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%' },
        })

        gsap.fromTo(section.querySelector('[data-test="author"]'), { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="case-study-testimonial" aria-labelledby="testimonial-heading" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={grainStyle} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,106,55,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 id="testimonial-heading" className="sr-only">Client Testimonial</h2>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-surface-border p-8 md:p-12 lg:p-16 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-surface-overlay) 0%, transparent 100%)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-coral-500), transparent)', opacity: 0.4 }} />

            <div data-test="icon" className="mx-auto mb-6" aria-hidden="true" style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', lineHeight: 0.8, color: 'rgba(255,106,55,0.18)', fontFamily: 'Georgia, serif' }}>
              &ldquo;
            </div>

            <blockquote data-test="quote" className="text-2xl md:text-3xl lg:text-4xl italic text-foreground leading-relaxed font-light">
              {testimonial.quote}
            </blockquote>

            <div data-test="rule" className="h-px w-20 bg-coral-500 mx-auto mt-10 mb-8" style={{ transformOrigin: 'center' }} />

            <div data-test="author">
              <div className="font-semibold text-lg">{testimonial.author}</div>
              <div className="text-foreground-muted text-sm mt-1">{testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Related Projects ─────────────────────────────────── */
function RelatedSection({ projects, category }: { projects: CaseStudyProject[]; category: string }) {
  return (
    <section data-testid="case-study-related" aria-labelledby="related-heading" className="py-24 md:py-36 bg-background-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <SectionNumber>06</SectionNumber>
        <h2 id="related-heading" className="text-3xl md:text-4xl font-bold mb-4">Related Projects</h2>
        <p className="text-foreground-muted mb-12">More {category.toLowerCase()} projects we&apos;ve delivered</p>

        <GSAPStaggerContainer className="grid md:grid-cols-3 gap-8">
          {projects.map((relatedProject) => (
            <GSAPStaggerItem key={relatedProject.id}>
              <Link href={`/portfolio/${relatedProject.slug}`} className="group block">
                <div className="pf-card-media">
                  <Image
                    src={relatedProject.image}
                    alt={`${relatedProject.title} — ${relatedProject.category} project by Invenex Solutions`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="pf-card-img"
                  />
                </div>
                <div className="mt-4">
                  <span className="inline-block rounded-full border border-surface-border bg-surface-overlay px-3 py-1 text-xs font-medium text-foreground-muted mb-3">
                    {relatedProject.category}
                  </span>
                  <h3 className="font-semibold text-lg text-foreground transition-colors group-hover:text-coral-400">{relatedProject.title}</h3>
                  <p className="text-sm text-foreground-muted mt-1">{relatedProject.client}</p>
                </div>
              </Link>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}
