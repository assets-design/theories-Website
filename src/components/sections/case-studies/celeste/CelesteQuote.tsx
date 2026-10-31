import { FadeUp } from "@/components/motion/FadeUp";

const summary = [
  { value: "600+", label: "admissions" },
  { value: "₹393", label: "Cost Per Lead" },
  { value: "11.6M", label: "impressions" },
  { value: "Zero", label: "built from" },
  { value: "3 mo.", label: "timeframe" },
] as const;

/**
 * Closing quote + summary metrics — Figma `1720:4759` + `1720:4898`–`1720:4912`
 */
export function CelesteQuote() {
  return (
    <section aria-label="Campaign summary" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,5.2vw,6.25rem)]">
        <FadeUp>
          <h2 className="text-h2 mx-auto max-lg:max-w-none lg:max-w-[clamp(20rem,58.18vw,69.8125rem)] text-center leading-[normal] text-white max-md:!text-[30px] md:max-lg:!text-[2.625rem]">
            {/* Mobile — exact 3 lines (30px so longest line fits px-4 gutters) */}
            <span className="md:hidden">
              <span className="inline-block whitespace-nowrap">
                This campaign is proof
              </span>
              <br />
              <span className="inline-block whitespace-nowrap">
                that the right system beats
              </span>
              <br />
              <span className="inline-block whitespace-nowrap">
                a bigger budget.
              </span>
            </span>
            {/* md+ — existing natural break */}
            <span className="hidden md:inline">
              This campaign is proof that the&nbsp;right system&nbsp;beats a bigger
              budget.
            </span>
          </h2>
        </FadeUp>

        <ul className="mt-[clamp(2rem,4.17vw,5rem)] grid grid-cols-2 gap-x-[clamp(1rem,2.6vw,3.125rem)] gap-y-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-3 lg:grid-cols-5 lg:justify-items-center">
          {summary.map((item, index) => (
            <li key={item.label} className="min-w-0 lg:text-center">
              <FadeUp delay={index * 80}>
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.33vw,4rem)] leading-[normal] text-white">
                  {item.value}
                </p>
                <p className="mt-[clamp(0.25rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] font-medium capitalize leading-[normal] text-white">
                  {item.label}
                </p>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
