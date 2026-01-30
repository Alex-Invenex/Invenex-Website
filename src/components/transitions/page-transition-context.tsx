'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'

type TransitionState = 'idle' | 'exiting' | 'entering'

interface PageTransitionContextValue {
  state: TransitionState
  isTransitioning: boolean
  startTransition: (href: string) => void
  completeTransition: () => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

interface PageTransitionProviderProps {
  children: ReactNode
  exitDuration?: number
  enterDuration?: number
}

/**
 * PageTransitionProvider - Manages cinematic page transition state
 *
 * Wraps the application to provide transition state and controls.
 * Handles exit/enter animations with configurable durations.
 * Respects prefers-reduced-motion preference.
 *
 * @param exitDuration - Duration of exit animation in ms (default: 300)
 * @param enterDuration - Duration of enter animation in ms (default: 400)
 */
export function PageTransitionProvider({
  children,
  exitDuration = 300,
  enterDuration = 400,
}: PageTransitionProviderProps) {
  const [state, setState] = useState<TransitionState>('idle')
  const router = useRouter()
  const pathname = usePathname()
  const pendingHref = useRef<string | null>(null)
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Track if reduced motion is preferred
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    }
  }, [])

  // Reset state when pathname changes (navigation complete)
  useEffect(() => {
    if (state === 'entering') {
      // Clear any pending enter timeout
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
      }

      // Complete enter animation
      enterTimeoutRef.current = setTimeout(() => {
        setState('idle')
        pendingHref.current = null
      }, enterDuration)
    }
  }, [pathname, state, enterDuration])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current)
    }
  }, [])

  const startTransition = useCallback(
    (href: string) => {
      // Skip transition if reduced motion preferred
      if (prefersReducedMotion.current) {
        router.push(href)
        return
      }

      // Skip if already transitioning
      if (state !== 'idle') return

      // Skip if navigating to current page
      if (href === pathname) return

      pendingHref.current = href
      setState('exiting')

      // Navigate after exit animation completes
      exitTimeoutRef.current = setTimeout(() => {
        if (pendingHref.current) {
          setState('entering')
          router.push(pendingHref.current)
        }
      }, exitDuration)
    },
    [router, exitDuration, state, pathname]
  )

  const completeTransition = useCallback(() => {
    setState('idle')
    pendingHref.current = null
  }, [])

  return (
    <PageTransitionContext.Provider
      value={{
        state,
        isTransitioning: state !== 'idle',
        startTransition,
        completeTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

/**
 * usePageTransition - Hook to access page transition state and controls
 *
 * Must be used within a PageTransitionProvider.
 *
 * @returns {PageTransitionContextValue} Transition state and methods
 */
export function usePageTransition(): PageTransitionContextValue {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider')
  }
  return context
}
