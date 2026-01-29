import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-01-29',
  useCdn: false, // for ISR/tag-based revalidation
})

/**
 * Server-side fetch with tag-based on-demand revalidation (Story 7-5)
 *
 * Uses Next.js cache tags for on-demand revalidation via webhook.
 * When Sanity content changes, the webhook calls revalidateTag() to
 * invalidate the cache for affected document types.
 *
 * @example
 * // Fetch all projects with tag-based caching
 * const projects = await sanityFetch<Project[]>({
 *   query: projectsQuery,
 *   tags: ['project'],
 * })
 *
 * @example
 * // Fetch specific project with granular tag
 * const project = await sanityFetch<Project>({
 *   query: projectBySlugQuery,
 *   params: { slug: 'my-project' },
 *   tags: ['project', 'project:my-project'],
 * })
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
      revalidate: false, // Use on-demand revalidation only via webhook
    },
  })
}
