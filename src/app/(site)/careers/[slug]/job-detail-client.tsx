'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Briefcase, BarChart3, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { JobDetail } from '@/lib/jobs'

gsap.registerPlugin(useGSAP)

interface JobDetailClientProps {
  job: JobDetail
  slug: string
  benefits: string[]
}

export function JobDetailClient({ job, slug, benefits }: JobDetailClientProps) {
  return (
    <>
      {/* Hero */}
      <JobHero job={job} slug={slug} />

      {/* Main Content */}
      <JobContent job={job} slug={slug} benefits={benefits} />
    </>
  )
}

/* ─── Hero ─────────────────────────────────────────────── */
function JobHero({ job, slug }: { job: JobDetail; slug: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-jh]', { opacity: 1, y: 0, x: 0, filter: 'none' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('[data-jh="back"]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, 0)
      tl.fromTo('[data-jh="badge"]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
      tl.fromTo('[data-jh="title"]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.2)
      tl.fromTo('[data-jh="meta"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.5)
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="pt-32 pb-8 bg-background relative overflow-hidden" aria-labelledby="job-title" data-testid="job-hero">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] right-[10%] rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,106,55,0.06) 0%, transparent 70%)' }} />
        <div className="absolute -top-20 left-[20%] rounded-full" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)' }} />
        {/* Grain */}
        <div className="absolute inset-0 z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Link href="/careers" className="text-foreground-muted hover:text-foreground mb-4 inline-flex items-center gap-1 transition-colors" data-jh="back">
          &larr; Back to Careers
        </Link>

        <div data-jh="badge">
          <Badge className="mb-4 block w-fit" data-testid="job-department-badge">{job.department}</Badge>
        </div>

        <h1 id="job-title" data-jh="title" className="leading-[0.9] tracking-[-0.04em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
          {job.title}
        </h1>

        <div className="flex flex-wrap gap-4 mt-4" data-testid="job-meta">
          {[
            { icon: MapPin, text: job.location },
            { icon: Briefcase, text: job.type },
            { icon: BarChart3, text: job.experience },
          ].map(({ icon: Icon, text }) => (
            <span key={text} data-jh="meta" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/[0.08] text-sm text-foreground-muted" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Icon className="w-4 h-4 text-coral-400" aria-hidden="true" />{text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Main Content ─────────────────────────────────────── */
function JobContent({ job, slug, benefits }: { job: JobDetail; slug: string; benefits: string[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-jc]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        // Stagger each content block
        gsap.fromTo(section.querySelectorAll('[data-jc]'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        })
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-8 bg-background" aria-labelledby="about-role-heading">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div data-testid="job-description" data-jc>
              <h2 id="about-role-heading" className="text-2xl font-bold mb-4">About This Role</h2>
              <div className="prose prose-invert max-w-none">
                {job.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground-muted mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div data-testid="job-requirements" data-jc>
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <GSAPStaggerContainer className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <GSAPStaggerItem key={index}>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-coral-400 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span className="text-foreground-muted">{requirement}</span>
                    </div>
                  </GSAPStaggerItem>
                ))}
              </GSAPStaggerContainer>
            </div>

            {/* Responsibilities */}
            <div data-testid="job-responsibilities" data-jc>
              <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
              <GSAPStaggerContainer className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <GSAPStaggerItem key={index}>
                    <div className="flex items-start gap-3">
                      <span className="text-coral-400" aria-hidden="true">&bull;</span>
                      <span className="text-foreground-muted">{responsibility}</span>
                    </div>
                  </GSAPStaggerItem>
                ))}
              </GSAPStaggerContainer>
            </div>

            {/* Tech Stack */}
            {job.techStack && job.techStack.length > 0 && (
              <div data-testid="job-tech-stack" data-jc>
                <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                <GSAPStaggerContainer className="flex flex-wrap gap-2">
                  {job.techStack.map((tech) => (
                    <GSAPStaggerItem key={tech}>
                      <span
                        data-testid="tech-badge"
                        className="inline-block px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/[0.08] text-sm text-foreground-muted transition-all duration-300 hover:border-coral-500/20 hover:text-foreground"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        {tech}
                      </span>
                    </GSAPStaggerItem>
                  ))}
                </GSAPStaggerContainer>
              </div>
            )}
          </div>

          {/* Sidebar — glassmorphic sticky card */}
          <div className="lg:col-span-1" data-jc>
            <div className="sticky top-24 rounded-2xl p-6 backdrop-blur-xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <h3 className="font-semibold mb-4">Ready to Apply?</h3>
              <p className="text-sm text-foreground-muted mb-6">
                Submit your application and we&apos;ll get back to you within a week.
              </p>
              <Button asChild size="lg" className="w-full mb-6 bg-coral-500 hover:bg-coral-600 text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]">
                <Link href={`/careers/${slug}/apply`}>Apply Now</Link>
              </Button>

              <div className="border-t border-white/[0.08] pt-6">
                <h4 className="font-semibold mb-3">Why Join Invenex?</h4>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-coral-400 flex-shrink-0" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link href="/careers#benefits" className="text-sm text-coral-400 hover:underline mt-3 inline-block">
                  Learn more about our benefits &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
