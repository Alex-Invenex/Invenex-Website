"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { JobCard } from "@/components/ui/job-card";

const departments = ["All", "Engineering", "Design", "Marketing", "Operations"];

// Job type definition
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  techStack?: string[];
  slug: string;
}

// Sample data - will come from Sanity CMS in Epic 7
const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Kochi / Remote",
    experience: "Senior",
    techStack: ["React", "Next.js", "TypeScript"],
    slug: "senior-frontend-developer",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Kochi",
    experience: "Mid",
    techStack: ["Node.js", "React", "PostgreSQL"],
    slug: "full-stack-developer",
  },
  {
    id: "3",
    title: "Mobile Developer",
    department: "Engineering",
    location: "Remote",
    experience: "Mid",
    techStack: ["React Native", "TypeScript"],
    slug: "mobile-developer",
  },
  {
    id: "4",
    title: "UI/UX Designer",
    department: "Design",
    location: "Kochi / Remote",
    experience: "Mid",
    techStack: ["Figma", "Adobe XD", "Prototyping"],
    slug: "ui-ux-designer",
  },
  {
    id: "5",
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Kochi",
    experience: "Senior",
    techStack: ["SEO", "Google Ads", "Analytics"],
    slug: "digital-marketing-manager",
  },
];

export function JobListings() {
  const [activeDepartment, setActiveDepartment] = useState("All");

  const filteredJobs =
    activeDepartment === "All"
      ? jobs
      : jobs.filter((job) => job.department === activeDepartment);

  // Memoize job counts to avoid recalculating on every render
  const jobCounts = useMemo(() => {
    const counts: Record<string, number> = { All: jobs.length };
    departments.forEach((dept) => {
      if (dept !== "All") {
        counts[dept] = jobs.filter((j) => j.department === dept).length;
      }
    });
    return counts;
  }, []);

  const getJobCount = (dept: string) => jobCounts[dept] ?? 0;

  return (
    <div>
      {/* Department Filters */}
      <div
        className="flex flex-wrap justify-center gap-2 mb-12"
        role="group"
        aria-label="Filter jobs by department"
      >
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDepartment(dept)}
            data-active={activeDepartment === dept}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              activeDepartment === dept
                ? "bg-foreground text-background"
                : "bg-background-secondary text-foreground-muted hover:text-foreground hover:bg-background-tertiary"
            )}
          >
            {dept}
            {dept !== "All" && (
              <span className="ml-2 text-xs">({getJobCount(dept)})</span>
            )}
          </button>
        ))}
      </div>

      {/* Job Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDepartment}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div
              className="col-span-full text-center py-12"
              data-testid="job-listings-empty"
            >
              <div className="text-4xl mb-4">📋</div>
              <p className="text-foreground-muted">
                No open positions in {activeDepartment} at the moment.
              </p>
              <p className="text-sm text-foreground-subtle mt-2">
                Check back soon or explore other departments.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
