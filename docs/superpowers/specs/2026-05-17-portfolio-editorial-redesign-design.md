# Portfolio "Editorial 2-up" Redesign — Design Spec

**Date:** 2026-05-17
**Status:** Approved (via visual-companion brainstorming)
**Branch:** `feat/portfolio-editorial-redesign`

## Context — why this change

The prior redesign (PR #1, shipped) wrapped every portfolio screenshot in a skeuomorphic macOS **browser-chrome frame**. Live at scale the user rejected it: *"the layout looks like shit."* Diagnosis (confirmed in-browser on production):

1. **The browser-chrome device itself reads as gimmicky/cheap** — user's stated core problem.
2. **Image incoherence:** 8 of 14 projects point `image` at `*-mockup.webp` device-composite renders (a laptop/phone floating on a gradient). A browser frame around a laptop render = a frame-around-a-frame; sat next to the 6 flat-screenshot cards it looked half-broken.
3. **Al Shahama** uses a 390×844 *portrait* PNG crammed into a landscape frame.

User supplied two reference sites — **unseen.co/projects** and **leftcoast.refractweb.com/works**. Both share: large clean media with **no chrome and no text-overlay**, title/meta set **quietly below** the image, **generous whitespace**, calm 2-column editorial rhythm, restrained typography, subtle motion. Through visual-companion iteration the user locked: **D1 "Refined Editorial"** treatment + **scroll-reveal motion** + a **dedicated mobile design**, adapted to Invenex's existing dark (`#0A0A0A`) + coral (`#FF6A37`) brand.

**Outcome wanted:** a premium, modern, well-animated portfolio that looks like a design studio's, not a templated dev-shop grid — and that is genuinely designed for mobile, not just reflowed.

## The locked design

### Layout (listing `/portfolio`)
- **Strict uniform 2-column grid.** Every project equal and large — no size variance, no full-width feature, no bento. Column gap ~56px, row gap ~60px, generous page padding. Calm rhythm, lots of negative space.
- **Header:** mono coral eyebrow `// SELECTED WORK` → weight-contrast headline (thin "Our" / 800 "Work") → project count. Large, confident, lots of space below before the grid.
- **Filters:** keep the 5 category pills (function + tests depend on them) but restyle understated — thin border, muted text, coral only for the active pill.

### Card (no chrome, no overlay)
- Full-bleed screenshot, `border-radius` ~16–20px, `object-cover` top, hairline `1px` border (`rgba(255,255,255,.06)`), aspect **16/10** (desktop).
- Below the image: large project **name** (~25px / 600, tight tracking); a hairline-topped meta row with **mono uppercase category** (muted) and a **coral index number**.
- **Hover (desktop, pointer:fine):** screenshot sits desaturated (`grayscale(.4) brightness(.8)`) and **blooms to full color** + scales ~1.035 over ~1s `cubic-bezier(.16,1,.3,1)`; a **2px coral rule sweeps** left→right under the name; index brightens. No tilt, no fake browser, no dark gradient, no pill.

### Motion (the "more animation" ask)
- **Scroll-reveal entrance:** header + each card fade + `translateY(34px)→0` + `clip-path inset(0 0 12% 0)→0`, **staggered ~80–90ms**, triggered on enter-view (ScrollTrigger / IntersectionObserver), easing `cubic-bezier(.16,1,.3,1)`.
- **Headline:** subtle mask/clip reveal on load.
- Optional, tasteful (fold in, keep subtle): slight intra-frame image parallax on scroll.
- **All motion gated** by the site's existing `shouldSkipAnimations()` (reduced-motion OR touch) — entrance/hover degrade to static, content always visible.

### Mobile (dedicated, not a reflow)
- **Single column**, full-bleed screenshots at **4:3** (taller, fills the hand), `border-radius` ~18px, generous vertical rhythm (~34px between projects).
- **Always full-color** (no hover state on touch); name + hairline meta below; coral underline animates as each card scroll-reveals.
- Larger tap targets; lightweight CSS-only entrance (no Lenis/heavy GSAP on touch, per project iOS constraints in MEMORY: `100dvh`, `overflow:clip`, no heavy `backdrop-filter`).

### Imagery (data fix — required for coherence)
- In `src/lib/projects.ts`, repoint `image` from `*-mockup.webp` → the flat website-screenshot variant for: CoolTech, Ginger, Ahazz, La Mirage, GrabToGo, Babbage, Molvexa, Ziera (all flat files already in `public/portfolio/`).
- **Al Shahama:** `alshahama-marine-new-1.png` (portrait) → `alshahama-marine.webp` (landscape).
- **Q by Rayeesa:** review `qbyrayeesa.webp`; if it's a lifestyle composite rather than a site screenshot, use the cleanest available variant.
- Gallery arrays untouched except where they referenced the swapped hero (existing dedup logic already filters `g === project.image`).

### Consistency & scope (remove chrome site-wide)
- **Retire `BrowserFrame`** everywhere it was introduced so chrome can't reappear:
  - `src/components/ui/portfolio-card.tsx` — rebuild to the editorial treatment above.
  - `src/components/sections/bento-portfolio-grid.tsx` — 2-up grid + scroll-reveal. Keep the existing Framer Motion `AnimatePresence` + Suspense + `useSearchParams` filter behavior as-is; implement entrance via the site's existing GSAP `registerScrollTrigger` pattern (consistent with other sections), gated by `shouldSkipAnimations()`.
  - `src/components/sections/portfolio-preview.tsx` (homepage) — adopt same clean card.
  - `src/app/(site)/portfolio/[slug]/case-study-client.tsx` — hero + related use clean media (no tilt/chrome); structure otherwise unchanged.
  - `src/components/ui/image-gallery.tsx` — gallery cells use clean media; **lightbox testids/keyboard/skeleton unchanged**.
  - Delete `src/components/ui/browser-frame.tsx` once unreferenced.

### Test reconciliation (deliberate, not gaming)
`tests/portfolio-grid.spec.ts` encodes the *old* bento concept and will be updated to match the intentional new design:
- `lg:grid-cols-4` → `lg:grid-cols-2`.
- Remove `data-size="featured"` ×4 and `bento-card-featured-badge` ×4 assertions (no featured size variance by design).
- **Preserve:** `bento-portfolio-grid`, `bento-portfolio-grid-section`, `bento-project-card`, `bento-card-image`, `bento-card-title`, `bento-card-category`, `portfolio-filters`, `portfolio-hero`, `project-count`, filtering, URL state, reduced-motion, keyboard a11y, `case-study-*` contract.
- `bento-card-overlay` removed (no overlay) — drop the two hover-overlay assertions; replace with a hover assertion suited to the new treatment (image filter/scale or coral underline) if low-risk, else remove.

## Success criteria
- `/portfolio` matches the approved companion mockup: dark, spacious, 2-up, clean media, text below, scroll-reveal + refined hover; visually coherent (all flat screenshots).
- Dedicated mobile layout (single column, 4:3, calm) — not a desktop reflow.
- Homepage preview, case-study hero/related, gallery all use the same clean treatment; no browser chrome anywhere; `BrowserFrame` deleted.
- `tsc`, `lint` (no new violations vs baseline), `build` clean; updated `portfolio-grid.spec.ts` + `case-study.spec.ts` green; reduced-motion + LCP verified; visual QA (desktop + mobile) approved by user before merge.

## Out of scope
- Case-study page structural changes (challenge/solution/results/testimonial sections stay as shipped in PR #1; only media treatment changes).
- New projects/content, CMS, copy changes.
- Animation beyond scroll-reveal + refined hover + optional subtle parallax (no page-transition/cursor/marquee unless requested later).

## Verification approach
nvm-pattern Node; build + `npm run start`; Playwright MCP visual QA at 1440 and 390 (scroll to fire reveal); `npx playwright test tests/portfolio-grid.spec.ts tests/case-study.spec.ts`; LCP PerformanceObserver on `/portfolio`; reduced-motion emulation; then present live screenshots for explicit user approval before commit/merge.
