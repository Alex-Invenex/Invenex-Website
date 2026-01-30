'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number // 0.3-0.7 typical, lower = slower
  backgroundImage?: string
  backgroundClassName?: string
}

/**
 * Depth layer configuration for multi-layer parallax
 */
export type DepthLayer = 'foreground' | 'midground' | 'background'

const depthSpeeds: Record<DepthLayer, number> = {
  foreground: 1.0,
  midground: 0.7,
  background: 0.3,
}

const depthZIndex: Record<DepthLayer, number> = {
  foreground: 10,
  midground: 5,
  background: 0,
}

/**
 * ParallaxSection - GSAP ScrollTrigger-powered parallax background effect
 *
 * Uses dynamic import for GSAP to avoid bundle bloat.
 * Automatically disabled when user prefers reduced motion.
 *
 * @param speed - Parallax speed ratio (0.3-0.7 recommended)
 * @param backgroundImage - URL for background image
 */
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  backgroundImage,
  backgroundClassName,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let ctx: { revert: () => void } | null = null

    // Dynamic import GSAP only when needed
    const initParallax = async () => {
      try {
        const { gsap, registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        if (!containerRef.current || !backgroundRef.current) {
          return
        }

        // Create GSAP context for proper cleanup
        ctx = gsap.context(() => {
          gsap.to(backgroundRef.current, {
            yPercent: -30 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }, containerRef)
      } catch (error) {
        console.error('Failed to initialize parallax:', error)
      }
    }

    initParallax()

    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      data-parallax
      className={cn('relative overflow-hidden', className)}
    >
      {backgroundImage && (
        <div
          ref={backgroundRef}
          data-parallax-bg
          className={cn(
            'absolute inset-0 -top-[20%] -bottom-[20%] bg-cover bg-center will-change-transform',
            backgroundClassName
          )}
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * ParallaxLayer - For multi-layer parallax effects
 * Renders a layer with independent parallax speed
 */
interface ParallaxLayerProps {
  children?: React.ReactNode
  className?: string
  speed?: number
  zIndex?: number
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
  zIndex = 0,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx: { revert: () => void } | null = null

    const initLayer = async () => {
      try {
        const { gsap, registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        if (!layerRef.current) return

        ctx = gsap.context(() => {
          gsap.to(layerRef.current, {
            yPercent: -20 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: layerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }, layerRef)
      } catch (error) {
        console.error('Failed to initialize parallax layer:', error)
      }
    }

    initLayer()

    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
  }, [speed])

  return (
    <div
      ref={layerRef}
      data-parallax-layer
      className={cn('will-change-transform', className)}
      style={{ zIndex }}
    >
      {children}
    </div>
  )
}

/**
 * ParallaxBackground - Multi-layer parallax system for depth effects
 *
 * Provides a structured way to create layered parallax with foreground,
 * midground, and background depths moving at different speeds.
 *
 * Depth speeds:
 * - foreground: 1.0 (normal scroll)
 * - midground: 0.7 (slightly slower)
 * - background: 0.3 (much slower)
 */
interface ParallaxBackgroundLayer {
  element: React.ReactNode
  depth: DepthLayer
  className?: string
}

interface ParallaxBackgroundProps {
  children: React.ReactNode
  layers?: ParallaxBackgroundLayer[]
  className?: string
}

export function ParallaxBackground({
  children,
  layers = [],
  className,
}: ParallaxBackgroundProps) {
  // Initialize with SSR-safe default, then sync with actual preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Subscribe to preference changes only
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <div className={cn('relative', className)} data-testid="parallax-background">
      {/* Render layers with their respective parallax speeds */}
      {layers.map((layer, i) => (
        <ParallaxLayer
          key={i}
          speed={prefersReducedMotion ? 0 : depthSpeeds[layer.depth]}
          zIndex={depthZIndex[layer.depth]}
          className={cn('absolute inset-0', layer.className)}
        >
          {layer.element}
        </ParallaxLayer>
      ))}

      {/* Main content - foreground at normal speed */}
      <div className="relative" style={{ zIndex: depthZIndex.foreground + 1 }}>
        {children}
      </div>
    </div>
  )
}
