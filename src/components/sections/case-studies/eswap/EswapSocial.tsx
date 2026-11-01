"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Social Media For Eswap — Figma `2349:805`.
 * Complex rotated / overlapping groups use Figma group composites at 2x (v3)
 * with gentle AABB black→alpha (fan, weekend, stranger, halloween, posts).
 * Reels: VIDEO fills on `2349:758` / `2349:768` / `2349:778` (group `2349:755`).
 * Caption copy matches Figma `.characters` (Lohitha placeholders).
 */

const FAN_DROP =
  "drop-shadow(-30px 0px 4px rgba(0,0,0,0.25))";

const REEL_CAPTION = {
  handle: "eswap.in",
  lines: [
    "Sold out? Not anymore.",
    "Eswap.in — resell tickets fast, buy with confidence.",
  ],
} as const;

const REEL_AVATAR = "/images/case-studies/eswap/social/reel-avatar.png";

/** Figma VIDEO fills — hashes verified against downloaded mp4 SHA1. */
const reelCards = [
  {
    src: "/videos/eswap/reel-1.mp4",
    poster: "/images/case-studies/eswap/social/reel-1.png",
    alt: "Eswap Instagram reel — Vibe to Catch",
  },
  {
    src: "/videos/eswap/reel-2.mp4",
    poster: "/images/case-studies/eswap/social/reel-2.png",
    alt: "Eswap Instagram reel — brand mark",
  },
  {
    src: "/videos/eswap/reel-3.mp4",
    poster: "/images/case-studies/eswap/social/reel-3.png",
    alt: "Eswap Instagram reel — group photo",
  },
] as const;

function Composite({
  src,
  alt,
  aspect,
  className = "",
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-visible ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-contain object-center"
        draggable={false}
      />
    </div>
  );
}

function ReelColumn({
  src,
  poster,
  alt,
  delay = 0,
}: {
  src: string;
  poster: string;
  alt: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay} className="flex w-full shrink-0 flex-col">
      {/* Media — Figma ~399×694, rounded 36px */}
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

      <div className="mt-[clamp(0.5rem,0.781vw,0.9375rem)] text-black">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={REEL_AVATAR}
                alt=""
                aria-hidden
                className="size-full object-cover"
                draggable={false}
              />
            </div>
            <p className="truncate font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black">
              {REEL_CAPTION.handle}
            </p>
          </div>
          <span className="shrink-0 rounded-[7px] border border-black/40 px-3 py-1 font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
            Follow
          </span>
        </div>
        <div className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
          {REEL_CAPTION.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

function ReelsRow() {
  /* Desktop trio — Figma `2349:755`; gap ≈208px @ 1920 between ~400px cards */
  return (
    <div className="flex w-full justify-between gap-[clamp(1rem,10.83vw,13rem)] text-black">
      {reelCards.map((card, index) => (
        <div key={card.src} className="w-[clamp(12rem,20.83vw,25rem)]">
          <ReelColumn
            src={card.src}
            poster={card.poster}
            alt={card.alt}
            delay={index * 40}
          />
        </div>
      ))}
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
  /** Avoid flex track height = tallest slide (portrait reels) on shorter slides. */
  const [stageHeight, setStageHeight] = useState<number | undefined>();

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

  useEffect(() => {
    const slide = slideRefs.current[activeIndex];
    if (!slide) return;

    const measure = () => {
      setStageHeight(slide.offsetHeight);
    };
    measure();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    ro?.observe(slide);

    const imgs = slide.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure);
    });

    return () => {
      ro?.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", measure));
    };
  }, [activeIndex, items]);

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
        className="overflow-hidden motion-safe:transition-[height] motion-safe:duration-300"
        style={stageHeight != null ? { height: stageHeight } : undefined}
      >
        <div
          ref={trackRef}
          className="flex items-start snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-1 [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
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

const feedPhones = [
  {
    src: "/images/case-studies/eswap/social/feed-phone-1-v3.png",
    alt: "Eswap Instagram feed — brunch events",
  },
  {
    src: "/images/case-studies/eswap/social/feed-phone-2-v3.png",
    alt: "Eswap Instagram feed — resin art",
  },
  {
    src: "/images/case-studies/eswap/social/feed-phone-3-v3.png",
    alt: "Eswap Instagram feed — boho events",
  },
  {
    src: "/images/case-studies/eswap/social/feed-phone-4-v3.png",
    alt: "Eswap Instagram feed — event cards",
  },
] as const;

export function EswapSocial() {
  const mobileItems = [
    {
      key: "fan",
      node: (
        <Composite
          src="/images/case-studies/eswap/social/fan-hero-composite-v3.png"
          alt="Eswap social posts — Vibe to Catch and Merry Christmas with phone"
          aspect="3376 / 2012"
        />
      ),
    },
    {
      key: "posts",
      node: (
        <Composite
          src="/images/case-studies/eswap/social/posts-row-composite-v3.png"
          alt="Eswap social posts — golden ticket, giveaway, Oscars, champions"
          aspect="3376 / 1047"
        />
      ),
    },
    {
      key: "weekend",
      node: (
        <Composite
          src="/images/case-studies/eswap/social/weekend-composite-v3.png"
          alt="Eswap weekend swaps stories and phone"
          aspect="3360 / 1362"
        />
      ),
    },
    {
      key: "stranger",
      node: (
        <Composite
          src="/images/case-studies/eswap/social/stranger-composite-v3.png"
          alt="Eswap Stranger Things carousel with phone"
          aspect="3358 / 1673"
        />
      ),
    },
    ...feedPhones.map((phone) => ({
      key: phone.src,
      node: (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={phone.src}
          alt={phone.alt}
          className="h-auto w-full"
          style={{ filter: FAN_DROP }}
          draggable={false}
        />
      ),
    })),
    {
      key: "halloween",
      node: (
        <Composite
          src="/images/case-studies/eswap/social/halloween-composite-v3.png"
          alt="Eswap Halloween costume campaign"
          aspect="3358 / 1728"
        />
      ),
    },
    ...reelCards.map((card, index) => ({
      key: card.src,
      node: (
        <ReelColumn
          src={card.src}
          poster={card.poster}
          alt={card.alt}
          delay={index * 40}
        />
      ),
    })),
  ];

  return (
    <section aria-label="Social media" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(16rem,36.56vw,43.875rem)] leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Social Media For Eswap
          </h2>
        </FadeUp>

        {/* Desktop: stacked group composites matching Figma order */}
        <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] hidden flex-col gap-[clamp(2rem,4.17vw,5rem)] lg:flex">
          <FadeUp>
            <Composite
              src="/images/case-studies/eswap/social/fan-hero-composite-v3.png"
              alt="Eswap social posts — Vibe to Catch and Merry Christmas with phone"
              aspect="3376 / 2012"
            />
          </FadeUp>

          <FadeUp>
            <Composite
              src="/images/case-studies/eswap/social/posts-row-composite-v3.png"
              alt="Eswap social posts — golden ticket, giveaway, Oscars, champions"
              aspect="3376 / 1047"
            />
          </FadeUp>

          <FadeUp>
            <Composite
              src="/images/case-studies/eswap/social/weekend-composite-v3.png"
              alt="Eswap weekend swaps stories and phone"
              aspect="3360 / 1362"
            />
          </FadeUp>

          <FadeUp>
            <Composite
              src="/images/case-studies/eswap/social/stranger-composite-v3.png"
              alt="Eswap Stranger Things carousel with phone"
              aspect="3358 / 1673"
            />
          </FadeUp>

          <FadeUp>
            <div className="relative mx-auto aspect-[1701/755] w-full max-w-[1701px]">
              {feedPhones.map((phone, i) => (
                <div
                  key={phone.src}
                  className="absolute top-0"
                  style={{
                    left: `${(i * 389) / 1701 * 100}%`,
                    width: `${(534 / 1701) * 100}%`,
                    aspectRatio: "534 / 755",
                    zIndex: i + 1,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={phone.src}
                    alt={phone.alt}
                    className="absolute inset-0 size-full object-contain object-center"
                    style={{ filter: FAN_DROP }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp>
            <Composite
              src="/images/case-studies/eswap/social/halloween-composite-v3.png"
              alt="Eswap Halloween costume campaign"
              aspect="3358 / 1728"
            />
          </FadeUp>

          <FadeUp>
            <ReelsRow />
          </FadeUp>
        </div>

        <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] lg:hidden">
          <HorizontalCarousel
            items={mobileItems}
            ariaLabel="Eswap social media pagination"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
