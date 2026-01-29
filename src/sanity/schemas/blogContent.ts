import { defineType, defineArrayMember } from 'sanity'

// Story 7-4: Blog-specific rich text content with code blocks and callouts
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
          validation: (Rule: { required: () => unknown }) => Rule.required(),
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
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
      ],
    }),
  ],
})
