'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/ui/animated-text'
import { useMouseParallax, useMousePosition } from '@/hooks/use-mouse-parallax'
import { useHeroScrollFade } from '@/hooks/use-hero-scroll-fade'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * HeroV2 - Enhanced Hero Section with Interactive Effects
 *
 * Features:
 * - Mouse parallax on floating orbs (3 depth layers)
 * - Cursor-following gradient background
 * - Character-split headline animation
 * - Staggered entrance animations
 * - Scroll-linked fade out
 * - Mobile-optimized (no mouse tracking)
 * - Accessibility (reduced motion support)
 */
export function HeroV2() {
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Mouse parallax for floating orbs (different depths)
  const layer1 = useMouseParallax({ depth: 0.02, disabled: isTouchDevice })
  const layer2 = useMouseParallax({ depth: 0.035, disabled: isTouchDevice })
  const layer3 = useMouseParallax({ depth: 0.05, disabled: isTouchDevice })

  // Mouse position for gradient (percentage-based)
  const mousePos = useMousePosition()

  // Scroll-linked fade
  const heroRef = useHeroScrollFade<HTMLElement>({
    fadeEnd: 0.7,
    minOpacity: 0,
    minScale: 0.95,
  })

  // Client-side checks - using layout effect pattern for immediate hydration
  useEffect(() => {
    // Check device and motion preferences
    const checkDeviceAndMotion = () => {
      if (typeof window === 'undefined') return

      const touchDevice = window.matchMedia('(hover: none)').matches
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setIsTouchDevice(touchDevice)
      setPrefersReducedMotion(reducedMotion)
      setIsMounted(true)
    }

    checkDeviceAndMotion()
  }, [])

  // Stats data
  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Support Available' },
  ]

  // Determine if animations should be instant
  const skipAnimations = !isMounted || prefersReducedMotion

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      data-testid="hero-section"
    >
      {/* Cursor-following gradient background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: isTouchDevice
            ? 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.12), transparent 50%)'
            : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.15), transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Animated gradient orbs with parallax */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Primary gradient orb - Layer 1 (subtle) */}
        <div
          className={cn(
            'absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px]',
            !isTouchDevice && 'transition-transform duration-100 ease-out'
          )}
          style={{
            transform: !isTouchDevice
              ? `translate(${layer1.x}px, ${layer1.y}px)`
              : undefined,
          }}
          data-testid="parallax-orb-1"
        />

        {/* Secondary gradient orb - Layer 2 (medium) */}
        <div
          className={cn(
            'absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]',
            !isTouchDevice && 'transition-transform duration-100 ease-out'
          )}
          style={{
            transform: !isTouchDevice
              ? `translate(${layer2.x}px, ${layer2.y}px)`
              : undefined,
          }}
          data-testid="parallax-orb-2"
        />

        {/* Accent gradient orb - Layer 3 (strong) */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px]',
            !isTouchDevice && 'transition-transform duration-100 ease-out'
          )}
          style={{
            transform: !isTouchDevice
              ? `translate(calc(-50% + ${layer3.x}px), calc(-50% + ${layer3.y}px))`
              : 'translate(-50%, -50%)',
          }}
          data-testid="parallax-orb-3"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />

      {/* Floating decorative elements with parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className={cn(
            'absolute top-20 right-20 w-20 h-20 rounded-2xl',
            'bg-gradient-to-br from-purple-500/20 to-blue-500/20',
            'backdrop-blur-sm border border-white/10',
            isTouchDevice ? 'animate-float' : 'transition-transform duration-200 ease-out'
          )}
          style={{
            transform: !isTouchDevice
              ? `translate(${layer2.x * 1.5}px, ${layer2.y * 1.5}px)`
              : undefined,
          }}
        />
        <div
          className={cn(
            'absolute bottom-32 left-20 w-16 h-16 rounded-xl',
            'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
            'backdrop-blur-sm border border-white/10',
            isTouchDevice ? 'animate-float-delayed' : 'transition-transform duration-200 ease-out'
          )}
          style={{
            transform: !isTouchDevice
              ? `translate(${layer3.x * 1.2}px, ${layer3.y * 1.2}px)`
              : undefined,
          }}
        />
        <div
          className={cn(
            'absolute top-40 left-1/4 w-12 h-12 rounded-lg',
            'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
            'backdrop-blur-sm border border-white/10',
            isTouchDevice ? 'animate-float-slow' : 'transition-transform duration-200 ease-out'
          )}
          style={{
            transform: !isTouchDevice
              ? `translate(${layer1.x * 2}px, ${layer1.y * 2}px)`
              : undefined,
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full',
            'bg-white/5 border border-white/10 backdrop-blur-sm mb-8',
            skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
          )}
          style={{ animationDelay: '0ms' }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-foreground-muted">
            Crafting Digital Excellence Since 2020
          </span>
        </div>

        {/* Animated Headline */}
        <h1 id="hero-title" className="text-5xl md:text-7xl lg:text-hero font-bold tracking-tight">
          <AnimatedText
            as="span"
            splitBy="chars"
            delay={0.2}
            duration={0.4}
            stagger={0.025}
            disabled={skipAnimations}
            className="block"
          >
            We Build
          </AnimatedText>
          <br />
          <AnimatedText
            as="span"
            splitBy="chars"
            delay={0.5}
            duration={0.4}
            stagger={0.025}
            disabled={skipAnimations}
            className="text-gradient"
          >
            Digital Excellence
          </AnimatedText>
        </h1>

        {/* Subtext - fades up after headline */}
        <p
          className={cn(
            'mt-6 text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto leading-relaxed',
            skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
          )}
          style={{ animationDelay: skipAnimations ? '0ms' : '800ms' }}
        >
          Premium web development, mobile apps, and digital solutions for
          businesses that demand the{' '}
          <span className="text-foreground font-medium">best</span>.
        </p>

        {/* CTA Buttons - scale in with bounce */}
        <div
          className={cn(
            'mt-10 flex flex-col sm:flex-row items-center justify-center gap-4',
            skipAnimations ? 'opacity-100' : 'animate-scale-in-bounce'
          )}
          style={{ animationDelay: skipAnimations ? '0ms' : '1000ms' }}
        >
          <Button asChild size="lg" data-testid="hero-cta-primary">
            <Link href="/contact" className="group">
              Get a Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" data-testid="hero-cta-secondary">
            <Link href="/portfolio">View Our Work</Link>
          </Button>
        </div>

        {/* Stats - staggered entrance */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'text-center',
                skipAnimations ? 'opacity-100' : 'animate-fade-in-up'
              )}
              style={{
                animationDelay: skipAnimations ? '0ms' : `${1200 + index * 100}ms`,
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-sm text-foreground-muted mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2',
          skipAnimations ? 'opacity-100' : 'animate-fade-in'
        )}
        style={{ animationDelay: skipAnimations ? '0ms' : '1600ms' }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  )
}

// Re-export as Hero for backwards compatibility
export { HeroV2 as Hero }
