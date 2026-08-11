"use client";

import { cn } from "@/lib/utils";
import { Price } from "./price";
import type { PriceSet } from "@/lib/pricing";

/**
 * One published price, as a card rather than a spreadsheet row.
 *
 * The four "everything else" sheets used to be full-width tables: eight-word
 * rows stretched across 1400px with the price marooned on the far right. A
 * card keeps the name, the scope and the number inside one glance, and three
 * of them across a row read as a comparable set — which is what a price sheet
 * is for.
 */
export function RateCard({
  name,
  eyebrow,
  detail,
  chips,
  price,
  suffix,
  className,
}: {
  name: string;
  /** Mono line above the name — a timeline, a cadence, a minimum term. */
  eyebrow?: string;
  /** One line of scope. */
  detail?: string;
  chips?: string[];
  price: PriceSet;
  suffix?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "pr-rate glass flex flex-col rounded-2xl border border-white/10 p-4 sm:p-5",
        className
      )}
    >
      {eyebrow && (
        <p className="pr-eyebrow font-mono uppercase text-foreground-muted">
          {eyebrow}
        </p>
      )}

      <div className="mt-1.5 flex items-start justify-between gap-4">
        <h4 className="pr-display text-base font-medium leading-snug text-foreground">
          {name}
        </h4>
        <Price
          amount={price}
          suffix={suffix}
          animate
          className="pr-display shrink-0 whitespace-nowrap text-lg font-light text-gradient-orange"
        />
      </div>

      {detail && (
        <p className="mt-2.5 pr-item text-foreground-muted">{detail}</p>
      )}

      {chips && chips.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <li
              key={chip}
              className="pr-tag rounded-full border border-white/10 bg-surface-overlay px-2.5 py-1 text-foreground-muted"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
