'use client'

import { useEffect, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
  barClassName?: string
  position?: 'top' | 'bottom'
  height?: number
  showOnLongPagesOnly?: boolean
  minPageHeight?: number // in vh units, default 200vh
}

/**
 * ScrollProgress - Visual indicator of scroll position
 *
 * Shows reading progress on long-form pages like case studies.
 * Automatically hidden on short pages if showOnLongPagesOnly is true.
 * Respects reduced motion preference.
 *
 * @param position - 'top' or 'bottom' of viewport
 * @param height - Bar height in pixels
 * @param showOnLongPagesOnly - Hide on short pages
 * @param minPageHeight - Minimum page height in vh to show (default: 200)
 */
export function ScrollProgress({
  className,
  barClassName,
  position = 'top',
  height = 4,
  showOnLongPagesOnly = false,
  minPageHeight = 200,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)
  const [pageHeight, setPageHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  // Check reduced motion preference synchronously during render (safe pattern)
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  // Compute visibility from state (not in effect)
  const isVisible = useMemo(() => {
    if (!showOnLongPagesOnly) return true
    if (viewportHeight === 0) return false // Not yet measured
    const minHeight = (minPageHeight / 100) * viewportHeight
    return pageHeight >= minHeight
  }, [showOnLongPagesOnly, minPageHeight, viewportHeight, pageHeight])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        setProgress(100)
        return
      }
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(Math.min(Math.max(scrolled, 0), 100))
    }

    const handleResize = () => {
      setPageHeight(document.documentElement.scrollHeight)
      setViewportHeight(window.innerHeight)
      handleScroll()
    }

    // Listen for scroll with passive for performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Use requestAnimationFrame for initial measurements (deferred from synchronous effect)
    requestAnimationFrame(() => {
      setPageHeight(document.documentElement.scrollHeight)
      setViewportHeight(window.innerHeight)
      handleScroll()
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      data-scroll-progress
      className={cn(
        'fixed left-0 right-0 z-50 bg-transparent pointer-events-none',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn(
          'h-full bg-gradient-to-r from-accent to-foreground/80',
          prefersReducedMotion ? '' : 'transition-[width] duration-150 ease-out',
          barClassName
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/**
 * ScrollProgressCircle - Circular scroll progress indicator
 *
 * Alternative to the linear bar, useful for floating indicators.
 */
interface ScrollProgressCircleProps {
  className?: string
  size?: number
  strokeWidth?: number
}

export function ScrollProgressCircle({
  className,
  size = 48,
  strokeWidth = 3,
}: ScrollProgressCircleProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        setProgress(100)
        return
      }
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(Math.min(Math.max(scrolled, 0), 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      className={cn('relative', className)}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-accent transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      {/* Percentage text */}
      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
