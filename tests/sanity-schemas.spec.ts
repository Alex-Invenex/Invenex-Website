import { test, expect } from '@playwright/test'
import { project } from '../src/sanity/schemas/project'
import { service } from '../src/sanity/schemas/service'
import { blockContent } from '../src/sanity/schemas/blockContent'
import { testimonial } from '../src/sanity/schemas/testimonial'

// Type helper for accessing Sanity schema field properties at runtime
// Sanity's TypeScript types are strict but schemas have additional runtime properties
/* eslint-disable @typescript-eslint/no-explicit-any */
type SchemaField = {
  name: string
  type: string
  validation?: any
  options?: {
    source?: string
    list?: Array<{ title: string; value: string }>
    hotspot?: boolean
    layout?: string
  }
  of?: Array<{ type: string; options?: { hotspot?: boolean } }>
  to?: Array<{ type: string }>
  initialValue?: any
}

const getField = (fields: any[], name: string): SchemaField | undefined =>
  fields.find((f: SchemaField) => f.name === name)

const getBlockMember = (of: any[]): any =>
  of?.find((m: { type: string }) => m.type === 'block')
/* eslint-enable @typescript-eslint/no-explicit-any */

test.describe('Sanity Content Schemas - Story 7-2', () => {
  test.describe('AC1: Project Schema Validation', () => {
    test('should have correct document type configuration', () => {
      expect(project.name).toBe('project')
      expect(project.title).toBe('Project')
      expect(project.type).toBe('document')
    })

    test('should have title field (string, required)', () => {
      const titleField = getField(project.fields, 'title')
      expect(titleField).toBeDefined()
      expect(titleField?.type).toBe('string')
      // Validation rule exists
      expect(titleField?.validation).toBeDefined()
    })

    test('should have slug field (auto-generated from title)', () => {
      const slugField = getField(project.fields, 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('slug')
      expect(slugField?.options?.source).toBe('title')
    })

    test('should have client field (string)', () => {
      const clientField = getField(project.fields, 'client')
      expect(clientField).toBeDefined()
      expect(clientField?.type).toBe('string')
    })

    test('should have category field with correct options', () => {
      const categoryField = getField(project.fields, 'category')
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
      const imageField = getField(project.fields, 'featuredImage')
      expect(imageField).toBeDefined()
      expect(imageField?.type).toBe('image')
      expect(imageField?.options?.hotspot).toBe(true)
    })

    test('should have gallery field (array of images)', () => {
      const galleryField = getField(project.fields, 'gallery')
      expect(galleryField).toBeDefined()
      expect(galleryField?.type).toBe('array')
      expect(galleryField?.of?.[0]?.type).toBe('image')
    })

    test('should have challenge field (block content)', () => {
      const challengeField = getField(project.fields, 'challenge')
      expect(challengeField).toBeDefined()
      expect(challengeField?.type).toBe('blockContent')
    })

    test('should have solution field (block content)', () => {
      const solutionField = getField(project.fields, 'solution')
      expect(solutionField).toBeDefined()
      expect(solutionField?.type).toBe('blockContent')
    })

    test('should have results field (block content)', () => {
      const resultsField = getField(project.fields, 'results')
      expect(resultsField).toBeDefined()
      expect(resultsField?.type).toBe('blockContent')
    })

    test('should have technologies field (array of strings)', () => {
      const techField = getField(project.fields, 'technologies')
      expect(techField).toBeDefined()
      expect(techField?.type).toBe('array')
      expect(techField?.of?.[0]?.type).toBe('string')
    })

    test('should have testimonial field (reference)', () => {
      const testimonialField = getField(project.fields, 'testimonial')
      expect(testimonialField).toBeDefined()
      expect(testimonialField?.type).toBe('reference')
      expect(testimonialField?.to?.[0]?.type).toBe('testimonial')
    })

    test('should have featured field (boolean)', () => {
      const featuredField = getField(project.fields, 'featured')
      expect(featuredField).toBeDefined()
      expect(featuredField?.type).toBe('boolean')
    })

    test('should have publishedAt field (datetime)', () => {
      const dateField = getField(project.fields, 'publishedAt')
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
      const titleField = getField(service.fields, 'title')
      expect(titleField).toBeDefined()
      expect(titleField?.type).toBe('string')
      expect(titleField?.validation).toBeDefined()
    })

    test('should have slug field (auto-generated)', () => {
      const slugField = getField(service.fields, 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('slug')
      expect(slugField?.options?.source).toBe('title')
    })

    test('should have icon field (string)', () => {
      const iconField = getField(service.fields, 'icon')
      expect(iconField).toBeDefined()
      expect(iconField?.type).toBe('string')
    })

    test('should have shortDescription field (text)', () => {
      const descField = getField(service.fields, 'shortDescription')
      expect(descField).toBeDefined()
      expect(descField?.type).toBe('text')
    })

    test('should have fullDescription field (block content)', () => {
      const descField = getField(service.fields, 'fullDescription')
      expect(descField).toBeDefined()
      expect(descField?.type).toBe('blockContent')
    })

    test('should have features field (array of strings)', () => {
      const featuresField = getField(service.fields, 'features')
      expect(featuresField).toBeDefined()
      expect(featuresField?.type).toBe('array')
      expect(featuresField?.of?.[0]?.type).toBe('string')
    })

    test('should have technologies field (array of strings)', () => {
      const techField = getField(service.fields, 'technologies')
      expect(techField).toBeDefined()
      expect(techField?.type).toBe('array')
      expect(techField?.of?.[0]?.type).toBe('string')
    })

    test('should have order field (number)', () => {
      const orderField = getField(service.fields, 'order')
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
      const blockMember = getBlockMember(blockContent.of)
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
      const blockMember = getBlockMember(blockContent.of)
      const lists = blockMember?.lists?.map((l: { value: string }) => l.value)
      expect(lists).toContain('bullet')
      expect(lists).toContain('number')
    })

    test('should support text decorators', () => {
      const blockMember = getBlockMember(blockContent.of)
      const decorators = blockMember?.marks?.decorators?.map(
        (d: { value: string }) => d.value
      )
      expect(decorators).toContain('strong')
      expect(decorators).toContain('em')
      expect(decorators).toContain('code')
    })

    test('should support link annotations', () => {
      const blockMember = getBlockMember(blockContent.of)
      const linkAnnotation = blockMember?.marks?.annotations?.find(
        (a: { name: string }) => a.name === 'link'
      )
      expect(linkAnnotation).toBeDefined()
    })

    test('should support embedded images', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imageMember = (blockContent.of as any[])?.find(
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
      const quoteField = getField(testimonial.fields, 'quote')
      expect(quoteField).toBeDefined()
      expect(quoteField?.type).toBe('text')
    })

    test('should have required author field', () => {
      const authorField = getField(testimonial.fields, 'author')
      expect(authorField).toBeDefined()
      expect(authorField?.type).toBe('string')
    })
  })

  test.describe('AC1: Job Schema Validation - Story 7-3', () => {
    // Import will be added after schema creation
    let job: typeof import('../src/sanity/schemas/job').job

    test.beforeAll(async () => {
      // Dynamic import to allow test file to run before schema exists
      const jobModule = await import('../src/sanity/schemas/job')
      job = jobModule.job
    })

    test('should have correct document type configuration', () => {
      expect(job.name).toBe('job')
      expect(job.title).toBe('Job Listing')
      expect(job.type).toBe('document')
    })

    test('should have title field (string, required)', () => {
      const titleField = getField(job.fields, 'title')
      expect(titleField).toBeDefined()
      expect(titleField?.type).toBe('string')
      expect(titleField?.validation).toBeDefined()
    })

    test('should have slug field (auto-generated from title)', () => {
      const slugField = getField(job.fields, 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('slug')
      expect(slugField?.options?.source).toBe('title')
    })

    test('should have department field with correct options', () => {
      const deptField = getField(job.fields, 'department')
      expect(deptField).toBeDefined()
      expect(deptField?.type).toBe('string')
      const options = deptField?.options?.list?.map(
        (item: { value: string }) => item.value
      )
      expect(options).toContain('engineering')
      expect(options).toContain('design')
      expect(options).toContain('marketing')
      expect(options).toContain('operations')
    })

    test('should have location field (string, required)', () => {
      const locationField = getField(job.fields, 'location')
      expect(locationField).toBeDefined()
      expect(locationField?.type).toBe('string')
      expect(locationField?.validation).toBeDefined()
    })

    test('should have employmentType field with correct options', () => {
      const typeField = getField(job.fields, 'employmentType')
      expect(typeField).toBeDefined()
      expect(typeField?.type).toBe('string')
      const options = typeField?.options?.list?.map(
        (item: { value: string }) => item.value
      )
      expect(options).toContain('full-time')
      expect(options).toContain('part-time')
      expect(options).toContain('contract')
      expect(options).toContain('internship')
    })

    test('should have experienceLevel field with correct options', () => {
      const expField = getField(job.fields, 'experienceLevel')
      expect(expField).toBeDefined()
      expect(expField?.type).toBe('string')
      const options = expField?.options?.list?.map(
        (item: { value: string }) => item.value
      )
      expect(options).toContain('junior')
      expect(options).toContain('mid')
      expect(options).toContain('senior')
      expect(options).toContain('lead')
    })

    test('should have description field (block content)', () => {
      const descField = getField(job.fields, 'description')
      expect(descField).toBeDefined()
      expect(descField?.type).toBe('blockContent')
    })

    test('should have requirements field (array of strings)', () => {
      const reqField = getField(job.fields, 'requirements')
      expect(reqField).toBeDefined()
      expect(reqField?.type).toBe('array')
      expect(reqField?.of?.[0]?.type).toBe('string')
    })

    test('should have responsibilities field (array of strings)', () => {
      const respField = getField(job.fields, 'responsibilities')
      expect(respField).toBeDefined()
      expect(respField?.type).toBe('array')
      expect(respField?.of?.[0]?.type).toBe('string')
    })

    test('should have techStack field (array of strings with tags layout)', () => {
      const techField = getField(job.fields, 'techStack')
      expect(techField).toBeDefined()
      expect(techField?.type).toBe('array')
      expect(techField?.of?.[0]?.type).toBe('string')
      expect(techField?.options?.layout).toBe('tags')
    })

    test('should have active field (boolean with default true)', () => {
      const activeField = getField(job.fields, 'active')
      expect(activeField).toBeDefined()
      expect(activeField?.type).toBe('boolean')
      expect(activeField?.initialValue).toBe(true)
    })

    test('should have postedAt field (datetime)', () => {
      const dateField = getField(job.fields, 'postedAt')
      expect(dateField).toBeDefined()
      expect(dateField?.type).toBe('datetime')
    })

    test('should have salary field (string, optional)', () => {
      const salaryField = getField(job.fields, 'salary')
      expect(salaryField).toBeDefined()
      expect(salaryField?.type).toBe('string')
    })

    test('should have all 14 required fields from AC1', () => {
      const requiredFieldNames = [
        'title',
        'slug',
        'department',
        'location',
        'employmentType',
        'experienceLevel',
        'description',
        'requirements',
        'responsibilities',
        'techStack',
        'salary',
        'active',
        'postedAt',
      ]
      const actualFieldNames = job.fields.map((f) => f.name)
      requiredFieldNames.forEach((fieldName) => {
        expect(actualFieldNames).toContain(fieldName)
      })
    })

    test('should have preview configuration', () => {
      expect(job.preview).toBeDefined()
      expect(job.preview?.select?.title).toBe('title')
    })
  })

  test.describe('AC2: Team Member Schema Validation - Story 7-3', () => {
    let teamMember: typeof import('../src/sanity/schemas/teamMember').teamMember

    test.beforeAll(async () => {
      const teamModule = await import('../src/sanity/schemas/teamMember')
      teamMember = teamModule.teamMember
    })

    test('should have correct document type configuration', () => {
      expect(teamMember.name).toBe('teamMember')
      expect(teamMember.title).toBe('Team Member')
      expect(teamMember.type).toBe('document')
    })

    test('should have name field (string, required)', () => {
      const nameField = getField(teamMember.fields, 'name')
      expect(nameField).toBeDefined()
      expect(nameField?.type).toBe('string')
      expect(nameField?.validation).toBeDefined()
    })

    test('should have role field (string, required)', () => {
      const roleField = getField(teamMember.fields, 'role')
      expect(roleField).toBeDefined()
      expect(roleField?.type).toBe('string')
      expect(roleField?.validation).toBeDefined()
    })

    test('should have photo field (image with hotspot)', () => {
      const photoField = getField(teamMember.fields, 'photo')
      expect(photoField).toBeDefined()
      expect(photoField?.type).toBe('image')
      expect(photoField?.options?.hotspot).toBe(true)
    })

    test('should have bio field (text)', () => {
      const bioField = getField(teamMember.fields, 'bio')
      expect(bioField).toBeDefined()
      expect(bioField?.type).toBe('text')
    })

    test('should have linkedIn field (url)', () => {
      const linkedInField = getField(teamMember.fields, 'linkedIn')
      expect(linkedInField).toBeDefined()
      expect(linkedInField?.type).toBe('url')
    })

    test('should have twitter field (url)', () => {
      const twitterField = getField(teamMember.fields, 'twitter')
      expect(twitterField).toBeDefined()
      expect(twitterField?.type).toBe('url')
    })

    test('should have github field (url)', () => {
      const githubField = getField(teamMember.fields, 'github')
      expect(githubField).toBeDefined()
      expect(githubField?.type).toBe('url')
    })

    test('should have order field (number for sorting)', () => {
      const orderField = getField(teamMember.fields, 'order')
      expect(orderField).toBeDefined()
      expect(orderField?.type).toBe('number')
    })

    test('should have active field (boolean with default true)', () => {
      const activeField = getField(teamMember.fields, 'active')
      expect(activeField).toBeDefined()
      expect(activeField?.type).toBe('boolean')
      expect(activeField?.initialValue).toBe(true)
    })

    test('should have all 9 required fields from AC2', () => {
      const requiredFieldNames = [
        'name',
        'role',
        'photo',
        'bio',
        'linkedIn',
        'twitter',
        'github',
        'order',
        'active',
      ]
      const actualFieldNames = teamMember.fields.map((f) => f.name)
      requiredFieldNames.forEach((fieldName) => {
        expect(actualFieldNames).toContain(fieldName)
      })
    })

    test('should have ordering configuration', () => {
      expect(teamMember.orderings).toBeDefined()
      expect(teamMember.orderings?.length).toBeGreaterThan(0)
      const orderAsc = teamMember.orderings?.find((o) => o.name === 'orderAsc')
      expect(orderAsc).toBeDefined()
    })

    test('should have preview configuration with photo', () => {
      expect(teamMember.preview).toBeDefined()
      expect(teamMember.preview?.select?.title).toBe('name')
      expect(teamMember.preview?.select?.subtitle).toBe('role')
      expect(teamMember.preview?.select?.media).toBe('photo')
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
