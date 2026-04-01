'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from '@/lib/gsap'

function CharRevealText({
  text,
  className,
  gradient = false,
}: {
  text: string
  className?: string
  gradient?: boolean
}) {
  // Group characters by word with nowrap wrappers to prevent mid-word breaks.
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi}>
          {wi > 0 && <span data-schar style={{ opacity: 0.1 }}>{' '}</span>}
          <span style={{ whiteSpace: 'nowrap' }}>
            {word.split('').map((char, ci) => (
              <span
                key={ci}
                data-schar
                className={gradient ? 'text-gradient-orange' : undefined}
                style={{ opacity: 0.1 }}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

interface SubpageCTAProps {
  headline?: string
  highlightedText?: string
  subtitle?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

/**
 * SubpageCTA — Reusable CTA section with character-by-character scroll scrub,
 * mouse-tracking coral spotlight, and grid overlay zoom.
 *
 * Drop-in replacement for basic CTA sections across all subpages.
 */
export function SubpageCTA({
  headline = "LET'S BUILD",
  highlightedText = 'SOMETHING EPIC',
  subtitle = "Ready to stand out? Let's create something that makes an impact.",
  primaryCTA = { label: 'Start a Project', href: '/contact' },
  secondaryCTA = { label: 'View Our Work', href: '/portfolio' },
}: SubpageCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Character reveal on scroll
  useGSAP(
    () => {
      if (shouldSkipAnimations()) {
        gsap.set('[data-schar]', { opacity: 1 })
        gsap.set('[data-scta-content]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        const chars = section.querySelectorAll('[data-schar]')

        // Character-by-character scrub reveal
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        })

        // CTAs fade in after text reveals
        gsap.fromTo(
          section.querySelectorAll('[data-scta-content]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'center 55%',
            },
          }
        )

        // Grid zoom on scroll
        gsap.fromTo(
          section.querySelector('[data-scta-grid]'),
          { scale: 1, opacity: 0.015 },
          {
            scale: 1.15,
            opacity: 0.03,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          }
        )
      }
      init()
    },
    { scope: sectionRef }
  )

  // Mouse-tracking coral spotlight
  useEffect(() => {
    if (shouldSkipAnimations()) return
    const section = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    const moveX = gsap.quickTo(spotlight, 'x', {
      duration: 0.6,
      ease: 'power3',
    })
    const moveY = gsap.quickTo(spotlight, 'y', {
      duration: 0.6,
      ease: 'power3',
    })

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      moveX(e.clientX - rect.left - 300)
      moveY(e.clientY - rect.top - 300)
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 lg:py-44 bg-background relative overflow-hidden"
      aria-labelledby="subpage-cta-title"
    >
      {/* Static coral gradient orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px]" style={{ width: 1000, height: 1000, background: 'rgba(255,106,55,0.06)' }} />
      </div>

      {/* Mouse-tracking spotlight */}
      <div
        ref={spotlightRef}
        className="absolute pointer-events-none opacity-40"
        style={{
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
          left: 0,
          top: 0,
        }}
      />

      {/* Grid overlay with zoom */}
      <div
        data-scta-grid
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.015,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Monospace label */}
          <p className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-8 text-center md:text-left font-mono">
            Let&apos;s Talk
          </p>

          {/* Character reveal headline */}
          <h2
            id="subpage-cta-title"
            className="leading-[0.9] text-center md:text-left mb-12"
            style={{
              fontSize: 'clamp(1.75rem, 7vw, 7rem)',
              letterSpacing: '-0.04em',
            }}
          >
            <span className="block" style={{ fontWeight: 200 }}>
              <CharRevealText text={headline} />
            </span>
            <span className="block" style={{ fontWeight: 900 }}>
              <CharRevealText text={highlightedText + '.'} gradient />
            </span>
          </h2>

          {/* Subtext and CTAs */}
          <div
            data-scta-content
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p className="text-lg md:text-xl text-foreground-muted max-w-md text-center md:text-left">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-end gap-4">
              <Button
                asChild
                size="lg"
                className="bg-coral-500 hover:bg-coral-600 text-white rounded-full px-8 shadow-[0_0_20px_rgba(255,106,55,0.3)] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
              >
                <Link href={primaryCTA.href} className="group">
                  {primaryCTA.label}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {secondaryCTA && (
                <Button asChild variant="ghost" size="lg">
                  <Link
                    href={secondaryCTA.href}
                    className="group text-foreground-muted hover:text-foreground"
                  >
                    {secondaryCTA.label}
                    <ArrowRight className="ml-2 w-5 h-5 text-coral-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
