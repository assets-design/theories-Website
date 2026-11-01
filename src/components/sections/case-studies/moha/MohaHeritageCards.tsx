"use client";

import { FadeUp } from "@/components/motion/FadeUp";

const CAPTION = {
  handle: "moha_weaves",
  lines: [
    "Heritage woven into every silhouette.",
    "MOHA — timeless craft, modern ease.",
  ],
} as const;

const heritageCards = [
  {
    src: "/videos/moha/heritage-card-left.mp4",
    poster: "/images/case-studies/moha/heritage-card-left.png",
    alt: "MoHa heritage — deep burgundy textured card",
  },
  {
    src: "/videos/moha/heritage-card-center.mp4",
    poster: "/images/case-studies/moha/heritage-card-center.png",
    alt: "MoHa heritage — two women in silk sarees by the water",
  },
  {
    src: "/videos/moha/heritage-card-right.mp4",
    poster: "/images/case-studies/moha/heritage-card-right.png",
    alt: "MoHa heritage — deep burgundy textured card",
  },
] as const;

/** Flood-cleared AABB; original Figma export baked opaque black letterboxing. */
const BRAND_ICON = "/images/case-studies/moha/heritage-brand-icon-clean.png";

function HeritageColumn({
  src,
  poster,
  alt,
  delay,
}: {
  src: string;
  poster: string;
  alt: string;
  delay: number;
}) {
  return (
    <FadeUp delay={delay} className="flex w-full shrink-0 flex-col">
      {/* Card — Figma 2239:771/781/791: 398.5×694, rounded 36px */}
      <div
        className="relative w-full overflow-hidden rounded-[clamp(1rem,1.875vw,2.25rem)]"
        style={{ aspectRatio: "398.5/694" }}
      >
        <video
          src={src}
          poster={poster}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover object-center"
        />
      </div>

      {/*
        Caption row — Figma 2250:525/526/527:
        icon 52.89×53 @ 15px below card; handle Poppins Medium 22px;
        Follow 81.83×28 border black/40; body Poppins Regular 16px.
      */}
      <div className="mt-[clamp(0.5rem,0.781vw,0.9375rem)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_ICON}
                alt=""
                aria-hidden
                className="size-full object-contain"
                draggable={false}
              />
            </div>
            <p className="truncate font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black">
              {CAPTION.handle}
            </p>
          </div>
          <span className="shrink-0 rounded-[7px] border border-black/40 px-3 py-1 font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
            Follow
          </span>
        </div>
        <div className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
          {CAPTION.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

/**
 * Heritage card trio — Figma `2250:535` (1920×1125; section bg white).
 * Row `2250:531`: 3×398.5×694 video cards, 36px radius, ~208px gaps;
 * brand icon + Instagram caption under each card.
 */
export function MohaHeritageCards() {
  return (
    <section aria-label="MoHa heritage silk" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,3.125vw,3.75rem)] pb-[clamp(4rem,15.78vw,18.9375rem)]">
        {/* Desktop — 3-column row; Figma gap ≈207.5px @ 1920 */}
        <div className="hidden justify-center gap-[clamp(1rem,10.81vw,12.875rem)] lg:flex">
          {heritageCards.map((card, index) => (
            <div
              key={card.src}
              className="w-[clamp(12rem,20.79vw,24.95rem)]"
            >
              <HeritageColumn
                src={card.src}
                poster={card.poster}
                alt={card.alt}
                delay={index * 40}
              />
            </div>
          ))}
        </div>

        {/* Mobile — horizontal snap scroll */}
        <div
          className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {heritageCards.map((card, index) => (
            <div
              key={card.src}
              className="w-[min(78vw,18rem)] shrink-0 snap-start sm:w-[min(70vw,20rem)]"
            >
              <HeritageColumn
                src={card.src}
                poster={card.poster}
                alt={card.alt}
                delay={index * 40}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
