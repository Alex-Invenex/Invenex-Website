"use client";

import { cn } from "@/lib/utils";
import { CURRENCIES, type Currency } from "@/lib/currency";
import { useCurrency } from "@/components/providers/currency-provider";

const CURRENCY_LABELS: Record<Currency, string> = {
  INR: "₹ INR",
  AED: "AED",
  USD: "$ USD",
};

// Note: stored-choice-beats-initial and corrupt-value-falls-back are both
// guaranteed by `CurrencyProvider`'s own mount-time reconciliation effect,
// which runs regardless of whether a toggle is mounted anywhere in the tree.
// Duplicating that reconciliation here would just be a second, redundant
// policy racing the provider's -- the toggle only needs to read and write
// context.
export function CurrencyToggle({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const activeIndex = Math.max(0, CURRENCIES.indexOf(currency));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-body-sm text-foreground-muted">
        Showing prices in
      </span>
      <div
        role="group"
        aria-label="Currency"
        className="pr-seg border border-white/10 bg-surface-overlay"
      >
        {/* The active state is a pill that slides between the three options,
            so the toggle reads as one control rather than three buttons. It
            is decorative: `aria-pressed` below is what assistive tech uses. */}
        <span
          aria-hidden="true"
          className="pr-seg-pill"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {CURRENCIES.map((c) => {
          const active = c === currency;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCurrency(c)}
              className={cn(
                "relative z-10 rounded-full px-3 py-1.5 font-mono text-body-sm font-medium transition-colors duration-normal",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "text-white"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {CURRENCY_LABELS[c]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
