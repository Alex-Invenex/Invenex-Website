import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Invenex Studio',
  description: 'Content management for Invenex Solutions',
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div style={{ margin: 0, height: '100vh' }}>{children}</div>
}
