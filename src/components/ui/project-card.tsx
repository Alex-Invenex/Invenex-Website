"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { SimpleProject } from "@/lib/projects";

// Re-export for backward compatibility
export type Project = SimpleProject;

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${project.slug}`} data-testid="project-card">
      <motion.article
        className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-overlay hover:bg-surface-overlay-hover hover:border-surface-border-hover transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Thumbnail */}
        <div
          className="aspect-[4/3] overflow-hidden bg-background-secondary relative"
          data-testid="project-thumbnail"
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            data-testid="project-overlay"
          >
            <span className="text-white font-medium flex items-center gap-2">
              View Case Study
              <span aria-hidden="true">→</span>
            </span>
          </div>

          {/* Border glow on hover */}
          <div className="absolute inset-0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-primary/30 ring-inset pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-6">
          <Badge size="sm" className="mb-3" data-testid="project-category">
            {project.category}
          </Badge>
          <h3
            className="font-semibold text-lg group-hover:text-foreground transition-colors"
            data-testid="project-title"
          >
            {project.title}
          </h3>
          <p
            className="text-sm text-foreground-muted mt-1"
            data-testid="project-client"
          >
            {project.client}
          </p>
          <p className="text-sm text-foreground-muted mt-2 line-clamp-2">
            {project.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
