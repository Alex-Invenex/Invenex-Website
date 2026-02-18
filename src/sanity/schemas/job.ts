import { defineField, defineType } from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
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
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Design', value: 'design' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Operations', value: 'operations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Thrissur", "Remote", "Hybrid"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Junior (0-2 years)', value: 'junior' },
          { title: 'Mid (2-5 years)', value: 'mid' },
          { title: 'Senior (5+ years)', value: 'senior' },
          { title: 'Lead (7+ years)', value: 'lead' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'blockContent',
      description: 'Detailed role description',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Must-have qualifications',
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Day-to-day duties',
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Required technologies (for engineering roles)',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'salary',
      title: 'Salary Range',
      type: 'string',
      description: 'Optional salary range (e.g., "₹8-15 LPA")',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this position currently open?',
      initialValue: true,
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      active: 'active',
    },
    prepare({ title, department, active }) {
      return {
        title,
        subtitle: `${department} ${active ? '✓ Active' : '✗ Closed'}`,
      }
    },
  },
})
