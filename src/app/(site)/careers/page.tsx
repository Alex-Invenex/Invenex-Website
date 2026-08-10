import { generatePageMetadata } from "@/lib/metadata";
import { CareersClient } from "./careers-client";

export const metadata = generatePageMetadata({
  title: "Careers — Software Jobs in Kerala",
  description:
    "Open roles at Invenex Solutions: frontend, full-stack, mobile and UI/UX jobs in Koratty, Thrissur, Kerala. Modern stack (Next.js, React, TypeScript) and remote-friendly hours.",
  path: "/careers",
  keywords: [
    "software jobs in Kerala",
    "React developer jobs Thrissur",
    "IT jobs Kerala",
    "frontend developer jobs India",
  ],
});

export default function CareersPage() {
  return <CareersClient />;
}
