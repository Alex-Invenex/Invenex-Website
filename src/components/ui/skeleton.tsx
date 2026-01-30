import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  /**
   * Animation variant:
   * - "pulse" (default): Classic pulsing animation
   * - "shimmer": Premium gradient sweep animation
   */
  variant?: "pulse" | "shimmer";
}

/**
 * Skeleton loading component for displaying loading placeholders
 *
 * Supports two animation variants:
 * - pulse: Classic pulsing opacity animation (default)
 * - shimmer: Premium gradient sweep animation
 *
 * Both variants respect prefers-reduced-motion.
 *
 * Story 9.9: Added shimmer variant for enhanced loading states.
 */
export function Skeleton({ className, variant = "pulse" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md",
        variant === "pulse" && "animate-pulse bg-background-secondary",
        variant === "shimmer" && "animate-shimmer",
        className
      )}
      aria-hidden="true"
    />
  );
}

interface CardSkeletonProps {
  /** Use shimmer animation instead of pulse */
  shimmer?: boolean;
}

/**
 * Card skeleton for loading project cards, blog posts, etc.
 */
export function CardSkeleton({ shimmer = false }: CardSkeletonProps) {
  const variant = shimmer ? "shimmer" : "pulse";
  return (
    <div
      className="p-6 border border-border rounded-lg"
      role="status"
      aria-busy="true"
      aria-label="Loading content"
    >
      <Skeleton className="h-48 w-full mb-4" variant={variant} />
      <Skeleton className="h-6 w-3/4 mb-2" variant={variant} />
      <Skeleton className="h-4 w-full mb-2" variant={variant} />
      <Skeleton className="h-4 w-2/3" variant={variant} />
    </div>
  );
}

interface ProjectGridSkeletonProps {
  /** Use shimmer animation instead of pulse */
  shimmer?: boolean;
  /** Number of skeleton cards to show */
  count?: number;
}

/**
 * Project grid skeleton for portfolio pages
 */
export function ProjectGridSkeleton({
  shimmer = false,
  count = 6,
}: ProjectGridSkeletonProps) {
  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="status"
      aria-busy="true"
      aria-label="Loading projects"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} shimmer={shimmer} />
      ))}
    </div>
  );
}

interface ImageSkeletonProps {
  aspectRatio?: "video" | "square";
  /** Use shimmer animation instead of pulse */
  shimmer?: boolean;
}

/**
 * Image skeleton for gallery placeholders
 */
export function ImageSkeleton({
  aspectRatio = "video",
  shimmer = false,
}: ImageSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "w-full",
        aspectRatio === "video" ? "aspect-video" : "aspect-square"
      )}
      variant={shimmer ? "shimmer" : "pulse"}
    />
  );
}

interface JobListingSkeletonProps {
  /** Use shimmer animation instead of pulse */
  shimmer?: boolean;
}

/**
 * Job listing skeleton for careers page
 */
export function JobListingSkeleton({ shimmer = false }: JobListingSkeletonProps) {
  const variant = shimmer ? "shimmer" : "pulse";
  return (
    <div
      className="p-6 border border-border rounded-lg"
      role="status"
      aria-busy="true"
      aria-label="Loading job listing"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" variant={variant} />
          <Skeleton className="h-4 w-1/2" variant={variant} />
        </div>
        <Skeleton className="h-8 w-24" variant={variant} />
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20" variant={variant} />
        <Skeleton className="h-6 w-24" variant={variant} />
        <Skeleton className="h-6 w-16" variant={variant} />
      </div>
      <Skeleton className="h-4 w-full mb-2" variant={variant} />
      <Skeleton className="h-4 w-2/3" variant={variant} />
    </div>
  );
}

interface JobGridSkeletonProps {
  /** Use shimmer animation instead of pulse */
  shimmer?: boolean;
  /** Number of skeleton cards to show */
  count?: number;
}

/**
 * Job grid skeleton for careers open positions section
 */
export function JobGridSkeleton({ shimmer = false, count = 4 }: JobGridSkeletonProps) {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-busy="true"
      aria-label="Loading job listings"
    >
      {Array.from({ length: count }).map((_, i) => (
        <JobListingSkeleton key={i} shimmer={shimmer} />
      ))}
    </div>
  );
}
