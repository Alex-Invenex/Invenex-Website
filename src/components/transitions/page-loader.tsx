'use client'

import { usePageTransition } from './page-transition-context'
import { cn } from '@/lib/utils'

interface PageLoaderProps {
  className?: string
  /** Show loader only during 'entering' state (default) or also during 'exiting' */
  showDuringExit?: boolean
}

/**
 * PageLoader - Branded loading indicator during page transitions
 *
 * Displays an animated Invenex logo spinner during the enter phase
 * of page transitions. Uses glassmorphism styling.
 *
 * @param showDuringExit - Also show during exit phase (default: false)
 */
export function PageLoader({
  className,
  showDuringExit = false,
}: PageLoaderProps) {
  const { state } = usePageTransition()

  // Show during entering phase (and optionally exiting)
  const shouldShow = state === 'entering' || (showDuringExit && state === 'exiting')

  if (!shouldShow) return null

  return (
    <div
      data-page-loader
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center',
        'bg-background/95 backdrop-blur-md',
        'animate-in fade-in duration-200',
        className
      )}
      role="progressbar"
      aria-label="Loading page"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Invenex Logo Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer ring - static */}
          <div
            className="absolute inset-0 rounded-full border-2 border-border"
            aria-hidden="true"
          />

          {/* Spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin"
            style={{ animationDuration: '1s' }}
            aria-hidden="true"
          />

          {/* Second spinning ring (opposite direction) */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-foreground/50 animate-spin"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
            aria-hidden="true"
          />

          {/* Center logo text */}
          <span
            className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-foreground"
            aria-hidden="true"
          >
            I
          </span>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-foreground">
            Invenex
          </span>
          <span className="text-xs text-muted-foreground animate-pulse">
            Loading...
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * InlineLoader - Smaller loading indicator for inline use
 *
 * Use this for loading states within components rather than full page.
 */
interface InlineLoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function InlineLoader({ className, size = 'md' }: InlineLoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-2',
  }

  return (
    <div
      className={cn(
        'rounded-full border-transparent border-t-accent animate-spin',
        sizeClasses[size],
        className
      )}
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
    />
  )
}
