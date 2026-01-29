import { groq } from 'next-sanity'

// Project queries
export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    category,
    featuredImage,
    excerpt,
    technologies
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    category,
    featuredImage,
    gallery,
    challenge,
    solution,
    results,
    technologies,
    testimonial->,
    publishedAt
  }
`

// Service queries
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    shortDescription,
    technologies
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    icon,
    shortDescription,
    longDescription,
    features,
    technologies,
    processSteps
  }
`

// Job queries
export const jobsQuery = groq`
  *[_type == "job" && active == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    department,
    location,
    type,
    experience,
    shortDescription,
    publishedAt
  }
`

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    department,
    location,
    type,
    experience,
    shortDescription,
    fullDescription,
    responsibilities,
    requirements,
    niceToHave,
    benefits,
    active,
    publishedAt
  }
`

// Team member queries
export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    image,
    bio,
    socialLinks
  }
`

// Testimonial queries
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    image
  }
`

// Blog queries (for future use)
export const blogPostsQuery = groq`
  *[_type == "blogPost" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->,
    categories,
    publishedAt
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
    author->,
    categories,
    publishedAt
  }
`
