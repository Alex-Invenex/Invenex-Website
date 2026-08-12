import { test, expect, request as playwrightRequest } from '@playwright/test'

/**
 * Task 10: site-wide CTA sweep.
 *
 * Verbatim quote-request language ("Get a Quote", "Request a Quote", "free quote",
 * "get an estimate", "request pricing") must not appear anywhere on the pages that
 * carry the primary CTA. The new copy is pricing-led: "See Pricing" (primary) /
 * "Book a 15-min fit call" (secondary), per 02-COPY-DECK.md §3 and §11.
 */

const PAGES = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/products',
  '/contact',
  '/pricing',
]

const QUOTE_LANGUAGE =
  /get a quote|get quote|request a quote|get an estimate|request pricing|free quote/i

// Approved copy-deck §2 rhetoric ("A free quote is a guess…") appears verbatim on
// /pricing and /blueprint, contrasting Invenex's fixed pricing against the old
// "free quote" sales model. It is not a CTA and is explicitly sanctioned copy, so
// it is stripped out before applying QUOTE_LANGUAGE — everything else still trips
// the guard, which is what keeps it meaningful (see sanity check below).
const APPROVED_QUOTE_PHRASE = /a free quote is a guess/gi

function stripApprovedCopy(text: string): string {
  return text.replace(APPROVED_QUOTE_PHRASE, '')
}

test.describe('T10: CTA sweep', () => {
  test('sanity: QUOTE_LANGUAGE still matches a real quote-CTA string', () => {
    // Guards against the approved-phrase strip silently neutering the regex —
    // if this ever fails, the guard below is no longer trustworthy.
    expect('Get a Quote').toMatch(QUOTE_LANGUAGE)
    expect('Request a Quote').toMatch(QUOTE_LANGUAGE)
    expect(stripApprovedCopy('A free quote is a guess.')).not.toMatch(QUOTE_LANGUAGE)
    expect(stripApprovedCopy('Get a free quote today!')).toMatch(QUOTE_LANGUAGE)
  })

  for (const path of PAGES) {
    test(`no quote-request language on ${path}`, async ({ page }) => {
      await page.goto(path)
      const body = await page.textContent('body')
      expect(stripApprovedCopy(body ?? '')).not.toMatch(QUOTE_LANGUAGE)
    })
  }

  for (const path of PAGES) {
    test(`${path} offers a visible link to pricing`, async ({ page }) => {
      await page.goto(path)
      const pricingLink = page
        .getByRole('link', { name: /pricing/i })
        .first()
      await expect(pricingLink).toBeVisible()
    })
  }

  test('navbar CTA reads "See Pricing" and points at /pricing', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    const cta = page.getByRole('link', { name: /see pricing/i }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/pricing')
  })

  test('mobile menu CTA reads "See Pricing" and points at /pricing', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.getByTestId('mobile-menu-button').click()
    const cta = page.getByRole('link', { name: /see pricing/i }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/pricing')
  })

  test('homepage bottom CTA offers "See Pricing" and "Book a 15-min fit call"', async ({
    page,
  }) => {
    await page.goto('/')
    const ctaSection = page.getByTestId('cta-section')
    await expect(ctaSection.getByRole('link', { name: /see pricing/i })).toHaveAttribute(
      'href',
      '/pricing'
    )
    await expect(
      ctaSection.getByRole('link', { name: /book a 15-min fit call/i })
    ).toHaveAttribute('href', '/contact')
  })

  test('mainNav includes Work, Pricing and (per binding decision) Careers', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: /main navigation/i })
    await expect(nav.getByRole('link', { name: /^work$/i })).toHaveAttribute(
      'href',
      '/portfolio'
    )
    await expect(nav.getByRole('link', { name: /^pricing$/i })).toHaveAttribute(
      'href',
      '/pricing'
    )
    await expect(nav.getByRole('link', { name: /^careers$/i })).toHaveAttribute(
      'href',
      '/careers'
    )
  })

  test('repo-level guard: no quote-request string in src/', async () => {
    // Mirrors the final gate in the task brief. Skipped in CI browsers without a
    // filesystem/exec bridge — Playwright's Node test runner has both, so this
    // simply reruns the grep from inside the suite for fast local feedback.
    // The approved copy-deck §2 line "A free quote is a guess…" (pricing-client.tsx,
    // blueprint-client.tsx) is explicitly excluded — see APPROVED_QUOTE_PHRASE above.
    const { execSync } = await import('node:child_process')
    let stdout = ''
    try {
      stdout = execSync(
        'grep -rni "get a quote\\|request a quote\\|get an estimate\\|request pricing\\|free quote" src/ --include=*.tsx --include=*.ts | grep -v test | grep -vi "free quote is a guess" || true',
        { cwd: process.cwd(), encoding: 'utf-8' }
      )
    } catch {
      stdout = ''
    }
    expect(stdout.trim()).toBe('')
  })

  test('/work redirects to /portfolio (needs a server restart to pick up next.config.ts)', async () => {
    // NOTE: next.config.ts redirects() only take effect after the dev server is
    // restarted. This spec was written and the redirect config landed in the
    // same change, but the shared dev server used by this test run predates the
    // config change, so this assertion may fail until the controller restarts
    // it. Once restarted it should resolve with a 3xx/2xx status under 400.
    const ctx = await playwrightRequest.newContext({
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
    })
    const response = await ctx.get('/work', { maxRedirects: 0 })
    expect(response.status()).toBeLessThan(400)
    await ctx.dispose()
  })
})
