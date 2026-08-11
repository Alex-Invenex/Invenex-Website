"use client";

import { cn } from "@/lib/utils";
import { CARE_PLANS } from "@/lib/pricing";
import { CarePlanCard } from "./care-plan-card";
import { useSnapRow } from "./use-snap-row";

const DEFAULT_INDEX = Math.max(
  0,
  CARE_PLANS.findIndex((plan) => plan.isDefault)
);

/**
 * The three Care Plans: a carousel on a phone, three-up above `md`.
 *
 * Same gesture as the build ladder, and the same rule — cheapest → dearest in
 * the DOM, opened on the plan that is actually included with a Growth build.
 */
export function CarePlanRow() {
  const { scrollerRef, setItemRef, active, isCarousel, scrollToIndex } =
    useSnapRow(DEFAULT_INDEX);

  return (
    <div>
      <div className="pr-row" data-hscroll ref={scrollerRef}>
        {CARE_PLANS.map((plan, index) => (
          <CarePlanCard key={plan.id} plan={plan} ref={setItemRef(index)} />
        ))}
      </div>

      <div
        className={cn(
          "mt-4 flex items-center justify-center gap-4 md:hidden",
          !isCarousel && "hidden"
        )}
      >
        <div className="flex items-center gap-1">
          {CARE_PLANS.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              aria-label={`Show ${plan.name}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => scrollToIndex(index, true)}
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
