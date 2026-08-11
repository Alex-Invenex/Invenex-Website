"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import type { CarePlan } from "@/lib/pricing";

export function CarePlanCard({
  plan,
  className,
  ref,
}: {
  plan: CarePlan;
  className?: string;
  /** Set by `CarePlanRow` so the carousel can measure this card. */
  ref?: React.Ref<HTMLElement>;
}) {
  const isDefault = Boolean(plan.isDefault);

  return (
    <article
      ref={ref}
      data-default={plan.isDefault ? "true" : undefined}
      className={cn(
        "pr-tier relative flex flex-col rounded-2xl p-6 md:p-7",
        isDefault
          ? "border border-coral-500/45 bg-coral-500/[0.05] pr-lift shadow-[0_0_60px_rgba(255,106,55,0.14)]"
          : "glass border border-white/10",
        className
      )}
    >
      {plan.badge && (
        <span className="pr-badge absolute -top-3 left-6 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-3 py-1 font-semibold uppercase text-white shadow-[0_0_20px_rgba(255,106,55,0.4)]">
          {plan.badge}
        </span>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="pr-display text-xl font-medium text-foreground">
          {plan.name}
        </h3>
        <p className="pr-eyebrow font-mono uppercase text-foreground-muted">
          {plan.responseTime}
        </p>
      </div>

      <div className="mt-4">
        <Price
          amount={plan.price}
          suffix="/mo"
          animate
          className="pr-display pr-price text-gradient-orange"
        />
      </div>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/5 pt-5">
        {plan.features.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 pr-item text-foreground"
          >
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral-500"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {isDefault && (
        <p className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4 pr-item text-foreground-muted">
          First month included in Growth and Platform builds.
        </p>
      )}
    </article>
  );
}
