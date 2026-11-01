"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Overlapping phone feed row — Figma `2283:544` (1710×755 @ x=105).
 * Transparent phone PNGs — drop-shadow on img only, never box-shadow on wrappers.
 */
const feedPhones = [
  {
    src: "/images/case-studies/mahesh-agencies/social-feed-1-v2.png",
    alt: "Mahesh Agencies social feed phone — post 1",
    className: "left-0 top-0 z-10 w-[31.23%]",
  },
  {
    src: "/images/case-studies/mahesh-agencies/social-feed-2-v2.png",
    alt: "Mahesh Agencies social feed phone — post 2",
    className: "left-[22.92%] top-0 z-20 w-[31.23%]",
  },
  {
    src: "/images/case-studies/mahesh-agencies/social-feed-3-v2.png",
    alt: "Mahesh Agencies social feed phone — post 3",
    className: "left-[45.85%] top-0 z-30 w-[31.23%]",
  },
  {
    src: "/images/case-studies/mahesh-agencies/social-feed-4-v2.png",
    alt: "Mahesh Agencies social feed phone — post 4",
    className: "left-[68.77%] top-0 z-40 w-[31.23%]",
  },
] as const;

const FEED_DROP_SHADOW = "drop-shadow-[-30px_0px_4px_rgba(0,0,0,0.25)]";

export function MaheshSocialFeed() {
  return (
    <section aria-label="Mahesh Agencies social feed phones" className="bg-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pb-[clamp(2rem,4.17vw,5rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        <div className="relative mx-auto hidden aspect-[1710/755] w-full max-w-[clamp(40rem,89.06vw,106.875rem)] lg:block">
          {feedPhones.map((phone, index) => (
            <FadeUp
              key={phone.src}
              delay={index * 40}
              className={`absolute ${phone.className}`}
              style={{ aspectRatio: "534/755" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phone.src}
                alt={phone.alt}
                className={`absolute inset-0 size-full object-contain object-center ${FEED_DROP_SHADOW}`}
                draggable={false}
              />
            </FadeUp>
          ))}
        </div>

        <div
          className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {feedPhones.map((phone) => (
            <div key={phone.src} className="w-[70%] shrink-0 snap-start sm:w-[45%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phone.src}
                alt={phone.alt}
                className={`h-auto w-full ${FEED_DROP_SHADOW}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
