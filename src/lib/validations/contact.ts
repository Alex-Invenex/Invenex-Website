import { z } from 'zod';

/**
 * Currency-agnostic budget band identifiers.
 *
 * These must stay in lockstep with `BudgetBand['value']` in `src/lib/pricing.ts`
 * (`getBudgetBands`) — that module is the source of truth for the per-currency
 * labels, this file only needs to know the stable identifiers to validate
 * against. Not imported directly so this validation module stays free of any
 * currency-formatting concerns.
 */
export const budgetBandValues = ['band-1', 'band-2', 'band-3', 'band-4'] as const;
export type BudgetBandValue = (typeof budgetBandValues)[number];

export const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  budget: z
    .string()
    .min(1, 'Please select a budget')
    .refine(
      (v) => (budgetBandValues as readonly string[]).includes(v),
      'Please select a valid budget'
    ),
  description: z
    .string()
    .min(1, "Please tell us what you're building")
    .min(10, "Please tell us a bit more about what you're building"),
  // Required (§11 / P2 in the copy deck): it's the only reliable channel
  // signal the business gets, so the form no longer treats it as optional.
  source: z.string().min(1, 'Please tell us how you heard about us'),
  // Which currency the visitor was looking at when they picked `budget`, so
  // the server can render the matching label in the notification emails.
  // Not itself validated against `Currency` here to avoid a currency.ts
  // dependency in this module — the action falls back to INR via
  // `isCurrency` for anything it doesn't recognise.
  currency: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
