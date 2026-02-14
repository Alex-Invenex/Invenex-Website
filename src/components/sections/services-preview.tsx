"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with Next.js, React, and modern technologies.",
    href: "/services/web-development",
    image: "/portfolio/cooltech-international.png",
  },
  {
    title: "Mobile Apps",
    description:
      "Native iOS and Android applications that deliver exceptional user experiences.",
    href: "/services/mobile-development",
    image: "/portfolio/ginger-designs.png",
  },
  {
    title: "Platform Development",
    description:
      "Enterprise platforms and SaaS solutions designed for scale and reliability.",
    href: "/services/platform-development",
    image: "/portfolio/la-mirage.png",
  },
  {
    title: "Digital Strategy",
    description:
      "Technology consulting and roadmaps to guide your digital transformation.",
    href: "/services/digital-strategy",
    image: "/portfolio/onmyway-ai.png",
  },
];

function ServiceRow({
  service,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !imageRef.current || !underlineRef.current) return;

    if (isActive) {
      gsap.to(imageRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(imageRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <Link
      href={service.href}
      className="group block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        ref={rowRef}
        className={cn(
          "relative py-8 md:py-12 border-b border-white/[0.06]",
          index === 0 && "border-t border-white/[0.06]",
          "transition-opacity duration-500",
        )}
      >
        <div className="flex items-center justify-between gap-6 md:gap-10">
          {/* Number + Title */}
          <div className="flex items-baseline gap-4 md:gap-8 flex-1 min-w-0">
            <span
              className={cn(
                "font-mono text-sm md:text-base tracking-wider transition-colors duration-300 flex-shrink-0",
                isActive ? "text-[#FF6A37]" : "text-foreground-subtle"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={cn(
                "tracking-tight transition-colors duration-300 leading-none",
                isActive ? "text-foreground" : "text-foreground/60"
              )}
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                fontWeight: 600,
              }}
            >
              {service.title}
            </h3>
          </div>

          {/* Image preview — revealed via clipPath on hover */}
          <div
            ref={imageRef}
            className="hidden lg:block w-[280px] h-[160px] rounded-lg overflow-hidden flex-shrink-0"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <div
              className="w-full h-full bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700"
              style={{ backgroundImage: `url(${service.image})` }}
            />
          </div>

          {/* Arrow */}
          <div
            className={cn(
              "w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center",
              "border transition-all duration-300",
              isActive
                ? "bg-[#FF6A37] border-[#FF6A37] scale-100"
                : "bg-transparent border-white/10 scale-90 opacity-50"
            )}
          >
            <ArrowRight
              className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive ? "text-white translate-x-0.5" : "text-foreground-muted"
              )}
            />
          </div>
        </div>

        {/* Description — slides in on hover (desktop) or always visible (mobile) */}
        <div className="mt-3 md:mt-0 md:absolute md:bottom-4 md:left-[calc(2rem+3.5rem)] lg:left-[calc(2rem+5rem)]">
          <p className="text-foreground-muted text-sm md:text-base max-w-md md:hidden">
            {service.description}
          </p>
          <p
            className={cn(
              "hidden md:block text-foreground-muted text-sm max-w-md transition-all duration-300",
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {service.description}
          </p>
        </div>

        {/* Coral underline — animates from left */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF6A37] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </Link>
  );
}

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger entrance stagger
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-service-row]", { opacity: 1, y: 0 });
        return;
      }

      const init = async () => {
        await registerScrollTrigger();

        gsap.fromTo(
          "[data-service-header]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          "[data-service-row]",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      };
      init();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-background relative overflow-hidden"
      aria-labelledby="services-preview-title"
      data-testid="services-preview-section"
    >
      {/* Coral background orb */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6A37]/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div data-service-header className="opacity-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
              Services &amp; Expertise
            </span>
            <h2
              id="services-preview-title"
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
            >
              <span style={{ fontWeight: 200 }}>What </span>
              <span className="text-gradient-orange" style={{ fontWeight: 900 }}>We Do</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
          >
            <span>All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial service rows */}
        <div>
          {services.map((service, index) => (
            <div key={service.title} data-service-row className="opacity-0">
              <ServiceRow
                service={service}
                index={index}
                isActive={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
