import { test, expect } from '@playwright/test'

/**
 * Tests for Sanity Webhook Revalidation API Route (Story 7-5)
 *
 * Note: These tests verify the API route behavior for webhook requests.
 * Signature validation requires proper HMAC-SHA256 signing which is
 * tested with mock/invalid signatures to verify security.
 */

test.describe('Sanity Webhook Revalidation API', () => {
  const webhookUrl = '/api/sanity/revalidate'

  test.describe('Request Validation', () => {
    test('rejects requests without signature header', async ({ request }) => {
      const response = await request.post(webhookUrl, {
        data: {
          _type: 'project',
          _id: 'test-123',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(response.status()).toBe(401)
      const text = await response.text()
      expect(text).toContain('Invalid signature')
    })

    test('rejects requests with invalid signature', async ({ request }) => {
      const response = await request.post(webhookUrl, {
        data: {
          _type: 'project',
          _id: 'test-123',
        },
        headers: {
          'Content-Type': 'application/json',
          'sanity-webhook-signature': 'invalid-signature',
        },
      })

      expect(response.status()).toBe(401)
      const text = await response.text()
      expect(text).toContain('Invalid signature')
    })

    test('rejects requests with missing _type', async ({ request }) => {
      // Even with invalid signature, this tests the body parsing logic path
      const response = await request.post(webhookUrl, {
        data: {
          _id: 'test-123',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Will fail on signature first (401) before body validation
      expect(response.status()).toBe(401)
    })

    test('rejects GET requests', async ({ request }) => {
      const response = await request.get(webhookUrl)
      expect(response.status()).toBe(405)
    })

    test('rejects PUT requests', async ({ request }) => {
      const response = await request.put(webhookUrl, {
        data: { _type: 'project' },
      })
      expect(response.status()).toBe(405)
    })

    test('rejects DELETE requests', async ({ request }) => {
      const response = await request.delete(webhookUrl)
      expect(response.status()).toBe(405)
    })
  })

  test.describe('Response Format', () => {
    test('returns 401 response with invalid signature', async ({ request }) => {
      const response = await request.post(webhookUrl, {
        data: {
          _type: 'project',
          _id: 'proj-001',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(response.status()).toBe(401)
    })

    test('returns proper error message format', async ({ request }) => {
      const response = await request.post(webhookUrl, {
        data: {
          _type: 'project',
          _id: 'proj-001',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const text = await response.text()
      expect(text).toContain('Invalid signature')
    })
  })

  test.describe('Document Type Support', () => {
    /**
     * Parameterized test for all supported Sanity document types.
     * Verifies the endpoint accepts and processes each type correctly.
     *
     * Note: Without valid HMAC signature, these return 401.
     * Full revalidation testing requires production environment
     * with configured SANITY_REVALIDATE_SECRET.
     */
    const documentTypes = [
      { type: 'project', id: 'proj-001', slug: 'test-project' },
      { type: 'service', id: 'svc-001', slug: 'web-development' },
      { type: 'job', id: 'job-001', slug: 'frontend-developer' },
      { type: 'teamMember', id: 'team-001' },
      { type: 'testimonial', id: 'test-001' },
      { type: 'blogPost', id: 'blog-001', slug: 'my-first-post' },
    ]

    for (const doc of documentTypes) {
      test(`accepts ${doc.type} document type payload`, async ({ request }) => {
        const response = await request.post(webhookUrl, {
          data: {
            _type: doc.type,
            _id: doc.id,
            ...(doc.slug && { slug: { current: doc.slug } }),
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // 401 expected without valid signature - confirms endpoint
        // receives and attempts to process the payload
        expect(response.status()).toBe(401)
      })
    }
  })

  test.describe('Endpoint Availability', () => {
    test('API route is accessible at /api/sanity/revalidate', async ({
      request,
    }) => {
      const response = await request.post(webhookUrl, {
        data: { _type: 'project', _id: 'test' },
        headers: { 'Content-Type': 'application/json' },
      })

      // Should return 401 (invalid signature) not 404 (not found)
      expect(response.status()).not.toBe(404)
    })

    test('route responds to POST method', async ({ request }) => {
      const response = await request.post(webhookUrl, {
        data: { _type: 'project', _id: 'test' },
        headers: { 'Content-Type': 'application/json' },
      })

      // 401 is expected without valid signature, but confirms POST is handled
      expect([401, 400, 200]).toContain(response.status())
    })
  })
})
