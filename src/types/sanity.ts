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

// Job types - Story 7-3
export type JobDepartment = 'engineering' | 'design' | 'marketing' | 'operations'
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship'
export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'lead'

export interface Job {
  _id: string
  _type: 'job'
  title: string
  slug: SanitySlug
  department: JobDepartment
  location: string
  employmentType: EmploymentType
  experienceLevel: ExperienceLevel
  description?: PortableTextBlock[]
  requirements?: string[]
  responsibilities?: string[]
  techStack?: string[]
  salary?: string
  active: boolean
  postedAt: string
}

// Team types - Story 7-3
export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role: string
  photo?: SanityImage
  bio?: string
  linkedIn?: string
  twitter?: string
  github?: string
  order?: number
  active: boolean
}

// Testimonial types - Story 7-4 expanded schema
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  clientName: string
  clientRole?: string
  company?: string
  quote: string
  photo?: SanityImage
  project?: SanityReference<Project>
  rating?: number
  featured: boolean
}

// Expanded testimonial with resolved project reference
export interface TestimonialDetail extends Omit<Testimonial, 'project'> {
  project?: Project
}

// Category types - Story 7-4
export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: SanitySlug
  description?: string
}

// Blog types - Story 7-4
export interface BlogPostSeo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: SanitySlug
  excerpt?: string
  featuredImage?: SanityImage
  content?: PortableTextBlock[]
  author?: SanityReference<TeamMember>
  categories?: SanityReference<Category>[]
  publishedAt?: string
  readTime?: number
  seo?: BlogPostSeo
}

// Expanded blog post with resolved references for detail pages
export interface BlogPostDetail extends Omit<BlogPost, 'author' | 'categories'> {
  author?: TeamMember
  categories?: Category[]
}

// Blog content block types for code blocks and callouts
export interface CodeBlock {
  _type: 'code'
  language?: string
  code?: string
  filename?: string
}

export interface Callout {
  _type: 'callout'
  type?: 'info' | 'warning' | 'tip' | 'note'
  content?: string
}
