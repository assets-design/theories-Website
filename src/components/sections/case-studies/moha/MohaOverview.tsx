import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "Moha" },
  { label: "TimeFrame", value: "2026" },
  { label: "Role", value: "Logo Designing" },
] as const;

/**
 * Project overview + meta — Figma `2235:533`–`2235:541`
 */
export function MohaOverview() {
  return (
    <section aria-label="Project overview" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(1.5rem,2.5vw,3rem)]">
        <div className="grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp delay={80}>
            <div className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
              <p>
                MOHA is a premium lifestyle and fashion brand inspired by
                timeless Indian elegance and modern minimalism. Designed for
                those who appreciate refined craftsmanship, MOHA blends
                heritage-inspired aesthetics with contemporary design to create
                products that feel effortless, sophisticated, and enduring.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The brand was envisioned to offer more than just beautiful
                products—it aims to create meaningful experiences through
                thoughtful design, premium quality, and attention to every
                detail. From its visual identity to customer touchpoints, every
                element reflects understated luxury and authenticity.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                MOHA approached us to build a complete brand ecosystem from the
                ground up. We crafted the brand strategy, visual identity, logo
                system, digital presence, and customer experience, ensuring
                every interaction communicates elegance, trust, and exclusivity.
                The result is a distinctive premium brand that stands
                confidently in a competitive market while remaining true to its
                timeless philosophy.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={140}>
            <dl className="flex flex-col">
              {meta.map((row, index) => (
                <div
                  key={row.label}
                  className={`flex items-baseline justify-between gap-4 py-[clamp(0.75rem,0.94vw,1.125rem)] ${
                    index < meta.length - 1 ? "border-b border-white/20" : ""
                  }`}
                >
                  <dt className="font-[family-name:var(--font-display)] text-[clamp(1rem,1.56vw,1.875rem)] leading-[normal] text-white/50">
                    {row.label}
                  </dt>
                  <dd className="text-right font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-white">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
