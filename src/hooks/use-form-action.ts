'use client';

import { useActionState } from 'react';
import type { ActionResult } from '@/types';

/**
 * Reusable hook for managing Server Action form state
 * Wraps React 19's useActionState with typed ActionResult handling
 *
 * @example
 * ```tsx
 * const { formAction, isPending, isSuccess, error } = useFormAction(submitQuoteRequest)
 *
 * return (
 *   <form action={formAction}>
 *     {error && <p className="text-error">{error}</p>}
 *     <Button isLoading={isPending}>Submit</Button>
 *   </form>
 * )
 * ```
 *
 * @note Test coverage: E2E tests in tests/form-infrastructure.spec.ts verify
 * the hook's integration with Server Actions. The hook's logic is minimal
 * (state derivation only) and covered by form submission tests.
 */
export function useFormAction<T>(
  action: (
    prevState: ActionResult<T>,
    formData: FormData
  ) => Promise<ActionResult<T>>,
  initialState: ActionResult<T> = { success: false, error: '' }
) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return {
    /** Current state from the action */
    state,
    /** Form action to pass to <form action={...}> */
    formAction,
    /** Whether the action is currently executing */
    isPending,
    /** Whether the last action was successful */
    isSuccess: state.success,
    /** Error message if the last action failed */
    error: !state.success ? state.error : null,
    /** Data returned on success */
    data: state.success ? state.data : undefined,
  };
}
