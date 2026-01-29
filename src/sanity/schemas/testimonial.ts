import { defineField, defineType } from 'sanity'

// Story 7-4: Expanded testimonial schema for managing social proof
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
      description: 'Optional link to the project this testimonial relates to',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
      description: 'Star rating out of 5',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in homepage marquee?',
      initialValue: false,
      validation: (Rule) => Rule.required(),
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
