import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Application Received | Theories Consulting",
  description:
    "Thank you for reaching out to Theories Consulting. Your application has been received successfully.",
};

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center bg-black px-6 py-20 text-white sm:py-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Green Circle Checkmark Icon */}
        <div className="flex size-20 items-center justify-center rounded-full border-2 border-[#22c55e] text-[#22c55e] transition-transform duration-300 hover:scale-105">
          <svg
            className="size-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight text-white">
          Thank You For Reaching Out
        </h1>

        {/* Subtitle */}
        <p className="mt-4 font-[family-name:var(--font-body)] text-[clamp(1.1rem,1.5vw,1.35rem)] font-medium text-white/90">
          Your Application Has Been Received Successfully.
        </p>

        {/* Description paragraph */}
        <p className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-sm sm:text-base leading-relaxed text-white/60">
          Thank You For Choosing Theories Consulting. Our Team Has Received Your Application And Will Get In Touch With You Shortly To Assist You With The Next Steps.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#1e293b] px-7 text-sm font-semibold text-white shadow-md transition hover:bg-[#334155]"
          >
            Back To Homepage
          </Link>

          <a
            href="tel:+919963357799"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-transparent px-7 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            +91 9963357799
          </a>
        </div>
      </div>
    </div>
  );
}
