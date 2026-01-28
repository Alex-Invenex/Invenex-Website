import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ApplicationForm } from '@/components/forms/application-form';
import { getJobBySlug, getAllJobSlugs } from '@/lib/jobs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: 'Job Not Found' };
  }

  return {
    title: `Apply for ${job.title} - Careers`,
    description: `Submit your application for ${job.title} at Invenex Solutions. Join our team in ${job.location}.`,
  };
}

export default async function ApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <section className="pt-32 pb-24" aria-labelledby="apply-heading">
      <div className="container mx-auto px-6 max-w-2xl">
        <AnimatedSection>
          <Link
            href={`/careers/${slug}`}
            className="text-foreground-muted hover:text-foreground mb-6 inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            ← Back to {job.title}
          </Link>
          <h1 id="apply-heading" className="text-3xl md:text-4xl font-bold mb-2">
            Apply for {job.title}
          </h1>
          <p className="text-foreground-muted mb-8">
            Fill out the form below to submit your application.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ApplicationForm jobSlug={slug} jobTitle={job.title} />
        </AnimatedSection>
      </div>
    </section>
  );
}
