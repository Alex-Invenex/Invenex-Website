"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SimpleProject } from "@/lib/projects";

export type BentoCardSize = "small" | "medium" | "large" | "featured";

interface BentoProjectCardProps {
  project: SimpleProject;
  size: BentoCardSize;
  className?: string;
}

export function BentoProjectCard({
  project,
  size,
  className,
}: BentoProjectCardProps) {
  const isLargeVariant = size === "large" || size === "featured";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn("block h-full", className)}
      data-testid="bento-project-card"
      data-size={size}
    >
      <article
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl",
          "border border-surface-border bg-surface-overlay",
          "transition-all duration-300",
          // Hover effects with coral glow
          "hover:scale-[1.02] hover:border-coral-500/50",
          "hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]",
          // Focus-visible styles
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-coral-500 focus-within:ring-offset-2 focus-within:ring-offset-background"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // ease-out-expo
        }}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden bg-background-secondary",
            // Size-specific aspect ratios
            size === "small" && "aspect-[4/3]",
            size === "medium" && "aspect-[16/9]",
            size === "large" && "h-[60%]",
            size === "featured" && "h-[55%]"
          )}
          data-testid="bento-card-image"
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes={
              size === "featured"
                ? "(max-width: 768px) 100vw, 50vw"
                : size === "medium"
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 25vw"
            }
            className={cn(
              "object-cover transition-transform duration-500",
              "group-hover:scale-105"
            )}
          />

          {/* Overlay gradient for large cards */}
          {isLargeVariant && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          )}

          {/* Hover overlay with CTA */}
          <div
            className={cn(
              "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300 flex items-center justify-center"
            )}
            data-testid="bento-card-overlay"
          >
            <span className="text-white font-medium flex items-center gap-2">
              View Case Study
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        {/* Content - varies by size */}
        <div
          className={cn(
            "p-4",
            size === "small" && "p-3",
            size === "featured" && "p-6"
          )}
        >
          {/* Small: Title only */}
          {size === "small" && (
            <>
              <h3
                className="font-semibold text-sm group-hover:text-foreground transition-colors line-clamp-1"
                data-testid="bento-card-title"
              >
                {project.title}
              </h3>
              <Badge
                size="sm"
                className="mt-2 text-xs"
                data-testid="bento-card-category"
              >
                {project.category}
              </Badge>
            </>
          )}

          {/* Medium: Title + Excerpt */}
          {size === "medium" && (
            <>
              <div className="flex items-start justify-between gap-2">
                <h3
                  className="font-semibold text-base group-hover:text-foreground transition-colors line-clamp-1"
                  data-testid="bento-card-title"
                >
                  {project.title}
                </h3>
                <Badge
                  size="sm"
                  className="shrink-0"
                  data-testid="bento-card-category"
                >
                  {project.category}
                </Badge>
              </div>
              <p className="text-sm text-foreground-muted mt-2 line-clamp-2">
                {project.excerpt}
              </p>
            </>
          )}

          {/* Large: Full-height with overlay content */}
          {size === "large" && (
            <>
              <Badge size="sm" className="mb-2" data-testid="bento-card-category">
                {project.category}
              </Badge>
              <h3
                className="font-semibold text-lg group-hover:text-foreground transition-colors"
                data-testid="bento-card-title"
              >
                {project.title}
              </h3>
              <p className="text-sm text-foreground-muted mt-1">
                {project.client}
              </p>
            </>
          )}

          {/* Featured: Full details */}
          {size === "featured" && (
            <>
              <Badge
                size="sm"
                className="mb-3"
                data-testid="bento-card-category"
              >
                {project.category}
              </Badge>
              <h3
                className="font-semibold text-xl group-hover:text-foreground transition-colors"
                data-testid="bento-card-title"
              >
                {project.title}
              </h3>
              <p
                className="text-sm text-foreground-muted mt-1"
                data-testid="bento-card-client"
              >
                {project.client}
              </p>
              <p className="text-sm text-foreground-muted mt-3 line-clamp-3">
                {project.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-coral-500 font-medium text-sm">
                <span>View Case Study</span>
                <span aria-hidden="true">→</span>
              </div>
            </>
          )}
        </div>

        {/* Featured badge for featured projects */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 bg-coral-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
            data-testid="bento-card-featured-badge"
          >
            Featured
          </div>
        )}
      </article>
    </Link>
  );
}
