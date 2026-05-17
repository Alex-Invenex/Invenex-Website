"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from "@/lib/gsap";

const featuredProjects = [
  {
    title: "CoolTech International",
    categories: ["Web", "Corporate"],
    image: "/portfolio/cooltech-international.webp",
    href: "/portfolio/cooltech-international",
  },
  {
    title: "Ginger Designs",
    categories: ["Web", "Creative"],
    image: "/portfolio/ginger-designs.webp",
    href: "/portfolio/ginger-designs",
  },
  {
    title: "GrabToGo",
    categories: ["Platform", "Deals"],
    image: "/portfolio/grabtogo.webp",
    href: "/portfolio/grabtogo",
  },
  {
    title: "Ziera Inc",
    categories: ["E-Commerce", "LED"],
    image: "/portfolio/zierainc.webp",
    href: "/portfolio/ziera-inc",
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

  const handleMouseLeave = () => {
    if (shouldSkipAnimations() || !cardRef.current) return;
    const img = cardRef.current.querySelector("[data-portfolio-img]");
    if (img) {
      gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: "power2" });
    }
  };

  return (
    <div data-portfolio-card data-animate>
      <Link href={project.href} className="group block">
        <div
          ref={cardRef}
          className="will-change-transform"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="pf-card-media" data-portfolio-img>
            <Image
              src={project.image}
              alt={`${project.title} — ${project.categories.join(", ")}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="pf-card-img"
            />
          </div>
          <div className="mt-5 flex items-baseline justify-between gap-5">
            <h3 className="pf-card-rule text-xl md:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-coral-400">
              {project.title}
            </h3>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {project.categories.map((cat) => (
                <span key={cat} className="font-mono text-xs tracking-[0.18em] uppercase text-foreground-subtle">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
