import { z } from 'zod';

export const jobApplicationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, '');
        return digitsOnly.length >= 7 && digitsOnly.length <= 15;
      },
      { message: 'Invalid phone number format' }
    ),
  portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  coverLetter: z.string().optional(),
  jobSlug: z.string().min(1, 'Job slug is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
});

export type JobApplicationData = z.infer<typeof jobApplicationSchema>;
