import { z } from 'zod';
import { featureIndex, trackIndex, timelineOptions } from '@/lib/scope-catalog';

const timelineValues = timelineOptions.map((t) => t.value) as string[];

/**
 * Schema for a /build-your-project submission.
 *
 * Track and feature IDs are validated against the catalog, so the server never
 * renders a label the browser supplied — it looks every ID up in scope-catalog
 * and uses the title stored there.
 */
export const scopeRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(200, 'Email is too long'),
  phone: z.string().trim().max(40, 'Phone number is too long').optional(),
  company: z.string().trim().max(120, 'Company name is too long').optional(),
  timeline: z
    .string()
    .trim()
    .refine((v) => v === '' || timelineValues.includes(v), 'Invalid timeline')
    .optional(),
  existingUrl: z
    .string()
    .trim()
    .max(300, 'URL is too long')
    .optional(),
  notes: z.string().trim().max(4000, 'Please keep notes under 4000 characters').optional(),
  tracks: z
    .array(z.string())
    .min(1, 'Choose at least one service')
    .max(20)
    .refine(
      (ids) => ids.every((id) => trackIndex.has(id)),
      'Unknown service selected'
    ),
  features: z
    .array(z.string())
    .min(1, 'Select at least one feature')
    .max(500)
    .refine(
      (ids) => ids.every((id) => featureIndex.has(id)),
      'Unknown feature selected'
    ),
});

export type ScopeRequestData = z.infer<typeof scopeRequestSchema>;

/** Parses the JSON string the client sends for tracks/features. Never throws. */
export function parseIdList(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== 'string' || raw === '') return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === 'string');
  } catch {
    return [];
  }
}
