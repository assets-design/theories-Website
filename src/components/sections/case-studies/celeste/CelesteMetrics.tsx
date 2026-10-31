import { FadeUp } from "@/components/motion/FadeUp";

const metrics = [
  {
    value: "11.6M",
    label: "Impressions",
    detail: "Total reach across Meta & Google",
  },
  {
    value: "₹393",
    label: "Cost Per Lead",
    detail: "vs ₹500–₹1,200 industry avg.",
  },
  {
    value: "80,952",
    label: "Clicks",
    detail: "0.70% CTR",
  },
  {
    value: "₹4,00,473",
    label: "Total Spend",
    detail: "Full campaign budget",
  },
  {
    value: "1,019",
    label: "Leads Generated",
    detail: "Qualified enquiries",
  },
  {
    value: "600+",
    label: "Admissions",
    detail: "Best-performing education campaign",
  },
] as const;

/**
 * Performance metrics — Figma `2281:1478`
 */
export function CelesteMetrics() {
  return (
    <section aria-label="Campaign metrics" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2rem,3.125vw,3.75rem)]">
        <FadeUp>
          <ul className="grid grid-cols-2 gap-x-[clamp(1rem,2vw,2.5rem)] gap-y-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-3 lg:grid-cols-6">
            {metrics.map((m) => (
              <li key={m.label} className="min-w-0">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.33vw,4rem)] leading-[normal] text-white">
                  {m.value}
                </p>
                <p className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] font-medium leading-[normal] text-white">
                  {m.label}
                </p>
                <p className="mt-1 font-[family-name:var(--font-body)] text-[clamp(0.6875rem,0.73vw,0.875rem)] leading-[1.4] text-white/60">
                  {m.detail}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
