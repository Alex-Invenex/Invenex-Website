import { Skeleton } from '@/components/ui/skeleton'

/**
 * Root loading state for the site layout
 *
 * Uses shimmer skeletons for a premium loading experience.
 * Shown during route transitions and initial page loads.
 *
 * Story 9.9: Branded Page Loader
 */
export default function SiteLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-busy="true"
      aria-label="Loading page content"
    >
      {/* Hero Section Skeleton */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          {/* Badge */}
          <Skeleton className="h-8 w-48 mx-auto mb-8" variant="shimmer" />

          {/* Headline */}
          <Skeleton className="h-16 w-3/4 mx-auto mb-4" variant="shimmer" />
          <Skeleton className="h-16 w-1/2 mx-auto mb-8" variant="shimmer" />

          {/* Subtext */}
          <Skeleton className="h-6 w-2/3 mx-auto mb-8" variant="shimmer" />

          {/* CTAs */}
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-36" variant="shimmer" />
            <Skeleton className="h-12 w-36" variant="shimmer" />
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="container mx-auto px-6 py-20">
        {/* Section Title */}
        <Skeleton className="h-10 w-64 mx-auto mb-12" variant="shimmer" />

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 border border-border rounded-lg">
              <Skeleton className="h-48 w-full mb-4" variant="shimmer" />
              <Skeleton className="h-6 w-3/4 mb-2" variant="shimmer" />
              <Skeleton className="h-4 w-full mb-2" variant="shimmer" />
              <Skeleton className="h-4 w-2/3" variant="shimmer" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
