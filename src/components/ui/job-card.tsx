import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobListing } from "@/lib/jobs";

interface JobCardProps {
  job: JobListing;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/careers/${job.slug}`} className="block group">
      <Card variant="interactive" className="p-6 h-full" data-testid="job-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge size="sm" className="mb-2" data-testid="job-department">
              {job.department}
            </Badge>
            <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
              {job.title}
            </h3>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm text-foreground-muted">
          <p data-testid="job-location" className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-coral-400" aria-hidden="true" />{job.location}</p>
          <p data-testid="job-experience" className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-coral-400" aria-hidden="true" />{job.experience} level</p>
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

        <Button className="w-full pointer-events-none">View Position</Button>
      </Card>
    </Link>
  );
}
