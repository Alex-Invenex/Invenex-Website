import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** Enable enhanced micro-interactions (Story 9.5) */
  enhanced?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  className,
  type = "text",
  label,
  error,
  enhanced = false,
  id,
  ref,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-body-sm font-medium text-foreground mb-2"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={cn(
          // Base styles
          "w-full px-4 py-3 rounded-lg",
          "bg-background-secondary border border-border",
          "text-foreground placeholder:text-foreground-subtle",
          "transition-all duration-normal ease-out",

          // Focus state - standard
          !enhanced && "focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]",

          // Focus state - enhanced (Story 9.5)
          // Scale 1.01, accent glow, 200ms transition
          enhanced && [
            "focus:outline-none focus:border-accent",
            "focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15),0_0_20px_rgba(255,255,255,0.1)]",
            "focus:scale-[1.01]",
            "motion-reduce:focus:scale-100", // Respect reduced motion
          ],

          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed",

          // Error state
          error &&
            "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]",

          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-body-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
