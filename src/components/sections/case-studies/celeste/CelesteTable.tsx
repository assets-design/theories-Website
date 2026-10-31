import { FadeUp } from "@/components/motion/FadeUp";

const rows = [
  {
    metric: "Total Impressions",
    value: "11,622,557",
    benchmark: "Massive reach",
  },
  {
    metric: "Total Clicks",
    value: "80,952",
    benchmark: "High-intent traffic",
  },
  {
    metric: "Click-Through Rate",
    value: "0.70%",
    benchmark: "Above avg.",
  },
  {
    metric: "Cost Per Click",
    value: "₹5",
    benchmark: "Highly efficient",
  },
  {
    metric: "Leads Generated",
    value: "1,019",
    benchmark: "Qualified enquiries",
  },
  {
    metric: "Cost Per Lead",
    value: "₹393",
    benchmark: "vs ₹500–₹1,200 industry",
  },
  {
    metric: "Total Spend",
    value: "₹4,00,473",
    benchmark: "Full campaign budget",
  },
  {
    metric: "Admissions Driven",
    value: "600+",
    benchmark: "🏆 Best campaign ever",
  },
] as const;

/**
 * Meta & Google full read-out table — Figma `1720:4852`
 */
export function CelesteTable() {
  return (
    <section aria-label="Meta and Google campaign read-out" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-lg:max-w-none lg:max-w-[clamp(18rem,51.67vw,62rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Meta &amp; Google the full read-out.
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="mt-[clamp(1.25rem,3.125vw,3.75rem)] overflow-x-auto rounded-[clamp(0.75rem,1.15vw,1.375rem)] bg-white/10">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="px-[clamp(1rem,2.92vw,3.5rem)] py-[clamp(0.75rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-normal text-white">
                    Metric
                  </th>
                  <th className="px-[clamp(1rem,2.92vw,3.5rem)] py-[clamp(0.75rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-normal text-white">
                    Value
                  </th>
                  <th className="px-[clamp(1rem,2.92vw,3.5rem)] py-[clamp(0.75rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-normal text-white">
                    Benchmark
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.metric} className="border-b border-white/20 last:border-b-0">
                    <td className="px-[clamp(1rem,2.92vw,3.5rem)] py-[clamp(0.875rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] text-white">
                      {row.metric}
                    </td>
                    <td className="px-[clamp(1rem,2.92vw,3.5rem)] py-[clamp(0.875rem,1.56vw,1.875rem)] font-[family-name:var(--font-display)] text-[clamp(1.25rem,1.77vw,2.125rem)] capitalize text-white">
                      {row.value}
                    </td>
                    <td className="px-[clamp(1rem,2.92vw,3.5rem)] py-[clamp(0.875rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] text-white">
                      {row.benchmark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
