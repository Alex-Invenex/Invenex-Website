import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

// IMPORTANT: These values are hardcoded because sanity.config.ts is bundled
// for the client-side Studio and environment variable resolution can be
// inconsistent during the Sanity Studio build process.
// If you change the project, update BOTH here AND in .env.local:
// - NEXT_PUBLIC_SANITY_PROJECT_ID
// - NEXT_PUBLIC_SANITY_DATASET
const SANITY_PROJECT_ID = 'enl6t2el'
const SANITY_DATASET = 'production'

export default defineConfig({
  name: 'invenex',
  title: 'Invenex Solutions',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
