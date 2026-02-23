import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-bold text-gradient-orange mb-6">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-foreground-muted mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
