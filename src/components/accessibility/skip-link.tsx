"use client";

/**
 * SkipLink Component - Story 8.4
 *
 * Provides keyboard users with a way to skip repetitive navigation
 * and jump directly to the main content area.
 *
 * WCAG 2.1 AA Compliance:
 * - SC 2.4.1: Bypass Blocks
 * - SC 2.4.3: Focus Order
 */
export function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      // Scroll into view for visual users
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      data-testid="skip-link"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed
        focus:top-4
        focus:left-4
        focus:z-[100]
        focus:px-4
        focus:py-2
        focus:bg-foreground
        focus:text-background
        focus:rounded-lg
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-background
        focus:ring-foreground
        focus:font-medium
      "
    >
      Skip to main content
    </a>
  );
}
