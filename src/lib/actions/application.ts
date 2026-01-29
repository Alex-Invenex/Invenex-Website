'use server';

import { put } from '@vercel/blob';
import { resend, isResendConfigured } from '@/lib/resend';
import { jobApplicationSchema } from '@/lib/validations/application';
import type { ActionResult } from '@/types';
import HRApplicationNotification from '@/emails/hr-application-notification';
import ApplicantConfirmation from '@/emails/applicant-confirmation';

const HR_EMAIL = 'hello@invenex.in';

// Check if Vercel Blob is configured
function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function submitJobApplication(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  // Parse form data
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    portfolio: formData.get('portfolio') || '',
    coverLetter: formData.get('coverLetter') || '',
    jobSlug: formData.get('jobSlug'),
    jobTitle: formData.get('jobTitle'),
  };

  // Validate with Zod
  const result = jobApplicationSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const data = result.data;

  // Handle resume file
  const resumeFile = formData.get('resume') as File | null;
  if (!resumeFile || resumeFile.size === 0) {
    return { success: false, error: 'Resume is required' };
  }

  // Validate file type (defense in depth - client already validates)
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (!allowedTypes.includes(resumeFile.type)) {
    return {
      success: false,
      error: 'Invalid file type. Please upload a PDF or DOC file.',
    };
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024;
  if (resumeFile.size > maxSize) {
    return { success: false, error: 'File size must be under 5MB' };
  }

  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  // Check if blob storage is configured
  if (!isBlobConfigured()) {
    console.warn('Vercel Blob not configured - BLOB_READ_WRITE_TOKEN is missing');
    // In development, log and return success
    if (process.env.NODE_ENV === 'development') {
      console.log('Job Application (file not uploaded):', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        jobTitle: data.jobTitle,
        jobSlug: data.jobSlug,
        portfolio: data.portfolio,
        coverLetter: data.coverLetter,
        resumeFileName: resumeFile.name,
        submittedAt,
      });
      return { success: true, data: { id: `dev-${Date.now()}` } };
    }
    return {
      success: false,
      error: 'File storage is not configured. Please contact us directly.',
    };
  }

  try {
    // Upload resume to Vercel Blob
    // Sanitize filename to prevent path traversal
    const safeFileName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    // Generate unique path with random component to prevent URL guessing
    const uniqueId = crypto.randomUUID();

    let blob;
    try {
      // Note: Using public access so HR can download via email link.
      blob = await put(
        `resumes/${uniqueId}-${safeFileName}`,
        resumeFile,
        { access: 'public' }
      );
    } catch (blobError) {
      console.error('Blob upload error:', blobError);
      const blobErrorMsg = blobError instanceof Error ? blobError.message : 'Unknown blob error';
      return {
        success: false,
        error: `File upload failed: ${blobErrorMsg}`,
      };
    }

    // Check if email service is configured
    if (!isResendConfigured() || !resend) {
      console.warn('Email service not configured - RESEND_API_KEY is missing');
      // In development, log the submission
      if (process.env.NODE_ENV === 'development') {
        console.log('Job Application (emails not sent):', {
          ...data,
          resumeUrl: blob.url,
          submittedAt,
        });
        return { success: true, data: { id: `dev-${Date.now()}` } };
      }
      return {
        success: false,
        error: 'Email service is not configured. Please contact us directly.',
      };
    }

    // Send HR notification email
    console.log('Sending HR notification email to:', HR_EMAIL);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Invenex Careers <hello@invenex.in>',
      to: [HR_EMAIL],
      replyTo: data.email,
      subject: `New Application: ${data.jobTitle} - ${data.name}`,
      react: HRApplicationNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        jobTitle: data.jobTitle,
        resumeUrl: blob.url,
        portfolio: data.portfolio || undefined,
        coverLetter: data.coverLetter || undefined,
        submittedAt,
      }),
    });

    console.log('Resend HR email response:', { emailData, emailError });

    if (emailError) {
      console.error('HR notification email error:', JSON.stringify(emailError));
      return {
        success: false,
        error: `Failed to send notification: ${emailError.message || JSON.stringify(emailError)}`,
      };
    }

    // Send applicant confirmation email
    const { error: confirmationError } = await resend.emails.send({
      from: 'Invenex Solutions <hello@invenex.in>',
      to: [data.email],
      subject: `Application Received - ${data.jobTitle}`,
      react: ApplicantConfirmation({
        name: data.name,
        jobTitle: data.jobTitle,
      }),
    });

    if (confirmationError) {
      // Log but don't fail - HR already has the application
      console.error('Applicant confirmation email error:', confirmationError);
      // Still return success since the application was received
    }

    return { success: true, data: { id: emailData?.id || 'success' } };
  } catch (error) {
    console.error('Application submission error:', error);
    // Return more specific error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to submit application: ${errorMessage}`,
    };
  }
}
