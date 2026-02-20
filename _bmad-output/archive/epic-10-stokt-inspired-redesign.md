# Epic 10: Stokt-Inspired Design Transformation

**Goal:** Transform Invenex from a generic corporate template into a bold, typography-driven, motion-rich creative agency website inspired by Stokt Creative (Awwwards SOTD Jan 25, 2026).

**Reference:** https://wearestokt.com

**Why Epic 9 Failed:** Generic "premium UI" features (custom cursors, floating orbs) instead of Stokt's actual design language (massive typography, text-first portfolio, bold copy).

---

## Design Principles from Stokt

1. **Typography is Architecture** - Headlines fill the viewport, not float in it
2. **Text First, Image Second** - Portfolio shows names prominently, images on hover
3. **Motion is Meaning** - Every animation serves the brand story
4. **Bold Voice** - Copy has personality ("LET'S CUT THE BS")
5. **Social Proof is Prominent** - Awards, stats, testimonials featured heavily

---

## Story 10.1: Massive Hero Typography

**Priority:** P0 - Critical

As a **visitor**,
I want **a hero that commands attention with dramatic typography**,
So that **I immediately perceive Invenex as a bold, confident agency**.

**Current State:**
- "We Build Digital Excellence" at ~48px
- Takes up ~20% of viewport height
- Standard corporate feel

**Target State (Stokt-like):**
- Headline fills 50-60% of viewport height
- Typography is the hero element, not background effects
- Text animates character-by-character on load

**Acceptance Criteria:**

**Given** I land on the homepage
**When** the hero loads
**Then**:
- Headline uses `clamp(4rem, 12vw, 10rem)` or larger
- Text is stacked vertically: "WE BUILD" / "DIGITAL" / "EXCELLENCE"
- Each word animates in with GSAP SplitText (staggered 0.1s)
- Subtext appears after headline animation completes
- Stats row shows: "50+ Projects", "5+ Years", "98% Satisfaction"

**Technical Implementation:**
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

---

## Story 10.2: Text-First Portfolio Section

**Priority:** P0 - Critical

As a **visitor**,
I want **a portfolio that showcases project names prominently**,
So that **the work speaks through confident typography, not thumbnail grids**.

**Current State:**
- 2x2 image grid with small titles below
- Images are the primary element
- Looks like every other agency

**Target State (Stokt-like):**
- Large project names dominate (h2/h3 level typography)
- Categories shown inline: "Motion & 3D • Web Development"
- Hover reveals project image/video
- Minimal, editorial layout

**Acceptance Criteria:**

**Given** I view the Featured Work section
**When** it renders
**Then**:
- Project names are displayed in large text (~2-3rem)
- Each project is a full-width row
- Hover/focus reveals project thumbnail sliding in from right
- Categories displayed as subtle text beside title

**Given** I hover over a project
**When** hover is active
**Then**:
- Project image fades in (positioned right side)
- Title may shift slightly or get underline
- Smooth 300ms transition

**Layout Pattern:**
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

---

## Story 10.3: Bold Stats Section

**Priority:** P1 - High

As a **visitor**,
I want **impressive statistics displayed prominently**,
So that **I immediately understand Invenex's credibility**.

**Current State:**
- Small stats in hero area
- Standard size, easy to miss

**Target State (Stokt-like):**
- Giant numbers: "50+" "5+" "98%"
- Numbers at 4-6rem size
- Separate section with visual impact
- Animates on scroll (count up)

**Acceptance Criteria:**

**Given** I scroll to the stats section
**When** it enters viewport
**Then**:
- Numbers count up from 0 to final value
- Each stat has large number + small label below
- Subtle stagger between stats (100ms)

**Layout:**
```
┌──────────────────────────────────────────────────┐
│                                                  │
│    50+              5+              98%          │
│  Projects        Years         Satisfaction      │
│  Delivered     Experience                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Story 10.4: Bold CTA Section

**Priority:** P1 - High

As a **visitor**,
I want **a memorable call-to-action**,
So that **I feel compelled to reach out**.

**Current State:**
- "Ready to Build Something Extraordinary?" - safe, generic
- Standard button styling

**Target State (Stokt-like):**
- Bold, personality-driven headline
- Large typography
- Simple but impactful

**Acceptance Criteria:**

**Given** I scroll to the CTA section
**When** it renders
**Then**:
- Headline is bold and memorable (e.g., "LET'S BUILD SOMETHING EPIC.")
- Typography is large (4-6rem)
- Two CTAs: "Talk to Us" + "View Our Work"
- Minimal design, text-focused

**Copy Options:**
- "LET'S BUILD SOMETHING EPIC."
- "READY TO STAND OUT?"
- "LET'S MAKE IT HAPPEN."

---

## Story 10.5: Services as Typography

**Priority:** P1 - High

As a **visitor**,
I want **services presented as bold headlines**,
So that **capabilities feel confident, not listed**.

**Current State:**
- 6-card grid with icons
- Small headings, descriptions below
- Generic card layout

**Target State (Stokt-like):**
- 3-4 main service categories as large text
- "Web Development" / "Mobile Apps" / "Digital Strategy"
- Hover expands to show brief description
- No icons needed - typography is the visual

**Acceptance Criteria:**

**Given** I view the Services section
**When** it renders
**Then**:
- Service names displayed at 2-3rem
- Stacked vertically with generous spacing
- Hover reveals description text
- Link to full services page

---

## Story 10.6: Navigation Hover Effects

**Priority:** P2 - Medium

As a **visitor**,
I want **polished navigation interactions**,
So that **even small details feel premium**.

**Current State:**
- Standard color change on hover
- Basic transitions

**Target State (Stokt-like):**
- Text slides/transforms on hover
- Underline animation or text swap effect
- Smooth, deliberate motion

**Acceptance Criteria:**

**Given** I hover over a nav link
**When** hover is active
**Then**:
- Underline animates from left to right
- OR text has subtle slide-up effect
- 200-300ms duration
- Consistent across all nav items

---

## Story 10.7: Founder/Team Spotlight (Optional)

**Priority:** P2 - Medium

As a **visitor**,
I want **to see the people behind Invenex**,
So that **I feel a human connection**.

**Current State:**
- No founder or team section on homepage

**Target State (Stokt-like):**
- Brief founder introduction
- Photo + short bio
- "Work with [Name]" CTA
- Adds personality and trust

**Acceptance Criteria:**

**Given** I scroll through the homepage
**When** I reach the team section
**Then**:
- Founder photo and name displayed
- Brief bio (2-3 sentences)
- CTA to contact/about page

---

## Implementation Order

### Phase 1: Typography Foundation (Stories 10.1, 10.4)
1. Update hero with massive typography
2. Add GSAP SplitText for text animation
3. Update CTA section copy and sizing

### Phase 2: Portfolio Transformation (Story 10.2)
1. Create text-first portfolio layout
2. Add hover image reveals
3. Replace bento grid with editorial list

### Phase 3: Supporting Sections (Stories 10.3, 10.5)
1. Create standalone stats section
2. Simplify services to typography-focused

### Phase 4: Polish (Stories 10.6, 10.7)
1. Navigation hover effects
2. Optional founder section

---

## Success Metrics

- Visual impact dramatically improved
- Homepage feels bold and confident
- Typography dominates over imagery
- Interactions feel intentional
- Lighthouse Performance maintained >85

---

## Files to Modify

1. `src/components/sections/hero-v2.tsx` - Massive typography
2. `src/components/sections/portfolio-preview.tsx` - Text-first layout
3. `src/components/sections/cta-section.tsx` - Bold copy
4. `src/components/sections/services-preview.tsx` - Typography focus
5. `src/app/globals.css` - Typography utilities
6. NEW: `src/lib/gsap.ts` - GSAP setup
7. NEW: `src/components/ui/text-reveal.tsx` - Animation component
