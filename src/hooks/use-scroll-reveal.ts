'use client'

import { useRef, useEffect } from 'react'
import { gsap, registerScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

interface ScrollRevealOptions {
  /** 'scrub' = reveal as user scrolls, 'trigger' = reveal on enter */
  mode?: 'scrub' | 'trigger'
  /** Scrub smoothness (only for scrub mode) */
  scrub?: number | boolean
  /** Start position e.g. 'top 80%' */
  start?: string
  /** End position e.g. 'bottom 20%' */
  end?: string
  /** Stagger between elements */
  stagger?: number
  /** Animation duration (trigger mode only) */
  duration?: number
  /** Toggle actions (trigger mode) */
  toggleActions?: string
}

/**
 * GSAP ScrollTrigger text/element reveal hook.
 *
 * Supports 'scrub' mode (text reveals as user scrolls)
 * and 'trigger' mode (reveals on viewport enter).
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    mode = 'trigger',
    scrub = 1,
    start = 'top 85%',
    end = 'bottom 20%',
    stagger = 0.02,
    duration = 0.8,
    toggleActions = 'play none none none',
  } = options

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    let ctx: gsap.Context | undefined

    const init = async () => {
      await registerScrollTrigger()
      const el = ref.current
      if (!el) return

      const targets = el.querySelectorAll('[data-reveal]')
      if (targets.length === 0) return

      ctx = gsap.context(() => {
        if (mode === 'scrub') {
          gsap.fromTo(
            targets,
            { opacity: 0.1, y: 8 },
            {
              opacity: 1,
              y: 0,
              stagger,
              scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub: typeof scrub === 'number' ? scrub : 1,
              },
            }
          )
        } else {
          gsap.fromTo(
            targets,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions,
              },
            }
          )
        }
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [mode, scrub, start, end, stagger, duration, toggleActions])

  return ref
}

/**
 * GSAP ScrollTrigger character-by-character reveal (scrub).
 * Pass the ref to a container whose children have data-char attributes.
 */
export function useCharReveal<T extends HTMLElement>(
  options: { start?: string; end?: string; scrub?: number } = {}
) {
  const ref = useRef<T>(null)
  const { start = 'top 80%', end = 'bottom 30%', scrub = 1 } = options

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    let ctx: gsap.Context | undefined

    const init = async () => {
      await registerScrollTrigger()
      const el = ref.current
      if (!el) return

      const chars = el.querySelectorAll('[data-char]')
      if (chars.length === 0) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          chars,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.01,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
            },
          }
        )
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [start, end, scrub])

  return ref
}
