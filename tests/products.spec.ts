import { test, expect } from '@playwright/test'

test.describe('Story 3-5: Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products')
  })

  test('has correct page title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Our Products.*Invenex/i)
  })

  test('displays hero section with correct messaging', async ({ page }) => {
    const heroTitle = page.locator('#products-hero-title')
    await expect(heroTitle).toBeVisible()
    await expect(heroTitle).toContainText('We Build Our Own')
    await expect(heroTitle).toContainText('Products Too')
  })

  test('displays CaterFlow section with all features', async ({ page }) => {
    const caterflowSection = page.getByTestId('caterflow-section')
    await expect(caterflowSection).toBeVisible()

    // Check heading
    const caterflowTitle = page.locator('#caterflow-title')
    await expect(caterflowTitle).toHaveText('CaterFlow')

    // Check Live Product badge
    await expect(caterflowSection.getByText('Live Product')).toBeVisible()

    // Check features list
    const features = [
      'Order Management System',
      'Inventory Tracking',
      'Staff Scheduling',
      'Financial Reports',
      'Customer Portal',
      'Mobile App for Field Staff',
    ]
    for (const feature of features) {
      await expect(caterflowSection.getByText(feature)).toBeVisible()
    }
  })

  test('CaterFlow external link has correct attributes', async ({ page }) => {
    const caterflowLink = page.getByTestId('caterflow-link')
    await expect(caterflowLink).toBeVisible()
    await expect(caterflowLink).toHaveAttribute('href', 'https://caterflow.in')
    await expect(caterflowLink).toHaveAttribute('target', '_blank')
    await expect(caterflowLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('displays Invenex ERP teaser section', async ({ page }) => {
    const invenexSection = page.getByTestId('invenex-erp-section')
    await expect(invenexSection).toBeVisible()

    // Check heading
    const invenexTitle = page.locator('#invenex-erp-title')
    await expect(invenexTitle).toHaveText('Invenex ERP')

    // Check Coming Soon badge
    await expect(invenexSection.getByText('Coming Soon').first()).toBeVisible()

    // Check description mentions Zoho One
    await expect(invenexSection.getByText(/alternative to Zoho One/i)).toBeVisible()
  })

  test('displays Invenex ERP planned features', async ({ page }) => {
    const invenexSection = page.getByTestId('invenex-erp-section')

    const plannedFeatures = [
      'CRM & Sales Pipeline',
      'Project Management',
      'HR & Payroll',
      'Accounting & Invoicing',
      'Inventory Management',
      'Custom Workflows',
    ]
    for (const feature of plannedFeatures) {
      await expect(invenexSection.getByText(feature)).toBeVisible()
    }
  })

  test('has disabled notify button for Invenex ERP', async ({ page }) => {
    const notifyButton = page.getByRole('button', { name: /notify me when ready/i })
    await expect(notifyButton).toBeVisible()
    await expect(notifyButton).toBeDisabled()
  })

  test('CTA section links to contact page', async ({ page }) => {
    const ctaLink = page.getByRole('link', { name: /start your project/i })
    await expect(ctaLink).toBeVisible()
    await expect(ctaLink).toHaveAttribute('href', '/contact')
  })

  test('page is accessible with proper landmarks', async ({ page }) => {
    // Check main landmark (provided by layout)
    const main = page.locator('#main-content')
    await expect(main).toBeVisible()

    // Check all sections have aria-labelledby
    const heroSection = page.locator('section[aria-labelledby="products-hero-title"]')
    await expect(heroSection).toBeVisible()

    const caterflowSection = page.locator('section[aria-labelledby="caterflow-title"]')
    await expect(caterflowSection).toBeVisible()

    const invenexSection = page.locator('section[aria-labelledby="invenex-erp-title"]')
    await expect(invenexSection).toBeVisible()

    const ctaSection = page.locator('section[aria-labelledby="products-cta-title"]')
    await expect(ctaSection).toBeVisible()
  })

  test('is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Page should still be visible and functional
    await expect(page.locator('#products-hero-title')).toBeVisible()
    await expect(page.getByTestId('caterflow-section')).toBeVisible()
    await expect(page.getByTestId('invenex-erp-section')).toBeVisible()
  })
})
