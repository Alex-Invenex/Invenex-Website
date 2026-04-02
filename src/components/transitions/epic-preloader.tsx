'use client'

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, useCallback } from 'react'
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
 * Desktop: GSAP-powered intro (~2.5s) that plays once per session
 * Mobile: Lightweight CSS-only branded loader (~1.2s)
 */
export function EpicPreloader() {
  const isReturningVisitor = useSyncExternalStore(
    subscribeToSession,
    getSessionState,
    () => false
  )

  const [phase, setPhase] = useState<'pending' | 'active' | 'mobile' | 'mobile-exit' | 'done'>(
    isReturningVisitor ? 'done' : 'pending'
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

  // Resolve 'pending' phase: decide whether to show preloader or skip
  // useLayoutEffect fires BEFORE browser paint, so returning visitors
  // never see the black overlay flash — it's removed before first paint.
  useLayoutEffect(() => {
    if (phase !== 'pending') return

    if (isReturningVisitor) {
      setPhase('done')
      return
    }

    if (prefersReducedMotion()) {
      markVisited()
      setPhase('done')
      return
    }

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) {
      // Mobile: show lightweight CSS-only preloader instead of skipping
      setPhase('mobile')
      return
    }

    // Desktop first-time visitor — show the GSAP preloader animation
    setPhase('active')
  }, [phase, isReturningVisitor])

  // Mobile: CSS-only preloader lifecycle
  useEffect(() => {
    if (phase !== 'mobile') return

    // Show branded loader for 800ms, then start exit animation
    const showTimer = setTimeout(() => {
      setPhase('mobile-exit')
    }, 800)

    return () => clearTimeout(showTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'mobile-exit') return

    // After fade-out animation (300ms), mark done
    const exitTimer = setTimeout(() => {
      window.scrollTo(0, 0)
      markVisited()
      setPhase('done')
    }, 300)

    return () => clearTimeout(exitTimer)
  }, [phase])

  // Run GSAP animation when phase becomes 'active'
  useEffect(() => {
    if (phase !== 'active' || !containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset scroll position in case page scrolled behind the opaque preloader
        window.scrollTo(0, 0)
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
  }, [phase, scrambleText])

  // 'done' = preloader finished or skipped — render nothing
  if (phase === 'done') return null

  // Mobile preloader: CSS-only, no GSAP
  if (phase === 'mobile' || phase === 'mobile-exit') {
    const isExiting = phase === 'mobile-exit'
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]"
        style={{
          zIndex: 99999,
          animation: isExiting ? 'preloader-fade-out 300ms ease-out forwards' : undefined,
        }}
        aria-hidden="true"
      >
        <div
          style={{
            animation: 'preloader-mobile-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Logo */}
          <img
            src="/invenex-logo.png"
            alt=""
            style={{
              width: '64px',
              height: '64px',
              display: 'block',
              margin: '0 auto',
            }}
          />

          {/* Brand name */}
          <div
            style={{
              marginTop: '20px',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#ffffff',
              textAlign: 'center',
              fontFamily: 'var(--font-sans)',
            }}
          >
            INVENEX
          </div>

          {/* Accent line */}
          <div
            style={{
              width: '40px',
              height: '2px',
              background: '#FF6B35',
              margin: '12px auto 0',
              animation: 'preloader-line-grow 800ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards',
              transform: 'scaleX(0)',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              marginTop: '12px',
              fontSize: '11px',
              color: '#A3A3A3',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textAlign: 'center',
              opacity: 0,
              animation: 'preloader-tagline-in 400ms ease-out 400ms forwards',
            }}
          >
            Premium Digital Solutions
          </div>
        </div>
      </div>
    )
  }

  // 'pending' renders a static black screen (included in server HTML so
  // the page content is never visible before the preloader).
  // 'active' adds the GSAP animation children on top.
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]"
      style={{ zIndex: 99999 }}
      aria-hidden="true"
    >
      {phase === 'active' && (
        <>
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
        </>
      )}
    </div>
  )
}
