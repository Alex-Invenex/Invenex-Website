# Story 9.7: Bento Box Portfolio Grid

Status: done

## Story

As a **visitor**,
I want **a dynamic, editorial portfolio grid with varied card sizes**,
So that **browsing projects feels engaging, memorable, and showcases featured work prominently**.

## Acceptance Criteria

### AC1: Bento Grid Layout
**Given** I view the portfolio grid
**When** it renders
**Then**:
- Varied card sizes (1x1, 2x1, 1x2, 2x2)
- Featured projects get larger cards (2x2 or 2x1)
- CSS Grid with named areas or template columns
- Responsive: 1 column mobile, 2 tablet, 3-4 desktop

### AC2: Enhanced Hover Effects
**Given** I hover over a project card
**When** hover is active
**Then**:
- Card expands slightly with smooth scale (1.02)
- Image zooms (scale 1.05)
- Border glow effect with coral accent
- Smooth ease-out-expo timing

### AC3: FLIP Transitions on Filter
**Given** I filter projects
**When** the filter applies
**Then** layout animates with FLIP transitions (Framer Motion layoutId)

### AC4: Staggered Entrance Animation
**Given** the grid loads
**When** cards appear
**Then** they stagger in with entrance animation (50-100ms delays)

### AC5: Accessibility
**Given** reduced motion preference is enabled
**When** animations would trigger
**Then** they are disabled, layout changes instantly

## Tasks / Subtasks

- [x] Task 1: Extend Project Data Model for Featured Flag (AC: 1)
  - [x] Add `featured?: boolean` field to `CaseStudyProject` type in `src/lib/projects.ts`
  - [x] Mark 3-4 flagship projects as featured (CoolTech, GrabToGo, OnMyWay AI, Q by Rayeesa)
  - [x] Export helper `getFeaturedProjects()` function

- [x] Task 2: Create BentoGrid Component (AC: 1, 4)
  - [x] Create `src/components/sections/bento-portfolio-grid.tsx`
  - [x] Define CSS Grid with template areas or auto-placement algorithm
  - [x] Featured projects get larger cells (span 2 columns or 2 rows)
  - [x] Responsive breakpoints: 1col mobile, 2col tablet, 3-4col desktop
  - [x] Wrap items in motion.div with staggered entrance

- [x] Task 3: Create BentoProjectCard Component (AC: 2)
  - [x] Create `src/components/ui/bento-project-card.tsx`
  - [x] Accept `size: 'small' | 'medium' | 'large' | 'featured'` prop
  - [x] Size-appropriate content layouts:
    - small (1x1): Image + title only
    - medium (2x1): Image + title + excerpt
    - large (1x2): Full-height image + overlay
    - featured (2x2): Large image + full details
  - [x] Implement enhanced hover effects (scale, image zoom, border glow)
  - [x] Use coral-500 glow on hover (`shadow-[0_0_30px_rgba(255,107,53,0.3)]`)

- [x] Task 4: Implement FLIP Animation System (AC: 3)
  - [x] Add `layoutId={project.id}` to each BentoProjectCard wrapper
  - [x] Use `<AnimatePresence mode="popLayout">` for filter transitions
  - [x] Ensure cards morph smoothly when changing size/position
  - [x] Test with multiple rapid filter changes

- [x] Task 5: Integrate with Portfolio Page (AC: 1-4)
  - [x] Update `src/app/(site)/portfolio/page.tsx` to use BentoPortfolioGrid
  - [x] Pass featured flag from project data
  - [x] Preserve existing filter functionality
  - [x] Keep URL query param sync working

- [x] Task 6: Add Reduced Motion Support (AC: 5)
  - [x] Check `prefersReducedMotion` before animations
  - [x] Disable stagger, scale, and layout animations when enabled
  - [x] Ensure content still functions correctly

- [x] Task 7: Write Playwright Tests (AC: 1-5)
  - [x] Test bento grid renders with varied card sizes
  - [x] Test featured projects have larger cards
  - [x] Test hover effects apply correctly
  - [x] Test filter transitions work smoothly
  - [x] Test mobile responsive layout (1 column)
  - [x] Test reduced motion disables animations

## Dev Notes

### Current Portfolio Implementation Analysis

**Existing Files:**
- `src/app/(site)/portfolio/page.tsx` - Portfolio page with hero + ProjectGrid
- `src/components/sections/project-grid.tsx` - Current uniform grid with filters
- `src/components/ui/project-card.tsx` - Current card component
- `src/lib/projects.ts` - Project data (14 projects, 4 categories)

**Current Grid Structure:**
- Uniform 3-column grid (1-2-3 responsive)
- All cards same size (aspect-[4/3])
- Filter tabs with URL query param sync
- AnimatePresence for filter transitions
- Suspense boundary for useSearchParams

**What to Preserve:**
- Filter functionality and URL sync
- Category definitions: all, web, mobile, platform, e-commerce
- Project data structure
- Accessibility: aria-labels, data-testid, focus-visible
- Suspense boundary pattern

**What to Transform:**
- Uniform grid → Bento grid with varied sizes
- Same-size cards → Size-aware cards with different layouts
- Simple hover → Enhanced hover with coral glow
- Basic filter animation → FLIP transitions

### Bento Grid CSS Strategy

Use CSS Grid with auto-placement and explicit spanning:

```tsx
// Grid container
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
  {projects.map((project) => {
    const size = project.featured ? 'featured' : getCardSize(project, index)
    const colSpan = size === 'featured' || size === 'medium' ? 'lg:col-span-2' : ''
    const rowSpan = size === 'featured' || size === 'large' ? 'lg:row-span-2' : ''

    return (
      <motion.div className={cn(colSpan, rowSpan)} layoutId={project.id}>
        <BentoProjectCard project={project} size={size} />
      </motion.div>
    )
  })}
</div>
```

### Card Size Algorithm

```typescript
function getCardSize(project: Project, index: number): CardSize {
  // Featured projects always get largest size
  if (project.featured) return 'featured' // 2x2

  // Distribute remaining sizes for visual interest
  const pattern = ['small', 'small', 'medium', 'small', 'large', 'small']
  return pattern[index % pattern.length] as CardSize
}
```

### Enhanced Hover Effects

Use Tailwind + custom CSS for hover states:

```tsx
// BentoProjectCard hover classes
className={cn(
  "group relative rounded-2xl overflow-hidden bg-background-secondary border border-border",
  "transition-all duration-300 ease-out-expo",
  "hover:scale-[1.02] hover:border-coral-500/50",
  "hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]", // Coral glow
)}

// Image zoom on hover
<Image
  className="transition-transform duration-500 ease-out group-hover:scale-105"
/>
```

### FLIP Animation with Framer Motion

```tsx
<AnimatePresence mode="popLayout">
  {filteredProjects.map((project, index) => (
    <motion.div
      key={project.id}
      layoutId={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        layout: { type: "spring", damping: 25, stiffness: 200 }
      }}
    >
      <BentoProjectCard project={project} size={size} />
    </motion.div>
  ))}
</AnimatePresence>
```

### Responsive Breakpoints

| Breakpoint | Columns | Card Sizes |
|------------|---------|------------|
| Mobile (<768px) | 1 | All full-width, uniform height |
| Tablet (768-1023px) | 2 | Featured: 2x1, others: 1x1 |
| Desktop (≥1024px) | 4 | Full bento: 2x2, 2x1, 1x2, 1x1 |

### Size-Specific Card Layouts

**Small (1x1):**
```
┌──────────┐
│  Image   │
│──────────│
│  Title   │
└──────────┘
```

**Medium (2x1):**
```
┌─────────────────────┐
│       Image         │
│─────────────────────│
│ Title     │ Excerpt │
└─────────────────────┘
```

**Large (1x2):**
```
┌──────────┐
│          │
│  Image   │
│  with    │
│  overlay │
│──────────│
│ Title    │
│ Category │
└──────────┘
```

**Featured (2x2):**
```
┌─────────────────────┐
│                     │
│      Image          │
│                     │
│─────────────────────│
│ Title               │
│ Client   │ Category │
│ Excerpt             │
│ CTA button          │
└─────────────────────┘
```

### Previous Story Learnings (from 9-6)

- Use `ease-out-expo` via CSS cubic-bezier(0.16, 1, 0.3, 1)
- Coral accent classes already available: `coral-500`, `glow-coral`
- Use `prefersReducedMotion()` from `@/lib/gsap` for motion checks
- Export new components from `src/components/ui/index.ts`
- Add data-testid attributes for all testable elements
- Maintain aria-labelledby for section accessibility

### File Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── project-grid.tsx (existing - keep as backup)
│   │   └── bento-portfolio-grid.tsx (new)
│   └── ui/
│       ├── project-card.tsx (existing)
│       └── bento-project-card.tsx (new)
├── lib/
│   └── projects.ts (modified - add featured flag)
└── app/
    └── (site)/
        └── portfolio/
            └── page.tsx (modified - use bento grid)
```

### Coral Accent Integration

From Story 9-4, the coral color tokens are available:
- `coral-500`: #FF6B35 (primary accent)
- `glow-coral`: box-shadow with coral
- Use for hover states on featured cards

### Animation Timing Reference

| Element | Trigger | Duration | Easing | Delay |
|---------|---------|----------|--------|-------|
| Card entrance | Page load | 400ms | power2.out | index * 50ms |
| Card hover scale | mouseenter | 300ms | ease-out-expo | 0ms |
| Image zoom | mouseenter | 500ms | ease-out | 0ms |
| Border glow | mouseenter | 200ms | ease-out | 0ms |
| Filter FLIP | Filter change | 400ms | spring(200, 25) | 0ms |

### Testing Approach

Use Playwright tests similar to 9-6:
- Screenshot comparisons for bento layout
- Hover state testing with `page.hover()`
- Filter transition testing with multiple clicks
- Mobile viewport testing for responsive layout
- Reduced motion testing with `emulateMedia`

### References

- [Source: epics.md#Story-9.7] - Acceptance criteria and success metrics
- [Source: 9-6-hero-section-2-0.md] - Animation patterns and GSAP integration
- [Source: 9-4-coral-accent-color-integration.md] - Coral color tokens
- [Source: src/components/sections/project-grid.tsx] - Current implementation to transform
- [Source: src/lib/projects.ts] - Project data model

## Testing Checklist

- [x] Bento grid renders with varied card sizes (1x1, 2x1, 1x2, 2x2)
- [x] Featured projects display with 2x2 or 2x1 cards
- [x] Non-featured projects have varied sizes for visual interest
- [x] Hover effect: card scales up (1.02)
- [x] Hover effect: image zooms (1.05)
- [x] Hover effect: coral border glow appears
- [x] Filter tabs still work with URL sync
- [x] Filter change triggers smooth FLIP animation
- [x] Cards stagger in on page load
- [x] Mobile: single column layout
- [x] Tablet: 2 column layout
- [x] Desktop: 4 column bento layout
- [x] Reduced motion: all animations disabled
- [x] Accessibility: aria-labels, focus-visible, keyboard nav
- [x] ESLint passes with 0 errors

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Story created with comprehensive context | Claude Opus 4.5 |
| 2026-01-30 | Implementation complete: Bento grid, featured flag, all tests passing | Claude Opus 4.5 |
| 2026-01-30 | Code Review Fix: Rewrote usePrefersReducedMotion hook to use useState + useEffect pattern for SSR safety, preventing hydration mismatches | Claude Opus 4.5 |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- ESLint: 0 errors on all new files
- Playwright tests: 58 passed, 2 skipped (mobile hover)
- Browser verification: Visual confirmation via Playwright MCP

### Completion Notes List

**Implementation Summary:**
- Added `featured?: boolean` to `CaseStudyProject` interface
- Marked 4 flagship projects as featured: CoolTech International, GrabToGo, OnMyWay AI, Q by Rayeesa
- Created `BentoProjectCard` component with 4 size variants (small, medium, large, featured)
- Created `BentoPortfolioGrid` component with CSS Grid bento layout
- Integrated coral accent color for hover glow effects
- FLIP transitions via Framer Motion `layoutId` and `AnimatePresence mode="popLayout"`
- Staggered entrance animations (50ms delay between cards)
- Full reduced motion support via `prefersReducedMotion` check
- Updated portfolio page to use new bento grid

**Key Features:**
- Featured cards span 2x2 with full project details
- Card size algorithm creates visual variety: small, small, medium, small, large, small pattern
- Hover effects: scale 1.02, image zoom 1.05, coral border glow
- Filter transitions animate smoothly with spring physics
- Responsive: 1 col mobile, 2 col tablet, 4 col desktop
- All accessibility preserved: aria-labelledby, data-testid, focus-visible, keyboard nav

### File List

**New Files:**
- src/components/ui/bento-project-card.tsx
- src/components/sections/bento-portfolio-grid.tsx

**Modified Files:**
- src/lib/projects.ts (added featured field, getFeaturedProjects(), updated SimpleProject type)
- src/components/ui/index.ts (exported BentoProjectCard)
- src/app/(site)/portfolio/page.tsx (use BentoPortfolioGrid instead of ProjectGrid)
- tests/portfolio-grid.spec.ts (updated tests for bento grid, 58 tests)
