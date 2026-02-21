'use client'

import dynamic from 'next/dynamic'

const WhyChooseUs = dynamic(
  () =>
    import('@/components/sections/why-choose-us').then((m) => m.WhyChooseUs),
  { ssr: false }
)
const Testimonials = dynamic(
  () =>
    import('@/components/sections/testimonials').then((m) => m.Testimonials),
  { ssr: false }
)
const InstagramReels = dynamic(
  () =>
    import('@/components/sections/instagram-reels').then(
      (m) => m.InstagramReels
    ),
  { ssr: false }
)
const CTASection = dynamic(
  () =>
    import('@/components/sections/cta-section').then((m) => m.CTASection),
  { ssr: false }
)

export function BelowFoldSections() {
  return (
    <>
      <WhyChooseUs />
      <Testimonials />
      <InstagramReels />
      <CTASection />
    </>
  )
}
