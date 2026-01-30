'use client'

import { useRef, useEffect, useState, Children, cloneElement, isValidElement, type ReactElement } from 'react'
import { cn } from '@/lib/utils'

interface GSAPStaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number // seconds (50-100ms = 0.05-0.1)
  fromVars?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
  }
  threshold?: number // viewport trigger threshold (0-1)
}

/**
 * GSAPStaggerContainer - High-performance staggered entrance animations
 *
 * Uses GSAP ScrollTrigger for better performance than Framer Motion
 * when animating many items (>6). Children must use data-stagger-item
 * attribute or use GSAPStaggerItem component.
 *
 * Automatically disabled when user prefers reduced motion.
 *
 * @param staggerDelay - Delay between each item (default: 0.08s = 80ms)
 * @param fromVars - Starting animation values
 * @param threshold - When to trigger (0 = top of viewport, 1 = bottom)
 */
export function GSAPStaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  fromVars = { opacity: 0, y: 30 },
  threshold = 0.8, // Trigger when 80% visible
}: GSAPStaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      // Make all children visible immediately
      const items = containerRef.current?.querySelectorAll('[data-stagger-item]')
      items?.forEach((item) => {
        const el = item as HTMLElement
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    let ctx: { revert: () => void } | null = null

    const initStagger = async () => {
      try {
        const { gsap, registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        if (!containerRef.current) {
          return
        }

        const items = containerRef.current.querySelectorAll('[data-stagger-item]')
        if (items.length === 0) {
          return
        }

        ctx = gsap.context(() => {
          gsap.from(items, {
            ...fromVars,
            stagger: staggerDelay,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top ${threshold * 100}%`,
              once: true,
            },
          })
        }, containerRef)
      } catch (error) {
        console.error('Failed to initialize GSAP stagger:', error)
        // Fallback: make items visible
        const items = containerRef.current?.querySelectorAll('[data-stagger-item]')
        items?.forEach((item) => {
          const el = item as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }

    initStagger()

    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
  }, [staggerDelay, fromVars, threshold])

  // If reduced motion, render children without opacity-0 class
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} data-gsap-stagger className={cn(className)}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const props = child.props as Record<string, unknown>
            if (props['data-stagger-item'] !== undefined) {
              return cloneElement(child as ReactElement<{ className?: string; style?: React.CSSProperties }>, {
                style: { ...(props.style as React.CSSProperties | undefined), opacity: 1, transform: 'none' },
              })
            }
          }
          return child
        })}
      </div>
    )
  }

  return (
    <div ref={containerRef} data-gsap-stagger className={cn(className)}>
      {children}
    </div>
  )
}

/**
 * GSAPStaggerItem - Wrapper for items inside GSAPStaggerContainer
 *
 * Starts hidden and animates when container triggers via GSAP.
 * With reduced motion, renders fully visible immediately.
 * SSR-safe: renders visible on server, hides client-side only when animation is ready.
 */
interface GSAPStaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function GSAPStaggerItem({
  children,
  className,
}: GSAPStaggerItemProps) {
  const [shouldHide, setShouldHide] = useState(false)

  useEffect(() => {
    // Defer state update to avoid ESLint warning about setState in effect
    // Using requestAnimationFrame ensures we're past the synchronous render phase
    const rafId = requestAnimationFrame(() => {
      if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        // Only hide items if user doesn't prefer reduced motion
        setShouldHide(!prefersReducedMotion)
      }
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  // On server or with reduced motion: render visible (shouldHide = false)
  // On client with animations: render hidden (GSAP will animate in)
  return (
    <div
      data-stagger-item
      className={cn(shouldHide && 'opacity-0', className)}
    >
      {children}
    </div>
  )
}
