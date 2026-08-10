import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, getAllJobSlugs, benefits } from "@/lib/jobs";
import { getSiteUrl } from "@/lib/metadata";
import { BreadcrumbSchema, JobPostingSchema } from "@/components/seo";
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
    // "<Role> Job in <Location>" matches how candidates actually search.
    title: `${job.title} Job in ${job.location}`,
    description,
    keywords: [
      `${job.title} jobs`,
      `${job.title} jobs in ${job.location}`,
      "IT jobs Kerala",
      "software jobs Thrissur",
    ],
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "x-default": url,
      },
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
      <BreadcrumbSchema
        items={[
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${slug}` },
        ]}
      />
      <JobDetailClient job={job} slug={slug} benefits={benefits} />
    </>
  );
}
