"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import type { Tier } from "@/lib/pricing";

/**
 * How many "includes" a card shows before the rest go behind a disclosure.
 * Four is what fits above the fold of a 1280px five-across ladder — the point
 * of the card is that five prices can be compared in one glance, and a
 * ten-item list on one column and a two-item list on another destroys that.
 *
 * Exclusions are NEVER collapsed. They are the reason a serious buyer moves
 * up a tier by themselves, so they stay in the open on every viewport.
 */
const VISIBLE_INCLUDES = 4;

/**
 * The default tier shows two more, because it is the tallest card in the row
 * anyway and a half-empty hero card reads as an unfinished one.
 */
const VISIBLE_INCLUDES_DEFAULT = 6;

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
  // The default tier opens with its full list showing: it is the card the
  // page is built around, and in a five-across row it is what balances the
  // height of the entry tiers' exclusion blocks.
  const [expanded, setExpanded] = useState(isDefault);
  const detailsId = useId();

  const limit = isDefault ? VISIBLE_INCLUDES_DEFAULT : VISIBLE_INCLUDES;
  const head = tier.includes.slice(0, limit);
  const rest = tier.includes.slice(limit);

  return (
    <article
      data-default={tier.isDefault ? "true" : undefined}
      className={cn(
        "pr-tier relative flex w-full flex-col rounded-2xl p-5 md:p-6",
        isDefault
          ? "border border-coral-500/45 bg-coral-500/[0.05] shadow-[0_0_60px_rgba(255,106,55,0.14)]"
          : "glass border border-white/10",
        className
      )}
    >
      {tier.badge && (
        <span className="pr-badge absolute -top-3 left-5 rounded-full bg-gradient-to-r from-coral-500 to-coral-700 px-3 py-1 font-semibold uppercase text-white shadow-[0_0_20px_rgba(255,106,55,0.4)]">
          {tier.badge}
        </span>
      )}

      {/* Head — fixed height above md so every price in the row lands on one
          visual line and the ladder can be read across, not down. */}
      <div className="pr-tier-head">
        <p className="pr-eyebrow font-mono uppercase text-foreground-muted">
          {tier.timeline}
        </p>

        <h3 className="pr-display mt-2 text-xl font-medium text-foreground">
          {tier.name}
        </h3>

        <p className="mt-2 text-sm leading-snug text-foreground-muted">
          {tier.promise}
        </p>
      </div>

      <div className="mt-4">
        <Price
          amount={tier.price}
          animate
          className="pr-display pr-price text-gradient-orange"
        />
      </div>

      <Link
        href={ctaHref}
        className={cn(
          "pr-tier-cta mt-5 inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all duration-normal",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isDefault
            ? "bg-gradient-to-r from-coral-500 to-coral-700 text-white shadow-[0_0_20px_rgba(255,106,55,0.3)] hover:shadow-[0_0_30px_rgba(255,106,55,0.5)]"
            : "border border-white/10 bg-surface-overlay text-foreground hover:border-white/25"
        )}
      >
        {ctaLabel ?? `Choose ${tier.name}`}
      </Link>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/5 pt-5">
        {head.map((item) => (
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

      {/* A native <details>, not a button + `hidden` list. The rest of the
          includes are part of what the tier costs, so they have to be
          reachable before hydration and with JavaScript off — a scripted
          disclosure hides them from both. `open` is still mirrored into
          React state (via `onToggle`) so the rest of the card can react to
          it, but the element itself is what holds the truth.

          No `aria-expanded` here on purpose: <summary> exposes its own
          expanded state, and a hand-written copy would go stale the moment
          the element is toggled without JavaScript. */}
      {rest.length > 0 && (
        <details
          className="pr-disclosure mt-3"
          open={expanded}
          onToggle={(event) => setExpanded(event.currentTarget.open)}
        >
          <summary
            aria-controls={detailsId}
            className="pr-disclosure-summary inline-flex cursor-pointer items-center gap-1.5 rounded-full py-1 text-xs font-medium text-coral-500 transition-colors duration-normal hover:text-coral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Both labels ship; CSS shows the one that matches [open], so
                the summary reads correctly with no JavaScript at all. */}
            <span className="pr-disclosure-more">Everything in detail</span>
            <span className="pr-disclosure-less">Show less</span>
            <ChevronDown
              aria-hidden="true"
              className="pr-disclosure-icon h-3.5 w-3.5 transition-transform duration-normal motion-reduce:transition-none"
            />
          </summary>

          <ul id={detailsId} className="mt-3 flex flex-col gap-2.5">
            {rest.map((item) => (
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
        </details>
      )}

      {tier.excludes.length > 0 && (
        <>
          {/* Absorbs the slack in a stretched row, so the exclusion blocks
              line up along the bottom of the ladder rather than floating at
              three different heights. `mt-6` still guarantees a real gap when
              there is no slack to absorb. */}
          <div className="grow" aria-hidden="true" />

          <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
            <p className="pr-eyebrow font-mono uppercase text-foreground-muted">
              Not included — on purpose:
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {tier.excludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 pr-item text-foreground-muted"
                >
                  <X
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground-muted/60"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </article>
  );
}
