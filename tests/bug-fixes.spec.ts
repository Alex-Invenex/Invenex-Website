import { test, expect } from '@playwright/test'

/**
 * Regression tests for credibility bugs found in the 05-PAGE-BY-PAGE-CHANGES.md
 * audit (B1, B2, B6): CaterFlow's numbers and description must be identical on
 * the homepage and /products, the Invenex ERP section must not compare itself
 * to Zoho, and no uptime figure may be claimed anywhere it isn't measured.
 *
 * Verified figures only: "50+ catering businesses" and "12K+ orders". The
 * "500+ Active Users" claim and all uptime claims (99%, 99.9%) are removed
 * site-wide per user decision.
 */

test.describe('Bug fixes — CaterFlow credibility (B1, B2, B6)', () => {
  test('homepage and /products agree on the CaterFlow figure (50+ catering businesses)', async ({ page }) => {
    await page.goto('/')
    const homeSection = page.getByTestId('products-preview-section')
    await expect(homeSection.getByText('50+')).toBeVisible()
    await expect(homeSection.getByText(/catering business/i).first()).toBeVisible()

    await page.goto('/products')
    const productsSection = page.getByTestId('caterflow-section')
    await expect(productsSection.getByText('50+')).toBeVisible()
    await expect(productsSection.getByText(/catering business/i).first()).toBeVisible()
  })

  test('neither homepage nor /products mentions "500+ Active Users"', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('500+')).toHaveCount(0)
    await expect(page.getByText(/active users/i)).toHaveCount(0)

    await page.goto('/products')
    await expect(page.getByText('500+')).toHaveCount(0)
    await expect(page.getByText(/active users/i)).toHaveCount(0)
  })

  test('neither homepage nor /products positions Invenex ERP against Zoho or as "affordable"', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/zoho|affordable alternative/i)).toHaveCount(0)

    await page.goto('/products')
    await expect(page.getByText(/zoho|affordable alternative/i)).toHaveCount(0)
  })

  // Scoped to the CaterFlow/products sections this task owns. Note: the
  // homepage's Services section (service-visual-cards.tsx, out of scope for
  // this task — tracked under bug B3) still shows a decorative "99.9%
  // Uptime" mockup stat unrelated to CaterFlow; that is a separate cleanup.
  test('CaterFlow sections claim no uptime percentage', async ({ page }) => {
    await page.goto('/')
    const homeSection = page.getByTestId('products-preview-section')
    await expect(homeSection.getByText(/99\.?9?%\s*uptime/i)).toHaveCount(0)

    await page.goto('/products')
    const productsSection = page.getByTestId('caterflow-section')
    await expect(productsSection.getByText(/99\.?9?%\s*uptime/i)).toHaveCount(0)
  })

  test('/products offers an honest waitlist for Invenex ERP', async ({ page }) => {
    await page.goto('/products')
    await expect(page.getByText('Join the waitlist')).toBeVisible()
  })
})
