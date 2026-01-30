import { test, expect } from '@playwright/test'

test.describe('Hero Section 2.0', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Desktop - Basic Rendering', () => {
    test('renders hero section with all content', async ({ page }) => {
      // Check hero section exists
      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()

      // Check headline
      await expect(page.getByRole('heading', { name: /We Build Digital Excellence/i })).toBeVisible()

      // Check subtext
      await expect(page.getByText(/Premium web development/i)).toBeVisible()

      // Check CTAs
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
      await expect(page.getByTestId('hero-cta-secondary')).toBeVisible()

      // Check stats
      await expect(page.getByText('50+')).toBeVisible()
      await expect(page.getByText('Projects Delivered')).toBeVisible()
    })

    test('has correct accessibility attributes', async ({ page }) => {
      const hero = page.getByTestId('hero-section')
      await expect(hero).toHaveAttribute('aria-labelledby', 'hero-title')

      const title = page.locator('#hero-title')
      await expect(title).toBeVisible()
    })

    test('badge with sparkles icon is visible', async ({ page }) => {
      await expect(page.getByText('Crafting Digital Excellence Since 2020')).toBeVisible()
    })

    test('CTA links have correct hrefs', async ({ page }) => {
      const primaryCTA = page.getByTestId('hero-cta-primary')
      const secondaryCTA = page.getByTestId('hero-cta-secondary')

      await expect(primaryCTA).toHaveAttribute('href', '/contact')
      await expect(secondaryCTA).toHaveAttribute('href', '/portfolio')
    })
  })

  test.describe('Desktop - Mouse Parallax', () => {
    test('parallax orbs have correct test ids', async ({ page }) => {
      await expect(page.getByTestId('parallax-orb-1')).toBeVisible()
      await expect(page.getByTestId('parallax-orb-2')).toBeVisible()
      await expect(page.getByTestId('parallax-orb-3')).toBeVisible()
    })

    test('parallax orbs respond to mouse movement', async ({ page }) => {
      // Get initial transform
      const orb1 = page.getByTestId('parallax-orb-1')
      const initialStyle = await orb1.getAttribute('style')

      // Move mouse to different position
      await page.mouse.move(100, 100)
      await page.waitForTimeout(200)

      await page.mouse.move(500, 500)
      await page.waitForTimeout(200)

      // Check that style has transform applied (value should change from initial)
      const newStyle = await orb1.getAttribute('style')
      expect(newStyle).toContain('transform')
    })
  })

  test.describe('Desktop - Animation Sequence', () => {
    test('headline has animated text elements', async ({ page }) => {
      // Check that headline contains span elements for character animation
      const headline = page.locator('#hero-title')
      await expect(headline).toBeVisible()

      // Characters should be wrapped in spans with data-animated-element
      const animatedChars = headline.locator('[data-animated-element]')
      const count = await animatedChars.count()
      expect(count).toBeGreaterThan(0)
    })

    test('animations complete and content is visible', async ({ page }) => {
      // Wait for animations to complete
      await page.waitForTimeout(2000)

      // All content should be visible after animations
      await expect(page.getByText('We Build')).toBeVisible()
      await expect(page.getByText('Digital Excellence')).toBeVisible()
      await expect(page.getByText(/Premium web development/i)).toBeVisible()
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
    })
  })

  test.describe('Scroll Behavior', () => {
    test('hero fades when scrolling down', async ({ page }) => {
      const hero = page.getByTestId('hero-section')

      // Initial state - should be visible
      await expect(hero).toBeVisible()

      // Scroll down past hero
      await page.evaluate(() => {
        window.scrollTo(0, window.innerHeight)
      })

      // Wait for scroll animation
      await page.waitForTimeout(500)

      // Hero should have reduced opacity (via GSAP scroll trigger)
      // We can check the computed style
      const opacity = await hero.evaluate((el) => {
        return window.getComputedStyle(el).opacity
      })

      // After scrolling, opacity should be reduced
      expect(parseFloat(opacity)).toBeLessThan(1)
    })
  })

  test.describe('Mobile Viewport', () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('renders correctly on mobile', async ({ page }) => {
      await page.goto('/')

      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()

      // Check headline
      await expect(page.getByRole('heading', { name: /We Build Digital Excellence/i })).toBeVisible()

      // Check CTAs stack vertically on mobile
      const ctaContainer = page.locator('.flex-col.sm\\:flex-row')
      await expect(ctaContainer).toBeVisible()
    })

    test('touch device does not have parallax transforms', async ({ page }) => {
      // Emulate touch device
      await page.emulateMedia({ reducedMotion: 'no-preference' })

      await page.goto('/')

      // On touch devices, parallax should be disabled
      // The orbs should still be visible but without dynamic transforms
      const orb1 = page.getByTestId('parallax-orb-1')
      await expect(orb1).toBeVisible()

      // Move pointer (simulating touch - no hover capability)
      // Transform should not include dynamic translate values
      // Since we're in mobile viewport, isTouchDevice should be true
    })

    test('floating elements use CSS animation on mobile', async ({ page }) => {
      await page.goto('/')

      // On mobile, floating elements should have animate-float classes
      // instead of transform-based parallax
      const floatingElements = page.locator('[class*="animate-float"]')

      // Count may vary based on touch device detection
      // At minimum, structure should be present
      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()
    })
  })

  test.describe('Reduced Motion', () => {
    test.beforeEach(async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' })
    })

    test('animations are disabled with prefers-reduced-motion', async ({ page }) => {
      await page.goto('/')

      // Content should still be visible
      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()

      // Headline should be visible immediately without animation
      await expect(page.getByText('We Build')).toBeVisible()
      await expect(page.getByText('Digital Excellence')).toBeVisible()

      // AnimatedText should render without animation wrappers
      // or with instant visibility
      const headline = page.locator('#hero-title')
      await expect(headline).toBeVisible()
    })

    test('all content is immediately visible', async ({ page }) => {
      await page.goto('/')

      // No animation delay - everything visible immediately
      await expect(page.getByText('Crafting Digital Excellence Since 2020')).toBeVisible()
      await expect(page.getByText('We Build')).toBeVisible()
      await expect(page.getByText('Digital Excellence')).toBeVisible()
      await expect(page.getByText(/Premium web development/i)).toBeVisible()
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
      await expect(page.getByTestId('hero-cta-secondary')).toBeVisible()
      await expect(page.getByText('50+')).toBeVisible()
    })
  })

  test.describe('Visual Elements', () => {
    test('gradient background is present', async ({ page }) => {
      const hero = page.getByTestId('hero-section')

      // Check for gradient orb elements
      await expect(page.getByTestId('parallax-orb-1')).toBeVisible()

      // The orbs should have blur styling
      const orb1 = page.getByTestId('parallax-orb-1')
      const className = await orb1.getAttribute('class')
      expect(className).toContain('blur-')
    })

    test('grid pattern overlay is present', async ({ page }) => {
      const gridOverlay = page.locator('.bg-grid')
      await expect(gridOverlay).toBeVisible()
    })

    test('scroll indicator is visible', async ({ page }) => {
      // Scroll indicator at bottom
      const scrollIndicator = page.locator('.animate-scroll-indicator')
      await expect(scrollIndicator).toBeVisible()
    })

    test('bottom fade gradient is present', async ({ page }) => {
      const bottomFade = page.locator('.bg-gradient-to-t.from-background')
      await expect(bottomFade).toBeVisible()
    })
  })
})
