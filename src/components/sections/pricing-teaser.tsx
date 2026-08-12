"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Price } from "@/components/pricing/price";
import { TIERS, type TierId } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * Pricing teaser — the homepage's compact preview of `/pricing`.
 *
 * Three tiers only, one promise line each, one link out. The full sheet lives
 * on `/pricing`; this exists so a visitor learns the prices are published
 * before they have to go looking.
 *
 * Growth is deliberately dominant (badge, coral border, scaled up): the
 * contrast is what makes it the smart default rather than the middle option.
 *
 * Client component because `<Price>` reads the currency context — but the
 * price still renders on the server, since `CurrencyProvider` is seeded from
 * `getCurrency()` in the page. No `[data-animate]` here: this section must
 * never depend on a GSAP timeline to become visible.
 */

const TEASER_TIER_IDS: TierId[] = ["launch", "growth", "platform"];

const TEASER_TIERS = TEASER_TIER_IDS.map((id) => {
  const tier = TIERS.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown tier id: ${id}`);
  return tier;
});

export function PricingTeaser() {
  return (
    <section
      className="relative bg-background py-20 md:py-28"
      aria-labelledby="pricing-teaser-title"
      data-testid="pricing-teaser-section"
    >
      {/* Coral background wash — matches the neighbouring sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-coral-500/[0.03] blur-[150px]"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted md:text-sm">
              {"// Pricing"}
            </p>
            <h2
              id="pricing-teaser-title"
              className="mt-5 leading-[0.95] tracking-[-0.03em]"
            >
              <span className="block text-xl font-extralight text-foreground/50 md:text-2xl">
                Published.
              </span>
              <span
                className="mt-1 block text-3xl font-black md:text-5xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-coral-500) 0%, var(--color-coral-400) 40%, var(--color-coral-600) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Fixed.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted">
              What moves is scope, not the number. No quote call required.
            </p>
          </div>

          <Link
            href="/pricing"
            data-testid="pricing-teaser-link"
            className="group inline-flex items-center gap-2 self-start text-foreground-muted transition-colors hover:text-foreground md:self-auto"
          >
            <span>See all pricing</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Three mini-cards. Growth is the middle one and the loud one. */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:items-center">
          {TEASER_TIERS.map((tier) => {
            const isDefault = Boolean(tier.isDefault);
            return (
              <article
                key={tier.id}
                data-tier={tier.id}
                data-default={isDefault ? "true" : undefined}
                className={cn(
                  "relative flex flex-col rounded-2xl p-6 md:p-7",
                  isDefault
                    ? "border border-coral-500/40 bg-coral-500/[0.04] shadow-[0_0_60px_rgba(255,106,55,0.12)] md:scale-[1.05] md:py-10"
                    : "glass border border-white/10"
                )}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,106,55,0.4)]">
                    {tier.badge}
                  </span>
                )}

                <h3 className="text-lg font-light text-foreground md:text-xl">
                  {tier.name}
                </h3>

                <Price
                  amount={tier.price}
                  className="mt-3 text-3xl font-light text-gradient-orange md:text-4xl"
                />

                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                  {tier.promise}
                </p>

                <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-foreground-subtle">
                  {tier.timeline}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
