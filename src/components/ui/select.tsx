import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export function Select({
  className,
  label,
  error,
  options,
  placeholder,
  id,
  ref,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-body-sm font-medium text-foreground mb-2"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          // Base styles
          "w-full px-4 py-3 rounded-lg appearance-none",
          "bg-background-secondary border border-border",
          "text-foreground",
          "transition-all duration-normal ease-out",
          "cursor-pointer",

          // Custom dropdown arrow
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]",
          "bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10",

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
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled={props.required}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-2 text-body-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
