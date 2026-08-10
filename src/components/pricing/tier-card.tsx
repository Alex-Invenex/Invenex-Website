"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import type { Tier } from "@/lib/pricing";

export function TierCard({
  tier,
  ctaHref = "/contact",
  ctaLabel,
  className,
}: {
  tier: Tier;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}) {
  const isDefault = Boolean(tier.isDefault);

  return (
    <article
      data-default={tier.isDefault ? "true" : undefined}
      className={cn(
        "relative flex flex-col rounded-3xl p-8",
        isDefault
          ? "border border-coral-500/40 bg-coral-500/[0.04] shadow-[0_0_60px_rgba(255,106,55,0.12)] lg:scale-[1.03] lg:-translate-y-2"
          : "glass border border-white/10",
        className
      )}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,106,55,0.4)]">
          {tier.badge}
        </span>
      )}

      <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
        {tier.timeline}
      </p>

      <h3 className="mt-3 text-2xl font-light text-foreground">{tier.name}</h3>

      <p className="mt-2 text-sm text-foreground-muted">{tier.promise}</p>

      <div className="mt-6">
        <Price
          amount={tier.price}
          className="text-4xl font-light text-gradient-orange"
        />
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-coral-500"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {tier.excludes.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
            Not included — on purpose:
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {tier.excludes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground-muted"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted/60" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={ctaHref}
        className={cn(
          "mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all duration-normal",
          isDefault
            ? "bg-gradient-to-r from-coral-500 to-coral-700 text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)] shadow-[0_0_20px_rgba(255,106,55,0.3)]"
            : "border border-white/10 bg-surface-overlay text-foreground hover:border-white/20"
        )}
      >
        {ctaLabel ?? `Choose ${tier.name}`}
      </Link>
    </article>
  );
}
