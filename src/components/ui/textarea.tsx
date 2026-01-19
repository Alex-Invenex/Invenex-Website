import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea({
  className,
  label,
  error,
  id,
  ref,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-body-sm font-medium text-foreground mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          // Base styles
          "w-full px-4 py-3 rounded-lg min-h-[120px] resize-y",
          "bg-background-secondary border border-border",
          "text-foreground placeholder:text-foreground-subtle",
          "transition-all duration-normal ease-out",

          // Focus state
          "focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]",

          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed",

          // Error state
          error &&
            "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]",

          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-2 text-body-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
