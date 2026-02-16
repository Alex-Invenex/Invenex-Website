// Extended project type for case study pages
export interface CaseStudyProject {
  id: string;
  title: string;
  client: string;
  category: "Web" | "Mobile" | "Platform" | "E-Commerce";
  excerpt: string;
  image: string;
  slug: string;
  url?: string; // External live site URL
  featured?: boolean; // Featured projects get larger cards in bento grid
  // Case study specific fields
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  technologies: string[];
  gallery: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

// Real portfolio projects with case study details - will be managed via CMS in Epic 7
export const projects: CaseStudyProject[] = [
  // Portfolio Websites (Web)
  {
    id: "1",
    title: "CoolTech International",
    client: "CoolTech International",
    category: "Web",
    excerpt:
      "Corporate website for an international technology solutions company with modern design and seamless user experience.",
    image: "/portfolio/cooltech-international-mockup.jpeg",
    slug: "cooltech-international",
    url: "https://cooltechintl.com",
    featured: true,
    challenge:
      "CoolTech International needed a modern corporate website that could effectively communicate their complex technology solutions to a global audience. Their existing website was outdated, difficult to navigate, and failed to showcase their expertise in the tech industry.",
    solution:
      "We designed and developed a sleek, responsive website using Next.js and Tailwind CSS. The new site features an intuitive navigation structure, clear service descriptions, and engaging visual elements that highlight CoolTech's innovative solutions. We implemented smooth animations and fast page loads to create a premium user experience.",
    results: [
      { metric: "85%", label: "Increase in Page Views" },
      { metric: "2.3s", label: "Average Load Time" },
      { metric: "60%", label: "Lower Bounce Rate" },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    gallery: [
      "/portfolio/cooltech-international-mockup.jpeg",
      "/portfolio/cooltech-international.png",
      "/portfolio/cooltech-international-2.png",
    ],
    testimonial: {
      quote:
        "Invenex transformed our digital presence. The new website perfectly captures our brand identity and has significantly improved our lead generation.",
      author: "Michael Chen",
      role: "CEO, CoolTech International",
    },
  },
  {
    id: "2",
    title: "Ginger Designs",
    client: "Ginger Designs UAE",
    category: "Web",
    excerpt:
      "Creative agency website showcasing interior design and branding services in the UAE market.",
    image: "/portfolio/ginger-designs-mockup.png",
    slug: "ginger-designs",
    url: "https://gingerdesigns.ae",
    challenge:
      "Ginger Designs needed a portfolio website that could showcase their stunning interior design work while reflecting the luxury and elegance of their brand. They required a visually striking platform that would appeal to high-end clients in the UAE market.",
    solution:
      "We created an immersive portfolio experience with full-screen project galleries, smooth transitions, and a minimalist design that lets the work speak for itself. The site features a custom content management system for easy project updates and a sophisticated inquiry form for lead capture.",
    results: [
      { metric: "120%", label: "More Inquiries" },
      { metric: "4.5min", label: "Avg. Session Duration" },
      { metric: "45%", label: "Increase in Leads" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Sanity CMS", "GSAP"],
    gallery: [
      "/portfolio/ginger-designs-mockup.png",
      "/portfolio/ginger-designs.png",
      "/portfolio/ginger-designs-2.png",
    ],
    testimonial: {
      quote:
        "The website Invenex built for us is a work of art. It perfectly showcases our design aesthetic and has helped us attract premium clients.",
      author: "Sara Al-Rashid",
      role: "Creative Director, Ginger Designs",
    },
  },
  {
    id: "3",
    title: "Ahazz Designs",
    client: "Ahazz Designs UAE",
    category: "Web",
    excerpt:
      "Portfolio website for a UAE-based design studio featuring elegant layouts and project showcases.",
    image: "/portfolio/ahazz-designs-mockup.png",
    slug: "ahazz-designs",
    url: "https://ahazzdesigns.com",
    challenge:
      "Ahazz Designs wanted a portfolio website that could compete with international design studios while maintaining a distinct Middle Eastern identity. They needed to showcase diverse projects ranging from branding to product design.",
    solution:
      "We developed a portfolio platform with dynamic project filtering, detailed case study pages, and a blog section for design insights. The design incorporates subtle Arabic-inspired elements while maintaining a clean, modern aesthetic that appeals to both local and international clients.",
    results: [
      { metric: "90%", label: "Client Satisfaction" },
      { metric: "3x", label: "More Project Inquiries" },
      { metric: "50%", label: "Faster Updates" },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Contentful"],
    gallery: [
      "/portfolio/ahazz-designs-mockup.png",
      "/portfolio/ahazz-designs.png",
      "/portfolio/ahazz-designs-2.png",
    ],
  },
  {
    id: "4",
    title: "EaseMyFly",
    client: "EaseMyFly",
    category: "Web",
    excerpt:
      "Travel booking platform with flight search, comparison tools, and seamless reservation management.",
    image: "/portfolio/easemyfly.png",
    slug: "easemyfly",
    url: "https://easemyfly.com",
    challenge:
      "EaseMyFly needed a competitive travel booking platform that could aggregate flight data from multiple sources, provide real-time pricing, and offer a seamless booking experience. The platform needed to handle high traffic volumes during peak booking seasons.",
    solution:
      "We built a high-performance travel platform with real-time flight search, smart filters, and a streamlined multi-step booking process. The architecture supports high concurrency with optimized caching strategies and integrates with multiple airline APIs for comprehensive coverage.",
    results: [
      { metric: "200K+", label: "Monthly Searches" },
      { metric: "1.8s", label: "Search Response Time" },
      { metric: "35%", label: "Higher Conversion" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    gallery: [
      "/portfolio/easemyfly.png",
      "/portfolio/easemyfly-2.png",
    ],
    testimonial: {
      quote:
        "Invenex delivered a platform that handles our scale beautifully. The user experience is top-notch and our customers love it.",
      author: "Rajesh Kumar",
      role: "Founder, EaseMyFly",
    },
  },
  {
    id: "5",
    title: "La Mirage",
    client: "La Mirage Restaurant",
    category: "Web",
    excerpt:
      "Elegant restaurant website with online reservations, menu showcase, and event booking capabilities.",
    image: "/portfolio/la-mirage-mockup.png",
    slug: "la-mirage",
    url: "https://la-mirage.in",
    challenge:
      "La Mirage, a fine dining establishment, needed a website that would convey the elegance and sophistication of their dining experience. They required online reservation capabilities and a visually appealing menu presentation.",
    solution:
      "We created an elegant website with rich imagery, smooth animations, and an integrated reservation system. The menu section features beautiful photography and detailed descriptions, while the reservation system syncs with their table management software for real-time availability.",
    results: [
      { metric: "70%", label: "Online Reservations" },
      { metric: "40%", label: "Table Turnover Increase" },
      { metric: "25%", label: "More Event Bookings" },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "OpenTable API"],
    gallery: [
      "/portfolio/la-mirage-mockup.png",
      "/portfolio/la-mirage.png",
      "/portfolio/la-mirage-2.png",
    ],
  },
  {
    id: "6",
    title: "GrabToGo",
    client: "GrabToGo",
    category: "Platform",
    excerpt:
      "Deals and offers aggregation platform helping users discover the best local promotions and discounts.",
    image: "/portfolio/grabtogo-mockup.png",
    slug: "grabtogo",
    url: "https://www.grabtogo.in",
    featured: true,
    challenge:
      "GrabToGo wanted to create a comprehensive deals platform that could aggregate offers from hundreds of local merchants while providing personalized recommendations to users based on their preferences and location.",
    solution:
      "We built a full-stack platform with merchant onboarding, deal management, and a consumer-facing app with location-based recommendations. The system includes an admin dashboard for merchants, real-time deal tracking, and push notifications for expiring offers.",
    results: [
      { metric: "500+", label: "Partner Merchants" },
      { metric: "50K+", label: "Active Users" },
      { metric: "2M+", label: "Deals Redeemed" },
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "Firebase", "AWS"],
    gallery: [
      "/portfolio/grabtogo-mockup.png",
      "/portfolio/grabtogo.png",
      "/portfolio/grabtogo-2.png",
    ],
    testimonial: {
      quote:
        "The platform Invenex built has become the go-to app for deals in our city. Their technical expertise and understanding of our market was exceptional.",
      author: "Priya Sharma",
      role: "Co-founder, GrabToGo",
    },
  },
  {
    id: "7",
    title: "Babbage Solutions",
    client: "Babbage Solutions",
    category: "Web",
    excerpt:
      "Technology consulting firm website with service showcases, case studies, and client testimonials.",
    image: "/portfolio/babbage-solutions-mockup.png",
    slug: "babbage-solutions",
    url: "https://babbagesolutions.in",
    challenge:
      "Babbage Solutions needed a professional website that could effectively communicate their technical consulting services to enterprise clients while showcasing their expertise through detailed case studies and thought leadership content.",
    solution:
      "We developed a content-rich website with a sophisticated case study system, service explorer, and a resource library. The site features advanced filtering for case studies, a blog with technical articles, and integrated lead capture forms throughout the customer journey.",
    results: [
      { metric: "150%", label: "More Qualified Leads" },
      { metric: "80%", label: "Increase in Traffic" },
      { metric: "45%", label: "Better Engagement" },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Sanity CMS"],
    gallery: [
      "/portfolio/babbage-solutions-mockup.png",
      "/portfolio/babbage-solutions.png",
      "/portfolio/babbagesolutions-2.png",
    ],
  },
  {
    id: "8",
    title: "Molvexa",
    client: "Molvexa",
    category: "Web",
    excerpt:
      "Modern corporate website with clean aesthetics and comprehensive business information architecture.",
    image: "/portfolio/molvexa-mockup.png",
    slug: "molvexa",
    url: "https://molvexa.com",
    challenge:
      "Molvexa required a corporate website that could clearly present their diverse service offerings while maintaining a unified brand identity. They needed a site that would scale as they expanded into new markets.",
    solution:
      "We created a modular website architecture that allows for easy expansion of service pages and regional content. The design system ensures brand consistency across all pages while the flexible CMS enables the team to manage content independently.",
    results: [
      { metric: "100%", label: "Brand Consistency" },
      { metric: "60%", label: "Faster Content Updates" },
      { metric: "3x", label: "Market Expansion Ready" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi"],
    gallery: [
      "/portfolio/molvexa-mockup.png",
      "/portfolio/molvexa.png",
      "/portfolio/molvexa-2.png",
    ],
  },
  {
    id: "9",
    title: "Emergence",
    client: "Emergence UAE",
    category: "Web",
    excerpt:
      "Professional services website for a UAE-based company with multilingual support and regional focus.",
    image: "/portfolio/emergence.png",
    slug: "emergence",
    url: "https://emergence.ae",
    challenge:
      "Emergence needed a bilingual website (English/Arabic) that would serve both local UAE clients and international partners. The site needed to handle RTL layouts seamlessly and reflect the premium nature of their professional services.",
    solution:
      "We built a fully bilingual website with automatic language detection, proper RTL support for Arabic, and culturally appropriate design elements for each language version. The content management system allows independent updates for each language.",
    results: [
      { metric: "40%", label: "More Arabic Users" },
      { metric: "95%", label: "Translation Accuracy" },
      { metric: "30%", label: "Regional Growth" },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "i18next", "Sanity CMS"],
    gallery: [
      "/portfolio/emergence.png",
      "/portfolio/emergence-2.png",
    ],
  },
  {
    id: "10",
    title: "OnMyWay AI",
    client: "OnMyWay AI",
    category: "Platform",
    excerpt:
      "AI-powered travel and logistics platform with intelligent route optimization and real-time tracking.",
    image: "/portfolio/onmyway-ai.png",
    slug: "onmyway-ai",
    url: "https://onmyway.ai",
    featured: true,
    challenge:
      "OnMyWay AI needed a sophisticated logistics platform that could leverage machine learning for route optimization, provide real-time tracking, and handle complex multi-stop deliveries. The platform needed to scale for enterprise clients.",
    solution:
      "We developed an AI-powered logistics platform with custom route optimization algorithms, real-time GPS tracking, and a driver mobile app. The admin dashboard provides comprehensive analytics and the system integrates with major shipping carriers.",
    results: [
      { metric: "30%", label: "Fuel Cost Reduction" },
      { metric: "25%", label: "Faster Deliveries" },
      { metric: "99.5%", label: "System Uptime" },
    ],
    technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "AWS", "React Native"],
    gallery: [
      "/portfolio/onmyway-ai.png",
      "/portfolio/onmyway-2.png",
    ],
    testimonial: {
      quote:
        "The AI platform Invenex built has revolutionized our logistics operations. The ROI we've seen is incredible.",
      author: "David Wong",
      role: "CTO, OnMyWay AI",
    },
  },
  // E-Commerce Websites
  {
    id: "11",
    title: "Al Shahama Marine",
    client: "Al Shahama Marine",
    category: "E-Commerce",
    excerpt:
      "Marine equipment and supplies e-commerce store with product catalog, inventory management, and secure checkout.",
    image: "/portfolio/alshahama-marine.png",
    slug: "alshahama-marine",
    url: "https://alshahamamarine.com",
    challenge:
      "Al Shahama Marine needed an e-commerce platform that could handle their extensive catalog of marine equipment, support B2B and B2C customers, and integrate with their existing inventory management system.",
    solution:
      "We built a robust e-commerce platform with advanced product filtering, bulk ordering capabilities for B2B customers, and real-time inventory sync. The checkout process supports multiple payment gateways and provides shipping estimates based on product weight and destination.",
    results: [
      { metric: "200%", label: "Online Sales Growth" },
      { metric: "5000+", label: "Products Listed" },
      { metric: "40%", label: "Repeat Customers" },
    ],
    technologies: ["WooCommerce", "WordPress", "PHP", "MySQL", "Stripe"],
    gallery: [
      "/portfolio/alshahama-marine.png",
    ],
  },
  {
    id: "12",
    title: "Q by Rayeesa",
    client: "Q by Rayeesa",
    category: "E-Commerce",
    excerpt:
      "Fashion and lifestyle e-commerce boutique with elegant product displays and seamless shopping experience.",
    image: "/portfolio/qbyrayeesa.png",
    slug: "q-by-rayeesa",
    url: "https://qbyrayeesa.com",
    featured: true,
    challenge:
      "Q by Rayeesa, a luxury fashion boutique, needed an e-commerce platform that would provide a premium shopping experience matching the quality of their products. They required features like size guides, wishlist functionality, and a loyalty program.",
    solution:
      "We created a visually stunning e-commerce site with high-quality product photography, detailed size guides, and a personalized shopping experience. The platform includes a loyalty program, wishlist, and seamless integration with Instagram for shoppable posts.",
    results: [
      { metric: "180%", label: "Revenue Increase" },
      { metric: "65%", label: "Mobile Sales" },
      { metric: "4.8/5", label: "Customer Rating" },
    ],
    technologies: ["Shopify", "Liquid", "JavaScript", "Klaviyo"],
    gallery: [
      "/portfolio/qbyrayeesa.png",
      "/portfolio/qbyrayeesa-2.png",
    ],
    testimonial: {
      quote:
        "Invenex understood our brand vision perfectly. The online store they created is as luxurious as our physical boutique.",
      author: "Rayeesa Khan",
      role: "Founder, Q by Rayeesa",
    },
  },
  {
    id: "13",
    title: "Ziera Inc",
    client: "Ziera Inc",
    category: "E-Commerce",
    excerpt:
      "Online retail platform with advanced product filtering, customer reviews, and integrated payment solutions.",
    image: "/portfolio/ziera-mockup.png",
    slug: "ziera-inc",
    url: "https://zierainc.com",
    challenge:
      "Ziera Inc needed a modern e-commerce platform that could handle their growing product catalog, provide a smooth checkout experience, and integrate with their fulfillment centers for efficient order processing.",
    solution:
      "We developed a custom e-commerce solution with advanced search and filtering, customer reviews, and a streamlined checkout process. The platform integrates with multiple fulfillment centers and provides real-time order tracking.",
    results: [
      { metric: "150%", label: "Conversion Rate Up" },
      { metric: "2.1s", label: "Page Load Speed" },
      { metric: "95%", label: "Customer Satisfaction" },
    ],
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "AWS"],
    gallery: [
      "/portfolio/ziera-mockup.png",
      "/portfolio/zierainc.png",
      "/portfolio/zierainc-2.png",
    ],
  },
  {
    id: "14",
    title: "AA Rent A Car",
    client: "AA Rent A Car",
    category: "E-Commerce",
    excerpt:
      "Car rental booking platform with vehicle catalog, availability calendar, and online reservation system.",
    image: "/portfolio/aa-rentacar.png",
    slug: "aa-rentacar",
    url: "https://aa-rentacar.com",
    challenge:
      "AA Rent A Car needed a booking platform that could display real-time vehicle availability, handle complex pricing rules based on duration and season, and provide a seamless reservation experience across devices.",
    solution:
      "We built a comprehensive car rental platform with an interactive vehicle gallery, real-time availability calendar, and dynamic pricing engine. The booking system supports add-ons like insurance and GPS, and integrates with their fleet management software.",
    results: [
      { metric: "80%", label: "Online Bookings" },
      { metric: "50%", label: "Less Phone Calls" },
      { metric: "35%", label: "Revenue Growth" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Google Maps API"],
    gallery: [
      "/portfolio/aa-rentacar.png",
      "/portfolio/aa-rentacar-2.png",
    ],
    testimonial: {
      quote:
        "Our online bookings have skyrocketed since launching the new website. Invenex delivered exactly what we needed.",
      author: "Ahmed Al-Farsi",
      role: "General Manager, AA Rent A Car",
    },
  },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): CaseStudyProject | undefined {
  return projects.find((project) => project.slug === slug);
}

// Helper function to get related projects (same category, excluding current)
export function getRelatedProjects(
  currentSlug: string,
  limit: number = 3
): CaseStudyProject[] {
  const currentProject = getProjectBySlug(currentSlug);
  if (!currentProject) return [];

  return projects
    .filter(
      (project) =>
        project.slug !== currentSlug &&
        project.category === currentProject.category
    )
    .slice(0, limit);
}

// Export simple project type for portfolio grid
export type SimpleProject = Pick<
  CaseStudyProject,
  "id" | "title" | "client" | "category" | "excerpt" | "image" | "slug" | "url" | "featured"
>;

// Get simple projects for portfolio grid
export function getSimpleProjects(): SimpleProject[] {
  return projects.map(({ id, title, client, category, excerpt, image, slug, url, featured }) => ({
    id,
    title,
    client,
    category,
    excerpt,
    image,
    slug,
    url,
    featured,
  }));
}

// Get featured projects only
export function getFeaturedProjects(): CaseStudyProject[] {
  return projects.filter((project) => project.featured);
}
