import { test, expect } from '@playwright/test'

/**
 * Tests for Admin Authentication (Story 7-5)
 *
 * Tests the login page UI and studio route protection.
 * Note: Actual authentication requires env variables to be configured.
 */

test.describe('Admin Authentication', () => {
  test.describe('Login Page', () => {
    test('displays login form', async ({ page }) => {
      await page.goto('/login')

      await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible()
      await expect(page.getByText('Sign in to access Sanity Studio')).toBeVisible()
      await expect(page.getByLabel('Email')).toBeVisible()
      await expect(page.getByLabel('Password')).toBeVisible()
      await expect(page.getByTestId('login-submit')).toBeVisible()
    })

    test('has required email field', async ({ page }) => {
      await page.goto('/login')

      const emailInput = page.getByLabel('Email')
      await expect(emailInput).toHaveAttribute('required', '')
      await expect(emailInput).toHaveAttribute('type', 'email')
    })

    test('has required password field', async ({ page }) => {
      await page.goto('/login')

      const passwordInput = page.getByLabel('Password')
      await expect(passwordInput).toHaveAttribute('required', '')
      await expect(passwordInput).toHaveAttribute('type', 'password')
    })

    test('shows error on invalid credentials', async ({ page }) => {
      await page.goto('/login')

      await page.getByLabel('Email').fill('invalid@example.com')
      await page.getByLabel('Password').fill('wrongpassword123')
      await page.getByTestId('login-submit').click()

      // Wait for the error message to appear
      await expect(page.getByTestId('login-error')).toBeVisible({ timeout: 10000 })
      await expect(page.getByTestId('login-error')).toHaveText('Invalid credentials')
    })

    test('submit button shows loading state', async ({ page }) => {
      await page.goto('/login')

      await page.getByLabel('Email').fill('test@example.com')
      await page.getByLabel('Password').fill('testpassword123')

      // Click and check for loading state
      const submitButton = page.getByTestId('login-submit')
      await submitButton.click()

      // Button should be in loading state (disabled or has loading indicator)
      // The button component has isLoading prop which disables it
      await expect(submitButton).toBeDisabled({ timeout: 5000 })
    })
  })

  test.describe('Studio Route Protection', () => {
    test('studio route redirects unauthenticated users to login', async ({
      page,
    }) => {
      await page.goto('/studio')

      // Should redirect to login page
      await page.waitForURL(/\/login/, { timeout: 10000 })
      await expect(page).toHaveURL(/\/login/)
    })

    test('studio subpaths redirect to login', async ({ page }) => {
      await page.goto('/studio/desk')

      await page.waitForURL(/\/login/, { timeout: 10000 })
      await expect(page).toHaveURL(/\/login/)
    })
  })

  test.describe('Login Page Accessibility', () => {
    test('has proper heading hierarchy', async ({ page }) => {
      await page.goto('/login')

      const h1 = page.getByRole('heading', { level: 1, name: 'Admin Login' })
      await expect(h1).toBeVisible()
    })

    test('form inputs have labels', async ({ page }) => {
      await page.goto('/login')

      // Check that inputs are properly labeled
      const emailInput = page.getByRole('textbox', { name: 'Email' })
      const passwordInput = page.locator('input[type="password"]')

      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
    })

    test('error message has alert role', async ({ page }) => {
      await page.goto('/login')

      await page.getByLabel('Email').fill('invalid@test.com')
      await page.getByLabel('Password').fill('wrongpassword')
      await page.getByTestId('login-submit').click()

      const errorMessage = page.getByTestId('login-error')
      await expect(errorMessage).toBeVisible({ timeout: 10000 })
      await expect(errorMessage).toHaveAttribute('role', 'alert')
    })

    test('inputs have autocomplete attributes', async ({ page }) => {
      await page.goto('/login')

      await expect(page.getByLabel('Email')).toHaveAttribute('autocomplete', 'email')
      await expect(page.getByLabel('Password')).toHaveAttribute(
        'autocomplete',
        'current-password'
      )
    })
  })
})
