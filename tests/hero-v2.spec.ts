import { test, expect } from '@playwright/test'

/**
 * Hero tests — `src/components/sections/hero-v2.tsx`.
 *
 * The assertions here describe the hero as it actually is: the "We Craft
 * Digital Futures." headline, the coral sphere composition, and — after the
 * homepage restructure (05-PAGE-BY-PAGE-CHANGES.md, PAGE 1) — a subline that
 * states a fact instead of four adjectives, with "See Pricing" as the primary
 * call to action.
 *
 * (This file previously described a long-replaced "BUILDING / DIGITAL /
 * EXCELLENCE" hero and asserted stats the component never rendered.)
 */
/**
 * The hero-section locator is always resolved with `.first()` below.
 * `RouteScrollCleanup` wraps the tree in `<div key={pathname}>` (deliberately —
 * it prevents a GSAP pin-spacer `removeChild` crash), and for a ~150ms window
 * during hydration React holds both the outgoing and incoming subtree, so the
 * document briefly contains two `hero-section` nodes and strict mode fails.
 * Measured: 2 nodes at +150ms, back to 1 by +300ms. Nothing is visible to a
 * visitor; the assertions below still describe a single rendered hero.
 */
/**
 * Load the homepage and wait out the hydration window described above, so
 * assertions never race the moment when two copies of the tree are mounted.
 * Without this the flake hits `#hero-title` and the CTA testids too, not just
 * `hero-section`.
 */
async function gotoHome(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.waitForLoadState('load')
  // The count is already 1 on arrival and only becomes 2 once hydration
  // starts, so polling for 1 straight away would pass before the window even
  // opens. Require it to read 1 on two checks ~400ms apart instead, which
  // brackets the measured 150-300ms duplicate.
  const count = () => page.locator('[data-testid="hero-section"]').count()
  await expect.poll(count, { timeout: 10_000 }).toBe(1)
  await page.waitForTimeout(400)
  await expect.poll(count, { timeout: 10_000 }).toBe(1)
}

test.describe('Hero', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test.describe('Rendering', () => {
    test('renders the headline, badge and subline', async ({ page }) => {
      const hero = page.getByTestId('hero-section').first()
      await expect(hero).toBeVisible()

      const headline = page.locator('#hero-title')
      await expect(headline).toContainText('We Craft')
      await expect(headline).toContainText('Digital')
      await expect(headline).toContainText('Futures')

      await expect(hero.getByText('Digital Innovation Agency')).toBeVisible()

      // The subline is the LCP element and is deliberately never animated.
      await expect(
        hero.getByText(/We build the systems businesses actually run on/i)
      ).toBeVisible()
      await expect(hero.getByText(/12,000 catering orders/i)).toBeVisible()
      await expect(hero.getByText(/Prices published/i)).toBeVisible()
    })

    test('does not fall back to the old adjective-led subline', async ({ page }) => {
      const hero = page.getByTestId('hero-section').first()
      await expect(hero.getByText(/Premium web experiences/i)).toHaveCount(0)
    })

    test('has correct accessibility attributes', async ({ page }) => {
      const hero = page.getByTestId('hero-section').first()
      await expect(hero).toHaveAttribute('aria-labelledby', 'hero-title')
      await expect(page.locator('#hero-title')).toBeVisible()
    })

    test('headline uses large display typography', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Desktop typography test — mobile covered below')

      // The size lives on the word spans, not on the h1 itself.
      const word = page.locator('#hero-title span').filter({ hasText: 'Futures' }).first()
      const fontSize = await word.evaluate(
        (el) => window.getComputedStyle(el).fontSize
      )
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(56)
    })
  })

  test.describe('Calls to action', () => {
    test('primary CTA sends the visitor to the published prices', async ({ page }) => {
      const primary = page.getByTestId('hero-cta-primary')
      await expect(primary).toBeVisible()
      await expect(primary).toContainText(/See Pricing/i)
      await expect(primary).toHaveAttribute('href', '/pricing')
    })

    test('secondary CTA offers a fit call', async ({ page }) => {
      const secondary = page.getByTestId('hero-cta-secondary')
      await expect(secondary).toBeVisible()
      await expect(secondary).toContainText(/Book a 15-min fit call/i)
      await expect(secondary).toHaveAttribute('href', '/contact')
    })

    test('CTAs are keyboard accessible links', async ({ page }) => {
      const primary = page.getByTestId('hero-cta-primary')
      await primary.focus()
      await expect(primary).toBeFocused()
      await expect(primary).toHaveRole('link')
    })
  })

  test.describe('Visual elements', () => {
    test('gradient composition is present and hidden from screen readers', async ({
      page,
    }) => {
      const hero = page.getByTestId('hero-section').first()
      await expect(hero.locator('[data-hero-orbs]')).toHaveCount(1)
      await expect(hero.locator('[aria-hidden="true"]').first()).toBeAttached()
    })

    test('scroll hint is present', async ({ page }) => {
      const hero = page.getByTestId('hero-section').first()
      await expect(hero.getByText(/Scroll to Explore/i)).toBeVisible()
    })
  })

  test.describe('Mobile viewport', () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('renders and stacks the CTAs', async ({ page }) => {
      await gotoHome(page)

      const hero = page.getByTestId('hero-section').first()
      await expect(hero).toBeVisible()
      await expect(page.locator('#hero-title')).toContainText('Futures')

      const ctaContainer = hero.locator('.flex-col.sm\\:flex-row')
      await expect(ctaContainer).toBeVisible()
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
    })
  })

  test.describe('Reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
    })

    test('all hero content is visible without animation', async ({ page }) => {
      await gotoHome(page)

      const hero = page.getByTestId('hero-section').first()
      await expect(hero).toBeVisible()
      await expect(page.locator('#hero-title')).toContainText('Futures')
      await expect(hero.getByText(/Prices published/i)).toBeVisible()
      await expect(page.getByTestId('hero-cta-primary')).toBeVisible()
      await expect(page.getByTestId('hero-cta-secondary')).toBeVisible()
    })
  })
})
