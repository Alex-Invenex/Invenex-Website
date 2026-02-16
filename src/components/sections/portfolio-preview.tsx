"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const featuredProjects = [
  {
    title: "CoolTech International",
    categories: ["Web", "Corporate"],
    image: "/portfolio/cooltech-international-mockup.jpeg",
    href: "/portfolio/cooltech-international",
  },
  {
    title: "Ginger Designs",
    categories: ["Web", "Creative"],
    image: "/portfolio/ginger-designs-mockup.jpg",
    href: "/portfolio/ginger-designs",
  },
  {
    title: "GrabToGo",
    categories: ["Platform", "Deals"],
    image: "/portfolio/grabtogo-mockup.jpg",
    href: "/portfolio/grabtogo",
  },
  {
    title: "Ziera Inc",
    categories: ["E-Commerce", "LED"],
    image: "/portfolio/ziera-mockup.jpg",
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
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !cardRef.current) return;
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
    if (prefersReducedMotion() || !cardRef.current) return;
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
    gsap.to(cardRef.current, {
      scale: 1.02,
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
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div data-portfolio-card data-animate>
      <Link href={project.href} className="group block relative">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl will-change-transform border border-white/[0.06] hover:border-coral-500/30 transition-all duration-500 bg-[#111]"
          style={{
            aspectRatio: "16 / 10",
            boxShadow: "0 0 0 rgba(255,106,55,0)",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            handleMouseEnter();
            if (cardRef.current) {
              cardRef.current.style.boxShadow =
                "0 0 40px rgba(255,106,55,0.08)";
            }
          }}
          onMouseLeave={() => {
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
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* ClipPath hover overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-coral-500/10 backdrop-blur-[2px]"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          />

          {/* Counter */}
          <span
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

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 className="font-semibold text-white tracking-tight text-xl md:text-2xl mb-2">
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

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

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

        {/* 2x2 Even Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
