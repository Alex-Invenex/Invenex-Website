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
      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/[0.08] rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="max-w-5xl mx-auto">
          {/* Small label */}
          <p className="text-sm text-foreground-muted tracking-wide mb-8 text-center md:text-left">
            ( LET&apos;S TALK )
          </p>

          {/* MASSIVE CTA HEADLINE */}
          <h2
            id="cta-section-title"
            className="font-bold leading-[0.9] text-center md:text-left mb-12"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              letterSpacing: '-0.04em',
            }}
          >
            <span className="block">LET&apos;S BUILD</span>
            <span className="block text-gradient">SOMETHING EPIC.</span>
          </h2>

          {/* Subtext and CTAs */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-lg md:text-xl text-foreground-muted max-w-md text-center md:text-left">
              Ready to stand out? Let&apos;s create something that makes an impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-end gap-4">
              <Button asChild size="lg">
                <Link href="/contact" className="group">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/portfolio" className="group">
                  View Our Work
                  <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
