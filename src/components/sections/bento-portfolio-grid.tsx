"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PortfolioCard } from "@/components/ui/portfolio-card";
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from "@/lib/gsap";
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
  const sectionRef = React.useRef<HTMLElement>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [projects, activeFilter]);

  const layoutItems = filteredProjects;

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

  // useGSAP scoped cleanup kills prior ScrollTriggers when this re-runs on activeFilter change; registerScrollTrigger() is sync after first load, so rapid filter changes don't leak triggers.
  useGSAP(
    () => {
      const els = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!els || els.length === 0) return;
      if (shouldSkipAnimations()) {
        els.forEach((el) => el.classList.add("is-in"));
        return;
      }
      const init = async () => {
        await registerScrollTrigger();
        els.forEach((el, i) => {
          gsap.to(el, {
            onStart: () => el.classList.add("is-in"),
            duration: 0,
            delay: (i % 2) * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      };
      init();
    },
    { scope: sectionRef, dependencies: [activeFilter] }
  );

  return (
    <section
      ref={sectionRef}
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

        {/* Uniform editorial grid */}
        <motion.div
          layout={!prefersReduced}
          layoutDependency={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16 md:gap-y-20 lg:grid-cols-2"
          data-testid="bento-portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {layoutItems.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!prefersReduced}
                layoutId={prefersReduced ? undefined : project.id}
                // Only run the FLIP reposition when the filter changes — not on
                // image/font-load reflows (which otherwise drop CSS :hover mid-interaction).
                layoutDependency={activeFilter}
                initial={false}
                exit={
                  prefersReduced
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { opacity: 0, scale: 0.97, transition: { duration: 0.22 } }
                }
              >
                <div className="pf-reveal" data-reveal>
                  <PortfolioCard
                    project={project}
                    index={index}
                    priority={index < 4}
                  />
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-14 gap-y-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pf-card-media animate-pulse" />
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
