"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/** Soft shadow on transparent fan PNGs — on img only (avoids AABB box). */
const FAN_DROP_SHADOW = "drop-shadow-[-30px_0px_4px_rgba(0,0,0,0.25)]";

/**
 * Social Media fan — Figma heading `2263:1231` + group `2283:543`.
 * White section; phone/card tops use rotated AABBs from design_context.
 * Clean PNGs: opaque black screenshot letterbox flood-cleared (Pillow verified).
 */
export function MaheshSocialFan() {
  return (
    <section aria-label="Social media for Mahesh Agencies" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2rem,4.17vw,5rem)]">
        {/*
          Heading + fan — white block starts Figma y=5182.
          Heading y=5262 (pt 80). Fan group 2283:543: 1667.61×1031 @ (120, 5404).
          Aspect box: heading→fan bottom ≈ 1253px → 1920/1253.
          Fan relative to that box: top ≈ 142/1253 = 11.33%.
          Rotated AABBs within fan group (design_context):
            center 22.85% / 0 / 51.47% / 100%
            left    0% / 27.55% / 36.02% / 62.30%
            right  63.98% / 13.00% / 36.02% / 62.30%
        */}
        <div className="relative z-10 w-full lg:aspect-[1920/1253] lg:overflow-visible">
          <FadeUp className="lg:absolute lg:left-0 lg:top-0 lg:z-10">
            <h2 className="text-h2 leading-[1.1875] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Social Media For lohitha
            </h2>
          </FadeUp>

          <FadeUp
            delay={40}
            className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
          >
            <div className="absolute left-[6.25%] top-[11.33%] h-[82.28%] w-[86.85%]">
              {/* Left card — behind phone */}
              <div className="absolute left-0 top-[27.55%] z-10 h-[62.3%] w-[36.02%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/mahesh-agencies/social-fan-left-clean-v2.png"
                  alt="Mahesh Agencies Instagram post — From your first Maruti"
                  className={`size-full object-contain object-center ${FAN_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>

              {/* Center phone — on top */}
              <div className="absolute left-[22.85%] top-0 z-20 h-full w-[51.47%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/mahesh-agencies/social-fan-center-clean-v2.png"
                  alt="Mahesh Agencies Instagram profile on phone"
                  className={`size-full object-contain object-center ${FAN_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>

              {/* Right card — behind phone */}
              <div className="absolute left-[63.98%] top-[13%] z-10 h-[62.3%] w-[36.02%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/mahesh-agencies/social-fan-right-clean-v2.png"
                  alt="Mahesh Agencies Instagram post — coolant cap creative"
                  className={`size-full object-contain object-center ${FAN_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={40} className="mx-auto mt-[clamp(1.5rem,4vw,3rem)] max-w-[min(90vw,22rem)] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/mahesh-agencies/social-fan-center-clean-v2.png"
            alt="Mahesh Agencies Instagram profile on phone"
            className={`h-auto w-full ${FAN_DROP_SHADOW}`}
            draggable={false}
          />
        </FadeUp>
      </div>
    </section>
  );
}
