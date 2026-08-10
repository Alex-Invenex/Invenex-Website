/**
 * Site-wide configuration that is not derived from pricing data and is not
 * safe to compute automatically.
 */

/**
 * Build-slot availability shown by `SlotCounter`.
 *
 * IMPORTANT — read before touching this object:
 * - `slotsRemaining` is MANUALLY MAINTAINED. It must always be true. There is
 *   no cron job, no booking hook, and no other code path that decrements it
 *   -- and none should ever be added. If you wire up auto-decrementing logic
 *   here you will eventually publish a number nobody checked, which breaks
 *   the honesty guarantee the copy deck calls for (see §8: "Must always be
 *   true. If it would read 4 of 4, either show that honestly or hide the
 *   component.").
 * - Set it to `null` to hide the counter entirely (e.g. between quarters, or
 *   whenever the true count is unknown/stale). Do not set it to a guess.
 */
export const availability = {
  quarter: "Q4 2026",
  slotsTotal: 4,
  slotsRemaining: null as number | null,
};

/** Razorpay payment-link for the Blueprint, wired via env with a null fallback. */
export const razorpayBlueprintUrl =
  process.env.NEXT_PUBLIC_RAZORPAY_BLUEPRINT_LINK ?? null;

/** Cal.com (or equivalent) booking link for the 15-minute fit call. */
export const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? null;
