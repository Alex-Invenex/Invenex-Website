'use server';

import { resend, isResendConfigured } from '@/lib/resend';
import { quoteFormSchema } from '@/lib/validations/contact';
import TeamNotification from '@/emails/team-notification';
import QuoteConfirmation from '@/emails/quote-confirmation';
import { contactInfo, projectTypes, budgetRanges } from '@/lib/constants';
import type { ActionResult } from '@/types';

function getProjectTypeLabel(value: string): string {
  const type = projectTypes.find((t) => t.value === value);
  return type?.label || value;
}

function getBudgetLabel(value: string): string {
  const budget = budgetRanges.find((b) => b.value === value);
  return budget?.label || value;
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
    projectType: formData.get('projectType'),
    budget: formData.get('budget'),
    description: formData.get('description'),
    source: formData.get('source') || undefined,
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
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  // Get human-readable labels for email display
  const projectTypeLabel = getProjectTypeLabel(data.projectType);
  const budgetLabel = getBudgetLabel(data.budget);

  // Check if email service is configured
  if (!isResendConfigured() || !resend) {
    console.warn('Email service not configured - RESEND_API_KEY is missing');
    // In development, log the submission instead of failing
    if (process.env.NODE_ENV === 'development') {
      console.log('Quote Request (email not sent):', {
        name: data.name,
        email: data.email,
        projectType: projectTypeLabel,
        budget: budgetLabel,
        description: data.description,
        source: data.source,
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
      from: 'Invenex Website <noreply@invenex.in>',
      to: [contactInfo.email],
      replyTo: data.email,
      subject: `New Quote Request from ${data.name}`,
      react: TeamNotification({
        name: data.name,
        email: data.email,
        projectType: projectTypeLabel,
        budget: budgetLabel,
        description: data.description,
        source: data.source,
        submittedAt,
      }),
    });

    if (emailError) {
      console.error('Team email error:', emailError);
      return { success: false, error: 'Failed to send notification. Please try again.' };
    }

    // Send visitor confirmation email
    await resend.emails.send({
      from: 'Invenex Solutions <noreply@invenex.in>',
      to: [data.email],
      subject: 'Thank you for your inquiry!',
      react: QuoteConfirmation({
        name: data.name,
        projectType: projectTypeLabel,
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
