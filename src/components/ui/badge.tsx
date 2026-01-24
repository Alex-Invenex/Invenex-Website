import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  ref?: React.Ref<HTMLSpanElement>;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ref,
  ...props
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(
        // Base styles
        "inline-flex items-center font-medium rounded-full",
        "transition-colors duration-fast",

        // Sizes
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-body-sm": size === "md",
        },

        // Variants
        variant === "default" &&
          "bg-background-tertiary text-foreground border border-border",
        variant === "success" &&
          "bg-success/10 text-success border border-success/20",
        variant === "warning" &&
          "bg-warning/10 text-warning border border-warning/20",
        variant === "error" &&
          "bg-error/10 text-error border border-error/20",
        variant === "info" &&
          "bg-info/10 text-info border border-info/20",

        className
      )}
      {...props}
    />
  );
}
