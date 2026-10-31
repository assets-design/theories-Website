"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/** Figma soft shadow on transparent fan PNGs — on img, not wrapper (avoids AABB box). */
const FAN_DROP_SHADOW = "drop-shadow-[-30px_0px_4px_rgba(0,0,0,0.25)]";

/**
 * Social Media fan — Figma `2250:519` (heading + 3-item fan only).
 * Heading + fan share one relative group; phone/card tops use rotated AABBs
 * from design_context (2250:517), not unrotated metadata y (those push
 * center/left past 100% and paint over the next section).
 * PNGs must have true alpha outside silhouettes (Figma export bakes opaque black).
 */
export function MohaSocialFan() {
  return (
    <section aria-label="Social media for MoHa" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        {/*
          Combined heading + fan — Figma 2250:519 (1920×1256).
          Section pt 80px = heading y=80. Aspect box height 1176 = 1256−80.
          Heading h≈76px → fan group y=278 → gap 122px = 10.37% of 1176.
          Fan group 2250:517: 1605.61×978.04 @ (146, 278) relative to section.
          Rotated AABB tops (design_context): center/right @ group top,
          left @ +261px (26.69%). Unrotated metadata y must not be used.
        */}
        <div className="relative z-10 w-full lg:aspect-[1920/1176] lg:overflow-visible">
          <FadeUp className="lg:absolute lg:left-0 lg:top-0 lg:z-10">
            <h2 className="text-h2 leading-[1.1875] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Social Media For lohitha
            </h2>
          </FadeUp>

          {/* Desktop fan — rotated AABB positions within 2250:517 */}
          <FadeUp
            delay={40}
            className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
          >
            <div className="absolute left-[7.60%] top-[16.84%] h-[83.16%] w-[83.63%]">
              {/* Left card — AABB 2235:724: top 26.69%, z behind center */}
              <div className="absolute left-0 top-[26.69%] z-10 h-[65.67%] w-[37.41%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/moha/social-fan-left-clean.png"
                  alt="MoHa Instagram post — Celebrate Dhanteras"
                  className={`size-full object-contain object-center ${FAN_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>

              {/* Center phone — AABB 2235:717: top 0 (fills fan group height) */}
              <div className="absolute left-[25.85%] top-0 z-20 h-full w-[51.07%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/moha/social-fan-center-clean.png"
                  alt="MoHa Instagram profile on phone — moha_weaves"
                  className={`size-full object-contain object-center ${FAN_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>

              {/* Right card — AABB 2235:733: top 0, z behind center */}
              <div className="absolute left-[62.59%] top-0 z-10 h-[65.67%] w-[37.41%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/moha/social-fan-right-clean.png"
                  alt="MoHa Instagram post — Celebrate Lakshmi Puja"
                  className={`size-full object-contain object-center ${FAN_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Mobile — center phone only; transparent PNG, no box-shadow wrapper */}
        <FadeUp delay={40} className="mx-auto mt-[clamp(1.5rem,4vw,3rem)] max-w-[min(90vw,22rem)] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/moha/social-fan-center-clean.png"
            alt="MoHa Instagram profile on phone — moha_weaves"
            className={`h-auto w-full ${FAN_DROP_SHADOW}`}
            draggable={false}
          />
        </FadeUp>
      </div>
    </section>
  );
}
