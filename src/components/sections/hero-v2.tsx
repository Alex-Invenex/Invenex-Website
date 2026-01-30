'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * HeroV2 - Stokt-Inspired Hero with Massive Typography
 *
 * Design Philosophy:
 * - Typography IS the hero element
 * - Headlines fill the viewport
 * - Minimal decoration, maximum impact
 * - Text animates character-by-character
 */
export function HeroV2() {
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPrefersReducedMotion(reducedMotion)
    setIsMounted(true)
  }, [])

  const skipAnimations = !isMounted || prefersReducedMotion

  // Stats data
  const stats = [
    { value: '50+', label: 'Projects' },
    { value: '5+', label: 'Years' },
    { value: '98%', label: 'Satisfaction' },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
      aria-labelledby="hero-title"
      data-testid="hero-section"
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-500/[0.07] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-16">
        {/* Small intro text */}
        <p
          className={cn(
            'text-foreground-muted text-sm md:text-base tracking-wide mb-6',
            skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
          )}
          style={{ animationDelay: '0ms' }}
        >
          ( WE ARE INVENEX )
        </p>

        {/* MASSIVE HEADLINE - Stokt-inspired viewport-filling typography */}
        <h1
          id="hero-title"
          className={cn(
            'font-bold leading-[0.85]',
            skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
          )}
          style={{
            fontSize: 'clamp(4rem, 12vw, 12rem)',
            letterSpacing: '-0.04em',
            animationDelay: skipAnimations ? '0ms' : '100ms',
          }}
        >
          <span className="block">BUILDING</span>
          <span className="block">DIGITAL</span>
          <span className="block text-gradient">EXCELLENCE</span>
        </h1>

        {/* Subtext - positioned to the right on desktop */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p
            className={cn(
              'text-lg md:text-xl text-foreground-muted max-w-md leading-relaxed',
              skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
            )}
            style={{ animationDelay: skipAnimations ? '0ms' : '300ms' }}
          >
            We craft premium web experiences, mobile apps, and digital solutions
            for businesses that refuse to blend in.
          </p>

          {/* Stats - compact horizontal layout */}
          <div
            className={cn(
              'flex gap-8 md:gap-12',
              skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
            )}
            style={{ animationDelay: skipAnimations ? '0ms' : '400ms' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-right">
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm text-foreground-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={cn(
            'mt-12 md:mt-16 flex flex-col sm:flex-row items-start gap-4',
            skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
          )}
          style={{ animationDelay: skipAnimations ? '0ms' : '500ms' }}
        >
          <Button asChild size="lg" data-testid="hero-cta-primary">
            <Link href="/contact" className="group">
              Start a Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" data-testid="hero-cta-secondary">
            <Link href="/portfolio" className="group">
              View Our Work
              <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom section with scroll hint */}
      <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end">
        <p
          className={cn(
            'text-xs text-foreground-muted tracking-wide hidden md:block',
            skipAnimations ? 'opacity-100' : 'animate-fade-in'
          )}
          style={{ animationDelay: skipAnimations ? '0ms' : '700ms' }}
        >
          Scroll for more
        </p>

        {/* Scroll indicator */}
        <div
          className={cn(
            'hidden md:flex items-center gap-2',
            skipAnimations ? 'opacity-100' : 'animate-fade-in'
          )}
          style={{ animationDelay: skipAnimations ? '0ms' : '700ms' }}
          aria-hidden="true"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-white/50" />
        </div>
      </div>
    </section>
  )
}

// Re-export as Hero for backwards compatibility
export { HeroV2 as Hero }
