import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Retention period: 30 days in milliseconds
const RETENTION_DAYS = 30;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = Date.now();
    const cutoffDate = now - RETENTION_MS;
    let deletedCount = 0;
    let cursor: string | undefined;

    // Paginate through all blobs in the resumes folder
    do {
      const response = await list({
        prefix: 'resumes/',
        cursor,
        limit: 100,
      });

      for (const blob of response.blobs) {
        // Check if blob is older than retention period
        const uploadedAt = new Date(blob.uploadedAt).getTime();
        if (uploadedAt < cutoffDate) {
          await del(blob.url);
          deletedCount++;
          console.log(`Deleted old resume: ${blob.pathname}`);
        }
      }

      cursor = response.cursor;
    } while (cursor);

    return NextResponse.json({
      success: true,
      message: `Cleanup complete. Deleted ${deletedCount} resume(s) older than ${RETENTION_DAYS} days.`,
      deletedCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume cleanup error:', error);
    return NextResponse.json(
      { error: 'Cleanup failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
