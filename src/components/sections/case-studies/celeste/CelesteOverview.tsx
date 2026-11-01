import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "Celeste" },
  { label: "TimeFrame", value: "2026" },
  { label: "Role", value: "Web, Social & Performance Marketing" },
] as const;

/**
 * Project overview + meta — Figma `2281:1726`–`2281:1734`
 * Project overview for Celeste.
 */
export function CelesteOverview() {
  return (
    <section aria-label="Project overview" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp>
            <div className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
              <p>
                Celeste International Schools serves parents who compare carefully before they commit. The digital front door had to feel trustworthy, modern, and clear about what makes Celeste different.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We built social, performance marketing, SEO, UI/UX, and web development around admissions outcomes — proof, clarity, and campaigns that turn interest into enrolled students.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                In three months the system helped drive 600+ admissions, with creatives and landing experiences working as one pipeline from awareness to confirmation.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={80}>
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
