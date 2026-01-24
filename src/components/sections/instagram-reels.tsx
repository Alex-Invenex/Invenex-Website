"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Instagram, X, ExternalLink, Volume2, VolumeX } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

// To enable images: Add cover photos to /public/images/reels/ and uncomment coverSrc
// To enable autoplay: Add videos to /public/videos/ and uncomment videoSrc
const reels = [
  {
    id: "DEofbAcSLyL",
    url: "https://www.instagram.com/reel/DEofbAcSLyL/",
    // coverSrc: "/images/reels/reel-1.jpg",
    // videoSrc: "/videos/reel-1.mp4",
  },
  {
    id: "DFDGYdUIhku",
    url: "https://www.instagram.com/reel/DFDGYdUIhku/",
    // coverSrc: "/images/reels/reel-2.jpg",
    // videoSrc: "/videos/reel-2.mp4",
  },
  {
    id: "C--W-KWhMkq",
    url: "https://www.instagram.com/reel/C--W-KWhMkq/",
    // coverSrc: "/images/reels/reel-3.jpg",
    // videoSrc: "/videos/reel-3.mp4",
  },
  {
    id: "C-u0w2OBBCF",
    url: "https://www.instagram.com/reel/C-u0w2OBBCF/",
    // coverSrc: "/images/reels/reel-4.jpg",
    // videoSrc: "/videos/reel-4.mp4",
  },
  {
    id: "C32ciCRvp91",
    url: "https://www.instagram.com/reel/C32ciCRvp91/",
    // coverSrc: "/images/reels/reel-5.jpg",
    // videoSrc: "/videos/reel-5.mp4",
  },
  {
    id: "C3J-CVTPeVS",
    url: "https://www.instagram.com/reel/C3J-CVTPeVS/",
    // coverSrc: "/images/reels/reel-6.jpg",
    // videoSrc: "/videos/reel-6.mp4",
  },
];

type ReelType = (typeof reels)[0] & { videoSrc?: string; coverSrc?: string };

function ReelCard({
  reel,
  index,
}: {
  reel: ReelType;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.5 });
  const hasLocalVideo = !!reel.videoSrc;
  const hasCover = !!reel.coverSrc;

  // Autoplay when in view (for local videos)
  useEffect(() => {
    if (hasLocalVideo && videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, hasLocalVideo]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(reel.url, "_blank")}
    >
      {/* Instagram gradient border */}
      <div
        className={`absolute -inset-[2px] rounded-[24px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-30"
        }`}
      />

      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-[2px] rounded-[24px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 blur-xl transition-opacity duration-500 ${
          isHovered ? "opacity-50" : "opacity-0"
        }`}
      />

      {/* Card content */}
      <div className="relative aspect-[9/16] rounded-[22px] overflow-hidden bg-black">
        {hasLocalVideo ? (
          // Local video with autoplay
          <video
            ref={videoRef}
            src={reel.videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : hasCover ? (
          // Cover image
          <img
            src={reel.coverSrc}
            alt="Reel cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // Stylish placeholder - opens Instagram on click
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900/80 to-orange-900 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
            <div className="text-center z-10">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Instagram className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/0 transition-colors duration-300 ${
            isHovered ? "bg-black/20" : ""
          }`}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Instagram badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Instagram className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-lg">
            Reel
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({
  reel,
  onClose,
}: {
  reel: ReelType | null;
  onClose: () => void;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLocalVideo = reel?.videoSrc;

  useEffect(() => {
    if (hasLocalVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [hasLocalVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (!reel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
          onClick={onClose}
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        {/* Video container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[9/16]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Instagram gradient border */}
          <div className="absolute -inset-[3px] rounded-[28px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
          <div className="absolute -inset-[3px] rounded-[28px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 blur-2xl opacity-40" />

          {/* Video frame */}
          <div className="relative w-full h-full rounded-[25px] overflow-hidden bg-black">
            {hasLocalVideo ? (
              <video
                ref={videoRef}
                src={reel.videoSrc}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                autoPlay
              />
            ) : (
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                className="absolute border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "calc(100% + 80px)",
                  top: "-40px",
                  position: "absolute",
                }}
              />
            )}
          </div>

          {/* Mute toggle (only for local videos) */}
          {hasLocalVideo && (
            <button
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          )}
        </motion.div>

        {/* Open in Instagram link */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white text-sm hover:border-pink-500/50 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Instagram className="w-4 h-4" />
          <span>Open in Instagram</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
}

export function InstagramReels() {
  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden" aria-labelledby="instagram-reels-title" data-testid="instagram-reels-section">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <motion.a
              href="https://www.instagram.com/invenexsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 via-pink-500/10 to-purple-500/10 border border-pink-500/20 backdrop-blur-sm mb-5 hover:border-pink-500/40 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                <Instagram className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                @invenexsolutions
              </span>
            </motion.a>

            <h2 id="instagram-reels-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Creative
              </span>{" "}
              Journey
            </h2>
            <p className="text-base md:text-lg text-foreground-muted max-w-xl mx-auto">
              Behind the scenes, success stories, and creative moments
            </p>
          </AnimatedSection>

          {/* Reels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {reels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={index}
              />
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.4} className="text-center mt-10 md:mt-14">
            <motion.a
              href="https://www.instagram.com/invenexsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 md:px-8 md:py-4 rounded-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600" />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <Instagram className="w-5 h-5 text-white relative z-10" />
              <span className="text-white font-semibold text-sm md:text-base relative z-10">
                Follow Our Journey
              </span>
              <ExternalLink className="w-4 h-4 text-white/80 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
  );
}
