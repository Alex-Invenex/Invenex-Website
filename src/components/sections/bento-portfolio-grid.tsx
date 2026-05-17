"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PortfolioCard, type PortfolioCardSize } from "@/components/ui/portfolio-card";
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

interface LayoutItem {
  project: SimpleProject;
  size: PortfolioCardSize;
}

// Uniform layout: featured projects span 2 columns, everything else 1.
function buildLayout(projects: SimpleProject[]): LayoutItem[] {
  return projects.map((project) => ({
    project,
    size: project.featured ? "featured" : "small",
  }));
}

// Featured cards take 2 of the 4 desktop columns (full width on tablet).
function getSpanClasses(size: PortfolioCardSize) {
  return size === "featured" ? "md:col-span-2 lg:col-span-2" : "";
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

  const layoutItems = useMemo(
    () => buildLayout(filteredProjects),
    [filteredProjects]
  );

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
      aria-labelledby="bento-portfolio-grid-title"
      data-testid="bento-portfolio-grid-section"
    >
      <div className="container mx-auto px-6">
        <h2 id="bento-portfolio-grid-title" className="sr-only">
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
                  : "bg-surface-overlay text-foreground-muted hover:bg-surface-overlay-hover hover:text-foreground border border-surface-border"
              )}
              aria-pressed={activeFilter === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Uniform browser-framed grid */}
        <motion.div
          layout={!prefersReduced}
          layoutDependency={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          data-testid="bento-portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {layoutItems.map((item, index) => (
              <motion.div
                key={item.project.id}
                layoutId={prefersReduced ? undefined : item.project.id}
                // Only run the FLIP reposition when the filter changes — not on
                // image/font-load reflows (which otherwise drop CSS :hover mid-interaction).
                layoutDependency={activeFilter}
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReduced
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { opacity: 0, scale: 0.97, transition: { duration: 0.22, delay: 0 } }
                }
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : {
                        duration: 0.45,
                        // Capped so late cards still finish entering quickly and the
                        // grid stabilises well inside test/interaction windows.
                        delay: Math.min(index, 8) * 0.04,
                        layout: {
                          type: "spring",
                          damping: 30,
                          stiffness: 260,
                        },
                      }
                }
                className={getSpanClasses(item.size)}
              >
                <PortfolioCard
                  project={item.project}
                  size={item.size}
                  index={index}
                  priority={index < 3}
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
          aria-labelledby="bento-portfolio-grid-title"
          data-testid="bento-portfolio-grid-section"
        >
          <div className="container mx-auto px-6">
            <h2 id="bento-portfolio-grid-title" className="sr-only">
              Project Portfolio
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  className="px-5 py-2 rounded-full bg-surface-overlay animate-pulse w-20 h-9"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl border border-surface-border bg-surface-overlay animate-pulse",
                    i < 2 && "md:col-span-2 lg:col-span-2"
                  )}
                  style={{ aspectRatio: "16 / 10" }}
                />
              ))}
            </div>
          </div>
        </section>
      }
    >
      <EditorialPortfolioGridContent projects={projects} />
    </Suspense>
  );
}
