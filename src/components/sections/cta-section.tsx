"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

function CharRevealText({
  text,
  className,
  gradient = false,
}: {
  text: string;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char
          className={gradient ? "text-gradient-orange" : undefined}
          style={{
            display: "inline-block",
            opacity: 0.1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Character reveal on scroll
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-char]", { opacity: 1 });
        gsap.set("[data-cta-content]", { opacity: 1, y: 0 });
        return;
      }

      const init = async () => {
        await registerScrollTrigger();
        const section = sectionRef.current;
        if (!section) return;

        const chars = section.querySelectorAll("[data-char]");

        // Character-by-character scrub reveal
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });

        // CTAs fade in after text reveals
        gsap.fromTo(
          "[data-cta-content]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "center 55%",
            },
          }
        );

        // Grid zoom on scroll
        gsap.fromTo(
          "[data-cta-grid]",
          { scale: 1, opacity: 0.015 },
          {
            scale: 1.15,
            opacity: 0.03,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      };
      init();
    },
    { scope: sectionRef }
  );

  // Mouse-tracking coral spotlight
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    const moveX = gsap.quickTo(spotlight, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const moveY = gsap.quickTo(spotlight, "y", {
      duration: 0.6,
      ease: "power3",
    });

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      moveX(e.clientX - rect.left - 300);
      moveY(e.clientY - rect.top - 300);
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-background relative overflow-hidden"
      aria-labelledby="cta-section-title"
      data-testid="cta-section"
    >
      {/* Static coral gradient orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-coral-500/[0.06] rounded-full blur-[200px]" />
      </div>

      {/* Mouse-tracking spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)",
          left: 0,
          top: 0,
        }}
      />

      {/* Grid overlay with zoom */}
      <div
        data-cta-grid
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.015,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Monospace label */}
          <p className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-8 text-center md:text-left font-mono">
            Let&apos;s Talk
          </p>

          {/* Character reveal headline */}
          <h2
            id="cta-section-title"
            className="leading-[0.9] text-center md:text-left mb-12"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <span className="block" style={{ fontWeight: 200 }}>
              <CharRevealText text="LET'S BUILD" />
            </span>
            <span className="block" style={{ fontWeight: 900 }}>
              <CharRevealText text="SOMETHING EPIC" gradient />
              <span data-char style={{ color: "var(--color-coral-500)", display: "inline-block", opacity: 0.1 }}>.</span>
            </span>
          </h2>

          {/* Subtext and CTAs — fade in after text reveal */}
          <div
            data-cta-content
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8" data-animate
          >
            <p className="text-lg md:text-xl text-foreground-muted max-w-md text-center md:text-left">
              Ready to stand out? Let&apos;s create something that makes an
              impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-end gap-4">
              <Button
                asChild
                size="lg"
                className="bg-coral-500 hover:bg-coral-600 text-white rounded-full px-8 shadow-[0_0_20px_rgba(255,106,55,0.3)] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
              >
                <Link href="/contact" className="group">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link
                  href="/portfolio"
                  className="group text-foreground-muted hover:text-foreground"
                >
                  View Our Work
                  <ArrowRight className="ml-2 w-5 h-5 text-coral-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
