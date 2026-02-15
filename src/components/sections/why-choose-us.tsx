"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, audience, and goals. Through collaborative workshops and research, we uncover the insights that shape exceptional solutions.",
    highlight: "Research & Strategy",
  },
  {
    number: "02",
    title: "Design",
    description:
      "From wireframes to high-fidelity prototypes, we craft pixel-perfect interfaces that balance beauty with usability and align with your brand identity.",
    highlight: "UI/UX & Prototyping",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Clean, scalable code built with Next.js, React, and modern technologies. Every feature is tested, optimized, and ready for production at scale.",
    highlight: "Engineering & QA",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Launch day is just the beginning. We provide ongoing support, analytics insights, and iterative improvements to keep your product ahead of the curve.",
    highlight: "Launch & Growth",
  },
];

function StepCard({
  step,
  className,
}: {
  step: (typeof steps)[0];
  className?: string;
}) {
  return (
    <div
      data-step
      className={cn("flex-shrink-0", className)}
    >
      <div
        className={cn(
          "relative h-full p-8 md:p-10 rounded-2xl",
          "bg-white/[0.02] border border-white/[0.06]",
          "backdrop-blur-sm",
          "hover:bg-white/[0.04] hover:border-[#FF6A37]/20",
          "transition-all duration-500",
          "group"
        )}
      >
        {/* Large coral gradient number */}
        <span
          className="block font-mono text-gradient-orange leading-none mb-6 select-none"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 200,
          }}
          aria-hidden="true"
        >
          {step.number}
        </span>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">
          {step.title}
        </h3>

        <p className="text-foreground-muted text-sm md:text-base leading-relaxed mb-4 md:mb-6">
          {step.description}
        </p>

        {/* Highlight tag */}
        <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-[#FF6A37]/10 text-[#FF6A37] border border-[#FF6A37]/20">
          {step.highlight}
        </span>

        {/* Decorative corner line */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4 w-8 h-[1px] bg-[#FF6A37]/30" />
          <div className="absolute top-4 right-4 w-[1px] h-8 bg-[#FF6A37]/30" />
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll pinning on desktop via matchMedia
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-step]", { opacity: 1, y: 0 });
        return;
      }

      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        // Header entrance (all breakpoints)
        gsap.fromTo(
          "[data-hw-header]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );

        // Desktop only: horizontal scroll pinning
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            const cards = track.querySelectorAll("[data-step]");
            const totalWidth = track.scrollWidth - window.innerWidth;

            const scrollTween = gsap.to(track, {
              x: -totalWidth,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${totalWidth * 1.5}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });

            // Staggered card entrance as they scroll into view
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0.3, scale: 0.92 },
                {
                  opacity: 1,
                  scale: 1,
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 80%",
                    end: "left 40%",
                    scrub: 1,
                  },
                  ease: "power2.out",
                }
              );
            });
          },
          "(max-width: 767px)": () => {
            // Mobile: simple stagger entrance
            gsap.fromTo(
              "[data-mobile-step]",
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 70%",
                },
              }
            );
          },
        });
      };
      init();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      aria-labelledby="how-we-work-title"
      data-testid="why-choose-us-section"
    >
      {/* Coral background orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6A37]/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6A37]/[0.03] rounded-full blur-[120px]" />

      {/* Header — inside the pin so it stays visible */}
      <div className="pt-32 md:pt-44 pb-12 md:pb-16 container mx-auto px-6 relative z-10">
        <div data-hw-header className="opacity-0">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            Our Process
          </span>
          <h2
            id="how-we-work-title"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>How We </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
              Work
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl">
            A proven process refined over years to deliver exceptional results, every time.
          </p>
        </div>
      </div>

      {/* DESKTOP: Horizontal scroll track — hidden on mobile via CSS */}
      <div className="hidden md:block pb-32 md:pb-44">
        <div
          ref={trackRef}
          className="flex gap-8 pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)] pr-[20vw]"
          style={{ width: "fit-content" }}
        >
          {steps.map((step) => (
            <StepCard
              key={step.number}
              step={step}
              className="w-[480px] lg:w-[520px]"
            />
          ))}
        </div>
      </div>

      {/* MOBILE: Vertical stacked cards — hidden on desktop via CSS */}
      <div className="md:hidden pb-24 px-6">
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              data-mobile-step
              className={cn(
                "relative p-6 rounded-2xl",
                "bg-white/[0.02] border border-white/[0.06]",
                "backdrop-blur-sm"
              )}
            >
              <span
                className="block font-mono text-gradient-orange leading-none mb-4 select-none"
                style={{ fontSize: "3rem", fontWeight: 200 }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3 className="text-xl font-semibold tracking-tight mb-3">
                {step.title}
              </h3>

              <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-[#FF6A37]/10 text-[#FF6A37] border border-[#FF6A37]/20">
                {step.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
