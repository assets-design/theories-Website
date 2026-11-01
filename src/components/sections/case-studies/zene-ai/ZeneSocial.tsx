"use client";

import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/** Instagram reel caption. */
const INSTAGRAM_CAPTION = {
  handle: "zene_ai",
  lines: [
    "Learning that feels human. Powered by AI.",
    "Zene AI — curiosity today, confidence tomorrow.",
  ],
} as const;

/**
 * Reel stills — Figma VIDEO fills on `2354:1091` / `2354:1101` / `2354:1111`.
 * MCP only yielded still PNG exports (no mp4).
 */
const instagramReels = [
  {
    src: "/images/case-studies/zene-ai/reel-1.png",
    label: "Zene AI Instagram reel — dark brand field",
  },
  {
    src: "/images/case-studies/zene-ai/reel-2.png",
    label: "Zene AI Instagram reel — robot mascot creative",
  },
  {
    src: "/images/case-studies/zene-ai/reel-3.png",
    label: "Zene AI Instagram reel — brand mark",
  },
] as const;

const composites = [
  {
    src: "/images/case-studies/zene-ai/social-fan-clean.png",
    alt: "Zene AI Instagram posts fanned around a phone mockup",
    aspect: "1680/979",
  },
  {
    src: "/images/case-studies/zene-ai/social-feed-clean.png",
    alt: "Zene AI Instagram feed mockups — four creatives",
    aspect: "1680/511",
  },
  {
    src: "/images/case-studies/zene-ai/social-journey-clean.png",
    alt: "Zene AI story phone with carousel journey panels",
    aspect: "1671/678",
  },
  {
    src: "/images/case-studies/zene-ai/social-campaign-clean.png",
    alt: "Zene AI campaign phone with carousel creatives",
    aspect: "1679/850",
  },
  {
    src: "/images/case-studies/zene-ai/social-overlap-clean.png",
    alt: "Zene AI overlapping Instagram story phone mockups",
    aspect: "1701/755",
  },
  {
    src: "/images/case-studies/zene-ai/social-grid-clean.png",
    alt: "Zene AI story phone with benefit grid creatives",
    aspect: "1679/864",
  },
] as const;

function InstagramReelCard({ src, label }: { src: string; label: string }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[400/694] w-full overflow-hidden rounded-[36px]">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 1023px) 90vw, 28vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mt-[clamp(0.75rem,0.94vw,1.125rem)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="relative size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/case-studies/zene-ai/avatar.png"
                alt=""
                fill
                sizes="53px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <p className="truncate font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black">
              {INSTAGRAM_CAPTION.handle}
            </p>
          </div>
          <span className="shrink-0 rounded-[7px] border border-black/40 px-3 py-1 font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
            Follow
          </span>
        </div>
        <div className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
          {INSTAGRAM_CAPTION.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Social Media For Zene AI — Figma `2354:1259` + groups `2364:524`–`2354:1264`
 * Group exports at scale 2 from Figma (natural alpha).
 * Heading matches Figma `.characters` (Lohitha placeholder).
 */
export function ZeneSocial() {
  return (
    <section aria-label="Social media for Zene AI" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Social Media For Zene AI
          </h2>
        </FadeUp>

        {composites.map((item, index) => (
          <FadeUp key={item.src} delay={60 + index * 40}>
            <div
              className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] w-full"
              style={{ aspectRatio: item.aspect }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 size-full object-contain object-center"
                draggable={false}
              />
            </div>
          </FadeUp>
        ))}

        {/* Instagram reels — Figma `2354:1264`; VIDEO fills → still PNG exports */}
        <div className="mt-[clamp(2rem,4.17vw,5rem)] grid gap-[clamp(1.5rem,3.125vw,3.75rem)] sm:grid-cols-2 lg:grid-cols-3">
          {instagramReels.map((reel, index) => (
            <FadeUp key={reel.src} delay={index * 60}>
              <InstagramReelCard {...reel} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
