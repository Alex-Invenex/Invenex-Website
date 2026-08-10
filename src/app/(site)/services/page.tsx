import { generatePageMetadata } from "@/lib/metadata";
import { ServicesClient } from "./services-client";

export const metadata = generatePageMetadata({
  title: "Web & Mobile App Development Services",
  description:
    "Web development, mobile apps, custom SaaS platforms, ecommerce and digital marketing services from Invenex Solutions in Kerala, India — delivered to clients across India, the US, UK and Gulf.",
  path: "/services",
  keywords: [
    "web development services India",
    "mobile app development services",
    "custom software development services",
    "SaaS platform development",
    "ecommerce development services",
    "digital marketing services India",
  ],
});

export default function ServicesPage() {
  return <ServicesClient />;
}
