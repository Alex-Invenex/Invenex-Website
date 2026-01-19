// ============================================
// Site Metadata
// ============================================
export const siteConfig = {
  name: "Invenex Solutions",
  description:
    "Premium web development, mobile apps, and digital solutions. Transform your vision into reality with our world-class team.",
  url: "https://invenexsolutions.vercel.app",
  ogImage: "/og/default.png",
  creator: "Invenex Solutions",
  keywords: [
    "web development",
    "mobile apps",
    "digital solutions",
    "software development",
    "Kochi",
    "Kerala",
    "India",
  ],
} as const;

// ============================================
// Navigation Items
// ============================================
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Web Development",
        href: "/services/web-development",
        description: "Custom websites and web applications",
      },
      {
        title: "Mobile App Development",
        href: "/services/mobile-development",
        description: "iOS and Android applications",
      },
      {
        title: "Platform Development",
        href: "/services/platform-development",
        description: "Enterprise platforms and SaaS solutions",
      },
      {
        title: "E-Commerce Solutions",
        href: "/services/ecommerce",
        description: "Online stores and marketplaces",
      },
      {
        title: "Social Media Marketing",
        href: "/services/social-media",
        description: "Digital marketing and brand growth",
      },
      {
        title: "Digital Strategy",
        href: "/services/digital-strategy",
        description: "Technology consulting and roadmaps",
      },
    ],
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const footerNav = {
  services: [
    { title: "Web Development", href: "/services/web-development" },
    { title: "Mobile Apps", href: "/services/mobile-development" },
    { title: "Platform Development", href: "/services/platform-development" },
    { title: "E-Commerce", href: "/services/ecommerce" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  resources: [
    { title: "Products", href: "/products" },
    { title: "CaterFlow", href: "https://caterflow.in", external: true },
  ],
} as const;

// ============================================
// Social Media Links
// ============================================
export interface SocialLink {
  name: string;
  href: string;
  icon: string; // Icon name for lucide-react or similar
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/invenex",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/invenex",
    icon: "twitter",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/invenex",
    icon: "instagram",
  },
  {
    name: "GitHub",
    href: "https://github.com/invenex",
    icon: "github",
  },
];

// ============================================
// Contact Information
// ============================================
export const contactInfo = {
  email: "hello@invenex.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  address: {
    street: "123 Tech Park",
    city: "Kochi",
    state: "Kerala",
    country: "India",
    zip: "682001",
  },
  businessHours: "Mon - Fri: 9:00 AM - 6:00 PM IST",
} as const;

// ============================================
// Form Options (for dropdowns)
// ============================================
export const projectTypes = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App" },
  { value: "platform", label: "Platform/SaaS" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "other", label: "Other" },
] as const;

export const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
] as const;

export const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
] as const;

// ============================================
// Type exports for external use
// ============================================
export type ProjectType = (typeof projectTypes)[number]["value"];
export type BudgetRange = (typeof budgetRanges)[number]["value"];
export type ReferralSource = (typeof referralSources)[number]["value"];
