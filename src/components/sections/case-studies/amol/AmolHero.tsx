import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Amol case study hero — Figma `2014:477`, `2023:650`
 */
export function AmolHero() {
  return (
    <section aria-label="Amol case study hero" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(2rem,3.125vw,3.75rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(20rem,74.48vw,89.375rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Amol
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            UI/UX Design &amp; Web Development
          </h1>
        </FadeUp>

        <FadeUp immediate delay={120} y={28}>
          <div className="relative mt-[clamp(1.25rem,3.125vw,3.75rem)] aspect-[1680/913] w-full overflow-hidden max-lg:aspect-[16/10]">
            <Image
              src="/images/case-studies/amol/hero.png"
              alt="Amol Realtors website shown on a laptop"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 95vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
