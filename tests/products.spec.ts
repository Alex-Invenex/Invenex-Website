import { test, expect } from '@playwright/test'

test.describe('Story 3-5: Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products')
  })

  test('has correct page title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Our Products.*Invenex/i)
  })

  test('displays hero section with correct messaging', async ({ page }) => {
    // Copy is "WE BUILD" / "PRODUCTS TOO." now (was "We Build Our Own Products Too").
    const heroTitle = page.locator('#products-hero-title')
    await expect(heroTitle).toBeVisible()
    await expect(heroTitle).toContainText(/we build/i)
    await expect(heroTitle).toContainText(/products too/i)
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

    // Check description positions against catering/food service, not Zoho
    await expect(
      invenexSection.getByText(/ERP built for catering and food service/i)
    ).toBeVisible()
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

  test('has enabled waitlist link for Invenex ERP', async ({ page }) => {
    const waitlistLink = page.getByRole('link', { name: /join the waitlist/i })
    await expect(waitlistLink).toBeVisible()
    await expect(waitlistLink).toHaveAttribute('href', '/contact?intent=erp-waitlist')
  })

  test('CaterFlow stats show verified figures only', async ({ page }) => {
    const caterflowSection = page.getByTestId('caterflow-section')
    await expect(caterflowSection.getByText('Catering Businesses', { exact: true })).toBeVisible()
    await expect(caterflowSection.getByText('Orders Processed')).toBeVisible()
    await expect(caterflowSection.getByText(/currently in private trial with 50 catering businesses/i)).toBeVisible()
    await expect(page.getByText('500+')).toHaveCount(0)
    await expect(page.getByText(/active users/i)).toHaveCount(0)
    await expect(page.getByText(/99%?\.?9?%?\s*uptime/i)).toHaveCount(0)
  })

  test('CaterFlow description matches homepage positioning', async ({ page }) => {
    const caterflowSection = page.getByTestId('caterflow-section')
    await expect(
      caterflowSection.getByText(/a complete catering management platform/i)
    ).toBeVisible()
    await expect(page.getByText(/complete ERP solution/i)).toHaveCount(0)
  })

  test('CTA section links to contact page', async ({ page }) => {
    // The page uses the shared `SubpageCTA` with its default CTAs — "See
    // Pricing" (/pricing) and "Book a 15-min fit call" (/contact) — not a
    // bespoke "Start a Project" link.
    const ctaLink = page.getByRole('link', { name: /book a 15-min fit call/i })
    await expect(ctaLink).toBeVisible()
    await expect(ctaLink).toHaveAttribute('href', '/contact')
  })

  test('CTA area shows platform price with a pricing link', async ({ page }) => {
    const priceParagraph = page.getByText(/platform builds are/i)
    await expect(priceParagraph).toBeVisible()
    // Scope to the paragraph's own "pricing" link — the navbar and footer
    // also have a "Pricing" link, so an unscoped role query strict-mode
    // violates across all three.
    const pricingLink = priceParagraph.getByRole('link', { name: /^pricing$/i })
    await expect(pricingLink).toBeVisible()
    await expect(pricingLink).toHaveAttribute('href', '/pricing')
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

    // `SubpageCTA`'s default heading id is "subpage-cta-title" — products-client.tsx
    // doesn't override it with a page-scoped "products-cta-title".
    const ctaSection = page.locator('section[aria-labelledby="subpage-cta-title"]')
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
