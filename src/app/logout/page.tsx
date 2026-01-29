'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

/**
 * Logout Page (Story 7-5 - Code Review Fix)
 *
 * Provides a dedicated logout route that signs out the user
 * and redirects to the home page.
 *
 * Usage: Navigate to /logout to sign out
 */
export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-foreground-muted">Signing out...</p>
      </div>
    </div>
  )
}
