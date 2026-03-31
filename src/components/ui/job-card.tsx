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
            <Badge size="sm" className="mb-2 bg-coral-500/10 text-coral-400 border-coral-500/20" data-testid="job-department">
              {job.department}
            </Badge>
            <h3 className="text-xl font-semibold group-hover:text-coral-400 transition-colors">
              {job.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 text-sm text-foreground-muted">
          <p data-testid="job-location" className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-coral-400" aria-hidden="true" />{job.location}</p>
          <span className="text-white/20" aria-hidden="true">|</span>
          <p data-testid="job-experience" className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-coral-400" aria-hidden="true" />{job.experience} level</p>
        </div>

        {job.techStack && job.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.techStack.map((tech) => (
              <Badge key={tech} size="sm" className="bg-surface-overlay text-foreground-muted border-surface-border" data-testid="job-tech-tag">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <Button variant="secondary" className="w-full pointer-events-none group-hover:border-coral-500/30 group-hover:text-coral-400">View Position</Button>
      </Card>
    </Link>
  );
}
