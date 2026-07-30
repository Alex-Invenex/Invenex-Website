'use server';

import { resend, isResendConfigured } from '@/lib/resend';
import { scopeRequestSchema, parseIdList } from '@/lib/validations/scope';
import { buildScopeSummary, timelineLabel, trackIndex } from '@/lib/scope-catalog';
import ScopeTeamNotification from '@/emails/scope-team-notification';
import ScopeConfirmation from '@/emails/scope-confirmation';
import { contactInfo } from '@/lib/constants';
import type { ActionResult } from '@/types';

/**
 * Submit a scope-builder request from /build-your-project.
 *
 * The client sends feature IDs only. Every label in the resulting emails is
 * looked up in the catalog server-side.
 */
export async function submitScopeRequest(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  // Honeypot — bots fill it, humans never see it.
  const honeypot = formData.get('company-website');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    // Look successful so the bot moves on.
    return { success: true, data: { id: 'ignored' } };
  }

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    company: formData.get('company') || undefined,
    timeline: formData.get('timeline') || undefined,
    existingUrl: formData.get('existingUrl') || undefined,
    notes: formData.get('notes') || undefined,
    tracks: parseIdList(formData.get('tracks')),
    features: parseIdList(formData.get('features')),
  };

  const result = scopeRequestSchema.safeParse(raw);

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const data = result.data;
  const summary = buildScopeSummary(data.features);

  if (summary.tracks.length === 0) {
    return { success: false, error: 'Select at least one feature before sending.' };
  }

  const trackTitles = data.tracks
    .map((id) => trackIndex.get(id)?.title)
    .filter((t): t is string => Boolean(t));

  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const emailProps = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    timeline: data.timeline ? timelineLabel(data.timeline) : undefined,
    existingUrl: data.existingUrl,
    notes: data.notes,
    trackTitles,
    summary,
    submittedAt,
  };

  // Not configured: log in development rather than failing the user's submission.
  if (!isResendConfigured() || !resend) {
    console.warn('Email service not configured - RESEND_API_KEY is missing');
    if (process.env.NODE_ENV === 'development') {
      console.log('Scope Request (email not sent):', {
        ...emailProps,
        summary: summary.tracks.map(
          (t) => `${t.title}: ${t.selectedCount}/${t.totalCount}`
        ),
      });
      return { success: true, data: { id: `dev-${Date.now()}` } };
    }
    return {
      success: false,
      error: 'Email service is not configured. Please contact us directly.',
    };
  }

  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Invenex Website <hello@invenex.in>',
      to: [contactInfo.email],
      replyTo: data.email,
      subject: `Project scope from ${data.name}${
        data.company ? ` — ${data.company}` : ''
      } (${summary.selectedCount} features)`,
      react: ScopeTeamNotification(emailProps),
    });

    if (emailError) {
      console.error('Scope team email error:', emailError);
      return {
        success: false,
        error: 'Failed to send your selection. Please try again.',
      };
    }

    // Customer confirmation. A failure here must not fail the submission —
    // the team already has the request.
    try {
      await resend.emails.send({
        from: 'Invenex Solutions <hello@invenex.in>',
        to: [data.email],
        subject: 'Your project scope — Invenex Solutions',
        react: ScopeConfirmation(emailProps),
      });
    } catch (confirmationError) {
      console.error('Scope confirmation email error:', confirmationError);
    }

    return { success: true, data: { id: emailData?.id || 'success' } };
  } catch (error) {
    console.error('Scope email sending error:', error);
    return {
      success: false,
      error: 'Failed to send your selection. Please try again or email us directly.',
    };
  }
}
