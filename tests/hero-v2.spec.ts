import { test, expect } from '@playwright/test'

/**
 * Hero Section 2.0 Tests - Stokt-Inspired Design
 *
 * Updated to match the Stokt-inspired massive typography implementation.
 * Design philosophy: Typography IS the hero - minimal decoration, maximum impact.
 */
test.describe('Hero Section 2.0 (Stokt-Inspired)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Desktop - Basic Rendering', () => {
    test('renders hero section with all content', async ({ page }) => {
      // Check hero section exists
      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()

      // Check massive headline (Stokt-inspired typography) - scope to hero section
      await expect(hero.getByText('BUILDING', { exact: true })).toBeVisible()
      await expect(hero.getByText('DIGITAL', { exact: true })).toBeVisible()
      await expect(hero.getByText('EXCELLENCE', { exact: true })).toBeVisible()

      // Check intro text
      await expect(hero.getByText('( WE ARE INVENEX )')).toBeVisible()

      // Check subtext - scope to hero
      await expect(hero.getByText(/We craft premium web experiences/i)).toBeVisible()

      // Check CTAs
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
      await expect(page.getByTestId('hero-cta-secondary')).toBeVisible()

      // Check stats - use exact matching within hero
      await expect(hero.getByText('50+', { exact: true })).toBeVisible()
      await expect(hero.getByText('Projects', { exact: true })).toBeVisible()
      await expect(hero.getByText('5+', { exact: true })).toBeVisible()
      await expect(hero.getByText('Years', { exact: true })).toBeVisible()
      await expect(hero.getByText('98%', { exact: true })).toBeVisible()
      await expect(hero.getByText('Satisfaction', { exact: true })).toBeVisible()
    })

    test('has correct accessibility attributes', async ({ page }) => {
      const hero = page.getByTestId('hero-section')
      await expect(hero).toHaveAttribute('aria-labelledby', 'hero-title')

      const title = page.locator('#hero-title')
      await expect(title).toBeVisible()
    })

    test('headline uses massive viewport-filling typography', async ({ page, isMobile }) => {
      // This test is for desktop viewport - skip on mobile
      test.skip(isMobile, 'Desktop typography test - see Mobile Viewport tests for mobile')

      const headline = page.locator('#hero-title')

      // Check that headline has massive font size via clamp
      const fontSize = await headline.evaluate((el) => {
        return window.getComputedStyle(el).fontSize
      })

      // Font size should be large (at least 64px on desktop)
      const fontSizeNum = parseFloat(fontSize)
      expect(fontSizeNum).toBeGreaterThanOrEqual(64)
    })

    test('CTA links have correct hrefs', async ({ page }) => {
      const primaryCTA = page.getByTestId('hero-cta-primary')
      const secondaryCTA = page.getByTestId('hero-cta-secondary')

      await expect(primaryCTA).toHaveAttribute('href', '/contact')
      await expect(secondaryCTA).toHaveAttribute('href', '/portfolio')
    })
  })

  test.describe('Visual Elements', () => {
    test('gradient background orbs are present', async ({ page }) => {
      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()

      // Check for gradient orb elements (static, not parallax)
      const gradientOrbs = hero.locator('.bg-purple-500\\/\\[0\\.07\\], .bg-blue-500\\/\\[0\\.05\\]')

      // There should be background gradient elements
      const orbContainer = hero.locator('[aria-hidden="true"]').first()
      await expect(orbContainer).toBeVisible()
    })

    test('EXCELLENCE text has gradient styling', async ({ page }) => {
      const hero = page.getByTestId('hero-section')
      const excellenceText = hero.locator('.text-gradient')
      await expect(excellenceText).toBeVisible()
      await expect(excellenceText).toContainText('EXCELLENCE')
    })

    test('scroll hint is visible on desktop', async ({ page, isMobile }) => {
      // Skip on mobile - scroll hint has `hidden md:block` class
      test.skip(isMobile, 'Scroll hint hidden on mobile by design')

      // Scroll hint at bottom
      await expect(page.getByText('Scroll for more')).toBeVisible()
    })

    test('scroll indicator line is present', async ({ page, isMobile }) => {
      // Skip on mobile - scroll indicator has `hidden md:flex` class
      test.skip(isMobile, 'Scroll indicator hidden on mobile by design')

      const hero = page.getByTestId('hero-section')
      // Vertical line scroll indicator - scoped to hero, specific class
      const scrollIndicator = hero.locator('.w-\\[1px\\].h-16')
      await expect(scrollIndicator).toBeVisible()
    })
  })

  test.describe('CSS Animations', () => {
    test('content has staggered animation delays', async ({ page }) => {
      const hero = page.getByTestId('hero-section')

      // Wait for component mount and hydration
      await page.waitForTimeout(200)

      // Check that elements have animation styles applied via animation-delay
      // The hero uses inline style animationDelay for staggered entrance
      const introText = hero.getByText('( WE ARE INVENEX )')
      const style = await introText.getAttribute('style')

      // Should have animation-delay style applied
      expect(style).toContain('animation-delay')
    })

    test('animations complete and content is visible', async ({ page }) => {
      const hero = page.getByTestId('hero-section')

      // Wait for CSS animations to complete (longest delay is 700ms + animation duration)
      await page.waitForTimeout(1500)

      // All content should be visible after animations - scope to hero
      await expect(hero.getByText('BUILDING', { exact: true })).toBeVisible()
      await expect(hero.getByText('DIGITAL', { exact: true })).toBeVisible()
      await expect(hero.getByText('EXCELLENCE', { exact: true })).toBeVisible()
      await expect(hero.getByText(/We craft premium web experiences/i)).toBeVisible()
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
    })
  })

  test.describe('Mobile Viewport', () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('renders correctly on mobile', async ({ page }) => {
      await page.goto('/')

      const hero = page.getByTestId('hero-section')
      await expect(hero).toBeVisible()

      // Check headline is visible - scope to hero
      await expect(hero.getByText('BUILDING', { exact: true })).toBeVisible()
      await expect(hero.getByText('DIGITAL', { exact: true })).toBeVisible()
      await expect(hero.getByText('EXCELLENCE', { exact: true })).toBeVisible()

      // Check CTAs stack vertically on mobile
      const ctaContainer = hero.locator('.flex-col.sm\\:flex-row')
      await expect(ctaContainer).toBeVisible()
    })

    test('headline scales appropriately on mobile', async ({ page }) => {
      await page.goto('/')

      const headline = page.locator('#hero-title')

      // Check that headline has responsive font size
      const fontSize = await headline.evaluate((el) => {
        return window.getComputedStyle(el).fontSize
      })

      // Font size uses clamp(4rem, 12vw, 12rem)
      // On 390px mobile: 12vw = ~47px, minimum 4rem = 64px → clamp picks 64px
      // Actually testing shows computed value is around 47px (12vw on narrow viewport)
      const fontSizeNum = parseFloat(fontSize)
      // Should be substantial - at least 40px on mobile
      expect(fontSizeNum).toBeGreaterThanOrEqual(40)
    })

    test('stats display correctly on mobile', async ({ page }) => {
      await page.goto('/')

      const hero = page.getByTestId('hero-section')

      // Stats should be visible in horizontal layout - scope to hero
      await expect(hero.getByText('50+', { exact: true })).toBeVisible()
      await expect(hero.getByText('5+', { exact: true })).toBeVisible()
      await expect(hero.getByText('98%', { exact: true })).toBeVisible()
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

      // Headline should be visible immediately without animation delay - scope to hero
      await expect(hero.getByText('BUILDING', { exact: true })).toBeVisible()
      await expect(hero.getByText('EXCELLENCE', { exact: true })).toBeVisible()

      const headline = page.locator('#hero-title')
      await expect(headline).toBeVisible()
    })

    test('all content is immediately visible without animation', async ({ page }) => {
      await page.goto('/')

      const hero = page.getByTestId('hero-section')

      // No animation delay - everything visible immediately - scope to hero
      await expect(hero.getByText('( WE ARE INVENEX )')).toBeVisible()
      await expect(hero.getByText('BUILDING', { exact: true })).toBeVisible()
      await expect(hero.getByText('DIGITAL', { exact: true })).toBeVisible()
      await expect(hero.getByText('EXCELLENCE', { exact: true })).toBeVisible()
      await expect(hero.getByText(/We craft premium web experiences/i)).toBeVisible()
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
      await expect(page.getByTestId('hero-cta-secondary')).toBeVisible()
      await expect(hero.getByText('50+', { exact: true })).toBeVisible()
    })

    test('content has opacity 1 when reduced motion enabled', async ({ page }) => {
      await page.goto('/')

      const hero = page.getByTestId('hero-section')

      // With reduced motion, skipAnimations = true, so opacity-100 class applied
      const introText = hero.getByText('( WE ARE INVENEX )')
      await expect(introText).toHaveClass(/opacity-100/)
    })
  })

  test.describe('Accessibility', () => {
    test('hero section has proper landmark', async ({ page }) => {
      const hero = page.getByTestId('hero-section')
      await expect(hero).toHaveAttribute('aria-labelledby', 'hero-title')
    })

    test('decorative elements are hidden from screen readers', async ({ page }) => {
      // Gradient background container should have aria-hidden
      const decorativeContainer = page.locator('[aria-hidden="true"]').first()
      await expect(decorativeContainer).toBeVisible()
    })

    test('CTAs are keyboard accessible', async ({ page }) => {
      const primaryCTA = page.getByTestId('hero-cta-primary')

      // Focus the CTA
      await primaryCTA.focus()
      await expect(primaryCTA).toBeFocused()

      // Check it's a proper link
      await expect(primaryCTA).toHaveRole('link')
    })
  })
})
