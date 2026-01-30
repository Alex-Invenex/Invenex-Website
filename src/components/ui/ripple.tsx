'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RipplePosition {
  x: number
  y: number
  size: number
  id: number
}

interface RippleProps {
  className?: string
  color?: string
  duration?: number
}

/**
 * Ripple Effect Component - Story 9.5
 *
 * Creates Material Design-style ripple effects on click.
 * Use inside a relative-positioned container.
 *
 * @example
 * <button className="relative overflow-hidden">
 *   Click Me
 *   <Ripple />
 * </button>
 */
export function Ripple({
  className,
  color = 'rgba(255, 255, 255, 0.3)',
  duration = 600
}: RippleProps) {
  const [ripples, setRipples] = useState<RipplePosition[]>([])
  const containerRef = useRef<HTMLSpanElement>(null)
  const idCounter = useRef(0)

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const container = containerRef.current
    if (!container) return

    // For reduced motion, show instant highlight instead
    if (prefersReducedMotion.current) {
      return
    }

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate size to cover the entire button from click point
    const size = Math.max(
      Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 2,
      100
    )

    const newRipple: RipplePosition = {
      x: x - size / 2,
      y: y - size / 2,
      size,
      id: idCounter.current++
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, duration)
  }, [duration])

  return (
    <span
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
      onClick={handleClick}
      style={{ pointerEvents: 'auto' }}
      aria-hidden="true"
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
            animationDuration: `${duration}ms`,
          }}
        />
      ))}
    </span>
  )
}

/**
 * useRipple Hook - Alternative approach
 *
 * Returns props to spread on a button for ripple effect.
 */
export function useRipple(options?: { color?: string; duration?: number }) {
  const [ripples, setRipples] = useState<RipplePosition[]>([])
  const idCounter = useRef(0)
  const color = options?.color ?? 'rgba(255, 255, 255, 0.3)'
  const duration = options?.duration ?? 600

  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const size = Math.max(
      Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 2,
      100
    )

    const newRipple: RipplePosition = {
      x: x - size / 2,
      y: y - size / 2,
      size,
      id: idCounter.current++
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, duration)
  }, [duration])

  const RippleContainer = useCallback(() => (
    <span className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
            animationDuration: `${duration}ms`,
          }}
        />
      ))}
    </span>
  ), [ripples, color, duration])

  return {
    onMouseDown,
    RippleContainer,
    rippleProps: {
      className: 'relative overflow-hidden',
      onMouseDown,
    }
  }
}
