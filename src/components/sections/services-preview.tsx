"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

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

/* ─── Card 1: Browser chrome with code editor ────────── */
function WebDevCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-4 flex-1 h-5 rounded-md bg-white/[0.04] flex items-center px-2">
          <span className="text-[8px] text-foreground-muted/30 font-mono">localhost:3000</span>
        </div>
      </div>
      <div className="p-4 font-mono text-[10px] leading-[1.8]">
        <div className="flex">
          <div className="text-foreground-muted/20 select-none pr-3 text-right" style={{ width: "24px" }}>
            1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
          </div>
          <div className="flex-1 space-y-0">
            <div className="text-foreground-muted/30">{"// app/page.tsx"}</div>
            <div>
              <span className="text-purple-400/80">import</span>
              <span className="text-foreground-muted/50">{" { "}</span>
              <span className="text-coral-400">Hero</span>
              <span className="text-foreground-muted/50">{" } "}</span>
              <span className="text-purple-400/80">from</span>
              <span className="text-emerald-400/70">{" '@/components'"}</span>
            </div>
            <div className="h-[1em]" />
            <div>
              <span className="text-purple-400/80">export</span>{" "}
              <span className="text-blue-400/80">default</span>{" "}
              <span className="text-yellow-300/80">function</span>{" "}
              <span className="text-coral-400">Home</span>
              <span className="text-foreground-muted/50">{"() {"}</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400/80">return</span>{" "}
              <span className="text-foreground-muted/40">{"("}</span>
            </div>
            <div className="pl-8">
              <span className="text-foreground-muted/40">{"<"}</span>
              <span className="text-coral-400">Hero</span>
              <span className="text-emerald-400/60">{" title"}</span>
              <span className="text-foreground-muted/40">{"="}</span>
              <span className="text-amber-300/70">{'"Build"'}</span>
              <span className="text-foreground-muted/40">{" />"}</span>
            </div>
            <div className="pl-4">
              <span className="text-foreground-muted/40">{")"}</span>
            </div>
            <div className="text-foreground-muted/50">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card 2: Phone frame with app screen ────────────── */
function MobileAppCard() {
  return (
    <div
      className="rounded-[20px] border border-white/[0.1] overflow-hidden p-1.5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex justify-center pt-2 pb-3">
        <div className="w-20 h-5 rounded-full bg-black border border-white/[0.06]" />
      </div>
      <div className="px-3 pb-3 space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[8px] text-foreground-muted/40 font-mono">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 rounded-sm bg-foreground-muted/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted/20" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 rounded bg-white/[0.08]" style={{ width: "60%" }} />
          <div className="w-5 h-5 rounded-full bg-coral-500/15 border border-coral-500/20" />
        </div>
        <div className="space-y-1.5">
          <div className="rounded-lg p-2 bg-coral-500/8 border border-coral-500/15">
            <div className="h-2 w-3/4 rounded bg-coral-500/20 mb-1" />
            <div className="h-1.5 w-1/2 rounded bg-white/[0.04]" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded-lg p-2 bg-white/[0.03] border border-white/[0.06]">
              <div className="h-2 w-full rounded bg-white/[0.06] mb-1" />
              <div className="h-1.5 w-2/3 rounded bg-white/[0.03]" />
            </div>
            <div className="rounded-lg p-2 bg-white/[0.03] border border-white/[0.06]">
              <div className="h-2 w-full rounded bg-white/[0.06] mb-1" />
              <div className="h-1.5 w-2/3 rounded bg-white/[0.03]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 pb-2 pt-1">
        <div className="w-5 h-5 rounded-full bg-coral-500/20 border border-coral-500/25" />
        <div className="w-5 h-5 rounded-full bg-white/[0.06]" />
        <div className="w-5 h-5 rounded-full bg-white/[0.06]" />
        <div className="w-5 h-5 rounded-full bg-white/[0.06]" />
      </div>
      <div className="flex justify-center pb-1">
        <div className="w-24 h-1 rounded-full bg-white/[0.15]" />
      </div>
    </div>
  );
}

/* ─── Card 3: Dashboard with chart + uptime (static) ─── */
function PlatformCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden p-5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-foreground-muted/50 font-mono">
          System Health
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="flex items-end gap-2 mb-4" style={{ height: "55px" }}>
        {[50, 70, 55, 85, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: "linear-gradient(to top, var(--color-coral-600), var(--color-coral-400))",
              opacity: 0.65 + i * 0.08,
            }}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-foreground">99.9%</span>
        <span className="text-[11px] text-foreground-muted/60">Uptime</span>
      </div>
      <div className="flex gap-2 mt-3">
        <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-foreground-muted/50 font-mono">
          12ms latency
        </span>
        <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-foreground-muted/50 font-mono">
          0 errors
        </span>
      </div>
    </div>
  );
}

/* ─── Card 4: E-commerce storefront mockup ───────────── */
function ECommerceCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-4 flex-1 h-5 rounded-md bg-white/[0.04] flex items-center px-2">
          <span className="text-[8px] text-foreground-muted/30 font-mono">shop.example.com</span>
        </div>
      </div>
      {/* Product grid */}
      <div className="p-3 grid grid-cols-2 gap-2">
        {[
          { color: "rgba(255,107,53,0.08)", price: "$49" },
          { color: "rgba(139,92,246,0.08)", price: "$89" },
          { color: "rgba(59,130,246,0.08)", price: "$35" },
          { color: "rgba(16,185,129,0.08)", price: "$76" },
        ].map((item, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] p-2" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div
              className="rounded mb-1.5"
              style={{ aspectRatio: "1", background: item.color }}
            />
            <div className="h-1.5 w-3/4 rounded bg-white/[0.08] mb-1" />
            <span className="text-[9px] font-mono text-coral-400">{item.price}</span>
          </div>
        ))}
      </div>
      {/* Checkout bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.25)" }}
          >
            <span className="text-[7px] text-coral-400 font-bold">3</span>
          </div>
          <span className="text-[9px] text-foreground-muted/60 font-mono">3 items</span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-coral-400">$249.99</span>
      </div>
    </div>
  );
}

/* ─── Card 5: Social media engagement dashboard ──────── */
function SocialMediaCard() {
  const platforms = [
    { name: "Instagram", value: 85, color: "#E4405F" },
    { name: "LinkedIn", value: 62, color: "#0077B5" },
    { name: "Twitter", value: 48, color: "#1DA1F2" },
  ];

  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden p-5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-foreground-muted/50 font-mono">
          Engagement
        </span>
        <span className="text-[9px] text-emerald-400 font-mono">+42%</span>
      </div>
      {/* Engagement bars */}
      <div className="space-y-3 mb-4">
        {platforms.map(({ name, value, color }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-foreground-muted/60 font-mono">{name}</span>
              <span className="text-[9px] text-foreground-muted/40 font-mono">{value}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${value}%`, background: color, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Follower count */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-xl font-bold text-foreground">47.2K</span>
        <span className="text-[11px] text-foreground-muted/60">Followers</span>
      </div>
      {/* Platform chips */}
      <div className="flex gap-2">
        {["Meta Ads", "Reels", "Stories"].map((tag) => (
          <span
            key={tag}
            className="text-[9px] px-2 py-0.5 rounded text-foreground-muted/50 font-mono"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Card 6: Analytics trend chart (static) ─────────── */
function StrategyCard() {
  return (
    <div
      className="rounded-xl border border-white/[0.08] overflow-hidden p-5"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-foreground-muted/50 font-mono">
          Revenue Growth
        </span>
        <span className="text-[9px] text-emerald-400 font-mono">+127%</span>
      </div>
      <svg
        viewBox="0 0 140 50"
        className="w-full mb-4"
        style={{ height: "50px" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="svcTrendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-coral-500)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-coral-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="12" x2="140" y2="12" stroke="rgba(255,255,255,0.03)" />
        <line x1="0" y1="25" x2="140" y2="25" stroke="rgba(255,255,255,0.03)" />
        <line x1="0" y1="38" x2="140" y2="38" stroke="rgba(255,255,255,0.03)" />
        <path
          d="M0 42 C15 40, 25 38, 35 35 S55 28, 65 22 S85 15, 100 10 S125 5, 140 2"
          fill="none"
          stroke="var(--color-coral-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0 42 C15 40, 25 38, 35 35 S55 28, 65 22 S85 15, 100 10 S125 5, 140 2 V50 H0 Z"
          fill="url(#svcTrendFill)"
        />
        <circle cx="140" cy="2" r="3" fill="var(--color-coral-500)" />
        <circle cx="140" cy="2" r="5" fill="var(--color-coral-500)" opacity="0.3" />
      </svg>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-foreground">3x</span>
        <span className="text-[11px] text-foreground-muted/60">Avg. Growth</span>
      </div>
    </div>
  );
}

/* ─── Visual cards indexed by service ────────────────── */
const VISUAL_CARDS = [WebDevCard, MobileAppCard, PlatformCard, ECommerceCard, SocialMediaCard, StrategyCard];

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const rmRef = useRef(false);

  useEffect(() => {
    rmRef.current = prefersReducedMotion();
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
      className="relative z-10 bg-background overflow-hidden"
      aria-labelledby="services-preview-title"
      data-testid="services-preview-section"
    >
      <h2 id="services-preview-title" className="sr-only">
        Our Services
      </h2>

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
        style={{ height: "100vh" }}
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
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
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
              style={{ background: "rgba(255,255,255,0.06)" }}
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
                  className="rounded-xl border border-white/[0.08] p-4 hover:border-coral-500/30 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%)",
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
                className="group flex items-center gap-4 py-5 border-b border-white/[0.06]"
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
                <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-coral-500/10 group-hover:border-coral-500/20 transition-all duration-300">
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
