"use client";

import { useCallback } from "react";
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

  return (
    // Keyed on the currency so switching sheets crossfades the figure rather
    // than swapping it mid-glance.
    <span
      key={currency}
      ref={numberRef}
      // The published string, kept where the count-up can put it back.
      data-count-final={formatted}
      className={cn("pr-price-in", className)}
    >
      {formatted}
    </span>
  );
}
