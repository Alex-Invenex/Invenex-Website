'use client'

import Link from 'next/link'
import { usePageTransition } from './page-transition-context'
import { type ComponentProps, type MouseEvent } from 'react'

type LinkProps = ComponentProps<typeof Link>

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode
  /** Skip transition and navigate instantly */
  skipTransition?: boolean
}

/**
 * TransitionLink - Enhanced Next.js Link with page transitions
 *
 * Wraps the standard Next.js Link component to trigger cinematic
 * page transitions. External links, anchors, and same-page links
 * bypass the transition automatically.
 *
 * @param skipTransition - Force instant navigation without transition
 */
export function TransitionLink({
  href,
  children,
  onClick,
  skipTransition = false,
  ...props
}: TransitionLinkProps) {
  const { startTransition, isTransitioning } = usePageTransition()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Always call the original onClick if provided
    onClick?.(e)

    // If default was prevented by onClick, respect that
    if (e.defaultPrevented) return

    // Skip transition if explicitly requested
    if (skipTransition) return

    // Get the href as string
    const hrefString = typeof href === 'string' ? href : href.pathname || '/'

    // Don't transition for:
    // - External links (http, https, mailto, tel)
    // - Same-page anchors (#)
    // - Already transitioning
    // - New tab links (handled by browser)
    const isExternal =
      hrefString.startsWith('http') ||
      hrefString.startsWith('mailto:') ||
      hrefString.startsWith('tel:')
    const isAnchor = hrefString.startsWith('#')
    const isNewTab = props.target === '_blank'

    if (isExternal || isAnchor || isTransitioning || isNewTab) {
      return
    }

    // Prevent default navigation and start transition
    e.preventDefault()
    startTransition(hrefString)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

/**
 * useTransitionNavigation - Hook for programmatic navigation with transitions
 *
 * Use this when you need to navigate programmatically (e.g., after form submission)
 * but still want the page transition effect.
 *
 * @returns navigate function that triggers transition
 */
export function useTransitionNavigation() {
  const { startTransition, isTransitioning } = usePageTransition()

  const navigate = (href: string) => {
    if (!isTransitioning) {
      startTransition(href)
    }
  }

  return { navigate, isTransitioning }
}
