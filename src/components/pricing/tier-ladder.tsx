"use client";

import { cn } from "@/lib/utils";
import { TIERS } from "@/lib/pricing";
import { TierCard } from "./tier-card";
import { useSnapRow } from "./use-snap-row";

const DEFAULT_INDEX = Math.max(
  0,
  TIERS.findIndex((tier) => tier.isDefault)
);

/**
 * The five build tiers as one ladder.
 *
 * There is a single DOM for every viewport — a scroll-snap carousel below
 * 768px, a two-column grid to 1280px, five columns side by side above it (see
 * `.pr-ladder` in globals.css). One DOM, because the ladder's order is
 * load-bearing: it must read cheapest → dearest everywhere, and duplicating
 * the markup per breakpoint would put five extra `[data-tier]` nodes on the
 * page and two "Most chosen" badges in the accessibility tree.
 *
 * On a phone the carousel opens on Growth rather than on Launchpad: the
 * middle of the ladder is where the comparison starts.
 */
export function TierLadder() {
  const { scrollerRef, setItemRef, active, isCarousel, scrollToIndex } =
    useSnapRow(DEFAULT_INDEX);

  return (
    <div>
      <div className="pr-ladder" data-hscroll ref={scrollerRef}>
        {TIERS.map((tier, index) => (
          <div key={tier.id} data-tier={tier.id} ref={setItemRef(index)}>
            <TierCard
              tier={tier}
              ctaHref="/contact"
              ctaLabel={
                tier.isDefault ? `Start with ${tier.name}` : `Choose ${tier.name}`
              }
            />
          </div>
        ))}
      </div>

      {/* Carousel controls — only meaningful while the ladder actually
          scrolls, i.e. on a phone. */}
      <div
        className={cn(
          "mt-6 flex items-center justify-center gap-4 md:hidden",
          !isCarousel && "hidden"
        )}
      >
        <div className="flex items-center gap-1">
          {TIERS.map((tier, index) => (
            <button
              key={tier.id}
              type="button"
              aria-label={`Show ${tier.name}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => scrollToIndex(index, true)}
              // Padding, not size: the dot is 8px but the tap target is 24px.
              className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pr-dot block h-2 rounded-full",
                  index === active ? "w-5 bg-coral-500" : "w-2 bg-white/25"
                )}
              />
            </button>
          ))}
        </div>
        <span className="pr-eyebrow font-mono uppercase text-foreground-subtle">
          Swipe to compare
        </span>
      </div>
    </div>
  );
}
