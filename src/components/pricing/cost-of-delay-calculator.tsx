"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/currency-provider";
import { formatPrice } from "@/lib/format-price";
import type { Currency } from "@/lib/currency";
import { useCountUp } from "./use-count-up";

/** The benchmark this calculator measures a site's conversion rate against. */
const BENCHMARK_CONVERSION_RATE = 3;

/**
 * Unit shown after the "average order value" label. It follows the active
 * currency: a Gulf visitor asked for a figure "(₹)" would either enter the
 * wrong number or conclude the whole page is an India price list.
 */
const CURRENCY_UNIT: Record<Currency, string> = {
  INR: "₹",
  AED: "AED",
  USD: "$",
};

/** Slider bounds. The number field is always authoritative — see `Field`. */
const VISITORS_MAX = 100_000;
const VISITORS_STEP = 500;
const RATE_MAX = 10;
const RATE_STEP = 0.1;

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
  const gapText = gap !== null ? formatPrice(gap, currency) : "";

  // The figure counts from its previous value to the new one as the sliders
  // move — but only ever by rewriting the text node, so the first render
  // (and the server's) is always the exact number. See `useCountUp`.
  const formatGap = useCallback(
    (n: number) => formatPrice(n, currency),
    [currency]
  );

  const gapRef = useCountUp({
    target: gap ?? 0,
    format: formatGap,
    enabled: gap !== null && gap > 0,
    mode: "change",
    duration: 420,
  });

  function handleChange(field: keyof FieldState) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFields((prev) => ({ ...prev, [field]: value }));
    };
  }

  return (
    <div
      className={cn(
        "glass grid gap-6 rounded-2xl border border-white/10 p-5 md:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10",
        className
      )}
    >
      {/* ── Inputs ──────────────────────────────────────── */}
      <div>
        <h3 className="pr-display text-h5 font-medium text-foreground">
          What is your current site costing you?
        </h3>

        <div className="mt-5 flex flex-col gap-5">
          {/* Explicit ids: a derived id would change every time the currency
              unit changes and break the label/field association mid-session. */}
          <Field
            id="cod-visitors"
            label="Monthly visitors to your site"
            value={fields.visitors}
            onChange={handleChange("visitors")}
            inputMode="numeric"
            placeholder="0"
            slider={{
              ariaLabel: "Monthly visitors (slider)",
              max: VISITORS_MAX,
              step: VISITORS_STEP,
            }}
          />
          <Field
            id="cod-rate"
            label="Your current conversion rate (%)"
            value={fields.rate}
            onChange={handleChange("rate")}
            inputMode="decimal"
            placeholder="0.0"
            step={RATE_STEP}
            slider={{
              ariaLabel: "Conversion rate (slider)",
              max: RATE_MAX,
              step: RATE_STEP,
            }}
          />
          <Field
            id="cod-aov"
            label={`Your average order or enquiry value (${CURRENCY_UNIT[currency]})`}
            value={fields.aov}
            onChange={handleChange("aov")}
            inputMode="numeric"
            placeholder="0"
            hint="Whatever one customer is worth to you, on average."
          />
        </div>
      </div>

      {/* ── Output ──────────────────────────────────────── */}
      <div className="flex flex-col justify-center rounded-2xl border border-coral-500/25 bg-coral-500/[0.04] p-5 md:p-6">
        <p className="pr-eyebrow font-mono uppercase text-foreground-muted">
          The monthly gap
        </p>

        {gap !== null ? (
          <p
            data-testid="cod-output"
            className="mt-4 text-body-lg leading-relaxed text-foreground"
          >
            {gap > 0 ? (
              <>
                Your site may be leaving approximately{" "}
                <strong className="font-normal text-coral-500">
                  <span
                    ref={gapRef}
                    data-count-final={gapText}
                    className="pr-display block text-h3 font-light leading-none"
                  >
                    {gapText}
                  </span>{" "}
                  per month
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
        ) : (
          <div className="mt-4">
            <span
              aria-hidden="true"
              className="pr-display block text-h3 font-light leading-none text-foreground-subtle/40"
            >
              &mdash;
            </span>
            <p className="mt-3 text-body-lg leading-relaxed text-foreground-subtle">
              Put your three numbers in and the estimate appears here.
            </p>
          </div>
        )}

        <p className="mt-6 border-t border-white/10 pt-4 text-body-sm text-foreground-subtle">
          3% is a general benchmark for e-commerce and lead-generation sites.
          Your industry may differ. This is an estimate to think with, not a
          promise.
        </p>
      </div>
    </div>
  );
}

/**
 * A labelled number field with an optional slider bound to the same value.
 *
 * The number input carries the label and the id — it is the accessible
 * control, and the one a screen reader or a keyboard user reaches. The slider
 * is a second, coarse way to drive the same state, named separately so it
 * never collides with the field's label.
 */
function Field({
  id,
  label,
  value,
  onChange,
  inputMode,
  step,
  slider,
  hint,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputMode: "numeric" | "decimal";
  step?: number;
  placeholder?: string;
  slider?: { ariaLabel: string; max: number; step: number };
  hint?: ReactNode;
}) {
  const numeric = Number(value);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  const sliderValue = slider ? Math.min(Math.max(safe, 0), slider.max) : 0;
  const fill = slider ? (sliderValue / slider.max) * 100 : 0;

  return (
    <div>
      {/* Never wraps: on a 375px screen a wrapped number field reads as an
          empty pill floating under a sentence. */}
      <div className="flex items-center gap-4">
        <label
          htmlFor={id}
          className="min-w-0 flex-1 text-body-sm font-medium leading-snug text-foreground"
        >
          {label}
        </label>
        <input
          id={id}
          type="number"
          inputMode={inputMode}
          min={0}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "w-24 shrink-0 rounded-lg border border-border bg-background-secondary px-3 py-2 text-right text-body font-medium text-foreground placeholder:text-foreground-subtle",
            "transition-colors duration-normal focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
          )}
        />
      </div>

      {slider && (
        <input
          type="range"
          aria-label={slider.ariaLabel}
          min={0}
          max={slider.max}
          step={slider.step}
          value={sliderValue}
          onChange={onChange}
          className="pr-range mt-1 w-full"
          style={{ "--pr-fill": `${fill}%` } as CSSProperties}
        />
      )}

      {hint && (
        <p className="mt-1 pr-item text-foreground-subtle">{hint}</p>
      )}
    </div>
  );
}
