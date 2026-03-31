"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, type Project } from "@/components/ui/project-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "platform", label: "Platform" },
  { value: "e-commerce", label: "E-Commerce" },
];

function ProjectGridContent({ projects }: ProjectGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeFilter = categoryParam || "all";

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

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

  return (
    <section
      className="py-16 pb-24"
      aria-labelledby="portfolio-grid-title"
      data-testid="portfolio-grid-section"
    >
      <div className="container mx-auto px-6">
        {/* Section Title (visually hidden but accessible) */}
        <h2 id="portfolio-grid-title" className="sr-only">
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
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-overlay text-foreground-muted hover:bg-surface-overlay-hover hover:text-foreground border border-surface-border"
              )}
              aria-pressed={activeFilter === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
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
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <Suspense
      fallback={
        <section className="py-16 pb-24" data-testid="portfolio-grid-section">
          <div className="container mx-auto px-6">
            <div className="flex justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  className="px-4 py-2 rounded-full bg-surface-overlay animate-pulse w-20 h-9"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl bg-surface-overlay animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      }
    >
      <ProjectGridContent projects={projects} />
    </Suspense>
  );
}
