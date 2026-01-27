# Story 4.2: Portfolio Filtering

Status: done

## Story

As a **potential client**,
I want **to filter projects by category**,
So that **I can find relevant examples for my project type**.

## Acceptance Criteria

### AC1: Filter Functionality
**Given** I am on the Portfolio page
**When** I click a filter tab (e.g., "Mobile")
**Then**:
- The tab becomes active (highlighted)
- Projects filter to show only that category
- Animation shows cards fading out/in
- URL updates with query param (?category=mobile)

### AC2: All Filter
**Given** I click "All" filter
**When** the filter applies
**Then** all projects are displayed

### AC3: URL State
**Given** I share a filtered URL
**When** someone opens the link
**Then** the correct filter is pre-applied

## Tasks / Subtasks

- [x] Task 1: Implement Filter Tabs (AC: 1, 2)
  - [x] Add filter tabs inline in project-grid.tsx (no separate component)
  - [x] Handle active state via URL params with aria-pressed
  - [x] Update URL params on filter change with router.push

- [x] Task 2: Integrate with Project Grid (AC: 1, 3)
  - [x] Read filter from URL using useSearchParams
  - [x] Filter projects client-side
  - [x] Animate transitions with Framer Motion

## Dev Notes

### Implementation Approach

Filter functionality was integrated directly into `project-grid.tsx` rather than creating a separate component, for better cohesion and simpler state management.

**Key Implementation Details:**
- Filter tabs rendered inline within ProjectGrid component
- `useSearchParams()` reads current filter from URL
- `useRouter()` updates URL on filter change with `scroll: false`
- `Suspense` wrapper handles SSR hydration for useSearchParams
- AnimatePresence provides smooth fade transitions between filter states
- aria-pressed attribute indicates active filter for accessibility

```tsx
// src/components/sections/project-grid.tsx (excerpt)
const handleFilterChange = (category: string) => {
  const params = new URLSearchParams(searchParams.toString());
  if (category === "all") {
    params.delete("category");
  } else {
    params.set("category", category);
  }
  router.push(queryString ? `/portfolio?${queryString}` : "/portfolio", {
    scroll: false,
  });
};
```

### Testing Checklist

- [x] Filter tabs highlight when active
- [x] Projects filter correctly
- [x] URL updates with category param
- [x] Direct URL with param works
- [x] Fade animation on filter change

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Implementation Plan
- Updated project-grid.tsx to use useSearchParams for URL state
- Added useRouter for programmatic navigation with scroll: false
- Wrapped component with Suspense for SSR compatibility
- Filter changes update URL params (?category=mobile, etc.)
- "All" filter removes category param from URL
- Direct URL navigation pre-applies the correct filter

### Completion Notes List
- AC1: Filter tabs highlight active state, projects filter correctly, URL updates with category param
- AC2: "All" filter shows all projects and clears URL param
- AC3: Direct URL with category param pre-applies filter correctly
- 7 new Playwright tests added for Story 4-2
- Total 19 portfolio tests passing (12 Story 4-1 + 7 Story 4-2)
- 97 tests in full regression suite passing

### File List
- src/components/sections/project-grid.tsx (modified - added filter tabs, URL state, Suspense wrapper)
- src/lib/projects.ts (shared - project data with category field)
- tests/portfolio.spec.ts (modified - added Story 4-2 tests)
- tests/portfolio-filtering.spec.ts (created - Story 4-2 comprehensive filter tests)

### Change Log
- 2026-01-24: Story implemented - Portfolio filtering with URL state persistence
- 2026-01-24: Code review complete - Fixed File List (removed non-existent filter-tabs.tsx), updated Dev Notes to match actual implementation (filters integrated in project-grid.tsx). Fixed test hardcoding issues. All 7 tests passing. Status → done.
- 2026-01-27: Code review (adversarial) - Added portfolio-empty-state data-testid to project-grid.tsx, updated File List with portfolio-filtering.spec.ts.
