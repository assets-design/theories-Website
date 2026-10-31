import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Celeste hero title — Figma `2281:1470`
 */
export function CelesteHero() {
  return (
    <section aria-label="Celeste case study hero" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(1rem,1.5vw,1.75rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(18rem,44.27vw,53.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            600+&nbsp;Admissions in 3 Months.
          </h1>
        </FadeUp>
      </div>
    </section>
  );
}
