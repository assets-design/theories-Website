import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "Zene AI" },
  { label: "TimeFrame", value: "2026" },
  { label: "Role", value: "Social Media Marketing" },
] as const;

/**
 * Project overview + meta — Figma `2354:918`–`2354:926`
 * Project overview for Zene AI.
 */
export function ZeneOverview() {
  return (
    <section aria-label="Project overview" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp>
            <div className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
              <p>
                Zene AI is an education brand that needed social content which turns curiosity into admissions. The mascot, message, and campaign system had to feel approachable while still sounding smart.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We built Instagram creatives, reels, and campaign frameworks around clear learning benefits and character-led storytelling. Every asset is designed to stop the scroll and move parents or students one step closer to enquiry.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The result is a social system that makes AI-powered education feel human — memorable, consistent, and ready to convert attention into conversations.
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
