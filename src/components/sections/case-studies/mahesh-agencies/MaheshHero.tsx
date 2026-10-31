import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Mahesh Agencies case study hero — Figma `2263:1117`, `2263:1129`
 */
export function MaheshHero() {
  return (
    <section aria-label="Mahesh Agencies case study hero" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(18rem,33.44vw,40.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Designing brands.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Growing businesses.
          </h1>
        </FadeUp>
      </div>

      <FadeUp immediate delay={120} y={28}>
        <div className="relative mx-auto mt-[clamp(1.25rem,3.125vw,3.75rem)] aspect-[1920/696] w-full max-w-[1920px] overflow-hidden bg-white max-lg:aspect-[16/10]">
          <Image
            src="/images/case-studies/mahesh-agencies/hero-v2.png"
            alt="Mahesh Agencies logo — gradient M monogram and wordmark"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
