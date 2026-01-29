import type { SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { project } from './project'
import { service } from './service'
import { testimonial } from './testimonial'

// Central export for all content schemas
// Story 7-2: Projects, Services, blockContent, Testimonial (minimal for reference)
// Story 7-3: Jobs, Team schemas (to be added)
// Story 7-4: Testimonials (expand), Blog schemas (to be added)

export const schemaTypes: SchemaTypeDefinition[] = [
  // Utility schemas
  blockContent,

  // Document schemas - Story 7-2
  project,
  service,
  testimonial, // Minimal schema for Project reference support

  // Story 7-3: Jobs, Team schemas will be added here
  // Story 7-4: Testimonials (expand), Blog schemas will be added here
]
