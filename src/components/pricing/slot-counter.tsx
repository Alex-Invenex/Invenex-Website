import { cn } from "@/lib/utils";
import { availability } from "@/lib/site-config";

/**
 * "Q4 2026 — N of 4 build slots remaining."
 *
 * `slotsRemaining` is manually maintained in `site-config.ts` — this
 * component never computes, decrements, or times anything. When the value is
 * `null` the counter renders nothing, which is the deliberate way to hide it
 * (see the copy deck: "If it would read 4 of 4, either show that honestly or
 * hide the component.").
 */
export function SlotCounter({ className }: { className?: string } = {}) {
  const { quarter, slotsTotal, slotsRemaining } = availability;

  if (slotsRemaining === null) {
    return null;
  }

  return (
    <p
      data-testid="slots"
      className={cn(
        "font-mono text-body-sm uppercase tracking-[0.14em] text-foreground-muted",
        className
      )}
    >
      {quarter} — {slotsRemaining} of {slotsTotal} build slots remaining.
    </p>
  );
}
