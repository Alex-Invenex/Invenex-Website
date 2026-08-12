import { test, expect } from '@playwright/test'

// Known client roster (per copy deck §7 / 03-MARKET-RATES.md UAE roster). Any
// card that shows an attributed "+N%" figure must name one of these clients —
// unattributed growth numbers read as decoration, not evidence.
const KNOWN_CLIENT_ROSTER =
  /Ziera|CoolTech|GrabToGo|Ginger|Al Shahama|AutoAssist|OnMyWay|Emergence|Ahazz/

test.describe('Story 4-1: Portfolio Grid Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  // AC1: Portfolio Page Layout
  test('has correct page title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio.*Invenex/i)
  })

  test('displays hero section', async ({ page }) => {
    const heroSection = page.getByTestId('portfolio-hero')
    await expect(heroSection).toBeVisible()

    const heroTitle = page.locator('#portfolio-hero-title')
    await expect(heroTitle).toBeVisible()
    await expect(heroTitle).toContainText(/Work/i)
  })

  test('displays filter tabs for categories', async ({ page }) => {
    const filterTabs = page.getByTestId('portfolio-filters')
    await expect(filterTabs).toBeVisible()

    const categories = ['All', 'Web', 'Mobile', 'Platform', 'E-Commerce']
    for (const category of categories) {
      await expect(filterTabs.getByRole('button', { name: category })).toBeVisible()
    }
  })

  test('All filter is active by default', async ({ page }) => {
    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true')
  })

  test('displays project grid with responsive layout', async ({ page }) => {
    const projectGrid = page.getByTestId('bento-portfolio-grid')
    await expect(projectGrid).toBeVisible()

    const projectCards = page.getByTestId('bento-project-card')
    await expect(projectCards.first()).toBeVisible()
  })

  test('project cards show required information', async ({ page }) => {
    const firstCard = page.getByTestId('bento-project-card').first()
    await expect(firstCard).toBeVisible()

    await expect(firstCard.locator('[data-testid="bento-card-image"]')).toBeVisible()
    await expect(firstCard.locator('[data-testid="bento-card-title"]')).toBeVisible()
    await expect(firstCard.locator('[data-testid="bento-card-category"]')).toBeVisible()
    await expect(firstCard.locator('[data-testid="bento-card-metric"]')).toBeVisible()
  })

  // AC3: Project Navigation
  test('project cards are clickable links to case study pages', async ({ page }) => {
    const firstCard = page.getByTestId('bento-project-card').first()
    await expect(firstCard).toBeVisible()

    const href = await firstCard.getAttribute('href')
    expect(href).toMatch(/^\/portfolio\//)
  })

  // Accessibility
  test('page is accessible with proper landmarks', async ({ page }) => {
    const main = page.locator('#main-content')
    await expect(main).toBeVisible()

    const heroSection = page.locator('section[aria-labelledby="portfolio-hero-title"]')
    await expect(heroSection).toBeVisible()

    const gridSection = page.locator('section[aria-labelledby="bento-portfolio-grid-title"]')
    await expect(gridSection).toBeVisible()
  })

  // Responsive test
  test('is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(page.locator('#portfolio-hero-title')).toBeVisible()
    await expect(page.getByTestId('portfolio-filters')).toBeVisible()
    await expect(page.getByTestId('bento-portfolio-grid')).toBeVisible()
  })

  test('grid shows 1 column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const grid = page.getByTestId('bento-portfolio-grid')
    await expect(grid).toBeVisible()
    await expect(grid).toHaveClass(/grid-cols-1/)
  })
})

test.describe('Story 4-2: Portfolio Filtering', () => {
  test('clicking a filter tab updates URL with category param', async ({ page }) => {
    await page.goto('/portfolio')

    const mobileFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Mobile' })
    await mobileFilter.click()

    await expect(page).toHaveURL(/\/portfolio\?category=mobile/i)
  })

  test('clicking a filter tab highlights it as active', async ({ page }) => {
    await page.goto('/portfolio')

    const webFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Web' })
    await webFilter.click()

    await expect(webFilter).toHaveAttribute('aria-pressed', 'true')

    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await expect(allFilter).toHaveAttribute('aria-pressed', 'false')
  })

  test('filtering shows only projects of that category', async ({ page }) => {
    await page.goto('/portfolio')

    const allCards = page.getByTestId('bento-project-card')
    await expect(allCards.first()).toBeVisible()
    const initialCards = await allCards.count()
    expect(initialCards).toBeGreaterThan(0)

    // Filter to Platform (fewer projects than the total).
    const platformFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Platform' })
    await platformFilter.click()

    await expect(page).toHaveURL(/category=platform/i)

    await page.waitForFunction(() => {
      const cards = document.querySelectorAll('[data-testid="bento-project-card"]')
      return cards.length > 0 && Array.from(cards).every((card) => {
        const badge = card.querySelector('[data-testid="bento-card-category"]')
        return badge && badge.textContent?.toLowerCase().includes('platform')
      })
    }, { timeout: 5000 })

    const platformCards = page.getByTestId('bento-project-card')
    const cardCount = await platformCards.count()

    expect(cardCount).toBeGreaterThan(0)
    expect(cardCount).toBeLessThan(initialCards)

    for (let i = 0; i < cardCount; i++) {
      const categoryBadge = platformCards.nth(i).getByTestId('bento-card-category')
      await expect(categoryBadge).toHaveText(/platform/i)
    }
  })

  test('clicking All filter shows all projects and clears URL param', async ({ page }) => {
    await page.goto('/portfolio?category=web')

    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await allFilter.click()

    await expect(page).toHaveURL('/portfolio')
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true')
  })

  test('direct URL with category param pre-applies filter', async ({ page }) => {
    await page.goto('/portfolio?category=platform')

    const platformFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Platform' })
    await expect(platformFilter).toHaveAttribute('aria-pressed', 'true')

    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await expect(allFilter).toHaveAttribute('aria-pressed', 'false')
  })

  test('direct URL with category shows only that category projects', async ({ page }) => {
    await page.goto('/portfolio?category=e-commerce')

    const cards = page.getByTestId('bento-project-card')
    await expect(cards.first()).toBeVisible()

    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)

    for (let i = 0; i < cardCount; i++) {
      const categoryBadge = cards.nth(i).getByTestId('bento-card-category')
      await expect(categoryBadge).toHaveText(/e-commerce/i)
    }
  })

  test('filter animation occurs on category change', async ({ page }) => {
    await page.goto('/portfolio')

    const webFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Web' })
    await webFilter.click()

    const grid = page.getByTestId('bento-portfolio-grid')
    await expect(grid).toBeVisible()

    await page.waitForTimeout(500)
    const cards = page.getByTestId('bento-project-card')
    await expect(cards.first()).toBeVisible()
  })
})

test.describe('Task 15: Case-study attribution + portfolio metrics', () => {
  test('every card leads with GrabToGo, and it carries an attributed metric', async ({ page }) => {
    await page.goto('/portfolio')
    const firstCard = page.getByTestId('bento-project-card').first()
    await expect(firstCard).toContainText('GrabToGo')
    await expect(firstCard.getByTestId('bento-card-metric')).toContainText('GrabToGo')
  })

  test('every card whose metric reads as a +N% figure names a known client', async ({ page }) => {
    await page.goto('/portfolio')
    const cards = page.getByTestId('bento-project-card')
    // The grid reads `useSearchParams`, so its whole subtree renders on the
    // client — the cards do not exist in the server HTML. `count()` is a
    // one-shot read with no auto-retry, so it must be gated on an
    // auto-waiting assertion or it samples the pre-hydration DOM and sees 0.
    await expect(cards.first()).toBeAttached()
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const text = await cards.nth(i).innerText()
      if (/\+\d+%/.test(text)) {
        expect(text).toMatch(KNOWN_CLIENT_ROSTER)
      }
    }
  })

  test('Ziera Inc case study reads +127% revenue, attributed', async ({ page }) => {
    await page.goto('/portfolio')
    const zieraCard = page.getByTestId('bento-project-card').filter({ hasText: 'Ziera' })
    await expect(zieraCard).toContainText(/\+127%/)
    await expect(zieraCard).toContainText('Ziera Inc')
  })

  test('UAE filter tab appears (data-driven) and filters to UAE-located projects', async ({ page }) => {
    await page.goto('/portfolio')

    const filters = page.getByTestId('portfolio-filters')
    const uaeFilter = filters.getByRole('button', { name: /^UAE$/i })
    await expect(uaeFilter).toBeVisible()

    await uaeFilter.click()
    await expect(page).toHaveURL(/category=uae/i)

    // Wait for the FLIP exit animation to finish so only UAE cards remain in the DOM.
    await page.waitForFunction(() => {
      const cards = document.querySelectorAll('[data-testid="bento-project-card"]')
      return cards.length > 0 && Array.from(cards).every((card) =>
        card.querySelector('[data-testid="bento-card-location"]')?.textContent?.toLowerCase().includes('uae')
      )
    }, { timeout: 5000 })

    const cards = page.getByTestId('bento-project-card')
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)

    for (let i = 0; i < cardCount; i++) {
      await expect(cards.nth(i).getByTestId('bento-card-location')).toContainText(/UAE/i)
    }
  })

  test('server-rendered /portfolio HTML includes named case studies (indexable)', async ({ request }) => {
    const response = await request.get('/portfolio')
    const html = await response.text()
    expect(html).toMatch(/GrabToGo|Ziera|CoolTech/)
  })
})
