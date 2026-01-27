'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { projectTypes, budgetRanges, referralSources } from '@/lib/constants';

export function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Client-side validation
    const newErrors: Record<string, string> = {};

    if (!data.name || (data.name as string).trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (!data.email || (data.email as string).trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
      newErrors.email = 'Invalid email address';
    }

    if (!data.description || (data.description as string).trim() === '') {
      newErrors.description = 'Please describe your project';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);

      // Focus on first error field
      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.email) {
        emailRef.current?.focus();
      } else if (newErrors.description) {
        descriptionRef.current?.focus();
      }
      return;
    }

    // Submit to Server Action (Story 5.3)
    try {
      // Simulate API call for now - will be replaced with actual Server Action
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await submitQuoteRequest(data)
      setIsSuccess(true);
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4 text-accent">✓</div>
        <h3 className="text-heading-3 font-semibold mb-2">Thank You!</h3>
        <p className="text-foreground-muted">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
      </Card>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      data-testid="quote-form"
      noValidate
    >
      <Input
        ref={nameRef}
        name="name"
        label="Your Name"
        placeholder="John Doe"
        error={errors.name}
        required
        aria-invalid={errors.name ? 'true' : undefined}
      />

      <Input
        ref={emailRef}
        name="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        error={errors.email}
        required
        aria-invalid={errors.email ? 'true' : undefined}
      />

      <Select
        name="projectType"
        label="Project Type"
        options={projectTypes.map((t) => ({ value: t.value, label: t.label }))}
        defaultValue={projectTypes[0].value}
      />

      <Select
        name="budget"
        label="Budget Range"
        options={budgetRanges.map((b) => ({ value: b.value, label: b.label }))}
        defaultValue={budgetRanges[0].value}
      />

      <Textarea
        ref={descriptionRef}
        name="description"
        label="Project Description"
        placeholder="Tell us about your project..."
        error={errors.description}
        rows={4}
        aria-invalid={errors.description ? 'true' : undefined}
      />

      <Select
        name="source"
        label="How did you hear about us? (Optional)"
        options={referralSources.map((s) => ({ value: s.value, label: s.label }))}
        placeholder="Select..."
      />

      {errors.form && (
        <p className="text-error text-body-sm" role="alert">
          {errors.form}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
