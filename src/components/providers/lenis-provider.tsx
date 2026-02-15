'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    let scrollTriggerSynced = false
    const syncScrollTrigger = async () => {
      if (scrollTriggerSynced) return
      try {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        const ScrollTrigger = await registerScrollTrigger()
        lenis.on('scroll', () => ScrollTrigger.update())
        scrollTriggerSynced = true
      } catch {
        // ScrollTrigger not yet needed — sync when first used
      }
    }
    syncScrollTrigger()

    // RAF loop with cancellation
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
