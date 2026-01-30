"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BentoProjectCard,
  type BentoCardSize,
} from "@/components/ui/bento-project-card";
import { AnimatedSection } from "@/components/ui/animated-section";
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

// Determine card size based on featured status and position
function getCardSize(
  project: SimpleProject,
  index: number,
  totalFeatured: number
): BentoCardSize {
  // Featured projects get the largest size
  if (project.featured) return "featured";

  // Calculate position among non-featured projects
  const nonFeaturedIndex = index - totalFeatured;

  // Pattern for visual interest: small, small, medium, small, large, small
  const pattern: BentoCardSize[] = [
    "small",
    "small",
    "medium",
    "small",
    "large",
    "small",
  ];
  return pattern[nonFeaturedIndex % pattern.length];
}

// Check for reduced motion preference (SSR-safe pattern)
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

function BentoPortfolioGridContent({ projects }: BentoPortfolioGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeFilter = categoryParam || "all";

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [projects, activeFilter]);

  // Sort: featured first, then by ID
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return parseInt(a.id) - parseInt(b.id);
    });
  }, [filteredProjects]);

  // Count featured projects for size calculation
  const featuredCount = sortedProjects.filter((p) => p.featured).length;

  const handleFilterChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const queryString = params.toString();
    router.push(queryString ? `/portfolio?${queryString}` : "/portfolio", {
      scroll: false,
    });
  };

  // Check reduced motion preference
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="py-16 pb-24"
      aria-labelledby="bento-portfolio-grid-title"
      data-testid="bento-portfolio-grid-section"
    >
      <div className="container mx-auto px-6">
        {/* Section Title (visually hidden but accessible) */}
        <h2 id="bento-portfolio-grid-title" className="sr-only">
          Project Portfolio
        </h2>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="group"
          aria-label="Filter projects by category"
          data-testid="portfolio-filters"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleFilterChange(cat.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeFilter === cat.value
                  ? "bg-coral-500 text-white"
                  : "bg-white/5 text-foreground-muted hover:bg-white/10 hover:text-foreground border border-white/10"
              )}
              aria-pressed={activeFilter === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout={!prefersReducedMotion}
          className={cn(
            "grid gap-4",
            // Mobile: 1 column
            "grid-cols-1",
            // Tablet: 2 columns
            "md:grid-cols-2",
            // Desktop: 4 columns with auto-row sizing
            "lg:grid-cols-4",
            // Row heights
            "auto-rows-[200px] md:auto-rows-[280px]"
          )}
          data-testid="bento-portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project, index) => {
              const size = getCardSize(project, index, featuredCount);

              // Determine grid span based on size
              const colSpan =
                size === "featured" || size === "medium"
                  ? "lg:col-span-2"
                  : "";
              const rowSpan =
                size === "featured" || size === "large" ? "lg:row-span-2" : "";

              return (
                <motion.div
                  key={project.id}
                  layoutId={prefersReducedMotion ? undefined : project.id}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.4,
                          delay: index * 0.05,
                          layout: { type: "spring", damping: 25, stiffness: 200 },
                        }
                  }
                  className={cn(colSpan, rowSpan)}
                >
                  <BentoProjectCard project={project} size={size} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {sortedProjects.length === 0 && (
          <AnimatedSection
            className="text-center py-16"
            data-testid="portfolio-empty-state"
          >
            <p className="text-foreground-muted text-lg">
              No projects found in this category.
            </p>
          </AnimatedSection>
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
            {/* Filter skeleton */}
            <div className="flex justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  className="px-4 py-2 rounded-full bg-white/5 animate-pulse w-20 h-9"
                />
              ))}
            </div>
            {/* Grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
              {/* Featured placeholder - 2x2 */}
              <div className="lg:col-span-2 lg:row-span-2 rounded-2xl bg-white/5 animate-pulse" />
              {/* Regular placeholders */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      }
    >
      <BentoPortfolioGridContent projects={projects} />
    </Suspense>
  );
}
