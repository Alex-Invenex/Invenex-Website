import { Skeleton, ProjectGridSkeleton } from '@/components/ui/skeleton'

/**
 * Portfolio page loading state
 *
 * Uses shimmer skeletons for premium loading experience.
 * Matches the portfolio page layout structure.
 *
 * Story 9.9: Branded Page Loader
 */
export default function PortfolioLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      {/* Hero Section Skeleton */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          {/* Badge */}
          <Skeleton className="h-8 w-32 mx-auto mb-6" variant="shimmer" />

          {/* Headline */}
          <Skeleton className="h-14 w-3/4 mx-auto mb-4" variant="shimmer" />

          {/* Subtext */}
          <Skeleton className="h-6 w-1/2 mx-auto" variant="shimmer" />
        </div>
      </section>

      {/* Filter Tabs Skeleton */}
      <section className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-24"
              variant="shimmer"
            />
          ))}
        </div>
      </section>

      {/* Project Grid Skeleton */}
      <section className="container mx-auto px-6 pb-20">
        <ProjectGridSkeleton shimmer count={9} />
      </section>
    </div>
  )
}
