'use server';

import { resend, isResendConfigured } from '@/lib/resend';
import { quoteFormSchema } from '@/lib/validations/contact';
import TeamNotification from '@/emails/team-notification';
import QuoteConfirmation from '@/emails/quote-confirmation';
import { contactInfo, referralSources } from '@/lib/constants';
import { getBudgetBands } from '@/lib/pricing';
import { isCurrency, type Currency } from '@/lib/currency';
import { isLikelyBot, verifyTurnstile } from '@/lib/spam';
import { headers } from 'next/headers';
import type { ActionResult } from '@/types';

function getBudgetLabel(value: string, currency: Currency): string {
  const band = getBudgetBands(currency).find((b) => b.value === value);
  return band?.label || value;
}

function getSourceLabel(value: string): string {
  const source = referralSources.find((s) => s.value === value);
  return source?.label || value;
}

/**
 * Submit a quote request form
 * Supports both direct invocation and useActionState patterns
 */
export async function submitQuoteRequest(
  prevStateOrFormData: ActionResult<{ id: string }> | FormData,
  maybeFormData?: FormData
): Promise<ActionResult<{ id: string }>> {
  // Support both (formData) and (prevState, formData) signatures
  const formData =
    maybeFormData ?? (prevStateOrFormData instanceof FormData ? prevStateOrFormData : null);

  if (!formData) {
    return { success: false, error: 'Invalid form submission' };
  }
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    budget: formData.get('budget'),
    description: formData.get('description'),
    source: formData.get('source'),
    currency: formData.get('currency') || undefined,
  };

  // Server-side validation with Zod
  const result = quoteFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0].message,
    };
  }

  const data = result.data;

  // Silent spam checks run after validation so a real visitor still sees
  // field errors. Look successful so the bot moves on.
  if (isLikelyBot(formData, data.name)) {
    return { success: true, data: { id: 'ignored' } };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim();
  if (!(await verifyTurnstile(formData.get('cf-turnstile-response'), ip))) {
    return {
      success: false,
      error: 'Please complete the verification check above and try again.',
    };
  }

  // The client sends the currency it displayed the budget select in, so the
  // email shows the same label the visitor picked. Anything unrecognised
  // (missing field, tampered value) falls back to INR rather than failing
  // the submission over a cosmetic label.
  const currency: Currency = isCurrency(data.currency) ? data.currency : 'INR';
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  // Get human-readable labels for email display
  const budgetLabel = getBudgetLabel(data.budget, currency);
  const sourceLabel = getSourceLabel(data.source);

  // Check if email service is configured
  if (!isResendConfigured() || !resend) {
    console.warn('Email service not configured - RESEND_API_KEY is missing');
    // In development, log the submission instead of failing
    if (process.env.NODE_ENV === 'development') {
      console.log('Quote Request (email not sent):', {
        name: data.name,
        email: data.email,
        budget: budgetLabel,
        description: data.description,
        source: sourceLabel,
        submittedAt,
      });
      return { success: true, data: { id: `dev-${Date.now()}` } };
    }
    return {
      success: false,
      error: 'Email service is not configured. Please contact us directly.',
    };
  }

  try {
    // Send team notification email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Invenex Website <hello@invenex.in>',
      to: [contactInfo.email],
      replyTo: data.email,
      subject: `New Quote Request from ${data.name}`,
      react: TeamNotification({
        name: data.name,
        email: data.email,
        budget: budgetLabel,
        description: data.description,
        source: sourceLabel,
        submittedAt,
      }),
    });

    if (emailError) {
      console.error('Team email error:', emailError);
      return { success: false, error: 'Failed to send notification. Please try again.' };
    }

    // Send visitor confirmation email
    await resend.emails.send({
      from: 'Invenex Solutions <hello@invenex.in>',
      to: [data.email],
      subject: 'Thank you for your inquiry!',
      react: QuoteConfirmation({
        name: data.name,
        budget: budgetLabel,
        description: data.description,
      }),
    });

    return { success: true, data: { id: emailData?.id || 'success' } };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: 'Failed to send email. Please try again or contact us directly.',
    };
  }
}
