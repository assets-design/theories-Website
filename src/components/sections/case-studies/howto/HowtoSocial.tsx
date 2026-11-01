"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * How To social media — Figma `2267:539` (white block).
 * Fan positions use rotated AABBs from get_design_context (not unrotated metadata y).
 * Phone/card PNGs: flood-cleared alpha outside silhouettes — native <img>, no box-shadow wrappers.
 */

const CAPTION_LINES = [
  "Clarity before growth. Always.",
  "How To — frameworks that turn confusion into action.",
] as const;

const insightPosts = [
  {
    src: "/images/case-studies/howto/social-insight-1-clean.png",
    alt: "howTo. Instagram post — See Better. Do Better.",
  },
  {
    src: "/images/case-studies/howto/social-insight-2-clean.png",
    alt: "howTo. Instagram post — A shift in perspective turns patterns into progress",
  },
  {
    src: "/images/case-studies/howto/social-insight-3-clean.png",
    alt: "howTo. Instagram post — Because clarity always precedes growth",
  },
  {
    src: "/images/case-studies/howto/social-insight-4-clean.png",
    alt: "howTo. Instagram post — We reframe business challenges into strategic clarity",
  },
] as const;

const strategyPanels = [
  {
    src: "/images/case-studies/howto/social-strategy-1.png",
    alt: "Strategy creative — question mark",
  },
  {
    src: "/images/case-studies/howto/social-strategy-2.png",
    alt: "Strategy creative — question mark becoming lightbulb",
  },
  {
    src: "/images/case-studies/howto/social-strategy-3.png",
    alt: "Strategy creative — lightbulb forming",
  },
  {
    src: "/images/case-studies/howto/social-strategy-4.png",
    alt: "Strategy creative — glowing lightbulb",
  },
] as const;

const overlapCards = [
  {
    src: "/images/case-studies/howto/social-overlap-1.png",
    alt: "howTo. carousel — Business mistakes that kill momentum",
  },
  {
    src: "/images/case-studies/howto/social-overlap-2.png",
    alt: "howTo. carousel — Chasing every trend; real growth comes from strategy",
  },
  {
    src: "/images/case-studies/howto/social-overlap-3.png",
    alt: "howTo. carousel — Talking more, saying less; clarity cuts through the noise",
  },
  {
    src: "/images/case-studies/howto/social-overlap-4.png",
    alt: "howTo. carousel — Building alone; momentum multiplies with the right partners",
  },
  {
    src: "/images/case-studies/howto/social-overlap-5.png",
    alt: "howTo. carousel — Where strategy meets clarity; and clarity creates momentum",
  },
] as const;

const mythPhones = [
  {
    src: "/images/case-studies/howto/social-myth-1-clean.png",
    alt: "howTo. story — Myth: Growth is merely luck",
  },
  {
    src: "/images/case-studies/howto/social-myth-2-clean.png",
    alt: "howTo. story — Reality: Growth is about clarity",
  },
  {
    src: "/images/case-studies/howto/social-myth-3-clean.png",
    alt: "howTo. story — We deliver clarity",
  },
] as const;

/** Story media — Figma VIDEO fills on `2247:985` / `2247:994` / `2247:1003`. */
const storyCards = [
  {
    src: "/videos/howto/story-1.mp4",
    poster: "/images/case-studies/howto/social-story-media-1.png",
    alt: "howTo. Instagram story — blue gradient brand field",
  },
  {
    src: "/videos/howto/story-2.mp4",
    poster: "/images/case-studies/howto/social-story-media-2.png",
    alt: "howTo. Instagram story — fork in the path",
  },
  {
    src: "/videos/howto/story-3.mp4",
    poster: "/images/case-studies/howto/social-story-media-3.png",
    alt: "howTo. Instagram story — light flare",
  },
] as const;

function AssetImage({
  src,
  alt,
  aspect,
  className = "",
  rounded,
  sizes = "(max-width: 1023px) 90vw, 22vw",
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
              className={`rounded-full transition-[width,height,background-color,opacity] motion-safe:duration-200 ${
                isActive ? "size-2.5 bg-black" : "size-2 bg-black/40 hover:bg-black/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function StoryCaptionCard({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[399.17/694] w-full overflow-hidden rounded-[36px]">
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
      <div className="mt-[clamp(0.75rem,0.94vw,1.125rem)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="relative size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/case-studies/howto/instagram-avatar.png"
                alt=""
                fill
                sizes="53px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black">
              weknow.howto
            </p>
          </div>
          <span className="shrink-0 rounded-[7px] border border-black/40 px-3 py-1 font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
            Follow
          </span>
        </div>
        <div className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
          {CAPTION_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export function HowtoSocial() {
  const mobileItems = [
    ...insightPosts.map((post) => ({
      key: post.src,
      node: <AssetImage src={post.src} alt={post.alt} aspect="399.68/511.43" />,
    })),
    ...storyCards.map((card) => ({
      key: card.src,
      node: <StoryCaptionCard src={card.src} poster={card.poster} alt={card.alt} />,
    })),
  ];

  return (
    <section aria-label="Social media for How To" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)] lg:px-[clamp(1rem,6.875vw,16.25rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        {/*
          Heading + fan — white group y=5802; heading y=5882 (80px).
          Fan AABB box from design_context: 124×6038 → 1799.6×7062 (1675.6×1023.9).
          Heading→fan gap 156px within content aspect 1680×(76+156+1024)=1256.
        */}
        <div className="relative z-10 w-full lg:aspect-[1680/1256] lg:overflow-hidden">
          <FadeUp className="lg:absolute lg:left-0 lg:top-0 lg:z-10">
            <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Social Media For How To
            </h2>
          </FadeUp>

          {/* Fan group — rotated AABB % of 1675.61×1023.8 starting under heading */}
          <FadeUp
            delay={40}
            className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
          >
            {/* Inset fan stage so mockups stay inside header-aligned bounds */}
            <div
              className="absolute"
              style={{ left: "6.25%", top: "18.47%", height: "81.53%", width: "87.5%" }}
            >
              {/* Left card AABB — top 27.64% of fan */}
              <div className="absolute left-0 top-[27.64%] z-10 h-[62.7%] w-[35.84%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/howto/social-fan-left-clean.png"
                  alt="howTo. Instagram post — Happy Navaratri"
                  className="size-full object-contain object-center"
                  draggable={false}
                />
              </div>

              {/* Center phone AABB — fills fan height */}
              <div className="absolute left-[24.46%] top-0 z-20 h-full w-[50.48%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/howto/social-fan-center-clean.png"
                  alt="howTo. Instagram feed on phone — The right team changes everything"
                  className="size-full object-contain object-center"
                  draggable={false}
                />
              </div>

              {/* Right card AABB — top 11.33% of fan */}
              <div className="absolute left-[64.14%] top-[11.33%] z-10 h-[62.7%] w-[35.84%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/howto/social-fan-right-clean.png"
                  alt="howTo. Instagram post — Stuck"
                  className="size-full object-contain object-center"
                  draggable={false}
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Mobile fan — center phone only */}
        <FadeUp delay={40} className="mx-auto mt-[clamp(1.5rem,4vw,3rem)] max-w-[min(90vw,22rem)] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/howto/social-fan-center-clean.png"
            alt="howTo. Instagram feed on phone — The right team changes everything"
            className="h-auto w-full"
            draggable={false}
          />
        </FadeUp>

        {/* Strategy row — Figma 2247:924 (1680×716): phone 353×716 + 4×320 panels */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1680/716] w-full lg:block">
          <FadeUp className="absolute left-0 top-0 z-10 h-full w-[21.01%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/howto/social-strategy-phone-clean.png"
              alt="howTo. phone — Strategy turns questions into answers"
              className="size-full object-contain object-left-top"
              draggable={false}
            />
          </FadeUp>
          {strategyPanels.map((panel, index) => {
            const left = ((364 + index * 332) / 1680) * 100;
            return (
              <FadeUp
                key={panel.src}
                delay={40 + index * 40}
                className="absolute top-[21.93%] z-0 w-[19.05%]"
                style={{ left: `${left}%` }}
              >
                <AssetImage src={panel.src} alt={panel.alt} aspect="320/399" />
              </FadeUp>
            );
          })}
        </div>

        {/* Insight teasers — Figma 2247:968; gap ≈ 27px @ 1680 */}
        <div className="mt-[clamp(2rem,4.17vw,5rem)] hidden gap-[clamp(0.75rem,1.406vw,1.6875rem)] lg:grid lg:grid-cols-4">
          {insightPosts.map((post, index) => (
            <FadeUp key={post.src} delay={index * 40}>
              <div className="relative w-full" style={{ aspectRatio: "399.68/511.43" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.src}
                  alt={post.alt}
                  className="absolute inset-0 size-full object-contain object-center"
                  draggable={false}
                />
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Overlap phone + 5 cards — Figma 2247:979 (1679×1062).
            Phone centered on stage (was left 49.61% / looking right-biased);
            CSS rotate 28.69°. Cards @ top 46.97%. */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/1062] w-full overflow-hidden lg:block">
          <FadeUp className="pointer-events-none absolute left-1/2 top-0 z-0 flex h-full w-[53.7%] -translate-x-1/2 items-center justify-center">
            <div className="relative aspect-[941/1672] w-[57.8%] rotate-[28.69deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/case-studies/howto/social-overlap-phone-clean.png"
                alt="howTo. phone — Instagram carousel, business mistakes that kill momentum"
                className="absolute inset-0 size-full object-contain object-center"
                draggable={false}
              />
            </div>
          </FadeUp>
          <div className="absolute left-0 top-[46.97%] z-10 grid w-full grid-cols-5 gap-[0.31%]">
            {overlapCards.map((card, index) => (
              <FadeUp key={card.src} delay={index * 35}>
                <div className="relative w-full" style={{ aspectRatio: "1080/1350" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="absolute inset-0 size-full object-contain object-center"
                    draggable={false}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Myth / reality phones — Figma 2247:1013 (1261×651), centered */}
        <FadeUp delay={50}>
          <div className="relative mx-auto mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1261/651] w-[75.06%] lg:block">
            {mythPhones.map((phone, index) => {
              const lefts = ["0%", "35.21%", "69.94%"];
              const widths = ["30.45%", "29.98%", "30.05%"];
              return (
                <div
                  key={phone.src}
                  className="absolute top-0 h-full"
                  style={{ left: lefts[index], width: widths[index] }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={phone.src}
                    alt={phone.alt}
                    className="size-full object-contain object-center"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Stories + captions — Figma 2247:983 (1676.5×825); media VIDEO fills 2247:985/994/1003 */}
        <div className="mt-[clamp(2rem,4.17vw,5rem)] hidden gap-[clamp(1.5rem,8.7vw,10.45rem)] lg:grid lg:grid-cols-3">
          {storyCards.map((card, index) => (
            <FadeUp key={card.src} delay={index * 50}>
              <StoryCaptionCard src={card.src} poster={card.poster} alt={card.alt} />
            </FadeUp>
          ))}
        </div>

        <div className="mt-[clamp(1.5rem,4vw,3rem)] lg:hidden">
          <HorizontalCarousel items={mobileItems} ariaLabel="How To social media pagination" />
        </div>
        </div>
      </div>
    </section>
  );
}
