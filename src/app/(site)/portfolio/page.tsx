import { getSimpleProjects } from "@/lib/projects";
import { generatePageMetadata } from "@/lib/metadata";
import { PortfolioClient } from "./portfolio-client";

export const metadata = generatePageMetadata({
  title: "Web Development Portfolio & Case Studies",
  description:
    "Real web, mobile app and platform projects delivered by Invenex Solutions — ecommerce stores, booking platforms, ERPs and brand sites for clients in India, the UAE and beyond.",
  path: "/portfolio",
  keywords: [
    "web development portfolio",
    "web design case studies India",
    "app development case study",
    "software development projects India",
  ],
});

const projects = getSimpleProjects();

export default function PortfolioPage() {
  return <PortfolioClient projects={projects} />;
}
