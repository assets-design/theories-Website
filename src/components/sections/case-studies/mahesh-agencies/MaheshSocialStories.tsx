"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/** Exact Figma caption text (`2263:1289` / `1298` / `1307`). */
const CAPTION = {
  handle: "maheshagencies",
  lines: [
    "Driven by trust. Built for the road ahead.",
    "Mahesh Agencies — your journey, our commitment.",
  ],
} as const;

const storyCards = [
  {
    src: "/videos/mahesh-agencies/story-1.mp4",
    poster: "/images/case-studies/mahesh-agencies/story-1-poster-v2.png",
    alt: "Mahesh Agencies Instagram reel — rainy city street",
  },
  {
    src: "/videos/mahesh-agencies/story-2.mp4",
    poster: "/images/case-studies/mahesh-agencies/story-2-poster-v2.png",
    alt: "Mahesh Agencies Instagram reel — SUV at night",
  },
  {
    src: "/videos/mahesh-agencies/story-3.mp4",
    poster: "/images/case-studies/mahesh-agencies/story-3-poster-v2.png",
    alt: "Mahesh Agencies Instagram reel — driver POV",
  },
] as const;

const AVATAR = "/images/case-studies/mahesh-agencies/instagram-avatar-v2.png";

function StoryColumn({
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
      {/* Card — Figma 2263:1285/1294/1303: ~399×694, rounded 36px; VIDEO fills */}
      <div
        className="relative w-full overflow-hidden rounded-[clamp(1rem,1.875vw,2.25rem)]"
        style={{ aspectRatio: "399/694" }}
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

      <div className="mt-[clamp(0.5rem,0.781vw,0.9375rem)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AVATAR}
                alt=""
                aria-hidden
                className="size-full object-cover"
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
 * Story / reel trio with captions — Figma `2283:549`.
 * VIDEO fills on `2263:1285` / `1294` / `1303`; caption copy exact from Figma.
 */
export function MaheshSocialStories() {
  return (
    <section aria-label="Mahesh Agencies Instagram stories" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(1rem,2vw,2.5rem)] pb-[clamp(3rem,6.25vw,7.5rem)]">
        {/* Desktop — 3 columns; Figma gaps ≈207px @ 1920 */}
        <div className="hidden justify-center gap-[clamp(1rem,10.81vw,12.875rem)] lg:flex">
          {storyCards.map((card, index) => (
            <div key={card.src} className="w-[clamp(12rem,20.79vw,24.95rem)]">
              <StoryColumn
                src={card.src}
                poster={card.poster}
                alt={card.alt}
                delay={index * 40}
              />
            </div>
          ))}
        </div>

        <div
          className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {storyCards.map((card, index) => (
            <div key={card.src} className="w-[78%] shrink-0 snap-start sm:w-[45%]">
              <StoryColumn
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
