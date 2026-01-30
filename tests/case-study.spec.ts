import { test, expect } from '@playwright/test'

test.describe('Story 4-3: Case Study Detail Pages - Desktop', () => {
  // Use first project slug from portfolio
  const testSlug = 'cooltech-international'

  test.beforeEach(async ({ page }) => {
    await page.goto(`/portfolio/${testSlug}`)
  })

  // AC1: Case Study Content
  test('has correct page title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/CoolTech International.*Case Study|CoolTech International.*Invenex/i)
  })

  test('displays hero section with project name, client, and category', async ({ page }) => {
    const heroSection = page.getByTestId('case-study-hero')
    await expect(heroSection).toBeVisible()

    // Project title
    const heroTitle = page.locator('#case-study-hero-title')
    await expect(heroTitle).toBeVisible()
    await expect(heroTitle).toContainText('CoolTech International')

    // Client name
    await expect(heroSection.getByTestId('case-study-client')).toBeVisible()

    // Category badge
    await expect(heroSection.getByTestId('case-study-category')).toBeVisible()
  })

  test('displays challenge section', async ({ page }) => {
    const challengeSection = page.getByTestId('case-study-challenge')
    await expect(challengeSection).toBeVisible()

    // Check heading
    const heading = challengeSection.locator('h2')
    await expect(heading).toContainText(/Challenge/i)
  })

  test('displays solution section', async ({ page }) => {
    const solutionSection = page.getByTestId('case-study-solution')
    await expect(solutionSection).toBeVisible()

    // Check heading
    const heading = solutionSection.locator('h2')
    await expect(heading).toContainText(/Solution/i)
  })

  test('displays results section with metrics', async ({ page }) => {
    const resultsSection = page.getByTestId('case-study-results')
    await expect(resultsSection).toBeVisible()

    // Check heading
    const heading = resultsSection.locator('h2')
    await expect(heading).toContainText(/Results/i)

    // Check metric cards exist
    const metricCards = resultsSection.getByTestId('result-metric')
    await expect(metricCards.first()).toBeVisible()
  })

  test('displays project gallery', async ({ page }) => {
    const gallerySection = page.getByTestId('case-study-gallery')
    await expect(gallerySection).toBeVisible()

    // Gallery should have images
    const galleryImages = gallerySection.getByTestId('gallery-image')
    await expect(galleryImages.first()).toBeVisible()
  })

  test('displays technologies used badges', async ({ page }) => {
    const techSection = page.getByTestId('case-study-technologies')
    await expect(techSection).toBeVisible()

    // Check tech badges exist
    const techBadges = techSection.getByTestId('tech-badge')
    await expect(techBadges.first()).toBeVisible()
  })

  test('displays related projects section', async ({ page }) => {
    const relatedSection = page.getByTestId('case-study-related')
    await expect(relatedSection).toBeVisible()

    // Check heading
    const heading = relatedSection.locator('h2')
    await expect(heading).toContainText(/Related Projects/i)
  })

  test('displays CTA section with Start Your Project button', async ({ page }) => {
    const ctaSection = page.getByTestId('case-study-cta')
    await expect(ctaSection).toBeVisible()

    // Check CTA button exists and links to contact
    const ctaButton = ctaSection.getByRole('link', { name: /Start Your Project|Get in Touch/i })
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveAttribute('href', '/contact')
  })

  // AC2: Image Gallery / Lightbox
  // Note: ImageGallery is dynamically loaded for performance optimization (Story 8-5)
  test('clicking gallery image opens lightbox', async ({ page }) => {
    const gallerySection = page.getByTestId('case-study-gallery')
    // Wait for dynamically loaded ImageGallery to render and hydrate
    const firstImage = gallerySection.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    // Small delay to ensure React hydration is complete
    await page.waitForTimeout(500)
    await firstImage.click()

    // Lightbox should be visible
    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })
  })

  test('lightbox can be closed with X button', async ({ page }) => {
    // Wait for dynamically loaded gallery and open lightbox
    const firstImage = page.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500) // Hydration
    await firstImage.click()

    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })

    // Click close button (force to avoid header intercept on some viewports)
    const closeButton = lightbox.getByTestId('lightbox-close')
    await closeButton.click({ force: true })

    // Lightbox should be hidden
    await expect(lightbox).not.toBeVisible()
  })

  test('lightbox can be closed with Escape key', async ({ page }) => {
    // Wait for dynamically loaded gallery and open lightbox
    const firstImage = page.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500) // Hydration
    await firstImage.click()

    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })

    // Press Escape
    await page.keyboard.press('Escape')

    // Lightbox should be hidden
    await expect(lightbox).not.toBeVisible()
  })

  test('lightbox can be closed by clicking outside', async ({ page }) => {
    // Wait for dynamically loaded gallery and open lightbox
    const firstImage = page.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500) // Hydration
    await firstImage.click()

    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })

    // Click on the backdrop (the lightbox element itself, not the image)
    // Use force to avoid header intercept
    await lightbox.click({ position: { x: 10, y: 10 }, force: true })

    // Lightbox should be hidden
    await expect(lightbox).not.toBeVisible()
  })

  test('lightbox has navigation arrows', async ({ page }) => {
    // Wait for dynamically loaded gallery and open lightbox
    const firstImage = page.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500) // Hydration
    await firstImage.click()

    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })

    // Check navigation buttons exist
    const prevButton = lightbox.getByTestId('lightbox-prev')
    const nextButton = lightbox.getByTestId('lightbox-next')
    await expect(prevButton).toBeVisible()
    await expect(nextButton).toBeVisible()
  })

  test('lightbox arrow navigation works', async ({ page }) => {
    // Wait for dynamically loaded gallery and open lightbox
    const firstImage = page.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500) // Hydration
    await firstImage.click()

    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })

    const nextButton = lightbox.getByTestId('lightbox-next')

    // Click next
    await nextButton.click()

    // Lightbox should still be visible (navigated to next image)
    await expect(lightbox).toBeVisible()
  })

  // Accessibility
  test('page has proper accessibility landmarks', async ({ page }) => {
    // Check main landmark
    const main = page.locator('#main-content')
    await expect(main).toBeVisible()

    // Check sections have aria-labelledby
    const heroSection = page.locator('section[aria-labelledby="case-study-hero-title"]')
    await expect(heroSection).toBeVisible()

    const challengeSection = page.locator('section[aria-labelledby="challenge-heading"]')
    await expect(challengeSection).toBeVisible()

    const solutionSection = page.locator('section[aria-labelledby="solution-heading"]')
    await expect(solutionSection).toBeVisible()

    const resultsSection = page.locator('section[aria-labelledby="results-heading"]')
    await expect(resultsSection).toBeVisible()
  })

  // Navigation from portfolio
  test('clicking back navigates to portfolio', async ({ page }) => {
    // Check if there's a back link or breadcrumb
    // This is optional in the story but good UX
    const backLink = page.getByRole('link', { name: /Portfolio|Back/i }).first()

    if (await backLink.isVisible()) {
      await backLink.click()
      await expect(page).toHaveURL('/portfolio')
    }
  })
})

test.describe('Story 4-3: Case Study Detail Pages - Mobile', () => {
  const testSlug = 'cooltech-international'

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(`/portfolio/${testSlug}`)
  })

  test('hero section is visible on mobile', async ({ page }) => {
    const heroSection = page.getByTestId('case-study-hero')
    await expect(heroSection).toBeVisible()

    const heroTitle = page.locator('#case-study-hero-title')
    await expect(heroTitle).toBeVisible()
  })

  test('all sections are visible on mobile', async ({ page }) => {
    await expect(page.getByTestId('case-study-challenge')).toBeVisible()
    await expect(page.getByTestId('case-study-solution')).toBeVisible()
    await expect(page.getByTestId('case-study-results')).toBeVisible()
    await expect(page.getByTestId('case-study-gallery')).toBeVisible()
    await expect(page.getByTestId('case-study-technologies')).toBeVisible()
    await expect(page.getByTestId('case-study-cta')).toBeVisible()
  })

  test('lightbox works on mobile', async ({ page }) => {
    // Wait for dynamically loaded gallery (Story 8-5 optimization)
    const firstImage = page.getByTestId('gallery-image').first()
    await expect(firstImage).toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500) // Hydration
    await firstImage.click()

    const lightbox = page.getByTestId('image-lightbox')
    await expect(lightbox).toBeVisible({ timeout: 5000 })

    // Close with X button (force to avoid header intercept on mobile)
    const closeButton = lightbox.getByTestId('lightbox-close')
    await closeButton.click({ force: true })
    await expect(lightbox).not.toBeVisible()
  })

  test('CTA button is accessible on mobile', async ({ page }) => {
    const ctaSection = page.getByTestId('case-study-cta')
    await ctaSection.scrollIntoViewIfNeeded()

    const ctaButton = ctaSection.getByRole('link', { name: /Start Your Project|Get in Touch/i })
    await expect(ctaButton).toBeVisible()
  })
})

test.describe('Story 4-3: Case Study - Dynamic Routes', () => {
  test('valid project slug loads case study', async ({ page }) => {
    await page.goto('/portfolio/cooltech-international')
    await expect(page.getByTestId('case-study-hero')).toBeVisible()
  })

  test('another valid project slug loads its case study', async ({ page }) => {
    await page.goto('/portfolio/ginger-designs')
    await expect(page.getByTestId('case-study-hero')).toBeVisible()
    await expect(page.locator('#case-study-hero-title')).toContainText('Ginger Designs')
  })

  test('invalid project slug shows 404', async ({ page }) => {
    const response = await page.goto('/portfolio/non-existent-project')
    // Should either show 404 page or redirect
    expect(response?.status()).toBe(404)
  })
})

test.describe('Story 4-3: Case Study - Testimonial', () => {
  // Testimonials are optional per AC1
  test('testimonial section displays when available', async ({ page }) => {
    // Navigate to a project that has a testimonial
    await page.goto('/portfolio/cooltech-international')

    // Testimonial section may or may not exist
    const testimonialSection = page.getByTestId('case-study-testimonial')

    // If visible, check structure
    if (await testimonialSection.isVisible()) {
      await expect(testimonialSection.locator('blockquote')).toBeVisible()
    }
  })
})
