'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

/**
 * Admin Login Page (Story 7-5)
 *
 * Simple login page for Sanity Studio access.
 * Uses NextAuth.js credentials provider.
 */
export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials')
      setIsLoading(false)
    } else {
      // Use window.location for full navigation to /studio
      // This ensures proper URL change and session cookie application
      window.location.href = '/studio'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Admin Login</h1>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to access Sanity Studio
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="admin@invenex.in"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          {error && (
            <p className="text-error text-sm" role="alert" data-testid="login-error">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            data-testid="login-submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}
