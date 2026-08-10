"use client";

import { useCurrency } from "@/components/providers/currency-provider";
import { formatPrice } from "@/lib/format-price";
import type { PriceSet } from "@/lib/pricing";

export function Price({
  amount,
  suffix,
  className,
}: {
  amount: PriceSet;
  suffix?: string;
  className?: string;
}) {
  const { currency } = useCurrency();
  return (
    <span className={className}>
      {formatPrice(amount[currency], currency)}
      {suffix}
    </span>
  );
}
