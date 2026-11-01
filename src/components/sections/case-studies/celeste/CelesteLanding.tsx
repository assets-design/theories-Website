import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Website title + laptop — Figma `2292:3476`, `2292:3477`
 * Heading matches Figma `.characters` (Safari Lodges placeholder).
 */
export function CelesteLanding() {
  return (
    <section aria-label="Celeste website" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,59.64vw,71.5625rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Celeste International Schools
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            UI/UX Design &amp; Web Development
          </h2>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1680/914] w-full max-lg:aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/landing-laptop.png"
              alt="Celeste International Schools website on a laptop"
              className="absolute inset-0 size-full object-contain object-center"
              draggable={false}
            />
          </div>
        </FadeUp>
        </div>
      </div>
    </section>
  );
}
