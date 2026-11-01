"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const feedPosts = [
  {
    src: "/images/case-studies/safari-lodges/feed-1.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 1",
  },
  {
    src: "/images/case-studies/safari-lodges/feed-2.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 2",
  },
  {
    src: "/images/case-studies/safari-lodges/feed-3.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 3",
  },
  {
    src: "/images/case-studies/safari-lodges/feed-4.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 4",
  },
  {
    src: "/images/case-studies/safari-lodges/feed-5.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 5",
  },
] as const;

const journeyPanels = [
  {
    src: "/images/case-studies/safari-lodges/journey-1.png",
    alt: "Safari Lodges India journey panel 1",
  },
  {
    src: "/images/case-studies/safari-lodges/journey-2.png",
    alt: "Safari Lodges India journey panel 2",
  },
  {
    src: "/images/case-studies/safari-lodges/journey-3.png",
    alt: "Safari Lodges India journey panel 3",
  },
  {
    src: "/images/case-studies/safari-lodges/journey-4.png",
    alt: "Safari Lodges India journey panel 4",
  },
] as const;

const campaignPosts = [
  {
    src: "/images/case-studies/safari-lodges/campaign-1.png",
    alt: "Safari Lodges India campaign creative 1",
  },
  {
    src: "/images/case-studies/safari-lodges/campaign-2.png",
    alt: "Safari Lodges India campaign creative 2",
  },
  {
    src: "/images/case-studies/safari-lodges/campaign-3.png",
    alt: "Safari Lodges India campaign creative 3",
  },
  {
    src: "/images/case-studies/safari-lodges/campaign-4.png",
    alt: "Safari Lodges India campaign creative 4",
  },
  {
    src: "/images/case-studies/safari-lodges/campaign-5.png",
    alt: "Safari Lodges India campaign creative 5",
  },
] as const;

/**
 * Overlap fan — Figma 2162:513–2166:517 within 1680×755.
 * Figma effect: shadow −30px 0 4px rgba(0,0,0,0.25) → drop-shadow on <img>
 * (never box-shadow on transparent PNG wrappers).
 */
const OVERLAP_DROP_SHADOW =
  "drop-shadow-[-30px_0px_4px_rgba(0,0,0,0.25)]";

const overlapPhones = [
  {
    src: "/images/case-studies/safari-lodges/overlap-1-clean.png",
    alt: "Safari Lodges India phone mockup — feed layout 1",
    className: "left-[0.06%] top-0 z-10 w-[31.79%]",
    aspect: "534/755",
  },
  {
    src: "/images/case-studies/safari-lodges/overlap-2-clean.png",
    alt: "Safari Lodges India phone mockup — feed layout 2",
    className: "left-[22.8%] top-0 z-20 w-[31.79%]",
    aspect: "534/755",
  },
  {
    src: "/images/case-studies/safari-lodges/overlap-3-clean.png",
    alt: "Safari Lodges India phone mockup — feed layout 3",
    className: "left-[45.48%] top-0 z-30 w-[31.79%]",
    aspect: "534/754",
  },
  {
    src: "/images/case-studies/safari-lodges/overlap-4-clean.png",
    alt: "Safari Lodges India phone mockup — feed layout 4",
    className: "left-[68.21%] top-0 z-40 w-[31.79%]",
    aspect: "534/755",
  },
] as const;

/** Figma 2062:1271 / 2062:1272 — soft 4px drop on opaque Instagram cards */
const CARD_DROP_SHADOW = "drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)]";

/**
 * Instagram reel media — Figma `2166:521` / `531` / `541`.
 * get_design_context returned empty fills (typical of VIDEO); MCP download_assets
 * only yielded still PNG exports — used as image media (no mp4 available).
 */
const instagramReels = [
  {
    src: "/images/case-studies/safari-lodges/reel-1.png",
    label: "Safari Lodges India Instagram reel — forest canopy aerial",
  },
  {
    src: "/images/case-studies/safari-lodges/reel-2.png",
    label: "Safari Lodges India Instagram reel — brand graphic",
  },
  {
    src: "/images/case-studies/safari-lodges/reel-3.png",
    label: "Safari Lodges India Instagram reel — lodge at dusk",
  },
] as const;

/**
 * Rotated feed scatter — Figma `2321:509` (1628×1437 declared AABB @ −29.71°).
 * Visual extent is taller (~1624) because rotated child AABBs overflow the group
 * bounds — use 1628×1624 and percentages against that height.
 */
const feedScatter = [
  {
    key: "phone",
    src: "/images/case-studies/safari-lodges/phone-mockup-center-2-clean.png",
    alt: "Safari Lodges India Instagram story on phone — feed scatter center",
    className: "left-[22.91%] top-[20.81%] z-10 h-[51.34%] w-[42.56%]",
    innerAspect: "371/748",
    innerWidth: "w-[53.5%]",
  },
  {
    key: "feed-1",
    src: "/images/case-studies/safari-lodges/feed-1.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 1",
    className: "left-0 top-[35.19%] z-20 h-[36.79%] w-[34.53%]",
    innerAspect: "378/472",
    innerWidth: "w-[67.2%]",
  },
  {
    key: "feed-2",
    src: "/images/case-studies/safari-lodges/feed-2.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 2",
    className: "left-[49.32%] top-[11.54%] z-20 h-[36.84%] w-[34.56%]",
    innerAspect: "378/473",
    innerWidth: "w-[67.2%]",
  },
  {
    key: "feed-3",
    src: "/images/case-studies/safari-lodges/feed-3.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 3",
    className: "left-[17.26%] top-[63.24%] z-20 h-[36.76%] w-[34.48%]",
    innerAspect: "377/472",
    innerWidth: "w-[67.2%]",
  },
  {
    key: "feed-4",
    src: "/images/case-studies/safari-lodges/feed-4.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 4",
    className: "left-[48.21%] top-[63.24%] z-20 h-[36.76%] w-[34.48%]",
    innerAspect: "377/472",
    innerWidth: "w-[67.2%]",
  },
  {
    key: "feed-5",
    src: "/images/case-studies/safari-lodges/feed-5.png",
    alt: "Safari Lodges India social post — wilderness boutique creative 5",
    className: "left-[65.47%] top-[39.81%] z-20 h-[36.79%] w-[34.53%]",
    innerAspect: "378/472",
    innerWidth: "w-[67.2%]",
  },
] as const;

/** Exact Figma caption (leading “I” missing in source). */
const INSTAGRAM_CAPTION = {
  handle: "Safari Lodges India",
  lines: [
    "n the heart of the forest, the tiger remains wild.",
    "Unpredictable. Powerful. Free.",
    "Its presence reminds us that the forest does not exist for our entertainment. It is a living landscape governed by its own rhythms, relationships and rules.",
  ],
} as const;

function AssetImage({
  src,
  alt,
  aspect,
  className = "",
  rounded,
  shadow = true,
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
  rounded?: string;
  /** Rectangular box-shadow — only for opaque rectangular tiles, never transparent phones. */
  shadow?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${shadow ? "shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]" : ""} ${rounded ?? ""} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 90vw, 22vw"
        className="object-cover object-center"
      />
    </div>
  );
}

/**
 * Transparent phone / mockup PNG — native <img> preserves alpha without
 * Next/Image wrapper spans; no overflow-hidden / rectangular box-shadow.
 */
function TransparentMockup({
  src,
  alt,
  aspect,
  className = "",
  sizes = "(max-width: 1023px) 90vw, 26vw",
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        className="absolute inset-0 size-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}

function HorizontalCarousel({
  items,
  ariaLabel,
}: {
  items: { key: string; node: ReactNode }[];
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDist = Infinity;

    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const dist = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: slide.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="max-lg:-mr-4 lg:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-1 [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, i) => (
          <div
            key={item.key}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            {item.node}
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label={ariaLabel}
      >
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-[width,height,background-color,opacity] motion-safe:duration-200 ${
                isActive
                  ? "size-2.5 bg-black"
                  : "size-2 bg-black/40 hover:bg-black/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

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
                src="/images/case-studies/safari-lodges/instagram-avatar.png"
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
 * Social Media For Safari Lodges India — Figma `2062:1266`–`2170:550`
 * Figma heading still reads “lohitha”; kept exact to the layer text.
 */
export function SafariSocial() {
  const carouselItems = [
    ...feedPosts.map((post) => ({
      key: post.src,
      node: <AssetImage src={post.src} alt={post.alt} aspect="378/472" />,
    })),
    ...instagramReels.map((reel) => ({
      key: reel.src + "-reel",
      node: (
        <div className="relative aspect-[400/694] w-full overflow-hidden rounded-[36px]">
          <Image
            src={reel.src}
            alt={reel.label}
            fill
            sizes="90vw"
            className="object-cover object-center"
          />
        </div>
      ),
    })),
  ];

  return (
    <section
      aria-label="Social media for Safari Lodges India"
      className="bg-white text-black"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        {/*
          Heading + top phone fan — Figma 2062:1275 + 2321:508.
          Aspect 1680×1421 (heading y=1276 → left-card AABB bottom y≈2697).
          Transparent mockups: native <img>, no rectangular box-shadow.
        */}
        <div className="relative z-10 w-full lg:aspect-[1680/1421] lg:overflow-hidden">
          <FadeUp className="lg:absolute lg:left-0 lg:top-0 lg:z-10">
            <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Social Media For Safari Lodges India
            </h2>
          </FadeUp>

          <FadeUp
            delay={40}
            className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
          >
            {/* Left Instagram card — Figma 2062:1272 AABB + 4px drop-shadow */}
            <div className="absolute left-[1.37%] top-[49.91%] flex h-[50.05%] w-[39.59%] items-center justify-center">
              <div className="relative aspect-[443/566] w-[66.6%] -rotate-[29.71deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/safari-lodges/phone-mockup-left-clean.png"
                  alt="Safari Lodges India Instagram post — left mockup"
                  className={`absolute inset-0 size-full object-cover object-center ${CARD_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>
            </div>
            {/* Center phone — Figma 2149:714 AABB (no Figma shadow on this layer) */}
            <div className="absolute left-[24.76%] top-[25.27%] flex h-[68.33%] w-[48.03%] items-center justify-center">
              <div className="relative aspect-[432/871] w-[53.5%] -rotate-[29.71deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/safari-lodges/phone-mockup-center-clean.png"
                  alt="Safari Lodges India Instagram profile on phone — center mockup"
                  className="absolute inset-0 size-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
            {/* Right Instagram card — Figma 2062:1271 AABB + 4px drop-shadow */}
            <div className="absolute left-[59.52%] top-[25.48%] flex h-[49.63%] w-[39.22%] items-center justify-center">
              <div className="relative aspect-[438/562] w-[66.5%] -rotate-[29.71deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/safari-lodges/phone-mockup-right-clean.png"
                  alt="Safari Lodges India Instagram post — right mockup"
                  className={`absolute inset-0 size-full object-cover object-center ${CARD_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/*
          Feed scatter — Figma 2321:509: phone + 5 posts, all −29.71°.
          Aspect 1628×1624 covers true visual extent (rotated children overflow group h).
        */}
        <FadeUp delay={60}>
          <div className="relative z-0 mt-[clamp(1.5rem,3.02vw,3.625rem)] hidden aspect-[1628/1624] w-full overflow-visible lg:block">
            {feedScatter.map((item) => (
              <div
                key={item.key}
                className={`absolute flex items-center justify-center ${item.className}`}
              >
                <div
                  className={`relative -rotate-[29.71deg] ${item.innerWidth}`}
                  style={{ aspectRatio: item.innerAspect }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 size-full object-cover object-center"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Journey row — Figma 2149:760 / 2149:774; panels flush (320 step) */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1681/707] w-full lg:block">
          <FadeUp className="absolute left-0 top-0 z-10 w-[20.76%]">
            <TransparentMockup
              src="/images/case-studies/safari-lodges/journey-phone-clean.png"
              alt="Safari Lodges India Instagram story on phone"
              aspect="349/707"
            />
          </FadeUp>
          {journeyPanels.map((panel, index) => {
            const left = ((363 + index * 320) / 1681) * 100;
            return (
              <FadeUp
                key={panel.src}
                delay={40 + index * 40}
                className="absolute top-[21.78%] z-0 w-[19.04%]"
                style={{
                  left: `${left}%`,
                  marginLeft: index > 0 ? "-1px" : undefined,
                  width: index > 0 ? "calc(19.04% + 1px)" : undefined,
                }}
              >
                <AssetImage
                  src={panel.src}
                  alt={panel.alt}
                  aspect="320/399"
                  shadow={false}
                />
              </FadeUp>
            );
          })}
        </div>

        {/* Overlapping phone fan — Figma 2162:513–2166:517.
            Phone PNGs as-is (transparent outside frame) — no overflow-hidden,
            no bg, no rectangular box-shadow. */}
        <FadeUp delay={60}>
          <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1680/755] w-full overflow-visible lg:block">
            {overlapPhones.map((phone) => (
              <div
                key={phone.src}
                className={`absolute ${phone.className}`}
                style={{ aspectRatio: phone.aspect }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={phone.src}
                  alt={phone.alt}
                  className={`absolute inset-0 size-full object-cover object-center ${OVERLAP_DROP_SHADOW}`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Campaign phone + posts — Figma 2149:759.
            Phone behind cards (z-0); cards ~5.5px gaps like design. */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/1112] w-full overflow-hidden lg:block">
          <FadeUp className="pointer-events-none absolute left-1/2 top-0 z-0 flex h-full w-[54.26%] -translate-x-1/2 items-center justify-center">
            <div className="relative aspect-[492/998] w-[54%] rotate-[28.69deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/case-studies/safari-lodges/campaign-phone-clean.png"
                alt="Safari Lodges India campaign on phone"
                className="absolute inset-0 size-full object-cover object-center"
                draggable={false}
              />
            </div>
          </FadeUp>
          <div className="absolute bottom-0 left-0 z-10 grid w-full grid-cols-5 gap-[clamp(0.25rem,0.286vw,0.344rem)]">
            {campaignPosts.map((post, index) => (
              <FadeUp key={post.src} delay={index * 40}>
                <AssetImage src={post.src} alt={post.alt} aspect="332/415" />
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Instagram reels — Figma 2166:521–2166:549 */}
        <div className="mt-[clamp(2rem,4.17vw,5rem)] hidden gap-[clamp(1.5rem,3.125vw,3.75rem)] lg:grid lg:grid-cols-3">
          {instagramReels.map((reel, index) => (
            <FadeUp key={reel.src + index} delay={index * 60}>
              <InstagramReelCard {...reel} />
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)]">
            <HorizontalCarousel
              ariaLabel="Social media pagination"
              items={carouselItems}
            />
          </div>
        </FadeUp>
        </div>
      </div>
    </section>
  );
}
