import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton loading component for displaying loading placeholders
 *
 * Uses a pulsing animation to indicate content is loading.
 * Use this for lazy-loaded components and async data.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-background-secondary",
        className
      )}
    />
  );
}

/**
 * Card skeleton for loading project cards, blog posts, etc.
 */
export function CardSkeleton() {
  return (
    <div className="p-6 border border-border rounded-lg">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/**
 * Project grid skeleton for portfolio pages
 */
export function ProjectGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Image skeleton for gallery placeholders
 */
export function ImageSkeleton({ aspectRatio = "video" }: { aspectRatio?: "video" | "square" }) {
  return (
    <Skeleton
      className={cn(
        "w-full",
        aspectRatio === "video" ? "aspect-video" : "aspect-square"
      )}
    />
  );
}
