import { FadeUp } from "@/components/motion/FadeUp";

const bars = [
  {
    label: "Industry Average (High)",
    value: "₹1,200",
    width: "100%",
    fill: "bg-white",
    labelColor: "text-white",
  },
  {
    label: "Industry Average (Low)",
    value: "₹500",
    width: "53%",
    fill: "bg-white",
    labelColor: "text-white",
    track: true,
  },
  {
    label: "Celeste (Theories)",
    value: "₹393",
    width: "37%",
    fill: "bg-[#acbad5]",
    labelColor: "text-[#acbad5]",
    track: true,
  },
] as const;

/**
 * CPL comparison — Figma `1720:4758` + chart `1720:4801`–`1720:4844`
 */
export function CelesteCpl() {
  return (
    <section aria-label="Cost per lead comparison" className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[clamp(2rem,3.125vw,3.75rem)] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)] lg:flex-row lg:items-start lg:justify-between">
        <FadeUp className="min-w-0 flex-1 lg:max-w-[clamp(22rem,45.73vw,54.875rem)]">
          <h2 className="text-h2 leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Education sector CPL on Meta{" "}
            <br className="hidden sm:block" />
            typically ranges&nbsp;₹500–₹1,200.
          </h2>

          <div className="mt-[clamp(1.25rem,3.125vw,3.75rem)] max-lg:max-w-none lg:max-w-[clamp(20rem,42.14vw,50.5625rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.04vw,1.25rem)] leading-[normal] text-white/80">
            <p>
              Celeste achieved{" "}
              <span className="font-bold text-white">₹393</span> — delivering{" "}
              <span className="text-white">30 to 67% cost efficiency</span> over
              the category average.
            </p>
            <p className="mt-[clamp(0.75rem,1.56vw,1.875rem)]">
              Combined with{" "}
              <span className="text-white">600+ confirmed admissions</span>, this
              is Theories&apos; highest-performing education campaign to date.
            </p>
          </div>
        </FadeUp>

        <FadeUp
          delay={120}
          className="w-full shrink-0 rounded-[clamp(0.75rem,1.15vw,1.375rem)] bg-white/10 px-[clamp(1rem,2.08vw,2.5rem)] py-[clamp(1.25rem,2.08vw,2.5rem)] lg:w-[clamp(20rem,39.17vw,47rem)]"
        >
          <ul className="flex flex-col gap-[clamp(1.25rem,2.6vw,3.125rem)]">
            {bars.map((bar) => (
              <li key={bar.label}>
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={`font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] leading-[normal] ${bar.labelColor}`}
                  >
                    {bar.label}
                  </p>
                  <p className="shrink-0 font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] leading-[normal] text-white">
                    {bar.value}
                  </p>
                </div>
                <div
                  className={`mt-[clamp(0.5rem,0.94vw,1.125rem)] h-[clamp(0.5rem,0.625vw,0.75rem)] overflow-hidden rounded-[10px] ${
                    "track" in bar && bar.track ? "bg-white/20" : ""
                  }`}
                >
                  <div
                    className={`h-full rounded-[10px] ${bar.fill}`}
                    style={{ width: bar.width }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-[clamp(1.5rem,2.6vw,3.125rem)] grid grid-cols-2 gap-[clamp(1rem,2.6vw,3.125rem)]">
            <div>
              <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] leading-[normal] text-white">
                67%
              </p>
              <p className="mt-[clamp(0.25rem,0.52vw,0.625rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] leading-[normal] text-white">
                Efficiency Gain
                <br />
                vs high-end category avg.
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] leading-[normal] text-white">
                30%
              </p>
              <p className="mt-[clamp(0.25rem,0.52vw,0.625rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] leading-[normal] text-white">
                Efficiency Gain
                <br />
                vs low-end category avg.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
