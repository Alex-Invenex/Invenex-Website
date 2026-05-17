"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from "@/lib/gsap";
import { BrowserFrame } from "@/components/ui/browser-frame";

const featuredProjects = [
  {
    title: "CoolTech International",
    categories: ["Web", "Corporate"],
    image: "/portfolio/cooltech-international.webp",
    href: "/portfolio/cooltech-international",
    url: "https://cooltechintl.com",
  },
  {
    title: "Ginger Designs",
    categories: ["Web", "Creative"],
    image: "/portfolio/ginger-designs.webp",
    href: "/portfolio/ginger-designs",
    url: "https://gingerdesigns.ae",
  },
  {
    title: "GrabToGo",
    categories: ["Platform", "Deals"],
    image: "/portfolio/grabtogo.webp",
    href: "/portfolio/grabtogo",
    url: "https://www.grabtogo.in",
  },
  {
    title: "Ziera Inc",
    categories: ["E-Commerce", "LED"],
    image: "/portfolio/zierainc.webp",
    href: "/portfolio/ziera-inc",
    url: "https://zierainc.com",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldSkipAnimations() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

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
    if (shouldSkipAnimations() || !cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (shouldSkipAnimations() || !cardRef.current) return;
    const img = cardRef.current.querySelector("[data-portfolio-img]");
    if (img) {
      gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: "power2" });
    }
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div data-portfolio-card data-animate>
      <Link href={project.href} className="group block">
        <div
          ref={cardRef}
          className="will-change-transform"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BrowserFrame url={project.url} variant="card">
            {/* Slightly oversized for the cursor parallax — clipped by the frame */}
            <div
              data-portfolio-img
              className="absolute inset-[-10px] will-change-transform"
            >
              <Image
                src={project.image}
                alt={`${project.title} — ${project.categories.join(", ")}`}
                fill
                priority={index === 0}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Hover reveal */}
            <div className="absolute inset-0 flex items-center justify-center bg-background/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-coral-500/40 bg-coral-500/20 px-5 py-2.5 text-sm font-medium text-white">
                View Case Study
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </BrowserFrame>

          {/* Metadata — below the frame */}
          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold tracking-tight text-foreground text-xl md:text-2xl transition-colors duration-300 group-hover:text-coral-400">
                {project.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-overlay border border-surface-border text-foreground-muted"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <span
              className="mt-1 shrink-0 font-mono text-xs tracking-wider text-coral-500/70"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (shouldSkipAnimations()) return;

      const init = async () => {
        await registerScrollTrigger();

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

        const cards = sectionRef.current?.querySelectorAll("[data-portfolio-card]");
        cards?.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
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
      className="py-20 md:py-32 lg:py-44 bg-background relative overflow-hidden"
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

        {/* 2x2 Even Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
