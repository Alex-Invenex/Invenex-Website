# Story 9.5: Enhanced Micro-interactions

Status: done

## Story

As a **visitor**,
I want **polished micro-interactions on interactive elements**,
So that **the site feels responsive and tactile**.

## Acceptance Criteria

### AC1: Button Ripple Effect
**Given** I click a button
**When** the click occurs
**Then** a ripple effect expands from the click point

### AC2: Form Input Focus Enhancement
**Given** I focus on a form input
**When** focus is applied
**Then**:
- Border glows with accent color
- Subtle scale (1.01) applied
- Smooth transition (200ms)

### AC3: Card Hover Enhancement
**Given** I hover over a card
**When** hover is active
**Then**:
- Card lifts 8px (translateY)
- Shadow increases to shadow-2xl
- Smooth transition with ease-out-expo

### AC4: Toast Notifications
**Given** toast notifications appear
**When** they render
**Then** they slide in from bottom-right with fade

## Tasks / Subtasks

- [x] Task 1: Create Ripple Effect Component (AC: 1)
  - [x] Create `src/components/ui/ripple.tsx`
  - [x] Implement click position detection
  - [x] Animate ripple expansion from click point
  - [x] Auto-cleanup after animation

- [x] Task 2: Create RippleButton Component (AC: 1)
  - [x] Wrap existing Button with ripple functionality
  - [x] Preserve all existing button variants
  - [x] Ensure ripple respects reduced motion

- [x] Task 3: Enhance Input Focus States (AC: 2)
  - [x] Update `src/components/ui/input.tsx` with enhanced focus
  - [x] Add accent glow on focus
  - [x] Add scale(1.01) on focus
  - [x] Ensure 200ms transition

- [x] Task 4: Enhance Card Hover States (AC: 3)
  - [x] Update Card component with "lift" variant
  - [x] Add translateY(-8px) on hover
  - [x] Add shadow-2xl on hover
  - [x] Use ease-out-expo timing function

- [x] Task 5: Create Toast Notification System (AC: 4)
  - [x] Create `src/components/ui/toast.tsx`
  - [x] Create toast context/provider
  - [x] Implement slide-in from bottom-right
  - [x] Add success/error/warning/info variants
  - [x] Auto-dismiss after configurable duration

- [x] Task 6: Write Playwright Tests (AC: 1-4)
  - [x] Test ripple appears on button click
  - [x] Test input focus enhancement
  - [x] Test card hover lift
  - [x] Test toast slide-in animation

## Dev Notes

### Ripple Effect Implementation

CSS-based ripple with JS click position:
```tsx
// Track click position relative to button
const handleClick = (e: MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  // Create ripple at (x, y)
}
```

### Ease-Out-Expo Timing

Custom cubic-bezier for natural deceleration:
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

### Toast Animation

Slide in from bottom-right with staggered exit:
```css
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Reduced Motion

All animations must check `prefers-reduced-motion`:
- Ripple: instant highlight instead of expand
- Scale: skip transform
- Lift: skip translateY
- Toast: instant show/hide

### File Structure

```
src/
├── components/
│   └── ui/
│       ├── ripple.tsx (new)
│       ├── ripple-button.tsx (new)
│       ├── toast.tsx (new)
│       ├── input.tsx (modified)
│       └── card.tsx (modified)
├── app/
│   └── globals.css (add keyframes)
```

### References

- [Source: epics.md#Story-9.5] - Acceptance criteria
- Material Design ripple effect
- Framer Motion toast patterns

## Testing Checklist

- [x] Ripple keyframe animation defined (@keyframes ripple)
- [x] animate-ripple utility class works
- [x] RippleButton component renders with ripple on click
- [x] Input enhanced focus: scale(1.01), accent glow, 200ms transition
- [x] Card "lift" variant: translateY(-8px), shadow-2xl on hover
- [x] Toast animations: toast-enter, toast-exit keyframes
- [x] animate-toast-enter slides in from right
- [x] Toast has success/error/warning/info variants with icons
- [x] Reduced motion: animations disabled via CSS media query
- [x] ESLint passes with 0 errors

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Initial implementation: Ripple, toast, input focus, card lift | Claude Opus 4.5 |
| 2026-01-30 | Code Review: Integrated ToastProvider into layout.tsx, updated File List | Claude Opus 4.5 |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- ESLint: 0 errors, 7 pre-existing warnings (unrelated)
- Initial toast.tsx had setState-in-effect errors, fixed by using CSS media query for reduced motion

### Completion Notes List

**Ripple Effect (AC1)**:
- Created `ripple.tsx` with Ripple component and useRipple hook
- Click position detection using getBoundingClientRect
- Dynamic size calculation to cover entire button from click point
- Auto-cleanup via setTimeout after animation duration
- Reduced motion: skips ripple animation

**RippleButton Component (AC1)**:
- Created `ripple-button.tsx` wrapping existing Button
- Preserves all button variants (primary, secondary, ghost, link, coral)
- Relative overflow-hidden for ripple containment
- z-10 on children to keep content above ripple

**Input Focus Enhancement (AC2)**:
- Added `enhanced` prop to Input component
- Enhanced focus styles:
  - scale(1.01) transform
  - Accent glow: `0 0 0 3px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.1)`
  - 200ms transition duration
- motion-reduce:focus:scale-100 for accessibility

**Card Hover Enhancement (AC3)**:
- Added "lift" variant to Card component
- Hover styles:
  - translateY(-8px) lift
  - shadow-2xl equivalent: `0 25px 50px -12px rgba(0,0,0,0.5)`
  - Uses --ease-out (cubic-bezier(0.16, 1, 0.3, 1))
- motion-reduce:hover:translate-y-0 for accessibility

**Toast Notification System (AC4)**:
- Created `toast.tsx` with ToastProvider context
- ToastContainer for stacked toast display
- ToastItem with slide-in animation from right
- Variants: success (green), error (red), warning (yellow), info (blue)
- Icons from lucide-react: CheckCircle, XCircle, AlertCircle, Info
- Auto-dismiss after configurable duration (default 4s)
- Max 5 toasts displayed simultaneously
- StandaloneToast for non-context usage
- useToast hook with success/error/warning/info shortcuts

**CSS Animations Added (globals.css)**:
- @keyframes ripple (scale 0→1, opacity 1→0)
- @keyframes toast-enter (translateX 100%→0, opacity 0→1)
- @keyframes toast-exit (reverse of enter)
- @keyframes fade-in
- Utility classes: animate-ripple, animate-toast-enter, animate-toast-exit, animate-fade-in
- card-lift, input-enhanced utility classes
- @media (prefers-reduced-motion: reduce) - disables all animations

**Playwright Tests**: 20 test cases covering all acceptance criteria

### File List

- `src/components/ui/ripple.tsx` (new)
- `src/components/ui/ripple-button.tsx` (new)
- `src/components/ui/toast.tsx` (new - ToastProvider, useToast, StandaloneToast)
- `src/components/ui/input.tsx` (modified - added enhanced prop)
- `src/components/ui/card.tsx` (modified - added lift variant)
- `src/components/ui/index.ts` (modified - added exports)
- `src/app/globals.css` (modified - added keyframes and utilities, uses existing semantic color tokens)
- `src/app/(site)/layout.tsx` (modified - added ToastProvider wrapper) [Code Review Fix]
- `tests/micro-interactions.spec.ts` (new - 20 test cases)
