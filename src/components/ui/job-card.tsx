import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/components/sections/job-listings";
import { contactInfo } from "@/lib/constants";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  // TODO: Replace with Link to /careers/[slug] once Story 6-3 (Job Detail Pages) is implemented
  const applyHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    `Application for ${job.title}`
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'm interested in the ${job.title} position at Invenex Solutions.\n\nPlease find my resume attached.\n\nBest regards`
  )}`;

  return (
    <Card variant="interactive" className="p-6" data-testid="job-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge size="sm" className="mb-2" data-testid="job-department">
            {job.department}
          </Badge>
          <h3 className="text-xl font-semibold">{job.title}</h3>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-foreground-muted">
        <p data-testid="job-location">📍 {job.location}</p>
        <p data-testid="job-experience">💼 {job.experience} level</p>
      </div>

      {job.techStack && job.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {job.techStack.map((tech) => (
            <Badge key={tech} size="sm" variant="info" data-testid="job-tech-tag">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      <Button asChild className="w-full">
        <a href={applyHref}>Apply Now</a>
      </Button>
    </Card>
  );
}
