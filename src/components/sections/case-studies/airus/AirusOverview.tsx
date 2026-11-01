import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "AIRUS" },
  { label: "TimeFrame", value: "2026" },
  { label: "Role", value: "Logo Designing" },
] as const;

/**
 * Project overview + meta — Figma `1982:5906`–`1982:5915`
 * Copy matches Figma frame text layers exactly.
 */
export function AirusOverview() {
  return (
    <section aria-label="Project overview" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Project Overview
          </h2>
        </FadeUp>

        <div className="mt-[clamp(1.25rem,2.76vw,3.3125rem)] grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp delay={80}>
            <div className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
              <p>
                Airus needed a logo system built for product and packaging — a wordmark, droplet mark, and applications that feel clean, fluid, and instantly ownable on shelf and screen.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed the mark and brand applications to stay consistent across packaging, product, and digital use. Soft geometry and a clear droplet cue make the brand readable at any size.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The finished system gives Airus a distinctive identity that feels premium, simple, and ready for every customer touchpoint.
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
