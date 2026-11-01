import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Social media showcase — Figma `2281:1736`–`2316:506`
 * Group exports (fan / insights / collage / stories) for pixel fidelity.
 * Heading matches Figma `.characters` (Lohitha placeholder).
 */
export function CelesteSocial() {
  return (
    <section aria-label="Social media for Celeste" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        <FadeUp>
          <h2 className="text-h2 leading-[1.1875] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Social Media For Celeste
          </h2>
        </FadeUp>

        <FadeUp delay={60}>
          <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1654/904] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/social-fan-clean.png"
              alt="Celeste Instagram posts fanned around a phone mockup"
              className="absolute inset-0 size-full object-contain object-center"
              draggable={false}
            />
          </div>
        </FadeUp>

        <FadeUp delay={80}>
          <div className="relative mx-auto mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1199/512] w-full max-w-[1199px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/social-insights-clean.png"
              alt="Celeste Instagram insight teaser cards"
              className="absolute inset-0 size-full object-contain object-center"
              draggable={false}
            />
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1702/4423] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/social-collage-clean.png"
              alt="Celeste social media campaign collage — feeds, reels, and creatives"
              className="absolute inset-0 size-full object-contain object-top"
              draggable={false}
            />
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1679/864] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/social-stories-clean.png"
              alt="Celeste story and carousel creative layouts"
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
