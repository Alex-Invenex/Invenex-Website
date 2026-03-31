'use client'

import { useRef, useEffect, useState } from 'react'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { QuoteForm } from '@/components/forms/quote-form'
import { contactInfo } from '@/lib/constants'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/* ─── Contact info items ───────────────────────────────── */
const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: contactInfo.whatsapp,
    href: `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
    external: true,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: `${contactInfo.address.street}, ${contactInfo.address.city}, ${contactInfo.address.state}, ${contactInfo.address.country} - ${contactInfo.address.zip}`,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: contactInfo.businessHours,
  },
]

/* ─── Component ────────────────────────────────────────── */
export function ContactClient() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        id="contact-hero-heading"
        tag="// Get In Touch"
        variant="centered"
        headline={
          <>
            <HeadlineWord thin>LET&apos;S</HeadlineWord>
            <HeadlineWord coral>BUILD SOMETHING GREAT.</HeadlineWord>
          </>
        }
        subtitle="Tell us about your project and we'll get back to you within 24 hours."
      />

      {/* Form + Contact Info */}
      <FormSection />
    </>
  )
}

/* ─── Form & Contact Info ──────────────────────────────── */
function FormSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-cf]', { opacity: 1, y: 0, x: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        // Form entrance
        gsap.fromTo(
          section.querySelector('[data-cf="form"]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%' },
          }
        )
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-16 bg-background relative overflow-hidden" aria-labelledby="contact-form-heading">
      {/* Atmospheric elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-[10%] left-[5%] rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)' }} />
        {/* Grain */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.03,
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <h2 id="contact-form-heading" className="sr-only">Contact Form and Information</h2>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Quote Form — glassmorphic wrapper */}
          <div
            data-cf="form"
            className="rounded-2xl p-6 md:p-8 backdrop-blur-xl border border-surface-border"
            style={{ background: 'var(--color-surface-overlay)' }}
          >
            <QuoteForm />
          </div>

          {/* Contact info cards */}
          <GSAPStaggerContainer className="space-y-4" fromVars={{ opacity: 0, x: 30 }}>
            {contactItems.map((item) => {
              const Icon = item.icon
              const Wrapper = item.href ? 'a' : 'div'
              const wrapperProps = item.href
                ? {
                    href: item.href,
                    ...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                  }
                : {}

              return (
                <GSAPStaggerItem key={item.label}>
                  <Wrapper
                    {...wrapperProps}
                    className="flex items-start gap-4 p-5 rounded-xl backdrop-blur-xl border border-surface-border transition-all duration-300 hover:border-coral-500/20 group"
                    style={{ background: 'var(--color-surface-overlay)' }}
                    data-testid="contact-info"
                  >
                    <div className="w-10 h-10 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center shrink-0 group-hover:bg-coral-500/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-coral-500" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm">{item.label}</h3>
                      <p className="text-foreground-muted text-sm group-hover:text-foreground transition-colors">{item.value}</p>
                    </div>
                  </Wrapper>
                </GSAPStaggerItem>
              )
            })}
          </GSAPStaggerContainer>
        </div>
      </div>
    </section>
  )
}
