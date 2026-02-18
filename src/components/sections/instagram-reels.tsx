"use client";

import { useState, useRef, useEffect } from "react";
import { Instagram, X, ExternalLink, Play } from "lucide-react";
import { gsap, useGSAP, registerScrollTrigger, prefersReducedMotion } from "@/lib/gsap";


const socialCards = [
  {
    id: "DEofbAcSLyL",
    url: "https://www.instagram.com/reel/DEofbAcSLyL/",
    title: "Build your brand online",
    cover: "/instagram/reel-DEofbAcSLyL.gif",
  },
  {
    id: "DFDGYdUIhku",
    url: "https://www.instagram.com/reel/DFDGYdUIhku/",
    title: "Why you need an online store",
    cover: "/instagram/reel-DFDGYdUIhku.gif",
  },
  {
    id: "C--W-KWhMkq",
    url: "https://www.instagram.com/reel/C--W-KWhMkq/",
    title: "Online clinic management",
    cover: "/instagram/reel-C--W-KWhMkq.gif",
  },
  {
    id: "C-u0w2OBBCF",
    url: "https://www.instagram.com/reel/C-u0w2OBBCF/",
    title: "Client Q&A",
    cover: "/instagram/reel-C-u0w2OBBCF.gif",
  },
  {
    id: "C32ciCRvp91",
    url: "https://www.instagram.com/reel/C32ciCRvp91/",
    title: "Online growth simplified",
    cover: "/instagram/reel-C32ciCRvp91.gif",
  },
];

// Fanned card rotations and offsets (Lando Norris style)
const CARD_TRANSFORMS = [
  { rotate: -12, y: 20, x: -10 },
  { rotate: -6, y: -10, x: -5 },
  { rotate: 0, y: -20, x: 0 },
  { rotate: 6, y: -10, x: 5 },
  { rotate: 12, y: 20, x: 10 },
];

function SocialCard({
  card,
  index,
  onOpen,
}: {
  card: (typeof socialCards)[0];
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const transform = CARD_TRANSFORMS[index];

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotate: 0,
      y: transform.y - 30,
      scale: 1.08,
      zIndex: 20,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotate: transform.rotate,
      y: transform.y,
      scale: 1,
      zIndex: index,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      data-social-card
      data-animate
      className="relative cursor-pointer group shrink-0"
      style={{
        transform: `rotate(${transform.rotate}deg) translateY(${transform.y}px)`,
        zIndex: index,
        marginLeft: index === 0 ? 0 : "-16px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
    >
      {/* Card body */}
      <div
        className="rounded-2xl overflow-hidden relative shadow-2xl shadow-black/40"
        style={{ width: "clamp(200px, 18vw, 260px)", aspectRatio: "9/16" }}
      >
        {/* GIF cover */}
        <img
          src={card.cover}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Darkening overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-black/50 transition-all duration-300">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
          <p className="text-white text-sm font-medium leading-tight opacity-90">
            {card.title}
          </p>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Instagram className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-white text-[10px] font-medium">Reel</span>
        </div>
      </div>
    </div>
  );
}

function ReelModal({
  card,
  onClose,
}: {
  card: (typeof socialCards)[0] | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card) return;

    if (!prefersReducedMotion()) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [card]);

  if (!card) return null;

  const handleClose = () => {
    if (!prefersReducedMotion() && overlayRef.current && contentRef.current) {
      gsap.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.2 });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
      onClick={handleClose}
    >
      <button
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
        onClick={handleClose}
      >
        <X className="w-5 h-5" />
      </button>

      <div
        ref={contentRef}
        className="relative w-full max-w-[360px] aspect-[9/16]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-[3px] rounded-[28px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
        <div className="absolute -inset-[3px] rounded-[28px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 blur-2xl opacity-40" />

        <div className="relative w-full h-full rounded-[25px] overflow-hidden bg-black">
          <iframe
            src={`https://www.instagram.com/reel/${card.id}/embed/`}
            className="absolute border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              width: "160%",
              height: "calc(100% + 120px)",
              top: "-60px",
              left: "-30%",
              position: "absolute",
            }}
          />
        </div>
      </div>

      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <Instagram className="w-4 h-4" />
        <span>Open in Instagram</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function InstagramReels() {
  const [activeCard, setActiveCard] = useState<(typeof socialCards)[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP entrance animation — fanned cards stagger in
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const init = async () => {
        await registerScrollTrigger();

        gsap.fromTo(
          "[data-social-header]",
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

        const cards = sectionRef.current?.querySelectorAll("[data-social-card]");
        if (!cards) return;

        cards.forEach((card, i) => {
          const t = CARD_TRANSFORMS[i];
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              rotate: 0,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: t.y,
              rotate: t.rotate,
              scale: 1,
              duration: 0.8,
              delay: i * 0.08,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
              },
            }
          );
        });
      };
      init();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-background relative overflow-hidden"
      aria-labelledby="social-showcase-title"
      data-testid="instagram-reels-section"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral-500/[0.04] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div data-social-header data-animate className="text-center mb-16 md:mb-24">
          <span className="text-sm text-foreground-muted tracking-[0.2em] uppercase mb-4 block font-mono">
            Follow Along
          </span>
          <h2
            id="social-showcase-title"
            className="tracking-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="text-foreground/40" style={{ fontWeight: 200 }}>
              WHAT&apos;S{" "}
            </span>
            <span className="text-gradient-orange">HAPPENING</span>
          </h2>

          {/* Instagram follow badge */}
          <a
            href="https://www.instagram.com/invenexsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 mt-4"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <Instagram className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-foreground-muted font-medium">
              @invenexsolutions
            </span>
          </a>
        </div>

        {/* Fanned cards layout */}
        <div className="flex items-center justify-center relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
          <div className="flex items-center justify-center">
            {socialCards.map((card, index) => (
              <SocialCard
                key={card.id}
                card={card}
                index={index}
                onOpen={() => setActiveCard(card)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="https://www.instagram.com/invenexsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full overflow-hidden bg-coral-500 hover:bg-coral-600 transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm md:text-base">
              Follow Our Journey
            </span>
            <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Modal */}
      <ReelModal card={activeCard} onClose={() => setActiveCard(null)} />
    </section>
  );
}
