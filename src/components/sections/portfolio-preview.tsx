"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const featuredProjects = [
  {
    title: "CoolTech International",
    categories: ["Web", "Corporate"],
    image: "/portfolio/cooltech-international.png",
    href: "/portfolio/cooltech-international",
  },
  {
    title: "Ginger Designs",
    categories: ["Web", "Creative"],
    image: "/portfolio/ginger-designs.png",
    href: "/portfolio/ginger-designs",
  },
  {
    title: "La Mirage",
    categories: ["Web", "Hospitality"],
    image: "/portfolio/la-mirage.png",
    href: "/portfolio/la-mirage",
  },
  {
    title: "OnMyWay AI",
    categories: ["Platform", "AI"],
    image: "/portfolio/onmyway-ai.png",
    href: "/portfolio/onmyway-ai",
  },
];

function ProjectCard({
  project,
  index,
  isHero = false,
}: {
  project: (typeof featuredProjects)[0];
  index: number;
  isHero?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Subtle cursor-tracking parallax on image
    const img = cardRef.current.querySelector("[data-portfolio-img]");
    if (img) {
      gsap.to(img, {
        x: nx * 8,
        y: ny * 8,
        duration: 0.6,
        ease: "power2",
        overwrite: "auto",
      });
    }
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !cardRef.current) return;
    // clipPath reveal for project overlay
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
    // Subtle scale up
    gsap.to(cardRef.current, {
      scale: 1.015,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !cardRef.current) return;
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.3,
        ease: "power3.inOut",
      });
    }
    const img = cardRef.current.querySelector("[data-portfolio-img]");
    if (img) {
      gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: "power2" });
    }
    // Scale back
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Extract first word for watermark
  const watermarkText = project.title.split(" ")[0].toUpperCase();

  return (
    <div data-portfolio-card data-animate>
      <Link href={project.href} className="group block relative">
        <div
          ref={cardRef}
          className={cn(
            "relative overflow-hidden rounded-2xl will-change-transform",
            "border border-white/[0.05] hover:border-coral-500/30",
            "transition-all duration-500",
            isHero ? "aspect-[21/9]" : "aspect-[4/3]"
          )}
          style={{
            boxShadow: "0 0 0 rgba(255,106,55,0)",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={(e) => {
            handleMouseEnter();
            // Add coral glow shadow
            if (cardRef.current) {
              cardRef.current.style.boxShadow =
                "0 0 40px rgba(255,106,55,0.08)";
            }
          }}
          onMouseLeave={(e) => {
            handleMouseLeave();
            if (cardRef.current) {
              cardRef.current.style.boxShadow = "0 0 0 rgba(255,106,55,0)";
            }
          }}
        >
          {/* Image with parallax */}
          <div data-portfolio-img className="absolute inset-[-10px] will-change-transform">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.categories.join(", ")}`}
              fill
              className="object-cover"
              sizes={isHero ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            />
          </div>

          {/* Gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Watermark text overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-black tracking-tighter text-white/[0.06]"
              style={{
                fontSize: isHero
                  ? "clamp(4rem, 12vw, 10rem)"
                  : "clamp(3rem, 8vw, 6rem)",
              }}
            >
              {watermarkText}
            </span>
          </div>

          {/* ClipPath overlay for hover reveal */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-coral-500/10 backdrop-blur-[2px]"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          />

          {/* Counter — coral accent, just number */}
          <span
            data-portfolio-counter
            className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-xs tracking-wider"
            style={{ color: "rgba(255,106,55,0.6)" }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Arrow */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-coral-500 group-hover:border-coral-500">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>

          {/* Content overlay — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3
              className={cn(
                "font-semibold text-white tracking-tight mb-2",
                isHero
                  ? "text-2xl md:text-3xl lg:text-4xl"
                  : "text-xl md:text-2xl"
              )}
            >
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 border border-white/10"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroProject = featuredProjects[0];
  const gridProjects = featuredProjects.slice(1);

  // GSAP ScrollTrigger — per-card entrance
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const init = async () => {
        await registerScrollTrigger();

        // Header entrance
        gsap.fromTo(
          "[data-portfolio-header]",
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

        // Per-card individual scroll triggers
        const cards = sectionRef.current?.querySelectorAll("[data-portfolio-card]");
        cards?.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      };
      init();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-background relative overflow-hidden"
      aria-labelledby="portfolio-preview-title"
      data-testid="portfolio-preview-section"
    >
      {/* Coral background orb */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-500/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          data-portfolio-header
          data-animate
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
              Featured Work
            </span>
            <h2
              id="portfolio-preview-title"
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
            >
              <span style={{ fontWeight: 200 }}>Selected </span>
              <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
                Projects
              </span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
          >
            <span>All Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hero card — full width */}
        <ProjectCard project={heroProject} index={0} isHero />

        {/* 2-column staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {gridProjects.map((project, i) => (
            <div
              key={project.title}
              className={cn(
                i === 1 && "md:mt-20",
                i === 2 && "md:-mt-14"
              )}
            >
              <ProjectCard project={project} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
