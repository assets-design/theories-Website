import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "RPPL Motor Racing" },
  { label: "TimeFrame", value: "2025" },
  { label: "Role", value: "Web Design And Development" },
] as const;

/**
 * Project overview + meta — Figma `1966:3175`–`1966:3184`
 */
export function RpplOverview() {
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
                RPPL Motor Racing brings track-level ambition into a digital identity. The brief was to make the brand feel as precise and competitive as the cars themselves — clear, fast, and impossible to ignore.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed and developed a web experience that translates motorsport energy into UI: bold hierarchy, race-ready storytelling, and a system built for updates as the season moves. Every screen reinforces speed, craft, and team pride.
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
