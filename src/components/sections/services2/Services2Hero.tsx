import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Services2 hero — Figma `2110:510` intro band.
 * Authoritative copy (not Figma placeholder).
 */
export function Services2Hero() {
  return (
    <section aria-label="The work we do" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(18rem,45vw,43rem)] leading-[normal] text-white max-md:!text-[32px] md:max-lg:!text-[2.625rem]">
            The Work We Do
          </h1>
        </FadeUp>
        <FadeUp immediate delay={120} y={28}>
          <p className="mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[clamp(20rem,45vw,40rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] font-normal leading-[normal] text-white/80">
            Four stages. Most brands need two or three. A few need all of them.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
