# Portfolio "Editorial 2-up" Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected browser-chrome framed grid with a spacious, animated, editorial 2-up portfolio (clean media, text below, scroll-reveal, dedicated mobile) adapted to Invenex dark + coral.

**Architecture:** A presentational editorial card (no `BrowserFrame`) reused by the listing grid, homepage preview, case-study related/gallery, and case-study hero. Responsive aspect + hover + reveal live as scoped classes in `globals.css` (avoids the Tailwind v4 arbitrary-value pitfall). Entrance motion uses the site's existing GSAP `registerScrollTrigger` pattern, gated by `shouldSkipAnimations()`. Project image sources are swapped from device-mockup composites to flat website screenshots. `BrowserFrame` is deleted once unreferenced.

**Tech Stack:** Next.js 16 / React 19, Tailwind v4, GSAP 3 + ScrollTrigger (`src/lib/gsap.ts`), Framer Motion (filter FLIP only), Playwright (e2e tests).

**Spec:** `docs/superpowers/specs/2026-05-17-portfolio-editorial-redesign-design.md`

**Branch:** `feat/portfolio-editorial-redesign` (already created off `origin/main`).

**Working conventions:**
- Node via nvm before every Node command: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20`.
- `docs/` is gitignored — commit plan/spec changes only if needed with `git add -f`. Source/test/css commits are normal `git add`.
- Playwright browser is installed in this env. Tests run against `npm run start` on `:3000`; **kill stale :3000 before starting** (`fuser -k 3000/tcp; pkill -f "next start"`), start as a background task, poll `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/portfolio` until `200`. After ANY source change, rebuild + restart before re-testing.
- TDD here = Playwright e2e: edit/author the spec assertion, run it red, implement, run it green, commit.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `src/app/globals.css` | Scoped portfolio card classes: responsive media ratio, hover desaturate→color + coral rule, reduced-motion | Modify (append one block) |
| `src/lib/projects.ts` | Project data; `image` field per project | Modify (swap 10 image paths) |
| `src/components/ui/portfolio-card.tsx` | The editorial card (media + name + meta), no chrome | Rewrite |
| `src/components/sections/bento-portfolio-grid.tsx` | 2-up grid, filters, GSAP scroll-reveal, skeleton | Modify |
| `src/components/sections/portfolio-preview.tsx` | Homepage featured cards | Modify (use clean card markup) |
| `src/app/(site)/portfolio/[slug]/case-study-client.tsx` | Case-study hero + related + gallery feed | Modify (clean media, gallery filter) |
| `src/components/ui/image-gallery.tsx` | Gallery grid cells + lightbox | Modify (cells clean; lightbox untouched) |
| `src/components/ui/browser-frame.tsx` | Old chrome component | Delete (after unreferenced) |
| `tests/portfolio-grid.spec.ts` | Listing e2e contract | Modify (reconcile to new design) |

---

## Task 1: Swap project image sources to flat screenshots

**Files:**
- Modify: `src/lib/projects.ts`
- Modify: `src/components/sections/portfolio-preview.tsx` (homepage `featuredProjects` array)
- Test: `tests/portfolio-grid.spec.ts`

- [ ] **Step 1: Write the failing test**

Add this test inside the top-level `test.describe("Story 9-7: Bento Box Portfolio Grid - Desktop", ...)` block in `tests/portfolio-grid.spec.ts` (after the existing `"images are optimized"` style tests; place it before the final `})` of that describe):

```ts
test("cards use flat website screenshots (no device-mockup, no portrait png)", async ({ page }) => {
  await page.goto("/portfolio");
  await page.waitForSelector('[data-testid="bento-portfolio-grid"]');
  const srcs = await page.$$eval(
    '[data-testid="bento-card-image"] img',
    (imgs) => imgs.map((i) => (i as HTMLImageElement).getAttribute("src") || "")
  );
  expect(srcs.length).toBeGreaterThan(0);
  for (const s of srcs) {
    const decoded = decodeURIComponent(s);
    expect(decoded).not.toContain("-mockup.webp");
    expect(decoded).not.toContain("alshahama-marine-new-1.png");
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20 && npx playwright test tests/portfolio-grid.spec.ts -g "flat website screenshots" --project=chromium --reporter=line`
Expected: FAIL — current shipped data still serves `*-mockup.webp` / `alshahama-marine-new-1.png` (requires a running build of current code; if no server, this will also fail — acceptable, it is red).

- [ ] **Step 3: Edit `src/lib/projects.ts` image fields**

Change exactly these `image:` values (leave `gallery`, `id`, everything else unchanged):

```
id "1"  CoolTech:      "/portfolio/cooltech-international-mockup.webp" → "/portfolio/cooltech-international.webp"
id "2"  Ginger:        "/portfolio/ginger-designs-mockup.webp"        → "/portfolio/ginger-designs.webp"
id "3"  Ahazz:         "/portfolio/ahazz-designs-mockup.webp"         → "/portfolio/ahazz-designs.webp"
id "5"  La Mirage:     "/portfolio/la-mirage-mockup.webp"             → "/portfolio/la-mirage.webp"
id "6"  GrabToGo:      "/portfolio/grabtogo-mockup.webp"              → "/portfolio/grabtogo.webp"
id "7"  Babbage:       "/portfolio/babbage-solutions-mockup.webp"     → "/portfolio/babbage-solutions.webp"
id "8"  Molvexa:       "/portfolio/molvexa-mockup.webp"               → "/portfolio/molvexa.webp"
id "11" Al Shahama:    "/portfolio/alshahama-marine-new-1.png"        → "/portfolio/alshahama-marine.webp"
id "13" Ziera Inc:     "/portfolio/ziera-mockup.webp"                 → "/portfolio/zierainc.webp"
```
(ids 4 EaseMyFly, 9 Emergence, 10 OnMyWay, 12 Q by Rayeesa, 14 AA Rent A Car already use flat screenshots — leave unchanged.)

- [ ] **Step 4: Edit `src/components/sections/portfolio-preview.tsx` `featuredProjects`**

In the `featuredProjects` array change the four `image` values:

```
CoolTech International: "/portfolio/cooltech-international-mockup.webp" → "/portfolio/cooltech-international.webp"
Ginger Designs:         "/portfolio/ginger-designs-mockup.webp"        → "/portfolio/ginger-designs.webp"
GrabToGo:               "/portfolio/grabtogo-mockup.webp"              → "/portfolio/grabtogo.webp"
Ziera Inc:              "/portfolio/ziera-mockup.webp"                 → "/portfolio/zierainc.webp"
```

- [ ] **Step 5: Verify the flat files exist**

Run: `for f in cooltech-international ginger-designs ahazz-designs la-mirage grabtogo babbage-solutions molvexa zierainc; do test -f "public/portfolio/$f.webp" && echo "OK $f" || echo "MISSING $f"; done; test -f public/portfolio/alshahama-marine.webp && echo "OK alshahama" || echo "MISSING alshahama"`
Expected: all `OK`. If any `MISSING`, stop and report — do not invent a path.

- [ ] **Step 6: Rebuild, restart, run test green**

Run:
```
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20
npm run build && (fuser -k 3000/tcp 2>/dev/null; pkill -f "next start" 2>/dev/null; sleep 2)
```
Then start the server as a background task (`npm run start`), poll until `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/portfolio` returns `200`, then:
`npx playwright test tests/portfolio-grid.spec.ts -g "flat website screenshots" --project=chromium --reporter=line`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/projects.ts src/components/sections/portfolio-preview.tsx tests/portfolio-grid.spec.ts
git commit -m "fix: use flat website screenshots for portfolio images

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Add scoped portfolio card CSS to globals.css

**Files:**
- Modify: `src/app/globals.css` (append one block at end of file)

- [ ] **Step 1: Append the CSS block**

Append exactly this to the end of `src/app/globals.css`:

```css
/* ── Portfolio editorial card (spec 2026-05-17) ───────────────────────── */
.pf-card-media {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  aspect-ratio: 16 / 10;
  background: var(--color-background-secondary);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
@media (max-width: 767px) {
  .pf-card-media { aspect-ratio: 4 / 3; }
}
.pf-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  filter: grayscale(0.4) brightness(0.82);
  transition: filter 0.7s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (hover: hover) and (pointer: fine) {
  .group:hover .pf-card-img { filter: none; transform: scale(1.035); }
}
.pf-card-rule { position: relative; display: inline-block; }
.pf-card-rule::after {
  content: "";
  position: absolute;
  left: 0; right: 100%; bottom: -8px;
  height: 2px;
  background: var(--color-coral-500);
  transition: right 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (hover: hover) and (pointer: fine) {
  .group:hover .pf-card-rule::after { right: 0; }
}
.pf-reveal {
  opacity: 0;
  transform: translateY(34px);
  clip-path: inset(0 0 12% 0);
}
.pf-reveal.is-in {
  opacity: 1;
  transform: none;
  clip-path: inset(0 0 0 0);
  transition: opacity 0.9s ease,
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  .pf-reveal, .pf-reveal.is-in {
    opacity: 1; transform: none; clip-path: none; transition: none;
  }
  .pf-card-img { filter: none; }
}
```

- [ ] **Step 2: Verify build compiles the CSS**

Run: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20 && npm run build 2>&1 | grep -iE "Compiled successfully|error" | head`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add editorial portfolio card css utilities

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Rebuild PortfolioCard as the editorial card (no chrome)

**Files:**
- Rewrite: `src/components/ui/portfolio-card.tsx`
- Test: `tests/portfolio-grid.spec.ts`

- [ ] **Step 1: Update the card-contract tests (write the new expectations)**

In `tests/portfolio-grid.spec.ts`:

(a) In `test("cards contain required elements", ...)` keep the `bento-card-title`, `bento-card-category`, `bento-card-image` assertions (the card still emits these).

(b) **Delete** the entire `test("card shows overlay on hover", ...)` and `test("image zooms on hover", ...)` blocks (overlay no longer exists). Replace them with one test:

```ts
test("card image desaturates by default and has no browser chrome", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover-only check");
  const img = page.locator('[data-testid="bento-card-image"] img').first();
  await expect(img).toBeVisible();
  await expect(img).toHaveClass(/pf-card-img/);
  // No fake browser chrome anywhere in a card
  const chrome = await page.locator('[data-testid="bento-project-card"]')
    .first().locator('text=/^●/').count();
  expect(chrome).toBe(0);
});
```

(c) **Delete** `test("featured badge appears on featured cards", ...)` and `test("featured projects get larger cards (2x2 or 2x1)", ...)` and `test("featured cards show client name", ...)` (no featured size variance / badge / client in new design).

(d) In `test("renders bento grid with varied card sizes", ...)` replace its body with:

```ts
test("renders a uniform grid of project cards", async ({ page }) => {
  const grid = page.locator('[data-testid="bento-portfolio-grid"]');
  await expect(grid).toBeVisible();
  const cards = page.locator('[data-testid="bento-project-card"]');
  expect(await cards.count()).toBe(14);
});
```

- [ ] **Step 2: Run the card tests to verify they fail**

Run: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20 && npx playwright test tests/portfolio-grid.spec.ts -g "uniform grid of project cards|no browser chrome|cards contain required" --project=chromium --reporter=line`
Expected: FAIL (current card still has `bento-card-overlay`, `BrowserFrame` chrome dots, no `pf-card-img`).

- [ ] **Step 3: Rewrite `src/components/ui/portfolio-card.tsx`**

Replace the entire file with:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { SimpleProject } from '@/lib/projects'

interface PortfolioCardProps {
  project: SimpleProject
  index: number
  /** First cards above the fold load eagerly (LCP). */
  priority?: boolean
}

/**
 * Editorial portfolio card — clean full-bleed screenshot, no chrome, no overlay.
 * Title + mono meta sit quietly below the media; coral rule sweeps on hover.
 * Hover/desaturation handled by .pf-card-* classes in globals.css (pointer:fine only).
 */
export function PortfolioCard({ project, index, priority }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block"
      data-testid="bento-project-card"
      data-size="uniform"
    >
      <div className="pf-card-media" data-testid="bento-card-image">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} project by Invenex Solutions`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
          className="pf-card-img"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-5">
        <h3
          data-testid="bento-card-title"
          className="pf-card-rule text-xl md:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-coral-400"
        >
          {project.title}
        </h3>
        <div className="flex shrink-0 items-baseline gap-4">
          <span className="hidden sm:inline text-sm text-coral-400/0 transition-colors duration-300 group-hover:text-coral-400 whitespace-nowrap">
            View case study →
          </span>
          <span
            data-testid="bento-card-category"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-foreground-subtle"
          >
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-coral-500/60" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </Link>
  )
}
```

Note: `text-[11px]` is an arbitrary value — if the build/visual QA shows it not generating (MEMORY pitfall), replace the two `text-[11px]` with `text-xs` and re-verify.

- [ ] **Step 4: Run the card tests green**

Rebuild + restart server (per working conventions), then:
Run: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20 && npx playwright test tests/portfolio-grid.spec.ts -g "uniform grid of project cards|no browser chrome|cards contain required" --project=chromium --reporter=line`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/portfolio-card.tsx tests/portfolio-grid.spec.ts
git commit -m "feat: editorial portfolio card (clean media, no chrome)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: 2-up grid + GSAP scroll-reveal in bento-portfolio-grid

**Files:**
- Modify: `src/components/sections/bento-portfolio-grid.tsx`
- Test: `tests/portfolio-grid.spec.ts`

- [ ] **Step 1: Update grid-column tests**

In `tests/portfolio-grid.spec.ts`:
- `test("grid uses CSS Grid with 4 columns on desktop", ...)` → rename to `"grid uses 2 columns on desktop"` and change the assertion to `await expect(grid).toHaveClass(/lg:grid-cols-2/);`
- Keep `test("displays single column grid on mobile", ...)` (`/grid-cols-1/`) unchanged.
- In the Tablet describe, `test("displays 2 column grid on tablet", ...)` keep `/md:grid-cols-2/`.

- [ ] **Step 2: Run to verify fail**

Run: `... npx playwright test tests/portfolio-grid.spec.ts -g "2 columns on desktop" --project=chromium --reporter=line`
Expected: FAIL (current grid is `lg:grid-cols-4`).

- [ ] **Step 3: Edit the grid container + remove size variance**

In `src/components/sections/bento-portfolio-grid.tsx`:

(a) Replace `buildLayout` and `getSpanClasses` and the `LayoutItem`/`PortfolioCardSize` usage with a plain list — every project equal. Replace the layout `useMemo` with:

```tsx
const layoutItems = useMemo(() => filteredProjects, [filteredProjects]);
```
and update the import to `import { PortfolioCard } from "@/components/ui/portfolio-card";` (drop the `PortfolioCardSize` import).

(b) Change the grid `motion.div` className from
`"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"` to
`"grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16 md:gap-x-14 md:gap-y-20 lg:grid-cols-2"`.

(c) Replace the mapped item block. Each item: keep `motion.div` with `key`, `layout`, `layoutId`, `layoutDependency={activeFilter}`, `initial={false}` (GSAP owns entrance — no Framer entrance), `exit` for filter removal only. Inner content: a reveal wrapper + the card:

```tsx
{layoutItems.map((project, index) => (
  <motion.div
    key={project.id}
    layout={!prefersReduced}
    layoutId={prefersReduced ? undefined : project.id}
    layoutDependency={activeFilter}
    initial={false}
    exit={prefersReduced ? { opacity: 0, transition: { duration: 0 } }
                          : { opacity: 0, scale: 0.97, transition: { duration: 0.22 } }}
  >
    <div className="pf-reveal" data-reveal>
      <PortfolioCard project={project} index={index} priority={index < 4} />
    </div>
  </motion.div>
))}
```
Remove the now-unused `getSpanClasses` call. Keep `AnimatePresence mode="popLayout"`, filter pills, Suspense wrapper, `usePrefersReducedMotion`, and all section testids (`bento-portfolio-grid`, `bento-portfolio-grid-section`, `portfolio-filters`, `portfolio-empty-state`, `aria-labelledby="bento-portfolio-grid-title"`).

(d) Update the Suspense skeleton grid to match: container `"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-14 gap-y-16"`, 6 identical blocks each `<div className="pf-card-media animate-pulse" />` (drop the `i<2` col-span line).

- [ ] **Step 4: Add the GSAP scroll-reveal effect**

Add these imports at the top of the file (alongside existing imports):

```tsx
import { gsap, useGSAP, registerScrollTrigger, shouldSkipAnimations } from "@/lib/gsap";
```

Inside `EditorialPortfolioGridContent`, add a section ref and a `useGSAP` block (mirrors `portfolio-preview.tsx`'s pattern). Put `ref={sectionRef}` on the existing `<section>`:

```tsx
const sectionRef = React.useRef<HTMLElement>(null);

useGSAP(
  () => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els || els.length === 0) return;
    if (shouldSkipAnimations()) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const init = async () => {
      const ST = await registerScrollTrigger();
      els.forEach((el, i) => {
        gsap.to(el, {
          onStart: () => el.classList.add("is-in"),
          duration: 0,
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: (i % 2) * 0.08,
        });
        void ST;
      });
    };
    init();
  },
  { scope: sectionRef, dependencies: [activeFilter] }
);
```
The CSS class `.pf-reveal.is-in` performs the actual transition; GSAP only toggles `is-in` when each element enters view (re-runs when `activeFilter` changes so filtered-in cards reveal).

- [ ] **Step 5: Rebuild, restart, run grid tests green**

Run: `... npx playwright test tests/portfolio-grid.spec.ts --project=chromium --reporter=line`
Expected: all PASS (cols=2, 14 cards, filters, URL state, reduced-motion `grid renders` + `filters still work`, keyboard a11y, accessibility `aria-labelledby="bento-portfolio-grid-title"`). If `filter shows only matching projects` flakes on Framer timing, confirm `exit` transition duration is `0.22` and `layoutDependency={activeFilter}` is present (the prior root-cause fix).

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/bento-portfolio-grid.tsx tests/portfolio-grid.spec.ts
git commit -m "feat: uniform 2-up portfolio grid with GSAP scroll-reveal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Homepage portfolio-preview uses the clean card

**Files:**
- Modify: `src/components/sections/portfolio-preview.tsx`

- [ ] **Step 1: Replace the framed card with clean editorial markup**

In `src/components/sections/portfolio-preview.tsx`:
- Remove `import { BrowserFrame } from "@/components/ui/browser-frame";`.
- In `ProjectCard`, replace the `<BrowserFrame ...> ... </BrowserFrame>` block (the media) and the overlay/metadata block with this body (keep the outer `<div data-portfolio-card data-animate>` + `<Link>` + `cardRef` + the existing `handleMouseMove/Enter/Leave` for the parallax, but the parallax now targets the inner image wrapper):

```tsx
<Link href={project.href} className="group block">
  <div ref={cardRef} className="will-change-transform"
       onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <div className="pf-card-media" data-portfolio-img>
      <Image
        src={project.image}
        alt={`${project.title} — ${project.categories.join(", ")}`}
        fill
        priority={index === 0}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="pf-card-img"
      />
    </div>
    <div className="mt-5 flex items-baseline justify-between gap-5">
      <h3 className="pf-card-rule text-xl md:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-coral-400">
        {project.title}
      </h3>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {project.categories.map((cat) => (
          <span key={cat} className="font-mono text-[11px] tracking-[0.18em] uppercase text-foreground-subtle">
            {cat}
          </span>
        ))}
      </div>
    </div>
  </div>
</Link>
```
`handleMouseEnter/Leave` may keep the `cardRef` scale tween or be simplified to no-ops; the parallax `gsap.to(img, {x,y})` still works on `[data-portfolio-img]`. Keep the section `useGSAP` reveal and `data-portfolio-card`/`data-animate`. Change the section grid to `grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16`.

- [ ] **Step 2: Build + visual check**

Rebuild + restart. Playwright MCP: navigate `http://localhost:3000/`, scroll to `[data-testid="portfolio-preview-section"]`, screenshot. Expected: 4 clean editorial cards, no browser chrome, parallax still on hover.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/portfolio-preview.tsx
git commit -m "feat: homepage portfolio preview uses clean editorial card

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Case-study hero, related, and gallery — clean media

**Files:**
- Modify: `src/app/(site)/portfolio/[slug]/case-study-client.tsx`
- Modify: `src/components/ui/image-gallery.tsx`
- Test: `tests/case-study.spec.ts`

- [ ] **Step 1: Confirm the case-study contract test still expresses current testids**

No new test needed; `tests/case-study.spec.ts` already asserts `case-study-hero`, `case-study-client`, `case-study-category`, `case-study-challenge/solution/results`, `result-metric`, `case-study-gallery`, `gallery-image`, `case-study-technologies`, `tech-badge`, `case-study-related`, `case-study-testimonial`, `case-study-cta`, lightbox testids. These MUST remain. Run baseline:
Run: `... npx playwright test tests/case-study.spec.ts --project=chromium --reporter=line`
Expected: currently PASS (shipped). Record the pass count to compare after changes.

- [ ] **Step 2: Replace BrowserFrame in the hero**

In `case-study-client.tsx`, remove `import { BrowserFrame } from '@/components/ui/browser-frame'`. In `CaseStudyHero`, replace the `<BrowserFrame variant="showcase" tiltable ...>` wrapper around the hero `<Image>` with:

```tsx
<div data-csh="img" className="container mx-auto px-6 md:px-12 mt-14 md:mt-20 relative z-10"
     style={{ clipPath: 'inset(8%)' }}>
  <div className="pf-card-media" style={{ borderRadius: '20px' }}>
    <Image
      src={project.image}
      alt={`${project.title} — project by Invenex Solutions`}
      fill
      className="object-cover object-top"
      sizes="(max-width: 1024px) 100vw, 1200px"
      priority
    />
  </div>
</div>
```
Keep the `[data-csh="img"]` clip-path GSAP reveal exactly as-is (it animates the wrapper, not the frame).

- [ ] **Step 3: Replace BrowserFrame in RelatedSection**

In `RelatedSection`, replace the `<BrowserFrame variant="card" ...>` + inner overlay with:

```tsx
<div className="pf-card-media">
  <Image
    src={relatedProject.image}
    alt={`${relatedProject.title} — ${relatedProject.category} project by Invenex Solutions`}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="pf-card-img"
  />
</div>
```
Keep the surrounding `<Link>` `group`, the `<GSAPStaggerItem>`, and the title/category block below it.

- [ ] **Step 4: Strengthen the gallery dedup to also drop mockups**

In `CaseStudyClient`, change the dedup to exclude the hero image AND any `-mockup` composite:

```tsx
const dedupedGallery = project.gallery.filter(
  (g) => g !== project.image && !g.includes('-mockup.webp')
)
const galleryImages = dedupedGallery.length > 0 ? dedupedGallery : project.gallery
```

- [ ] **Step 5: Replace BrowserFrame in image-gallery cells**

In `src/components/ui/image-gallery.tsx`: remove `import { BrowserFrame } from "@/components/ui/browser-frame";` and the `projectUrl` prop usage in the grid cell. Replace the cell's `<BrowserFrame ...><Image .../></BrowserFrame>` with:

```tsx
<div className="pf-card-media">
  <Image
    src={image}
    alt={`${projectTitle} screenshot ${i + 1}`}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="pf-card-img"
  />
</div>
```
**Do NOT touch** the `<button data-testid="gallery-image">`, its `onClick`, the lightbox `<motion.div data-testid="image-lightbox">`, `lightbox-close/prev/next`, keyboard handler, or the dynamic-import skeleton. Keep the `projectUrl` prop in the signature (optional, now unused) OR remove it and also remove the prop pass in `case-study-client.tsx`'s `<ImageGallery .../>` — do whichever keeps types clean; if removing, drop `projectUrl` from both.

- [ ] **Step 6: Build, restart, run case-study suite green**

Run: `... npx playwright test tests/case-study.spec.ts --project=chromium --reporter=line`
Expected: same pass count as Step 1 baseline (no regressions; lightbox + all sections intact). Pre-existing environmental failures (`invalid slug 404`, mobile lightbox arrow) may persist — compare against the Step 1 baseline, do not chase those.

- [ ] **Step 7: Commit**

```bash
git add "src/app/(site)/portfolio/[slug]/case-study-client.tsx" src/components/ui/image-gallery.tsx
git commit -m "feat: case-study hero/related/gallery use clean media (no chrome)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Delete the BrowserFrame component

**Files:**
- Delete: `src/components/ui/browser-frame.tsx`

- [ ] **Step 1: Confirm no remaining references**

Run: `grep -rn "browser-frame\|BrowserFrame" src/ tests/ || echo "NO REFERENCES"`
Expected: `NO REFERENCES`. If any remain, fix that file to use the `pf-card-media`/`pf-card-img` pattern before deleting.

- [ ] **Step 2: Delete the file**

Run: `git rm src/components/ui/browser-frame.tsx`

- [ ] **Step 3: Typecheck + build**

Run: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20 && npx tsc --noEmit 2>&1 | grep -E "^src/" || echo "src clean"; npm run build 2>&1 | grep -iE "Compiled successfully|error" | head`
Expected: `src clean` and `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove obsolete BrowserFrame component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Full verification + user approval gate

**Files:** none (verification only)

- [ ] **Step 1: Typecheck, lint, build**

Run:
```
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20
npx tsc --noEmit 2>&1 | grep -E "^src/" || echo "src clean"
npm run lint 2>&1 | grep -E "src/(components|app)/(ui/portfolio-card|sections/bento-portfolio-grid|sections/portfolio-preview|portfolio/\[slug\]/case-study-client|ui/image-gallery)" || echo "no NEW lint vs baseline in changed files"
npm run build 2>&1 | grep -iE "Compiled successfully|error|LCP|priority" | grep -ivE "prerendered" | head
```
Expected: `src clean`; no new lint beyond the known repo-wide `setState-in-effect` baseline; `✓ Compiled successfully`; no LCP/priority warnings.

- [ ] **Step 2: Run the full reconciled suites**

Rebuild + restart server. Run: `... npx playwright test tests/portfolio-grid.spec.ts tests/case-study.spec.ts --reporter=line`
Expected: portfolio-grid green; case-study at the Task 6 Step 1 baseline (pre-existing environmental failures only — `invalid slug 404` ×2, mobile lightbox arrow — explicitly not regressions).

- [ ] **Step 3: Reduced-motion + LCP checks (Playwright MCP)**

- `emulateMedia({ reducedMotion: 'reduce' })` → `/portfolio`: 14 cards visible, no `pf-reveal` stuck hidden (CSS reduced-motion rule shows them), filters work.
- LCP PerformanceObserver on `/portfolio`: confirm no Next.js missing-priority console warning; first 4 card images have `priority`.

- [ ] **Step 4: Visual QA at 1440 and 390 (Playwright MCP)**

Navigate `http://localhost:3000/portfolio`, resize 1440×900, scroll in steps with waits (ScrollTrigger needs real scroll), full-page screenshot. Repeat at 390×844. Also `/portfolio/cooltech-international` (hero clean media, gallery no mockups, related clean) and `/` homepage preview. Confirm: spacious 2-up, clean media, text below, desaturate→color hover (desktop), single-column 4:3 calm mobile, scroll-reveal fires, zero browser chrome anywhere.

- [ ] **Step 5: User approval gate (hard stop)**

Present the desktop + mobile screenshots to the user. **Do not merge/PR until the user explicitly approves the live look.** If changes requested, return to the relevant task.

- [ ] **Step 6: Push + PR (only after approval)**

```bash
git push -u origin feat/portfolio-editorial-redesign
gh pr create --base main --head feat/portfolio-editorial-redesign \
  --title "Portfolio editorial 2-up redesign" \
  --body "Implements docs/superpowers/specs/2026-05-17-portfolio-editorial-redesign-design.md. Replaces browser-chrome framed grid with spacious editorial 2-up: clean media, text below, scroll-reveal, dedicated mobile, flat screenshots, BrowserFrame removed. Verification: portfolio-grid green; case-study at pre-existing baseline; reduced-motion + LCP verified; visual QA approved.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```
Do not merge (user merges; the prior monitoring pattern applies if requested).

---

## Self-Review

**Spec coverage:**
- Layout 2-up uniform → Task 4 ✓ · Header/filters kept → Task 4 (unchanged pills) ✓ · Clean card + hover → Tasks 2,3 ✓ · Scroll-reveal motion → Tasks 2,4 ✓ · Mobile 4:3 single-col → Task 2 CSS media query + Task 4 grid ✓ · Image swap + Al Shahama → Task 1 ✓ · Q by Rayeesa review → see note below · BrowserFrame retired site-wide → Tasks 3,5,6,7 ✓ · Test reconciliation → Tasks 1,3,4 ✓ · Verification/approval gate → Task 8 ✓.
- **Gap found & fixed:** spec's "Q by Rayeesa: review" had no task. It already uses flat `qbyrayeesa.webp` (not a `-mockup`), so Task 1 correctly leaves it unchanged; the visual QA in Task 8 Step 4 covers judging it on the live grid — if it reads as a lifestyle composite there, swap to `/portfolio/qbyrayeesa-2.webp` and re-verify. No separate task needed; called out here.

**Placeholder scan:** No TBD/TODO; every code step shows full code; commands have expected output. The `text-[11px]` arbitrary class carries an explicit fallback instruction (Task 3 Step 3).

**Type consistency:** `PortfolioCard` prop shape (`project`, `index`, `priority`) is consistent between Task 3 (definition) and Task 4 (usage). `pf-card-media` / `pf-card-img` / `pf-card-rule` / `pf-reveal` / `is-in` class names are identical across Tasks 2, 3, 4, 5, 6. `data-reveal` (Task 4 markup) matches the `[data-reveal]` selector (Task 4 GSAP). `layoutDependency={activeFilter}` consistent with the prior shipped fix.
