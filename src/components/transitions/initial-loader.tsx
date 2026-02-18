'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'
import { hasVisitedBefore, markVisited } from '@/lib/loader-session'

interface InitialLoaderProps {
  /** Minimum time to display loader in ms (default: 500) */
  minDisplayTime?: number
  className?: string
}

type LoaderState = 'loading' | 'fading' | 'hidden' | 'skip'

// Check session storage synchronously on client
function getSessionState(): boolean {
  if (typeof window === 'undefined') return false
  return hasVisitedBefore()
}

// Subscribe function (session storage doesn't change during runtime)
function subscribeToSession() {
  return () => {}
}

/**
 * InitialLoader - First-visit branded loading experience
 *
 * Shows an animated Invenex logo on first page load.
 * Skips on repeat visits within the same browser session.
 *
 * Architecture:
 * 1. Server renders loader visible (no sessionStorage on server)
 * 2. Client hydrates, checks sessionStorage via useSyncExternalStore
 * 3. If visited before: immediately hide (no animation)
 * 4. If first visit: show animation, wait minDisplayTime, fade out
 * 5. Set sessionStorage flag after dismissal
 *
 * Story 9.9: Branded Page Loader
 */
export function InitialLoader({
  minDisplayTime = 500,
  className,
}: InitialLoaderProps) {
  // Use useSyncExternalStore to check session without useEffect
  const isReturningVisitor = useSyncExternalStore(
    subscribeToSession,
    getSessionState,
    () => false // Server snapshot - always show loader
  )

  // Use a single state to track loader lifecycle
  const [loaderState, setLoaderState] = useState<LoaderState>(
    isReturningVisitor ? 'skip' : 'loading'
  )
  const hasStartedTimer = useRef(false)

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Effect to handle the timer for first-time visitors
  useEffect(() => {
    // Skip if already processed or returning visitor
    if (hasStartedTimer.current || isReturningVisitor) return
    hasStartedTimer.current = true

    // First visit: show loader for minimum time, then fade out
    const displayTimer = setTimeout(() => {
      setLoaderState('fading')

      // After fade animation completes, hide completely
      const fadeTimer = setTimeout(() => {
        setLoaderState('hidden')
        markVisited()
      }, 300)

      return () => clearTimeout(fadeTimer)
    }, minDisplayTime)

    return () => clearTimeout(displayTimer)
  }, [minDisplayTime, isReturningVisitor])

  // Skip render if visitor has been here before or loader is fully hidden
  if (loaderState === 'skip' || loaderState === 'hidden') {
    return null
  }

  const isAnimating = loaderState === 'loading'
  const isFading = loaderState === 'fading'

  return (
    <div
      data-initial-loader
      className={cn(
        'fixed inset-0 z-[99999] flex items-center justify-center',
        'bg-background',
        // Fade out animation when fading
        isFading && 'animate-fade-out',
        className
      )}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading Invenex"
    >
      <div
        data-testid="initial-loader-content"
        className={cn(
          'flex flex-col items-center gap-6',
          // Entrance animation (scale + fade in)
          isAnimating && !prefersReducedMotion && 'animate-loader-enter'
        )}
      >
        {/* Logo Ring with "I" */}
        <div
          data-testid="initial-loader-logo"
          className={cn(
            'relative w-20 h-20 sm:w-24 sm:h-24',
            // Spinning rings animation
            !prefersReducedMotion && isAnimating && 'animate-logo-pulse'
          )}
        >
          {/* Outer ring - gradient border */}
          <div
            className={cn(
              'absolute inset-0 rounded-full border-2 border-border',
              !prefersReducedMotion && 'animate-spin-slow'
            )}
            style={{
              borderImage: 'linear-gradient(135deg, #a78bfa, #60a5fa) 1',
              borderImageSlice: 1,
            }}
            aria-hidden="true"
          />

          {/* Inner spinning ring */}
          <div
            className={cn(
              'absolute inset-2 rounded-full border-2 border-transparent',
              'border-t-accent border-r-accent/50',
              !prefersReducedMotion && 'animate-spin'
            )}
            style={{ animationDuration: '1.2s' }}
            aria-hidden="true"
          />

          {/* Center logo */}
          <img
            src="/invenex-logo.png"
            alt=""
            className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12"
            aria-hidden="true"
          />
        </div>

        {/* Brand Name */}
        <div
          data-testid="initial-loader-brand"
          className={cn(
            'flex flex-col items-center gap-1',
            !prefersReducedMotion && isAnimating && 'animate-fade-in-delayed'
          )}
        >
          <span className="text-lg sm:text-xl font-semibold text-foreground tracking-wider">
            Invenex
          </span>
          <span
            className={cn(
              'text-xs text-muted-foreground',
              !prefersReducedMotion && 'animate-pulse'
            )}
          >
            Loading...
          </span>
        </div>
      </div>
    </div>
  )
}
