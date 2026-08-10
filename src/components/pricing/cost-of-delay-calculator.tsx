"use client";

import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useCurrency } from "@/components/providers/currency-provider";
import { formatPrice } from "@/lib/format-price";

/** The benchmark this calculator measures a site's conversion rate against. */
const BENCHMARK_CONVERSION_RATE = 3;

export interface CostOfDelayInputs {
  visitors: number;
  rate: number;
  aov: number;
}

/**
 * Pure gap calculation: how much monthly revenue a site is estimated to be
 * leaving on the table versus a `BENCHMARK_CONVERSION_RATE`% conversion rate.
 *
 * Never negative -- a site already beating the benchmark has no gap, not a
 * "negative loss". This is an honesty guard: we don't invent a loss that
 * isn't there.
 */
export function calculateGap({ visitors, rate, aov }: CostOfDelayInputs): number {
  const benchmarkRevenue = visitors * (BENCHMARK_CONVERSION_RATE / 100) * aov;
  const currentRevenue = visitors * (rate / 100) * aov;
  return Math.max(0, benchmarkRevenue - currentRevenue);
}

interface FieldState {
  visitors: string;
  rate: string;
  aov: string;
}

function toFieldState(initial?: Partial<CostOfDelayInputs>): FieldState {
  return {
    visitors: initial?.visitors !== undefined ? String(initial.visitors) : "",
    rate: initial?.rate !== undefined ? String(initial.rate) : "",
    aov: initial?.aov !== undefined ? String(initial.aov) : "",
  };
}

export function CostOfDelayCalculator({
  initial,
  className,
}: {
  /** Prefills the three inputs -- primarily for tests and demos. */
  initial?: Partial<CostOfDelayInputs>;
  className?: string;
}) {
  const { currency } = useCurrency();
  const [fields, setFields] = useState<FieldState>(() => toFieldState(initial));

  const visitors = Number(fields.visitors);
  const rate = Number(fields.rate);
  const aov = Number(fields.aov);

  const hasAllInputs =
    fields.visitors.trim() !== "" &&
    fields.rate.trim() !== "" &&
    fields.aov.trim() !== "" &&
    Number.isFinite(visitors) &&
    Number.isFinite(rate) &&
    Number.isFinite(aov);

  const gap = hasAllInputs ? calculateGap({ visitors, rate, aov }) : null;

  function handleChange(field: keyof FieldState) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFields((prev) => ({ ...prev, [field]: value }));
    };
  }

  return (
    <div
      className={cn(
        "glass rounded-2xl border border-white/10 p-6 md:p-8",
        className
      )}
    >
      <h3 className="text-h5 font-semibold text-foreground">
        What is your current site costing you?
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Input
          label="Monthly visitors to your site"
          type="number"
          inputMode="numeric"
          min={0}
          value={fields.visitors}
          onChange={handleChange("visitors")}
        />
        <Input
          label="Your current conversion rate (%)"
          type="number"
          inputMode="decimal"
          min={0}
          step="0.1"
          value={fields.rate}
          onChange={handleChange("rate")}
        />
        <Input
          label="Your average order or enquiry value (₹)"
          type="number"
          inputMode="numeric"
          min={0}
          value={fields.aov}
          onChange={handleChange("aov")}
        />
      </div>

      {gap !== null && (
        <p
          data-testid="cod-output"
          className="mt-6 text-body-lg text-foreground"
        >
          {gap > 0 ? (
            <>
              Your site may be leaving approximately{" "}
              <strong className="text-coral-500">
                {formatPrice(gap, currency)} per month
              </strong>{" "}
              on the table, compared with a typical 3% conversion rate.
            </>
          ) : (
            <>
              Your site is converting well — better than the typical
              benchmark. You may not need a rebuild. If you&rsquo;d still
              like a second opinion, the fit call is free.
            </>
          )}
        </p>
      )}

      <p className="mt-4 text-body-sm text-foreground-subtle">
        3% is a general benchmark for e-commerce and lead-generation sites.
        Your industry may differ. This is an estimate to think with, not a
        promise.
      </p>
    </div>
  );
}
