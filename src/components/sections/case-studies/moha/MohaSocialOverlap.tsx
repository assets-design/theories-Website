"use client";

import { FadeUp } from "@/components/motion/FadeUp";

const overlapPosts = [
  {
    src: "/images/case-studies/moha/social-overlap-post-1.png",
    alt: "MoHa Instagram post — girl in green saree, Embrace the goddess in you",
    left: "6.25%",
    zIndex: 10,
  },
  {
    src: "/images/case-studies/moha/social-overlap-post-2.png",
    alt: "MoHa Instagram post — girl in white saree with veena",
    left: "26.667%",
    zIndex: 20,
  },
  {
    src: "/images/case-studies/moha/social-overlap-post-3.png",
    alt: "MoHa Instagram post — girl in orange saree",
    left: "47.083%",
    zIndex: 30,
  },
  {
    src: "/images/case-studies/moha/social-overlap-post-4.png",
    alt: "MoHa Instagram post — girl in red saree",
    left: "67.5%",
    zIndex: 40,
  },
] as const;

const storyPhones = [
  {
    src: "/images/case-studies/moha/social-overlap-navratri.png",
    alt: "MoHa Navratri story — This Navratri, Embrace the goddess in you",
    left: "26.719%",
    activeSegment: 0,
  },
  {
    src: "/images/case-studies/moha/social-overlap-dussehra.png",
    alt: "MoHa Dussehra story — Strength woven in every drape",
    left: "52.552%",
    activeSegment: 1,
  },
] as const;

/** Figma drop-shadow on transparent phone PNGs — applied on img, not wrapper. */
const PHONE_DROP_SHADOW = "drop-shadow-[-30px_0px_4px_rgba(0,0,0,0.25)]";

function StoryProgress({ activeIndex }: { activeIndex: 0 | 1 }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[5.8%] left-1/2 z-10 flex -translate-x-1/2 gap-[clamp(0.25rem,1.406vw,1.0625rem)]"
      aria-hidden
    >
      {[0, 1].map((segment) => (
        <div
          key={segment}
          className="h-[2px] w-[clamp(3.75rem,7.24vw,8.688rem)] rounded-[4px]"
          style={{
            backgroundColor:
              segment === activeIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Social overlap + story phones — Figma `2250:533` (1920×1849 white block).
 * Top row `2250:524`: 4×534×755 Instagram posts, 392px horizontal step, left drop-shadow.
 * Bottom row `2239:767`: 2×399×863 story phones + 305×2px progress bars (white / white 40%).
 */
export function MohaSocialOverlap() {
  return (
    <section aria-label="MoHa social media overlap" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        {/* Desktop — single aspect frame matching Figma 2250:533 */}
        <div className="relative hidden w-full lg:block lg:aspect-[1920/1849]">
          {/* Top overlap fan — Figma 2250:524 @ y=151 within section */}
          <FadeUp className="absolute left-0 top-[8.167%] z-10 h-[40.835%] w-full overflow-visible">
            {overlapPosts.map((phone, index) => (
              <div
                key={phone.src}
                className="absolute top-0"
                style={{
                  left: phone.left,
                  width: "27.8125%",
                  aspectRatio: "534/755",
                  zIndex: phone.zIndex,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={phone.src}
                  alt={phone.alt}
                  className={`absolute inset-0 size-full object-cover object-center ${PHONE_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>
            ))}
          </FadeUp>

          {/* Bottom story pair — Figma 2239:767 @ y=986 within section */}
          <FadeUp delay={40} className="absolute left-0 top-[53.327%] z-10 h-[46.674%] w-full overflow-visible">
            {storyPhones.map((phone) => (
              <div
                key={phone.src}
                className="absolute top-0"
                style={{
                  left: phone.left,
                  width: "20.78125%",
                  aspectRatio: "399/863",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={phone.src}
                  alt={phone.alt}
                  className="absolute inset-0 size-full object-cover object-center"
                  draggable={false}
                />
                <StoryProgress activeIndex={phone.activeSegment} />
              </div>
            ))}
          </FadeUp>
        </div>

        {/* Mobile — horizontal scroll top row, stacked story phones */}
        <div className="flex flex-col gap-[clamp(2rem,5vw,5rem)] lg:hidden">
          <div
            className="-mr-4 flex snap-x snap-mandatory gap-0 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {overlapPosts.map((phone, index) => (
              <div
                key={phone.src}
                className="w-[72%] shrink-0 snap-start sm:w-[60%]"
                style={{ marginLeft: index > 0 ? "-18%" : undefined }}
              >
                <FadeUp>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={phone.src}
                    alt={phone.alt}
                    className={`h-auto w-full ${PHONE_DROP_SHADOW}`}
                    draggable={false}
                  />
                </FadeUp>
              </div>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-[min(92vw,28rem)] flex-col gap-[clamp(1.5rem,4vw,2.5rem)] sm:max-w-none sm:flex-row sm:justify-center sm:gap-[clamp(1rem,5vw,3rem)]">
            {storyPhones.map((phone) => (
              <FadeUp key={phone.src} className="relative mx-auto w-full max-w-[min(85vw,12.5rem)] sm:max-w-[min(40vw,14rem)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={phone.src}
                  alt={phone.alt}
                  className="h-auto w-full"
                  draggable={false}
                />
                <StoryProgress activeIndex={phone.activeSegment} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
