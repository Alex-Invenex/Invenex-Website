'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { referralSources } from '@/lib/constants';
import { getBudgetBands } from '@/lib/pricing';
import { useCurrency } from '@/components/providers/currency-provider';
import { submitQuoteRequest } from '@/lib/actions/contact';
import { TurnstileWidget, type TurnstileHandle } from '@/components/forms/turnstile-widget';

/**
 * Goal-gradient progress indicator (copy deck §11 / P2): the form opens
 * already 20% done, never 0% — starting a bar at zero reads as "this will
 * take forever" and depresses completion. Submit success advances it to
 * Step 2 of 2 at 100%, not a fifth field.
 */
function FormProgress({ step, percent }: { step: 1 | 2; percent: 20 | 100 }) {
  return (
    <div data-testid="quote-form-progress">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
          Step {step} of 2 — you&apos;re {percent}% done
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-coral-500 to-coral-700 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
          data-testid="quote-form-progress-bar"
        />
      </div>
    </div>
  );
}

export function QuoteForm() {
  const { currency } = useCurrency();
  // Highest-first, per currency (§4.1 / P2: anchors every answer upward
  // instead of down from a low first option).
  const budgetBands = getBudgetBands(currency);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);
  const sourceRef = useRef<HTMLSelectElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  // When the form appeared, so the server can drop implausibly fast fills.
  const [mountedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set('form-elapsed-ms', String(Date.now() - mountedAt));
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
      newErrors.description = "Please tell us what you're building";
    }

    if (!data.budget || (data.budget as string).trim() === '') {
      newErrors.budget = 'Please pick a budget range';
    }

    if (!data.source || (data.source as string).trim() === '') {
      newErrors.source = 'Please tell us how you heard about us';
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
      } else if (newErrors.budget) {
        budgetRef.current?.focus();
      } else if (newErrors.source) {
        sourceRef.current?.focus();
      }
      return;
    }

    // Submit to Server Action
    try {
      const result = await submitQuoteRequest(formData);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrors({ form: result.error || 'Something went wrong. Please try again.' });
        turnstileRef.current?.reset();
      }
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
      turnstileRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 text-center">
        <FormProgress step={2} percent={100} />
        <div className="mt-6 text-6xl text-accent">✓</div>
        <h3 className="mb-2 mt-4 text-heading-3 font-semibold">Got it.</h3>
        <p className="text-foreground-muted">
          You&apos;ll hear from a founder within one working day.
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
      <FormProgress step={1} percent={20} />

      {/* Which currency the visitor saw the budget options in, so the team
          notification shows the matching label server-side. */}
      <input type="hidden" name="currency" value={currency} />

      {/* Honeypot — off-screen, never focusable. Same field as the scope form. */}
      <input
        type="text"
        name="company-website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
        style={{ position: 'absolute', left: '-9999px' }}
      />

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

      <Textarea
        ref={descriptionRef}
        name="description"
        label="What are you trying to build?"
        placeholder="Tell us what you're building..."
        error={errors.description}
        rows={4}
        required
        aria-invalid={errors.description ? 'true' : undefined}
      />

      {/* Bands are listed highest-first to anchor upward (§4.1 / P2), but the
          field must start EMPTY. Defaulting to `budgetBands[0]` would submit
          the top band for everyone who never touches the select, so a
          Launchpad enquiry would land in the founder's inbox tagged
          "₹10,00,000+" — bad for the first call and worthless as data.
          Same placeholder treatment as `source` below: no native `required`
          prop (it disables the placeholder option), `aria-required` plus the
          client check above and the Zod check server-side. */}
      <Select
        ref={budgetRef}
        name="budget"
        label="Budget"
        options={budgetBands.map((b) => ({ value: b.value, label: b.label }))}
        placeholder="Select a range..."
        error={errors.budget}
        aria-invalid={errors.budget ? 'true' : undefined}
        aria-required="true"
      />

      {/* Required (§4.1 / P2): the only reliable channel signal the business
          gets. Deliberately NOT passing the native `required` prop here —
          `Select` disables its placeholder option when `required` is set,
          and a disabled option is skipped when the browser assigns a
          default selection, so the field would silently start on "Google
          Search" instead of blank. `aria-required` plus the client/Zod
          checks below enforce the requirement without that side effect. */}
      <Select
        ref={sourceRef}
        name="source"
        label="How did you hear about us?"
        options={referralSources.map((s) => ({ value: s.value, label: s.label }))}
        placeholder="Select..."
        error={errors.source}
        aria-invalid={errors.source ? 'true' : undefined}
        aria-required="true"
      />

      <TurnstileWidget ref={turnstileRef} />

      {errors.form && (
        <p className="text-error text-body-sm" role="alert">
          {errors.form}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        {isLoading ? 'Sending...' : 'Send it'}
      </Button>
    </form>
  );
}
