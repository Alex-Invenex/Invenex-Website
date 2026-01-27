import { Resend } from 'resend';

// Initialize Resend client - will be null if API key is not configured
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export function isResendConfigured(): boolean {
  return resend !== null;
}
