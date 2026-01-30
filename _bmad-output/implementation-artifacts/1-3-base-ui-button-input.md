# Story 1.3: Base UI Components - Button & Input

Status: done

## Story

As a **developer**,
I want **reusable Button and Input components with all variants**,
So that **forms and CTAs maintain design consistency throughout the site**.

## Acceptance Criteria

### AC1: Button Component
**Given** I need a Button component
**When** I use the Button with different variants
**Then** it supports:
- Variants: primary (white bg, black text), secondary (transparent, white border), ghost (no border), link (underline)
- Sizes: sm, md, lg
- States: default, hover (scale 1.02, glow), active (scale 0.98), disabled (50% opacity), loading (spinner)
- Full rounded corners (rounded-full)
- Proper focus states for accessibility

### AC2: Input Component
**Given** I need an Input component
**When** I use the Input for forms
**Then** it supports:
- Types: text, email, tel, textarea
- States: default, focused (white border glow), error (red border), disabled
- Label above input (not placeholder-only)
- Error message display below field
- Proper ARIA attributes for accessibility

## Tasks / Subtasks

- [x] Task 0: Implement cn() utility (PREREQUISITE)
  - [x] Install clsx and tailwind-merge
  - [x] Create `src/lib/utils.ts` with cn() function

- [x] Task 1: Create Button Component (AC: 1)
  - [x] Create `src/components/ui/button.tsx`
  - [x] Implement all variants (primary, secondary, ghost, link)
  - [x] Implement all sizes (sm, md, lg)
  - [x] Add hover, active, disabled, loading states
  - [x] Ensure accessibility (focus visible, aria-disabled)

- [x] Task 2: Create Input Component (AC: 2)
  - [x] Create `src/components/ui/input.tsx`
  - [x] Support text, email, tel types
  - [x] Add label and error message support
  - [x] Implement focus, error, disabled states
  - [x] Add ARIA attributes

- [x] Task 3: Create Textarea Component (AC: 2)
  - [x] Create `src/components/ui/textarea.tsx`
  - [x] Reuse Input styling patterns
  - [x] Support auto-resize option

- [x] Task 4: Export Components & Verify
  - [x] Create `src/components/ui/index.ts` barrel export
  - [x] Run TypeScript check
  - [x] Run ESLint
  - [x] Verify build succeeds

---

## Dev Notes (Context7-Verified Patterns)

### CRITICAL: React 19 - No forwardRef Needed!

Per Context7/React 19 docs, `ref` can now be passed directly as a prop:

```tsx
// React 19 pattern - ref is just a prop!
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />
}

// Usage
<MyInput ref={inputRef} />
```

**DO NOT USE `forwardRef`** - it's deprecated in React 19.

---

### Task 0: cn() Utility Implementation (MUST DO FIRST)

```bash
# Install dependencies
cd invenex-website
npm install clsx tailwind-merge
```

```tsx
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### Task 1: Button Component (React 19 Pattern)

```tsx
// src/components/ui/button.tsx
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center font-medium rounded-full",
        "transition-all duration-normal ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-50 disabled:pointer-events-none",
        "active:scale-[0.98]",

        // Variants
        variant === "primary" &&
          "bg-accent text-background hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        variant === "secondary" &&
          "bg-transparent border border-border text-foreground hover:border-border-hover hover:scale-[1.02]",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-background-secondary",
        variant === "link" &&
          "bg-transparent text-foreground underline-offset-4 hover:underline p-0 h-auto",

        // Sizes (skip padding for link variant)
        variant !== "link" && {
          "h-9 px-4 text-body-sm": size === "sm",
          "h-11 px-6 text-body": size === "md",
          "h-14 px-8 text-body-lg": size === "lg",
        },

        className
      )}
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
```

---

### Task 2: Input Component (React 19 Pattern)

```tsx
// src/components/ui/input.tsx
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  className,
  type = "text",
  label,
  error,
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
```

---

### Task 3: Textarea Component (React 19 Pattern)

```tsx
// src/components/ui/textarea.tsx
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
```

---

### Task 4: Barrel Export

```tsx
// src/components/ui/index.ts
export { Button, type ButtonProps } from "./button";
export { Input, type InputProps } from "./input";
export { Textarea, type TextareaProps } from "./textarea";
```

---

## Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Component Location | `src/components/ui/` |
| Styling | Tailwind CSS v4 with cn() utility |
| React Version | React 19 (ref as prop, no forwardRef) |
| Accessibility | ARIA attributes, focus-visible, role="alert" |
| Animation | Design tokens: duration-normal, ease-out |
| Colors | Design tokens: bg-background, text-foreground, etc. |

---

## Design Token Usage

Components use these tokens from Story 1.2:

| Token | Usage |
|-------|-------|
| `bg-background-secondary` | Input background |
| `border-border` | Default border |
| `border-border-hover` | Hover border |
| `text-foreground` | Primary text |
| `text-foreground-subtle` | Placeholder text |
| `text-error` / `border-error` | Error states |
| `bg-accent` / `text-background` | Primary button |
| `duration-normal` | Transition timing |
| `ease-out` | Transition easing |
| `text-body-sm` / `text-body` / `text-body-lg` | Typography sizes |

---

## Testing Checklist

After implementation, verify:

- [ ] `npm run build` succeeds with no errors
- [ ] `npm run lint` passes
- [ ] TypeScript check (`npx tsc --noEmit`) passes
- [ ] Button renders all 4 variants (primary, secondary, ghost, link)
- [ ] Button renders all 3 sizes (sm, md, lg)
- [ ] Button shows spinner when `isLoading={true}`
- [ ] Button is disabled when `disabled` or `isLoading`
- [ ] Input displays label above field
- [ ] Input shows error message with red border
- [ ] Textarea renders with proper min-height
- [ ] Focus states are visible with keyboard navigation (Tab)
- [ ] All components use design tokens (no hardcoded colors)

---

## Quick Verification Commands

```bash
cd invenex-website

# Install dependencies
npm install clsx tailwind-merge

# After implementation, verify:
npx tsc --noEmit        # TypeScript check
npm run lint            # ESLint check
npm run build           # Production build
```

---

## References

- [Context7: React 19 ref as prop](https://react.dev/blog/2024/12/05/react-19)
- [Context7: Tailwind CSS hover/focus states](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Source: ux-design-specification.md#Button-Component]
- [Source: ux-design-specification.md#Input-Component]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

1. **Task 0 (cn utility):** Installed clsx@2.x and tailwind-merge. Created cn() utility in `src/lib/utils.ts` combining clsx for conditional classes and twMerge for Tailwind class deduplication.

2. **Task 1 (Button - AC1):** Implemented Button component with 4 variants (primary, secondary, ghost, link), 3 sizes (sm, md, lg), loading spinner, disabled state. Uses React 19 ref-as-prop pattern. Accessibility: focus-visible ring, aria-hidden on spinner.

3. **Task 2 (Input - AC2):** Implemented Input component with label, error message, ARIA attributes (aria-invalid, aria-describedby). Supports text/email/tel types. Error state uses design token `border-error`.

4. **Task 3 (Textarea - AC2):** Implemented Textarea component reusing Input styling patterns. min-h-[120px], resize-y. Same ARIA support as Input.

5. **Task 4 (Export & Verify):** Created barrel export. All checks passed:
   - TypeScript: PASS (no errors)
   - ESLint: PASS (no warnings)
   - Build: PASS (Next.js 16.1.3, compiled in 5.1s)

### File List

**Created:**
- `src/lib/utils.ts` - cn() utility function
- `src/components/ui/button.tsx` - Button component (AC1)
- `src/components/ui/input.tsx` - Input component (AC2)
- `src/components/ui/textarea.tsx` - Textarea component (AC2)
- `src/components/ui/index.ts` - Barrel export

**Modified:**
- `package.json` - Added clsx, tailwind-merge dependencies
