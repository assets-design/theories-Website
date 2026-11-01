import { ScrollLink } from "@/components/layout/ScrollLink";

const ADDRESS =
  "2nd & 3rd Floor, Plot, No, 73P, Beverly Hills, Guttala_Begumpet, Kavuri Hills, Jubilee Hills, Hyderabad, Telangana 500033";

const SUMMARISE_PROMPT = encodeURIComponent(
  "Summarise Theories Consulting — an Indian branding and advertising consultancy.",
);

const aiPills: {
  label: string;
  href: string;
  icon: string;
  variant: "chatgpt" | "claude" | "perplexity";
}[] = [
  {
    label: "Ask ChatGPT",
    href: `https://chatgpt.com/?q=${SUMMARISE_PROMPT}`,
    icon: "/images/icons/ask-chatgpt.png",
    variant: "chatgpt",
  },
  {
    label: "Ask Claude",
    href: `https://claude.ai/new?q=${SUMMARISE_PROMPT}`,
    icon: "/images/icons/ask-claude.png",
    variant: "claude",
  },
  {
    label: "Ask Perplexity",
    href: `https://www.perplexity.ai/search/new?q=${SUMMARISE_PROMPT}`,
    icon: "/images/icons/ask-perplexity.png",
    variant: "perplexity",
  },
];

const MAPS_URL =
  "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KftfnTkUcyuGMaP_CA0d0rbI&daddr=2nd+%26+3rd+Floor,+Plot,+No,+73P,+Beverly+Hills,+Guttala_Begumpet,+Kavuri+Hills,+Jubilee+Hills,+Hyderabad,+Telangana+500081";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Theories-Consulting/61583947267210/?ref=PROFILE_EDIT_xav_ig_profile_page_web#",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/company/theories-consulting/posts/?feedView=all",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theoriesconsulting?igsh=ODBxc29sNno0ZmYz",
  },
] as const;

/**
 * Footer — Figma 1804:1909 / 1720:4482
 *
 * Black band · RIES outline + gold glow + golden-ratio spiral
 * Contact / address / social · AI summarise pills · legal row
 */
export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px]">
        {/* Brand graphic band */}
        <div className="relative h-[clamp(12rem,25vw,30rem)] overflow-hidden border-t border-white/20">
          {/* Gold radial box — Figma 1720:4484 (~841×480), separate layer behind artwork */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-0 flex h-full w-[clamp(12rem,43.8vw,52.55rem)] items-center justify-center"
          >
            {/* Figma exports this fill with rotate-180 + flip-Y (= horizontal mirror) */}
            <div className="size-full -scale-y-100 rotate-180">
              <svg
                className="block size-full"
                viewBox="0 0 840.83 480"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    id="footerBrandGold"
                    gradientUnits="userSpaceOnUse"
                    cx="0"
                    cy="0"
                    r="10"
                    gradientTransform="matrix(133.21 -27.989 65.839 603.19 -27.527 332)"
                  >
                    <stop offset="0.51482" stopColor="#000000" />
                    <stop offset="0.52998" stopColor="#080600" />
                    <stop offset="0.54514" stopColor="#100c00" />
                    <stop offset="0.57547" stopColor="#201701" />
                    <stop offset="0.63612" stopColor="#402f02" />
                    <stop offset="0.69676" stopColor="#5f4603" />
                    <stop offset="0.75741" stopColor="#7f5d04" />
                    <stop offset="0.81806" stopColor="#9f7404" />
                    <stop offset="0.87871" stopColor="#bf8c05" />
                    <stop offset="1" stopColor="#FEBA07" />
                  </radialGradient>
                </defs>
                <rect width="840.83" height="480" fill="url(#footerBrandGold)" />
              </svg>
            </div>
          </div>

          {/* RIES outline wordmark */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 z-[1] w-[clamp(16rem,47.4vw,57rem)] -translate-y-1/2 overflow-hidden opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/footer/ries-outline.svg"
              alt=""
              className="h-auto w-full max-w-none translate-x-[-12%]"
              width={929}
              height={178}
            />
          </div>

          {/* Golden ratio spiral */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-[clamp(1rem,2vw,2.5rem)] z-[1] w-[clamp(14rem,40.5vw,48.7rem)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/footer/golden-ratio-spiral.svg"
              alt=""
              className="h-auto w-full"
              width={779}
              height={482}
            />
          </div>
        </div>

        {/* Contact / address / social */}
        <div className="border-t border-white/20 px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,4.17vw,5rem)] pb-[clamp(1.5rem,2.6vw,3.125rem)]">
          <div className="grid gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:gap-[clamp(2rem,5vw,6rem)]">
            {/* Contact column */}
            <div className="flex flex-col gap-[clamp(1.25rem,2.08vw,2.5rem)]">
              <div>
                <p className="text-label">Say Hello!</p>
                <a
                  href="mailto:nithin@theories.consulting"
                  className="text-body mt-[clamp(0.25rem,0.52vw,0.625rem)] block text-white transition-opacity hover:opacity-80"
                >
                  nithin@theories.consulting
                </a>
              </div>
              <div>
                <p className="text-label">Contact us</p>
                <p className="text-body mt-[clamp(0.25rem,0.52vw,0.625rem)] flex flex-col text-white">
                  <a
                    href="tel:+919963357799"
                    className="transition-opacity hover:opacity-80"
                  >
                    +91 99633 57799
                  </a>
                  <a
                    href="tel:+919959367839"
                    className="transition-opacity hover:opacity-80"
                  >
                    +91 99593 67839
                  </a>
                </p>
              </div>
            </div>

            {/* Address column */}
            <div>
              <p className="text-label">Our Address</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body mt-[clamp(0.25rem,0.52vw,0.625rem)] block max-w-[clamp(18rem,25.2vw,30.25rem)] text-white transition-opacity hover:opacity-80"
              >
                {ADDRESS}
              </a>
            </div>

            {/* Social column */}
            <nav aria-label="Social links" className="flex flex-col gap-[clamp(0.75rem,1.56vw,1.875rem)] lg:justify-self-end">
              {socialLinks.map((link) => {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-h4 group inline-flex items-center gap-[clamp(0.5rem,0.83vw,1rem)] text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                    <span className="relative inline-flex size-[clamp(0.875rem,1.2vw,1.45rem)] shrink-0 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/icons/arrow-external.svg"
                        alt=""
                        width={23}
                        height={24}
                        className="size-full rotate-45"
                      />
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Summarise Theories Consulting */}
          <div className="mt-[clamp(2rem,3.65vw,4.375rem)]">
            <p className="text-label">Summarise Theories Consulting</p>
            <div className="mt-[clamp(0.75rem,1.46vw,1.75rem)] flex flex-wrap gap-[clamp(0.75rem,1.56vw,1.875rem)]">
              {aiPills.map((pill) => (
                <a
                  key={pill.label}
                  href={pill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[clamp(2.75rem,3.385vw,4.0625rem)] items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)] rounded-[clamp(1.375rem,1.693vw,2.03125rem)] bg-white px-[clamp(0.875rem,1.56vw,1.875rem)] text-black shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                >
                  {pill.variant === "perplexity" ? (
                    <span className="relative flex size-[clamp(1.5rem,1.82vw,2.1875rem)] shrink-0 items-center justify-center overflow-hidden rounded-[2px] bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pill.icon}
                        alt=""
                        width={22}
                        height={23}
                        className="h-[66%] w-[62%] object-contain"
                      />
                    </span>
                  ) : (
                    <span
                      className={`relative size-[clamp(1.5rem,1.82vw,2.1875rem)] shrink-0 overflow-hidden ${
                        pill.variant === "chatgpt" ? "rounded-full" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pill.icon}
                        alt=""
                        width={35}
                        height={35}
                        className="size-full object-cover"
                      />
                    </span>
                  )}
                  <span className="font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] font-normal leading-normal whitespace-nowrap">
                    {pill.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-white/20 px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(1.25rem,2.08vw,2.5rem)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label !text-white">©2026 Theories Consulting</p>
          <div className="flex flex-wrap gap-[clamp(1.5rem,4.17vw,5rem)]">
            <ScrollLink
              href="/services"
              className="text-label !text-white transition-opacity hover:opacity-80"
            >
              Services
            </ScrollLink>
            <ScrollLink
              href="/careers"
              className="text-label !text-white transition-opacity hover:opacity-80"
            >
              Careers
            </ScrollLink>
            <ScrollLink
              href="/privacy"
              className="text-label !text-white transition-opacity hover:opacity-80"
            >
              Privacy Policy
            </ScrollLink>
            <ScrollLink
              href="/terms"
              className="text-label !text-white transition-opacity hover:opacity-80"
            >
              Terms & Conditions
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
