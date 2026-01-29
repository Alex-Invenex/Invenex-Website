import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyClient } from "./case-study-client";
import { projects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} - Case Study | Invenex Solutions`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} - Case Study`,
      description: project.excerpt,
      type: "article",
      images: [project.image],
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

  return <CaseStudyClient project={project} relatedProjects={relatedProjects} />;
}
