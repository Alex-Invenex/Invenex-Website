import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobListings } from "@/components/sections/job-listings";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Invenex Solutions - Work with modern tech, grow your career, and build amazing products. Based in Kochi, Kerala with remote-friendly culture.",
};

const benefits = [
  {
    icon: "💻",
    title: "Modern Tech Stack",
    description: "Work with Next.js, TypeScript, React, and more",
  },
  {
    icon: "🏠",
    title: "Flexible Work",
    description: "Remote-friendly with flexible hours",
  },
  {
    icon: "📚",
    title: "Learning Budget",
    description: "Annual budget for courses and conferences",
  },
  {
    icon: "💰",
    title: "Competitive Pay",
    description: "Market-rate compensation + bonuses",
  },
];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Sanity",
  "Vercel",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        aria-labelledby="careers-hero-title"
        data-testid="careers-hero-section"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <Badge className="mb-6">We&apos;re Hiring</Badge>
            <h1
              id="careers-hero-title"
              className="text-5xl md:text-6xl font-bold"
            >
              Join Our Team
            </h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Build amazing products with a team that values innovation, growth,
              and work-life balance.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="#positions">View Open Positions</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Life at Invenex */}
      <section
        className="py-24 bg-background-secondary"
        aria-labelledby="careers-life-title"
        data-testid="careers-life-section"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 id="careers-life-title" className="text-3xl font-bold mb-6">
                Life at Invenex
              </h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  We&apos;re a small, focused team that believes in doing
                  meaningful work. Based in Kochi with remote team members, we
                  combine the best of in-person collaboration with the
                  flexibility of remote work.
                </p>
                <p>
                  Our culture is built on trust, ownership, and continuous
                  learning. We ship fast, learn from our users, and iterate
                  quickly.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1} variant="slideRight">
              <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border">
                <div className="text-center text-foreground-muted">
                  <div className="text-6xl mb-4">🏢</div>
                  <p className="text-sm">Our workspace</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="py-24"
        aria-labelledby="careers-benefits-title"
        data-testid="careers-benefits-section"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 id="careers-benefits-title" className="text-3xl font-bold">
              Why Join Us?
            </h2>
            <p className="mt-4 text-foreground-muted max-w-2xl mx-auto">
              We offer competitive benefits and a culture that supports your
              growth
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <Card
                  className="p-6 text-center h-full"
                  data-testid="benefit-card"
                >
                  <span className="text-4xl block mb-4">{benefit.icon}</span>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground-muted">
                    {benefit.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        className="py-24 bg-background-secondary"
        aria-labelledby="careers-tech-title"
        data-testid="careers-tech-section"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 id="careers-tech-title" className="text-3xl font-bold">
              Our Tech Stack
            </h2>
            <p className="mt-4 text-foreground-muted">
              Work with modern, industry-leading tools
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <Badge key={tech} size="md" className="text-base px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Positions - placeholder, populated by Story 6.2 */}
      <section
        id="positions"
        className="py-24"
        aria-labelledby="careers-positions-title"
        data-testid="careers-positions-section"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 id="careers-positions-title" className="text-3xl font-bold">
              Open Positions
            </h2>
            <p className="mt-4 text-foreground-muted">
              Find your next opportunity
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <JobListings />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
