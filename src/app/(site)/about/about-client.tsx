'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Target, Handshake, Lightbulb, Zap, Linkedin, User, Rocket } from 'lucide-react'
import { SubpageHero, HeadlineWord } from '@/components/sections/subpage-hero'
import { SubpageCTA } from '@/components/sections/subpage-cta'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GSAPStaggerContainer, GSAPStaggerItem } from '@/components/ui/gsap-stagger-container'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/* ─── Data ─────────────────────────────────────────────── */
const values = [
  { icon: Target, title: 'Excellence', description: 'We deliver nothing but the best' },
  { icon: Handshake, title: 'Partnership', description: 'Your success is our success' },
  { icon: Lightbulb, title: 'Innovation', description: 'Always pushing boundaries' },
  { icon: Zap, title: 'Speed', description: 'Fast delivery without compromise' },
]

const stats = [
  { value: 2024, label: 'Founded' },
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 4, label: 'Founders' },
]

const team = [
  { name: 'Lijo Varghese', role: 'Founder & Mentor', image: '/team/lijo-varghese.jpg', linkedin: 'https://www.linkedin.com/in/lijo-varghese-7ab710310/' },
  { name: 'Alex Sebastian', role: 'Founder & Marketing Lead', image: '/team/alex-sebastian.jpg', linkedin: 'https://www.linkedin.com/in/alex-invenex/' },
  { name: 'Vishnu Manoj', role: 'Founder & Senior Developer', image: '/team/vishnu-manoj.jpg', linkedin: 'https://www.linkedin.com/in/vishnu-manoj-invenex/' },
  { name: 'Jeffrey Jaison', role: 'Founder & Operational Manager', image: '/team/jeffrey-jaison.jpg', linkedin: 'https://www.linkedin.com/in/jeffrey-invenex/' },
]

/* ─── Component ────────────────────────────────────────── */
export function AboutClient() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        id="about-hero-title"
        tag="// About Us"
        headline={
          <>
            <HeadlineWord thin>BUILDING THE</HeadlineWord>
            <HeadlineWord coral>FUTURE</HeadlineWord>
          </>
        }
        subtitle="Your trusted partner in digital transformation — one project at a time."
      />

      {/* Story */}
      <StorySection />

      {/* Values */}
      <ValuesSection />

      {/* Team */}
      <TeamSection />

      {/* CTA */}
      <SubpageCTA
        headline="LET'S"
        highlightedText="CONNECT"
        subtitle="Have a project in mind? Let's discuss how we can bring your vision to life."
        primaryCTA={{ label: 'Get In Touch', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/portfolio' }}
      />
    </>
  )
}

/* ─── Story Section ────────────────────────────────────── */
function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-story]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        // Paragraphs reveal
        gsap.fromTo(
          section.querySelectorAll('[data-story="p"]'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%' },
          }
        )

        // Stats card entrance
        gsap.fromTo(
          section.querySelector('[data-story="stats"]'),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 65%' },
          }
        )
      }
      init()
    },
    { scope: sectionRef, dependencies: [mounted] }
  )

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden" aria-labelledby="about-story-title" data-testid="about-story-section">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[20%] right-[10%] rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,106,55,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="about-story-title" className="text-3xl font-bold mb-6" data-story="p">Our Story</h2>
            <div className="space-y-4 text-foreground-muted">
              <p data-story="p">
                Invenex Solutions started with a simple mission: deliver world-class digital
                solutions that help businesses thrive in the digital age.
              </p>
              <p data-story="p">
                Today, we&apos;re a team of passionate developers, designers, and strategists
                who believe in the power of technology to transform businesses.
              </p>
              <p data-story="p">
                From startups to established enterprises, we&apos;ve partnered with businesses
                across industries to create exceptional digital experiences that drive growth
                and engagement.
              </p>
            </div>
          </div>

          {/* Stats card — glassmorphic */}
          <div
            data-story="stats"
            className="rounded-2xl overflow-hidden relative backdrop-blur-xl border border-white/[0.08]"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-0 right-0 rounded-full blur-[80px]" style={{ width: 300, height: 300, background: 'rgba(255,106,55,0.08)' }} />
              <div className="absolute bottom-0 left-0 rounded-full blur-[60px]" style={{ width: 200, height: 200, background: 'rgba(255,106,55,0.05)' }} />
            </div>
            <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-[280px]">
              <div className="w-16 h-16 rounded-2xl bg-coral-500/20 border border-coral-500/30 flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-coral-400" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-foreground">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm text-foreground-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Values Section ──────────────────────────────────── */
function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-val]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        gsap.fromTo(
          section.querySelectorAll('[data-val="head"]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
    <section ref={sectionRef} className="py-24 bg-background-secondary relative overflow-hidden" aria-labelledby="about-values-title" data-testid="about-values-section">
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 id="about-values-title" className="text-3xl font-bold" data-val="head">Our Values</h2>
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto" data-val="head">
            The principles that guide everything we do
          </p>
        </div>

        <GSAPStaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <GSAPStaggerItem key={value.title}>
                <div className="text-center p-6 rounded-2xl backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-coral-500/20 group relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {/* Hover accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-coral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="w-14 h-14 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-coral-500" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground-muted">{value.description}</p>
                </div>
              </GSAPStaggerItem>
            )
          })}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Team Section ─────────────────────────────────────── */
function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useGSAP(
    () => {
      if (!mounted) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-tm]', { opacity: 1, y: 0 })
        return
      }

      const init = async () => {
        const { registerScrollTrigger } = await import('@/lib/gsap')
        await registerScrollTrigger()
        const section = sectionRef.current
        if (!section) return

        gsap.fromTo(
          section.querySelectorAll('[data-tm="head"]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden" aria-labelledby="about-team-title" data-testid="about-team-section">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 id="about-team-title" className="text-3xl font-bold" data-tm="head">Meet the Team</h2>
          <p className="mt-4 text-coral-400/70" data-tm="head">The people behind the magic</p>
        </div>

        <GSAPStaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="team-grid">
          {team.map((member) => (
            <GSAPStaggerItem key={member.name}>
              <TeamMemberCard member={member} />
            </GSAPStaggerItem>
          ))}
        </GSAPStaggerContainer>
      </div>
    </section>
  )
}

/* ─── Team Member Card ─────────────────────────────────── */
function TeamMemberCard({ member }: { member: typeof team[number] }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="group relative" data-testid="team-member-card">
      {/* Card with warm border glow */}
      <div
        className="relative rounded-2xl overflow-hidden mb-4 transition-all duration-300"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Subtle warm border */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            padding: 1,
            background: 'linear-gradient(135deg, rgba(255,107,53,0.3), rgba(255,107,53,0.08) 50%, rgba(255,107,53,0.2))',
          }}
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-2xl bg-[#141414]" />
        </div>

        {/* Image container */}
        <div className="absolute inset-[1px] rounded-2xl overflow-hidden">
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-coral-500/10 via-[#141414] to-coral-400/10 animate-pulse" />
          )}

          {hasError ? (
            <div className="w-full h-full bg-gradient-to-br from-coral-500/10 via-[#141414] to-coral-400/10 flex items-center justify-center">
              <User className="w-12 h-12 text-foreground-muted/50" aria-hidden="true" />
            </div>
          ) : (
            <Image
              src={member.image}
              alt={`${member.name}, ${member.role} at Invenex Solutions`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => { setIsLoading(false); setHasError(true) }}
            />
          )}

          {/* Hover overlay with LinkedIn */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-start p-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn profile`}
                className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 rounded-full p-2.5 border border-white/[0.15]"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <h3 className="font-semibold">{member.name}</h3>
      <p className="text-sm text-coral-400/80">{member.role}</p>
    </div>
  )
}
