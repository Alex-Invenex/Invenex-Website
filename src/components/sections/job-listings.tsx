"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobCard } from "@/components/ui/job-card";
import { getJobListings, type JobListing } from "@/lib/jobs";

// Re-export Job type for backwards compatibility
export type { JobListing as Job } from "@/lib/jobs";

const departments = ["All", "Engineering", "Design", "Marketing", "Operations"];

// Get jobs from shared data source
const jobs: JobListing[] = getJobListings();

export function JobListings() {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const prefersReducedMotion = useReducedMotion();

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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div
              className="col-span-full text-center py-12"
              data-testid="job-listings-empty"
            >
              <ClipboardList className="w-10 h-10 text-foreground-muted mx-auto mb-4" aria-hidden="true" />
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
