import { generatePageMetadata } from "@/lib/metadata";
import { ServicesClient } from "./services-client";

export const metadata = generatePageMetadata({
  title: "Our Services",
  description:
    "Explore our comprehensive digital services: Web Development, Mobile Apps, Platform Development, E-Commerce Solutions, and Digital Strategy.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesClient />;
}
