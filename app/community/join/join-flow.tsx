"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memberships } from "../../lib/data";
import { NETWORK_ERROR, parseApiError } from "../../lib/form-errors";

interface JoinForm {
  firstName: string;
  lastName: string;
  nickname: string;
  city: string;
  howFound: string;
  phone: string;
  email: string;
  reason: string;
}

const emptyForm: JoinForm = {
  firstName: "",
  lastName: "",
  nickname: "",
  city: "",
  howFound: "",
  phone: "",
  email: "",
  reason: "",
};

const inputClasses =
  "w-full border-b border-border bg-transparent px-0 py-4 text-base text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

const STEPS = ["Choose membership", "Your details", "Done"];

function Check({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function JoinFlow() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const initialTier =
    memberships.find((t) => t.id === planParam)?.id ?? "member";

  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [form, setForm] = useState<JoinForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof JoinForm, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const tier =
    memberships.find((t) => t.id === selectedTier) ?? memberships[0];

  const validate = (): boolean => {
    const e: Partial<Record<keyof JoinForm, string>> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email address";
    if (!form.reason.trim()) e.reason = "Tell us why you'd like to join";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tier: tier.id, tierName: tier.name }),
      });
      if (!res.ok) {
        const { message, missingFields, invalidEmail } =
          await parseApiError(res);
        const fieldErrors: Partial<Record<keyof JoinForm, string>> = {};
        for (const f of missingFields) {
          if (f in form)
            fieldErrors[f as keyof JoinForm] = "This field is required";
        }
        if (invalidEmail) fieldErrors.email = "Invalid email address";
        if (Object.keys(fieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
        }
        setSubmitError(message);
        return;
      }
      setStep(3);
    } catch {
      setSubmitError(NETWORK_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-20">
      {/* progress steps */}
      <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex items-center gap-3">
              <span
                className={`flex items-center gap-2 ${
                  active
                    ? "text-foreground"
                    : done
                      ? "text-accent"
                      : "text-muted"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center border text-[10px] ${
                    active
                      ? "border-accent text-accent"
                      : done
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border"
                  }`}
                >
                  {n}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </span>
              {i < STEPS.length - 1 && <span className="h-px w-6 bg-border" />}
            </div>
          );
        })}
      </div>

      {/* STEP 1 — choose tier */}
      {step === 1 && (
        <div>
          <h1 className="heading mb-4 text-5xl text-foreground sm:text-6xl lg:text-7xl">
            Choose your membership
          </h1>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-muted">
            Pick the level that fits you. You can change this on the next step.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {memberships.map((t) => {
              const selected = t.id === selectedTier;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTier(t.id)}
                  className={`relative cursor-pointer border p-6 text-left transition-colors lg:p-8 ${
                    selected
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  {t.featured && (
                    <span className="absolute right-5 top-5 border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                      Inner Circle
                    </span>
                  )}
                  <span
                    className={`mb-5 flex h-5 w-5 items-center justify-center border ${
                      selected ? "border-accent bg-accent" : "border-border"
                    }`}
                  >
                    {selected && (
                      <Check className="h-3 w-3 text-accent-foreground" />
                    )}
                  </span>
                  <h3 className="heading text-2xl text-foreground">{t.name}</h3>
                  <div className="heading mt-1 text-3xl text-foreground">
                    {t.price}
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {t.period}
                    </span>
                  </div>
                  <p className="mb-5 mt-3 text-sm text-muted">{t.tagline}</p>
                  <ul className="space-y-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs text-muted"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="cursor-pointer bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              Continue →
            </button>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Selected: <span className="text-foreground">{tier.name}</span>
            </span>
          </div>
        </div>
      )}

      {/* STEP 2 — details form */}
      {step === 2 && (
        <div>
          <h1 className="heading mb-4 text-5xl text-foreground sm:text-6xl lg:text-7xl">
            Your details
          </h1>
          <div className="mb-10 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted">Applying for</span>
            <span className="border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
              {tier.name} · {tier.price}
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline"
            >
              Change
            </button>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="First name *"
                />
                {errors.firstName && (
                  <p className="mt-2 text-xs text-accent">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Last name *"
                />
                {errors.lastName && (
                  <p className="mt-2 text-xs text-accent">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <input
                  value={form.nickname}
                  onChange={(e) =>
                    setForm({ ...form, nickname: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Nickname (optional)"
                />
              </div>
              <div>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={inputClasses}
                  placeholder="City (optional)"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <input
                  value={form.howFound}
                  onChange={(e) =>
                    setForm({ ...form, howFound: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="How did you find us? (optional)"
                />
              </div>
              <div>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClasses}
                  placeholder="Phone (optional)"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClasses}
                placeholder="Email *"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-accent">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                rows={4}
                className={`${inputClasses} resize-none`}
                placeholder="Why do you want to join the OpenMind community? *"
              />
              {errors.reason && (
                <p className="mt-2 text-xs text-accent">{errors.reason}</p>
              )}
            </div>

            {submitError && <p className="text-sm text-accent">{submitError}</p>}

            <div className="flex items-center gap-6 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Submit application →"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3 — success */}
      {step === 3 && (
        <div className="mx-auto max-w-2xl border border-border p-12 text-center lg:p-16">
          <span className="mx-auto mb-8 flex h-14 w-14 items-center justify-center border border-accent bg-accent/10">
            <Check className="h-6 w-6 text-accent" />
          </span>
          <h1 className="heading mb-4 text-4xl text-foreground lg:text-5xl">
            Application received
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted">
            Thanks, {form.firstName} — your application for{" "}
            <span className="text-foreground">{tier.name}</span> is in. We
            review every applicant personally and will be in touch at{" "}
            <span className="text-foreground">{form.email}</span> soon.
          </p>
          <Link
            href="/"
            className="inline-block border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Back to home
          </Link>
        </div>
      )}
    </section>
  );
}
