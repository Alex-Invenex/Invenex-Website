// Shared job data - will come from Sanity CMS in Epic 7

// Company benefits shown on job detail pages
export const benefits = [
  "Modern Tech Stack",
  "Flexible Work",
  "Learning Budget",
  "Competitive Pay",
];

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  techStack?: string[];
  slug: string;
}

export interface JobDetail extends JobListing {
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

// Full job data with details
export const jobs: JobDetail[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Thrissur / Remote",
    type: "Full-time",
    experience: "Senior (5+ years)",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    slug: "senior-frontend-developer",
    description: `We're looking for a Senior Frontend Developer to join our team and help build amazing web experiences for our clients.

You'll work on a variety of projects using modern technologies like Next.js, React, and TypeScript. This is a great opportunity to work with a talented team and grow your skills.

As a senior team member, you'll have the opportunity to mentor junior developers and contribute to architectural decisions.`,
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with Next.js and modern React patterns",
      "Understanding of web performance optimization",
      "Experience with responsive design and CSS frameworks",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Lead frontend development on client projects",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with designers and backend developers",
      "Contribute to technical decisions and architecture",
      "Write clean, maintainable, and well-tested code",
    ],
  },
  {
    id: "2",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Thrissur",
    type: "Full-time",
    experience: "Mid (3-5 years)",
    techStack: ["Node.js", "React", "PostgreSQL", "TypeScript", "Docker"],
    slug: "full-stack-developer",
    description: `Join our engineering team as a Full Stack Developer and work on end-to-end solutions for our clients.

You'll be involved in all stages of development, from database design to frontend implementation. We value developers who can see the big picture while paying attention to details.

Our tech stack is modern and we're always exploring new technologies to improve our development process.`,
    requirements: [
      "3-5 years of full-stack development experience",
      "Proficiency in Node.js and React",
      "Experience with PostgreSQL or similar databases",
      "Familiarity with Docker and containerization",
      "Understanding of RESTful API design",
      "Good problem-solving skills",
    ],
    responsibilities: [
      "Build and maintain full-stack applications",
      "Design and implement database schemas",
      "Develop RESTful APIs and integrate with frontends",
      "Write unit and integration tests",
      "Participate in sprint planning and code reviews",
    ],
  },
  {
    id: "3",
    title: "Mobile Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "Mid (3-5 years)",
    techStack: ["React Native", "TypeScript", "iOS", "Android", "Expo"],
    slug: "mobile-developer",
    description: `We're seeking a talented Mobile Developer to build cross-platform mobile applications for our clients.

You'll work with React Native to create performant, native-feeling mobile experiences. Our mobile projects range from consumer apps to enterprise solutions.

This is a fully remote position, so you'll need to be self-motivated and comfortable with asynchronous communication.`,
    requirements: [
      "3-5 years of mobile development experience",
      "Strong React Native and TypeScript skills",
      "Published apps on App Store or Google Play",
      "Understanding of mobile UI/UX best practices",
      "Experience with native modules when needed",
      "Good communication skills for remote work",
    ],
    responsibilities: [
      "Build and maintain React Native applications",
      "Ensure app performance and reliability",
      "Collaborate with design team on mobile UX",
      "Integrate with backend services and APIs",
      "Handle app store submissions and updates",
    ],
  },
  {
    id: "4",
    title: "UI/UX Designer",
    department: "Design",
    location: "Thrissur / Remote",
    type: "Full-time",
    experience: "Mid (3-5 years)",
    techStack: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
    slug: "ui-ux-designer",
    description: `Join our design team to create beautiful and intuitive user experiences for web and mobile applications.

You'll work closely with clients to understand their needs and translate them into compelling designs. Our projects span various industries, giving you diverse design challenges.

We believe in user-centered design and data-driven decisions. You'll have the opportunity to conduct user research and validate your designs.`,
    requirements: [
      "3-5 years of UI/UX design experience",
      "Proficiency in Figma and prototyping tools",
      "Strong portfolio demonstrating web and mobile designs",
      "Experience with user research and usability testing",
      "Understanding of design systems and component libraries",
      "Excellent visual design skills",
    ],
    responsibilities: [
      "Create wireframes, mockups, and prototypes",
      "Conduct user research and usability testing",
      "Collaborate with developers on implementation",
      "Maintain and evolve design systems",
      "Present designs to clients and stakeholders",
    ],
  },
  {
    id: "5",
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Thrissur",
    type: "Full-time",
    experience: "Senior (5+ years)",
    techStack: ["SEO", "Google Ads", "Analytics", "Social Media", "Content Strategy"],
    slug: "digital-marketing-manager",
    description: `Lead our digital marketing efforts and help our clients grow their online presence.

You'll develop and execute marketing strategies across various channels including SEO, paid advertising, and social media. Data-driven decision making is at the core of our approach.

This role offers the opportunity to work with diverse clients and industries, from startups to established businesses.`,
    requirements: [
      "5+ years of digital marketing experience",
      "Proven track record in SEO and SEM",
      "Experience with Google Analytics and advertising platforms",
      "Strong understanding of social media marketing",
      "Excellent analytical and communication skills",
      "Experience managing marketing budgets",
    ],
    responsibilities: [
      "Develop comprehensive digital marketing strategies",
      "Manage SEO and paid advertising campaigns",
      "Analyze performance data and optimize campaigns",
      "Create content strategies and oversee execution",
      "Report on KPIs and ROI to clients",
    ],
  },
];

// Get a job by slug
export function getJobBySlug(slug: string): JobDetail | undefined {
  return jobs.find((job) => job.slug === slug);
}

// Get all job slugs for static generation
export function getAllJobSlugs(): string[] {
  return jobs.map((job) => job.slug);
}

// Get job listings (minimal data for cards)
export function getJobListings(): JobListing[] {
  return jobs.map(({ id, title, department, location, experience, techStack, slug }) => ({
    id,
    title,
    department,
    location,
    experience,
    techStack,
    slug,
  }));
}
