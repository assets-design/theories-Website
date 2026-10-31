import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Website title + laptop — Figma `2273:1353`–`2273:1355`
 * Heading text matches Figma `.characters` exactly (Safari Lodges placeholder).
 */
export function MaheshLanding() {
  return (
    <section aria-label="Mahesh Agencies website" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,59.64vw,71.5625rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Safari Lodges India{" "}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            UI/UX Design &amp; Web Development
          </h2>
        </FadeUp>

        <FadeUp delay={120}>
          {/* Figma 2273:1355 — laptop on black; opaque black AABB OK on black section */}
          <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1680/914] w-full max-lg:aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/mahesh-agencies/landing-laptop-v2.png"
              alt="Mahesh Agencies website shown on a laptop device"
              className="absolute inset-0 size-full object-contain object-center"
              draggable={false}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
