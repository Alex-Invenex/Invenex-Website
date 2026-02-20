'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowLeft, ExternalLink, Quote } from 'lucide-react'
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
      {/* Hero */}
      <CaseStudyHero project={project} />

      {/* Challenge */}
      <ChallengeSection text={project.challenge} />

      {/* Solution */}
      <SolutionSection text={project.solution} />

      {/* Results */}
      <ResultsSection results={project.results} />

      {/* Gallery */}
      <GallerySection images={project.gallery} title={project.title} />

      {/* Technologies */}
      <TechSection technologies={project.technologies} />

      {/* Testimonial */}
      {project.testimonial && <TestimonialSection testimonial={project.testimonial} />}

      {/* Related Projects */}
      {relatedProjects.length > 0 && <RelatedSection projects={relatedProjects} category={project.category} />}

      {/* CTA */}
      <SubpageCTA
        headline="READY TO START"
        highlightedText="YOUR PROJECT"
        subtitle="Let's discuss how we can help transform your vision into reality."
      />
    </>
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
        gsap.set('[data-csh]', { opacity: 1, y: 0, clipPath: 'inset(0%)' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Hero image clip-path reveal
      tl.fromTo(
        '[data-csh="img"]',
        { clipPath: 'inset(8%)' },
        { clipPath: 'inset(0%)', duration: 1.2, ease: 'power4.out' },
        0
      )

      tl.fromTo('[data-csh="back"]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, 0.2)
      tl.fromTo('[data-csh="badge"]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4)
      tl.fromTo('[data-csh="title"]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.3)
      tl.fromTo('[data-csh="meta"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
      tl.fromTo('[data-csh="share"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="case-study-hero" aria-labelledby="case-study-hero-title" className="relative pt-24 pb-16 overflow-hidden bg-background">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      {/* Atmospheric orb */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] right-[5%] rounded-full" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,106,55,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Full-width hero image with clip-path reveal */}
      {project.image && (
        <div data-csh="img" className="container mx-auto px-6 md:px-12 mb-12 relative z-10" style={{ clipPath: 'inset(8%)' }}>
          <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/[0.08]">
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

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8 group" data-csh="back">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div data-csh="badge"><Badge data-testid="case-study-category" className="mb-4">{project.category}</Badge></div>

        <h1 id="case-study-hero-title" data-csh="title" className="leading-[0.9] tracking-[-0.04em]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900 }}>
          {project.title}
        </h1>

        <p data-testid="case-study-client" data-csh="meta" className="mt-4 text-xl text-foreground-muted">{project.client}</p>

        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors" data-csh="meta">
            Visit Live Site <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}

        <div data-csh="share"><ShareButtons title={`${project.title} - Case Study`} className="mt-8" /></div>
      </div>
    </section>
  )
}

/* ─── Challenge Section ────────────────────────────────── */
function ChallengeSection({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-chal]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-chal]', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="case-study-challenge" aria-labelledby="challenge-heading" className="py-16 bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 rounded-full pointer-events-none" aria-hidden="true" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 id="challenge-heading" className="text-2xl md:text-3xl font-bold mb-6" data-chal>The Challenge</h2>
            <p className="text-lg text-foreground-muted max-w-xl leading-relaxed" data-chal>{text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Solution Section ─────────────────────────────────── */
function SolutionSection({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-sol]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo('[data-sol]', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} data-testid="case-study-solution" aria-labelledby="solution-heading" className="py-16 bg-background-secondary relative overflow-hidden">
      <div className="absolute left-0 bottom-0 rounded-full pointer-events-none" aria-hidden="true" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:col-start-2">
            <h2 id="solution-heading" className="text-2xl md:text-3xl font-bold mb-6" data-sol>Our Solution</h2>
            <p className="text-lg text-foreground-muted max-w-xl leading-relaxed" data-sol>{text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Results Section ──────────────────────────────────── */
function ResultsSection({ results }: { results: CaseStudyProject['results'] }) {
  return (
    <section data-testid="case-study-results" aria-labelledby="results-heading" className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <h2 id="results-heading" className="text-2xl md:text-3xl font-bold mb-12">The Results</h2>
        <GSAPStaggerContainer className="grid md:grid-cols-3 gap-6">
          {results.map((result) => {
            // Try to extract a number from the metric for animation
            const numMatch = result.metric.match(/(\d+)/)
            const num = numMatch ? parseInt(numMatch[1]) : null
            const prefix = num !== null ? result.metric.slice(0, numMatch!.index) : ''
            const suffix = num !== null ? result.metric.slice(numMatch!.index! + numMatch![1].length) : ''

            return (
              <GSAPStaggerItem key={result.label}>
                <div
                  data-testid="result-metric"
                  className="p-8 text-center rounded-xl backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/20"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient">
                    {num !== null ? (
                      <AnimatedCounter value={num} prefix={prefix} suffix={suffix} />
                    ) : (
                      result.metric
                    )}
                  </div>
                  <div className="text-foreground-muted mt-3">{result.label}</div>
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
    <section ref={sectionRef} data-testid="case-study-gallery" aria-labelledby="gallery-heading" className="py-16 bg-background-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <h2 id="gallery-heading" className="text-2xl md:text-3xl font-bold mb-8">Project Gallery</h2>
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
    <section data-testid="case-study-technologies" aria-labelledby="technologies-heading" className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <h2 id="technologies-heading" className="text-2xl md:text-3xl font-bold mb-8">Technologies Used</h2>
        <GSAPStaggerContainer className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <GSAPStaggerItem key={tech}>
              <span
                data-testid="tech-badge"
                className="inline-block px-4 py-2 rounded-full backdrop-blur-xl border border-white/[0.08] text-sm text-foreground-muted transition-all duration-300 hover:border-coral-500/20 hover:text-foreground hover:shadow-[0_0_15px_rgba(255,106,55,0.1)]"
                style={{ background: 'rgba(255,255,255,0.04)' }}
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
    <section ref={sectionRef} data-testid="case-study-testimonial" aria-labelledby="testimonial-heading" className="py-16 bg-background-secondary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 id="testimonial-heading" className="sr-only">Client Testimonial</h2>
        <div className="max-w-3xl mx-auto text-center">
          <Quote data-test="icon" className="w-12 h-12 text-coral-500/30 mx-auto mb-6" aria-hidden="true" />
          <blockquote data-test="quote" className="text-xl md:text-2xl italic text-foreground leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div data-test="author" className="mt-6">
            <div className="font-semibold text-lg">{testimonial.author}</div>
            <div className="text-foreground-muted">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Related Projects ─────────────────────────────────── */
function RelatedSection({ projects, category }: { projects: CaseStudyProject[]; category: string }) {
  return (
    <section data-testid="case-study-related" aria-labelledby="related-heading" className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <h2 id="related-heading" className="text-2xl md:text-3xl font-bold mb-4">Related Projects</h2>
        <p className="text-foreground-muted mb-12">More {category.toLowerCase()} projects we&apos;ve delivered</p>

        <GSAPStaggerContainer className="grid md:grid-cols-3 gap-6">
          {projects.map((relatedProject) => (
            <GSAPStaggerItem key={relatedProject.id}>
              <Link href={`/portfolio/${relatedProject.slug}`}>
                <div className="rounded-xl overflow-hidden backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/20 group" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="aspect-video bg-background-tertiary relative overflow-hidden">
                    <Image
                      src={relatedProject.image}
                      alt={`${relatedProject.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
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
