"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Linkedin, User } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

const team: TeamMember[] = [
  {
    name: "Lijo Varghese",
    role: "Founder & Mentor",
    image: "/team/lijo-varghese.jpg",
    linkedin: "https://www.linkedin.com/in/lijo-varghese-7ab710310/",
  },
  {
    name: "Alex Sebastian",
    role: "Founder & Marketing Lead",
    image: "/team/alex-sebastian.jpg",
    linkedin: "https://www.linkedin.com/in/alex-invenex/",
  },
  {
    name: "Vishnu Manoj",
    role: "Founder & Senior Developer",
    image: "/team/vishnu-manoj.jpg",
    linkedin: "https://www.linkedin.com/in/vishnu-manoj-invenex/",
  },
  {
    name: "Jeffrey Jaison",
    role: "Founder & Operational Manager",
    image: "/team/jeffrey-jaison.jpg",
    linkedin: "https://www.linkedin.com/in/jeffrey-invenex/",
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      className="group relative"
      data-testid="team-member-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-square bg-background-secondary rounded-2xl overflow-hidden mb-4 relative">
        {/* Loading skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-coral-500/10 via-background-secondary to-coral-400/10 animate-pulse" />
        )}

        {/* Error fallback with gradient placeholder */}
        {hasError ? (
          <div className="w-full h-full bg-gradient-to-br from-coral-500/10 via-background-secondary to-coral-400/10 flex items-center justify-center">
            <User className="w-12 h-12 text-foreground-muted/50" aria-hidden="true" />
          </div>
        ) : (
          <Image
            src={member.image}
            alt={`${member.name}, ${member.role} at Invenex Solutions`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}

        {/* LinkedIn overlay on hover */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn profile`}
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm rounded-full p-2.5 hover:bg-background border border-white/10"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>

      <h3 className="font-semibold">{member.name}</h3>
      <p className="text-sm text-foreground-muted">{member.role}</p>
    </motion.div>
  );
}
