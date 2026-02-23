import { Skeleton } from "@/components/ui/skeleton";

export default function CareerDetailLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-busy="true"
      aria-label="Loading page"
    >
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Skeleton className="h-8 w-32 mx-auto mb-6" variant="shimmer" />
          <Skeleton className="h-14 w-2/3 mx-auto mb-4" variant="shimmer" />
          <Skeleton className="h-6 w-1/2 mx-auto" variant="shimmer" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-2/3" variant="shimmer" />
          <Skeleton className="h-8 w-1/3 mt-8" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-4 w-full" variant="shimmer" />
          <Skeleton className="h-12 w-36 mt-4" variant="shimmer" />
        </div>
      </section>
    </div>
  );
}
