'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Card } from '@/components/ui/card';

interface ApplicationFormProps {
  jobSlug: string;
  jobTitle: string;
}

export function ApplicationForm({ jobSlug, jobTitle }: ApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Accept common phone formats: +91 98765 43210, (123) 456-7890, 123-456-7890, etc.
    // Requires at least 7 digits (international minimum)
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!name?.trim()) newErrors.name = 'Name is required';
    if (!email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!phone?.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!resumeFile) newErrors.resume = 'Resume is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Add file and job info to form data
    formData.append('jobSlug', jobSlug);
    formData.append('jobTitle', jobTitle);
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    try {
      // TODO: Story 6-5 will implement:
      // 1. Server Action to handle submission
      // 2. File upload to Vercel Blob storage
      // 3. Email notification to HR
      // await submitJobApplication(formData)
      setIsSuccess(true);
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 text-center" data-testid="success-message">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-heading-3 font-semibold mb-2">Application Submitted!</h3>
        <p className="text-foreground-muted">
          Thanks for applying! We&apos;ll review your application and get back to you within a week.
        </p>
      </Card>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-testid="application-form"
      noValidate
    >
      <Input
        name="name"
        label="Full Name"
        placeholder="John Doe"
        error={errors.name}
        required
        aria-invalid={errors.name ? 'true' : undefined}
      />

      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="john@example.com"
        error={errors.email}
        required
        aria-invalid={errors.email ? 'true' : undefined}
      />

      <Input
        name="phone"
        type="tel"
        label="Phone Number"
        placeholder="+91 98765 43210"
        error={errors.phone}
        required
        aria-invalid={errors.phone ? 'true' : undefined}
      />

      <div>
        <label className="block text-body-sm font-medium text-foreground mb-2">
          Resume (PDF or DOC, max 5MB)
        </label>
        <FileUpload
          accept=".pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
          onFileSelect={setResumeFile}
          error={errors.resume}
        />
      </div>

      <Input
        name="portfolio"
        type="url"
        label="Portfolio URL (Optional)"
        placeholder="https://your-portfolio.com"
      />

      <Textarea
        name="coverLetter"
        label="Cover Letter (Optional)"
        rows={4}
        placeholder="Tell us why you're interested in this role..."
      />

      {errors.form && (
        <p className="text-error text-body-sm" role="alert" data-testid="form-error">
          {errors.form}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
