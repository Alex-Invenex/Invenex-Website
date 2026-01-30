'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  /**
   * Text content to animate
   */
  children: string
  /**
   * HTML tag to render
   * @default 'span'
   */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Split mode for animation
   * - 'chars': Animate each character separately
   * - 'words': Animate each word separately
   * @default 'chars'
   */
  splitBy?: 'chars' | 'words'
  /**
   * Delay between each element animation in seconds
   * @default 0.025 for chars, 0.08 for words
   */
  stagger?: number
  /**
   * Animation duration for each element in seconds
   * @default 0.4
   */
  duration?: number
  /**
   * Delay before animation starts in seconds
   * @default 0
   */
  delay?: number
  /**
   * Callback when animation completes
   */
  onComplete?: () => void
  /**
   * Disable animation (content visible immediately)
   * @default false
   */
  disabled?: boolean
}

/**
 * AnimatedText - Character/word split animation component
 *
 * Animates text by splitting into characters or words and
 * staggering their entrance animation using GSAP.
 *
 * Features:
 * - Character or word-level splitting
 * - Configurable stagger timing
 * - onComplete callback
 * - Respects prefers-reduced-motion
 * - SSR safe
 *
 * @example
 * ```tsx
 * <AnimatedText as="h1" className="text-5xl font-bold">
 *   We Build Digital Excellence
 * </AnimatedText>
 *
 * // Word-level animation
 * <AnimatedText splitBy="words" stagger={0.1}>
 *   This animates word by word
 * </AnimatedText>
 * ```
 */
export function AnimatedText({
  children,
  as: Component = 'span',
  className,
  splitBy = 'chars',
  stagger,
  duration = 0.4,
  delay = 0,
  onComplete,
  disabled = false,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check reduced motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }
  }, [])

  // Determine stagger timing
  const actualStagger = stagger ?? (splitBy === 'chars' ? 0.025 : 0.08)

  // Split text into elements
  const splitElements = (): ReactNode[] => {
    if (splitBy === 'words') {
      return children.split(' ').map((word, i, arr) => (
        <span
          key={i}
          className={cn(
            'inline-block',
            !isAnimated && !disabled && !prefersReducedMotion && 'opacity-0 translate-y-8'
          )}
          data-animated-element
        >
          {word}
          {i < arr.length - 1 && '\u00A0'}
        </span>
      ))
    }

    // Character split
    return children.split('').map((char, i) => (
      <span
        key={i}
        className={cn(
          'inline-block',
          !isAnimated && !disabled && !prefersReducedMotion && 'opacity-0 translate-y-8'
        )}
        data-animated-element
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  // Run GSAP animation
  useEffect(() => {
    if (disabled || prefersReducedMotion || isAnimated) {
      setIsAnimated(true)
      return
    }

    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('[data-animated-element]')
    if (elements.length === 0) return

    let ctx: { revert: () => void } | null = null

    const runAnimation = async () => {
      try {
        const { gsap } = await import('gsap')

        ctx = gsap.context(() => {
          gsap.fromTo(
            elements,
            {
              opacity: 0,
              y: 32,
            },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger: actualStagger,
              delay,
              ease: 'power2.out',
              onComplete: () => {
                setIsAnimated(true)
                onComplete?.()
              },
            }
          )
        }, containerRef)
      } catch (error) {
        // Fallback: show content if GSAP fails
        console.error('AnimatedText: GSAP animation failed', error)
        setIsAnimated(true)
      }
    }

    runAnimation()

    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
  }, [disabled, prefersReducedMotion, isAnimated, duration, actualStagger, delay, onComplete])

  // Show content immediately if reduced motion or disabled
  if (disabled || prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  // Use a wrapper for the ref, with aria-label on the visible component
  return (
    <span ref={containerRef} className="contents">
      <Component className={className} aria-label={children}>
        {splitElements()}
      </Component>
    </span>
  )
}

/**
 * AnimatedLines - Animate multiple lines with staggered fade-up
 *
 * Wraps children and animates them as separate lines.
 *
 * @example
 * ```tsx
 * <AnimatedLines stagger={0.15}>
 *   <h1>Line One</h1>
 *   <p>Line Two</p>
 * </AnimatedLines>
 * ```
 */
interface AnimatedLinesProps {
  children: ReactNode
  className?: string
  stagger?: number
  duration?: number
  delay?: number
  onComplete?: () => void
  disabled?: boolean
}

export function AnimatedLines({
  children,
  className,
  stagger = 0.15,
  duration = 0.6,
  delay = 0,
  onComplete,
  disabled = false,
}: AnimatedLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }
  }, [])

  useEffect(() => {
    if (disabled || prefersReducedMotion || isAnimated) {
      setIsAnimated(true)
      return
    }

    if (!containerRef.current) return

    const elements = containerRef.current.children
    if (elements.length === 0) return

    let ctx: { revert: () => void } | null = null

    const runAnimation = async () => {
      try {
        const { gsap } = await import('gsap')

        ctx = gsap.context(() => {
          gsap.fromTo(
            elements,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              delay,
              ease: 'power2.out',
              onComplete: () => {
                setIsAnimated(true)
                onComplete?.()
              },
            }
          )
        }, containerRef)
      } catch {
        setIsAnimated(true)
      }
    }

    runAnimation()

    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
  }, [disabled, prefersReducedMotion, isAnimated, duration, stagger, delay, onComplete])

  // Set initial hidden state via inline style for children
  const childStyle = !isAnimated && !disabled && !prefersReducedMotion
    ? { opacity: 0, transform: 'translateY(40px)' }
    : undefined

  return (
    <div ref={containerRef} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={childStyle}>
              {child}
            </div>
          ))
        : <div style={childStyle}>{children}</div>
      }
    </div>
  )
}
