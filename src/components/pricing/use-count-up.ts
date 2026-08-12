'use client'

import { useEffect, useRef } from 'react'

/**
 * Counts a number up **in place**, by writing to the DOM node — never by
 * re-rendering it.
 *
 * This is deliberate. `/pricing` is server-rendered with the visitor's real
 * currency in the first byte of HTML (see `page.tsx`), and a count-up driven
 * by React state would mean the component's *rendered* output was a partial
 * number. Here React always renders the true, final, formatted price; the
 * animation borrows the text node for ~600ms and hands it back. Server HTML,
 * hydration output and the settled DOM are all the published price, and a
 * visitor with JavaScript off sees the number, not a zero.
 *
 * The element the returned ref is attached to MUST carry the final string in
 * `data-count-final` as well as in its text. React updates that attribute on
 * every commit, so the cleanup below can always restore the *current* price —
 * reading it back from the DOM avoids keeping a second, staler copy in a ref.
 *
 * Guards: reduced motion skips the animation entirely, `mode: 'change'` never
 * animates the first value it sees, and `format` must be referentially stable
 * (wrap it in `useCallback`) or the animation restarts on every render.
 *
 * CONTRACT for `mode: 'view'`: the host element must NOT be remounted while
 * the page lives. "Already played" is per-hook-instance state, so a `key` that
 * changes — a currency, say — throws it away and the figure re-rolls from
 * zero every time the reader switches. Change the *props* instead: a currency
 * change re-runs this effect, finds `played`, and lets React rewrite the text
 * in place. See the note in `price.tsx`.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>({
  target,
  format,
  enabled = true,
  mode = 'view',
  duration = 620,
}: {
  /** The number to land on. */
  target: number
  /** Stable formatter — memoise it. */
  format: (value: number) => string
  enabled?: boolean
  /**
   * `view` — run once, when the node first scrolls into view.
   * `change` — run whenever the target changes, but never on first render.
   */
  mode?: 'view' | 'change'
  duration?: number
}) {
  const ref = useRef<T | null>(null)
  const previous = useRef<number | null>(null)
  const played = useRef(false)
  const frame = useRef(0)

  useEffect(() => {
    const el = ref.current
    const from = previous.current
    previous.current = target

    if (!el || !enabled) return
    if (!Number.isFinite(target)) return
    if (prefersReducedMotion()) return
    if (typeof requestAnimationFrame !== 'function') return
    if (mode === 'change' && (from === null || from === target)) return
    if (mode === 'view' && played.current) return

    const start = mode === 'change' ? (from as number) : 0
    if (start === target) return

    const restore = () => {
      cancelAnimationFrame(frame.current)
      const final = el.dataset.countFinal
      if (final !== undefined) el.textContent = final
    }

    const run = () => {
      played.current = true
      const t0 = performance.now()
      const step = (now: number) => {
        // Clamped at both ends: a rAF callback carries the timestamp of the
        // start of the frame, which can be EARLIER than the `performance.now()`
        // taken a moment ago in the same frame — and an unclamped `t` then
        // renders one frame of a negative price.
        const t = Math.min(1, Math.max(0, (now - t0) / duration))
        // easeOutCubic: fast first, settles gently onto the real number.
        const eased = 1 - Math.pow(1 - t, 3)
        if (t >= 1) {
          el.textContent = format(target)
          return
        }
        el.textContent = format(Math.round(start + (target - start) * eased))
        frame.current = requestAnimationFrame(step)
      }
      frame.current = requestAnimationFrame(step)
    }

    if (mode === 'change') {
      run()
      return restore
    }

    if (typeof IntersectionObserver !== 'function') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        run()
      },
      { threshold: 0.35 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      restore()
    }
  }, [target, enabled, mode, duration, format])

  return ref
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  if (typeof window.matchMedia !== 'function') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
