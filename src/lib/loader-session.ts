/**
 * Loader Session Utilities
 *
 * Manages sessionStorage state for the initial page loader.
 * Handles SSR safely by checking for window/sessionStorage availability.
 *
 * Story 9.9: Branded Page Loader
 */

const VISITED_KEY = 'invenex-visited'

/**
 * Check if this is a repeat visit within the same browser session.
 * Returns true if user has already seen the initial loader.
 *
 * SSR-safe: returns false on server (will show loader by default).
 */
export function hasVisitedBefore(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    return sessionStorage.getItem(VISITED_KEY) === 'true'
  } catch {
    // sessionStorage may be disabled or blocked
    return false
  }
}

/**
 * Mark the current session as having visited.
 * Called after the initial loader completes.
 *
 * SSR-safe: no-op on server.
 */
export function markVisited(): void {
  if (typeof window === 'undefined') {
    return
  }
  try {
    sessionStorage.setItem(VISITED_KEY, 'true')
  } catch {
    // sessionStorage may be disabled or blocked
  }
}

/**
 * Clear the visited flag (for testing purposes).
 *
 * SSR-safe: no-op on server.
 */
export function clearVisited(): void {
  if (typeof window === 'undefined') {
    return
  }
  try {
    sessionStorage.removeItem(VISITED_KEY)
  } catch {
    // sessionStorage may be disabled or blocked
  }
}
