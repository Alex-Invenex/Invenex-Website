import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailClient } from "./service-detail-client";
import { getSiteUrl } from "@/lib/metadata";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo";

// Icon type for mapping
type IconName =
  | "globe"
  | "smartphone"
  | "layers"
  | "shopping-cart"
  | "share2"
  | "lightbulb";

// Service data with all 6 services
interface ServiceData {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  iconName: IconName;
  gradient: string;
  iconColor: string;
  /**
   * SEO overrides. `title`/`description` above are on-page display copy and are
   * intentionally short and brand-led; these carry the keyword targeting.
   * Keep seoTitle under ~42 chars — the title template appends
   * " | Invenex Solutions" (20 chars) on top of it.
   */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

const services: Record<string, ServiceData> = {
  "web-development": {
    title: "Web Development",
    description:
      "We build modern, fast, and scalable websites and web applications using the latest technologies.",
    longDescription: `Our web development services cover everything from simple landing pages to complex
    web applications. We specialize in React, Next.js, and modern JavaScript frameworks to deliver
    exceptional user experiences. Whether you need a corporate website, a web portal, or a full-stack
    application, our team delivers solutions that are performant, accessible, and built to scale.`,
    features: [
      "Custom website design and development",
      "Progressive Web Apps (PWA)",
      "E-commerce integration",
      "Content Management Systems",
      "API development and integration",
      "Performance optimization",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
    ],
    iconName: "globe",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
    seoTitle: "Custom Web Development Services",
    seoDescription:
      "Custom web development services from Invenex Solutions — Next.js, React and TypeScript websites and web apps built for speed, SEO and scale. India-based, working worldwide.",
    keywords: [
      "custom web development services",
      "web development company in India",
      "Next.js development agency",
      "React web application development",
      "hire web developers India",
      "corporate website development India",
    ],
  },
  "mobile-development": {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that users love.",
    longDescription: `We create mobile applications for iOS and Android using React Native
    and native technologies. Our apps are fast, beautiful, and built to scale. From concept
    to deployment, we handle every aspect of mobile development including UI/UX design,
    backend integration, push notifications, and app store optimization.`,
    features: [
      "iOS app development",
      "Android app development",
      "Cross-platform solutions",
      "App Store optimization",
      "Push notifications",
      "Offline-first architecture",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Expo"],
    iconName: "smartphone",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
    seoTitle: "Mobile App Development Services",
    seoDescription:
      "iOS and Android app development with React Native and native code. Invenex Solutions builds, ships and maintains mobile apps for startups and businesses in India and worldwide.",
    keywords: [
      "mobile app development company India",
      "React Native app development services",
      "iOS app development India",
      "Android app development company",
      "hire mobile app developers",
      "cross platform app development",
    ],
  },
  "platform-development": {
    title: "Platform Development",
    description:
      "Custom SaaS platforms and enterprise solutions built to scale.",
    longDescription: `We design and build custom platforms that power your business operations.
    From internal tools to customer-facing SaaS products, we deliver scalable solutions.
    Our platform development services include multi-tenant architecture, user management,
    analytics dashboards, and seamless third-party integrations.`,
    features: [
      "SaaS platform development",
      "Multi-tenant architecture",
      "User management systems",
      "Analytics dashboards",
      "Integration capabilities",
      "Scalable infrastructure",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Docker"],
    iconName: "layers",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
    seoTitle: "Custom SaaS & Platform Development",
    seoDescription:
      "Custom SaaS platform development: multi-tenant architecture, dashboards, user management and integrations. Invenex Solutions builds internal tools and SaaS products that scale.",
    keywords: [
      "custom SaaS development company",
      "SaaS platform development services",
      "multi tenant SaaS architecture",
      "custom enterprise software development",
      "MVP development for startups",
      "offshore development team India",
    ],
  },
  ecommerce: {
    title: "E-Commerce Solutions",
    description:
      "Online stores and marketplaces that convert visitors into customers.",
    longDescription: `We build e-commerce solutions that drive sales. From product catalogs
    to payment processing, we handle every aspect of your online store. Our solutions
    include inventory management, order tracking, customer analytics, and seamless
    checkout experiences that maximize conversions.`,
    features: [
      "Custom e-commerce stores",
      "Marketplace development",
      "Payment gateway integration",
      "Inventory management",
      "Order tracking",
      "Analytics and reporting",
    ],
    technologies: ["Shopify", "WooCommerce", "Next.js", "Stripe", "PayPal"],
    iconName: "shopping-cart",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
    seoTitle: "Ecommerce Website Development",
    seoDescription:
      "Ecommerce website development on Shopify, WooCommerce and headless Next.js — payment gateways, inventory and order tracking. Online stores that convert, built in India.",
    keywords: [
      "ecommerce website development India",
      "Shopify development company India",
      "WooCommerce development services",
      "headless commerce Next.js",
      "online store development company",
      "marketplace development company",
    ],
  },
  "social-media": {
    title: "Social Media Marketing",
    description:
      "Strategic social media campaigns that grow your brand presence.",
    longDescription: `Our social media marketing services help you build a strong online presence,
    engage with your audience, and drive meaningful business results. We create compelling content,
    manage communities, run targeted ad campaigns, and provide detailed analytics to optimize
    your social media strategy.`,
    features: [
      "Social media strategy",
      "Content creation",
      "Community management",
      "Paid advertising",
      "Influencer partnerships",
      "Analytics and reporting",
    ],
    technologies: [
      "Meta Business Suite",
      "LinkedIn Ads",
      "Google Ads",
      "Hootsuite",
    ],
    iconName: "share2",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
    seoTitle: "Social Media Marketing Services",
    seoDescription:
      "Social media marketing services from Invenex Solutions: content, community management and paid campaigns on Meta, Instagram and LinkedIn — with reporting you can act on.",
    keywords: [
      "social media marketing services India",
      "social media marketing agency Kerala",
      "Instagram marketing agency India",
      "Meta ads management services",
      "LinkedIn marketing agency",
    ],
  },
  "digital-strategy": {
    title: "Digital Strategy",
    description:
      "Technology consulting and roadmapping for digital transformation.",
    longDescription: `We help businesses navigate their digital transformation journey with
    strategic planning, technology selection, and implementation roadmaps. Our consultants
    work with you to identify opportunities, assess current capabilities, and develop
    actionable plans that drive measurable results.`,
    features: [
      "Digital transformation consulting",
      "Technology assessment",
      "Roadmap development",
      "Vendor selection",
      "Process optimization",
      "Change management",
    ],
    technologies: ["Project Management", "Business Analysis", "Data Analytics"],
    iconName: "lightbulb",
    gradient: "from-coral-500/20 via-coral-400/10 to-transparent",
    iconColor: "text-coral-400",
    seoTitle: "Digital Transformation Consulting",
    seoDescription:
      "Digital transformation consulting: technology assessment, roadmaps, vendor selection and process automation. Invenex Solutions turns digital strategy into a delivery plan.",
    keywords: [
      "digital transformation consulting services",
      "IT consulting company India",
      "technology consulting for SMEs",
      "digital strategy agency",
      "business process automation services",
    ],
  },
};

type ServiceSlug = keyof typeof services;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  const siteUrl = getSiteUrl();

  if (!service) {
    return { title: "Service Not Found" };
  }

  const url = `${siteUrl}/services/${slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url,
    },
    twitter: {
      title: service.seoTitle,
      description: service.seoDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        slug={slug}
      />
      <BreadcrumbSchema
        items={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />
      <ServiceDetailClient
        service={{
          ...service,
          slug,
        }}
      />
    </>
  );
}
