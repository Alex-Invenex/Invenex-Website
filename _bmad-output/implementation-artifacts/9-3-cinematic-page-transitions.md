# Story 9.3: Cinematic Page Transitions

Status: done

## Story

As a **visitor**,
I want **cinematic transitions between pages**,
So that **navigation feels like a premium experience**.

## Acceptance Criteria

### AC1: Page Exit Transitions
**Given** I click a navigation link
**When** the page transition occurs
**Then**:
- Current page fades/slides out (300ms)
- Optional blur effect during transition
- Content exits smoothly before navigation

### AC2: Page Enter Transitions
**Given** a new page is loading
**When** the page transition completes
**Then**:
- New page fades/slides in (400ms)
- Total transition duration: 500-700ms
- No layout shift during transition

### AC3: Route Loading States
**Given** routes with data fetching
**When** they are loading
**Then** a branded loader appears with Invenex logo animation

### AC4: History Navigation Support
**Given** browser back/forward navigation
**When** I use history navigation
**Then** transitions work correctly without breaking

### AC5: Reduced Motion Support
**Given** reduced motion preference
**When** transitions occur
**Then** instant state changes without animation

## Tasks / Subtasks

- [x] Task 1: Create Page Transition Context (AC: 1, 2, 5)
  - [x] Create `src/components/transitions/page-transition-context.tsx`
  - [x] Implement transition state management (idle, exiting, entering)
  - [x] Add reduced motion detection
  - [x] Create usePageTransition hook

- [x] Task 2: Create Transition Overlay Component (AC: 1, 2)
  - [x] Create `src/components/transitions/transition-overlay.tsx`
  - [x] Implement fade/blur overlay effect
  - [x] Add exit animation (fade out + optional blur)
  - [x] Add enter animation (fade in)

- [x] Task 3: Create TransitionLink Component (AC: 1, 4)
  - [x] Create `src/components/transitions/transition-link.tsx`
  - [x] Wrap Next.js Link with transition trigger
  - [x] Handle click to start exit transition
  - [x] Navigate after exit animation completes

- [x] Task 4: Create Page Loader Component (AC: 3)
  - [x] Create `src/components/transitions/page-loader.tsx`
  - [x] Implement Invenex logo animation
  - [x] Add loading spinner or progress indicator
  - [x] Style with glassmorphism effect

- [x] Task 5: Integrate into Layout (AC: 1-5)
  - [x] Wrap layout with PageTransitionProvider
  - [x] Add TransitionOverlay to layout
  - [x] Update navigation links to use TransitionLink
  - [x] Ensure SSR compatibility

- [x] Task 6: Write Playwright Tests (AC: 1-5)
  - [x] Test page transition triggers on link click
  - [x] Test transition completes before navigation
  - [x] Test reduced motion skips animations
  - [x] Test back/forward navigation works
  - [x] Test loader appears on slow routes

## Dev Notes

### Architecture Compliance

Page transitions in Next.js App Router require careful handling:
- Use `useRouter` for programmatic navigation
- Transitions must complete before `router.push()`
- View Transitions API is an option but has limited support
- Custom solution with React context is more reliable

### Page Transition Context

```tsx
// src/components/transitions/page-transition-context.tsx
'use client'

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type TransitionState = 'idle' | 'exiting' | 'entering'

interface PageTransitionContextValue {
  state: TransitionState
  isTransitioning: boolean
  startTransition: (href: string) => void
  completeTransition: () => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

interface PageTransitionProviderProps {
  children: ReactNode
  exitDuration?: number
  enterDuration?: number
}

export function PageTransitionProvider({
  children,
  exitDuration = 300,
  enterDuration = 400,
}: PageTransitionProviderProps) {
  const [state, setState] = useState<TransitionState>('idle')
  const router = useRouter()
  const pendingHref = useRef<string | null>(null)

  const startTransition = useCallback((href: string) => {
    // Check reduced motion
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href)
      return
    }

    pendingHref.current = href
    setState('exiting')

    // Navigate after exit animation
    setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current)
        setState('entering')

        // Reset after enter animation
        setTimeout(() => {
          setState('idle')
          pendingHref.current = null
        }, enterDuration)
      }
    }, exitDuration)
  }, [router, exitDuration, enterDuration])

  const completeTransition = useCallback(() => {
    setState('idle')
  }, [])

  return (
    <PageTransitionContext.Provider
      value={{
        state,
        isTransitioning: state !== 'idle',
        startTransition,
        completeTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider')
  }
  return context
}
```

### Transition Overlay Component

```tsx
// src/components/transitions/transition-overlay.tsx
'use client'

import { usePageTransition } from './page-transition-context'
import { cn } from '@/lib/utils'

export function TransitionOverlay() {
  const { state, isTransitioning } = usePageTransition()

  if (!isTransitioning) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9998] pointer-events-none',
        'bg-background/80 backdrop-blur-sm',
        'transition-opacity duration-300',
        state === 'exiting' && 'opacity-100',
        state === 'entering' && 'opacity-0'
      )}
      aria-hidden="true"
    />
  )
}
```

### Transition Link Component

```tsx
// src/components/transitions/transition-link.tsx
'use client'

import Link from 'next/link'
import { usePageTransition } from './page-transition-context'
import { ComponentProps, MouseEvent } from 'react'

interface TransitionLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode
}

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const { startTransition, isTransitioning } = usePageTransition()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Don't transition for external links, same page anchors, or if already transitioning
    const isExternal = typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'))
    const isAnchor = typeof href === 'string' && href.startsWith('#')

    if (isExternal || isAnchor || isTransitioning) {
      onClick?.(e)
      return
    }

    e.preventDefault()
    onClick?.(e)
    startTransition(typeof href === 'string' ? href : href.pathname || '/')
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
```

### Page Loader Component

```tsx
// src/components/transitions/page-loader.tsx
'use client'

import { usePageTransition } from './page-transition-context'
import { cn } from '@/lib/utils'

export function PageLoader() {
  const { state } = usePageTransition()

  if (state !== 'entering') return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center',
        'bg-background'
      )}
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Invenex Logo Animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-accent animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
            I
          </span>
        </div>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  )
}
```

### Layout Integration

```tsx
// src/app/(site)/layout.tsx
import { PageTransitionProvider } from '@/components/transitions/page-transition-context'
import { TransitionOverlay } from '@/components/transitions/transition-overlay'

export default function SiteLayout({ children }) {
  return (
    <PageTransitionProvider>
      <TransitionOverlay />
      {/* ... rest of layout */}
    </PageTransitionProvider>
  )
}
```

### Navigation Link Updates

Replace standard `Link` components in Navbar with `TransitionLink`:

```tsx
// In navbar.tsx
import { TransitionLink } from '@/components/transitions/transition-link'

// Replace:
<Link href="/about">About</Link>

// With:
<TransitionLink href="/about">About</TransitionLink>
```

### Performance Considerations

1. **Overlay uses CSS transitions**: No JS-driven animations during transition
2. **Blur is GPU-accelerated**: `backdrop-blur` uses compositor
3. **Pointer-events: none**: Overlay doesn't block interaction until visible
4. **Short durations**: 300ms exit + 400ms enter = 700ms total

### Browser Compatibility

- **View Transitions API**: Chrome 111+, experimental in other browsers
- **Custom solution**: Works in all modern browsers
- **Fallback**: Instant navigation if reduced motion or JS disabled

### Accessibility

1. **aria-hidden**: Overlay hidden from screen readers
2. **Reduced motion**: Instant navigation, no animation
3. **Loading state**: aria-label on loader for screen readers
4. **Focus management**: Consider focus restoration after navigation

### Testing Checklist

- [x] Clicking navigation link triggers exit transition
- [x] Page navigates after exit animation completes (300ms exit + 400ms enter)
- [x] New page has enter animation
- [x] Total transition duration: 700ms total
- [x] Back/forward navigation works correctly
- [x] Reduced motion skips all animations (instant navigation)
- [x] External links bypass transition (target="_blank", http://, mailto:)
- [x] Same-page anchors bypass transition (href="#")
- [x] Loader appears during enter phase
- [x] No layout shift during transition (fixed overlay)
- [x] Works on mobile viewports
- [ ] No impact on Lighthouse performance - requires deployment verification

### Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Initial implementation | Claude Opus 4.5 |

### Previous Story Learnings

From Story 9-1 (Advanced Scroll Animation System):
- Use `requestAnimationFrame` for smooth animations
- Always check `prefers-reduced-motion`
- Clean up timeouts and listeners

From Story 9-2 (Custom Cursor System):
- Client components need `'use client'` directive
- Use `useRef` for values that shouldn't trigger re-renders
- Context pattern works well for global state

From Story 2-5 (Page Transitions):
- Framer Motion `AnimatePresence` can handle page transitions
- But manual control with timeouts gives more flexibility

### File Structure

```
src/
├── components/
│   └── transitions/
│       ├── page-transition-context.tsx
│       ├── transition-overlay.tsx
│       ├── transition-link.tsx
│       ├── page-loader.tsx
│       └── index.ts
```

### References

- [Source: epics.md#Story-9.3] - Acceptance criteria
- [Source: sprint-change-proposal-2026-01-30.md] - Design decisions
- [Source: 9-1-advanced-scroll-animation-system.md] - Animation patterns
- [Source: 9-2-custom-cursor-system.md] - Client component patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Story file created from epics.md since it was in backlog status
- No ESLint errors in new transition components

### Completion Notes List

- Created `src/components/transitions/` directory with full transition system
- **PageTransitionProvider**: Context provider managing transition state (idle/exiting/entering)
  - Tracks pending navigation href
  - Respects prefers-reduced-motion (instant navigation)
  - Configurable exit (300ms) and enter (400ms) durations
  - Proper timeout cleanup on unmount
- **TransitionOverlay**: Visual overlay during transitions
  - Fade + optional blur effect
  - CSS transitions (GPU accelerated)
  - aria-hidden for accessibility
- **TransitionLink**: Enhanced Next.js Link
  - Triggers exit transition on click
  - Bypasses for external links, anchors, new tabs
  - useTransitionNavigation hook for programmatic use
- **PageLoader**: Branded loading indicator
  - Animated Invenex logo spinner
  - Dual spinning rings (opposite directions)
  - Glassmorphism styling
  - ARIA progressbar role
- Integrated into site layout with provider, overlay, and loader
- Updated Navbar to use TransitionLink for all internal navigation
- Created comprehensive Playwright test suite (25 test cases)
- ESLint passes with 0 errors

### File List

- `src/components/transitions/page-transition-context.tsx` (new)
- `src/components/transitions/transition-overlay.tsx` (new - includes TransitionContent component)
- `src/components/transitions/transition-link.tsx` (new - includes useTransitionNavigation hook)
- `src/components/transitions/page-loader.tsx` (new - includes InlineLoader component)
- `src/components/transitions/index.ts` (new - barrel exports)
- `src/app/(site)/layout.tsx` (modified - added transition provider)
- `src/components/layout/navbar.tsx` (modified - use TransitionLink)
- `tests/page-transitions.spec.ts` (new)

### Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Initial implementation: Cinematic page transitions with exit/enter animations, branded loader, and Navbar integration | Claude Opus 4.5 |
| 2026-01-30 | Code Review: Fixed invalid `duration-400` class to `duration-[400ms]`, updated File List to include TransitionContent and InlineLoader | Claude Opus 4.5 |
| 2026-01-30 | Code Review Fix: Added clarifying comment in TransitionOverlay documenting intentional exit/enter duration asymmetry (300ms/400ms) | Claude Opus 4.5 |

