import type { SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { blogContent } from './blogContent'
import { project } from './project'
import { service } from './service'
import { testimonial } from './testimonial'
import { job } from './job'
import { teamMember } from './teamMember'
import { blogPost } from './blogPost'
import { category } from './category'

// Central export for all content schemas
// Story 7-2: Projects, Services, blockContent
// Story 7-3: Jobs, Team schemas
// Story 7-4: Testimonials (expanded), Blog schemas, Category

export const schemaTypes: SchemaTypeDefinition[] = [
  // Utility schemas - reusable content types
  blockContent,
  blogContent,

  // Document schemas - Story 7-2
  project,
  service,

  // Story 7-3: Jobs, Team schemas
  job,
  teamMember,

  // Story 7-4: Testimonials (expanded), Blog schemas
  testimonial,
  blogPost,
  category,
]
