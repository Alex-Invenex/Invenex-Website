"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

export function CTASection() {
  return (
    <section
      className="py-32 md:py-40 bg-background relative overflow-hidden"
      aria-labelledby="cta-section-title"
      data-testid="cta-section"
    >
      {/* Coral gradient orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FF6A37]/[0.08] rounded-full blur-[200px]" />
      </div>

      {/* Faint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle background sphere — top right */}
      <div className="absolute top-[10%] right-[15%] w-[200px] h-[200px] bg-[#FF6A37]/[0.06] rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="max-w-5xl mx-auto">
          {/* Monospace label */}
          <p className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-8 text-center md:text-left font-mono">
            // LET&apos;S TALK
          </p>

          {/* MASSIVE CTA HEADLINE — split weight */}
          <h2
            id="cta-section-title"
            className="leading-[0.9] text-center md:text-left mb-12"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <span className="block" style={{ fontWeight: 200 }}>
              LET&apos;S BUILD
            </span>
            <span className="block text-gradient-orange" style={{ fontWeight: 900 }}>
              SOMETHING EPIC<span style={{ color: "#FF6A37" }}>.</span>
            </span>
          </h2>

          {/* Subtext and CTAs */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-lg md:text-xl text-foreground-muted max-w-md text-center md:text-left">
              Ready to stand out? Let&apos;s create something that makes an
              impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-end gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#FF6A37] hover:bg-[#FF4D1D] text-white rounded-full px-8 shadow-[0_0_20px_rgba(255,106,55,0.3)] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
              >
                <Link href="/contact" className="group">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/portfolio" className="group text-foreground-muted hover:text-foreground">
                  View Our Work
                  <ArrowRight className="ml-2 w-5 h-5 text-[#FF6A37] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
