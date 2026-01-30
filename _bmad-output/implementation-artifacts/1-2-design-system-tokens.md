# Story 1.2: Design System Tokens Configuration

Status: done

## Story

As a **developer**,
I want **a complete design token system configured in Tailwind CSS**,
So that **all components use consistent colors, typography, spacing, and animations**.

## Acceptance Criteria

### AC1: Color Tokens
**Given** I am configuring the design system
**When** I set up the color tokens
**Then** the following colors are defined:
- `background`: #0A0A0A (primary), #141414 (secondary), #1A1A1A (tertiary)
- `foreground`: #FAFAFA (primary), #A3A3A3 (muted), #737373 (subtle)
- `border`: #262626 (default), #404040 (hover)
- `accent`: #FFFFFF
- Semantic colors: success (#22C55E), warning (#F59E0B), error (#EF4444), info (#3B82F6)

### AC2: Typography Tokens
**Given** I am configuring typography
**When** I set up the font system
**Then** Inter font is loaded with:
- Variable font for optimal performance
- Font weights: 400, 500, 600, 700
- Type scale from caption (12px) to hero (96px)

### AC3: Spacing Tokens
**Given** I am configuring spacing
**When** I set up the spacing scale
**Then** an 8px base grid is established with tokens from space-1 (4px) to space-32 (128px)

### AC4: Animation Tokens
**Given** I am configuring animations
**When** I set up animation tokens
**Then** the following are defined:
- Durations: fast (150ms), normal (300ms), slow (500ms)
- Easing: ease-out `cubic-bezier(0.16, 1, 0.3, 1)`

## Tasks / Subtasks

- [x] Task 1: Configure Color Tokens in globals.css (AC: 1)
  - [x] Define CSS custom properties for all colors
  - [x] Set up Tailwind CSS v4 @theme directive
  - [x] Create semantic color mappings

- [x] Task 2: Set Up Inter Font with next/font (AC: 2)
  - [x] Import Inter from next/font/google
  - [x] Configure variable font with required weights
  - [x] Apply font to root layout

- [x] Task 3: Define Typography Scale (AC: 2)
  - [x] Create type scale CSS variables
  - [x] Define responsive typography utilities

- [x] Task 4: Configure Spacing System (AC: 3)
  - [x] Define 8px grid spacing tokens
  - [x] Ensure Tailwind utilities use tokens

- [x] Task 5: Set Up Animation Tokens (AC: 4)
  - [x] Define duration variables
  - [x] Define easing function variables
  - [x] Create reusable animation utilities

## Dev Notes

### Context7-Verified: Tailwind CSS v4 @theme Directive

Per latest Tailwind CSS v4 documentation, the `@theme` directive defines design tokens as CSS variables that Tailwind automatically converts to utility classes. For example, `--color-background` becomes `bg-background`.

### Color System (globals.css) - EXACT IMPLEMENTATION

```css
@import "tailwindcss";

@theme {
  /* Font Family - connects to next/font CSS variable */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* Background Colors */
  --color-background: #0A0A0A;
  --color-background-secondary: #141414;
  --color-background-tertiary: #1A1A1A;

  /* Foreground Colors */
  --color-foreground: #FAFAFA;
  --color-foreground-muted: #A3A3A3;
  --color-foreground-subtle: #737373;

  /* Border Colors */
  --color-border: #262626;
  --color-border-hover: #404040;

  /* Accent */
  --color-accent: #FFFFFF;

  /* Semantic Colors */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Spacing (8px grid) - Tailwind creates space-* utilities */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-32: 128px;

  /* Animation - creates duration-* and ease-* utilities */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Border Radius - creates rounded-* utilities */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Typography Scale - creates text-* utilities */
  --text-caption: 0.75rem;
  --text-body-sm: 0.875rem;
  --text-body: 1rem;
  --text-body-lg: 1.125rem;
  --text-h6: 1.25rem;
  --text-h5: 1.5rem;
  --text-h4: 1.875rem;
  --text-h3: 2.25rem;
  --text-h2: 3rem;
  --text-h1: 3.75rem;
  --text-display: 4.5rem;
  --text-hero: 6rem;
}
```

### Context7-Verified: next/font Configuration (layout.tsx)

Per Next.js documentation, the `variable` option defines a CSS variable name. Apply this to the `<html>` element so it's available throughout the document.

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Invenex Solutions",
  description: "Premium web development and digital solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
```

**IMPORTANT:** Inter is a variable font - no need to specify `weight` array. The variable font includes all weights automatically.

### Typography Scale Reference

| Token | Size | Usage |
|-------|------|-------|
| `--text-caption` | 12px | Labels, captions |
| `--text-body-sm` | 14px | Small body text |
| `--text-body` | 16px | Default body |
| `--text-body-lg` | 18px | Large body |
| `--text-h6` | 20px | Heading 6 |
| `--text-h5` | 24px | Heading 5 |
| `--text-h4` | 30px | Heading 4 |
| `--text-h3` | 36px | Heading 3 |
| `--text-h2` | 48px | Heading 2 |
| `--text-h1` | 60px | Heading 1 |
| `--text-display` | 72px | Display text |
| `--text-hero` | 96px | Hero headlines |

### Utility Classes Generated

After implementing, these Tailwind classes become available:
- Colors: `bg-background`, `bg-background-secondary`, `text-foreground`, `text-foreground-muted`, `border-border`, etc.
- Spacing: `p-1` (4px), `p-2` (8px), `m-4` (16px), `gap-6` (24px), etc.
- Animation: `duration-fast`, `duration-normal`, `ease-out`
- Radius: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`
- Typography: `text-caption`, `text-body`, `text-h1`, `text-hero`, etc.

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Design Tokens | CSS custom properties in @theme |
| Font Loading | next/font for optimal performance |
| Color Palette | Premium black/white (#0A0A0A/#FAFAFA) |
| Spacing | 8px grid system |
| Animation | cubic-bezier(0.16, 1, 0.3, 1) easing |

### Dependencies

- Requires Story 1.1 (Project Initialization) completed
- next/font/google for Inter font

### References

- [Source: ux-design-specification.md#Color-Palette]
- [Source: ux-design-specification.md#Typography-Scale]
- [Source: ux-design-specification.md#Spacing-System]
- [Source: architecture.md#Design-System-Implementation]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

1. **AC1 (Color Tokens):** Implemented all color tokens in `globals.css` using Tailwind v4 `@theme` directive. Background (#0A0A0A, #141414, #1A1A1A), foreground (#FAFAFA, #A3A3A3, #737373), border (#262626, #404040), accent (#FFFFFF), and semantic colors (success, warning, error, info) all defined.

2. **AC2 (Typography Tokens):** Inter font loaded via `next/font/google` with variable font support. Applied to `<html>` element via `--font-inter` CSS variable. Typography scale defined from `--text-caption` (12px) to `--text-hero` (96px).

3. **AC3 (Spacing Tokens):** 8px grid spacing system implemented with tokens `--spacing-1` (4px) through `--spacing-32` (128px). Tailwind v4 automatically generates spacing utilities from these tokens.

4. **AC4 (Animation Tokens):** Duration tokens (`--duration-fast`: 150ms, `--duration-normal`: 300ms, `--duration-slow`: 500ms) and easing function (`--ease-out`: cubic-bezier(0.16, 1, 0.3, 1)) defined.

5. **Verification:** TypeScript check passes, ESLint passes, production build succeeds. All design tokens generate corresponding Tailwind utility classes.

**Key Decisions:**
- Used `@theme` directive (not `@theme inline`) per Tailwind v4 best practices
- Inter is a variable font - no weight array needed as all weights are included automatically
- Font connected via `--font-sans: var(--font-inter)` in @theme block
- Page.tsx updated to demonstrate design token usage (`text-h1`, `text-foreground-muted`, etc.)

### File List

**Modified:**
- `src/app/globals.css` - Complete design token system with @theme directive
- `src/app/layout.tsx` - Inter font configuration with next/font/google
- `src/app/page.tsx` - Updated to use design token utilities
