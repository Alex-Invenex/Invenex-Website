"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card visual variant:
   * - default: basic card
   * - elevated: with shadow
   * - interactive: with spotlight effect
   * - lift: hover lifts 8px with enhanced shadow (Story 9.5)
   */
  variant?: "default" | "elevated" | "interactive" | "lift";
  ref?: React.Ref<HTMLDivElement>;
}

export function Card({
  className,
  variant = "default",
  children,
  ref,
  ...props
}: CardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== "interactive") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "relative overflow-hidden rounded-2xl p-6", // 16px per design spec
        "bg-background-secondary border border-border",
        "transition-all duration-normal ease-out",

        // Variants
        variant === "default" && "",
        variant === "elevated" && "shadow-lg",
        variant === "interactive" && [
          "cursor-pointer",
          "hover:border-border-hover hover:shadow-lg",
          "active:scale-[0.98]",
        ],
        // Lift variant - Story 9.5: Card lifts 8px on hover with shadow-2xl
        variant === "lift" && [
          "cursor-pointer",
          "hover:border-border-hover",
          "hover:-translate-y-2", // 8px lift
          "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]", // shadow-2xl equivalent
          "active:scale-[0.98]",
          "motion-reduce:hover:translate-y-0", // Respect reduced motion
        ],

        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Spotlight effect for interactive variant */}
      {variant === "interactive" && isHovering && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-normal"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Card sub-components for composition
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-h5 font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-body-sm text-foreground-muted mt-1", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4 flex items-center gap-4", className)} {...props} />
  );
}
