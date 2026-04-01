"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from "@/lib/gsap";
import { VISUAL_CARDS } from "@/components/ui/service-visual-cards";

/* ─── Service data ─────────────────────────────────────── */
const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    tagline: "Next.js + React",
    description:
      "Custom websites and web applications built with Next.js, React, and TypeScript. Blazing-fast performance, SEO-optimized, and designed to convert.",
    tags: ["Next.js", "React", "TypeScript"],
    href: "/services/web-development",
  },
  {
    number: "02",
    title: "Mobile Apps",
    tagline: "iOS & Android",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Smooth, responsive interfaces that users love to interact with.",
    tags: ["React Native", "iOS", "Android"],
    href: "/services/mobile-development",
  },
  {
    number: "03",
    title: "Platform Development",
    tagline: "Enterprise SaaS",
    description:
      "Scalable SaaS platforms and enterprise systems built on cloud infrastructure. Reliable, secure, and engineered for growth.",
    tags: ["AWS", "Node.js", "PostgreSQL"],
    href: "/services/platform-development",
  },
  {
    number: "04",
    title: "E-Commerce Solutions",
    tagline: "Online Stores",
    description:
      "End-to-end online stores and marketplaces. From product catalogs to checkout flows, we build commerce experiences that drive revenue.",
    tags: ["Shopify", "WooCommerce", "Stripe"],
    href: "/services/ecommerce",
  },
  {
    number: "05",
    title: "Social Media Marketing",
    tagline: "Growth & Engagement",
    description:
      "Data-driven social media strategies that grow your audience and engagement. Content creation, ad campaigns, and performance analytics.",
    tags: ["Instagram", "Meta Ads", "Analytics"],
    href: "/services/social-media",
  },
  {
    number: "06",
    title: "Digital Strategy",
    tagline: "Growth & Consulting",
    description:
      "Comprehensive digital roadmaps that align technology with business goals. Market research, competitive analysis, and growth frameworks.",
    tags: ["Consulting", "Analytics", "Growth"],
    href: "/services/digital-strategy",
  },
];

const PANEL_COUNT = SERVICES.length;

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const rmRef = useRef(false);

  useEffect(() => {
    rmRef.current = shouldSkipAnimations();
    setMounted(true);
  }, []);

  /* ── GSAP animations ────────────────────────────────── */
  useGSAP(
    () => {
      if (!mounted) return;
      const section = sectionRef.current;
      if (!section) return;

      /* Reduced motion: make everything visible, no pin */
      if (rmRef.current) {
        const desktopWrap = section.querySelector("[data-svc-desktop]") as HTMLElement;
        if (desktopWrap) {
          desktopWrap.style.height = "auto";
          desktopWrap.style.paddingTop = "8rem";
          desktopWrap.style.paddingBottom = "4rem";
        }
        const header = section.querySelector("[data-svc-header]") as HTMLElement;
        if (header) {
          header.style.position = "relative";
          header.style.inset = "auto";
          header.style.paddingBottom = "4rem";
        }
        section.querySelectorAll("[data-svc-panel]").forEach((el) => {
          const h = el as HTMLElement;
          h.style.opacity = "1";
          h.style.position = "relative";
          h.style.inset = "auto";
          h.style.marginBottom = "4rem";
        });
        const bottomBar = section.querySelector("[data-svc-bottombar]") as HTMLElement;
        if (bottomBar) bottomBar.style.display = "none";
        gsap.set("[data-svc-tablet]", { opacity: 1, y: 0 });
        gsap.set("[data-svc-mobile]", { opacity: 1, y: 0 });
        return;
      }

      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();

        ScrollTrigger.matchMedia({
          /* ── Desktop: pinned crossfade ─────────────────── */
          "(min-width: 1024px)": () => {
            const vh = window.innerHeight;
            const desktopWrap = section.querySelector("[data-svc-desktop]") as HTMLElement;
            if (!desktopWrap) return;

            const header = desktopWrap.querySelector("[data-svc-header]");
            const panels = desktopWrap.querySelectorAll("[data-svc-panel]");
            const progressBar = desktopWrap.querySelector("[data-svc-progress]");
            if (!header || panels.length === 0) return;

            const FADE = 0.35;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${5 * vh}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (stepRef.current) {
                    const step = Math.min(
                      panels.length - 1,
                      Math.floor(self.progress * panels.length)
                    );
                    stepRef.current.textContent = String(step + 1).padStart(2, "0");
                  }
                },
              },
            });

            // Header fades out + Panel 0 fades in simultaneously
            tl.to(header, { opacity: 0, y: -30, duration: FADE }, 0);
            tl.fromTo(
              panels[0],
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: FADE },
              0
            );

            // Crossfade transitions between panels
            for (let i = 1; i < panels.length; i++) {
              tl.to(panels[i - 1], { opacity: 0, y: -20, duration: FADE }, i);
              tl.fromTo(
                panels[i],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: FADE },
                i
              );
            }

            // Progress bar scrub
            if (progressBar) {
              gsap.fromTo(
                progressBar,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${5 * vh}`,
                    scrub: 0.8,
                  },
                }
              );
            }
          },

          /* ── Tablet: stagger entrance ──────────────────── */
          "(min-width: 768px) and (max-width: 1023px)": () => {
            gsap.fromTo(
              "[data-svc-tab-header]",
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 75%" },
              }
            );
            gsap.fromTo(
              "[data-svc-tablet]",
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 70%" },
              }
            );
          },

          /* ── Mobile: stagger entrance ──────────────────── */
          "(max-width: 767px)": () => {
            gsap.fromTo(
              "[data-svc-mob-header]",
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 75%" },
              }
            );
            gsap.fromTo(
              "[data-svc-mobile]",
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 70%" },
              }
            );
          },
        });
      };

      init();
    },
    { scope: sectionRef, dependencies: [mounted] }
  );

  /* ── Render ────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ zIndex: 10 }}
      aria-labelledby="services-preview-title"
      data-testid="services-preview-section"
    >
      <h2 id="services-preview-title" className="sr-only">
        Our Services
      </h2>

      {/* Background atmosphere — overflow-hidden here, NOT on section (breaks GSAP pin) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full blur-[180px]"
          style={{ width: "700px", height: "700px", top: "10%", left: "30%", background: "rgba(255,107,53,0.04)" }}
        />
        <div
          className="absolute rounded-full blur-[140px]"
          style={{ width: "500px", height: "500px", bottom: "5%", right: "20%", background: "rgba(255,107,53,0.025)" }}
        />
        <div
          className="absolute rounded-full blur-[160px]"
          style={{ width: "400px", height: "400px", top: "20%", right: "10%", background: "rgba(139,92,246,0.02)" }}
        />
      </div>

      {/* ═══ DESKTOP LAYOUT (lg+) ════════════════════════ */}
      <div
        data-svc-desktop
        className="hidden lg:flex flex-col relative z-10"
        style={{ height: "100dvh" }}
      >
        {/* Header — centered, fades out on scroll */}
        <div
          data-svc-header
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-center">
            <p className="text-xs text-foreground-muted/60 tracking-[0.25em] uppercase mb-6 font-mono">
              Services &amp; Expertise
            </p>
            <h3
              className="tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 200, lineHeight: 1.1 }}
            >
              <span className="text-foreground/50">What We </span>
              <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
                Build
              </span>
            </h3>
          </div>
        </div>

        {/* Service panels — stacked in same position */}
        <div className="flex-1 relative">
          {SERVICES.map((svc, i) => {
            const Card = VISUAL_CARDS[i];
            return (
              <div
                key={svc.number}
                data-svc-panel
                className="absolute inset-0 flex items-center"
                style={{ opacity: 0 }}
              >
                <div className="container mx-auto px-6 lg:px-16 xl:px-20 flex items-center">
                  {/* Left column: text content */}
                  <div style={{ width: "55%", paddingRight: "4rem" }}>
                    <span
                      className="block font-mono leading-none mb-6 select-none"
                      style={{
                        fontSize: "clamp(3rem, 5vw, 5rem)",
                        fontWeight: 200,
                        WebkitTextStroke: "1px var(--color-coral-500)",
                        WebkitTextFillColor: "transparent",
                      }}
                      aria-hidden="true"
                    >
                      {svc.number}
                    </span>
                    <h3
                      className="font-bold tracking-tight mb-4"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="text-foreground-muted leading-relaxed mb-6"
                      style={{ maxWidth: "28rem" }}
                    >
                      {svc.description}
                    </p>
                    <div className="flex gap-2 flex-wrap mb-6">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-full font-mono text-foreground-muted/70"
                          style={{
                            background: "var(--color-surface-overlay)",
                            border: "1px solid var(--color-surface-border)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={svc.href}
                      className="group inline-flex items-center gap-2 text-coral-500 hover:text-coral-400 transition-colors text-sm font-medium"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Right column: visual card */}
                  <div style={{ width: "45%" }} className="flex items-center justify-center">
                    <div style={{ maxWidth: "320px", width: "100%" }}>
                      <Card />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom bar: step counter + progress + link */}
        <div data-svc-bottombar className="relative z-20 pb-8">
          <div className="container mx-auto px-6 lg:px-16 xl:px-20 flex items-center gap-6">
            <div className="flex items-baseline gap-1.5">
              <span
                ref={stepRef}
                className="text-sm font-mono text-foreground tabular-nums"
                style={{ minWidth: "1.2em" }}
              >
                01
              </span>
              <span className="text-xs font-mono text-foreground-muted/40">
                / {String(PANEL_COUNT).padStart(2, "0")}
              </span>
            </div>
            <div
              className="flex-1 h-[2px] rounded-full overflow-hidden"
              style={{ background: "var(--color-surface-overlay)" }}
            >
              <div
                data-svc-progress
                className="h-full rounded-full origin-left"
                style={{
                  background: "linear-gradient(90deg, var(--color-coral-500), var(--color-coral-400))",
                  transform: "scaleX(0)",
                }}
              />
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors duration-300 text-sm"
            >
              All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ TABLET LAYOUT (md to lg) ════════════════════ */}
      <div className="hidden md:block lg:hidden py-32 md:py-44 relative z-10">
        <div className="container mx-auto px-6">
          <div data-svc-tab-header className="text-center mb-12">
            <p className="text-xs text-foreground-muted tracking-[0.2em] uppercase mb-4 font-mono">
              Services &amp; Expertise
            </p>
            <h3
              className="tracking-[-0.03em]"
              style={{ fontSize: "2.5rem", fontWeight: 200, lineHeight: 1.1 }}
            >
              <span className="text-foreground/50">What We </span>
              <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
                Build
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {SERVICES.map((svc) => (
              <Link key={svc.title} href={svc.href} className="group" data-svc-tablet>
                <div
                  className="rounded-xl border border-surface-border p-4 hover:border-coral-500/30 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, var(--color-card-gradient-from) 0%, var(--color-card-gradient-to) 100%)",
                  }}
                >
                  <div className="text-xs font-mono text-coral-500/60 mb-2">{svc.number}</div>
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-coral-400 transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <span className="text-[11px] text-foreground-muted">{svc.tagline}</span>
                  <div className="mt-3 flex justify-end">
                    <ArrowRight className="w-3.5 h-3.5 text-foreground-muted/40 group-hover:text-coral-500 transition-colors duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors duration-300"
            >
              <span className="text-sm">All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE LAYOUT (<768px) ══════════════════════ */}
      <div className="md:hidden py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div data-svc-mob-header className="mb-8">
            <p className="text-xs text-foreground-muted tracking-[0.2em] uppercase mb-4 font-mono">
              Services &amp; Expertise
            </p>
            <h3
              className="tracking-[-0.03em]"
              style={{ fontSize: "2rem", fontWeight: 200, lineHeight: 1.1 }}
            >
              <span className="text-foreground/50">What We </span>
              <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
                Build
              </span>
            </h3>
          </div>

          <div>
            {SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                data-svc-mobile
                className="group flex items-center gap-4 py-5 border-b border-surface-border"
              >
                <span
                  className="text-sm font-mono text-coral-500/60 flex-shrink-0"
                  style={{ width: "24px" }}
                >
                  {svc.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-coral-400 transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <span className="text-xs text-foreground-muted">{svc.tagline}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-overlay border border-surface-border flex items-center justify-center flex-shrink-0 group-hover:bg-coral-500/10 group-hover:border-coral-500/20 transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-coral-500 transition-colors duration-300" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors duration-300"
            >
              <span>All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
