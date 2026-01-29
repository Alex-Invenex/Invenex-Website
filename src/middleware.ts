/**
 * NextAuth.js Middleware (Story 7-5)
 *
 * Protects the /studio route by requiring authentication.
 * Unauthenticated users are redirected to /login.
 */
export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/studio/:path*'],
}
