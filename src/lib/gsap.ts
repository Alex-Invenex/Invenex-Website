'use client'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Track if ScrollTrigger has been registered
let scrollTriggerRegistered = false

// Register plugins only when needed (called in components)
// This enables tree-shaking and code-splitting for minimal bundle impact
export async function registerScrollTrigger() {
  if (scrollTriggerRegistered) {
    // Return the already registered ScrollTrigger
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    return ScrollTrigger
  }

  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  scrollTriggerRegistered = true
  return ScrollTrigger
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Re-export for convenience
export { gsap, useGSAP }
