/**
 * Sanity image loader for next/image
 *
 * This loader optimizes Sanity CDN images by adding
 * width, quality, and auto-format parameters.
 */
export function sanityLoader({
  src,
  width,
  quality = 75,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If it's already a Sanity URL, optimize it
  if (src.includes("cdn.sanity.io")) {
    const url = new URL(src);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("q", quality.toString());
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  return src;
}
