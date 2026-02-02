"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

// Real testimonials from actual Invenex clients
const testimonials = [
  {
    quote:
      "Invenex transformed our digital presence. The new website perfectly captures our brand identity and has significantly improved our lead generation.",
    author: "Michael Chen",
    role: "CEO",
    company: "CoolTech International",
    rating: 5,
  },
  {
    quote:
      "The website Invenex built for us is a work of art. It perfectly showcases our design aesthetic and has helped us attract premium clients.",
    author: "Sara Al-Rashid",
    role: "Creative Director",
    company: "Ginger Designs",
    rating: 5,
  },
  {
    quote:
      "Invenex delivered a platform that handles our scale beautifully. The user experience is top-notch and our customers love it.",
    author: "Rajesh Kumar",
    role: "Founder",
    company: "EaseMyFly",
    rating: 5,
  },
  {
    quote:
      "The platform Invenex built has become the go-to app for deals in our city. Their technical expertise and understanding of our market was exceptional.",
    author: "Priya Sharma",
    role: "Co-founder",
    company: "GrabToGo",
    rating: 5,
  },
  {
    quote:
      "Invenex understood our brand vision perfectly. The online store they created is as luxurious as our physical boutique.",
    author: "Rayeesa Khan",
    role: "Founder",
    company: "Q by Rayeesa",
    rating: 5,
  },
  {
    quote:
      "Our online bookings have skyrocketed since launching the new website. Invenex delivered exactly what we needed.",
    author: "Ahmed Al-Farsi",
    role: "General Manager",
    company: "AA Rent A Car",
    rating: 5,
  },
  {
    quote:
      "The AI platform Invenex built has revolutionized our logistics operations. The ROI we've seen is incredible.",
    author: "David Wong",
    role: "CTO",
    company: "OnMyWay AI",
    rating: 5,
  },
];

function TestimonialCard({
  quote,
  author,
  role,
  company,
  rating,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}) {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] mx-3">
      <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Quote */}
        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-500/20" />
          <p className="text-foreground-muted leading-relaxed pl-4">{quote}</p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-gradient">
              {author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{author}</p>
            <p className="text-sm text-foreground-muted">
              {role}, {company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 40,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  if (shouldReduceMotion) {
    return (
      <div className="flex overflow-hidden py-4">
        {items.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden py-4">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  // Split testimonials into two rows (4 + 3 for 7 total)
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4);

  return (
    <section className="py-24 bg-background relative overflow-hidden" aria-labelledby="testimonials-title" data-testid="testimonials-section">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <AnimatedSection className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-muted mb-4">
            Testimonials
          </span>
          <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="mt-4 text-xl text-foreground-muted max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our partners
            have to say.
          </p>
        </AnimatedSection>
      </div>

      {/* Marquee Rows */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="space-y-4">
          <MarqueeRow items={firstRow} direction="left" duration={35} />
          <MarqueeRow items={secondRow} direction="right" duration={40} />
        </div>
      </div>
    </section>
  );
}
