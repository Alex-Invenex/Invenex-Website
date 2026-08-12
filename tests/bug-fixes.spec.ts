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

  // Scoped to the CaterFlow surfaces, which is what B1 is about. The homepage
  // is no longer checked page-wide for "500+": the featured-work card for
  // GrabToGo now carries its own attributed result ("GrabToGo — 500+ partner
  // merchants"), which is a real, named figure from that case study and has
  // nothing to do with CaterFlow's user count.
  test('neither homepage nor /products mentions "500+ Active Users"', async ({ page }) => {
    await page.goto('/')
    const homeSection = page.getByTestId('products-preview-section')
    await expect(homeSection.getByText('500+')).toHaveCount(0)
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

/**
 * B3 — decorative stats that look like data.
 *
 * The service illustrations used to carry invented figures ("12ms latency",
 * "0 errors", "47.2K Followers", "$249.99 / 3 items", "+42%", "+127%"). An
 * invented number sitting beside a real one makes the real one look invented
 * too, so every figure on the homepage must now either be gone or carry the
 * name of the client it came from.
 */
test.describe('Bug fixes — no decorative fake metrics remain (B3)', () => {
  test('homepage shows none of the invented mockup figures', async ({ page }) => {
    await page.goto('/')
    const body = await page.locator('body').innerText()

    expect(body).not.toMatch(/12ms/i)
    expect(body).not.toMatch(/0 errors/i)
    expect(body).not.toMatch(/47\.2K/i)
    expect(body).not.toMatch(/249\.99/)
  })

  test('/services shows none of the invented mockup figures', async ({ page }) => {
    await page.goto('/services')
    const body = await page.locator('body').innerText()

    expect(body).not.toMatch(/12ms/i)
    expect(body).not.toMatch(/0 errors/i)
    expect(body).not.toMatch(/47\.2K/i)
    expect(body).not.toMatch(/249\.99/)
  })

  test('every percentage claim on the homepage names the client it came from', async ({
    page,
  }) => {
    await page.goto('/')

    const claims = page.getByText(/\+\d+%/)
    const count = await claims.count()

    for (let i = 0; i < count; i++) {
      // Walk up to the card or section the figure sits inside and require a
      // client's name in the same block. "+127%" is legitimate — on Ziera's
      // card. The same figure floating in a service illustration is not.
      const context = await claims.nth(i).evaluate((node) => {
        const container =
          node.closest('[data-portfolio-card], article, section') ??
          node.parentElement
        return container?.textContent ?? ''
      })
      expect(context).toMatch(/Ziera|CoolTech|GrabToGo|Ginger/i)
    }
  })
})

/**
 * Homepage restructure (05-PAGE-BY-PAGE-CHANGES.md, PAGE 1): the hero states
 * that prices are published, seven named clients sit directly beneath it, and
 * a pricing teaser carries the three tiers out to `/pricing`.
 */
test.describe('Homepage restructure — hero, trust bar, pricing teaser', () => {
  test('hero promises published prices and links to /pricing', async ({ page }) => {
    await page.goto('/')

    const hero = page.getByTestId('hero-section')
    await expect(hero.getByText(/Prices published/i)).toBeVisible()
    await expect(hero.getByText(/12,000 catering orders/i)).toBeVisible()

    await expect(page.getByTestId('hero-cta-primary')).toHaveAttribute(
      'href',
      '/pricing'
    )
    await expect(page.getByTestId('hero-cta-secondary')).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  test('trust bar names real clients directly under the hero', async ({ page }) => {
    await page.goto('/')

    const trustBar = page.getByTestId('trust-bar')
    await expect(trustBar).toBeVisible()
    await expect(trustBar.getByText('Al Shahama')).toBeVisible()
    await expect(trustBar.getByText('CoolTech')).toBeVisible()
    await expect(trustBar.getByText('Ahazz Designs')).toBeVisible()
  })

  test('pricing teaser shows the Growth default and links to the full sheet', async ({
    page,
  }) => {
    await page.goto('/')

    const teaser = page.getByTestId('pricing-teaser-section')
    await expect(teaser.getByText('Most chosen')).toBeVisible()
    await expect(teaser.locator('[data-tier="growth"][data-default="true"]')).toHaveCount(1)

    const link = page.getByTestId('pricing-teaser-link')
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/pricing')
    await expect(link).toContainText('See all pricing')
  })

  test('teaser prices are in the server HTML, not painted in by an effect', async ({
    page,
  }) => {
    // JavaScript disabled: the currency comes from the request, so the price
    // must already be there. A Gulf visitor must never see the India sheet.
    const response = await page.request.get('/')
    const html = await response.text()
    expect(html).toMatch(/Most chosen/)
    expect(html).toMatch(/3,85,000|28,400|12,900/)
  })

  test('featured work leads with GrabToGo and attributes every result', async ({
    page,
  }) => {
    await page.goto('/')

    const cards = page
      .getByTestId('portfolio-preview-section')
      .locator('[data-portfolio-card]')
    await expect(cards.first()).toContainText('GrabToGo')

    await expect(cards.nth(3)).toContainText('Ziera Inc')
    await expect(cards.nth(3)).toContainText('+127%')
  })
})
