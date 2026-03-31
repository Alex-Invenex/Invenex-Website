'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/* ─── Component ───────────────────────────────────────── */
export function HeroV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useRef(false)
  const isTouchDevice = useRef(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    isTouchDevice.current = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches
    setMounted(true)
  }, [])

  /* ── Entrance choreography ─────────────────────────── */
  useGSAP(
    () => {
      gsap.registerPlugin(useGSAP)
      if (!mounted) return
      const rm = reducedMotion.current

      // Reduced motion or touch device: show everything instantly
      if (rm || isTouchDevice.current) {
        gsap.set('[data-a]', {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'none',
        })
        return
      }

      // Defer GSAP one frame so browser can paint visible content first (LCP)
      requestAnimationFrame(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Gradient orbs — fade in with scale
        tl.fromTo(
          '[data-a="tunnel-glow"]',
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            stagger: 0.1,
            ease: 'power2.out',
          },
          0
        )

        // Atmospheric haze
        tl.fromTo(
          '[data-a="tunnel-haze"]',
          { opacity: 0 },
          { opacity: 1, duration: 2, ease: 'power1.out' },
          0.2
        )

        // Badge pill — blur-in from left
        tl.fromTo(
          '[data-a="badge"]',
          { opacity: 0, x: -40, filter: 'blur(8px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8 },
          0.15
        )

        // Headline words — dramatic reveal from below
        tl.fromTo(
          '[data-a="word"]',
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out',
          },
          0.25
        )

        // Subtitle border grows top→down
        tl.fromTo(
          '[data-a="border"]',
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, transformOrigin: 'top' },
          0.85
        )
        // Note: subtitle ([data-a="desc"]) is NOT animated — it's the LCP element

        // CTA buttons
        tl.fromTo(
          '[data-a="cta"]',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          1.05
        )

        // Bottom bar
        tl.fromTo(
          '[data-a="bottom"]',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.4
        )

        // 3D Sphere — dramatic scale-in
        tl.fromTo(
          '[data-a="hero-sphere"]',
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
          },
          0.3
        )

        // ── Continuous loops ──
        // Sphere floating
        gsap.to('[data-a="hero-sphere"]', {
          y: -15,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2,
        })

        // Gradient orbs subtle breathing
        gsap.to('[data-a="tunnel-glow"]', {
          scale: 1.06,
          duration: 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.5,
          stagger: 0.3,
        })

        // ── Scroll-out parallax ──
        const initScrollOut = async () => {
          const { registerScrollTrigger } = await import('@/lib/gsap')
          await registerScrollTrigger()

          // Fade hero content
          gsap.fromTo(
            '[data-a="word"], [data-a="badge"], [data-a="border"], [data-a="cta"], [data-a="bottom"]',
            { y: 0, opacity: 1 },
            {
              y: -20,
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: '80% center',
                end: 'bottom -30%',
                scrub: 1,
              },
            }
          )

          // Tunnel + sphere fades on scroll
          gsap.fromTo(
            '[data-a="tunnel-glow"], [data-a="tunnel-haze"], [data-a="hero-sphere"]',
            { opacity: 1, y: 0 },
            {
              opacity: 0.15,
              y: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: '80% center',
                end: 'bottom -30%',
                scrub: 1,
              },
            }
          )
        }
        initScrollOut()
      }) // end requestAnimationFrame
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  /* ── Mouse parallax (desktop only) ──────────────────── */
  useEffect(() => {
    if (!mounted || reducedMotion.current || isTouchDevice.current) return
    const section = sectionRef.current
    if (!section) return

    const tunnelEl = section.querySelector('[data-p="tunnel"]')
    if (!tunnelEl) return

    const tX = gsap.quickTo(tunnelEl, 'x', {
      duration: 1.2,
      ease: 'power3',
    })
    const tY = gsap.quickTo(tunnelEl, 'y', {
      duration: 1.2,
      ease: 'power3',
    })

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      tX(nx * 15)
      tY(ny * 10)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mounted])

  /* ── Render ──────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-center bg-background"
      style={{ overflow: 'clip' }}
      aria-labelledby="hero-title"
      data-testid="hero-section"
    >
      {/* ─ Grain texture overlay ─ */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      {/* ─ Abstract Gradient Composition ─ */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ overflow: 'clip' }}
      >
        {/* Parallax target wraps all layers */}
        <div data-p="tunnel" data-hero-orbs>

          {/* === Massive ambient glow — sets the mood === */}
          <div
            data-a="tunnel-haze"
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-20%',
              width: '1100px',
              height: '1100px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,106,55,0.18) 0%, rgba(255,60,30,0.06) 40%, transparent 70%)',
              filter: 'blur(120px)',
              opacity: 0,
            }}
          />

          {/* === Warm ambient pool behind sphere === */}
          <div
            data-a="tunnel-glow"
            style={{
              position: 'absolute',
              top: '10%',
              right: '2%',
              width: '700px',
              height: '700px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,106,55,0.5) 0%, rgba(255,80,40,0.2) 35%, transparent 65%)',
              filter: 'blur(100px)',
              opacity: 0,
            }}
          />

          {/* === Horizontal light flare — cinematic streak === */}
          <div
            data-a="tunnel-glow"
            style={{
              position: 'absolute',
              top: '38%',
              right: '-10%',
              width: '900px',
              height: '6px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,160,100,0.6) 30%, rgba(255,220,180,0.9) 50%, rgba(255,160,100,0.6) 70%, transparent 100%)',
              filter: 'blur(12px)',
              opacity: 0,
            }}
          />

          {/* === Secondary flare — wider, softer === */}
          <div
            data-a="tunnel-haze"
            style={{
              position: 'absolute',
              top: '36%',
              right: '-15%',
              width: '1000px',
              height: '40px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,106,55,0.25) 25%, rgba(255,140,80,0.35) 50%, rgba(255,106,55,0.25) 75%, transparent 100%)',
              filter: 'blur(30px)',
              opacity: 0,
            }}
          />

          {/* === Conic light sweep — directional rim light === */}
          <div
            data-a="tunnel-glow"
            style={{
              position: 'absolute',
              top: '5%',
              right: '0%',
              width: '650px',
              height: '650px',
              borderRadius: '50%',
              background:
                'conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(255,106,55,0.25) 40deg, rgba(255,180,120,0.15) 90deg, transparent 160deg, rgba(255,80,40,0.1) 250deg, transparent 360deg)',
              filter: 'blur(60px)',
              opacity: 0,
            }}
          />

          {/* === Floor reflection — light spilling down === */}
          <div
            data-a="tunnel-haze"
            style={{
              position: 'absolute',
              bottom: '-10%',
              right: '5%',
              width: '600px',
              height: '300px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(255,106,55,0.15) 0%, rgba(255,80,40,0.05) 50%, transparent 80%)',
              filter: 'blur(50px)',
              opacity: 0,
            }}
          />

          {/* === THE 3D SPHERE — hero focal point === */}
          {/* Outer glow ring */}
          <div
            data-a="hero-sphere"
            style={{
              position: 'absolute',
              top: '13%',
              right: '7%',
              width: 'clamp(320px, 32vw, 480px)',
              height: 'clamp(320px, 32vw, 480px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,106,55,0.3) 30%, transparent 70%)',
              filter: 'blur(40px)',
              opacity: 0,
            }}
          />
          {/* Sphere body */}
          <div
            data-a="hero-sphere"
            style={{
              position: 'absolute',
              top: 'calc(13% + clamp(30px, 3vw, 45px))',
              right: 'calc(7% + clamp(30px, 3vw, 45px))',
              width: 'clamp(260px, 26vw, 390px)',
              height: 'clamp(260px, 26vw, 390px)',
              borderRadius: '50%',
              background: `
                radial-gradient(circle at 35% 30%,
                  rgba(255, 230, 200, 1) 0%,
                  rgba(255, 180, 120, 0.95) 10%,
                  rgba(255, 130, 70, 1) 25%,
                  rgba(255, 106, 55, 1) 40%,
                  rgba(200, 65, 20, 0.98) 60%,
                  rgba(130, 40, 10, 0.95) 80%,
                  rgba(60, 15, 0, 0.92) 100%
                )
              `,
              boxShadow: `
                0 0 200px rgba(255, 106, 55, 0.5),
                0 0 80px rgba(255, 106, 55, 0.35),
                0 0 30px rgba(255, 140, 80, 0.2),
                inset -25px -30px 50px rgba(0, 0, 0, 0.4),
                inset 15px 15px 40px rgba(255, 220, 180, 0.2),
                inset 5px 5px 15px rgba(255, 240, 220, 0.15)
              `,
              opacity: 0,
            }}
          />
          {/* Specular highlight — bright hotspot on sphere */}
          <div
            data-a="hero-sphere"
            style={{
              position: 'absolute',
              top: 'calc(13% + clamp(50px, 5vw, 75px))',
              right: 'calc(7% + clamp(120px, 12vw, 180px))',
              width: 'clamp(60px, 6vw, 90px)',
              height: 'clamp(45px, 4.5vw, 68px)',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,220,180,0.2) 50%, transparent 100%)',
              filter: 'blur(8px)',
              opacity: 0,
            }}
          />
        </div>

        {/* Noise texture over gradients for cinematic grain */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '65%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.06,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ─ Main content ─ */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge pill */}
          <div
            data-a="badge"
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-surface-border bg-surface-overlay"
          >
            <span
              className="w-2 h-2 rounded-full bg-coral-500 animate-pulse-glow"
              style={{
                boxShadow: '0 0 8px rgba(255,106,55,0.6)',
              }}
            />
            <span className="text-xs tracking-[0.2em] uppercase text-foreground-muted">
              Digital Innovation Agency
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-title"
            className="leading-[0.9] tracking-[-0.04em]"
          >
            {/* We Craft — thinner weight */}
            <span
              data-a="word"
              className="block text-foreground/60"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
                fontWeight: 300,
                marginBottom: '0.15em',
              }}
            >
              We Craft
            </span>

            {/* Digital — coral gradient */}
            <span
              data-a="word"
              className="block"
              style={{
                fontSize: 'clamp(3.2rem, 7vw, 7rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                background:
                  'linear-gradient(135deg, var(--color-coral-400) 0%, var(--color-coral-500) 40%, var(--color-coral-600) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital
            </span>

            {/* Futures. — bold with coral period */}
            <span
              data-a="word"
              className="block text-foreground"
              style={{
                fontSize: 'clamp(3.2rem, 7vw, 7rem)',
                fontWeight: 900,
                lineHeight: 0.95,
              }}
            >
              Futures<span className="text-coral-500">.</span>
            </span>
          </h1>

          {/* Subtitle with coral accent border */}
          <div className="mt-8 md:mt-10 flex">
            <div
              data-a="border"
              className="w-0.5 min-h-[3rem] bg-coral-500 shrink-0"
              style={{ transform: 'scaleY(0)' }}
            />
            <p
              data-a="desc"
              className="pl-4 md:pl-5 text-base md:text-lg lg:text-xl text-foreground-muted max-w-lg leading-relaxed"
            >
              Premium web experiences, mobile apps &amp; platforms for
              businesses that demand excellence and innovation.
            </p>
          </div>

          {/* CTA row */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start gap-4">
            <div data-a="cta">
              <Button
                asChild
                variant="coral"
                size="lg"
                data-testid="hero-cta-primary"
              >
                <Link href="/contact" className="group">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
            <div data-a="cta">
              <Button
                asChild
                variant="ghost"
                size="lg"
                data-testid="hero-cta-secondary"
                className="text-foreground-muted hover:text-foreground"
              >
                <Link href="/portfolio" className="group">
                  Our Work
                  <ArrowRight className="ml-2 w-5 h-5 text-coral-500 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          data-a="bottom"
          className="mt-16 md:mt-20 flex items-center justify-between"
        >
          {/* Scroll indicator */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground-muted font-mono">
              Scroll to Explore
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-coral-500" />
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/invenexsolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground-muted/50 hover:text-foreground-muted transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/invenexsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-foreground-muted/50 hover:text-foreground-muted transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://github.com/enterprises/invenex-solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground-muted/50 hover:text-foreground-muted transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Backwards-compatible export
export { HeroV2 as Hero }
