"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface PricingSection {
  id: string;
  label: string;
}

/**
 * The map for a long page.
 *
 * `/pricing` publishes six separate price sheets; without a map it is a
 * single unbroken scroll and a visitor who came for the app prices has to
 * hunt for them. The bar sticks under the navbar, scrolls sideways on a
 * phone, and marks where the reader currently is.
 */
export function PricingSectionNav({
  sections,
  className,
}: {
  sections: PricingSection[];
  className?: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section occupying the middle band of the viewport wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  // Keep the active chip in view on a phone — by moving the bar's own scroll
  // offset only, never the page's.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const chip = chipRefs.current[active];
    if (!scroller || !chip) return;
    if (scroller.scrollWidth <= scroller.clientWidth + 1) return;

    const scrollerBox = scroller.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    const delta =
      chipBox.left - scrollerBox.left - (scrollerBox.width - chipBox.width) / 2;
    scroller.scrollTo({
      left: scroller.scrollLeft + delta,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <div className={cn("pr-subnav", className)}>
      {/* `pr-subnav-bar` carries the touch-device fallback: globals.css nulls
          backdrop-filter on coarse pointers, and an 85%-opaque bar with no
          blur behind it is just a smear of the content sliding under it. */}
      <div className="pr-subnav-bar border-y border-white/10 bg-background/85 backdrop-blur-xl">
        <div className="container mx-auto px-6 md:px-12">
          <nav aria-label="Pricing sections">
            <div
              ref={scrollerRef}
              data-hscroll
              className="pr-subnav-scroll flex items-center gap-1.5 py-2.5"
            >
              {sections.map((section) => {
                const isActive = section.id === active;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    ref={(node) => {
                      chipRefs.current[section.id] = node;
                    }}
                    onClick={(event) => {
                      // Modifier clicks belong to the browser: cmd/ctrl opens a
                      // new tab, shift a new window. The href is a real
                      // `#anchor`, so bailing out before `preventDefault` hands
                      // those gestures back intact.
                      if (event.metaKey || event.ctrlKey || event.shiftKey) {
                        return;
                      }
                      const target = document.getElementById(section.id);
                      if (!target) return;
                      event.preventDefault();
                      cancelAnimationFrame(frame.current);
                      scrollToSection(target, frame);
                      // A scripted scroll moves the viewport but NOT the
                      // sequential-focus starting point — a native hash jump
                      // would have moved both. Without this, Tab after a chip
                      // click continues from the chip and walks the reader
                      // back through the map instead of into the section they
                      // just asked for.
                      target.setAttribute("tabindex", "-1");
                      target.focus({ preventScroll: true });
                      history.replaceState(null, "", `#${section.id}`);
                      setActive(section.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "pr-chip shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "border-coral-500/60 bg-coral-500/15 text-coral-500"
                        : "border-transparent text-foreground-muted hover:border-white/15 hover:text-foreground"
                    )}
                  >
                    {section.label}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

/** Navbar (80px) + this bar (~52px) + a little air. */
const SCROLL_OFFSET = 148;
const SCROLL_DURATION = 700;

/**
 * Scrolls the page to a section, by hand.
 *
 * The href is a real `#anchor` — it works with JavaScript off — but Lenis
 * owns the scroll position on desktop and resets a native hash jump (and any
 * `behavior: 'smooth'` call) back to where it was on the next frame. Driving
 * `window.scrollTo(0, y)` from a rAF loop is the one form Lenis accepts,
 * because each frame looks to it like an ordinary scroll event.
 *
 * `frameRef` is kept pointing at the live frame so a second click — or an
 * unmount — can cancel a scroll already in flight.
 *
 * The animation also yields to the reader: 700ms is long enough that a wheel
 * or a swipe arrives mid-flight, and a scripted scroll that fights the user's
 * own input for half a second reads as a broken page. One-shot `wheel` and
 * `touchstart` listeners abort the loop and then take themselves off.
 */
function scrollToSection(
  target: HTMLElement,
  frameRef: { current: number }
): void {
  const destination =
    target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  if (prefersReducedMotion()) {
    window.scrollTo(0, destination);
    return;
  }

  const start = window.scrollY;
  const t0 = performance.now();

  let cancelled = false;
  const detach = () => {
    window.removeEventListener("wheel", abort);
    window.removeEventListener("touchstart", abort);
  };
  // Named so `detach` can remove whichever of the pair did not fire. The
  // listeners are added during `click`, which on a touch device happens
  // *after* the tap's own `touchstart` — so the tap never aborts itself.
  function abort() {
    cancelled = true;
    cancelAnimationFrame(frameRef.current);
    detach();
  }
  window.addEventListener("wheel", abort, { passive: true, once: true });
  window.addEventListener("touchstart", abort, { passive: true, once: true });

  const step = (now: number) => {
    if (cancelled) return;
    // Clamped at both ends: a rAF timestamp can predate the
    // `performance.now()` taken a moment earlier in the same frame.
    const t = Math.min(1, Math.max(0, (now - t0) / SCROLL_DURATION));
    const eased = 1 - Math.pow(1 - t, 3);
    window.scrollTo(0, Math.round(start + (destination - start) * eased));
    if (t < 1) {
      frameRef.current = requestAnimationFrame(step);
      return;
    }
    detach();
  };
  frameRef.current = requestAnimationFrame(step);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  if (typeof window.matchMedia !== "function") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
