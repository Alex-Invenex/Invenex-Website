import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Sanity Webhook Revalidation API Route (Story 7-5)
 *
 * Receives webhooks from Sanity when content changes and triggers
 * on-demand revalidation for the affected document types.
 *
 * @see https://www.sanity.io/docs/webhooks
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidateTag
 */

interface SanityWebhookBody {
  _type: string
  _id: string
  slug?: { current: string }
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request: Missing _type', { status: 400 })
    }

    // Revalidate by document type - affects all pages fetching this type
    revalidateTag(body._type)

    // Also revalidate specific slug if available for granular cache invalidation
    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`)
    }

    // Only log in development to avoid noise in production
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Sanity Webhook] Revalidated: ${body._type} (${body._id})`)
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      type: body._type,
      id: body._id,
    })
  } catch (err) {
    console.error('[Sanity Webhook] Revalidation error:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Only POST method is supported
export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 })
}

export async function PUT() {
  return new NextResponse('Method Not Allowed', { status: 405 })
}

export async function DELETE() {
  return new NextResponse('Method Not Allowed', { status: 405 })
}
