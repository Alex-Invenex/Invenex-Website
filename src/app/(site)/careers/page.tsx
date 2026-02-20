import { generatePageMetadata } from "@/lib/metadata";
import { CareersClient } from "./careers-client";

export const metadata = generatePageMetadata({
  title: "Careers",
  description:
    "Join Invenex Solutions - Work with modern tech stack, grow your career, and build amazing products. Remote-friendly culture based in Kerala, India.",
  path: "/careers",
});

export default function CareersPage() {
  return <CareersClient />;
}
