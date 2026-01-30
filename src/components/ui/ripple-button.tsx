'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Button, type ButtonProps } from './button'
import { cn } from '@/lib/utils'

interface RipplePosition {
  x: number
  y: number
  size: number
  id: number
}

interface RippleButtonProps extends ButtonProps {
  /** Ripple color - defaults to semi-transparent white */
  rippleColor?: string
  /** Ripple animation duration in ms - defaults to 600 */
  rippleDuration?: number
}

/**
 * RippleButton - Story 9.5
 *
 * Button with Material Design-style ripple effect on click.
 * The ripple expands from the click position.
 *
 * @example
 * <RippleButton variant="primary">Click Me</RippleButton>
 */
export function RippleButton({
  children,
  className,
  rippleColor = 'rgba(255, 255, 255, 0.4)',
  rippleDuration = 600,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<RipplePosition[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const idCounter = useRef(0)
  const prefersReducedMotion = useRef(false)

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    }
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Call original onClick if provided
      onClick?.(e)

      // Skip ripple for reduced motion
      if (prefersReducedMotion.current) return

      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
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
        id: idCounter.current++,
      }

      setRipples(prev => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, rippleDuration)
    },
    [onClick, rippleDuration]
  )

  return (
    <Button
      ref={buttonRef}
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple elements */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
            animationDuration: `${rippleDuration}ms`,
          }}
          aria-hidden="true"
        />
      ))}
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
