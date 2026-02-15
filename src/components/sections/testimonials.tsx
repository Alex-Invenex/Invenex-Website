"use client";

import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

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
    rating: 4.9,
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
    rating: 4.8,
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
    rating: 4.9,
  },
];

// Client companies (merged from former client-logos section)
const clients = [
  "CoolTech International",
  "Ginger Designs",
  "La Mirage",
  "OnMyWay AI",
  "EaseMyFly",
  "GrabToGo",
  "Q by Rayeesa",
  "AA Rent A Car",
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
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] mx-3">
      <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] hover:border-[#FF6A37]/20 transition-all duration-300">
        {/* Stars with varied ratings for realism */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < fullStars
                  ? "fill-[#FF6A37] text-[#FF6A37]"
                  : i === fullStars && hasHalf
                  ? "fill-[#FF6A37]/50 text-[#FF6A37]"
                  : "text-foreground-subtle"
              }`}
            />
          ))}
          <span className="text-xs text-foreground-muted ml-1">{rating}</span>
        </div>

        {/* Quote */}
        <blockquote className="text-foreground-muted leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author with company badge */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FF6A37]/10 border border-[#FF6A37]/20 flex items-center justify-center">
            <span className="text-lg font-semibold text-[#FF6A37]">
              {author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{author}</p>
            <p className="text-sm text-foreground-muted">
              {role},{" "}
              <span className="text-[#FF6A37]/70">{company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GSAPMarquee({
  items,
  direction = "left",
  speed = 50,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion() || !trackRef.current) return;

    const track = trackRef.current;
    let tl: gsap.core.Timeline;

    const buildMarquee = () => {
      tl?.kill();
      gsap.set(track, { x: 0 });

      const totalWidth = track.scrollWidth / 3; // We tripled the items

      // Set initial position for reverse direction
      if (direction === "right") {
        gsap.set(track, { x: -totalWidth });
      }

      tl = gsap.timeline({ repeat: -1 });

      if (direction === "left") {
        tl.to(track, {
          x: -totalWidth,
          duration: items.length * (speed / 10),
          ease: "none",
        });
      } else {
        tl.to(track, {
          x: 0,
          duration: items.length * (speed / 10),
          ease: "none",
        });
      }
    };

    buildMarquee();

    const onResize = () => buildMarquee();
    window.addEventListener("resize", onResize);

    return () => {
      tl?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, direction, items.length, speed]);

  // Triple items for seamless loop
  const tripled = [...items, ...items, ...items];

  if (!mounted) {
    return (
      <div className="flex overflow-hidden py-4">
        {items.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden py-4">
      <div ref={trackRef} className="flex will-change-transform">
        {tripled.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}

function ClientTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion() || !tickerRef.current) return;

    const track = tickerRef.current;
    const width = track.scrollWidth / 3;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(track, {
      x: -width,
      duration: 20,
      ease: "none",
    });

    return () => { tl.kill(); };
  }, [mounted]);

  const tripled = [...clients, ...clients, ...clients];

  return (
    <div className="overflow-hidden py-6 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div ref={tickerRef} className="flex will-change-transform">
        {tripled.map((name, i) => (
          <span
            key={i}
            className="flex-shrink-0 mx-6 md:mx-10 text-base md:text-lg font-medium text-foreground-muted/40 hover:text-foreground-muted/70 transition-colors duration-300 whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlight = testimonials[0];
  const firstRow = testimonials.slice(1, 4);
  const secondRow = testimonials.slice(4);

  // Header + spotlight entrance animation
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const init = async () => {
        await registerScrollTrigger();

        gsap.fromTo(
          "[data-test-header]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          "[data-spotlight]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      };
      init();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-background relative overflow-hidden"
      aria-labelledby="testimonials-title"
      data-testid="testimonials-section"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6A37]/[0.04] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div data-test-header className="text-center mb-16">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            Client Testimonials
          </span>
          <h2
            id="testimonials-title"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            <span style={{ fontWeight: 200 }}>What Our </span>
            <span className="text-gradient-orange" style={{ fontWeight: 900 }}>
              Clients Say
            </span>
          </h2>
        </div>

        {/* Featured spotlight quote */}
        <div data-spotlight className="max-w-4xl mx-auto text-center mb-8">
          <div className="relative py-8">
            <span
              className="block text-[#FF6A37]/20 font-serif leading-none select-none"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed -mt-8 md:-mt-12 px-4"
              style={{ fontWeight: 300 }}
            >
              {spotlight.quote}
            </blockquote>
            <span
              className="block text-[#FF6A37]/20 font-serif leading-none select-none text-right"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
              aria-hidden="true"
            >
              &rdquo;
            </span>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6A37]/10 border border-[#FF6A37]/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#FF6A37]">
                  {spotlight.author.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">
                  {spotlight.author}
                </p>
                <p className="text-xs text-foreground-muted">
                  {spotlight.role}, {spotlight.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Rows — now GSAP-powered */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="space-y-4">
          <GSAPMarquee items={firstRow} direction="left" speed={50} />
          <GSAPMarquee items={secondRow} direction="right" speed={55} />
        </div>
      </div>

      {/* Client ticker — absorbed from client-logos section */}
      <div className="mt-12 md:mt-16">
        <p className="text-center text-xs text-foreground-subtle uppercase tracking-[0.2em] mb-4 font-mono">
          Trusted by innovative companies
        </p>
        <ClientTicker />
      </div>
    </section>
  );
}
