"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

interface OptimizedImageProps {
  image: SanityImageSource;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

/**
 * Optimized image component for Sanity images
 *
 * Uses next/image with blur placeholder generated from Sanity CDN.
 * Provides automatic WebP/AVIF format selection and lazy loading.
 *
 * @example
 * <OptimizedImage
 *   image={project.image}
 *   alt={project.title}
 *   width={800}
 *   height={600}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */
export function OptimizedImage({
  image,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = "100vw",
  fill = false,
}: OptimizedImageProps) {
  // Generate blur placeholder URL (tiny image with blur)
  const blurDataUrl = urlFor(image)
    .width(20)
    .height(Math.round((20 * height) / width))
    .blur(50)
    .url();

  // Generate optimized image URL
  const src = urlFor(image).width(width).height(height).auto("format").url();

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        sizes={sizes}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      sizes={sizes}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
