'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface MouseParallaxOptions {
  /**
   * Depth multiplier for parallax effect
   * Lower values = subtle movement, higher = more dramatic
   * Recommended range: 0.02 - 0.05
   * @default 0.03
   */
  depth?: number
  /**
   * Lerp (linear interpolation) factor for smooth movement
   * Lower = smoother but slower, higher = faster but less smooth
   * @default 0.1
   */
  lerp?: number
  /**
   * Explicitly disable the parallax effect
   * @default false
   */
  disabled?: boolean
}

interface ParallaxPosition {
  x: number
  y: number
}

/**
 * useMouseParallax - Creates mouse-following parallax effect
 *
 * Tracks mouse position relative to viewport center and returns
 * offset values that can be applied to elements for parallax depth.
 *
 * Features:
 * - Lerp smoothing for fluid movement
 * - Automatically disabled on touch devices
 * - Respects prefers-reduced-motion
 * - Cleanup on unmount
 *
 * @example
 * ```tsx
 * function FloatingOrb() {
 *   const parallax = useMouseParallax({ depth: 0.03 })
 *   return (
 *     <div style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
 *       Orb
 *     </div>
 *   )
 * }
 * ```
 */
export function useMouseParallax(options: MouseParallaxOptions = {}): ParallaxPosition {
  const { depth = 0.03, lerp = 0.1, disabled = false } = options

  const [position, setPosition] = useState<ParallaxPosition>({ x: 0, y: 0 })
  const targetRef = useRef<ParallaxPosition>({ x: 0, y: 0 })
  const currentRef = useRef<ParallaxPosition>({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const isEnabledRef = useRef(false)

  // Check if touch device or reduced motion
  useEffect(() => {
    if (typeof window === 'undefined' || disabled) {
      isEnabledRef.current = false
      return
    }

    const isTouchDevice = window.matchMedia('(hover: none)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    isEnabledRef.current = !isTouchDevice && !prefersReducedMotion
  }, [disabled])

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isEnabledRef.current) return

    // Calculate offset from viewport center
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    // Calculate distance from center with depth multiplier
    const offsetX = (e.clientX - centerX) * depth * 100
    const offsetY = (e.clientY - centerY) * depth * 100

    targetRef.current = { x: offsetX, y: offsetY }
  }, [depth])

  // Setup event listeners and animation loop
  useEffect(() => {
    if (typeof window === 'undefined' || disabled) return

    // Animation loop with lerp - defined inside effect to avoid stale closure
    const animate = () => {
      if (!isEnabledRef.current) return

      // Apply lerp for smooth movement
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp

      // Update state with current position
      setPosition({
        x: Math.round(currentRef.current.x * 100) / 100,
        y: Math.round(currentRef.current.y * 100) / 100,
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate)

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [disabled, handleMouseMove, lerp])

  return position
}

/**
 * useMousePosition - Simplified hook for cursor-following effects
 *
 * Returns mouse position as percentage of viewport (0-100).
 * Useful for gradient positioning.
 *
 * @example
 * ```tsx
 * function GradientBackground() {
 *   const mouse = useMousePosition()
 *   return (
 *     <div style={{
 *       background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, ...)`
 *     }} />
 *   )
 * }
 * ```
 */
export function useMousePosition(): ParallaxPosition {
  const [position, setPosition] = useState<ParallaxPosition>({ x: 50, y: 50 })
  const isEnabledRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isTouchDevice = window.matchMedia('(hover: none)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    isEnabledRef.current = !isTouchDevice && !prefersReducedMotion

    if (!isEnabledRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return position
}
