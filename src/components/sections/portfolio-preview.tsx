"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

// Featured projects for homepage preview
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Link href={project.href} className="group block relative">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "border border-white/[0.05] hover:border-[#FF6A37]/30",
            "transition-all duration-500",
            "hover:shadow-[0_0_40px_rgba(255,106,55,0.15)]",
            isHero ? "aspect-[21/9]" : "aspect-[4/3]"
          )}
        >
          {/* Image */}
          <Image
            src={project.image}
            alt={`${project.title} — ${project.categories.join(", ")}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isHero ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          />

          {/* Gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Monospace project number — top left */}
          <span
            className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-white/40 text-xs tracking-wider"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}/{String(featuredProjects.length).padStart(2, "0")}
          </span>

          {/* Arrow — top right */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#FF6A37] group-hover:border-[#FF6A37]">
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
    </motion.div>
  );
}

export function PortfolioPreview() {
  const heroProject = featuredProjects[0];
  const gridProjects = featuredProjects.slice(1);

  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="portfolio-preview-title"
      data-testid="portfolio-preview-section"
    >
      {/* Coral background orb */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6A37]/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header — split weight */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
              // FEATURED WORK
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
        </AnimatedSection>

        {/* Hero card — full width */}
        <ProjectCard project={heroProject} index={0} isHero />

        {/* 2-column staggered grid — right column offset */}
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
