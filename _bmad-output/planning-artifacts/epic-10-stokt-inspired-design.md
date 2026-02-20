---
status: superseded-into-epic-9
superseded_date: 2026-02-20
---

# Epic 10: Stokt-Inspired Design (SUPERSEDED)

> **This epic has been consolidated into Epic 9: Premium UI/UX Enhancement (Stokt-Inspired) in `epics.md`.**
> All overlapping stories were merged into Epic 9. Unique stories (10.4 Bold CTA, 10.5 Bold Stats) were added as Stories 9.10 and 9.11. See `epics.md` for the authoritative versions.
> **Date:** 2026-02-20

**Original Goal:** Transform Invenex into a bold, typography-driven, motion-rich agency website inspired by Stokt Creative (Awwwards SOTD Jan 25, 2026).

**Reference:** https://wearestokt.com

**Consolidation Map:**
| Original Story | Merged Into | Resolution |
|---|---|---|
| 10.1: Massive Hero Typography | Story 9.6 | Merged — bold typography + interactive parallax |
| 10.2: Scroll Animations | Story 9.1 | Merged — added trigger points, batch performance |
| 10.3: Text-First Portfolio | Story 9.7 | Superseded — replaced Bento Box direction |
| 10.4: Bold CTA Section | Story 9.10 | Added as new story |
| 10.5: Bold Stats Section | Story 9.11 | Added as new story |
| 10.6: Navigation Hover Effects | Story 9.5 | Merged — nav underline animation |

**Design Principles:**
1. **Typography is Architecture** — Headlines fill the viewport, not float in it
2. **Text First, Image Second** — Portfolio shows names prominently, images on hover
3. **Motion is Meaning** — Every animation serves the brand story
4. **Bold Voice** — Copy has personality

---

## Story 10.1: Massive Hero Typography

**Priority:** P0 - Critical
**Effort:** Medium

As a **visitor**,
I want **a hero that commands attention with dramatic typography**,
So that **I immediately perceive Invenex as a bold, confident agency**.

### Current State
- "We Build Digital Excellence" at ~48px
- Takes up ~20% of viewport height
- Standard corporate feel

### Target State
- Headline fills 50-60% of viewport height
- Typography is the hero element, not background effects
- Text animates character-by-character on load

### Acceptance Criteria

**Given** I land on the homepage
**When** the hero loads
**Then**:
- Headline uses `clamp(4rem, 12vw, 10rem)` or larger
- Text is stacked vertically: "WE BUILD" / "DIGITAL" / "EXCELLENCE"
- Each word animates in with GSAP SplitText (staggered 0.1s)
- Subtext appears after headline animation completes
- Stats row shows: "50+ Projects", "5+ Years", "98% Satisfaction"

### Technical Notes
```tsx
// Hero headline sizing
className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight"

// GSAP SplitText animation
gsap.from(chars, {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: "power4.out"
})
```

### Files to Modify
- `src/components/sections/hero-v2.tsx`
- `src/lib/gsap.ts`

---

## Story 10.2: Scroll Animations

**Priority:** P1 - High
**Effort:** Medium

As a **visitor**,
I want **smooth scroll-triggered animations**,
So that **the page feels alive and engaging as I explore**.

### Acceptance Criteria

**Given** I scroll down the page
**When** sections enter the viewport
**Then**:
- Elements fade in with subtle upward motion
- Staggered timing for child elements
- Animations trigger at 20% viewport entry
- No janky or stuttering motion
- Respects `prefers-reduced-motion`

### Technical Notes
- Use GSAP ScrollTrigger
- Batch animations for performance
- Lazy load GSAP on first scroll

### Files to Modify
- `src/components/ui/scroll-reveal.tsx`
- Section components as needed

---

## Story 10.3: Text-First Portfolio

**Priority:** P0 - Critical
**Effort:** Medium-High

As a **visitor**,
I want **a portfolio that showcases project names prominently**,
So that **the work speaks through confident typography, not thumbnail grids**.

### Current State
- 2x2 image grid with small titles below
- Images are the primary element
- Looks like every other agency

### Target State
- Large project names dominate (h2/h3 level typography)
- Categories shown inline: "Motion & 3D • Web Development"
- Hover reveals project image/video
- Minimal, editorial layout

### Acceptance Criteria

**Given** I view the Featured Work section
**When** it renders
**Then**:
- Project names displayed in large text (~2-3rem)
- Each project is a full-width row
- Hover/focus reveals project thumbnail sliding in from right
- Categories displayed as subtle text beside title

**Given** I hover over a project
**When** hover is active
**Then**:
- Project image fades in (positioned right side)
- Title may shift slightly or get underline
- Smooth 300ms transition

### Layout Pattern
```
┌─────────────────────────────────────────────────────┐
│ CoolTech International          Web • Corporate  → │
├─────────────────────────────────────────────────────┤
│ Ginger Designs                  Web • Creative   → │
├─────────────────────────────────────────────────────┤
│ La Mirage                       Web • Hospitality→ │
├─────────────────────────────────────────────────────┤
│ OnMyWay AI                      Platform • AI    → │
└─────────────────────────────────────────────────────┘
```

### Files to Modify
- `src/components/sections/portfolio-preview.tsx`

---

## Story 10.4: Bold CTA Section

**Priority:** P1 - High
**Effort:** Low

As a **visitor**,
I want **a memorable call-to-action**,
So that **I feel compelled to reach out**.

### Current State
- "Ready to Build Something Extraordinary?" - safe, generic
- Standard button styling

### Target State
- Bold, personality-driven headline
- Large typography (4-6rem)
- Simple but impactful

### Acceptance Criteria

**Given** I scroll to the CTA section
**When** it renders
**Then**:
- Headline is bold and memorable (e.g., "LET'S BUILD SOMETHING EPIC.")
- Typography is large (4-6rem)
- Two CTAs: "Talk to Us" + "View Our Work"
- Minimal design, text-focused

### Copy Options
- "LET'S BUILD SOMETHING EPIC."
- "READY TO STAND OUT?"
- "LET'S MAKE IT HAPPEN."

### Files to Modify
- `src/components/sections/cta-section.tsx`

---

## Story 10.5: Bold Stats Section

**Priority:** P1 - High
**Effort:** Low-Medium

As a **visitor**,
I want **impressive statistics displayed prominently**,
So that **I immediately understand Invenex's credibility**.

### Current State
- Small stats in hero area
- Standard size, easy to miss

### Target State
- Giant numbers: "50+" "5+" "98%"
- Numbers at 4-6rem size
- Separate section with visual impact
- Animates on scroll (count up)

### Acceptance Criteria

**Given** I scroll to the stats section
**When** it enters viewport
**Then**:
- Numbers count up from 0 to final value
- Each stat has large number + small label below
- Subtle stagger between stats (100ms)

### Layout
```
┌──────────────────────────────────────────────────┐
│                                                  │
│    50+              5+              98%          │
│  Projects        Years         Satisfaction      │
│  Delivered     Experience                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Files to Modify
- `src/components/sections/stats-section.tsx` (new or extract from hero)

---

## Story 10.6: Navigation Hover Effects

**Priority:** P2 - Medium
**Effort:** Low

As a **visitor**,
I want **polished navigation interactions**,
So that **even small details feel premium**.

### Current State
- Standard color change on hover
- Basic transitions

### Target State
- Text slides/transforms on hover
- Underline animation or text swap effect
- Smooth, deliberate motion

### Acceptance Criteria

**Given** I hover over a nav link
**When** hover is active
**Then**:
- Underline animates from left to right
- OR text has subtle slide-up effect
- 200-300ms duration
- Consistent across all nav items

### Files to Modify
- `src/components/layout/navbar.tsx`
- `src/app/globals.css`

---

## Implementation Order

### Phase 1: Typography Foundation
1. Story 9.1: Massive Hero Typography
2. Story 9.4: Bold CTA Section

### Phase 2: Portfolio Transformation
3. Story 9.3: Text-First Portfolio

### Phase 3: Visual Polish
4. Story 9.2: Scroll Animations
5. Story 9.5: Bold Stats Section
6. Story 9.6: Navigation Hover Effects

---

## Success Metrics

- Visual impact dramatically improved
- Homepage feels bold and confident
- Typography dominates over imagery
- Interactions feel intentional
- Lighthouse Performance maintained >85
