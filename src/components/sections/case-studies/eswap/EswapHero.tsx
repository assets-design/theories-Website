import { FadeUp } from "@/components/motion/FadeUp";

const meta = [
  { label: "Project Name", value: "Eswap.in" },
  { label: "TimeFrame", value: "2025" },
  { label: "Role", value: "UI/UX Design & App Development" },
] as const;

/**
 * Hero title + overview + meta — Figma `2328:502` text layers.
 * Hero title + overview + meta for Eswap.in.
 */
export function EswapHero() {
  return (
    <section aria-label="Eswap case study hero" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(18rem,44.27vw,53.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Ticket Resale, Built for Speed.
          </h1>
        </FadeUp>

        <div className="mt-[clamp(1.25rem,2.76vw,3.3125rem)] grid gap-[clamp(2rem,3.125vw,3.75rem)] lg:grid-cols-[minmax(0,830fr)_minmax(0,761fr)] lg:gap-[clamp(2rem,4.64vw,5.5625rem)]">
          <FadeUp immediate delay={80}>
            <div className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
              <p>
                Eswap.in is a ticket resale platform that needed a seamless mobile experience and campaigns that drive real downloads. Buyers and sellers had to move fast without friction or doubt.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed the app UI/UX, brand touchpoints, and social system around clarity and trust — listings, checkout flows, and creatives that make resale feel safe and simple.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The result is a product and campaign ecosystem built for high-intent users: fewer steps, stronger confidence, and a brand that looks as reliable as the tickets people trade.
              </p>
            </div>
          </FadeUp>

          <FadeUp immediate delay={140}>
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
