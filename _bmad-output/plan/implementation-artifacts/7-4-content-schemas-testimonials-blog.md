# Story 7.4: Content Schemas - Testimonials & Blog

Status: ready-for-dev

## Story

As an **admin**,
I want **schemas for testimonials and future blog posts**,
So that **I can manage social proof and content marketing**.

## Acceptance Criteria

### AC1: Testimonial Schema
**Given** I need a Testimonial schema
**When** it's defined in Sanity
**Then** it includes fields for:
- Client name (string, required)
- Client role (string)
- Company (string)
- Quote (text, required)
- Photo (image, optional)
- Project reference (optional)
- Featured flag (boolean)

### AC2: Blog Post Schema
**Given** I need a Blog Post schema (for Growth phase)
**When** it's defined in Sanity
**Then** it includes fields for:
- Title (string, required)
- Slug (auto-generated)
- Excerpt (text)
- Featured image (image)
- Content (block content with code blocks)
- Author (reference to team member)
- Categories (array of strings)
- Published date
- SEO fields (meta title, description)

## Tasks / Subtasks

- [ ] Task 1: Create Testimonial Schema (AC: 1)
  - [ ] Create `src/sanity/schemas/testimonial.ts`
  - [ ] Define all fields
  - [ ] Add to schema index

- [ ] Task 2: Create Blog Post Schema (AC: 2)
  - [ ] Create `src/sanity/schemas/blogPost.ts`
  - [ ] Define all fields including SEO
  - [ ] Add to schema index

- [ ] Task 3: Create Category Schema (AC: 2)
  - [ ] Create `src/sanity/schemas/category.ts`
  - [ ] Add to schema index

- [ ] Task 4: Update Schema Index
  - [ ] Export all new schemas

## Dev Notes

### Testimonial Schema

```tsx
// src/sanity/schemas/testimonial.ts
import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientRole',
      title: 'Client Role',
      type: 'string',
      description: 'e.g., "CEO", "Founder", "Marketing Director"',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'project',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in homepage marquee?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      company: 'company',
      media: 'photo',
    },
    prepare({ title, company, media }) {
      return {
        title,
        subtitle: company,
        media,
      }
    },
  },
})
```

### Blog Post Schema

```tsx
// src/sanity/schemas/blogPost.ts
import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary for cards and SEO',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blogContent',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time',
    }),
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Override default title for search engines',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: '150-160 characters recommended',
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Override featured image for social sharing',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `by ${author}` : 'No author',
        media,
      }
    },
  },
})
```

### Blog Content Schema (with Code Blocks)

```tsx
// src/sanity/schemas/blogContent.ts
import { defineType, defineArrayMember } from 'sanity'

export const blogContent = defineType({
  title: 'Blog Content',
  name: 'blogContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      name: 'code',
      title: 'Code Block',
      type: 'object',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JSX', value: 'jsx' },
              { title: 'TSX', value: 'tsx' },
              { title: 'CSS', value: 'css' },
              { title: 'HTML', value: 'html' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' },
              { title: 'SQL', value: 'sql' },
              { title: 'Python', value: 'python' },
            ],
          },
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
        },
        {
          name: 'filename',
          title: 'Filename',
          type: 'string',
          description: 'Optional filename to display',
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Tip', value: 'tip' },
              { title: 'Note', value: 'note' },
            ],
          },
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
        },
      ],
    }),
  ],
})
```

### Category Schema

```tsx
// src/sanity/schemas/category.ts
import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
})
```

### GROQ Queries

```tsx
// src/lib/sanity/queries.ts (add to existing)

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    clientName,
    clientRole,
    company,
    quote,
    photo,
    rating,
    featured
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    clientName,
    clientRole,
    company,
    quote,
    photo,
    rating
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{name, photo},
    categories[]->{title, slug},
    publishedAt,
    readTime
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    author->{name, role, photo, linkedIn},
    categories[]->{title, slug},
    publishedAt,
    readTime,
    seo
  }
`
```

### TypeScript Types

```tsx
// src/types/sanity.ts (add to existing)

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  clientName: string
  clientRole?: string
  company?: string
  quote: string
  photo?: Image
  project?: Project
  rating?: number
  featured: boolean
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: Slug
  description?: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: Slug
  excerpt?: string
  featuredImage?: Image
  content?: PortableTextBlock[]
  author?: TeamMember
  categories?: Category[]
  publishedAt?: string
  readTime?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: Image
  }
}
```

### Update Schema Index

```tsx
// src/sanity/schemas/index.ts
import { project } from './project'
import { service } from './service'
import { job } from './job'
import { teamMember } from './teamMember'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { blogContent } from './blogContent'
import { category } from './category'
import { blockContent } from './blockContent'

export const schemaTypes = [
  project,
  service,
  job,
  teamMember,
  testimonial,
  blogPost,
  blogContent,
  category,
  blockContent,
]
```

### Architecture Compliance

| Decision | Implementation |
|----------|----------------|
| Featured flag | For homepage marquee selection |
| SEO object | Nested fields for overrides |
| Code blocks | Custom portable text type |
| References | Team member and category references |

### Testing Checklist

- [ ] Testimonial schema visible in Studio
- [ ] Blog post schema visible in Studio
- [ ] Code blocks render in preview
- [ ] Category references work
- [ ] Author references work
- [ ] SEO fields are editable

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Completion Notes List

### File List
