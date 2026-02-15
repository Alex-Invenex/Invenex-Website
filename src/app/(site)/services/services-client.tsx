"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  Share2,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
    icon: Globe,
    href: "/services/web-development",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
  },
  {
    title: "Mobile App Development",
    description:
      "Native iOS and Android applications that deliver exceptional user experiences across all devices.",
    icon: Smartphone,
    href: "/services/mobile-development",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    iconColor: "text-green-400",
  },
  {
    title: "Platform Development",
    description:
      "Enterprise platforms and SaaS solutions designed for scale, reliability, and seamless growth.",
    icon: Layers,
    href: "/services/platform-development",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Online stores and marketplaces that convert visitors into customers and drive revenue growth.",
    icon: ShoppingCart,
    href: "/services/ecommerce",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    iconColor: "text-orange-400",
  },
  {
    title: "Social Media Marketing",
    description:
      "Strategic social media campaigns that grow your brand presence and engage your audience effectively.",
    icon: Share2,
    href: "/services/social-media",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    iconColor: "text-pink-400",
  },
  {
    title: "Digital Strategy",
    description:
      "Technology consulting and roadmapping for digital transformation that drives measurable results.",
    icon: Lightbulb,
    href: "/services/digital-strategy",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    iconColor: "text-yellow-400",
  },
];

const process = [
  {
    step: 1,
    title: "Discovery",
    description: "We learn about your business, goals, and challenges",
  },
  {
    step: 2,
    title: "Strategy",
    description: "We create a detailed roadmap for your project success",
  },
  {
    step: 3,
    title: "Design",
    description: "We craft beautiful, intuitive, and functional designs",
  },
  {
    step: 4,
    title: "Development",
    description: "We build with precision, quality, and attention to detail",
  },
  {
    step: 5,
    title: "Launch",
    description: "We deploy, optimize, and ensure everything runs smoothly",
  },
];

const technologies = [
  { name: "React", abbr: "Re" },
  { name: "Next.js", abbr: "N" },
  { name: "Node.js", abbr: "No" },
  { name: "TypeScript", abbr: "TS" },
  { name: "Python", abbr: "Py" },
  { name: "AWS", abbr: "AW" },
  { name: "PostgreSQL", abbr: "Pg" },
  { name: "MongoDB", abbr: "Mg" },
];

export function ServicesClient() {
  return (
    <>
      {/* Hero Section */}
      <section
        aria-labelledby="services-hero-heading"
        className="relative pt-32 pb-16 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-coral-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-coral-500/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-6">
              What We Offer
            </span>
            <h1
              id="services-hero-heading"
              className="text-5xl md:text-6xl font-bold"
            >
              Our <span className="text-gradient">Services</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs.
              From concept to launch, we&apos;ve got you covered.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid Section */}
      <section
        aria-labelledby="services-grid-heading"
        className="py-24 bg-background relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral-500/5 rounded-full blur-[150px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-400/5 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="container mx-auto px-6 relative z-10">
          <h2 id="services-grid-heading" className="sr-only">
            Our Services
          </h2>
          <div
            data-testid="services-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
                    data-testid="service-card"
                  >
                    <div
                      className={`
                        relative h-full p-8 rounded-2xl
                        bg-white/[0.02] border border-white/[0.05]
                        hover:bg-white/[0.04] hover:border-white/10
                        group-focus-visible:bg-white/[0.04] group-focus-visible:border-white/10
                        transition-all duration-300 ease-out
                        overflow-hidden
                      `}
                    >
                      {/* Gradient background on hover */}
                      <div
                        className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500`}
                        aria-hidden="true"
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div
                          data-testid="service-icon"
                          className={`
                            w-14 h-14 rounded-xl
                            bg-white/5 border border-white/10
                            flex items-center justify-center mb-6
                            group-hover:scale-110 group-hover:border-white/20
                            group-focus-visible:scale-110 group-focus-visible:border-white/20
                            transition-all duration-300
                          `}
                        >
                          <Icon
                            className={`w-7 h-7 ${service.iconColor}`}
                            aria-hidden="true"
                          />
                        </div>

                        {/* Title with arrow */}
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-semibold">
                            {service.title}
                          </h2>
                          <ArrowUpRight
                            className="w-5 h-5 text-foreground-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Description */}
                        <p className="text-foreground-muted leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Learn More link */}
                        <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-white group-focus-visible:text-white transition-colors">
                          Learn More
                          <ArrowUpRight
                            className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 transition-transform"
                            aria-hidden="true"
                          />
                        </span>
                      </div>

                      {/* Hover glow effect */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        aria-labelledby="process-heading"
        className="py-24 bg-background-secondary"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-4">
              How We Work
            </span>
            <h2 id="process-heading" className="text-3xl md:text-4xl font-bold">
              Our Process
            </h2>
            <p className="mt-4 text-foreground-muted max-w-2xl mx-auto">
              A proven methodology that brings your vision to life
            </p>
          </AnimatedSection>

          <div className="relative flex flex-col md:flex-row justify-between gap-8">
            {/* Connector line for desktop */}
            <div
              className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-coral-500/30 via-coral-400/30 to-coral-500/30"
              aria-hidden="true"
            />

            {process.map((step, i) => (
              <AnimatedSection
                key={step.step}
                delay={i * 0.1}
                className="flex-1 relative"
              >
                <div className="text-center">
                  {/* Step number */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-r from-coral-500 via-coral-400 to-coral-500 flex items-center justify-center mx-auto mb-4 font-bold text-white text-lg shadow-[0_0_20px_rgba(255,106,55,0.3)]">
                    {step.step}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-muted">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section aria-labelledby="tech-heading" className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-4">
              Tech Stack
            </span>
            <h2 id="tech-heading" className="text-3xl md:text-4xl font-bold">
              Technologies We Use
            </h2>
            <p className="mt-4 text-foreground-muted max-w-2xl mx-auto">
              Modern tools and frameworks for cutting-edge solutions
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {technologies.map((tech, i) => (
              <AnimatedSection key={tech.name} delay={i * 0.05}>
                <div className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-coral-500/20 transition-all duration-300 text-center">
                  <div
                    className="w-12 h-12 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-coral-500/20 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    <span className="text-sm font-bold text-coral-500">{tech.abbr}</span>
                  </div>
                  <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        aria-labelledby="cta-heading"
        className="py-24 bg-background-secondary relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-coral-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can help you achieve your digital goals
              and transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
