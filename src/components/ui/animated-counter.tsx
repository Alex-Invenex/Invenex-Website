'use client'

import { useRef, useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/**
 * AnimatedCounter — Scroll-triggered number count-up.
 *
 * Uses GSAP ScrollTrigger to animate from 0 to target value
 * when the element enters the viewport. Respects reduced motion.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const elRef = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(String(value))
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el || hasAnimated.current) return

    // Reduced motion: show final value immediately (already default)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap, registerScrollTrigger } = await import('@/lib/gsap')
      await registerScrollTrigger()

      if (!el || hasAnimated.current) return

      // Only set to 0 right before creating the animation
      // so the value doesn't flash "0" if GSAP fails to load
      setDisplayed('0')

      ctx = gsap.context(() => {
        const proxy = { v: 0 }
        gsap.to(proxy, {
          v: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayed(String(Math.round(proxy.v)))
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          // Fallback: ensure final value is shown even if ScrollTrigger doesn't fire
          onComplete: () => {
            setDisplayed(String(value))
          },
        })
      })
      hasAnimated.current = true
    }

    init()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [value, duration])

  return (
    <span ref={elRef} className={className}>
      {prefix}{displayed}{suffix}
    </span>
  )
}
