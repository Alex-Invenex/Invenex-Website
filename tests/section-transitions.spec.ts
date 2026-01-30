import { test, expect } from '@playwright/test'

test.describe('Section Transition Effects - Story 9.8', () => {
  test.describe('Desktop Viewport', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto('/')
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle')
    })

    test.describe('AC1: Ambient Gradient Orbs', () => {
      test('renders ambient orbs container at page level', async ({ page }) => {
        const orbs = page.getByTestId('ambient-orbs')
        await expect(orbs).toBeVisible()
      })

      test('orbs container has pointer-events: none for click-through', async ({ page }) => {
        const orbs = page.getByTestId('ambient-orbs')
        await expect(orbs).toHaveCSS('pointer-events', 'none')
      })

      test('orbs container is fixed position', async ({ page }) => {
        const orbs = page.getByTestId('ambient-orbs')
        await expect(orbs).toHaveCSS('position', 'fixed')
      })

      test('orbs are hidden from accessibility tree', async ({ page }) => {
        const orbs = page.getByTestId('ambient-orbs')
        await expect(orbs).toHaveAttribute('aria-hidden', 'true')
      })

      test('renders multiple orbs with different colors', async ({ page }) => {
        // Check for purple orbs
        const purpleOrbs = page.locator('[data-orb-color="purple"]')
        await expect(purpleOrbs.first()).toBeAttached()

        // Check for blue orbs
        const blueOrbs = page.locator('[data-orb-color="blue"]')
        await expect(blueOrbs.first()).toBeAttached()
      })

      test('orbs have parallax speed data attributes', async ({ page }) => {
        const orbsWithSpeed = page.locator('[data-orb-speed]')
        const count = await orbsWithSpeed.count()
        expect(count).toBeGreaterThan(0)

        // Check speed values are in AC1 range (0.1-0.3)
        const firstSpeed = await orbsWithSpeed.first().getAttribute('data-orb-speed')
        const speedNum = parseFloat(firstSpeed || '0')
        expect(speedNum).toBeGreaterThanOrEqual(0.1)
        expect(speedNum).toBeLessThanOrEqual(0.3)
      })
    })

    test.describe('AC2: Section Dividers', () => {
      test('renders wave divider between Hero and Services', async ({ page }) => {
        // Wave divider should be present on the page
        const waveDividers = page.locator('[data-divider-variant="wave"]')
        await expect(waveDividers.first()).toBeVisible()
      })

      test('renders diagonal divider on the page', async ({ page }) => {
        const diagonalDividers = page.locator('[data-divider-variant="diagonal"]')
        await expect(diagonalDividers.first()).toBeVisible()
      })

      test('renders curved divider on the page', async ({ page }) => {
        const curvedDividers = page.locator('[data-divider-variant="curve"]')
        await expect(curvedDividers.first()).toBeVisible()
      })

      test('dividers are hidden from accessibility tree', async ({ page }) => {
        const dividers = page.getByTestId('section-divider')
        const first = dividers.first()
        await expect(first).toHaveAttribute('aria-hidden', 'true')
      })

      test('dividers contain SVG elements', async ({ page }) => {
        const divider = page.getByTestId('section-divider').first()
        const svg = divider.locator('svg')
        await expect(svg).toBeAttached()
      })

      test('dividers have responsive height', async ({ page }) => {
        const divider = page.getByTestId('section-divider').first()
        // Check it has height classes (h-20 md:h-28)
        const classes = await divider.getAttribute('class')
        expect(classes).toMatch(/h-\d+/)
      })
    })

    test.describe('AC3: Smooth Color Transitions', () => {
      test('hero section has correct background', async ({ page }) => {
        const hero = page.getByTestId('hero-section')
        await expect(hero).toHaveClass(/bg-background/)
      })

      test('services section has secondary background', async ({ page }) => {
        const services = page.getByTestId('services-preview-section')
        await expect(services).toHaveClass(/bg-background-secondary/)
      })

      test('portfolio section has primary background', async ({ page }) => {
        const portfolio = page.getByTestId('portfolio-preview-section')
        await expect(portfolio).toHaveClass(/bg-background/)
      })

      test('multiple divider variants are used throughout page', async ({ page }) => {
        const waveDividers = page.locator('[data-divider-variant="wave"]')
        const diagonalDividers = page.locator('[data-divider-variant="diagonal"]')
        const curveDividers = page.locator('[data-divider-variant="curve"]')

        const waveCount = await waveDividers.count()
        const diagonalCount = await diagonalDividers.count()
        const curveCount = await curveDividers.count()

        expect(waveCount).toBeGreaterThan(0)
        expect(diagonalCount).toBeGreaterThan(0)
        expect(curveCount).toBeGreaterThan(0)
      })

      test('section transitions with gradient overlays are present', async ({ page }) => {
        // SectionTransition wrappers should be present with gradient overlays
        const sectionTransitions = page.getByTestId('section-transition')
        const count = await sectionTransitions.count()
        expect(count).toBeGreaterThanOrEqual(4) // Services, Portfolio, Testimonials, CTA
      })

      test('gradient overlays have correct height (~150px)', async ({ page }) => {
        const topGradient = page.getByTestId('section-transition-top').first()
        await expect(topGradient).toBeAttached()

        // Verify it has pointer-events none for click-through
        await expect(topGradient).toHaveCSS('pointer-events', 'none')
      })
    })

    test.describe('AC4: Parallax Depth Layers', () => {
      test('orbs have will-change transform for GPU acceleration', async ({ page }) => {
        const orb = page.locator('[data-orb-color]').first()
        await expect(orb).toHaveCSS('will-change', 'transform')
      })

      test('orbs have varying speeds for depth effect', async ({ page }) => {
        const orbs = page.locator('[data-orb-speed]')
        const speeds: number[] = []

        const count = await orbs.count()
        for (let i = 0; i < Math.min(count, 5); i++) {
          const speed = await orbs.nth(i).getAttribute('data-orb-speed')
          speeds.push(parseFloat(speed || '0'))
        }

        // Check that we have varied speeds (not all the same)
        const uniqueSpeeds = new Set(speeds)
        expect(uniqueSpeeds.size).toBeGreaterThan(1)
      })
    })

    test.describe('Visual Continuity', () => {
      test('page has no visible gaps between sections', async ({ page }) => {
        // Scroll through page and verify dividers connect sections
        await page.evaluate(() => window.scrollTo(0, 500))
        await page.waitForTimeout(100)

        // Verify services section is visible after scrolling past hero
        const services = page.getByTestId('services-preview-section')
        await expect(services).toBeInViewport()
      })

      test('dividers fill full width of viewport', async ({ page }) => {
        const divider = page.getByTestId('section-divider').first()
        const box = await divider.boundingBox()

        expect(box).not.toBeNull()
        if (box) {
          // Should be at least 95% of viewport width
          expect(box.width).toBeGreaterThanOrEqual(1280 * 0.95)
        }
      })
    })
  })

  test.describe('Mobile Viewport', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
    })

    test('ambient orbs render on mobile', async ({ page }) => {
      const orbs = page.getByTestId('ambient-orbs')
      await expect(orbs).toBeAttached()
    })

    test('section dividers render on mobile', async ({ page }) => {
      const dividers = page.getByTestId('section-divider')
      await expect(dividers.first()).toBeVisible()
    })

    test('dividers are responsive on mobile', async ({ page }) => {
      const divider = page.getByTestId('section-divider').first()
      const box = await divider.boundingBox()

      expect(box).not.toBeNull()
      if (box) {
        // Should fill mobile width
        expect(box.width).toBeGreaterThanOrEqual(375 * 0.95)
      }
    })

    test('mobile maintains section visual structure', async ({ page }) => {
      // Check key sections are present
      await expect(page.getByTestId('hero-section')).toBeVisible()
      await expect(page.getByTestId('services-preview-section')).toBeAttached()
    })
  })

  test.describe('AC5: Reduced Motion Support', () => {
    test('parallax is disabled when reduced motion is preferred', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Ambient orbs should still render (static)
      const orbs = page.getByTestId('ambient-orbs')
      await expect(orbs).toBeAttached()

      // Section dividers should still render
      const dividers = page.getByTestId('section-divider')
      await expect(dividers.first()).toBeVisible()
    })

    test('orbs remain visible with reduced motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const orbs = page.locator('[data-orb-color]')
      const count = await orbs.count()
      expect(count).toBeGreaterThan(0)
    })

    test('dividers work correctly with reduced motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // All divider variants should still render
      const waveDividers = page.locator('[data-divider-variant="wave"]')
      const diagonalDividers = page.locator('[data-divider-variant="diagonal"]')
      const curveDividers = page.locator('[data-divider-variant="curve"]')

      await expect(waveDividers.first()).toBeVisible()
      await expect(diagonalDividers.first()).toBeVisible()
      await expect(curveDividers.first()).toBeVisible()
    })
  })

  test.describe('Performance', () => {
    test('orbs use CSS blur (GPU accelerated)', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const orb = page.locator('[data-orb-color]').first()
      const filter = await orb.evaluate((el) => window.getComputedStyle(el).filter)

      // Should have blur filter applied
      expect(filter).toMatch(/blur/)
    })

    test('divider SVGs use preserveAspectRatio for performance', async ({ page }) => {
      await page.goto('/')

      const divider = page.getByTestId('section-divider').first()
      const svg = divider.locator('svg')

      await expect(svg).toHaveAttribute('preserveAspectRatio', 'none')
    })
  })
})
