import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Theories Consulting",
  description:
    "Privacy Policy for Theories Consulting. Understand how we collect, use, and protect your personal data, inquiries, and job applications.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        {/* Header */}
        <header className="border-b border-white/15 pb-8 sm:pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#feba07]">
            Legal & Data Protection
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Last Updated: March 2026
          </p>
        </header>

        {/* Content Body */}
        <div className="mt-10 space-y-10 font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.05vw,1.05rem)] leading-relaxed text-white/80">
          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              1. Introduction
            </h2>
            <p>
              Theories Consulting (&quot;Theories&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to respecting and safeguarding the privacy of visitors to our website, clients engaging our branding and advertising services, and candidates applying for career openings.
            </p>
            <p>
              This Privacy Policy details the types of personal information we collect, why we collect it, how it is processed and protected, and your choices regarding your personal data when using our website located at <span className="text-white">theories.consulting</span>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              2. Information We Collect
            </h2>
            <p>We collect information in the following circumstances:</p>
            <ul className="list-disc space-y-2 pl-6 text-white/75">
              <li>
                <strong className="text-white">Career Applications:</strong> When you apply for an open role or submit a general application, we collect your full name, email address, phone number, experience level, portfolio or profile URLs (Behance, LinkedIn, Google Drive, etc.), uploaded resume documents (PDF/DOC), and your answers to design prompts.
              </li>
              <li>
                <strong className="text-white">Contact & Consulting Inquiries:</strong> When you reach out via our contact forms or direct email/telephone channels, we collect your name, business name, contact details, project brief, and any related communications.
              </li>
              <li>
                <strong className="text-white">Automated Technical Data:</strong> When you browse our site, basic server logs may record your IP address, browser type, device specifications, operating system, pages visited, and general browsing timestamps.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect solely for legitimate business purposes:</p>
            <ul className="list-disc space-y-2 pl-6 text-white/75">
              <li>To evaluate job candidates, assess creative portfolios, and coordinate interview stages.</li>
              <li>To reply to client inquiries, prepare strategic proposals, and deliver creative services.</li>
              <li>To maintain, analyze, and enhance the speed, accessibility, and security of our website.</li>
              <li>To comply with statutory legal requirements and maintain business operational integrity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              4. Candidate Resumes & Portfolio Data
            </h2>
            <p>
              All resume attachments, portfolios, and creative links submitted through our careers portal are treated as strictly confidential. Submissions are reviewed solely by the Theories Consulting leadership and creative evaluation team.
            </p>
            <p>
              We retain candidate records for a reasonable period to consider applicants for future openings that match their background. If you would like your candidate profile or uploaded documents permanently deleted from our records, you may email us at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              5. Data Sharing & Third-Party Service Providers
            </h2>
            <p>
              We do not sell, rent, lease, or monetize your personal information to any third parties or marketing brokers.
            </p>
            <p>
              We may share information only with trusted service infrastructure partners necessary for our day-to-day operations (such as transactional delivery services like Brevo, cloud hosting, and secure email providers), strictly subject to confidentiality and security standards. We may also disclose information where mandated by law or court order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              6. Cookies & Tracking Technologies
            </h2>
            <p>
              Our website uses minimal cookies and similar technologies necessary for website functionality, smooth page transitions, and basic aggregate traffic metrics. We do not engage in invasive behavioral tracking or third-party advertising retargeting networks.
            </p>
            <p>
              You can instruct your browser to decline cookies at any time through your browser settings, though certain interactive features may function with slight limitations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              7. Data Security
            </h2>
            <p>
              We take information security seriously and maintain appropriate technical, physical, and administrative measures to safeguard your personal data from unauthorized access, accidental alteration, disclosure, or destruction. However, please remember that no transmission across the public internet is 100% impenetrable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              8. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have rights under applicable data protection laws, including the right to request access to your data, request rectification of inaccurate information, or request the deletion of your personal records.
            </p>
            <p>
              To exercise any of these rights, please contact our team using the details provided below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              9. Contact Us
            </h2>
            <p>
              If you have any questions, feedback, or requests regarding this Privacy Policy or our data handling practices, please contact us:
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/80 space-y-1.5">
              <p className="font-semibold text-white">Theories Consulting</p>
              <p>Email: <a href="mailto:nithin@theories.consulting" className="text-[#feba07] hover:underline">nithin@theories.consulting</a></p>
              <p>Phone: +91 99633 57799 / +91 99593 67839</p>
              <p>Address: 2nd & 3rd Floor, Plot No. 73P, Beverly Hills, Guttala Begumpet, Kavuri Hills, Jubilee Hills, Hyderabad, Telangana 500033</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
