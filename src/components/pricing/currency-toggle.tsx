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

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-body-sm text-foreground-muted">
        Showing prices in
      </span>
      <div
        role="group"
        aria-label="Currency"
        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface-overlay p-1"
      >
        {CURRENCIES.map((c) => {
          const active = c === currency;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCurrency(c)}
              className={cn(
                "rounded-full px-3 py-1.5 font-mono text-body-sm font-medium transition-colors duration-normal",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "border border-coral-500 bg-coral-500/10 text-coral-500"
                  : "border border-transparent text-foreground-muted hover:border-white/10 hover:text-foreground"
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
