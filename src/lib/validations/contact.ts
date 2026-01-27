import { z } from 'zod';

export const quoteFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  projectType: z.string().min(1, 'Project type is required'),
  budget: z.string().min(1, 'Budget range is required'),
  description: z
    .string()
    .min(1, 'Project description is required')
    .min(10, 'Please provide more details about your project'),
  source: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
