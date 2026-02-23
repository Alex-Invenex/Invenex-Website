import { Skeleton } from "@/components/ui/skeleton";

export default function PrivacyLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-busy="true"
      aria-label="Loading page"
    >
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Skeleton className="h-14 w-1/3 mx-auto mb-4" variant="shimmer" />
          <Skeleton className="h-6 w-1/4 mx-auto" variant="shimmer" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mb-8">
            <Skeleton className="h-8 w-1/3 mb-4" variant="shimmer" />
            <Skeleton className="h-4 w-full mb-2" variant="shimmer" />
            <Skeleton className="h-4 w-full mb-2" variant="shimmer" />
            <Skeleton className="h-4 w-2/3" variant="shimmer" />
          </div>
        ))}
      </section>
    </div>
  );
}
