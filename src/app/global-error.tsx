"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-white min-h-dvh flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="text-8xl font-bold text-[#FF6B35] mb-6">Error</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Something Went Wrong
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B35] hover:bg-[#e55e2e] text-white font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
