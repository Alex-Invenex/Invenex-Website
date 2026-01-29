import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

/**
 * NextAuth.js v5 Configuration (Story 7-5)
 *
 * Simple credentials-based authentication for Sanity Studio access.
 * Uses environment variables for admin credentials.
 *
 * Security features:
 * - Basic rate limiting (5 attempts per 15 minutes per email)
 * - Zod validation for input sanitization
 * - CSRF protection (built into NextAuth.js)
 *
 * Note: For production at scale, consider:
 * - Redis-based rate limiting
 * - Account lockout after N failures
 * - Login attempt logging/alerting
 *
 * @see https://authjs.dev/getting-started/authentication/credentials
 */

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

/**
 * Simple in-memory rate limiter for login attempts.
 * Limits to 5 attempts per 15 minutes per email.
 *
 * Note: This resets on server restart. For production,
 * use Redis or a database-backed solution.
 */
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(email: string): boolean {
  const now = Date.now()
  const record = loginAttempts.get(email)

  if (!record || now > record.resetAt) {
    loginAttempts.set(email, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false
  }

  record.count++
  return true
}

function clearRateLimit(email: string): void {
  loginAttempts.delete(email)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // Check rate limit before attempting authentication
        if (!checkRateLimit(parsed.data.email)) {
          // Rate limited - return null (shows as invalid credentials)
          // In production, you might want to throw a specific error
          return null
        }

        // Validate against environment variables
        if (
          parsed.data.email === process.env.ADMIN_EMAIL &&
          parsed.data.password === process.env.ADMIN_PASSWORD
        ) {
          // Clear rate limit on successful login
          clearRateLimit(parsed.data.email)
          return {
            id: '1',
            email: parsed.data.email,
            name: 'Admin',
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isStudio = nextUrl.pathname.startsWith('/studio')

      if (isStudio && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      return true
    },
  },
  trustHost: true,
})
