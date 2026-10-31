import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "Lohitha Foods" },
  { label: "TimeFrame", value: "2024 - 2026" },
  { label: "Role", value: "Social Media, Web Design And Development" },
] as const;

const metrics = [
  { value: "100+", label: "Instagram Creatives" },
  { value: "50+", label: "Reels" },
  { value: "10k", label: "Instagram Reach" },
  { value: "Zero", label: "built from" },
  { value: "3 mo.", label: "timeframe" },
] as const;

/**
 * Lohitha hero + overview + metrics — Figma `2195:526`
 * Black band 1920×1196: title, body/meta row, metrics row.
 */
export function LohithaHero() {
  return (
    <section aria-label="Lohitha Foods case study hero" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,12.1875vw,14.625rem)] pb-[clamp(3rem,9.375vw,11.25rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(20rem,74.48vw,89.375rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Lohitha Foods
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Social Media, UI/UX Design &amp; Web Development
          </h1>
        </FadeUp>

        {/* Body + meta — Figma gap title→row ≈60px (447 − 234 − 153) */}
        <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:items-start lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp immediate delay={80}>
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
              <p className="mt-[1.125rem]">
                Our mission is to inspire and empower creative minds by sharing
                real-world case studies, behind-the-scenes looks at
                groundbreaking projects, and expert opinions on emerging trends.
                We dive deep into the creative process, exploring everything
                from conceptual ideation to execution, and reveal the strategies
                that bring bold visions to life.
              </p>
            </div>
          </FadeUp>

          <FadeUp immediate delay={140}>
            <dl className="flex w-full flex-col">
              {meta.map((row, index) => (
                <div
                  key={row.label}
                  className={`flex items-baseline justify-between gap-4 py-[clamp(0.75rem,0.94vw,1.125rem)] ${
                    row.label === "Project Name"
                      ? "lg:pb-[clamp(0.99rem,1.24vw,1.485rem)]"
                      : ""
                  } ${
                    index < meta.length - 1 ? "border-b border-white/20" : ""
                  }`}
                >
                  <dt className="shrink-0 font-[family-name:var(--font-display)] text-[clamp(1rem,1.56vw,1.875rem)] leading-[normal] text-white/50">
                    {row.label}
                  </dt>
                  <dd className="max-w-[min(100%,30.625rem)] text-right font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-white">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        {/* Metrics — Figma y=897 within 1196 band */}
        <ul className="mt-[clamp(2.5rem,9.375vw,11.25rem)] grid grid-cols-2 gap-x-[clamp(1rem,2.6vw,3.125rem)] gap-y-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((item, index) => (
            <li key={item.label} className="min-w-0">
              <FadeUp immediate delay={180 + index * 40}>
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
