import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getJobBySlug, getAllJobSlugs, benefits } from "@/lib/jobs";
import { getSiteUrl } from "@/lib/metadata";
import { JobPostingSchema } from "@/components/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!job) {
    return { title: "Job Not Found" };
  }

  const url = `${siteUrl}/careers/${slug}`;
  const description = `Join Invenex as a ${job.title}. ${job.location}, ${job.type}. ${job.experience} experience required. Apply now!`;

  return {
    title: `${job.title} - Careers`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${job.title} at Invenex Solutions`,
      description,
      url,
    },
    twitter: {
      title: `${job.title} at Invenex Solutions`,
      description,
    },
  };
}

// Benefits imported from shared jobs module

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <JobPostingSchema
        title={job.title}
        description={job.description}
        slug={slug}
        location={job.location}
        employmentType={job.type}
      />
      {/* Hero / Header */}
      <section
        className="pt-32 pb-8"
        aria-labelledby="job-title"
        data-testid="job-hero"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <Link
              href="/careers"
              className="text-foreground-muted hover:text-foreground mb-4 inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            >
              ← Back to Careers
            </Link>
            <Badge className="mb-4 block w-fit" data-testid="job-department-badge">
              {job.department}
            </Badge>
            <h1 id="job-title" className="text-4xl md:text-5xl font-bold">
              {job.title}
            </h1>
            <div
              className="flex flex-wrap gap-4 mt-4 text-foreground-muted"
              data-testid="job-meta"
            >
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>📊 {job.experience}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="py-8"
        aria-labelledby="about-role-heading"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <AnimatedSection data-testid="job-description">
                <h2 id="about-role-heading" className="text-2xl font-bold mb-4">
                  About This Role
                </h2>
                <div className="prose prose-invert max-w-none">
                  {job.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-foreground-muted mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {/* Requirements */}
              <AnimatedSection delay={0.1} data-testid="job-requirements">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-success mt-0.5">✓</span>
                      <span className="text-foreground-muted">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Responsibilities */}
              <AnimatedSection delay={0.2} data-testid="job-responsibilities">
                <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-foreground-muted">•</span>
                      <span className="text-foreground-muted">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Tech Stack - only for roles with tech stack */}
              {job.techStack && job.techStack.length > 0 && (
                <AnimatedSection delay={0.3} data-testid="job-tech-stack">
                  <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((tech) => (
                      <Badge key={tech} data-testid="tech-badge">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.4}>
                <Card className="p-6 sticky top-24">
                  <h3 className="font-semibold mb-4">Ready to Apply?</h3>
                  <p className="text-sm text-foreground-muted mb-6">
                    Submit your application and we&apos;ll get back to you within a
                    week.
                  </p>
                  <Button asChild size="lg" className="w-full mb-6">
                    <Link href={`/careers/${slug}/apply`}>Apply Now</Link>
                  </Button>

                  {/* Benefits reminder */}
                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold mb-3">Why Join Invenex?</h4>
                    <ul className="space-y-2 text-sm text-foreground-muted">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <span className="text-success">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/careers#benefits"
                      className="text-sm text-accent hover:underline mt-3 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                      Learn more about our benefits →
                    </Link>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
