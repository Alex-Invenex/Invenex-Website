import { getSimpleProjects } from "@/lib/projects";
import { generatePageMetadata } from "@/lib/metadata";
import { PortfolioClient } from "./portfolio-client";

export const metadata = generatePageMetadata({
  title: "Our Work",
  description:
    "Browse our portfolio of web, mobile, and platform development projects. See how Invenex transforms ideas into exceptional digital experiences.",
  path: "/portfolio",
});

const projects = getSimpleProjects();

export default function PortfolioPage() {
  return <PortfolioClient projects={projects} />;
}
