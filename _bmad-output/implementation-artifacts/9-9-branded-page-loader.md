# Story 9.9: Branded Page Loader

Status: done

## Story

As a **visitor**,
I want **a polished loading experience on first visit**,
So that **even loading feels premium and reinforces the Invenex brand**.

## Acceptance Criteria

### AC1: Initial Page Load Animation
**Given** initial page load (first visit or hard refresh)
**When** the site loads for the first time
**Then**:
- Centered Invenex logo appears immediately
- Logo animates in with fade + scale (or SVG draw effect)
- Minimum display time: 500ms for brand moment
- Loader dismisses with smooth fade after DOM content is ready
- Background matches site theme (bg-background #0A0A0A)

### AC2: Session-Based Skip Logic
**Given** repeat visits within the same browser session
**When** the site loads
**Then**:
- Loader is skipped (sessionStorage check)
- Page content shows immediately
- No flash of loader or delay

### AC3: Enhanced Skeleton Screens with Shimmer
**Given** async content areas are loading
**When** they display loading state
**Then**:
- Skeleton screens match approximate content shape
- Shimmer effect (gradient animation) instead of pulse
- Smooth transition when real content loads
- Accessible: `aria-busy="true"` on loading containers

### AC4: Accessibility & Reduced Motion
**Given** reduced motion preference is enabled
**When** the loader displays
**Then**:
- Logo appears immediately without animation
- Shimmer effect is replaced with static skeleton
- Minimum delay still applies for SSR hydration
- Screen reader announces loading/loaded states

### AC5: Performance Requirements
**Given** the loader is implemented
**When** measuring performance
**Then**:
- Loader renders before any heavy JS executes (blocking render pattern)
- Total blocking time added < 50ms
- No layout shift (CLS = 0) during loader dismiss
- Loader assets are inlined or preloaded (no network waterfall)

## Tasks / Subtasks

- [x] Task 1: Create Initial Page Loader Component (AC: 1, 4, 5)
  - [x] Create `src/components/transitions/initial-loader.tsx`
  - [x] Implement branded Invenex logo with animation
  - [x] Use CSS animations (no JS dependency for first paint)
  - [x] Add `data-initial-loader` attribute for testing
  - [x] Implement 500ms minimum display time
  - [x] Add fade-out dismissal animation
  - [x] Support reduced motion (instant display, no animation)

- [x] Task 2: Implement Session Skip Logic (AC: 2)
  - [x] Create `src/lib/loader-session.ts` utility
  - [x] Check sessionStorage for `invenex-visited` key on mount
  - [x] Set sessionStorage flag after initial load completes
  - [x] Handle SSR: skip sessionStorage check on server
  - [x] Ensure no hydration mismatch (render loader server-side, conditionally hide client-side)

- [x] Task 3: Create Shimmer Skeleton Components (AC: 3)
  - [x] Update `src/components/ui/skeleton.tsx`
  - [x] Add `shimmer` variant with gradient animation
  - [x] Create `@keyframes shimmer` in globals.css
  - [x] Update existing CardSkeleton, ProjectGridSkeleton to use shimmer
  - [x] Add `aria-busy="true"` and proper ARIA attributes

- [x] Task 4: Integrate Initial Loader into App (AC: 1, 2, 5)
  - [x] Update `src/app/(site)/layout.tsx` to include InitialLoader
  - [x] Position loader above all content (z-index: 99999)
  - [x] Ensure loader renders before hydration completes
  - [x] Test with Suspense boundaries if applicable

- [x] Task 5: Create loading.tsx Files for Key Routes (AC: 3)
  - [x] Create `src/app/(site)/loading.tsx` with shimmer skeletons
  - [x] Create `src/app/(site)/portfolio/loading.tsx` with ProjectGridSkeleton
  - [x] Create `src/app/(site)/careers/loading.tsx` with job listing skeletons
  - [x] Ensure consistent styling across all loading states

- [x] Task 6: Write Playwright Tests (AC: 1-5)
  - [x] Test initial loader appears on hard refresh (clear sessionStorage)
  - [x] Test loader skipped on subsequent navigation (same session)
  - [x] Test minimum 500ms display time
  - [x] Test fade-out animation occurs
  - [x] Test shimmer effect on skeletons
  - [x] Test reduced motion: no animation, static display
  - [x] Test mobile responsiveness
  - [x] Test accessibility: screen reader announcements

## Dev Notes

### Architecture Context

**Existing Components (from Story 9-3):**
- `PageLoader` in `src/components/transitions/page-loader.tsx` - Shows during page *transitions* (entering state), NOT on initial load
- `InlineLoader` - Small spinner for inline use
- `PageTransitionProvider` - Manages transition states (idle, exiting, entering)

**This story creates:**
- `InitialLoader` - First-visit branded loader (different from PageLoader)
- Enhanced `Skeleton` with shimmer effect
- `loading.tsx` files for Suspense-based loading states

### Implementation Strategy

**Initial Loader Architecture:**
```
1. Server renders InitialLoader visible (no sessionStorage check server-side)
2. Client hydrates, checks sessionStorage
3. If visited before: immediately hide loader (no animation)
4. If first visit: show logo animation, wait 500ms minimum, fade out
5. Set sessionStorage flag after content ready
```

**Hydration Safety:**
- Render loader on server (visible by default)
- Use `useSyncExternalStore` to check sessionStorage synchronously on client
- Server snapshot returns `false` (show loader), client snapshot checks actual sessionStorage
- This prevents hydration mismatch while ensuring loader shows immediately

### Logo Animation Options

**Option A: Scale + Fade (Recommended)**
```css
@keyframes logo-enter {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}
```

**Option B: SVG Draw Effect**
- Use `stroke-dasharray` and `stroke-dashoffset` for path animation
- More complex but very premium feel
- Requires Invenex logo as SVG with paths

### Shimmer Effect Implementation

Add to `globals.css`:
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-background-secondary) 0%,
    var(--color-background-tertiary) 50%,
    var(--color-background-secondary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

### File Structure

```
src/
├── components/
│   ├── transitions/
│   │   ├── initial-loader.tsx (new)
│   │   └── page-loader.tsx (existing - no changes)
│   └── ui/
│       └── skeleton.tsx (modified - add shimmer)
├── lib/
│   └── loader-session.ts (new)
├── app/
│   ├── globals.css (modified - add shimmer keyframes)
│   └── (site)/
│       ├── layout.tsx (modified - add InitialLoader)
│       ├── loading.tsx (new)
│       ├── portfolio/
│       │   └── loading.tsx (new)
│       └── careers/
│           └── loading.tsx (new)
tests/
└── branded-page-loader.spec.ts (new)
```

### Previous Story Learnings (from 9-8)

1. Use `useState` with lazy initialization for SSR-safe media query detection
2. GSAP imports should be dynamic for code splitting (if used)
3. All animations must check `prefers-reduced-motion`
4. Add comprehensive `data-testid` attributes for Playwright testing
5. Document actual implementation in Dev Notes, not hypothetical code

### Testing Strategy

**sessionStorage Testing:**
```typescript
// Clear sessionStorage to test first-visit behavior
await page.evaluate(() => sessionStorage.clear())
await page.reload()
// Expect loader to be visible

// Navigate away and back (same session)
await page.goto('/about')
await page.goto('/')
// Expect loader to be skipped
```

**Timing Tests:**
```typescript
// Measure loader display time
const loaderVisible = await page.locator('[data-initial-loader]').isVisible()
const startTime = Date.now()
await page.waitForSelector('[data-initial-loader]', { state: 'hidden' })
const elapsed = Date.now() - startTime
expect(elapsed).toBeGreaterThanOrEqual(500)
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 9.9: Branded Page Loader]
- [Source: _bmad-output/planning-artifacts/architecture.md#Animation Loading Strategy]
- [Source: src/components/transitions/page-loader.tsx - existing PageLoader for reference]
- [Source: src/components/ui/skeleton.tsx - existing skeleton base]
- [Source: 9-8-section-transition-effects.md - previous story patterns]

## Testing Checklist

- [x] Initial loader appears on hard refresh (sessionStorage cleared)
- [x] Loader shows Invenex branding (logo/"I" + company name)
- [x] Logo animation plays (scale + fade or draw effect)
- [x] Minimum 500ms display time enforced
- [x] Loader fades out smoothly after content ready
- [x] Loader skipped on same-session return visits
- [x] sessionStorage flag set correctly
- [x] Shimmer effect visible on skeleton components
- [x] Skeletons match content shape appropriately
- [x] Reduced motion: no animations, static display
- [x] Reduced motion: loader still shows briefly (hydration time)
- [x] No hydration mismatch errors in console
- [x] No layout shift (CLS) during loader dismiss
- [x] Mobile: loader centered and appropriately sized
- [x] Accessibility: aria-busy, screen reader announcements
- [x] ESLint passes with 0 errors
- [ ] Lighthouse Performance score maintained >90 (requires deployment verification)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation completed without blockers.

### Completion Notes List

1. **InitialLoader Component** - Created `src/components/transitions/initial-loader.tsx` with:
   - Branded Invenex logo ("I") with spinning border rings
   - Scale + fade entrance animation (`animate-loader-enter`)
   - 500ms minimum display time via setTimeout
   - Smooth fade-out animation (`animate-fade-out`)
   - Uses `useSyncExternalStore` for SSR-safe sessionStorage check
   - All animations disabled with `prefers-reduced-motion: reduce`
   - z-index: 99999 to ensure loader is always on top
   - Full ARIA support (role="progressbar", aria-busy, aria-label)

2. **Session Skip Logic** - Created `src/lib/loader-session.ts` with:
   - `hasVisitedBefore()` - checks sessionStorage for `invenex-visited` key
   - `markVisited()` - sets sessionStorage flag after loader completes
   - SSR-safe: returns false on server, no-ops for set operations

3. **Shimmer Skeleton Enhancement** - Updated `src/components/ui/skeleton.tsx`:
   - Added `variant` prop with "pulse" (default) and "shimmer" options
   - Shimmer uses gradient animation for premium feel
   - All skeleton components (CardSkeleton, ProjectGridSkeleton, ImageSkeleton) support shimmer
   - Added new JobListingSkeleton and JobGridSkeleton for careers page
   - All skeletons include aria-busy="true" and aria-label

4. **CSS Animations** - Added to `src/app/globals.css`:
   - `@keyframes loader-enter` - scale + fade in
   - `@keyframes fade-out` - fade out for dismissal
   - `@keyframes fade-in-delayed` - delayed fade for brand text
   - `@keyframes logo-pulse` - subtle logo pulse
   - `@keyframes spin-slow` - slow spin for outer ring
   - `@keyframes skeleton-shimmer` - gradient sweep
   - All animations disabled in `@media (prefers-reduced-motion: reduce)`

5. **Loading.tsx Files** - Created Suspense loading states:
   - `src/app/(site)/loading.tsx` - Hero + content grid skeletons
   - `src/app/(site)/portfolio/loading.tsx` - Filter tabs + project grid
   - `src/app/(site)/careers/loading.tsx` - Hero + benefits + job listings

6. **Playwright Tests** - Created `tests/branded-page-loader.spec.ts`:
   - 19 test cases covering all ACs
   - Tests for initial loader visibility, branding, timing
   - Session skip logic tests
   - Shimmer effect CSS verification
   - Reduced motion accessibility tests
   - Mobile responsiveness tests
   - Performance tests (z-index, position: fixed)

### File List

**New Files:**
- src/components/transitions/initial-loader.tsx
- src/lib/loader-session.ts
- src/app/(site)/loading.tsx
- src/app/(site)/portfolio/loading.tsx
- src/app/(site)/careers/loading.tsx
- tests/branded-page-loader.spec.ts

**Modified Files:**
- src/components/ui/skeleton.tsx (add shimmer variant, new skeleton types)
- src/app/globals.css (add loader + shimmer keyframes and utilities)
- src/app/(site)/layout.tsx (integrate InitialLoader)
- src/components/transitions/index.ts (export InitialLoader)

## Senior Developer Review (AI)

**Review Date:** 2026-01-30
**Outcome:** Changes Requested → **APPROVED** (all fixed)
**Total Issues:** 2 HIGH, 3 MEDIUM, 3 LOW

### Action Items

- [x] [HIGH] AC4 shimmer fallback - Shimmer gradient not replaced with static in reduced motion → Added solid background fallback in globals.css
- [x] [HIGH] Flaky timing test - Test measured from page.reload() not loader visibility → Fixed timing measurement
- [x] [MEDIUM] Dev Notes stale - Claimed useEffect but uses useSyncExternalStore → Updated documentation
- [x] [MEDIUM] Missing shimmer fallback test - No test for AC4 static skeleton → Added test
- [x] [MEDIUM] clearVisited() untested - Utility exported but not tested → Added test coverage
- [ ] [LOW] Skeleton base aria-hidden - Minor, compound components have correct ARIA
- [ ] [LOW] borderImage may not render as circle - Visual edge case, acceptable
- [ ] [LOW] useRef could be simplified - Works correctly, not actionable

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Story created with comprehensive developer context | Claude Opus 4.5 |
| 2026-01-30 | Implementation complete - all tasks finished | Claude Opus 4.5 |
| 2026-01-30 | Code review: 5 issues fixed (2 HIGH, 3 MEDIUM) | Claude Opus 4.5 |
