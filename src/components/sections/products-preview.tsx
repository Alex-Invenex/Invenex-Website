"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight, Utensils, Building2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const CATERFLOW_METRICS = [
  { value: "12K+", label: "Orders Managed" },
  { value: "50+", label: "Active Caterers" },
  { value: "99.9%", label: "Uptime" },
];

const CATERFLOW_FEATURES = [
  "Order Management",
  "Inventory Tracking",
  "Customer Portal",
  "Analytics Dashboard",
  "Multi-location Support",
  "Real-time Notifications",
];

export function ProductsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tiltHovered, setTiltHovered] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-prod]", { opacity: 1, y: 0, x: 0, scale: 1 });
        return;
      }

      const init = async () => {
        await registerScrollTrigger();

        // Header
        gsap.fromTo(
          "[data-prod='header']",
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

        // CaterFlow showcase slides in from right
        gsap.fromTo(
          "[data-prod='showcase']",
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-prod='showcase']",
              start: "top 80%",
            },
          }
        );

        // Floating metric cards stagger in
        gsap.fromTo(
          "[data-prod='metric']",
          { opacity: 0, y: 30, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: "[data-prod='showcase']",
              start: "top 65%",
            },
          }
        );

        // ERP card
        gsap.fromTo(
          "[data-prod='erp']",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-prod='erp']",
              start: "top 85%",
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
      className="py-20 md:py-32 lg:py-44 bg-background relative overflow-hidden"
      aria-labelledby="products-preview-title"
      data-testid="products-preview-section"
    >
      {/* Coral background orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-coral-500/[0.04] rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-coral-500/[0.03] rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div data-prod="header" data-animate className="mb-16">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            Our Products
          </span>
          <h2
            id="products-preview-title"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>Our </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
              Products
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl">
            We don&apos;t just build for others. We create products that solve
            real problems.
          </p>
        </div>

        {/* CaterFlow — Full-width showcase */}
        <div
          data-prod="showcase"
          className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-coral-500/20 transition-all duration-500 mb-8" data-animate
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Status badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-coral-500" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-2">CaterFlow</h3>
              <p className="text-foreground-muted text-lg mb-2">
                Catering Management, Simplified
              </p>
              <p className="text-foreground-muted text-sm mb-8 leading-relaxed max-w-md">
                A complete catering management platform built for caterers who want to
                streamline operations, manage orders, and grow their business.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {CATERFLOW_FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground-muted"
                  >
                    <div className="w-5 h-5 rounded-full bg-coral-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-coral-500" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button asChild variant="coral" size="lg" className="w-fit">
                <a
                  href="https://caterflow.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Visit CaterFlow
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Right: App screenshot with 3D tilt effect */}
            <div className="relative min-h-[300px] lg:min-h-0 flex items-center justify-center p-8 lg:p-12">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 via-coral-400/10 to-coral-600/20" />
              <div className="absolute inset-0 bg-grid opacity-20" />

              {/* App screenshot placeholder with 3D perspective */}
              <div
                className="relative w-full max-w-[400px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-coral-500/10 transition-transform duration-500"
                style={{
                  transform: tiltHovered
                    ? "perspective(1000px) rotateY(0deg) rotateX(0deg)"
                    : "perspective(1000px) rotateY(-5deg) rotateX(2deg)",
                }}
                onMouseEnter={() => setTiltHovered(true)}
                onMouseLeave={() => setTiltHovered(false)}
              >
                <Image
                  src="/products/caterflow-cover.png"
                  alt="CaterFlow — Catering management platform"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Floating metric cards */}
              {CATERFLOW_METRICS.map((metric, i) => (
                <div
                  key={metric.label}
                  data-prod="metric"
                  className={`absolute opacity-0 backdrop-blur-xl bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl ${
                    i === 0
                      ? "top-4 right-4 lg:top-8 lg:right-8"
                      : i === 1
                      ? "bottom-4 left-4 lg:bottom-8 lg:left-8"
                      : "bottom-4 right-4 lg:bottom-8 lg:right-8"
                  }`}
                >
                  <div className="text-xl md:text-2xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-xs text-foreground-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ERP — Coming Soon teaser */}
        <div
          data-prod="erp"
          className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden p-8 md:p-10 hover:border-amber-500/20 transition-all duration-500" data-animate
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold">Invenex ERP</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Coming Soon
                  </span>
                </div>
                <p className="text-foreground-muted text-sm max-w-lg">
                  Next-generation ERP solution designed for modern businesses. Unified platform
                  for finance, HR, inventory, and operations management.
                </p>
              </div>
            </div>
            <Button asChild variant="secondary" size="lg" className="flex-shrink-0">
              <Link
                href="/products#erp"
                className="inline-flex items-center gap-2"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            Explore all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
