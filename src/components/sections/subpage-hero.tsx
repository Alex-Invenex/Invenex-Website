'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

interface SubpageHeroProps {
  tag: string
  headline: ReactNode
  subtitle?: string
  children?: ReactNode
  variant?: 'centered' | 'left-aligned'
  id?: string
}

/**
 * SubpageHero — Premium hero section for subpages.
 *
 * Matches homepage hero-v2 design language:
 * grain texture, atmospheric orbs, grid overlay,
 * GSAP entrance choreography, scroll-out parallax.
 */
export function SubpageHero({
  tag,
  headline,
  subtitle,
  children,
  variant = 'left-aligned',
  id,
}: SubpageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    setMounted(true)
  }, [])

  /* ── Entrance choreography ─────────────────────────────── */
  useGSAP(
    () => {
      if (!mounted) return
      const rm = reducedMotion.current

      if (rm) {
        gsap.set('[data-sh]', {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'none',
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Background orbs fade + scale
      tl.fromTo(
        '[data-sh="orb"]',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, stagger: 0.1 },
        0
      )

      // Monospace tag — blur-in from left
      tl.fromTo(
        '[data-sh="tag"]',
        { opacity: 0, x: -40, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8 },
        0.15
      )

      // Headline words — dramatic reveal from below
      tl.fromTo(
        '[data-sh="word"]',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power4.out',
        },
        0.25
      )

      // Subtitle border grows, then text slides in
      tl.fromTo(
        '[data-sh="border"]',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, transformOrigin: 'top' },
        0.85
      )
      tl.fromTo(
        '[data-sh="desc"]',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        0.95
      )

      // Children stagger in
      tl.fromTo(
        '[data-sh="child"]',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        1.1
      )

      // ── Scroll-out parallax ──
      const initScrollOut = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        gsap.fromTo(
          '[data-sh="tag"], [data-sh="word"], [data-sh="border"], [data-sh="desc"], [data-sh="child"]',
          { y: 0, opacity: 1 },
          {
            y: -20,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: '80% center',
              end: 'bottom -30%',
              scrub: 1,
            },
          }
        )
      }
      initScrollOut()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  const isCentered = variant === 'centered'

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60dvh] md:min-h-[70dvh] flex flex-col justify-center bg-background pt-24 pb-12 md:pb-16"
      style={{ overflow: 'clip' }}
      aria-labelledby={id}
    >
      {/* ─ Grain texture overlay ─ */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      {/* ─ Background atmosphere ─ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary coral radiance */}
        <div
          data-sh="orb"
          className="absolute top-[15%] right-[5%] rounded-full opacity-0 will-change-transform"
          style={{
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle, rgba(255,106,55,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Secondary inner glow */}
        <div
          data-sh="orb"
          className="absolute top-[25%] right-[12%] rounded-full opacity-0 will-change-transform"
          style={{
            width: 400,
            height: 400,
            background:
              'radial-gradient(circle, rgba(255,106,55,0.12) 0%, transparent 60%)',
          }}
        />
        {/* Subtle purple accent — top left */}
        <div
          data-sh="orb"
          className="absolute -top-20 left-[20%] rounded-full opacity-0"
          style={{
            width: 400,
            height: 400,
            background:
              'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          }}
        />
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ─ Main content ─ */}
      <div
        className={`container mx-auto px-6 md:px-12 relative z-10 ${
          isCentered ? 'text-center' : ''
        }`}
      >
        <div className={isCentered ? 'max-w-4xl mx-auto' : 'max-w-4xl'}>
          {/* Monospace tag */}
          <p
            data-sh="tag"
            className="text-foreground-muted text-xs md:text-sm tracking-[0.2em] uppercase mb-8 font-mono"
          >
            {tag}
          </p>

          {/* Headline — passed as ReactNode for weight control */}
          <h1
            id={id}
            className="leading-[0.85] tracking-[-0.04em]"
          >
            {headline}
          </h1>

          {/* Subtitle with coral accent border */}
          {subtitle && (
            <div className={`mt-8 md:mt-10 flex ${isCentered ? 'justify-center' : ''}`}>
              <div
                data-sh="border"
                className="w-0.5 min-h-[3rem] bg-coral-500 shrink-0"
                style={{ transform: 'scaleY(0)' }}
              />
              <p
                data-sh="desc"
                className={`pl-4 md:pl-5 text-base md:text-lg lg:text-xl text-foreground-muted max-w-lg leading-relaxed ${
                  isCentered ? 'text-left' : ''
                }`}
              >
                {subtitle}
              </p>
            </div>
          )}

          {/* Children (CTAs, badges, etc.) */}
          {children && (
            <div data-sh="child" className="mt-10 md:mt-12">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * HeadlineWord — helper component for dramatic weight-contrast headlines.
 *
 * Usage:
 * ```tsx
 * <SubpageHero headline={<>
 *   <HeadlineWord thin>BUILDING THE</HeadlineWord>
 *   <HeadlineWord coral>FUTURE</HeadlineWord>
 * </>} />
 * ```
 */
export function HeadlineWord({
  children,
  thin = false,
  coral = false,
}: {
  children: ReactNode
  thin?: boolean
  coral?: boolean
}) {
  return (
    <span
      data-sh="word"
      className={`block will-change-transform ${
        coral ? '' : thin ? 'text-foreground/50' : 'text-foreground'
      }`}
      style={{
        fontSize: thin
          ? 'clamp(1.8rem, 4vw, 3.5rem)'
          : 'clamp(3rem, 6.5vw, 6.5rem)',
        fontWeight: thin ? 200 : 900,
        ...(coral
          ? {
              background:
                'linear-gradient(135deg, var(--color-coral-500) 0%, var(--color-coral-400) 40%, var(--color-coral-600) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          : {}),
      }}
    >
      {children}
    </span>
  )
}
