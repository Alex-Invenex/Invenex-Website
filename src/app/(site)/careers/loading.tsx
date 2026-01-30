import { Skeleton, JobGridSkeleton } from '@/components/ui/skeleton'

/**
 * Careers page loading state
 *
 * Uses shimmer skeletons for premium loading experience.
 * Matches the careers page layout structure.
 *
 * Story 9.9: Branded Page Loader
 */
export default function CareersLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-busy="true"
      aria-label="Loading careers page"
    >
      {/* Hero Section Skeleton */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          {/* Badge */}
          <Skeleton className="h-8 w-32 mx-auto mb-6" variant="shimmer" />

          {/* Headline */}
          <Skeleton className="h-14 w-2/3 mx-auto mb-4" variant="shimmer" />

          {/* Subtext */}
          <Skeleton className="h-6 w-1/2 mx-auto" variant="shimmer" />
        </div>
      </section>

      {/* Life at Invenex Skeleton */}
      <section className="container mx-auto px-6 py-16">
        <Skeleton className="h-10 w-48 mb-8" variant="shimmer" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-6 w-full mb-4" variant="shimmer" />
            <Skeleton className="h-6 w-5/6 mb-4" variant="shimmer" />
            <Skeleton className="h-6 w-4/5" variant="shimmer" />
          </div>
          <Skeleton className="aspect-video w-full" variant="shimmer" />
        </div>
      </section>

      {/* Benefits Grid Skeleton */}
      <section className="container mx-auto px-6 py-16 bg-background-secondary">
        <Skeleton className="h-10 w-40 mx-auto mb-12" variant="shimmer" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 border border-border rounded-lg">
              <Skeleton className="h-12 w-12 mb-4" variant="shimmer" />
              <Skeleton className="h-6 w-3/4 mb-2" variant="shimmer" />
              <Skeleton className="h-4 w-full" variant="shimmer" />
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Skeleton */}
      <section className="container mx-auto px-6 py-16">
        <Skeleton className="h-10 w-48 mb-8" variant="shimmer" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" variant="shimmer" />
          ))}
        </div>

        {/* Job Listings */}
        <JobGridSkeleton shimmer count={4} />
      </section>
    </div>
  )
}
