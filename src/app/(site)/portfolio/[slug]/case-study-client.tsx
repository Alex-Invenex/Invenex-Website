"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowLeft, ExternalLink, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ui/share-buttons";
import type { CaseStudyProject } from "@/lib/projects";

// Dynamically import ImageGallery for better initial page load (AC2: Bundle optimization)
const ImageGallery = dynamic(
  () => import("@/components/ui/image-gallery").then((mod) => mod.ImageGallery),
  {
    loading: () => (
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video bg-background-secondary rounded-lg animate-pulse"
          />
        ))}
      </div>
    ),
  }
);

interface CaseStudyClientProps {
  project: CaseStudyProject;
  relatedProjects: CaseStudyProject[];
}

export function CaseStudyClient({ project, relatedProjects }: CaseStudyClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section
        data-testid="case-study-hero"
        aria-labelledby="case-study-hero-title"
        className="relative pt-32 pb-16 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-coral-500/10 via-coral-400/5 to-transparent rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-coral-500/10 via-coral-400/5 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {/* Category badge */}
            <Badge data-testid="case-study-category" className="mb-4">
              {project.category}
            </Badge>

            {/* Project title */}
            <h1
              id="case-study-hero-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              {project.title}
            </h1>

            {/* Client name */}
            <p
              data-testid="case-study-client"
              className="mt-4 text-xl text-foreground-muted"
            >
              {project.client}
            </p>

            {/* External link if available */}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
              >
                Visit Live Site
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {/* Share buttons */}
            <ShareButtons title={`${project.title} - Case Study`} className="mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* Challenge Section */}
      <section
        data-testid="case-study-challenge"
        aria-labelledby="challenge-heading"
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2
              id="challenge-heading"
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              The Challenge
            </h2>
            <p className="text-lg text-foreground-muted max-w-3xl leading-relaxed">
              {project.challenge}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution Section */}
      <section
        data-testid="case-study-solution"
        aria-labelledby="solution-heading"
        className="py-16 bg-background-secondary"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2
              id="solution-heading"
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Our Solution
            </h2>
            <p className="text-lg text-foreground-muted max-w-3xl leading-relaxed">
              {project.solution}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Results Section */}
      <section
        data-testid="case-study-results"
        aria-labelledby="results-heading"
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 id="results-heading" className="text-2xl md:text-3xl font-bold">
              The Results
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {project.results.map((result) => (
              <StaggerItem key={result.label}>
                <Card
                  data-testid="result-metric"
                  className="p-8 text-center hover:bg-white/[0.04] transition-colors"
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient">
                    {result.metric}
                  </div>
                  <div className="text-foreground-muted mt-3">{result.label}</div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        data-testid="case-study-gallery"
        aria-labelledby="gallery-heading"
        className="py-16 bg-background-secondary"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 id="gallery-heading" className="text-2xl md:text-3xl font-bold">
              Project Gallery
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ImageGallery images={project.gallery} projectTitle={project.title} />
          </AnimatedSection>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        data-testid="case-study-technologies"
        aria-labelledby="technologies-heading"
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 id="technologies-heading" className="text-2xl md:text-3xl font-bold">
              Technologies Used
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <Badge key={tech} size="md" data-testid="tech-badge" className="px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial Section (if available) */}
      {project.testimonial && (
        <section
          data-testid="case-study-testimonial"
          aria-labelledby="testimonial-heading"
          className="py-16 bg-background-secondary"
        >
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 id="testimonial-heading" className="sr-only">
                Client Testimonial
              </h2>

              <div className="max-w-3xl mx-auto text-center">
                <Quote
                  className="w-12 h-12 text-foreground/20 mx-auto mb-6"
                  aria-hidden="true"
                />

                <blockquote className="text-xl md:text-2xl italic text-foreground leading-relaxed">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6">
                  <div className="font-semibold text-lg">
                    {project.testimonial.author}
                  </div>
                  <div className="text-foreground-muted">
                    {project.testimonial.role}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section
          data-testid="case-study-related"
          aria-labelledby="related-heading"
          className="py-16"
        >
          <div className="container mx-auto px-6">
            <AnimatedSection className="mb-12">
              <h2 id="related-heading" className="text-2xl md:text-3xl font-bold">
                Related Projects
              </h2>
              <p className="mt-4 text-foreground-muted">
                More {project.category.toLowerCase()} projects we&apos;ve delivered
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <StaggerItem key={relatedProject.id}>
                  <Link href={`/portfolio/${relatedProject.slug}`}>
                    <Card
                      variant="interactive"
                      className="p-0 overflow-hidden group"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-background-tertiary relative overflow-hidden">
                        <Image
                          src={relatedProject.image}
                          alt={`${relatedProject.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <Badge size="sm" className="mb-3">
                          {relatedProject.category}
                        </Badge>
                        <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          {relatedProject.client}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        data-testid="case-study-cta"
        aria-labelledby="cta-heading"
        className="py-24 bg-background-secondary relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-coral-500/10 via-coral-400/5 to-transparent rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can help transform your vision into reality.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
