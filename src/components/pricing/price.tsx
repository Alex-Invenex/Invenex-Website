"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/currency-provider";
import { formatPrice } from "@/lib/format-price";
import type { PriceSet } from "@/lib/pricing";
import { useCountUp } from "./use-count-up";

export function Price({
  amount,
  suffix,
  className,
  animate = false,
}: {
  amount: PriceSet;
  suffix?: string;
  className?: string;
  /**
   * Count the figure up once, the first time it scrolls into view. The
   * rendered text is always the real, final price — the animation only
   * borrows the text node (see `useCountUp`), so the server HTML, the
   * hydrated DOM and a visitor with JavaScript off all show the published
   * number.
   */
  animate?: boolean;
}) {
  const { currency } = useCurrency();
  const value = amount[currency];
  // The suffix travels with the number: `useCountUp` rewrites the whole text
  // node, so anything left outside it would be dropped mid-animation.
  const formatted = `${formatPrice(value, currency)}${suffix ?? ""}`;

  const format = useCallback(
    (n: number) => `${formatPrice(n, currency)}${suffix ?? ""}`,
    [currency, suffix]
  );

  const numberRef = useCountUp({
    target: value,
    format,
    enabled: animate,
    mode: "view",
  });

  // The figure is NOT keyed on the currency. A key would remount the span on
  // every switch, and a remount resets `useCountUp`'s "already played" flag —
  // so every visible price on the page re-rolled from zero each time the
  // reader compared INR with USD. The node is now stable for the life of the
  // page: React rewrites its text in place, the count-up plays once, and a
  // currency switch is an immediate swap under a short crossfade (below).
  useCurrencyCrossfade(numberRef, currency);

  return (
    <span
      ref={numberRef}
      // The published string, kept where the count-up can put it back.
      data-count-final={formatted}
      className={cn("pr-price-in", className)}
    >
      {formatted}
    </span>
  );
}

/**
 * Replays the 200ms `pr-price-in` fade when — and only when — the currency
 * changes.
 *
 * The fade used to come free with the `key={currency}` remount that this
 * component no longer does. Restarting the animation by hand keeps the visual
 * softening without touching the text: the price is swapped by React in the
 * same frame, so the reader never sees a partial or an empty figure, only a
 * brief dip in opacity (the keyframe starts at 0.25, never at 0).
 */
function useCurrencyCrossfade(
  ref: RefObject<HTMLSpanElement | null>,
  currency: string
): void {
  const mounted = useRef(false);

  useEffect(() => {
    // Skip the first pass: the class is already on the element from the
    // server, and its mount animation has run.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = ref.current;
    if (!el) return;

    el.classList.remove("pr-price-in");
    // Forced reflow — the one reliable way to restart a CSS animation.
    void el.offsetWidth;
    el.classList.add("pr-price-in");
  }, [ref, currency]);
}
