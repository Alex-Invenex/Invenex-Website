"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const team: TeamMember[] = [
  {
    name: "Seby Sebastian",
    role: "CEO & Founder",
    image: "/team/placeholder.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Team Member 2",
    role: "Lead Developer",
    image: "/team/placeholder.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Team Member 3",
    role: "UX Designer",
    image: "/team/placeholder.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Team Member 4",
    role: "Project Manager",
    image: "/team/placeholder.jpg",
    linkedin: "https://linkedin.com/in/",
  },
];

export function TeamGrid() {
  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      data-testid="team-grid"
    >
      {team.map((member, index) => (
        <AnimatedSection key={member.name} delay={index * 0.1}>
          <TeamMemberCard member={member} />
        </AnimatedSection>
      ))}
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      className="group relative"
      data-testid="team-member-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-square bg-background-secondary rounded-2xl overflow-hidden mb-4 relative">
        {/* Image placeholder with gradient */}
        <div className="w-full h-full bg-gradient-to-br from-purple-500/10 via-background-secondary to-blue-500/10 flex items-center justify-center">
          <span className="text-5xl text-foreground-muted/50">👤</span>
        </div>

        {/* LinkedIn overlay on hover */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} LinkedIn`}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm rounded-full p-2.5 hover:bg-background border border-white/10"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>

      <h3 className="font-semibold">{member.name}</h3>
      <p className="text-sm text-foreground-muted">{member.role}</p>
    </motion.div>
  );
}
