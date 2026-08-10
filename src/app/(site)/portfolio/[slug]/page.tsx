import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyClient } from "./case-study-client";
import { projects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/metadata";
import { BreadcrumbSchema, CreativeWorkSchema } from "@/components/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Category → the phrase people actually search. Case study pages are the site's
 * long-tail surface, so the title carries the service term rather than just the
 * client name (nobody searches "CoolTech International case study" except
 * CoolTech).
 */
const CATEGORY_TERM: Record<string, string> = {
  Web: "Website Development",
  Mobile: "Mobile App Development",
  Platform: "Custom Platform Development",
  "E-Commerce": "Ecommerce Development",
};

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

  const categoryTerm = CATEGORY_TERM[project.category] ?? "Development";
  const seoTitle = `${project.title} — ${categoryTerm} Case Study`;
  const seoDescription = `${project.excerpt} Built by Invenex Solutions with ${project.technologies.slice(0, 3).join(", ")}.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      `${categoryTerm.toLowerCase()} case study`,
      ...project.technologies.map((tech) => `${tech} development`),
      "web development portfolio India",
    ],
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
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
      title: seoTitle,
      description: seoDescription,
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
      <BreadcrumbSchema
        items={[
          { name: "Work", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${slug}` },
        ]}
      />
      <CaseStudyClient project={project} relatedProjects={relatedProjects} />
    </>
  );
}
