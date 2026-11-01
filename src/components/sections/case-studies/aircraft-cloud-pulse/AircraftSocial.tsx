"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const PHONE_DROP =
  "drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)]";

const feedPanels = [
  {
    src: "/images/case-studies/aircraft-cloud-pulse/feed-panel-1.png",
    alt: "Aircraft Cloud social post — fleet overview creative 1",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/feed-panel-2.png",
    alt: "Aircraft Cloud social post — fleet overview creative 2",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/feed-panel-3.png",
    alt: "Aircraft Cloud social post — fleet overview creative 3",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/feed-panel-4.png",
    alt: "Aircraft Cloud social post — fleet overview creative 4",
  },
] as const;

const verticalPosts = [
  {
    src: "/images/case-studies/aircraft-cloud-pulse/vertical-1-clean.png",
    alt: "Aircraft Cloud Instagram story — product moment 1",
    width: "20.60%",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/vertical-2-clean.png",
    alt: "Aircraft Cloud Instagram story — product moment 2",
    width: "20.12%",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/vertical-3-clean.png",
    alt: "Aircraft Cloud Instagram story — product moment 3",
    width: "20.36%",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/vertical-4-clean.png",
    alt: "Aircraft Cloud Instagram story — product moment 4",
    width: "23.04%",
  },
] as const;

const campaignCards = [
  {
    src: "/images/case-studies/aircraft-cloud-pulse/campaign-1.png",
    alt: "Aircraft Cloud campaign creative 1",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/campaign-2.png",
    alt: "Aircraft Cloud campaign creative 2",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/campaign-3.png",
    alt: "Aircraft Cloud campaign creative 3",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/campaign-4.png",
    alt: "Aircraft Cloud campaign creative 4",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/campaign-5.png",
    alt: "Aircraft Cloud campaign creative 5",
  },
] as const;

/** Exact Figma caption (leading “I” missing in source). */
const INSTAGRAM_CAPTION = {
  handle: "Aircraft Cloud",
  lines: [
    "n the heart of the forest, the tiger remains wild.",
    "Unpredictable. Powerful. Free.",
    "Its presence reminds us that the forest does not exist for our entertainment. It is a living landscape governed by its own rhythms, relationships and rules.",
  ],
} as const;

const instagramReels = [
  {
    src: "/images/case-studies/aircraft-cloud-pulse/reel-1.png",
    label: "Aircraft Cloud Instagram reel 1",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/reel-2.png",
    label: "Aircraft Cloud Instagram reel 2",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/reel-3.png",
    label: "Aircraft Cloud Instagram reel 3",
  },
] as const;

function AssetImage({
  src,
  alt,
  aspect,
  className = "",
  rounded,
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] ${rounded ?? ""} ${className}`}
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

function PhoneImg({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 size-full object-contain object-center ${PHONE_DROP} ${className}`}
      draggable={false}
    />
  );
}

function InstagramReelCard({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[400/694] w-full overflow-hidden rounded-[36px]">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 1023px) 90vw, 22vw"
          className="object-cover object-center"
        />
      </div>
      <div className="mt-[clamp(0.75rem,0.94vw,1.125rem)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
            <div className="relative size-[clamp(2.25rem,2.76vw,3.3125rem)] shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/case-studies/aircraft-cloud-pulse/instagram-avatar.png"
                alt=""
                fill
                sizes="53px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black">
              {INSTAGRAM_CAPTION.handle}
            </p>
          </div>
          <span className="shrink-0 rounded-[7px] border border-black/40 px-3 py-1 font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
            Connect
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

/**
 * Social Media For Aircraft — Figma `2173:577` onward.
 * Phone fan AABBs from group `2404:511` (1605×983) @ −29.71°.
 */
export function AircraftSocial() {
  const mobileItems = [
    ...feedPanels.map((panel) => ({
      key: panel.src,
      node: <AssetImage src={panel.src} alt={panel.alt} aspect="320/399" />,
    })),
    ...verticalPosts.map((post) => ({
      key: post.src,
      node: (
        <div className="relative aspect-[346/511] w-full">
          <PhoneImg src={post.src} alt={post.alt} />
        </div>
      ),
    })),
    ...instagramReels.map((reel) => ({
      key: reel.src,
      node: <InstagramReelCard {...reel} />,
    })),
  ];

  return (
    <section aria-label="Social media for Aircraft Cloud" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pt-[clamp(2rem,4.167vw,5rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        {/* Heading + rotated phone fan — Figma 2404:511 */}
        <div className="relative z-10 w-full lg:aspect-[1605/983] lg:overflow-hidden">
          <FadeUp className="lg:absolute lg:left-0 lg:top-0 lg:z-10">
            <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Social Media For Aircraft
            </h2>
          </FadeUp>

          <FadeUp
            delay={40}
            className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
          >
            {/* Left AABB — Figma 2391:1589 */}
            <div className="absolute left-0 top-[50.05%] flex h-[65.76%] w-[36.23%] items-center justify-center">
              <div className="relative aspect-[363/537] w-[62.44%] -rotate-[29.71deg]">
                <PhoneImg
                  src="/images/case-studies/aircraft-cloud-pulse/phone-left-clean.png"
                  alt="Aircraft Cloud Instagram post on phone — left"
                />
              </div>
            </div>
            {/* Center AABB — Figma 2391:1586 */}
            <div className="absolute left-[23.99%] top-[21.24%] flex h-[100%] w-[50.33%] items-center justify-center">
              <div className="relative aspect-[421/891] w-[52.16%] -rotate-[29.71deg]">
                <PhoneImg
                  src="/images/case-studies/aircraft-cloud-pulse/phone-center-clean.png"
                  alt="Aircraft Cloud Instagram profile on phone"
                />
              </div>
            </div>
            {/* Right AABB — Figma 2391:1592 */}
            <div className="absolute left-[62.43%] top-[19.23%] flex h-[69.56%] w-[37.57%] items-center justify-center">
              <div className="relative aspect-[363/580] w-[60.24%] -rotate-[29.71deg]">
                <PhoneImg
                  src="/images/case-studies/aircraft-cloud-pulse/phone-right-clean.png"
                  alt="Aircraft Cloud Instagram post on phone — right"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Feed phone + panels — Figma 2391:1597 (1677×692) */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1677/692] w-full lg:block">
          <FadeUp className="absolute left-0 top-0 z-10 w-[23.20%]">
            <div className="relative aspect-[389/692] w-full">
              <PhoneImg
                src="/images/case-studies/aircraft-cloud-pulse/feed-phone-clean.png"
                alt="Aircraft Cloud Instagram story on phone"
              />
            </div>
          </FadeUp>
          {feedPanels.map((panel, index) => {
            const left = ((391 + index * 322) / 1677) * 100;
            return (
              <FadeUp
                key={panel.src}
                delay={40 + index * 40}
                className="absolute top-[26.45%] z-0 w-[19.08%]"
                style={{
                  left: `${left}%`,
                  marginLeft: index > 0 ? "-1px" : undefined,
                  width: index > 0 ? "calc(19.08% + 1px)" : undefined,
                }}
              >
                <AssetImage src={panel.src} alt={panel.alt} aspect="320/399" />
              </FadeUp>
            );
          })}
        </div>

        {/* Vertical story phones — Figma 2391:1628 (1680×511) */}
        <FadeUp delay={50}>
          <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1680/511] w-full lg:block">
            {verticalPosts.map((post, index) => {
              const lefts = [0, 25.89, 51.31, 76.96];
              return (
                <div
                  key={post.src}
                  className="absolute top-0 h-full"
                  style={{ left: `${lefts[index]}%`, width: post.width }}
                >
                  <PhoneImg src={post.src} alt={post.alt} />
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Campaign phone + cards — Figma 2391:1626 (1679×742) */}
        <div className="relative mt-[clamp(2rem,4.17vw,5rem)] hidden aspect-[1679/742] w-full lg:block">
          <FadeUp className="pointer-events-none absolute left-[32.52%] top-0 z-0 flex h-full w-[30.49%] items-center justify-center">
            <div className="relative aspect-[420/742] w-[100%]">
              <PhoneImg
                src="/images/case-studies/aircraft-cloud-pulse/campaign-phone-clean.png"
                alt="Aircraft Cloud campaign on phone"
              />
            </div>
          </FadeUp>
          <div className="absolute bottom-0 left-0 z-10 grid w-full grid-cols-5 gap-[clamp(0.25rem,0.286vw,0.344rem)]">
            {campaignCards.map((card, index) => (
              <FadeUp key={card.src} delay={index * 35}>
                <AssetImage src={card.src} alt={card.alt} aspect="332/415" />
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Instagram reels — Figma 2173:606 / 613 / 620 */}
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
      </div>
    </section>
  );
}
