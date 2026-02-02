#!/usr/bin/env node
/**
 * Compress oversized portfolio images to meet AC3 requirements (<500KB)
 * Uses sharp (already installed via Next.js)
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PORTFOLIO_DIR = './public/portfolio';
const MAX_SIZE_KB = 480; // Target slightly under 500KB for safety
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

// Images identified as exceeding 500KB in code review (round 2)
const OVERSIZED_IMAGES = [
  'ahazz-designs-2.png',
  'easemyfly.png',
  'ginger-designs-2.png',
  'ginger-designs.png',
  'grabtogo.png',
  'la-mirage-2.png',
];

async function compressImage(filename) {
  const filepath = path.join(PORTFOLIO_DIR, filename);

  try {
    const stats = await fs.stat(filepath);
    const originalSizeKB = Math.round(stats.size / 1024);

    if (stats.size <= MAX_SIZE_BYTES) {
      console.log(`✓ ${filename} already under ${MAX_SIZE_KB}KB (${originalSizeKB}KB)`);
      return { filename, status: 'skipped', originalKB: originalSizeKB };
    }

    // Read image
    const inputBuffer = await fs.readFile(filepath);

    // Calculate quality based on how much we need to compress
    // More aggressive compression for larger files
    const compressionRatio = MAX_SIZE_BYTES / stats.size;
    let quality = Math.max(40, Math.min(80, Math.round(compressionRatio * 100)));

    // Compress with sharp - convert to optimized PNG
    let outputBuffer = await sharp(inputBuffer)
      .png({
        quality: quality,
        compressionLevel: 9,
        palette: true, // Use palette-based PNG for smaller size
        effort: 10, // Maximum compression effort
      })
      .toBuffer();

    // If still too large, try more aggressive compression
    if (outputBuffer.length > MAX_SIZE_BYTES) {
      outputBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
        .png({
          quality: 60,
          compressionLevel: 9,
          palette: true,
          colors: 256,
          effort: 10,
        })
        .toBuffer();
    }

    // If STILL too large, convert to WebP (much better compression)
    if (outputBuffer.length > MAX_SIZE_BYTES) {
      const webpPath = filepath.replace('.png', '.webp');
      outputBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      await fs.writeFile(webpPath, outputBuffer);
      // Keep PNG but note WebP was created
      console.log(`⚠ ${filename} converted to WebP (PNG too large to compress under ${MAX_SIZE_KB}KB)`);
      return {
        filename,
        status: 'webp-created',
        originalKB: originalSizeKB,
        newKB: Math.round(outputBuffer.length / 1024),
      };
    }

    // Write compressed PNG
    await fs.writeFile(filepath, outputBuffer);
    const newSizeKB = Math.round(outputBuffer.length / 1024);
    const savings = originalSizeKB - newSizeKB;

    console.log(`✓ ${filename}: ${originalSizeKB}KB → ${newSizeKB}KB (saved ${savings}KB)`);
    return { filename, status: 'compressed', originalKB: originalSizeKB, newKB: newSizeKB };

  } catch (error) {
    console.error(`✗ ${filename}: ${error.message}`);
    return { filename, status: 'error', error: error.message };
  }
}

async function main() {
  console.log('Portfolio Image Compression Script');
  console.log('===================================');
  console.log(`Target: <${MAX_SIZE_KB}KB per image\n`);

  const results = [];

  for (const filename of OVERSIZED_IMAGES) {
    const result = await compressImage(filename);
    results.push(result);
  }

  console.log('\n--- Summary ---');
  const compressed = results.filter(r => r.status === 'compressed');
  const skipped = results.filter(r => r.status === 'skipped');
  const webp = results.filter(r => r.status === 'webp-created');
  const errors = results.filter(r => r.status === 'error');

  console.log(`Compressed: ${compressed.length}`);
  console.log(`Skipped (already small): ${skipped.length}`);
  console.log(`Converted to WebP: ${webp.length}`);
  console.log(`Errors: ${errors.length}`);

  if (compressed.length > 0) {
    const totalSaved = compressed.reduce((sum, r) => sum + (r.originalKB - r.newKB), 0);
    console.log(`Total space saved: ${totalSaved}KB`);
  }
}

main().catch(console.error);
