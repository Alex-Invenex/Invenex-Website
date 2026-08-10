"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import type { CarePlan } from "@/lib/pricing";

export function CarePlanCard({
  plan,
  className,
}: {
  plan: CarePlan;
  className?: string;
}) {
  const isDefault = Boolean(plan.isDefault);

  return (
    <article
      data-default={plan.isDefault ? "true" : undefined}
      className={cn(
        "relative flex flex-col rounded-3xl p-8",
        isDefault
          ? "border border-coral-500/40 bg-coral-500/[0.04] shadow-[0_0_60px_rgba(255,106,55,0.12)] lg:scale-[1.03] lg:-translate-y-2"
          : "glass border border-white/10",
        className
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,106,55,0.4)]">
          {plan.badge}
        </span>
      )}

      <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
        {plan.responseTime}
      </p>

      <h3 className="mt-3 text-2xl font-light text-foreground">{plan.name}</h3>

      <div className="mt-6">
        <Price
          amount={plan.price}
          suffix="/mo"
          className="text-4xl font-light text-gradient-orange"
        />
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {plan.features.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-coral-500"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {isDefault && (
        <p className="mt-8 text-sm text-foreground-muted">
          First month included in Growth and Platform builds.
        </p>
      )}
    </article>
  );
}
