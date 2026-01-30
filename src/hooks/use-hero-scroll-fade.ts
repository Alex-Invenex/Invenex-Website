'use client'

import { useRef, useEffect, useState, RefObject } from 'react'

interface UseHeroScrollFadeOptions {
  fadeStart?: number // When fade starts (0 = top of viewport, default)
  fadeEnd?: number // When fade completes (as ratio of hero height, default 0.8)
  minOpacity?: number // Minimum opacity to fade to (default 0)
  minScale?: number // Minimum scale to shrink to (default 0.95)
  disabled?: boolean // Explicitly disable the effect
}

/**
 * useHeroScrollFade - Scroll-linked fade and scale effect for hero sections
 *
 * Creates an immersive effect where the hero fades out and slightly scales down
 * as the user scrolls past it. Uses GSAP ScrollTrigger for smooth performance.
 *
 * @returns ref - Attach to the hero element
 *
 * @example
 * ```tsx
 * function HeroSection() {
 *   const heroRef = useHeroScrollFade()
 *   return <section ref={heroRef}>...</section>
 * }
 * ```
 */
export function useHeroScrollFade<T extends HTMLElement = HTMLDivElement>(
  options: UseHeroScrollFadeOptions = {}
): RefObject<T | null> {
  const {
    fadeStart = 0,
    fadeEnd = 0.8,
    minOpacity = 0,
    minScale = 0.95,
    disabled = false,
  } = options

  const heroRef = useRef<T>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || disabled) return

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx: { revert: () => void } | null = null

    const initScrollFade = async () => {
      try {
        const { gsap, registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()

        if (!heroRef.current) return

        ctx = gsap.context(() => {
          // Create a timeline for coordinated animations
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: `top ${fadeStart * 100}%`,
              end: `bottom ${(1 - fadeEnd) * 100}%`,
              scrub: true,
            },
          })

          // Fade out and scale down simultaneously
          tl.to(heroRef.current, {
            opacity: minOpacity,
            scale: minScale,
            ease: 'none',
          })
        }, heroRef)
      } catch (error) {
        console.error('Failed to initialize hero scroll fade:', error)
      }
    }

    initScrollFade()

    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
  }, [fadeStart, fadeEnd, minOpacity, minScale, disabled])

  return heroRef
}

/**
 * useScrollProgress - Hook for reading scroll progress as a number (0-100)
 *
 * Useful for creating custom scroll-linked animations.
 * Returns a state value that triggers re-renders on scroll.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        setProgress(100)
        return
      }
      setProgress(Math.min((window.scrollY / scrollHeight) * 100, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return progress
}

/**
 * useScrollDirection - Hook for detecting scroll direction
 *
 * Returns 'up', 'down', or 'none' based on scroll direction.
 */
export function useScrollDirection(): 'up' | 'down' | 'none' {
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none')
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current) {
        setDirection('down')
      } else if (currentScrollY < lastScrollY.current) {
        setDirection('up')
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return direction
}
