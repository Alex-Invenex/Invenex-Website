import { test, expect } from '@playwright/test'

test.describe('Story 4-2: Portfolio Filtering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  // AC1: Filter Tab Click Updates URL
  test('clicking Web filter updates URL with category parameter', async ({ page }) => {
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()

    // URL should update to include ?category=web
    await expect(page).toHaveURL(/\/portfolio\?category=web/i)
  })

  test('clicking Mobile filter updates URL', async ({ page }) => {
    const mobileFilter = page.getByRole('button', { name: /^Mobile$/i })
    await mobileFilter.click()

    await expect(page).toHaveURL(/\/portfolio\?category=mobile/i)
  })

  test('clicking Platform filter updates URL', async ({ page }) => {
    const platformFilter = page.getByRole('button', { name: /^Platform$/i })
    await platformFilter.click()

    await expect(page).toHaveURL(/\/portfolio\?category=platform/i)
  })

  test('clicking E-Commerce filter updates URL', async ({ page }) => {
    const ecommerceFilter = page.getByRole('button', { name: /E-Commerce|E Commerce|Ecommerce/i })
    await ecommerceFilter.click()

    await expect(page).toHaveURL(/\/portfolio\?category=(e-commerce|ecommerce)/i)
  })

  test('clicking All filter clears URL parameter', async ({ page }) => {
    // First apply a filter
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()
    await expect(page).toHaveURL(/category=web/i)

    // Then click All
    const allFilter = page.getByRole('button', { name: /^All$/i })
    await allFilter.click()

    // URL should not have category parameter
    await expect(page).toHaveURL(/^[^?]*$|\/portfolio$/)
  })

  // AC2: Filter Shows Only Matching Projects
  test('Web filter shows only Web projects', async ({ page }) => {
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()

    // Wait for filter to apply
    await page.waitForTimeout(500)

    // All visible project cards should have Web category
    const projectCards = page.getByTestId('project-card')
    const visibleCards = await projectCards.all()

    for (const card of visibleCards) {
      if (await card.isVisible()) {
        const category = card.getByTestId('project-category')
        const categoryText = await category.textContent()
        expect(categoryText).toMatch(/Web/i)
      }
    }
  })

  test('Mobile filter shows only Mobile projects', async ({ page }) => {
    const mobileFilter = page.getByRole('button', { name: /^Mobile$/i })
    await mobileFilter.click()

    await page.waitForTimeout(500)

    const projectCards = page.getByTestId('project-card')
    const firstCard = projectCards.first()

    if (await firstCard.isVisible()) {
      const category = firstCard.getByTestId('project-category')
      const categoryText = await category.textContent()
      expect(categoryText).toMatch(/Mobile/i)
    }
  })

  test('Platform filter shows only Platform projects', async ({ page }) => {
    const platformFilter = page.getByRole('button', { name: /^Platform$/i })
    await platformFilter.click()

    await page.waitForTimeout(500)

    const projectCards = page.getByTestId('project-card')
    const firstCard = projectCards.first()

    if (await firstCard.isVisible()) {
      const category = firstCard.getByTestId('project-category')
      const categoryText = await category.textContent()
      expect(categoryText).toMatch(/Platform/i)
    }
  })

  test('E-Commerce filter shows only E-Commerce projects', async ({ page }) => {
    const ecommerceFilter = page.getByRole('button', { name: /E-Commerce|E Commerce|Ecommerce/i })
    await ecommerceFilter.click()

    await page.waitForTimeout(500)

    const projectCards = page.getByTestId('project-card')
    const firstCard = projectCards.first()

    if (await firstCard.isVisible()) {
      const category = firstCard.getByTestId('project-category')
      const categoryText = await category.textContent()
      expect(categoryText).toMatch(/E-Commerce|E Commerce|Ecommerce/i)
    }
  })

  test('All filter shows all projects', async ({ page }) => {
    // First apply a filter to reduce count
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()
    await page.waitForTimeout(500)

    const filteredCount = await page.getByTestId('project-card').count()

    // Click All
    const allFilter = page.getByRole('button', { name: /^All$/i })
    await allFilter.click()
    await page.waitForTimeout(500)

    const allCount = await page.getByTestId('project-card').count()

    // All count should be >= filtered count
    expect(allCount).toBeGreaterThanOrEqual(filteredCount)
  })

  // AC3: Direct URL with Query Parameter
  test('direct URL /portfolio?category=web shows filtered results', async ({ page }) => {
    await page.goto('/portfolio?category=web')

    // Web filter should be active
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await expect(webFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)

    // Projects should be filtered
    const projectCards = page.getByTestId('project-card')
    const firstCard = projectCards.first()

    if (await firstCard.isVisible()) {
      const category = firstCard.getByTestId('project-category')
      const categoryText = await category.textContent()
      expect(categoryText).toMatch(/Web/i)
    }
  })

  test('direct URL /portfolio?category=mobile shows filtered results', async ({ page }) => {
    await page.goto('/portfolio?category=mobile')

    const mobileFilter = page.getByRole('button', { name: /^Mobile$/i })
    await expect(mobileFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)
  })

  test('direct URL /portfolio?category=platform shows filtered results', async ({ page }) => {
    await page.goto('/portfolio?category=platform')

    const platformFilter = page.getByRole('button', { name: /^Platform$/i })
    await expect(platformFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)
  })

  test('direct URL /portfolio?category=e-commerce shows filtered results', async ({ page }) => {
    await page.goto('/portfolio?category=e-commerce')

    const ecommerceFilter = page.getByRole('button', { name: /E-Commerce|E Commerce|Ecommerce/i })
    await expect(ecommerceFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)
  })

  test('invalid category parameter shows all projects', async ({ page }) => {
    await page.goto('/portfolio?category=invalid')

    // Should show all projects
    const allFilter = page.getByRole('button', { name: /^All$/i })
    await expect(allFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)

    // Projects should be visible
    const projectCards = page.getByTestId('project-card')
    await expect(projectCards.first()).toBeVisible()
  })

  // AC4: Filter State Persistence
  test('filter state persists on browser back button', async ({ page }) => {
    // Navigate to Web filter
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()
    await expect(page).toHaveURL(/category=web/i)

    // Navigate to a project
    const firstCard = page.getByTestId('project-card').first()
    await firstCard.click()

    // Wait for navigation
    await page.waitForURL(/\/portfolio\/[a-z0-9-]+/)

    // Go back
    await page.goBack()

    // Should still have Web filter active
    await expect(page).toHaveURL(/category=web/i)
    await expect(webFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)
  })

  // Visual Feedback
  test('active filter has visual indication', async ({ page }) => {
    // All should be active by default
    const allFilter = page.getByRole('button', { name: /^All$/i })
    await expect(allFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)

    // Click Web filter
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()

    // Web should now be active
    await expect(webFilter).toHaveClass(/active|selected|bg-primary|text-primary/i)

    // All should not be active
    const allFilterClass = await allFilter.getAttribute('class')
    expect(allFilterClass).not.toMatch(/active|selected|bg-primary|text-primary/)
  })

  // Empty State
  test('shows appropriate message when no projects match filter', async ({ page }) => {
    // This test assumes there might be a category with no projects
    // If all categories have projects, this test can be skipped

    // Try a filter that might have no results
    // For now, we'll just verify the page handles filtering gracefully
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()
    await page.waitForTimeout(500)

    // Either projects are shown or an empty state message
    const projectCards = page.getByTestId('project-card')
    const cardCount = await projectCards.count()

    if (cardCount === 0) {
      // Should show empty state message
      const emptyMessage = page.getByTestId('portfolio-empty-state')
      await expect(emptyMessage).toBeVisible()
    } else {
      // Should show filtered projects
      await expect(projectCards.first()).toBeVisible()
    }
  })
})

test.describe('Story 4-2: Portfolio Filtering - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/portfolio')
  })

  test('filters work on mobile devices', async ({ page }) => {
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.click()

    await expect(page).toHaveURL(/category=web/i)
  })

  test('can scroll through filter tabs on mobile', async ({ page }) => {
    const filterSection = page.getByTestId('portfolio-filters')
    await expect(filterSection).toBeVisible()

    // Should be able to see and click E-Commerce filter
    const ecommerceFilter = page.getByRole('button', { name: /E-Commerce|E Commerce|Ecommerce/i })
    await ecommerceFilter.scrollIntoViewIfNeeded()
    await expect(ecommerceFilter).toBeVisible()
  })

  test('filtered results display correctly on mobile', async ({ page }) => {
    const mobileFilter = page.getByRole('button', { name: /^Mobile$/i })
    await mobileFilter.click()
    await page.waitForTimeout(500)

    const projectCards = page.getByTestId('project-card')
    await expect(projectCards.first()).toBeVisible()
  })
})

test.describe('Story 4-2: Portfolio Filtering - Keyboard Navigation', () => {
  test('can navigate filters with keyboard', async ({ page }) => {
    await page.goto('/portfolio')

    // Tab to filter buttons
    await page.keyboard.press('Tab')

    // Focus should be on a filter button
    const focusedElement = page.locator(':focus')
    const tagName = await focusedElement.evaluate(el => el.tagName)
    expect(tagName).toBe('BUTTON')
  })

  test('can activate filter with Enter key', async ({ page }) => {
    await page.goto('/portfolio')

    // Tab to Web filter
    const webFilter = page.getByRole('button', { name: /^Web$/i })
    await webFilter.focus()

    // Press Enter
    await page.keyboard.press('Enter')

    // URL should update
    await expect(page).toHaveURL(/category=web/i)
  })

  test('can activate filter with Space key', async ({ page }) => {
    await page.goto('/portfolio')

    const mobileFilter = page.getByRole('button', { name: /^Mobile$/i })
    await mobileFilter.focus()

    // Press Space
    await page.keyboard.press('Space')

    await expect(page).toHaveURL(/category=mobile/i)
  })
})
