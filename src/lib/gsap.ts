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

// Cached touch device check — avoids repeated matchMedia calls
let _isTouchDevice: boolean | null = null
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  if (_isTouchDevice === null) {
    _isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  }
  return _isTouchDevice
}

// True when animations should be skipped entirely (reduced motion OR mobile touch)
// On touch devices: content is already visible via CSS override, GSAP adds no value
// but costs ~1.5s of main-thread work for ScrollTrigger setup + timeline creation.
export function shouldSkipAnimations(): boolean {
  return prefersReducedMotion() || isTouchDevice()
}

// Re-export for convenience
export { gsap, useGSAP }
