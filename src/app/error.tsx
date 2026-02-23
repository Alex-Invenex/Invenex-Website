"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-bold text-gradient-orange mb-6">500</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Something Went Wrong
        </h2>
        <p className="text-foreground-muted mb-8 text-lg">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
