"use client";

import Link from "next/link";
import {
  Check,
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  Share2,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ui/share-buttons";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  layers: Layers,
  "shopping-cart": ShoppingCart,
  share2: Share2,
  lightbulb: Lightbulb,
};

// Process steps (consistent across all services)
const processSteps = [
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

interface ServiceDetailClientProps {
  service: {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    technologies: string[];
    iconName: string;
    gradient: string;
    iconColor: string;
  };
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const Icon = iconMap[service.iconName] || Globe;

  return (
    <>
      {/* Hero Section */}
      <section
        data-testid="service-hero"
        aria-labelledby="service-hero-heading"
        className="relative pt-32 pb-16 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${service.gradient} rounded-full blur-[120px] animate-pulse-glow`}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            {/* Icon */}
            <div
              className={`
                w-20 h-20 rounded-2xl
                bg-white/5 border border-white/10
                flex items-center justify-center mb-8
              `}
            >
              <Icon
                className={`w-10 h-10 ${service.iconColor}`}
                aria-hidden="true"
              />
            </div>
            <h1
              id="service-hero-heading"
              className="text-5xl md:text-6xl font-bold"
            >
              {service.title}
            </h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl">
              {service.description}
            </p>

            {/* Share buttons */}
            <ShareButtons title={`${service.title} - Invenex Solutions`} className="mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* Description Section */}
      <section data-testid="service-description" className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="text-lg text-foreground-muted max-w-3xl leading-relaxed">
              {service.longDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section
        aria-labelledby="features-heading"
        className="py-16 bg-background-secondary"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 id="features-heading" className="text-3xl font-bold">
              What We Offer
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature) => (
              <StaggerItem key={feature}>
                <Card
                  data-testid="feature-card"
                  className="p-6 h-full hover:bg-white/[0.04] hover:border-white/10 focus-visible:bg-white/[0.04] focus-visible:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                      <Check
                        className="w-4 h-4 text-success"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-foreground">{feature}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Technologies Section */}
      <section aria-labelledby="tech-heading" className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 id="tech-heading" className="text-3xl font-bold">
              Technologies We Use
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <Badge
                  key={tech}
                  size="md"
                  data-testid="tech-badge"
                  className="px-4 py-2"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section
        aria-labelledby="process-heading"
        data-testid="service-process"
        className="py-16 bg-background-secondary"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 id="process-heading" className="text-3xl font-bold">
              Our Process
            </h2>
            <p className="mt-4 text-foreground-muted max-w-2xl mx-auto">
              How we deliver exceptional {service.title.toLowerCase()} solutions
            </p>
          </AnimatedSection>

          <div className="relative flex flex-col md:flex-row justify-between gap-8">
            {/* Connector line for desktop */}
            <div
              className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-coral-500/30 via-coral-400/30 to-coral-500/30"
              aria-hidden="true"
            />

            {processSteps.map((step, i) => (
              <AnimatedSection
                key={step.step}
                delay={i * 0.1}
                className="flex-1 relative"
              >
                <div className="text-center" data-testid="process-step">
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

      {/* Portfolio Placeholder Section */}
      <section
        aria-labelledby="portfolio-heading"
        data-testid="service-portfolio"
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 id="portfolio-heading" className="text-3xl font-bold mb-4">
              Our {service.title} Work
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto mb-8">
              Explore our portfolio of successful {service.title.toLowerCase()} projects.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/portfolio">View Full Portfolio</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section
        aria-labelledby="cta-heading"
        className="py-24 bg-background-secondary relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br ${service.gradient} rounded-full blur-[120px] opacity-50`}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Let&apos;s discuss your {service.title.toLowerCase()} project and
              see how we can help you achieve your goals.
            </p>
            <Button asChild size="lg">
              <Link href={`/contact?service=${service.slug}`}>
                Request a Quote
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
