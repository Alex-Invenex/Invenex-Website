import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link" | "coral";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  asChild = false,
  children,
  disabled,
  ref,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    // Base styles
    "inline-flex items-center justify-center font-medium rounded-full",
    "transition-all duration-normal ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",

    // Variants
    variant === "primary" &&
      "bg-gradient-to-r from-[var(--color-coral-500)] to-[var(--color-coral-700)] text-white font-semibold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] shadow-[0_0_20px_rgba(255,107,53,0.3)]",
    variant === "secondary" &&
      "bg-white/5 border border-white/20 text-foreground hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] backdrop-blur-sm",
    variant === "ghost" &&
      "bg-transparent text-foreground hover:bg-background-secondary",
    variant === "link" &&
      "bg-transparent text-foreground underline-offset-4 hover:underline p-0 h-auto",
    // Coral variant - warm accent for standout CTAs (Story 9.4)
    // Uses coral-700 in gradient for WCAG AA contrast with white text
    // References CSS variables from globals.css for design system consistency
    variant === "coral" &&
      "bg-gradient-to-r from-[var(--color-coral-500)] to-[var(--color-coral-700)] text-white font-semibold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] shadow-[0_0_20px_rgba(255,107,53,0.3)]",

    // Sizes (skip padding for link variant)
    variant !== "link" && {
      "h-9 px-4 text-body-sm": size === "sm",
      "h-11 px-6 text-body": size === "md",
      "h-14 px-8 text-body-lg": size === "lg",
    },

    className
  );

  // When asChild is true, use Slot to pass styles to child
  if (asChild) {
    return (
      <Slot ref={ref} className={buttonClasses} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
