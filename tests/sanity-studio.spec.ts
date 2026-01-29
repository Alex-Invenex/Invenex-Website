import { test, expect } from '@playwright/test'

/**
 * Sanity Studio Setup Tests - Story 7-1
 *
 * Updated in Story 7-5: Studio is now protected by NextAuth.js authentication.
 * Unauthenticated access redirects to /login.
 *
 * IMPORTANT: Admin credentials must be set in environment variables:
 * - ADMIN_EMAIL: Admin email address
 * - ADMIN_PASSWORD: Admin password
 *
 * For CI/CD, set these in your pipeline secrets.
 * For local testing, set in .env.local (never commit credentials!)
 */

// Get credentials from environment - tests will fail if not set
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

/**
 * Helper to authenticate via login page
 * Reusable across tests that need authenticated access
 */
async function authenticateAdmin(page: import('@playwright/test').Page) {
  await page.goto('/login')
  await page.getByLabel('Email').fill(ADMIN_EMAIL)
  await page.getByLabel('Password').fill(ADMIN_PASSWORD)
  await page.getByTestId('login-submit').click()
  await expect(page).toHaveURL(/\/studio/, { timeout: 15000 })
}

test.describe('Sanity Studio Setup - Story 7-1 (Updated 7-5)', () => {
  // Skip authenticated tests if credentials not configured
  test.beforeEach(async ({}, testInfo) => {
    if (testInfo.title.includes('after authentication') ||
        testInfo.title.includes('after login') ||
        testInfo.title.includes('has correct metadata') ||
        testInfo.title.includes('not indexed')) {
      test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'Admin credentials not configured in environment')
    }
  })

  test.describe('Desktop', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('AC1: Studio route redirects to login when unauthenticated', async ({
      page,
    }) => {
      await page.goto('/studio')
      // Studio should redirect to login when not authenticated (Story 7-5)
      await expect(page).toHaveURL(/\/login/)
    })

    test('AC1: Studio route accessible after authentication', async ({
      page,
    }) => {
      await authenticateAdmin(page)
      // If we get here, authentication succeeded
    })

    test('AC1: Studio page loads after login', async ({ page }) => {
      await authenticateAdmin(page)

      // Wait for page to finish loading
      await page.waitForLoadState('networkidle')

      // Verify the page title contains Invenex Studio (confirms studio route loaded)
      const title = await page.title()
      expect(title).toContain('Invenex')
    })

    test('AC1: Studio has correct metadata', async ({ page }) => {
      await authenticateAdmin(page)

      // Check page title
      const title = await page.title()
      expect(title).toContain('Invenex')
    })

    test('AC1: Studio is not indexed by search engines', async ({ page }) => {
      await authenticateAdmin(page)

      // Check for noindex meta tag
      const robotsMeta = await page
        .locator('meta[name="robots"]')
        .getAttribute('content')
      // Studio should have noindex to prevent indexing
      expect(robotsMeta).toContain('noindex')
    })
  })

  test.describe('Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('Studio redirects to login on mobile', async ({ page }) => {
      await page.goto('/studio')
      await expect(page).toHaveURL(/\/login/)
    })

    test('Studio loads on mobile viewport after login', async ({ page }) => {
      await authenticateAdmin(page)
    })
  })
})
