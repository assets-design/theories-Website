import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "Safari Lodges India" },
  { label: "TimeFrame", value: "2025" },
  { label: "Role", value: "Web Design And Development" },
] as const;

/**
 * Project overview + meta — Figma `2062:1251` / `2037:999`–`2037:1007`
 * Figma meta value still reads “JCN Consulting”; corrected to brand name.
 */
export function SafariOverview() {
  return (
    <section aria-label="Project overview" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp delay={80}>
            <div className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
              <p>
                Creative Chronicles is your gateway to the dynamic world of
                creativity, design, and innovation. It is more than just a
                blog—it&apos;s a curated collection of insights, trends, and
                stories from the forefront of the creative industry. Whether
                you&apos;re a brand strategist, designer, marketer, or simply a
                creativity enthusiast, Creative Chronicles offers a fresh
                perspective on how ideas are transformed into impactful
                realities.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                Our mission is to inspire and empower creative minds by sharing
                real-world case studies, behind-the-scenes looks at
                groundbreaking projects, and expert opinions on emerging trends.
                We dive deep into the creative process, exploring everything
                from conceptual ideation to execution, and reveal the strategies
                that bring bold visions to life.
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
                  <dd className="max-w-[min(100%,32rem)] text-right font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-white">
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
