"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BrowserFrame } from "@/components/ui/browser-frame";

interface ImageGalleryProps {
  images: string[];
  projectTitle?: string;
  /** Project live URL — shown in each framed cell's chrome bar. */
  projectUrl?: string;
}

export function ImageGallery({ images, projectTitle = "Project", projectUrl }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(Math.max(0, lightboxIndex - 1));
  }, [lightboxIndex]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1));
  }, [lightboxIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            data-testid="gallery-image"
            className="group block w-full cursor-pointer rounded-xl text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`View image ${i + 1} of ${images.length} in fullscreen`}
          >
            <BrowserFrame url={projectUrl} variant="card">
              <Image
                src={image}
                alt={`${projectTitle} screenshot ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </BrowserFrame>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-testid="image-lightbox"
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close button */}
            <button
              data-testid="lightbox-close"
              className="absolute top-4 right-4 text-white p-2 hover:bg-surface-overlay-hover rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Previous button */}
            <button
              data-testid="lightbox-prev"
              className="absolute left-4 text-white p-3 hover:bg-surface-overlay-hover rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              disabled={lightboxIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" aria-hidden="true" />
            </button>

            {/* Next button */}
            <button
              data-testid="lightbox-next"
              className="absolute right-4 text-white p-3 hover:bg-surface-overlay-hover rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              disabled={lightboxIndex === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" aria-hidden="true" />
            </button>

            {/* Image container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full aspect-video bg-background-secondary rounded-lg overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${projectTitle} screenshot ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
