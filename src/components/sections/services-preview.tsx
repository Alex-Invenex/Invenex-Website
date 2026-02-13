"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

// Core services - simplified to 4 key offerings
const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with Next.js, React, and modern technologies.",
    href: "/services/web-development",
  },
  {
    title: "Mobile Apps",
    description:
      "Native iOS and Android applications that deliver exceptional user experiences.",
    href: "/services/mobile-development",
  },
  {
    title: "Platform Development",
    description:
      "Enterprise platforms and SaaS solutions designed for scale and reliability.",
    href: "/services/platform-development",
  },
  {
    title: "Digital Strategy",
    description:
      "Technology consulting and roadmaps to guide your digital transformation.",
    href: "/services/digital-strategy",
  },
];

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="services-preview-title"
      data-testid="services-preview-section"
    >
      {/* Coral background orb */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6A37]/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header — split weight */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
              // SERVICES & EXPERTISE
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
        </AnimatedSection>

        {/* Typography-First Services List with oversized numbers */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "py-8 md:py-10 border-b border-white/10",
                  "flex items-center gap-6 md:gap-10",
                  "transition-all duration-300",
                  index === 0 && "border-t"
                )}
              >
                {/* Oversized Number */}
                <span
                  className={cn(
                    "hidden md:block font-mono tracking-tight transition-colors duration-300 select-none flex-shrink-0",
                    hoveredIndex === index
                      ? "text-[#FF6A37]/30"
                      : "text-foreground/10"
                  )}
                  style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 200, lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Service content */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Service Title - Large Typography */}
                  <h3
                    className={cn(
                      "text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight",
                      "transition-colors duration-300",
                      "group-hover:text-white"
                    )}
                  >
                    <span className="md:hidden text-foreground/20 font-mono text-lg mr-3" style={{ fontWeight: 200 }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {service.title}
                  </h3>

                  {/* Description - Shows on Hover or Always on Mobile */}
                  <div className="flex items-center gap-6">
                    <AnimatePresence mode="wait">
                      {hoveredIndex === index && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-foreground-muted max-w-sm text-sm md:text-base hidden md:block"
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Mobile description - always visible */}
                    <p className="text-foreground-muted text-sm md:hidden">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center",
                        "border border-white/10 bg-white/[0.02]",
                        "transition-all duration-300",
                        "group-hover:bg-[#FF6A37] group-hover:border-[#FF6A37]"
                      )}
                    >
                      <ArrowRight
                        className={cn(
                          "w-5 h-5 transition-all duration-300",
                          "group-hover:text-white"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Left border accent on hover */}
                <div
                  className={cn(
                    "absolute left-0 w-[3px] h-0 bg-[#FF6A37] transition-all duration-300 rounded-full",
                    hoveredIndex === index && "h-12"
                  )}
                  style={{ display: hoveredIndex === index ? "block" : "none" }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
