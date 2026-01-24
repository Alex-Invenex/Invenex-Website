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
