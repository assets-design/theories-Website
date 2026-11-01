"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

function AssetImage({
  src,
  alt,
  aspect,
  className = "",
  rounded,
  sizes = "(max-width: 1023px) 90vw, 28vw",
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
  rounded?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${rounded ?? ""} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center"
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
              className={`rounded-full transition-[width,height,background-color,opacity] motion-safe:duration-200 ${isActive ? "size-2.5 bg-black" : "size-2 bg-black/40 hover:bg-black/60"
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function InstagramReelCard({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[400/694] w-full overflow-hidden rounded-[36px]">
        <video
          src={src}
          poster={poster}
          aria-label={label}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover object-center"
        />
      </div>
      <div className="mt-[clamp(0.75rem,0.94vw,1.125rem)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="relative size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/case-studies/lohitha/instagram-avatar.png"
                alt=""
                fill
                sizes="53px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black">
              lohitha.foods
            </p>
          </div>
          <span className="shrink-0 rounded-[7px] border border-black/40 px-3 py-1 font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
            Follow
          </span>
        </div>
        <div className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
          <p>From farms to families, 2025 was a year of real impact.</p>
          <p>Thank you for choosing Lohitha. In 2026, we grow stronger.</p>
        </div>
      </div>
    </article>
  );
}

const feedPosts = [
  {
    src: "/images/case-studies/lohitha/social1.png",
    alt: "Lohitha social post — soft fluffy idlis tip",
  },
  {
    src: "/images/case-studies/lohitha/social2.png",
    alt: "Lohitha social post — Freedom Tastes Better",
  },
  {
    src: "/images/case-studies/lohitha/social3.png",
    alt: "Lohitha social post — Nutri Rice nutritional values",
  },
  {
    src: "/images/case-studies/lohitha/social4.png",
    alt: "Lohitha social post — Every Grain Has a Story",
  },
] as const;

const fortifiedPanels = [
  { src: "/images/case-studies/lohitha/fortified-panel-1.png", alt: "Lohitha Nutri Rice journey panel 1" },
  { src: "/images/case-studies/lohitha/fortified-panel-2.png", alt: "Lohitha Nutri Rice journey panel 2" },
  { src: "/images/case-studies/lohitha/fortified-panel-3.png", alt: "Lohitha Nutri Rice journey panel 3" },
  { src: "/images/case-studies/lohitha/fortified-panel-4.png", alt: "Lohitha Nutri Rice journey panel 4" },
] as const;

const idlyPosts = [
  { src: "/images/case-studies/lohitha/idly-1.png", alt: "Idly & Sambar carousel slide 1" },
  { src: "/images/case-studies/lohitha/idly-2.png", alt: "Idly & Sambar carousel slide 2" },
  { src: "/images/case-studies/lohitha/idly-3.png", alt: "Idly & Sambar carousel slide 3" },
  { src: "/images/case-studies/lohitha/idly-4.png", alt: "Idly & Sambar carousel slide 4" },
  { src: "/images/case-studies/lohitha/idly-5.png", alt: "Idly & Sambar carousel slide 5" },
] as const;

/**
 * Vertical Christmas stories — Figma 2195:529 (1680×804).
 * Per-item sizes from metadata (not uniform height):
 *   2101:517 Santa card  395×693 @ (0, 56)     — no phone frame
 *   2131:641 Oil phone   374×804 @ (435, 0)
 *   2101:509 Nutri phone 392×803 @ (859, 1)
 *   2131:644 Atta phone  388×804 @ (1292, 0)
 * Gaps: 40 / 50 / 41 px (uneven by design).
 */
const verticalPhones: {
  src: string;
  alt: string;
  left: string;
  top: string;
  width: string;
  height: string;
  /** Santa card only — Figma 2101:517 has rounded corners + soft shadow */
  rounded?: string;
  shadow?: string;
}[] = [
    {
      src: "/images/case-studies/lohitha/vertical-phone-2-clean.png",
      alt: "Christmas story — Santa secret intro",
      left: "0%",
      top: "10%",
      width: "23.51%",
      height: "80%",
      rounded: "rounded-[26px]",
      shadow: "shadow-[0px_0px_6.3px_0px_rgba(0,0,0,0.25)]",
    },
    {
      // Oil / Nutri / Atta — Figma source PNGs as-is (transparent outside phone frame)
      src: "/images/case-studies/lohitha/vertical-phone-3-clean.png",
      alt: "Christmas story — Rice Bran Oil reveal",
      left: "25.89%",
      top: "0%",
      width: "22.26%",
      height: "100%",
    },
    {
      src: "/images/case-studies/lohitha/vertical-phone-1-clean.png",
      alt: "Christmas story — Nutri Rice reveal",
      left: "51.13%",
      top: "0%",
      width: "23.33%",
      height: "100%",
    },
    {
      src: "/images/case-studies/lohitha/vertical-phone-4-clean.png",
      alt: "Christmas story — Atta reveal",
      left: "76.90%",
      top: "0%",
      width: "23.10%",
      height: "100%",
    },
  ];

/**
 * Overlap fan — positions relative to group 1592×881 (Figma 2118:601).
 * PNGs are transparent outside the phone — no CSS box-shadow on the
 * rectangular wrappers (shadows would paint the full AABB and show through).
 */
const overlapPhones = [
  {
    src: "/images/case-studies/lohitha/overlap-phone-1-clean.png",
    alt: "Instagram feed mockup — Beyond Rice",
    className: "left-0 top-[16.55%] z-10 w-[34.61%]",
    aspect: "551/735",
  },
  {
    src: "/images/case-studies/lohitha/overlap-phone-2-clean.png",
    alt: "Instagram feed mockup — Idly Ravva",
    className: "left-[23.43%] top-[13.94%] z-20 w-[34.61%]",
    aspect: "551/689",
  },
  {
    src: "/images/case-studies/lohitha/overlap-phone-3-clean.png",
    alt: "Instagram feed mockup — Rice Bran Oil",
    className: "left-[43.53%] top-[8.83%] z-30 w-[34.61%] -rotate-[3.22deg]",
    aspect: "551/735",
  },
  {
    src: "/images/case-studies/lohitha/overlap-phone-4-clean.png",
    alt: "Instagram feed mockup — Trusted Essentials",
    className: "left-[65.3%] top-0 z-40 w-[30.83%] -rotate-[5.09deg]",
    aspect: "491/717",
  },
] as const;

type DailyPost = {
  src: string;
  alt: string;
  left: string;
  top: string;
  width: string;
  aspect: string;
  rounded?: string;
};

/** Daily specials — positions relative to Figma rows 2195:530 / 2195:531 */
const dailyTop: DailyPost[] = [
  { src: "/images/case-studies/lohitha/daily-1.png", alt: "Breakfast menu intro", left: "0.06%", top: "4.37%", width: "21.73%", aspect: "365/645", rounded: "rounded-[30px]" },
  { src: "/images/case-studies/lohitha/daily-2.png", alt: "Monday Idly Rava Upma", left: "26.49%", top: "4.37%", width: "21.73%", aspect: "365/644", rounded: "rounded-[30px]" },
  { src: "/images/case-studies/lohitha/daily-3.png", alt: "Tuesday Lemon Rice phone", left: "52.98%", top: "0%", width: "20.54%", aspect: "345/732" },
  { src: "/images/case-studies/lohitha/daily-4.png", alt: "Wednesday Soft Wheat Dosas", left: "78.27%", top: "4.37%", width: "21.73%", aspect: "365/645", rounded: "rounded-[30px]" },
];

const dailyBottom: DailyPost[] = [
  { src: "/images/case-studies/lohitha/daily-5.png", alt: "Thursday Vegetable Pongal phone", left: "0%", top: "0%", width: "21.01%", aspect: "353/732" },
  { src: "/images/case-studies/lohitha/daily-6.png", alt: "Friday Stuffed Parathas", left: "26.55%", top: "5.87%", width: "21.73%", aspect: "365/645", rounded: "rounded-[30px]" },
  { src: "/images/case-studies/lohitha/daily-7.png", alt: "Saturday Rava Idli", left: "52.98%", top: "5.87%", width: "21.73%", aspect: "365/645", rounded: "rounded-[30px]" },
  { src: "/images/case-studies/lohitha/daily-8.png", alt: "Which one will you try first", left: "78.27%", top: "5.87%", width: "21.73%", aspect: "365/645", rounded: "rounded-[30px]" },
];

const attaGrid = [
  { src: "/images/case-studies/lohitha/atta-grid-1.png", alt: "Atta benefit — keeps you full" },
  { src: "/images/case-studies/lohitha/atta-grid-2.png", alt: "Atta benefit — lowers cholesterol" },
  { src: "/images/case-studies/lohitha/atta-grid-3.png", alt: "Atta benefit — essential nutrients" },
  { src: "/images/case-studies/lohitha/atta-grid-4.png", alt: "Atta CTA — choose Lohitha" },
] as const;

const instagramReels = [
  {
    src: "/videos/lohitha/story-1.mp4",
    poster: "/images/case-studies/lohitha/reel-1.png",
    label: "Lohitha Instagram reel — brand mark on green",
  },
  {
    src: "/videos/lohitha/story-2.mp4",
    poster: "/images/case-studies/lohitha/reel-2.png",
    label: "Lohitha Instagram reel — roti planet nutrient creative",
  },
  {
    src: "/videos/lohitha/story-3.mp4",
    poster: "/images/case-studies/lohitha/reel-3.png",
    label: "Lohitha Instagram reel — brand mark on black",
  },
] as const;

/**
 * Social Media For Lohitha — Figma `2195:533` (heading+fan+feed) onward.
 * Hero fan positions are % of group `2195:527` using rotated AABBs.
 */
export function LohithaSocial() {
  const mobileItems = [
    ...feedPosts.map((post) => {
      const p = post as { src: string; alt: string; overlay?: string; overlayAlt?: string };
      return {
        key: post.src,
        node: (
          <div className="relative">
            <AssetImage src={post.src} alt={post.alt} aspect="399/512" />
            {p.overlay ? (
              <div className="pointer-events-none absolute inset-[10.35%_0_0_0]">
                <AssetImage
                  src={p.overlay}
                  alt={p.overlayAlt ?? ""}
                  aspect="399/415"
                  className="shadow-none"
                />
              </div>
            ) : null}
          </div>
        ),
      };
    }),
    ...instagramReels.map((reel) => ({
      key: reel.src,
      node: (
        <div className="relative aspect-[400/694] w-full overflow-hidden rounded-[36px]">
          <video
            src={reel.src}
            poster={reel.poster}
            aria-label={reel.label}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover object-center"
          />
        </div>
      ),
    })),
  ];

  return (
    <section aria-label="Social media for Lohitha" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        {/*
          Heading + phone fan — Figma 2195:527 (1677.59×1080.65) inside 2195:533.
          Phone tops use rotated AABB from design_context (not unrotated metadata y):
          heading bottom y=1352 → center phone AABB top y=1359.48 → ~7.5px gap.
        */}
        <div className="relative z-10 w-full lg:aspect-[1678/1081] lg:overflow-visible">
          <FadeUp className="lg:absolute lg:left-0 lg:top-0 lg:z-10">
            <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Social Media For Lohitha
            </h2>
          </FadeUp>

          {/* Phone fan — Figma 2048:1165 / 1169 / 1171, rotate −29.71° */}
          <FadeUp delay={40} className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block">
            {/* Left AABB — top 1645 → 34.15% of 2195:527 */}
            <div className="absolute left-[0.72%] top-[34.15%] flex h-[65.85%] w-[39.66%] items-center justify-center">
              <div className="relative aspect-[443/567] w-[66.52%] -rotate-[29.71deg] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/case-studies/lohitha/phone-mockup-left1.png"
                  alt="Lohitha Instagram post — Idly Ravva"
                  fill
                  sizes="26vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Center AABB — top 1359.48 → 7.73% of 2195:527 */}
            <div className="absolute left-[26.18%] top-[7.73%] flex h-[90.35%] w-[48.68%] items-center justify-center">
              <div className="relative aspect-[443/871] w-[54.26%] -rotate-[29.71deg]">
                <Image
                  src="/images/case-studies/lohitha/phone-mockup-center1.png"
                  alt="Lohitha Instagram profile on phone"
                  fill
                  sizes="28vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Right AABB — top 1340.42 → 5.96% of 2195:527 */}
            <div className="absolute left-[60.71%] top-[5.96%] flex h-[65.28%] w-[39.29%] items-center justify-center">
              <div className="relative aspect-[438/562] w-[66.46%] -rotate-[29.71deg] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/case-studies/lohitha/phone-mockup-right1.png"
                  alt="Lohitha Instagram post — Truth About Your Rice"
                  fill
                  sizes="26vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Feed row — Figma 2112:555–2118:584; ~58px below group 2195:527 */}
        <div className="relative z-0 mt-[clamp(1.5rem,3.02vw,3.625rem)] hidden gap-[clamp(1rem,1.51vw,1.8125rem)] lg:grid lg:grid-cols-4">
          {feedPosts.map((post, index) => {
            const p = post as { src: string; alt: string; overlay?: string; overlayAlt?: string };
            return (
              <FadeUp key={post.src} delay={index * 50}>
                <div className="relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                  <AssetImage src={post.src} alt={post.alt} aspect="399/512" />
                  {p.overlay ? (
                    <div className="pointer-events-none absolute left-0 top-[10.35%] w-full">
                      <AssetImage
                        src={p.overlay}
                        alt={p.overlayAlt ?? ""}
                        aspect="399/415"
                        className="shadow-none"
                      />
                    </div>
                  ) : null}
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Fortified rice — Figma 2112:556 (363 phone + 4×320 panels flush, top-offset 157) */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/714] w-full lg:block">
          <FadeUp className="absolute left-0 top-0 z-10 w-[21.62%]">
            <AssetImage
              src="/images/case-studies/lohitha/fortified-phone1.png"
              alt="Lohitha fortified rice Instagram story on phone"
              aspect="363/714"
            />
          </FadeUp>
          {/* Panels abut flush (320 step); -1px overlap kills subpixel seams. */}
          {fortifiedPanels.map((panel, index) => {
            const left = ((363 + index * 320) / 1679) * 100;
            return (
              <FadeUp
                key={panel.src}
                delay={40 + index * 40}
                className="absolute top-[21.99%] z-0 w-[19.06%]"
                style={{
                  left: `${left}%`,
                  marginLeft: index > 0 ? "-1px" : undefined,
                  width: index > 0 ? "calc(19.06% + 1px)" : undefined,
                }}
              >
                <AssetImage src={panel.src} alt={panel.alt} aspect="320/399" />
              </FadeUp>
            );
          })}
        </div>

        {/* Christmas phone + Idly row — Figma 2115:577 (~5.5px card gaps; phone behind cards) */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/937] w-full lg:block">
          {/* Phone AABB 2115:563 — centered, behind carousel tiles */}
          <FadeUp className="pointer-events-none absolute left-[50%] top-0 z-0 flex h-full w-[45.91%] -translate-x-1/2 items-center justify-center">
            <div className="relative aspect-[420/838] w-[54.5%] rotate-[28.69deg]">
              <Image
                src="/images/case-studies/lohitha/christmas-phone.png"
                alt="Lohitha Christmas campaign on phone"
                fill
                sizes="22vw"
                className="object-cover"
              />
            </div>
          </FadeUp>
          {/* Cards — Figma 2115:576; shifted -50px up on desktop */}
          <div className="absolute bottom-[45px] left-0 z-10 grid w-full grid-cols-5 gap-[clamp(0.25rem,0.286vw,0.344rem)]">
            {idlyPosts.map((post, index) => (
              <FadeUp key={post.src} delay={index * 35}>
                <AssetImage src={post.src} alt={post.alt} aspect="332/415" />
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Vertical Christmas stories — Figma 2195:529 (1680×804; per-item heights).
            Phone PNGs used as-is (transparent outside frame) — no bg/crop/filters. */}
        <FadeUp delay={50}>
          <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1680/804] w-full lg:block">
            {verticalPhones.map((phone) => (
              <div
                key={phone.src}
                className={`absolute ${phone.shadow ?? ""} ${phone.rounded ?? ""}`}
                style={{
                  left: phone.left,
                  top: phone.top,
                  width: phone.width,
                  height: phone.height,
                }}
              >
                <Image
                  src={phone.src}
                  alt={phone.alt}
                  fill
                  sizes="(max-width: 1023px) 90vw, 24vw"
                  className={`object-cover object-center ${phone.rounded ?? ""}`}
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Overlapping phone fan — Figma 2118:601.
            Phone PNGs as-is (transparent outside frame) — no overflow-hidden,
            no bg, no rectangular box-shadow. */}
        <FadeUp delay={60}>
          <div className="relative mx-auto mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1592/881] w-[94.76%] overflow-visible lg:block">
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
                  className="absolute inset-0 size-full object-cover object-center"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Daily specials row 1 — Figma 2195:530 */}
        <FadeUp delay={70}>
          <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/732] w-full lg:block">
            {dailyTop.map((post) => (
              <div
                key={post.src}
                className="absolute"
                style={{ left: post.left, top: post.top, width: post.width }}
              >
                <AssetImage
                  src={post.src}
                  alt={post.alt}
                  aspect={post.aspect}
                  rounded={post.rounded}
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Daily specials row 2 — Figma 2195:531 */}
        <FadeUp delay={80}>
          <div className="relative mt-[clamp(0.5rem,0.52vw,0.625rem)] hidden aspect-[1680/732] w-full lg:block">
            {dailyBottom.map((post) => (
              <div
                key={post.src}
                className="absolute"
                style={{ left: post.left, top: post.top, width: post.width }}
              >
                <AssetImage
                  src={post.src}
                  alt={post.alt}
                  aspect={post.aspect}
                  rounded={post.rounded}
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Pair phones — Figma 2118:606, centered within 980×835.
            Figma image fills as-is (transparent outside phone) — no bg,
            no overflow-hidden, no rectangular box-shadow. Native <img>
            preserves PNG alpha without Next/Image wrapper spans. */}
        <FadeUp delay={90}>
          <div className="relative mx-auto mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[980/835] w-[58.35%] overflow-visible lg:block">
            <div className="absolute left-0 top-[13.03%] z-10 flex h-[86.4%] w-[49.3%] items-center justify-center">
              <div className="relative aspect-[390/672] w-[80.72%] -rotate-[8.32deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/lohitha/pair-phone-left-clean.png"
                  alt="Lohitha phone — Our every pack has a promise"
                  className="absolute inset-0 size-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
            <div className="absolute left-[28.05%] top-0 z-20 flex h-full w-[71.95%] items-center justify-center">
              <div className="relative aspect-[473/709] w-[67.04%] rotate-[22.15deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/lohitha/pair-phone-right-clean.png"
                  alt="Lohitha phone — Every grain has a story"
                  className="absolute inset-0 size-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Atta campaign — Figma 2131:708 */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/864] w-full lg:block">
          <FadeUp className="absolute left-0 top-[34.26%] w-[24.06%]">
            <AssetImage
              src="/images/case-studies/lohitha/atta-main.png"
              alt="Lohitha Whole Wheat Atta — high in fiber"
              aspect="404/505"
            />
          </FadeUp>
          {/* Center phone — Figma 2131:704; PNG transparent outside rounded frame.
              No rectangular box-shadow / overflow-hidden (they paint a white AABB). */}
          <FadeUp delay={50} className="absolute left-[27.81%] top-0 w-[27.16%]">
            <div className="relative aspect-[456/744] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/case-studies/lohitha/atta-center-clean.png"
                alt="Lohitha Whole Wheat Atta phone mockup"
                className="absolute inset-0 size-full object-cover object-center"
                draggable={false}
              />
            </div>
          </FadeUp>
          <FadeUp delay={100} className="absolute left-[58.73%] top-0 w-[41.27%]">
            <div className="grid grid-cols-2 gap-[clamp(0.75rem,1.07vw,1.29rem)]">
              {attaGrid.map((item) => (
                <AssetImage
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  aspect="335/420"
                />
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Instagram reels — Figma 2131:660 */}
        <div className="mt-[clamp(2rem,4.17vw,5rem)] hidden gap-[clamp(1.5rem,8.4375vw,10.125rem)] lg:grid lg:grid-cols-3">
          {instagramReels.map((reel, index) => (
            <FadeUp key={reel.src} delay={index * 50}>
              <InstagramReelCard {...reel} />
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)]">
            <HorizontalCarousel
              ariaLabel="Social media pagination"
              items={mobileItems}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
