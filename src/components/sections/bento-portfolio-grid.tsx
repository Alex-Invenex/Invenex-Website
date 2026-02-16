"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SimpleProject } from "@/lib/projects";

interface BentoPortfolioGridProps {
  projects: SimpleProject[];
}

const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "platform", label: "Platform" },
  { value: "e-commerce", label: "E-Commerce" },
];

type CardSize = "hero" | "medium" | "small";

interface LayoutItem {
  project: SimpleProject;
  size: CardSize;
}

// Build editorial layout: featured hero cards interleaved with regular project rows
function buildEditorialLayout(projects: SimpleProject[]): LayoutItem[] {
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);
  const result: LayoutItem[] = [];

  let fi = 0;
  let ri = 0;
  let regularRowType: "pair" | "trio" = "pair";

  while (fi < featured.length || ri < regular.length) {
    // Insert a featured hero card if available
    if (fi < featured.length) {
      result.push({ project: featured[fi++], size: "hero" });
    }

    // Insert a row of regular projects
    if (ri < regular.length) {
      if (regularRowType === "pair") {
        const count = Math.min(2, regular.length - ri);
        for (let i = 0; i < count; i++) {
          result.push({ project: regular[ri++], size: "medium" });
        }
        regularRowType = "trio";
      } else {
        const count = Math.min(3, regular.length - ri);
        for (let i = 0; i < count; i++) {
          result.push({ project: regular[ri++], size: "small" });
        }
        regularRowType = "pair";
      }
    }
  }

  return result;
}

// Simpler layout for filtered views with fewer projects
function buildFilteredLayout(projects: SimpleProject[]): LayoutItem[] {
  return projects.map((project, index) => ({
    project,
    size: project.featured ? "hero" : (index % 3 === 0 ? "medium" : "small") as CardSize,
  }));
}

// Grid span classes per card size
function getGridClasses(size: CardSize) {
  switch (size) {
    case "hero":
      return "col-span-1 md:col-span-2 lg:col-span-6";
    case "medium":
      return "col-span-1 md:col-span-1 lg:col-span-3";
    case "small":
      return "col-span-1 md:col-span-1 lg:col-span-2";
  }
}

// Check for reduced motion preference
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

// Editorial project card
function EditorialCard({
  project,
  size,
  index,
}: {
  project: SimpleProject;
  size: CardSize;
  index: number;
}) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "border border-white/[0.06] hover:border-coral-500/30",
          "transition-all duration-500",
          "bg-[#111]",
          size === "hero" && "aspect-[16/9] lg:aspect-[21/9]",
          size === "medium" && "aspect-[3/2]",
          size === "small" && "aspect-[4/3]"
        )}
        style={{
          boxShadow: "0 0 0 rgba(255,107,53,0)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 40px rgba(255,107,53,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 rgba(255,107,53,0)";
        }}
      >
        {/* Image with hover scale */}
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes={
            size === "hero"
              ? "100vw"
              : size === "medium"
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Counter — coral accent */}
        <span
          className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-xs tracking-wider"
          style={{ color: "rgba(255,107,53,0.6)" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Arrow — appears on hover */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-coral-500 group-hover:border-coral-500">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 mb-3 inline-block">
            {project.category}
          </span>
          <h3
            className={cn(
              "font-semibold text-white tracking-tight",
              size === "hero"
                ? "text-2xl md:text-3xl lg:text-4xl"
                : size === "medium"
                  ? "text-xl md:text-2xl"
                  : "text-lg md:text-xl"
            )}
          >
            {project.title}
          </h3>
          {size !== "small" && (
            <p className="text-white/50 mt-2 text-sm md:text-base line-clamp-2 max-w-2xl">
              {project.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function EditorialPortfolioGridContent({ projects }: BentoPortfolioGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeFilter = categoryParam || "all";
  const prefersReduced = usePrefersReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [projects, activeFilter]);

  const layoutItems = useMemo(() => {
    if (activeFilter === "all") {
      return buildEditorialLayout(filteredProjects);
    }
    return buildFilteredLayout(filteredProjects);
  }, [filteredProjects, activeFilter]);

  const handleFilterChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const qs = params.toString();
    router.push(qs ? `/portfolio?${qs}` : "/portfolio", { scroll: false });
  };

  return (
    <section
      className="py-16 pb-24"
      aria-labelledby="portfolio-grid-title"
      data-testid="bento-portfolio-grid-section"
    >
      <div className="container mx-auto px-6">
        <h2 id="portfolio-grid-title" className="sr-only">
          Project Portfolio
        </h2>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-16"
          role="group"
          aria-label="Filter projects by category"
          data-testid="portfolio-filters"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleFilterChange(cat.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeFilter === cat.value
                  ? "bg-coral-500 text-white shadow-lg shadow-coral-500/25"
                  : "bg-white/[0.03] text-foreground-muted hover:bg-white/[0.08] hover:text-foreground border border-white/[0.08]"
              )}
              aria-pressed={activeFilter === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Grid */}
        <motion.div
          layout={!prefersReduced}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5"
          data-testid="bento-portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {layoutItems.map((item, index) => (
              <motion.div
                key={item.project.id}
                layoutId={prefersReduced ? undefined : item.project.id}
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.97 }
                }
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: index * 0.06,
                        layout: {
                          type: "spring",
                          damping: 28,
                          stiffness: 180,
                        },
                      }
                }
                className={getGridClasses(item.size)}
              >
                <EditorialCard
                  project={item.project}
                  size={item.size}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {layoutItems.length === 0 && (
          <div className="text-center py-20" data-testid="portfolio-empty-state">
            <p className="text-foreground-muted text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Wrapper with Suspense for useSearchParams
export function BentoPortfolioGrid({ projects }: BentoPortfolioGridProps) {
  return (
    <Suspense
      fallback={
        <section
          className="py-16 pb-24"
          data-testid="bento-portfolio-grid-section"
        >
          <div className="container mx-auto px-6">
            <div className="flex justify-center gap-2 mb-16">
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  className="px-5 py-2 rounded-full bg-white/5 animate-pulse w-20 h-9"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
              <div className="lg:col-span-6 aspect-[21/9] rounded-2xl bg-white/5 animate-pulse" />
              <div className="lg:col-span-3 aspect-[3/2] rounded-2xl bg-white/5 animate-pulse" />
              <div className="lg:col-span-3 aspect-[3/2] rounded-2xl bg-white/5 animate-pulse" />
              <div className="lg:col-span-6 aspect-[21/9] rounded-2xl bg-white/5 animate-pulse" />
              <div className="lg:col-span-2 aspect-[4/3] rounded-2xl bg-white/5 animate-pulse" />
              <div className="lg:col-span-2 aspect-[4/3] rounded-2xl bg-white/5 animate-pulse" />
              <div className="lg:col-span-2 aspect-[4/3] rounded-2xl bg-white/5 animate-pulse" />
            </div>
          </div>
        </section>
      }
    >
      <EditorialPortfolioGridContent projects={projects} />
    </Suspense>
  );
}
