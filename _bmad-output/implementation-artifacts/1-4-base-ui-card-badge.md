# Story 1.4: Base UI Components - Card & Badge

Status: done

## Story

As a **developer**,
I want **reusable Card and Badge components**,
So that **content containers and status indicators are consistent**.

## Acceptance Criteria

### AC1: Card Component
**Given** I need a Card component
**When** I use the Card for content
**Then** it supports:
- Variants: default, elevated, interactive
- Hover effect: border glow, subtle shadow
- Spotlight effect on hover (gradient radial from white/5)
- Proper padding following spacing system
- Rounded corners (16px)

### AC2: Badge Component
**Given** I need a Badge component
**When** I use the Badge for categories/status
**Then** it supports:
- Variants: default, success, warning, error, info
- Sizes: sm, md
- Proper contrast for accessibility

## Tasks / Subtasks

- [x] Task 1: Create Card Component (AC: 1)
  - [x] Create \`src/components/ui/card.tsx\`
  - [x] Implement all variants (default, elevated, interactive)
  - [x] Add hover effects with border glow and shadow
  - [x] Implement spotlight effect using radial gradient
  - [x] Use design token spacing and border-radius

- [x] Task 2: Create Badge Component (AC: 2)
  - [x] Create \`src/components/ui/badge.tsx\`
  - [x] Implement all variants (default, success, warning, error, info)
  - [x] Implement sizes (sm, md)
  - [x] Ensure proper color contrast for accessibility

- [x] Task 3: Update Barrel Export & Verify
  - [x] Update \`src/components/ui/index.ts\`
  - [x] Run TypeScript check
  - [x] Run ESLint
  - [x] Verify build succeeds

---

## Dev Notes (Context7-Verified Patterns)

### CRITICAL: React 19 - No forwardRef Needed!

Per Context7/React 19 docs, \`ref\` can be passed directly as a prop.

---

### Task 1: Card Component Implementation

\`\`\`tsx
// src/components/ui/card.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
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
        "relative overflow-hidden rounded-lg p-6",
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
            background: \`radial-gradient(400px circle at \${mousePosition.x}px \${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)\`,
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
\`\`\`

---

### Task 2: Badge Component Implementation

\`\`\`tsx
// src/components/ui/badge.tsx
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
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
\`\`\`

---

### Task 3: Update Barrel Export

\`\`\`tsx
// src/components/ui/index.ts (ADD to existing)
export { Button, type ButtonProps } from "./button";
export { Input, type InputProps } from "./input";
export { Textarea, type TextareaProps } from "./textarea";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
} from "./card";
export { Badge, type BadgeProps } from "./badge";
\`\`\`

---

## Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Component Location | \`src/components/ui/\` |
| Styling | Tailwind CSS v4 with cn() utility |
| React Version | React 19 (ref as prop, no forwardRef) |
| Card Composition | Sub-components (CardHeader, CardTitle, etc.) |
| Spotlight Effect | CSS radial gradient + mouse tracking |
| Animation | Design tokens: duration-normal, ease-out |

---

## Design Token Usage

| Token | Usage |
|-------|-------|
| \`bg-background-secondary\` | Card background |
| \`bg-background-tertiary\` | Default badge background |
| \`border-border\` | Default borders |
| \`border-border-hover\` | Hover state border |
| \`text-success/warning/error/info\` | Semantic badge text |
| \`rounded-lg\` | Card corners (16px per --radius-lg) |
| \`duration-normal\` | Transition timing |
| \`p-6\` | Card padding (24px) |

---

## Testing Checklist

- [ ] \`npm run build\` succeeds
- [ ] \`npm run lint\` passes
- [ ] TypeScript check passes
- [ ] Card renders all 3 variants
- [ ] Card interactive spotlight effect works on hover
- [ ] Badge renders all 5 variants
- [ ] Badge renders both sizes
- [ ] All components use design tokens

---

## References

- [Context7: Tailwind CSS hover effects](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Context7: Tailwind CSS radial gradients](https://tailwindcss.com/docs/background-image)
- [Source: ux-design-specification.md#Card-Component]
- [Source: ux-design-specification.md#Badge-Component]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List
- Implemented Card component with all 3 variants (default, elevated, interactive)
- Card includes mouse-tracking spotlight effect for interactive variant
- Card composition API: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Implemented Badge component with 5 variants (default, success, warning, error, info)
- Badge supports 2 sizes (sm, md) with proper color contrast
- All components use React 19 patterns (ref as prop, no forwardRef)
- All components use design tokens from Tailwind CSS config
- TypeScript check passed
- ESLint passed
- Build succeeded

### File List
- `src/components/ui/card.tsx` (created, updated: fixed rounded-2xl for 16px corners)
- `src/components/ui/badge.tsx` (created, updated: added ref forwarding)
- `src/components/ui/index.ts` (updated)

---

## Senior Developer Review (AI)

**Review Date:** 2026-01-23
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)
**Outcome:** Changes Requested → **Fixed**

### Issues Found & Resolved

| # | Severity | Issue | Status |
|---|----------|-------|--------|
| 1 | MEDIUM | Card rounded-lg is 8px, spec requires 16px | ✅ Fixed: changed to rounded-2xl |
| 2 | LOW | Badge missing ref forwarding (inconsistent with Card API) | ✅ Fixed: added ref prop |
| 3 | HIGH | No unit tests for Card/Badge components | ⚠️ Action item: requires test framework setup |

### Action Items
- [x] [AI-Review][MEDIUM] Fix Card border-radius from rounded-lg to rounded-2xl (16px) `card.tsx:35`
- [x] [AI-Review][LOW] Add ref forwarding to Badge component for API consistency `badge.tsx`
- [ ] [AI-Review][HIGH] Set up unit testing framework (Vitest) and add component tests
