import { generatePageMetadata } from "@/lib/metadata";
import { AboutClient } from "./about-client";

export const metadata = generatePageMetadata({
  title: "About Our Software Company in Kerala",
  description:
    "Invenex Solutions is a software development company based in Koratty, Thrissur, Kerala. Meet the team building web, mobile and platform products for clients in India and worldwide.",
  path: "/about",
  keywords: [
    "software company in Kerala",
    "IT company Thrissur",
    "web development agency India",
    "about Invenex Solutions",
  ],
});

export default function AboutPage() {
  return <AboutClient />;
}
