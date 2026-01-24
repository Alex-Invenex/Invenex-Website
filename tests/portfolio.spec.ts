import { test, expect } from '@playwright/test'

test.describe('Story 4-1: Portfolio Grid Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  // AC1: Portfolio Page Layout
  test('has correct page title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Our Work.*Invenex/i)
  })

  test('displays hero section with project count', async ({ page }) => {
    const heroSection = page.locator('section[aria-labelledby="portfolio-hero-title"]')
    await expect(heroSection).toBeVisible()

    const heroTitle = page.locator('#portfolio-hero-title')
    await expect(heroTitle).toBeVisible()
    await expect(heroTitle).toContainText('Our Work')

    // Should show project count
    await expect(heroSection.getByText(/projects? delivered/i)).toBeVisible()
  })

  test('displays filter tabs for categories', async ({ page }) => {
    const filterTabs = page.getByTestId('portfolio-filters')
    await expect(filterTabs).toBeVisible()

    // Check all filter categories exist
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
    const projectGrid = page.getByTestId('portfolio-grid')
    await expect(projectGrid).toBeVisible()

    // Check that project cards exist
    const projectCards = page.getByTestId('project-card')
    await expect(projectCards.first()).toBeVisible()
  })

  test('project cards show required information', async ({ page }) => {
    const firstCard = page.getByTestId('project-card').first()
    await expect(firstCard).toBeVisible()

    // Check card shows: thumbnail area, client name, project type, excerpt
    await expect(firstCard.locator('[data-testid="project-thumbnail"]')).toBeVisible()
    await expect(firstCard.locator('[data-testid="project-title"]')).toBeVisible()
    await expect(firstCard.locator('[data-testid="project-client"]')).toBeVisible()
    await expect(firstCard.locator('[data-testid="project-category"]')).toBeVisible()
  })

  // AC2: Project Card Hover - tested visually, but we check overlay exists
  test('project card has hover overlay element', async ({ page }) => {
    const firstCard = page.getByTestId('project-card').first()
    const overlay = firstCard.locator('[data-testid="project-overlay"]')
    await expect(overlay).toBeAttached()
  })

  test('project card overlay contains View Case Study text', async ({ page }) => {
    const firstCard = page.getByTestId('project-card').first()
    await expect(firstCard.getByText('View Case Study')).toBeAttached()
  })

  // AC3: Project Navigation
  test('project cards are clickable links to case study pages', async ({ page }) => {
    // The project-card itself is the link element
    const firstCard = page.getByTestId('project-card').first()
    await expect(firstCard).toBeVisible()

    // Verify it's a link with the correct href pattern
    const href = await firstCard.getAttribute('href')
    expect(href).toMatch(/^\/portfolio\//)
  })

  // Accessibility
  test('page is accessible with proper landmarks', async ({ page }) => {
    // Check main landmark
    const main = page.locator('#main-content')
    await expect(main).toBeVisible()

    // Check hero section has aria-labelledby
    const heroSection = page.locator('section[aria-labelledby="portfolio-hero-title"]')
    await expect(heroSection).toBeVisible()

    // Check portfolio grid section has aria-labelledby
    const gridSection = page.locator('section[aria-labelledby="portfolio-grid-title"]')
    await expect(gridSection).toBeVisible()
  })

  // Responsive test
  test('is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(page.locator('#portfolio-hero-title')).toBeVisible()
    await expect(page.getByTestId('portfolio-filters')).toBeVisible()
    await expect(page.getByTestId('portfolio-grid')).toBeVisible()
  })

  test('grid shows 1 column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const grid = page.getByTestId('portfolio-grid')
    await expect(grid).toBeVisible()

    // Grid should have single column class on mobile
    await expect(grid).toHaveClass(/grid-cols-1/)
  })
})

test.describe('Story 4-2: Portfolio Filtering', () => {
  // AC1: Filter Functionality
  test('clicking a filter tab updates URL with category param', async ({ page }) => {
    await page.goto('/portfolio')

    const mobileFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Mobile' })
    await mobileFilter.click()

    // URL should update with category param
    await expect(page).toHaveURL(/\/portfolio\?category=mobile/i)
  })

  test('clicking a filter tab highlights it as active', async ({ page }) => {
    await page.goto('/portfolio')

    const webFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Web' })
    await webFilter.click()

    // Web filter should now be active
    await expect(webFilter).toHaveAttribute('aria-pressed', 'true')

    // All filter should no longer be active
    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await expect(allFilter).toHaveAttribute('aria-pressed', 'false')
  })

  test('filtering shows only projects of that category', async ({ page }) => {
    await page.goto('/portfolio')

    // Get initial count of all projects (14 real projects)
    const initialCards = await page.getByTestId('project-card').count()
    expect(initialCards).toBeGreaterThan(0)

    // Filter to E-Commerce (4 projects)
    const ecommerceFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'E-Commerce' })
    await ecommerceFilter.click()

    // Wait for URL to update (confirms filter was applied)
    await expect(page).toHaveURL(/category=e-commerce/i)

    // Wait for filtered results - E-Commerce has 4 projects
    await expect(page.getByTestId('project-card')).toHaveCount(4)

    const ecommerceCards = page.getByTestId('project-card')
    const cardCount = await ecommerceCards.count()
    expect(cardCount).toBe(4)
    expect(cardCount).toBeLessThan(initialCards)

    for (let i = 0; i < cardCount; i++) {
      const categoryBadge = ecommerceCards.nth(i).getByTestId('project-category')
      await expect(categoryBadge).toHaveText(/e-commerce/i)
    }
  })

  // AC2: All Filter
  test('clicking All filter shows all projects and clears URL param', async ({ page }) => {
    // Start with a filtered URL
    await page.goto('/portfolio?category=web')

    // Click All filter
    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await allFilter.click()

    // URL should not have category param
    await expect(page).toHaveURL('/portfolio')

    // All filter should be active
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true')
  })

  // AC3: URL State
  test('direct URL with category param pre-applies filter', async ({ page }) => {
    // Navigate directly to filtered URL
    await page.goto('/portfolio?category=platform')

    // Platform filter should be active
    const platformFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Platform' })
    await expect(platformFilter).toHaveAttribute('aria-pressed', 'true')

    // All filter should NOT be active
    const allFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'All' })
    await expect(allFilter).toHaveAttribute('aria-pressed', 'false')
  })

  test('direct URL with category shows only that category projects', async ({ page }) => {
    await page.goto('/portfolio?category=e-commerce')

    // E-Commerce has 4 projects
    await expect(page.getByTestId('project-card')).toHaveCount(4)

    // All visible cards should have E-Commerce category
    const cards = page.getByTestId('project-card')
    for (let i = 0; i < 4; i++) {
      const categoryBadge = cards.nth(i).getByTestId('project-category')
      await expect(categoryBadge).toHaveText(/e-commerce/i)
    }
  })

  test('filter animation occurs on category change', async ({ page }) => {
    await page.goto('/portfolio')

    // Click a filter and verify grid animates
    const webFilter = page.getByTestId('portfolio-filters').getByRole('button', { name: 'Web' })
    await webFilter.click()

    // Grid should still be visible after animation
    const grid = page.getByTestId('portfolio-grid')
    await expect(grid).toBeVisible()

    // Cards should be visible after animation completes
    await page.waitForTimeout(500)
    const cards = page.getByTestId('project-card')
    await expect(cards.first()).toBeVisible()
  })
})
