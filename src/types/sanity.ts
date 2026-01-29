// Sanity document types for type-safe queries
// These types correspond to the Sanity schemas in src/sanity/schemas/

import type { PortableTextBlock } from '@portabletext/types'

// Base types
export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityReference<T = unknown> {
  _type: 'reference'
  _ref: string
  _weak?: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: SanityReference
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
  caption?: string
}

// Project types - matches src/sanity/schemas/project.ts
export type ProjectCategory = 'web' | 'mobile' | 'platform' | 'ecommerce'

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: SanitySlug
  client?: string
  category: ProjectCategory
  featuredImage: SanityImage
  gallery?: SanityImage[]
  excerpt?: string
  challenge?: PortableTextBlock[]
  solution?: PortableTextBlock[]
  results?: PortableTextBlock[]
  technologies?: string[]
  testimonial?: SanityReference<Testimonial>
  featured?: boolean
  publishedAt?: string
}

// Expanded project with resolved references for detail pages
export interface ProjectDetail extends Omit<Project, 'testimonial'> {
  testimonial?: Testimonial
}

// Service types - matches src/sanity/schemas/service.ts
export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: SanitySlug
  icon?: string
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  features?: string[]
  technologies?: string[]
  order?: number
}

// Job types - placeholder for Story 7-3
export interface Job {
  _id: string
  _type: 'job'
  title: string
  slug: SanitySlug
  department?: string
  location?: string
  type?: string
  experience?: string
  shortDescription?: string
  publishedAt?: string
}

export interface JobDetail extends Job {
  fullDescription?: PortableTextBlock[]
  responsibilities?: string[]
  requirements?: string[]
  niceToHave?: string[]
  benefits?: string[]
  active?: boolean
}

// Team types - placeholder for Story 7-3
export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role?: string
  image?: SanityImage
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

// Testimonial types - matches src/sanity/schemas/testimonial.ts
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  author: string
  role?: string
  company?: string
  image?: SanityImage
}

// Blog types - placeholder for Story 7-4
export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: SanitySlug
  excerpt?: string
  featuredImage?: SanityImage
  author?: SanityReference<TeamMember>
  categories?: string[]
  publishedAt?: string
}

export interface BlogPostDetail extends Omit<BlogPost, 'author'> {
  content?: PortableTextBlock[]
  author?: TeamMember
}
