import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Theories Consulting",
  description:
    "Terms and Conditions governing the use of the Theories Consulting website, client engagements, and career submissions.",
};

export default function TermsPage() {
  return (
    <article className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        {/* Header */}
        <header className="border-b border-white/15 pb-8 sm:pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#feba07]">
            Legal Agreement
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Last Updated: March 2026
          </p>
        </header>

        {/* Content Body */}
        <div className="mt-10 space-y-10 font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.05vw,1.05rem)] leading-relaxed text-white/80">
          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to Theories Consulting (&quot;Theories&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By browsing, accessing, or interacting with our website at <span className="text-white">theories.consulting</span>, contacting us for consulting services, or applying for employment opportunities, you agree to comply with and be legally bound by these Terms and Conditions.
            </p>
            <p>
              If you do not agree with any portion of these Terms, please refrain from using our website or submitting your information through our portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              2. Scope of Services
            </h2>
            <p>
              Theories Consulting is an Indian branding and advertising consultancy providing brand identity development, creative campaigns, packaging design, digital experiences, motion design, and marketing strategy.
            </p>
            <p>
              Specific client engagements are governed by separate master services agreements (MSAs) or statements of work (SOWs) executed between Theories and the client. The descriptions provided on this website are for informational and showcase purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content hosted on this website—including but not limited to branding case studies, logos, typography, visual layouts, editorial copy, animations, graphics, and video presentations—is the exclusive intellectual property of Theories Consulting or its respective clients and brand partners.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/75">
              <li>
                You may not reproduce, distribute, modify, republish, or commercially exploit any material from this website without explicit prior written authorization from Theories Consulting.
              </li>
              <li>
                Trademarks, brand names, and client logos featured on this website are the property of their respective owners.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              4. Careers & Candidate Submissions
            </h2>
            <p>
              When submitting an application or transmitting creative materials through our careers form:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/75">
              <li>You warrant that all personal and professional details provided (contact info, work history, experience) are accurate and truthful.</li>
              <li>You warrant that any work samples, portfolios, and case studies you share are your own original creation or that you accurately represent your specific contribution to collaborative projects.</li>
              <li>Submission of an application does not constitute an offer of employment or create an employment relationship.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              5. Permitted Website Use & Restrictions
            </h2>
            <p>
              You agree to use our website only for lawful purposes. You agree not to:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/75">
              <li>Transmit any malicious code, virus, worm, or harmful software to our servers.</li>
              <li>Engage in automated scraping, data harvesting, or systematic crawling of our case studies or personnel information without prior written permission.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with Theories Consulting.</li>
              <li>Attempt to compromise or probe the vulnerability of any system, server, or network connected to our website.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              6. Third-Party Links & Services
            </h2>
            <p>
              Our website may contain links to external third-party services and websites, including LinkedIn, Instagram, Facebook, Google Maps, Behance, and AI search platforms.
            </p>
            <p>
              Theories Consulting has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites. You access external websites at your own discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              7. Disclaimers & Limitation of Liability
            </h2>
            <p>
              This website and all its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied.
            </p>
            <p>
              To the fullest extent permitted by law, Theories Consulting, its directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your access to, use of, or inability to access our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              8. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              9. Modifications to Terms
            </h2>
            <p>
              We reserve the right to amend or update these Terms and Conditions at any time. When modifications are made, the revised date at the top of this document will be updated. Continued use of our website after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
              10. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact:
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
