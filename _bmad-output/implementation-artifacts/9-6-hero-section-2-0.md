# Story 9.6: Hero Section 2.0

Status: done

## Story

As a **visitor**,
I want **an impressive, interactive hero section**,
So that **I'm immediately engaged when landing on the homepage**.

## Acceptance Criteria

### AC1: Mouse Parallax Effect
**Given** I view the homepage hero
**When** I move my mouse
**Then**:
- Floating orbs respond to mouse position (parallax depth)
- Background gradient subtly follows cursor
- Depth multipliers range from 0.02-0.05

### AC2: Entry Animation Sequence
**Given** the hero loads
**When** the animation sequence plays
**Then**:
- Headline text animates with character split (staggered)
- Subtext fades up after headline completes
- CTA buttons scale in with bounce easing

### AC3: Scroll-Linked Fade
**Given** I scroll past the hero
**When** scroll position increases
**Then** hero elements fade and scale down

### AC4: Mobile Optimization
**Given** I am on mobile
**When** the hero renders
**Then** simplified animation (no mouse tracking)

### AC5: Accessibility
**Given** reduced motion preference is enabled
**When** animations would trigger
**Then** they are disabled or simplified

## Tasks / Subtasks

- [x] Task 1: Create Mouse Parallax Hook (AC: 1)
  - [x] Create `src/hooks/use-mouse-parallax.ts`
  - [x] Track mouse position relative to viewport center
  - [x] Calculate offset values with configurable depth multiplier
  - [x] Lerp smoothing for fluid movement (0.1 factor)
  - [x] Disable on touch devices and reduced motion
  - [x] Clean up event listeners on unmount

- [x] Task 2: Create Animated Text Component (AC: 2)
  - [x] Create `src/components/ui/animated-text.tsx`
  - [x] Character split animation using GSAP SplitText pattern
  - [x] Staggered entrance (0.02-0.03s per character)
  - [x] Support word-level splitting option
  - [x] Export as reusable component

- [x] Task 3: Upgrade Hero Component (AC: 1, 2, 3, 4)
  - [x] Create `src/components/sections/hero-v2.tsx` (new file)
  - [x] Integrate mouse parallax for floating orbs (3+ layers)
  - [x] Add cursor-following gradient effect
  - [x] Implement animated headline with character split
  - [x] Staggered subtext entrance after headline
  - [x] CTA buttons scale-in with spring/bounce easing
  - [x] Integrate useHeroScrollFade for scroll-linked fade

- [x] Task 4: Mobile-Specific Optimizations (AC: 4)
  - [x] Detect touch device using `@media (hover: none)`
  - [x] Disable mouse parallax on mobile
  - [x] Simpler floating orb animations (CSS only)
  - [x] Reduced animation complexity for performance

- [x] Task 5: Accessibility & Reduced Motion (AC: 5)
  - [x] Wrap all animations in prefersReducedMotion check
  - [x] Instant display without animation for reduced motion
  - [x] Maintain all content visibility
  - [x] Test with prefers-reduced-motion media query

- [x] Task 6: Update Homepage to Use Hero V2 (AC: 1-5)
  - [x] Update `src/app/(site)/page.tsx` to import Hero from hero-v2
  - [x] Verify all existing functionality preserved
  - [x] Remove old hero.tsx import

- [x] Task 7: Write Playwright Tests (AC: 1-5)
  - [x] Test hero renders correctly
  - [x] Test floating orbs have transform styles applied
  - [x] Test headline animation triggers on load
  - [x] Test scroll fade behavior
  - [x] Test mobile viewport behavior
  - [x] Test reduced motion disables animations

## Dev Notes

### Existing Hero Analysis

Current hero (`src/components/sections/hero.tsx`):
- Uses Framer Motion for floating elements (animate prop)
- Has 3 floating orbs with CSS blur/gradients
- Uses AnimatedSection wrapper for scroll reveals
- Has stats section with staggered entrance
- Already has scroll indicator at bottom
- Already has `aria-labelledby` and `data-testid`

**What to Preserve:**
- Overall structure and content
- Stats section and values
- Badge with Sparkles icon
- Gradient orb styling
- Grid pattern overlay
- Bottom fade gradient
- Scroll indicator

**What to Enhance:**
- Floating orbs: Add mouse parallax response
- Background gradient: Follow cursor position
- Headline: Character split animation
- Subtext: Delayed fade-up after headline
- CTAs: Spring/bounce entrance
- Scroll behavior: Use useHeroScrollFade hook

### Mouse Parallax Implementation

Create hook that tracks mouse and calculates offsets:

```typescript
// src/hooks/use-mouse-parallax.ts
interface MouseParallaxOptions {
  depth?: number    // 0.02-0.05 range
  lerp?: number     // Smoothing factor (0.1 default)
  disabled?: boolean
}

function useMouseParallax(options: MouseParallaxOptions) {
  // Track mouse position
  // Calculate offset from center
  // Apply lerp for smooth following
  // Return { x, y } offset values
}
```

**Usage in Hero:**
```tsx
const layer1 = useMouseParallax({ depth: 0.02 }) // Subtle
const layer2 = useMouseParallax({ depth: 0.035 }) // Medium
const layer3 = useMouseParallax({ depth: 0.05 }) // Strong

<div style={{ transform: `translate(${layer1.x}px, ${layer1.y}px)` }}>
  {/* Orb 1 */}
</div>
```

### Animated Text (Character Split)

Pattern for GSAP text animation:

```typescript
// Using GSAP without SplitText plugin (manual split)
const chars = text.split('').map((char, i) => (
  <span key={i} className="inline-block opacity-0 translate-y-8">
    {char === ' ' ? '\u00A0' : char}
  </span>
))

// Animate with GSAP
gsap.to(charRefs, {
  opacity: 1,
  y: 0,
  stagger: 0.025,
  duration: 0.5,
  ease: 'power2.out'
})
```

### Scroll-Linked Fade

The `useHeroScrollFade` hook from Story 9-1 is already implemented:

```typescript
import { useHeroScrollFade } from '@/hooks/use-hero-scroll-fade'

function HeroV2() {
  const heroRef = useHeroScrollFade<HTMLElement>({
    fadeEnd: 0.7,      // Start fading at 70% scroll
    minOpacity: 0,     // Fade to invisible
    minScale: 0.95,    // Slight scale down
  })

  return <section ref={heroRef}>...</section>
}
```

### Mobile Detection

Use CSS media query and React state:

```typescript
const [isTouchDevice, setIsTouchDevice] = useState(false)

useEffect(() => {
  setIsTouchDevice(window.matchMedia('(hover: none)').matches)
}, [])

// Skip mouse parallax on touch devices
if (!isTouchDevice) {
  // Enable parallax
}
```

### File Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── hero.tsx (existing - keep as backup)
│   │   └── hero-v2.tsx (new)
│   └── ui/
│       └── animated-text.tsx (new)
├── hooks/
│   ├── use-hero-scroll-fade.ts (existing from 9-1)
│   └── use-mouse-parallax.ts (new)
└── app/
    └── (site)/
        └── page.tsx (modified - import hero-v2)
```

### GSAP Integration

Project already has GSAP configured in `src/lib/gsap.ts`:
- `gsap` and `useGSAP` exported
- `registerScrollTrigger()` async function
- `prefersReducedMotion()` helper

Use the existing setup:
```typescript
import { gsap, prefersReducedMotion } from '@/lib/gsap'
```

### Animation Timing

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| Badge | 0ms | 500ms | power2.out |
| Headline chars | 200ms + 25ms stagger | 400ms each | power2.out |
| Subtext | After headline (600ms) | 600ms | power2.out |
| CTA buttons | After subtext (800ms) | 500ms | back.out(1.7) |
| Stats | After CTAs (1200ms) | 400ms + 100ms stagger | power2.out |

### Cursor-Following Gradient

CSS custom properties for gradient position:

```tsx
const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 })

// Update on mouse move
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 100
  const y = (e.clientY / window.innerHeight) * 100
  setGradientPos({ x, y })
}

// Apply to gradient
<div
  className="absolute inset-0"
  style={{
    background: `radial-gradient(
      circle at ${gradientPos.x}% ${gradientPos.y}%,
      rgba(139, 92, 246, 0.15),
      transparent 50%
    )`
  }}
/>
```

### Previous Story Learnings (from 9-5)

- Use CSS animations for reduced motion checks (`@media (prefers-reduced-motion: reduce)`)
- Export components from `src/components/ui/index.ts`
- Add data-testid attributes for testing
- Ensure aria-labelledby maintained
- Clean up useEffect subscriptions

### References

- [Source: epics.md#Story-9.6] - Acceptance criteria
- [Source: 9-1-advanced-scroll-animation-system.md] - GSAP patterns
- [Source: 9-5-enhanced-micro-interactions.md] - Animation patterns
- [Source: src/components/sections/hero.tsx] - Current hero implementation
- [Source: src/hooks/use-hero-scroll-fade.ts] - Scroll fade hook

## Testing Checklist

- [x] Hero renders with all sections (badge, headline, subtext, CTAs, stats)
- [x] Floating orbs have parallax transform on mouse move (desktop)
- [x] Background gradient follows cursor position
- [x] Headline animates character-by-character on load
- [x] Subtext fades up after headline completes
- [x] CTA buttons scale in with bounce effect
- [x] Hero fades out when scrolling down
- [x] Touch devices: no mouse tracking, simpler animations
- [x] Reduced motion: all animations disabled, content instant
- [x] All existing accessibility attributes preserved (aria-labelledby, data-testid)
- [x] ESLint passes with 0 errors

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Story created with comprehensive context | Claude Opus 4.5 |
| 2026-01-30 | Implementation complete: Mouse parallax, animated text, hero-v2, tests | Claude Opus 4.5 |
| 2026-01-30 | Code Review Fix: Removed unused handleAnimationComplete callback from hero-v2.tsx; Fixed AnimatedText aria-label placement from outer span to visible Component for proper accessibility | Claude Opus 4.5 |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- ESLint: 0 errors, pre-existing warnings unrelated to new code
- TypeScript: No errors in new files

### Completion Notes List

**Mouse Parallax Hook (AC1)**:
- Created `src/hooks/use-mouse-parallax.ts` with `useMouseParallax` and `useMousePosition` hooks
- Tracks mouse position relative to viewport center
- Calculates offset values with configurable depth multiplier (0.02-0.05 range)
- Lerp smoothing (0.1 factor) for fluid movement via requestAnimationFrame
- Automatically disabled on touch devices (`hover: none`) and reduced motion
- Proper cleanup of RAF and event listeners on unmount

**Animated Text Component (AC2)**:
- Created `src/components/ui/animated-text.tsx` with `AnimatedText` and `AnimatedLines` components
- Manual character split animation using GSAP (no SplitText plugin needed)
- Configurable stagger timing (0.025s default for chars, 0.08s for words)
- Supports `splitBy: 'chars' | 'words'` option
- `onComplete` callback for sequencing animations
- Exported from `src/components/ui/index.ts`

**Hero V2 Component (AC1-5)**:
- Created `src/components/sections/hero-v2.tsx` integrating all features
- 3 parallax layers for floating orbs (depths: 0.02, 0.035, 0.05)
- Cursor-following gradient background using `useMousePosition`
- AnimatedText for headline with character split animation
- CSS animation classes for badge, subtext, CTAs, and stats (staggered delays)
- Integrated `useHeroScrollFade` for scroll-linked fade effect
- Preserves all original content: badge, headline, subtext, CTAs, stats, scroll indicator

**Mobile Optimizations (AC4)**:
- Touch device detection via `window.matchMedia('(hover: none)')`
- Parallax disabled on mobile, uses CSS `animate-float` variants instead
- Floating orbs use simpler CSS animations (float, float-delayed, float-slow)
- Reduced animation complexity for better performance

**Accessibility (AC5)**:
- All animations check `prefersReducedMotion` preference
- Content displays instantly without animation when reduced motion enabled
- All ARIA attributes preserved (aria-labelledby="hero-title")
- data-testid attributes for all key elements
- CSS `@media (prefers-reduced-motion: reduce)` disables all animations

**CSS Animations Added (globals.css)**:
- `@keyframes fade-in-up` - content entrance with translateY
- `@keyframes scale-in-bounce` - CTA button bounce entrance
- `@keyframes scroll-indicator` - scroll indicator bounce
- Utility classes: animate-fade-in-up, animate-scale-in-bounce, animate-float, animate-float-delayed, animate-float-slow, animate-scroll-indicator
- Reduced motion support added for all new animations

**Homepage Integration (AC1-5)**:
- Updated `src/app/(site)/page.tsx` to import Hero from hero-v2
- Original hero.tsx kept as backup
- All existing functionality preserved

**Playwright Tests**:
- Created `tests/hero-v2.spec.ts` with 18 test cases
- Tests cover: basic rendering, accessibility, mouse parallax, animation sequence, scroll behavior, mobile viewport, reduced motion, visual elements

### File List

- `src/hooks/use-mouse-parallax.ts` (new)
- `src/components/ui/animated-text.tsx` (new)
- `src/components/sections/hero-v2.tsx` (new)
- `src/components/ui/index.ts` (modified - added AnimatedText export)
- `src/app/globals.css` (modified - added hero animation keyframes)
- `src/app/(site)/page.tsx` (modified - import hero-v2)
- `tests/hero-v2.spec.ts` (new - 18 test cases)
