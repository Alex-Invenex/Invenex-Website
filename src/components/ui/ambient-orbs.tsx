'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface OrbConfig {
  id: string
  top: string
  left?: string
  right?: string
  size: number
  color: 'purple' | 'blue' | 'coral'
  speed: number
  blur: number
  opacity: number
}

// Default orb configurations spanning page sections
// AC1 specifies: "Subtle parallax effect on scroll (0.1-0.3 speed ratio)"
const defaultOrbs: OrbConfig[] = [
  // Top-left orb (Hero → Services overlap)
  { id: 'orb-1', top: '5%', left: '10%', size: 900, color: 'purple', speed: 0.15, blur: 180, opacity: 0.06 },
  // Top-right orb (Services area)
  { id: 'orb-2', top: '25%', right: '5%', size: 700, color: 'blue', speed: 0.25, blur: 150, opacity: 0.05 },
  // Middle-left orb (Portfolio → Products overlap)
  { id: 'orb-3', top: '45%', left: '15%', size: 800, color: 'purple', speed: 0.2, blur: 200, opacity: 0.05 },
  // Middle-right orb (WhyChooseUs area)
  { id: 'orb-4', top: '60%', right: '10%', size: 600, color: 'coral', speed: 0.3, blur: 160, opacity: 0.04 },
  // Bottom orb (Testimonials → CTA overlap)
  { id: 'orb-5', top: '80%', left: '25%', size: 750, color: 'blue', speed: 0.22, blur: 170, opacity: 0.05 },
]

interface AmbientOrbsProps {
  orbs?: OrbConfig[]
  className?: string
}

/**
 * AmbientOrbs - Page-level gradient orbs that span across multiple sections
 *
 * Creates visual continuity by positioning large, blurred gradient orbs
 * at the page level, crossing section boundaries.
 *
 * Features:
 * - Parallax scroll effect on each orb
 * - GPU-accelerated transforms
 * - Respects prefers-reduced-motion
 * - Pointer-events: none for click-through
 */
export function AmbientOrbs({ orbs = defaultOrbs, className }: AmbientOrbsProps) {
  // Initialize with SSR-safe default, then sync with actual preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  // Subscribe to preference changes only
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // Initialize parallax for each orb
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return

    let ctx: { revert: () => void } | null = null

    const initParallax = async () => {
      try {
        const { gsap, registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        if (!containerRef.current) return

        ctx = gsap.context(() => {
          orbRefs.current.forEach((orbEl, i) => {
            if (!orbEl) return
            const orb = orbs[i]
            if (!orb) return

            gsap.to(orbEl, {
              yPercent: -30 * orb.speed,
              ease: 'none',
              scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5, // Smooth scrubbing
              },
            })
          })
        }, containerRef)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to initialize ambient orbs parallax:', error)
        }
      }
    }

    initParallax()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [orbs, prefersReducedMotion])

  const getColorClass = (color: OrbConfig['color']) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500'
      case 'blue':
        return 'bg-blue-500'
      case 'coral':
        return 'bg-coral-500'
      default:
        return 'bg-purple-500'
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 pointer-events-none overflow-hidden',
        className
      )}
      style={{ zIndex: -1 }}
      aria-hidden="true"
      data-testid="ambient-orbs"
    >
      {orbs.map((orb, index) => (
        <div
          key={orb.id}
          ref={(el) => { orbRefs.current[index] = el }}
          className={cn(
            'absolute rounded-full will-change-transform',
            getColorClass(orb.color)
          )}
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            width: orb.size,
            height: orb.size,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
          }}
          data-testid={`ambient-orb-${orb.id}`}
          data-orb-color={orb.color}
          data-orb-speed={orb.speed}
        />
      ))}
    </div>
  )
}
