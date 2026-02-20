import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, getAllJobSlugs, benefits } from "@/lib/jobs";
import { getSiteUrl } from "@/lib/metadata";
import { JobPostingSchema } from "@/components/seo";
import { JobDetailClient } from "./job-detail-client";

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
      <JobDetailClient job={job} slug={slug} benefits={benefits} />
    </>
  );
}
