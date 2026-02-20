'use client'

import { useEffect, useRef, useState, useSyncExternalStore, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsap'
import { hasVisitedBefore, markVisited } from '@/lib/loader-session'

// SSR-safe session check via useSyncExternalStore
function getSessionState(): boolean {
  if (typeof window === 'undefined') return false
  return hasVisitedBefore()
}

function subscribeToSession() {
  return () => {}
}

// Characters used for the text scramble effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

/**
 * EpicPreloader - Cinematic first-visit loading experience
 *
 * GSAP-powered intro (~2.5s) that plays once per session:
 * 1. Coral line grows from center
 * 2. Logo scales up with glow pulse
 * 3. "INVENEX" appears via character scramble/decode
 * 4. Tagline fades in
 * 5. Curtain slides up revealing page
 */
export function EpicPreloader() {
  const isReturningVisitor = useSyncExternalStore(
    subscribeToSession,
    getSessionState,
    () => false
  )

  const [phase, setPhase] = useState<'active' | 'done'>(
    isReturningVisitor ? 'done' : 'active'
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrambleText = useCallback((element: HTMLDivElement, target: string, duration: number) => {
    const chars = target.split('')
    const totalSteps = Math.ceil(duration / 50)
    let step = 0

    element.innerHTML = chars
      .map((_, i) => `<span data-idx="${i}" style="display:inline-block;min-width:0.6em;text-align:center">&nbsp;</span>`)
      .join('')

    const spans = element.querySelectorAll('span')

    scrambleIntervalRef.current = setInterval(() => {
      step++
      const progress = step / totalSteps

      spans.forEach((span, i) => {
        const charProgress = (progress - i / chars.length) * chars.length
        if (charProgress >= 1) {
          span.textContent = chars[i]
          span.style.color = ''
        } else if (charProgress > 0) {
          span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          span.style.color = '#FF6B35'
        } else {
          span.textContent = '\u00A0'
        }
      })

      if (step >= totalSteps) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current)
          scrambleIntervalRef.current = null
        }
        element.textContent = target
      }
    }, 50)
  }, [])

  useEffect(() => {
    if (phase === 'done' || !containerRef.current) return

    // Handle SSR hydration mismatch: useSyncExternalStore returns false
    // on server, so useState initializes as 'active'. On client after
    // hydration, isReturningVisitor may be true but phase stays 'active'.
    if (isReturningVisitor) {
      setPhase('done')
      return
    }

    if (prefersReducedMotion()) {
      markVisited()
      setPhase('done')
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        markVisited()
        setPhase('done')
      },
    })

    // Phase 1: Coral line grows from center (0 - 0.4s)
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 1 },
      { scaleX: 1, duration: 0.4, ease: 'power2.out' }
    )

    // Phase 2: Logo scales up (0.3 - 0.8s)
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
      0.3
    )

    // Glow pulse behind logo
    tl.fromTo(
      glowRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1.5, opacity: 0.6, duration: 0.5, ease: 'power2.out' },
      0.4
    )
    tl.to(glowRef.current, { scale: 1, opacity: 0.3, duration: 0.3, ease: 'power2.inOut' }, 0.9)

    // Text scramble "INVENEX" (0.6 - 1.1s)
    tl.add(() => {
      if (textRef.current) {
        scrambleText(textRef.current, 'INVENEX', 500)
      }
    }, 0.6)
    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: 'power2.out' },
      0.6
    )

    // Fade out coral line
    tl.to(lineRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0.8)

    // Tagline fades in (1.2 - 1.6s)
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      1.2
    )

    // Brief hold (1.6 - 1.8s)
    tl.to({}, { duration: 0.2 })

    // Curtain reveal (1.8 - 2.5s)
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
      },
      1.8
    )

    return () => {
      tl.kill()
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
      }
    }
  }, [phase, isReturningVisitor, scrambleText])

  if (phase === 'done') return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]"
      style={{ zIndex: 99999, touchAction: 'none', overscrollBehavior: 'none' }}
      aria-hidden="true"
    >
      {/* Coral horizontal line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] bg-[#FF6B35]"
        style={{ width: '120px', transformOrigin: 'center', opacity: 0 }}
      />

      {/* Glow behind logo */}
      <div
        ref={glowRef}
        className="absolute rounded-full"
        style={{
          width: '160px',
          height: '160px',
          background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)',
          opacity: 0,
        }}
      />

      {/* Logo */}
      <img
        ref={logoRef}
        src="/invenex-logo.png"
        alt=""
        className="w-16 h-16 sm:w-20 sm:h-20"
        style={{ opacity: 0 }}
      />

      {/* INVENEX text scramble */}
      <div
        ref={textRef}
        className="mt-6 text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white"
        style={{ opacity: 0, fontFamily: 'var(--font-sans)' }}
      >
        INVENEX
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        className="mt-3 text-sm sm:text-base text-[#A3A3A3] tracking-widest uppercase"
        style={{ opacity: 0 }}
      >
        Premium Digital Solutions
      </div>
    </div>
  )
}
