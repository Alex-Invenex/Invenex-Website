'use client'

import { usePageTransition } from './page-transition-context'
import { cn } from '@/lib/utils'

interface TransitionOverlayProps {
  className?: string
  blur?: boolean
}

/**
 * TransitionOverlay - Visual overlay during page transitions
 *
 * Renders a semi-transparent backdrop with optional blur effect
 * that fades in during exit and fades out during enter transitions.
 *
 * @param blur - Enable backdrop blur effect (default: true)
 */
export function TransitionOverlay({
  className,
  blur = true,
}: TransitionOverlayProps) {
  const { state, isTransitioning } = usePageTransition()

  // Don't render if not transitioning
  if (!isTransitioning) return null

  return (
    <div
      data-transition-overlay
      className={cn(
        'fixed inset-0 z-[9998] pointer-events-none',
        'bg-background/90',
        blur && 'backdrop-blur-sm',
        // Transition setup with explicit duration matching PageTransitionProvider defaults
        // Exit: 300ms (matches exitDuration), Enter: 400ms (matches enterDuration)
        'transition-opacity ease-out',
        state === 'exiting' && 'opacity-100 duration-300',
        state === 'entering' && 'opacity-0 duration-[400ms]',
        className
      )}
      aria-hidden="true"
    />
  )
}

/**
 * TransitionContent - Wrapper for page content with exit/enter animations
 *
 * Applies fade and slide animations to wrapped content during transitions.
 * Use this to wrap the main content area for animated transitions.
 */
interface TransitionContentProps {
  children: React.ReactNode
  className?: string
}

export function TransitionContent({
  children,
  className,
}: TransitionContentProps) {
  const { state } = usePageTransition()

  return (
    <div
      data-transition-content
      className={cn(
        'transition-all duration-300 ease-out',
        state === 'exiting' && 'opacity-0 translate-y-4 scale-[0.99]',
        state === 'entering' && 'opacity-0 translate-y-4',
        state === 'idle' && 'opacity-100 translate-y-0 scale-100',
        className
      )}
    >
      {children}
    </div>
  )
}
