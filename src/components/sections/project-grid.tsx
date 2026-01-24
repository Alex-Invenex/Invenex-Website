"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, type Project } from "@/components/ui/project-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

const categories = ["All", "Web", "Mobile", "Platform", "E-Commerce"];

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeFilter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 text-foreground-muted hover:bg-white/10 hover:text-foreground border border-white/10"
              )}
              aria-pressed={activeFilter === category}
            >
              {category}
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
          <AnimatedSection className="text-center py-16">
            <p className="text-foreground-muted text-lg">
              No projects found in this category.
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
