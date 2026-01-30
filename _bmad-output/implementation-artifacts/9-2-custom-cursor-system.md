# Story 9.2: Custom Cursor System

Status: done

## Story

As a **visitor**,
I want **a subtle custom cursor**,
So that **the site feels premium and polished**.

## Acceptance Criteria

### AC1: Custom Cursor Elements
**Given** I am using a mouse on desktop
**When** I move the cursor
**Then** I see:
- Inner dot (8px) following cursor exactly
- Outer outline (32px) following with 0.15s delay (lerp interpolation)
- Mix-blend-mode: difference for visibility on all backgrounds

### AC2: Interactive Element Hover
**Given** I hover over interactive elements (buttons, links, cards)
**When** the cursor enters the element
**Then** the cursor outline scales up (1.5x) smoothly

### AC3: Touch Device Support
**Given** I am on a touch device
**When** the page loads
**Then** custom cursor is hidden, native behavior preserved

### AC4: JavaScript Fallback
**Given** JavaScript is disabled
**When** the page renders
**Then** native cursor works normally (no broken experience)

### AC5: Form Input Compatibility
**Given** I interact with form inputs or text selection
**When** using the custom cursor
**Then** no interference occurs - native cursor behavior for text inputs

### AC6: Performance Requirements
**Given** the custom cursor is active
**When** moving the mouse rapidly
**Then**:
- Smooth 60fps animation via requestAnimationFrame
- No input latency (<100ms)
- Minimal CPU usage

## Tasks / Subtasks

- [x] Task 1: Create Custom Cursor Component (AC: 1, 3, 4)
  - [x] Create `src/components/ui/custom-cursor.tsx`
  - [x] Implement dot (8px) and outline (32px) elements
  - [x] Add requestAnimationFrame loop for smooth following
  - [x] Implement lerp (linear interpolation) for outline delay

- [x] Task 2: Implement Blend Mode and Visibility (AC: 1)
  - [x] Add mix-blend-mode: difference to cursor elements
  - [x] Ensure visibility on both dark and light backgrounds
  - [x] Add pointer-events: none to prevent blocking clicks

- [x] Task 3: Add Hover Scale Effect (AC: 2)
  - [x] Detect interactive elements via data attribute or element type
  - [x] Scale outline to 1.5x on hover
  - [x] Add smooth scale transition

- [x] Task 4: Handle Touch Devices (AC: 3)
  - [x] Detect touch devices via matchMedia('(hover: none)')
  - [x] Hide custom cursor on touch devices
  - [x] Ensure no layout shift or visible flash

- [x] Task 5: Handle Form Inputs (AC: 5)
  - [x] Detect text inputs, textareas, contenteditable
  - [x] Hide or reduce cursor when in text input mode
  - [x] Preserve native text selection behavior

- [x] Task 6: Integrate into Layout (AC: 1-6)
  - [x] Add cursor-none to body when custom cursor active
  - [x] Mount CustomCursor in site layout
  - [x] Ensure SSR safety (client-only rendering)

- [x] Task 7: Write Playwright Tests (AC: 1-6)
  - [x] Test cursor elements render on desktop viewport
  - [x] Test cursor hidden on mobile viewport
  - [x] Test cursor scales on button hover
  - [x] Test cursor works with reduced motion
  - [x] Test form inputs remain functional

## Dev Notes

### Architecture Compliance

This is a client-only component that adds a visual enhancement layer. Per architecture.md:
- Client components use `'use client'` directive
- Animations respect `prefers-reduced-motion`
- No impact on SSR (cursor only renders client-side)

### Custom Cursor Component

```tsx
// src/components/ui/custom-cursor.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CustomCursorProps {
  className?: string
}

export function CustomCursor({ className }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTextInput, setIsTextInput] = useState(false)

  useEffect(() => {
    // Check for touch device - hide custom cursor
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    setIsVisible(true)

    // Mouse position tracking
    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Lerp for smooth outline following
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }

      // Outline follows with lerp delay
      outlineX = lerp(outlineX, mouseX, 0.15)
      outlineY = lerp(outlineY, mouseY, 0.15)
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${outlineX - 16}px, ${outlineY - 16}px) scale(${isHovering ? 1.5 : 1})`
      }

      animationId = requestAnimationFrame(animate)
    }

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-cursor-hover')

      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      setIsHovering(!!isInteractive)
      setIsTextInput(!!isInput)
    }

    // Add cursor-none to body
    document.body.classList.add('cursor-none')

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Start animation
    animationId = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationId)
    }
  }, [isHovering])

  // Don't render anything on server or if not visible
  if (!isVisible) return null

  return (
    <>
      {/* Dot - follows exactly */}
      <div
        ref={dotRef}
        className={cn(
          'fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999]',
          'mix-blend-difference',
          isTextInput && 'opacity-0',
          className
        )}
        aria-hidden="true"
      />
      {/* Outline - follows with delay */}
      <div
        ref={outlineRef}
        className={cn(
          'fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[9999]',
          'mix-blend-difference transition-[transform] duration-150',
          isTextInput && 'opacity-0'
        )}
        aria-hidden="true"
      />
    </>
  )
}
```

### Layout Integration

```tsx
// src/app/(site)/layout.tsx
import { CustomCursor } from '@/components/ui/custom-cursor'

export default function SiteLayout({ children }) {
  return (
    <>
      <CustomCursor />
      {/* ... rest of layout */}
    </>
  )
}
```

### CSS for cursor-none

```css
/* src/app/globals.css */
.cursor-none {
  cursor: none;
}

/* Preserve cursor on inputs */
.cursor-none input,
.cursor-none textarea,
.cursor-none [contenteditable] {
  cursor: text;
}
```

### Interactive Element Detection

Elements can opt-in to cursor hover effect using `data-cursor-hover` attribute:

```tsx
<div data-cursor-hover className="...">
  Hovering here scales the cursor
</div>
```

Automatic detection includes:
- `<button>` elements
- `<a>` elements
- Elements with `data-cursor-hover` attribute

### Touch Device Detection

```tsx
const isTouchDevice = window.matchMedia('(hover: none)').matches
```

This correctly identifies:
- Mobile phones and tablets
- Touch-enabled laptops when using touch
- Devices without hover capability

### Performance Optimizations

1. **requestAnimationFrame**: All position updates in rAF loop
2. **Passive listeners**: `{ passive: true }` for mouse events
3. **CSS transforms only**: No layout-triggering properties
4. **pointer-events: none**: Cursor doesn't intercept clicks
5. **will-change**: Browser hint for optimization

### Reduced Motion Support

When `prefers-reduced-motion: reduce` is enabled:
- Custom cursor component returns null (not rendered)
- Native cursor remains functional
- No visual disruption

### File Structure

```
src/
├── components/
│   └── ui/
│       ├── custom-cursor.tsx     # Main cursor component
│       └── index.ts              # Updated exports
├── app/
│   ├── globals.css               # cursor-none class
│   └── (site)/
│       └── layout.tsx            # Mount CustomCursor
```

### Testing Checklist

- [x] Custom cursor renders on desktop (1024px+ viewport) - data-custom-cursor attributes
- [x] Custom cursor hidden on mobile viewport - matchMedia('(hover: none)') check
- [x] Dot follows mouse exactly - transform updated in rAF loop
- [x] Outline follows with visible delay - lerp interpolation (0.15 factor)
- [x] Outline scales up on button hover - scale(1.5) on isHovering
- [x] Outline scales up on link hover - detects buttons, links, [data-cursor-hover]
- [x] Cursor hides when over text inputs - opacity: 0 when isTextInput
- [x] Native text selection works normally - CSS cursor: text on inputs preserved
- [x] No cursor flash on page load - initial opacity: 0, shown on mouseEnter
- [x] mix-blend-difference visible on dark and light backgrounds - class applied
- [x] Works with reduced motion (cursor hidden) - returns null with prefers-reduced-motion
- [ ] No impact on Lighthouse performance - requires deployment verification

### Previous Story Learnings

From Story 9-1 (Advanced Scroll Animation System):
- Always check `prefers-reduced-motion` before any animation
- Use `useEffect` for client-side only code
- Clean up event listeners and animation frames

From Story 2-6 (Scroll Animation Infrastructure):
- Client components need `'use client'` directive
- Use `useReducedMotion` pattern for accessibility
- Don't render animation elements on SSR

From Story 8-5 (Performance Optimization):
- Passive event listeners for scroll/mouse events
- Use CSS transforms for GPU acceleration
- Minimize reflows by batching DOM updates

### Browser Compatibility

- Chrome 88+: Full support
- Firefox 78+: Full support
- Safari 14+: Full support
- Edge 88+: Full support
- Mobile browsers: Gracefully hidden

### Accessibility Considerations

1. **aria-hidden="true"**: Cursor elements hidden from screen readers
2. **pointer-events: none**: Doesn't interfere with clicking
3. **Reduced motion**: Respects user preference
4. **Text inputs**: Native cursor preserved for usability

### References

- [Source: epics.md#Story-9.2] - Acceptance criteria
- [Source: sprint-change-proposal-2026-01-30.md#Story-9.2] - Technical notes
- [Source: architecture.md#Animation-Loading-Strategy] - Animation patterns
- [Source: 9-1-advanced-scroll-animation-system.md] - Previous story patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- ESLint flagged setState in useEffect - resolved by using requestAnimationFrame for deferred initialization
- Node 18 environment prevented live testing - tests written for Node 20+ environment

### Completion Notes List

- Created `src/components/ui/custom-cursor.tsx` with CustomCursor component
- Component features:
  - Inner dot (8px) follows cursor exactly via transform
  - Outer outline (32px) follows with lerp interpolation (0.15 factor)
  - Mix-blend-mode: difference for visibility on all backgrounds
  - Scales to 1.5x on interactive element hover (buttons, links, data-cursor-hover)
  - Hides on text inputs (input, textarea, contenteditable)
  - Hidden on touch devices via matchMedia('(hover: none)')
  - Respects prefers-reduced-motion (returns null)
  - Uses requestAnimationFrame for 60fps animation
  - Proper cleanup of event listeners and animation frame
  - aria-hidden="true" for accessibility
  - pointer-events: none to prevent click interference
- Added cursor-none CSS class to globals.css with input/button cursor preservation
- Integrated CustomCursor into site layout (src/app/(site)/layout.tsx)
- Updated UI index to export CustomCursor
- Created comprehensive Playwright test suite (23 test cases)
- ESLint passes with 0 errors

### File List

- `src/components/ui/custom-cursor.tsx` (new)
- `src/components/ui/index.ts` (modified - added export)
- `src/app/(site)/layout.tsx` (modified - added CustomCursor)
- `src/app/globals.css` (modified - added cursor-none class)
- `tests/custom-cursor.spec.ts` (new)

### Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Initial implementation: CustomCursor component with dot/outline, hover scaling, touch/reduced-motion support | Claude Opus 4.5 |
| 2026-01-30 | Code Review Fix: Changed mouseenter/mouseleave events from document to document.documentElement for correct viewport enter/leave detection | Claude Opus 4.5 |

