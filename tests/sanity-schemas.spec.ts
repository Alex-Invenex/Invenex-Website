import { test, expect } from '@playwright/test'
import { project } from '../src/sanity/schemas/project'
import { service } from '../src/sanity/schemas/service'
import { blockContent } from '../src/sanity/schemas/blockContent'
import { testimonial } from '../src/sanity/schemas/testimonial'

test.describe('Sanity Content Schemas - Story 7-2', () => {
  test.describe('AC1: Project Schema Validation', () => {
    test('should have correct document type configuration', () => {
      expect(project.name).toBe('project')
      expect(project.title).toBe('Project')
      expect(project.type).toBe('document')
    })

    test('should have title field (string, required)', () => {
      const titleField = project.fields.find((f) => f.name === 'title')
      expect(titleField).toBeDefined()
      expect(titleField?.type).toBe('string')
      // Validation rule exists
      expect(titleField?.validation).toBeDefined()
    })

    test('should have slug field (auto-generated from title)', () => {
      const slugField = project.fields.find((f) => f.name === 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('slug')
      expect(slugField?.options?.source).toBe('title')
    })

    test('should have client field (string)', () => {
      const clientField = project.fields.find((f) => f.name === 'client')
      expect(clientField).toBeDefined()
      expect(clientField?.type).toBe('string')
    })

    test('should have category field with correct options', () => {
      const categoryField = project.fields.find((f) => f.name === 'category')
      expect(categoryField).toBeDefined()
      expect(categoryField?.type).toBe('string')
      const options = categoryField?.options?.list?.map(
        (item: { value: string }) => item.value
      )
      expect(options).toContain('web')
      expect(options).toContain('mobile')
      expect(options).toContain('platform')
      expect(options).toContain('ecommerce')
    })

    test('should have featuredImage field (image with hotspot)', () => {
      const imageField = project.fields.find((f) => f.name === 'featuredImage')
      expect(imageField).toBeDefined()
      expect(imageField?.type).toBe('image')
      expect(imageField?.options?.hotspot).toBe(true)
    })

    test('should have gallery field (array of images)', () => {
      const galleryField = project.fields.find((f) => f.name === 'gallery')
      expect(galleryField).toBeDefined()
      expect(galleryField?.type).toBe('array')
      expect(galleryField?.of?.[0]?.type).toBe('image')
    })

    test('should have challenge field (block content)', () => {
      const challengeField = project.fields.find((f) => f.name === 'challenge')
      expect(challengeField).toBeDefined()
      expect(challengeField?.type).toBe('blockContent')
    })

    test('should have solution field (block content)', () => {
      const solutionField = project.fields.find((f) => f.name === 'solution')
      expect(solutionField).toBeDefined()
      expect(solutionField?.type).toBe('blockContent')
    })

    test('should have results field (block content)', () => {
      const resultsField = project.fields.find((f) => f.name === 'results')
      expect(resultsField).toBeDefined()
      expect(resultsField?.type).toBe('blockContent')
    })

    test('should have technologies field (array of strings)', () => {
      const techField = project.fields.find((f) => f.name === 'technologies')
      expect(techField).toBeDefined()
      expect(techField?.type).toBe('array')
      expect(techField?.of?.[0]?.type).toBe('string')
    })

    test('should have testimonial field (reference)', () => {
      const testimonialField = project.fields.find(
        (f) => f.name === 'testimonial'
      )
      expect(testimonialField).toBeDefined()
      expect(testimonialField?.type).toBe('reference')
      expect(testimonialField?.to?.[0]?.type).toBe('testimonial')
    })

    test('should have featured field (boolean)', () => {
      const featuredField = project.fields.find((f) => f.name === 'featured')
      expect(featuredField).toBeDefined()
      expect(featuredField?.type).toBe('boolean')
    })

    test('should have publishedAt field (datetime)', () => {
      const dateField = project.fields.find((f) => f.name === 'publishedAt')
      expect(dateField).toBeDefined()
      expect(dateField?.type).toBe('datetime')
    })

    test('should have all 14 required fields', () => {
      const requiredFieldNames = [
        'title',
        'slug',
        'client',
        'category',
        'featuredImage',
        'gallery',
        'excerpt',
        'challenge',
        'solution',
        'results',
        'technologies',
        'testimonial',
        'featured',
        'publishedAt',
      ]
      const actualFieldNames = project.fields.map((f) => f.name)
      requiredFieldNames.forEach((fieldName) => {
        expect(actualFieldNames).toContain(fieldName)
      })
    })
  })

  test.describe('AC2: Service Schema Validation', () => {
    test('should have correct document type configuration', () => {
      expect(service.name).toBe('service')
      expect(service.title).toBe('Service')
      expect(service.type).toBe('document')
    })

    test('should have title field (string, required)', () => {
      const titleField = service.fields.find((f) => f.name === 'title')
      expect(titleField).toBeDefined()
      expect(titleField?.type).toBe('string')
      expect(titleField?.validation).toBeDefined()
    })

    test('should have slug field (auto-generated)', () => {
      const slugField = service.fields.find((f) => f.name === 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('slug')
      expect(slugField?.options?.source).toBe('title')
    })

    test('should have icon field (string)', () => {
      const iconField = service.fields.find((f) => f.name === 'icon')
      expect(iconField).toBeDefined()
      expect(iconField?.type).toBe('string')
    })

    test('should have shortDescription field (text)', () => {
      const descField = service.fields.find((f) => f.name === 'shortDescription')
      expect(descField).toBeDefined()
      expect(descField?.type).toBe('text')
    })

    test('should have fullDescription field (block content)', () => {
      const descField = service.fields.find((f) => f.name === 'fullDescription')
      expect(descField).toBeDefined()
      expect(descField?.type).toBe('blockContent')
    })

    test('should have features field (array of strings)', () => {
      const featuresField = service.fields.find((f) => f.name === 'features')
      expect(featuresField).toBeDefined()
      expect(featuresField?.type).toBe('array')
      expect(featuresField?.of?.[0]?.type).toBe('string')
    })

    test('should have technologies field (array of strings)', () => {
      const techField = service.fields.find((f) => f.name === 'technologies')
      expect(techField).toBeDefined()
      expect(techField?.type).toBe('array')
      expect(techField?.of?.[0]?.type).toBe('string')
    })

    test('should have order field (number)', () => {
      const orderField = service.fields.find((f) => f.name === 'order')
      expect(orderField).toBeDefined()
      expect(orderField?.type).toBe('number')
    })

    test('should have all 8 required fields', () => {
      const requiredFieldNames = [
        'title',
        'slug',
        'icon',
        'shortDescription',
        'fullDescription',
        'features',
        'technologies',
        'order',
      ]
      const actualFieldNames = service.fields.map((f) => f.name)
      requiredFieldNames.forEach((fieldName) => {
        expect(actualFieldNames).toContain(fieldName)
      })
    })

    test('should have ordering configuration', () => {
      expect(service.orderings).toBeDefined()
      expect(service.orderings?.length).toBeGreaterThan(0)
      const orderAsc = service.orderings?.find((o) => o.name === 'orderAsc')
      expect(orderAsc).toBeDefined()
    })
  })

  test.describe('Block Content Schema Validation', () => {
    test('should have correct type configuration', () => {
      expect(blockContent.name).toBe('blockContent')
      expect(blockContent.type).toBe('array')
    })

    test('should support text styles', () => {
      const blockMember = blockContent.of?.find(
        (m: { type: string }) => m.type === 'block'
      )
      expect(blockMember).toBeDefined()
      const styles = blockMember?.styles?.map(
        (s: { value: string }) => s.value
      )
      expect(styles).toContain('normal')
      expect(styles).toContain('h2')
      expect(styles).toContain('h3')
      expect(styles).toContain('blockquote')
    })

    test('should support lists', () => {
      const blockMember = blockContent.of?.find(
        (m: { type: string }) => m.type === 'block'
      )
      const lists = blockMember?.lists?.map((l: { value: string }) => l.value)
      expect(lists).toContain('bullet')
      expect(lists).toContain('number')
    })

    test('should support text decorators', () => {
      const blockMember = blockContent.of?.find(
        (m: { type: string }) => m.type === 'block'
      )
      const decorators = blockMember?.marks?.decorators?.map(
        (d: { value: string }) => d.value
      )
      expect(decorators).toContain('strong')
      expect(decorators).toContain('em')
      expect(decorators).toContain('code')
    })

    test('should support link annotations', () => {
      const blockMember = blockContent.of?.find(
        (m: { type: string }) => m.type === 'block'
      )
      const linkAnnotation = blockMember?.marks?.annotations?.find(
        (a: { name: string }) => a.name === 'link'
      )
      expect(linkAnnotation).toBeDefined()
    })

    test('should support embedded images', () => {
      const imageMember = blockContent.of?.find(
        (m: { type: string }) => m.type === 'image'
      )
      expect(imageMember).toBeDefined()
      expect(imageMember?.options?.hotspot).toBe(true)
    })
  })

  test.describe('Testimonial Schema Validation (minimal for reference)', () => {
    test('should have correct document type configuration', () => {
      expect(testimonial.name).toBe('testimonial')
      expect(testimonial.type).toBe('document')
    })

    test('should have required quote field', () => {
      const quoteField = testimonial.fields.find((f) => f.name === 'quote')
      expect(quoteField).toBeDefined()
      expect(quoteField?.type).toBe('text')
    })

    test('should have required author field', () => {
      const authorField = testimonial.fields.find((f) => f.name === 'author')
      expect(authorField).toBeDefined()
      expect(authorField?.type).toBe('string')
    })
  })

  test.describe('Studio Integration', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('Studio route loads without schema errors', async ({ page }) => {
      const schemaErrors: string[] = []
      page.on('console', (msg) => {
        const text = msg.text().toLowerCase()
        if (
          msg.type() === 'error' &&
          (text.includes('schema') ||
            text.includes('unknown type') ||
            text.includes('blockcontent'))
        ) {
          schemaErrors.push(msg.text())
        }
      })

      await page.goto('/studio')
      await page.waitForLoadState('networkidle')

      expect(schemaErrors).toHaveLength(0)
    })
  })
})
