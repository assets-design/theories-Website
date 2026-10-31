"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { SERVICE_OPTIONS } from "@/components/sections/Services";


const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;

type Status = "idle" | "sending" | "success" | "error";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
};

type ContactPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

function validateFields(
  name: string,
  email: string,
  phone: string,
  service: string,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone =
      "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9.";
  }

  if (!service.trim()) {
    errors.service = "Service is required.";
  }

  return errors;
}

export function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    window.setTimeout(() => {
      if (status === "success") resetForm();
      else {
        setStatus("idle");
        setErrorMessage("");
        setFieldErrors({});
      }
    }, 150);
  }, [onClose, resetForm, status]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, handleClose]);

  function handlePhoneChange(value: string) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const errors = validateFields(name, email, phone, service);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      setErrorMessage("");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone);
      formData.append("service", service.trim());

      const response = await fetch("/api/contact.php", {
        method: "POST",
        body: formData,
      });

      let data: { success?: boolean; message?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        if (
          typeof window !== "undefined" &&
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
        ) {
          data = { success: true };
        }
      }

      if (!response.ok && !data?.success) {
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setFieldErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-[clamp(0.75rem,1vw,1rem)] border border-white/25 bg-white/5 px-[clamp(0.875rem,1.25vw,1.25rem)] py-[clamp(0.75rem,1vw,0.875rem)] text-white placeholder:text-white/40 focus-visible:border-white/60 focus-visible:outline-none";
  const inputErrorClass = "border-[#ff6b4a]/60 focus-visible:border-[#ff6b4a]";
  const labelClass =
    "text-label mb-[clamp(0.35rem,0.5vw,0.5rem)] block text-white/70";
  const fieldErrorClass = "text-body-sm mt-1.5 text-[#ff6b4a]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 border-0 bg-black/75 backdrop-blur-[6px]"
        onClick={handleClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(100dvh,920px)] w-full max-w-[min(100%,28rem)] flex-col overflow-y-auto rounded-[1.5rem] border border-white/15 bg-black p-[clamp(1.25rem,3vw,2rem)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="mb-[clamp(1.25rem,2vw,1.75rem)] flex items-start justify-between gap-4">
          <div>
            <p
              className="mb-2 inline-block text-[clamp(0.7rem,0.85vw,0.875rem)] font-bold uppercase tracking-[0.08em] text-white"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Theories
            </p>
            <h2
              id={titleId}
              className="text-h3 leading-tight text-white"
              style={{ fontFamily: '"Power Grotesk", sans-serif' }}
            >
              Book a Strategy Call
            </h2>
            <p className="text-body-sm mt-2 text-white/65">
              Tell us a bit about your project — we&apos;ll get back to you soon.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-opacity hover:opacity-80"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col gap-6 py-4">
            <p className="text-body text-white">
              Thanks — your message is on its way. We&apos;ll be in touch shortly.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="bg-brand-gradient text-cta inline-flex h-[clamp(44px,3.07vw,59px)] items-center justify-center rounded-[clamp(28px,3.125vw,60px)] px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-[clamp(1rem,1.5vw,1.25rem)]"
          >
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                ref={firstFieldRef}
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) {
                    setFieldErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={
                  fieldErrors.name ? "contact-name-error" : undefined
                }
                className={`text-body ${inputClass} ${fieldErrors.name ? inputErrorClass : ""}`}
                style={{ fontFamily: '"Poppins", sans-serif' }}
                disabled={status === "sending"}
              />
              {fieldErrors.name ? (
                <p id="contact-name-error" className={fieldErrorClass} role="alert">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? "contact-email-error" : undefined
                }
                className={`text-body ${inputClass} ${fieldErrors.email ? inputErrorClass : ""}`}
                style={{ fontFamily: '"Poppins", sans-serif' }}
                disabled={status === "sending"}
              />
              {fieldErrors.email ? (
                <p
                  id="contact-email-error"
                  className={fieldErrorClass}
                  role="alert"
                >
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-phone" className={labelClass}>
                Phone number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={
                  fieldErrors.phone ? "contact-phone-error" : undefined
                }
                className={`text-body ${inputClass} ${fieldErrors.phone ? inputErrorClass : ""}`}
                style={{ fontFamily: '"Poppins", sans-serif' }}
                disabled={status === "sending"}
              />
              {fieldErrors.phone ? (
                <p
                  id="contact-phone-error"
                  className={fieldErrorClass}
                  role="alert"
                >
                  {fieldErrors.phone}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-service" className={labelClass}>
                Service
              </label>
              <select
                id="contact-service"
                name="service"
                required
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  if (fieldErrors.service) {
                    setFieldErrors((prev) => ({ ...prev, service: undefined }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.service)}
                aria-describedby={
                  fieldErrors.service ? "contact-service-error" : undefined
                }
                className={`text-body ${inputClass} ${!service ? "text-white/40" : ""} ${fieldErrors.service ? inputErrorClass : ""}`}
                style={{ fontFamily: '"Poppins", sans-serif' }}
                disabled={status === "sending"}
              >
                <option value="" disabled className="bg-black text-white">
                  Select a service
                </option>
                {SERVICE_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-black text-white"
                  >
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.service ? (
                <p
                  id="contact-service-error"
                  className={fieldErrorClass}
                  role="alert"
                >
                  {fieldErrors.service}
                </p>
              ) : null}
            </div>

            <input
              type="hidden"
              name="subject"
              value="Strategy call / contact — Theories Consulting"
            />

            {status === "error" ? (
              <p className="text-body-sm text-[#ff6b4a]" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-brand-gradient text-cta mt-1 inline-flex h-[clamp(44px,3.07vw,59px)] items-center justify-center rounded-[clamp(28px,3.125vw,60px)] px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
