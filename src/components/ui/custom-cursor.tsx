'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface CustomCursorProps {
  className?: string
  dotSize?: number
  outlineSize?: number
  hoverScale?: number
  lerpFactor?: number
}

/**
 * CustomCursor - Premium custom cursor with dot and outline elements
 *
 * Features:
 * - Inner dot (8px) follows cursor exactly
 * - Outer outline (32px) follows with lerp delay
 * - Scales up on interactive element hover
 * - Hidden on touch devices and with reduced motion
 * - Hides for text inputs to preserve native selection
 *
 * Uses requestAnimationFrame for smooth 60fps animation.
 */
export function CustomCursor({
  className,
  dotSize = 8,
  outlineSize = 32,
  hoverScale = 1.5,
  lerpFactor = 0.15,
}: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTextInput, setIsTextInput] = useState(false)

  // Store mouse position in refs to avoid re-renders
  const mousePos = useRef({ x: 0, y: 0 })
  const outlinePos = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const isTextInputRef = useRef(false)

  // Update refs when state changes
  useEffect(() => {
    isHoveringRef.current = isHovering
  }, [isHovering])

  useEffect(() => {
    isTextInputRef.current = isTextInput
  }, [isTextInput])

  // Lerp function for smooth interpolation
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }, [])

  useEffect(() => {
    // Skip if running on server
    if (typeof window === 'undefined') return

    // Check for touch device - hide custom cursor
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Initialize outline position to center to avoid corner flash
    outlinePos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    // Defer state update to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      setIsVisible(true)
    })

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    // Handle mouse entering the window
    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (outlineRef.current) outlineRef.current.style.opacity = '1'
    }

    // Handle mouse leaving the window
    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (outlineRef.current) outlineRef.current.style.opacity = '0'
    }

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check for interactive elements
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[data-cursor-hover]') !== null ||
        target.hasAttribute('data-cursor-hover') ||
        target.getAttribute('role') === 'button'

      // Check for text input elements
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('[contenteditable]') !== null

      setIsHovering(isInteractive && !isInput)
      setIsTextInput(isInput)
    }

    // Animation loop using requestAnimationFrame
    let animationId: number
    const animate = () => {
      const { x: mouseX, y: mouseY } = mousePos.current
      const halfDot = dotSize / 2
      const halfOutline = outlineSize / 2

      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - halfDot}px, ${mouseY - halfDot}px)`
      }

      // Outline follows with lerp delay
      outlinePos.current.x = lerp(outlinePos.current.x, mouseX, lerpFactor)
      outlinePos.current.y = lerp(outlinePos.current.y, mouseY, lerpFactor)

      if (outlineRef.current) {
        const scale = isHoveringRef.current ? hoverScale : 1
        outlineRef.current.style.transform = `translate(${outlinePos.current.x - halfOutline}px, ${outlinePos.current.y - halfOutline}px) scale(${scale})`
      }

      animationId = requestAnimationFrame(animate)
    }

    // Add cursor-none to body
    document.body.classList.add('cursor-none')

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    // Use documentElement for mouseenter/mouseleave to detect cursor entering/leaving viewport
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    // Start animation
    animationId = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [dotSize, outlineSize, hoverScale, lerpFactor, lerp])

  // Don't render anything on server or if not visible
  if (!isVisible) return null

  return (
    <>
      {/* Dot - follows exactly */}
      <div
        ref={dotRef}
        data-custom-cursor="dot"
        className={cn(
          'fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9999]',
          'mix-blend-difference',
          'transition-opacity duration-150',
          isTextInput && 'opacity-0',
          className
        )}
        style={{
          width: dotSize,
          height: dotSize,
          opacity: 0, // Start hidden until mouse enters
        }}
        aria-hidden="true"
      />
      {/* Outline - follows with delay */}
      <div
        ref={outlineRef}
        data-custom-cursor="outline"
        className={cn(
          'fixed top-0 left-0 rounded-full border-2 border-white pointer-events-none z-[9999]',
          'mix-blend-difference',
          'transition-[opacity] duration-150',
          isTextInput && 'opacity-0'
        )}
        style={{
          width: outlineSize,
          height: outlineSize,
          opacity: 0, // Start hidden until mouse enters
        }}
        aria-hidden="true"
      />
    </>
  )
}
