// Shared types

/**
 * Standard result type for Server Actions
 * Provides consistent success/error handling across all form submissions
 */
export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

// Re-export Sanity types for convenience
export * from './sanity'
