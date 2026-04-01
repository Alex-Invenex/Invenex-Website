'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/ui/share-buttons'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { CaseStudyProject } from '@/lib/projects'

gsap.registerPlugin(useGSAP)

const ImageGallery = dynamic(
  () => import('@/components/ui/image-gallery').then((mod) => mod.ImageGallery),
  {
    loading: () => (
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-video bg-background-secondary rounded-lg animate-pulse" />
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
  return (
    <>
      <CaseStudyHero project={project} />
      <ChallengeAndSolutionSection challenge={project.challenge} solution={project.solution} />
      <ResultsSection results={project.results} />
      <GallerySection images={project.gallery} title={project.title} />
      <TechSection technologies={project.technologies} />
      {project.testimonial && <TestimonialSection testimonial={project.testimonial} />}
      {relatedProjects.length > 0 && <RelatedSection projects={relatedProjects} category={project.category} />}
      <SubpageCTA
        headline="READY TO START"
        highlightedText="YOUR PROJECT"
        subtitle="Let's discuss how we can help transform your vision into reality."
      />
    </>
  )
}

/* ─── Grain texture (shared inline SVG) ──────────────────── */
const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.03,
}

/* ─── Decorative outlined section number ─────────────────── */
function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block font-mono mb-4"
      aria-hidden="true"
      style={{
        fontSize: 'clamp(3.5rem, 8vw, 6rem)',
        fontWeight: 200,
        WebkitTextStroke: '1px var(--color-coral-500)',
        WebkitTextFillColor: 'transparent',
        opacity: 0.4,
        lineHeight: 1,
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
        gsap.set('[data-csh]', { opacity: 1, y: 0, clipPath: 'inset(0%)', scale: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Orbs fade + scale
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

      // Hero image clip-path reveal
      tl.fromTo(
        '[data-csh="img"]',
        { clipPath: 'inset(8%)' },
        { clipPath: 'inset(0%)', duration: 1.2, ease: 'power4.out' },
        0.3
      )
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="case-study-hero" aria-labelledby="case-study-hero-title" className="relative pt-28 md:pt-36 pb-16 md:pb-20 bg-background" style={{ overflow: 'clip' }}>
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true" style={grainStyle} />

      {/* Triple orb atmosphere (matching SubpageHero) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary coral radiance */}
        <div
          data-csh="orb"
          className="absolute top-[15%] right-[5%] rounded-full opacity-0 will-change-transform"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,106,55,0.08) 0%, transparent 70%)' }}
        />
        {/* Secondary inner glow */}
        <div
          data-csh="orb"
          className="absolute top-[25%] right-[12%] rounded-full opacity-0 will-change-transform"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,106,55,0.12) 0%, transparent 60%)' }}
        />
        {/* Subtle purple accent — top left */}
        <div
          data-csh="orb"
          className="absolute -top-20 left-[20%] rounded-full opacity-0"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
        />
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: 'linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Back to Portfolio — above image for better hierarchy */}
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8 group" data-csh="back">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Weight-contrast headline: thin client name + bold coral title */}
        <div data-csh="client">
          <span
            className="block text-foreground/50 leading-tight tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', fontWeight: 200 }}
          >
            {project.client}
          </span>
        </div>

        <h1
          id="case-study-hero-title"
          data-csh="title"
          className="leading-[0.9] tracking-[-0.04em] mt-2"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--color-coral-500) 0%, var(--color-coral-400) 40%, var(--color-coral-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {project.title}
        </h1>

        {/* Excerpt with coral accent border */}
        {project.excerpt && (
          <div data-csh="meta" className="mt-8 md:mt-10 flex">
            <div className="w-0.5 min-h-[3rem] bg-coral-500 shrink-0" />
            <p className="pl-4 md:pl-5 text-base md:text-lg text-foreground-muted max-w-lg leading-relaxed">
              {project.excerpt}
            </p>
          </div>
        )}

        {/* Meta strip */}
        <div data-csh="meta" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground-muted">
          <Badge data-testid="case-study-category">{project.category}</Badge>
          <span className="hidden sm:inline h-4 w-px bg-surface-overlay-hover" />
          <span>{project.client}</span>
          {project.url && (
            <>
              <span className="hidden sm:inline h-4 w-px bg-surface-overlay-hover" />
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                Visit Live Site <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </>
          )}
        </div>

        <div data-csh="share"><ShareButtons title={`${project.title} - Case Study`} className="mt-6" /></div>
      </div>

      {/* Full-width hero image with clip-path reveal */}
      {project.image && (
        <div data-csh="img" className="container mx-auto px-6 md:px-12 mt-12 relative z-10" style={{ clipPath: 'inset(8%)' }}>
          <div className="aspect-video rounded-2xl overflow-hidden relative border border-surface-border">
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

/* ─── Challenge & Solution (Editorial Layout) ────────────── */
function ChallengeAndSolutionSection({ challenge, solution }: { challenge: string; solution: string }) {
  const sectionRef = useRef<HTMLElement>(null)
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
    <section ref={sectionRef} className="py-24 md:py-36 bg-background relative overflow-hidden">
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] right-[5%] rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[5%] rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* 01 — THE CHALLENGE */}
        <div data-testid="case-study-challenge" data-cs className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-start">
          <SectionNumber>01</SectionNumber>
          <div>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground-muted font-mono mb-3" aria-hidden="true">The Challenge</p>
            <h2 id="challenge-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">The Challenge</h2>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed max-w-2xl">{challenge}</p>
          </div>
        </div>

        {/* Coral gradient divider */}
        <div data-cs className="my-16 md:my-24" style={{ height: 1, background: 'linear-gradient(90deg, var(--color-coral-500), var(--color-coral-400) 30%, transparent 100%)', opacity: 0.3 }} />

        {/* 02 — OUR SOLUTION */}
        <div data-testid="case-study-solution" data-cs className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-start">
          <SectionNumber>02</SectionNumber>
          <div>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground-muted font-mono mb-3" aria-hidden="true">Our Solution</p>
            <h2 id="solution-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">Our Solution</h2>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed max-w-2xl">{solution}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Results Section ──────────────────────────────────── */
function ResultsSection({ results }: { results: CaseStudyProject['results'] }) {
  return (
    <section data-testid="case-study-results" aria-labelledby="results-heading" className="py-24 md:py-36 bg-background-secondary relative overflow-hidden">
      {/* Atmospheric orb */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)', filter: 'blur(100px)' }} />
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
                  className="group p-10 text-center rounded-2xl border border-surface-border transition-all duration-300 hover:border-coral-500/20 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,106,55,0.1)] relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)' }}
                >
                  {/* Coral gradient accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, var(--color-coral-500) 0%, var(--color-coral-400) 50%, transparent 100%)' }} />
                  <div className="text-5xl md:text-6xl font-bold text-gradient mb-4">
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
function GallerySection({ images, title }: { images: CaseStudyProject['gallery']; title: string }) {
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
      {/* Grain texture */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={grainStyle} />

      {/* Atmospheric orbs */}
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
                className="group p-5 rounded-2xl border border-surface-border text-center font-medium text-foreground-muted transition-all duration-300 hover:border-coral-500/20 hover:text-foreground hover:shadow-[0_0_25px_rgba(255,106,55,0.08)] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)' }}
              >
                {/* Subtle top accent on hover */}
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
        gsap.set('[data-test]', { opacity: 1, y: 0 })
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
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" style={grainStyle} />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,106,55,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 id="testimonial-heading" className="sr-only">Client Testimonial</h2>
        <div className="max-w-4xl mx-auto">
          {/* Glassmorphic card */}
          <div className="rounded-2xl border border-surface-border p-8 md:p-12 lg:p-16 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-surface-overlay) 0%, transparent 100%)' }}>
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-coral-500), transparent)', opacity: 0.4 }} />

            {/* Large decorative quote mark */}
            <div data-test="icon" className="mx-auto mb-6" aria-hidden="true" style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', lineHeight: 0.8, color: 'rgba(255,106,55,0.15)', fontFamily: 'Georgia, serif' }}>
              &ldquo;
            </div>

            <blockquote data-test="quote" className="text-2xl md:text-3xl lg:text-4xl italic text-foreground leading-relaxed font-light">
              {testimonial.quote}
            </blockquote>

            {/* Coral rule */}
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

        <GSAPStaggerContainer className="grid md:grid-cols-3 gap-6">
          {projects.map((relatedProject) => (
            <GSAPStaggerItem key={relatedProject.id}>
              <Link href={`/portfolio/${relatedProject.slug}`}>
                <div className="rounded-xl overflow-hidden backdrop-blur-xl border border-surface-border transition-all duration-300 hover:border-coral-500/30 hover:shadow-[0_0_30px_rgba(255,106,55,0.08)] group" style={{ background: 'var(--color-surface-overlay)' }}>
                  <div className="aspect-video bg-background-tertiary relative overflow-hidden">
                    <Image
                      src={relatedProject.image}
                      alt={`${relatedProject.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-medium flex items-center gap-2">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge size="sm" className="mb-3">{relatedProject.category}</Badge>
                    <h3 className="font-semibold text-lg group-hover:text-white transition-colors">{relatedProject.title}</h3>
                    <p className="text-sm text-foreground-muted mt-1">{relatedProject.client}</p>
                  </div>
                </div>
              </Link>
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}
