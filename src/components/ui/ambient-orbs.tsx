'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { shouldSkipAnimations } from '@/lib/gsap'

interface OrbConfig {
  id: string
  top: string
  left?: string
  right?: string
  size: number
  color: 'coral' | 'coral-subtle'
  speed: number
  blur: number
  opacity: number
}

// Default orb configurations spanning page sections
// AC1 specifies: "Subtle parallax effect on scroll (0.1-0.3 speed ratio)"
const defaultOrbs: OrbConfig[] = [
  // Top-left orb (Hero → Services overlap)
  { id: 'orb-1', top: '5%', left: '10%', size: 900, color: 'coral-subtle', speed: 0.15, blur: 180, opacity: 0.04 },
  // Top-right orb (Services area)
  { id: 'orb-2', top: '25%', right: '5%', size: 700, color: 'coral', speed: 0.25, blur: 150, opacity: 0.05 },
  // Middle-left orb (Portfolio → Products overlap)
  { id: 'orb-3', top: '45%', left: '15%', size: 800, color: 'coral-subtle', speed: 0.2, blur: 200, opacity: 0.04 },
  // Middle-right orb (WhyChooseUs area)
  { id: 'orb-4', top: '60%', right: '10%', size: 600, color: 'coral', speed: 0.3, blur: 160, opacity: 0.04 },
  // Bottom orb (Testimonials → CTA overlap)
  { id: 'orb-5', top: '80%', left: '25%', size: 750, color: 'coral', speed: 0.22, blur: 170, opacity: 0.05 },
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
 * Hidden on mobile/touch devices — the large blur filters (150-200px) are
 * extremely expensive for mobile GPU compositing and the subtle effect
 * (opacity 0.04-0.05) is barely visible on small screens.
 */
export function AmbientOrbs({ orbs = defaultOrbs, className }: AmbientOrbsProps) {
  const [hidden, setHidden] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  // Check if we should skip on mount
  useEffect(() => {
    if (shouldSkipAnimations()) {
      setHidden(true)
    }
  }, [])

  // Initialize parallax for each orb (desktop only)
  useEffect(() => {
    if (hidden || typeof window === 'undefined') return

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
                scrub: 1.5,
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
  }, [orbs, hidden])

  // Don't render on mobile — saves GPU compositing of 5 large blur elements
  if (hidden) return null

  const getColorClass = (color: OrbConfig['color']) => {
    switch (color) {
      case 'coral':
        return 'bg-coral-500'
      case 'coral-subtle':
        return 'bg-coral-300'
      default:
        return 'bg-coral-500'
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
