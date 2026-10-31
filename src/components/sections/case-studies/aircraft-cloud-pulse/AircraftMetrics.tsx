import { FadeUp } from "@/components/motion/FadeUp";

const metrics = [
  { value: "100+", label: "Instagram Creatives" },
  { value: "50+", label: "Reels" },
  { value: "10k", label: "Instagram Reach" },
  { value: "Zero", label: "built from" },
  { value: "3 mo.", label: "timeframe" },
] as const;

/**
 * Summary metrics — Figma `2173:565`–`2173:575`
 */
export function AircraftMetrics() {
  return (
    <section aria-label="Project metrics" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <ul className="grid grid-cols-2 gap-x-[clamp(1rem,2.6vw,3.125rem)] gap-y-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((item, index) => (
            <li key={item.label} className="min-w-0">
              <FadeUp delay={index * 60}>
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
