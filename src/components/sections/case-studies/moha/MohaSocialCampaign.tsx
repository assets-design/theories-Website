"use client";

import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

const teaserPosts = [
  {
    src: "/images/case-studies/moha/social-campaign-teaser-1-clean.png",
    alt: "MoHa Instagram teaser — Soon, you'll hold centuries of heritage in your hands",
  },
  {
    src: "/images/case-studies/moha/social-campaign-teaser-2-clean.png",
    alt: "MoHa Instagram teaser — parrot brand mark",
  },
  {
    src: "/images/case-studies/moha/social-campaign-teaser-3-clean.png",
    alt: "MoHa Instagram teaser — A new chapter in silk is about to begin",
  },
  {
    src: "/images/case-studies/moha/social-campaign-teaser-4-clean.png",
    alt: "MoHa Instagram teaser — Embrace the goddess in you brand copy",
  },
] as const;

/** Soft shadow on transparent teaser PNGs — on img, not wrapper (avoids AABB box). */
const TEASER_DROP_SHADOW = "drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)]";

const campaignPortraits = [
  {
    src: "/images/case-studies/moha/social-campaign-portrait-1.png",
    alt: "MoHa campaign — girl in silver-grey silk saree",
    left: "21.667%",
    aspect: "320/399",
  },
  {
    src: "/images/case-studies/moha/social-campaign-portrait-2.png",
    alt: "MoHa campaign — girl in yellow and green silk saree",
    left: "41.429%",
    aspect: "320/398",
  },
  {
    src: "/images/case-studies/moha/social-campaign-portrait-3.png",
    alt: "MoHa campaign — girl in red silk saree",
    left: "61.19%",
    aspect: "320/399",
  },
  {
    src: "/images/case-studies/moha/social-campaign-portrait-4.png",
    alt: "MoHa campaign — girl in pink silk saree",
    left: "80.952%",
    aspect: "320/399",
  },
] as const;

function TeaserCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "399.68/511.43" }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 85vw, 22vw"
        className={`object-contain object-center ${TEASER_DROP_SHADOW}`}
      />
    </div>
  );
}

function PortraitTile({ src, alt, aspect }: { src: string; alt: string; aspect: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1023px) 70vw, 18vw" className="object-cover object-center" />
    </div>
  );
}

/**
 * Social campaign grid — Figma `2250:523` (1920×1340 white block).
 * Row 1 `2235:755`: 4× Instagram teasers (clean PNGs — Figma export baked opaque black AABB).
 * Row 2 `2250:521`: phone (Figma raw `2236:757` with native transparency — no CSS shadow) + 4×320 portraits;
 * 11px phone gap, 12px portrait gaps; portraits top-offset 146px (21.1% of 692 row height).
 */
export function MohaSocialCampaign() {
  return (
    <section aria-label="MoHa social media campaign" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        {/* Row 1 — teaser carousel exports; Figma gap 27px @ 1680 content width */}
        <div className="hidden gap-[clamp(0.75rem,1.406vw,1.6875rem)] lg:grid lg:grid-cols-4">
          {teaserPosts.map((post, index) => (
            <FadeUp key={post.src} delay={index * 40}>
              <TeaserCard src={post.src} alt={post.alt} />
            </FadeUp>
          ))}
        </div>

        {/* Row 2 — phone + goddess portraits */}
        <div className="relative mt-[clamp(2rem,5.498vw,6.598rem)] hidden aspect-[1680/692] w-full lg:block">
          <FadeUp className="absolute left-0 top-0 z-10 h-full w-[21.012%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/moha/social-campaign-phone.png"
              alt="MoHa Instagram feed on phone — Embrace the goddess in you"
              className="size-full object-contain object-left-top"
              draggable={false}
            />
          </FadeUp>
          {campaignPortraits.map((portrait, index) => (
            <FadeUp
              key={portrait.src}
              delay={40 + index * 40}
              className="absolute top-[21.1%] z-0 w-[19.048%]"
              style={{ left: portrait.left }}
            >
              <PortraitTile src={portrait.src} alt={portrait.alt} aspect={portrait.aspect} />
            </FadeUp>
          ))}
        </div>

        {/* Mobile — horizontal scroll rows */}
        <div className="mt-[clamp(1.5rem,4vw,3rem)] flex flex-col gap-[clamp(1.5rem,4vw,3rem)] lg:hidden">
          <div
            className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {teaserPosts.map((post) => (
              <div key={post.src} className="w-[85%] shrink-0 snap-start sm:w-[calc(100%/2.2)]">
                <TeaserCard src={post.src} alt={post.alt} />
              </div>
            ))}
          </div>
          <FadeUp>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/moha/social-campaign-phone.png"
              alt="MoHa Instagram feed on phone — Embrace the goddess in you"
              className="mx-auto h-auto w-full max-w-[min(90vw,14rem)]"
              draggable={false}
            />
          </FadeUp>
          <div
            className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {campaignPortraits.map((portrait) => (
              <div key={portrait.src} className="w-[70%] shrink-0 snap-start sm:w-[calc(100%/2.5)]">
                <PortraitTile src={portrait.src} alt={portrait.alt} aspect={portrait.aspect} />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
