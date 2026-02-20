import { generatePageMetadata } from "@/lib/metadata";
import { AboutClient } from "./about-client";

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Invenex Solutions - our story, mission, values, and the passionate team behind our innovative digital solutions. Based in Kerala, India.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}
