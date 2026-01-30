import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyClient } from "./case-study-client";
import { projects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/metadata";
import { CreativeWorkSchema } from "@/components/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!project) {
    return { title: "Project Not Found" };
  }

  const url = `${siteUrl}/portfolio/${slug}`;
  const ogImage = project.image.startsWith("http")
    ? project.image
    : `${siteUrl}${project.image}`;

  return {
    title: `${project.title} - Case Study`,
    description: project.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} - Case Study`,
      description: project.excerpt,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      title: `${project.title} - Case Study`,
      description: project.excerpt,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug, 3);

  return (
    <>
      <CreativeWorkSchema
        name={project.title}
        description={project.excerpt}
        slug={slug}
        client={project.client}
        image={project.image}
      />
      <CaseStudyClient project={project} relatedProjects={relatedProjects} />
    </>
  );
}
