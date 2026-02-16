"use client";

import { useRef, useState } from "react";
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
    <div data-step className={cn("flex-shrink-0", className)}>
      <div
        className={cn(
          "relative h-full p-8 md:p-10 rounded-2xl overflow-hidden",
          "border border-white/[0.08]",
          "backdrop-blur-sm",
          "hover:border-coral-500/30",
          "transition-all duration-500",
          "group"
        )}
        style={{
          background:
            "linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%)",
        }}
      >
        {/* Top accent bar — visible on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, var(--color-coral-500) 0%, var(--color-coral-400) 50%, transparent 100%)",
          }}
        />

        {/* Outlined hollow number */}
        <span
          className="block font-mono leading-none mb-6 select-none"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 200,
            WebkitTextStroke: "1px var(--color-coral-500)",
            WebkitTextFillColor: "transparent",
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

        {/* Status-dot highlight tag */}
        <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-coral-500/10 text-coral-500 border border-coral-500/20">
          <span
            className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0"
            aria-hidden="true"
          />
          {step.highlight}
        </span>

        {/* Decorative corner line */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4 w-8 h-[1px] bg-coral-500/30" />
          <div className="absolute top-4 right-4 w-[1px] h-8 bg-coral-500/30" />
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-step]", { opacity: 1, y: 0 });
        gsap.set("[data-hw-header]", { opacity: 1, y: 0 });
        gsap.set("[data-hw-context]", { opacity: 1, y: 0 });
        return;
      }

      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        // Header entrance
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

        // Context panel entrance
        gsap.fromTo(
          "[data-hw-context]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );

        // Desktop: horizontal scroll with sticky left context
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            const cards = track.querySelectorAll("[data-step]");
            const totalWidth = track.scrollWidth - window.innerWidth * 0.65;

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

            // Per-card entrance + step counter update
            cards.forEach((card, i) => {
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

              // Update active step counter when card enters center
              ScrollTrigger.create({
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 60%",
                end: "left 30%",
                onEnter: () => setActiveStep(i),
                onEnterBack: () => setActiveStep(i),
              });
            });

            // Animate progress bar via scaleX
            const progressEl = section.querySelector(
              "[data-hw-progress]"
            ) as HTMLElement;
            if (progressEl) {
              gsap.fromTo(
                progressEl,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${totalWidth * 1.5}`,
                    scrub: 1,
                  },
                }
              );
            }
          },
          "(max-width: 767px)": () => {
            // Mobile: simple stagger entrance with new card design
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-500/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral-500/[0.03] rounded-full blur-[120px]" />

      {/* Header */}
      <div className="pt-32 md:pt-44 pb-12 md:pb-16 container mx-auto px-6 relative z-10">
        <div data-hw-header data-animate>
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            Our Process
          </span>
          <h2
            id="how-we-work-title"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>How We </span>
            <span
              className="text-gradient-orange"
              style={{ fontWeight: 900 }}
            >
              Work
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl">
            A proven process refined over years to deliver exceptional results,
            every time.
          </p>
        </div>
      </div>

      {/* DESKTOP: Split layout — sticky context + scrolling cards */}
      <div className="hidden md:block pb-32 md:pb-44">
        <div className="flex">
          {/* Sticky left context panel */}
          <div
            className="w-[35%] shrink-0 pl-6 lg:pl-[calc((100vw-1280px)/2+1.5rem)] relative z-0"
          >
            <div
              data-hw-context
              className="sticky top-[40vh] pb-20" data-animate
            >
              {/* Active step title */}
              <h3
                className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-3 transition-all duration-300"
                data-hw-step-title
              >
                {steps[activeStep].title}
              </h3>

              {/* Step indicator dots */}
              <div className="flex items-center gap-3 mb-8">
                {steps.map((step, i) => (
                  <div
                    key={step.number}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-mono transition-all duration-300",
                      i === activeStep
                        ? "text-coral-500"
                        : "text-foreground-muted/40"
                    )}
                  >
                    {i === activeStep && (
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                    )}
                    {step.number}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-[200px] h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  data-hw-progress
                  className="h-full rounded-full origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-coral-500), var(--color-coral-400))",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scrolling right card track */}
          <div
            ref={trackRef}
            className="flex gap-8 pr-[20vw] relative z-10"
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
      </div>

      {/* MOBILE: Vertical stacked cards with new design */}
      <div className="md:hidden pb-24 px-6">
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              data-mobile-step
              className={cn(
                "relative p-6 rounded-2xl overflow-hidden",
                "border border-white/[0.08]",
                "backdrop-blur-sm"
              )}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-coral-500) 0%, transparent 60%)",
                  opacity: 0.4,
                }}
              />

              {/* Outlined hollow number */}
              <span
                className="block font-mono leading-none mb-4 select-none"
                style={{
                  fontSize: "3rem",
                  fontWeight: 200,
                  WebkitTextStroke: "1px var(--color-coral-500)",
                  WebkitTextFillColor: "transparent",
                }}
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

              {/* Status-dot highlight tag */}
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-coral-500/10 text-coral-500 border border-coral-500/20">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0"
                  aria-hidden="true"
                />
                {step.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
