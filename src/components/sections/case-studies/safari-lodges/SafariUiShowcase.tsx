"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * High-fidelity UI collage — Figma `2042:1138`–`2044:1157`
 *
 * Stage: content x=120→1800 (1680), y=11807→14172 (2365).
 * Laptops are full Figma group exports (frame + screen) — no CSS bezel/screen stack.
 * Phones use per-item Figma widths/heights; unequal aspects use fr / absolute AABBs
 * (How To lesson) so tops/bottoms match design.
 */
const STAGE_W = 1680;
const STAGE_H = 2365;
const ORIGIN_X = 120;
const ORIGIN_Y = 11807;

type Frame = {
  src: string;
  alt: string;
  kind: "phone" | "desktop";
  /** Figma AABB within the collage stage */
  left: number;
  top: number;
  width: number;
  height: number;
};

const frames: Frame[] = [
  {
    src: "/images/case-studies/safari-lodges/ui-phone-1-clean.png",
    alt: "Safari Lodges India mobile UI — home hero",
    kind: "phone",
    left: 222 - ORIGIN_X,
    top: 11821 - ORIGIN_Y,
    width: 319,
    height: 693,
  },
  {
    src: "/images/case-studies/safari-lodges/ui-laptop-1-clean.png",
    alt: "Safari Lodges India desktop UI — home on tablet",
    kind: "desktop",
    left: 687 - ORIGIN_X,
    top: 11807 - ORIGIN_Y,
    width: 1106,
    height: 721,
  },
  {
    src: "/images/case-studies/safari-lodges/ui-phone-2-clean.png",
    alt: "Safari Lodges India mobile UI — lodge listing",
    kind: "phone",
    left: 205 - ORIGIN_X,
    top: 12666 - ORIGIN_Y,
    width: 319,
    height: 693,
  },
  {
    src: "/images/case-studies/safari-lodges/ui-phone-3-clean.png",
    alt: "Safari Lodges India mobile UI — lodge detail",
    kind: "phone",
    left: 741 - ORIGIN_X,
    top: 12666 - ORIGIN_Y,
    width: 319,
    height: 693,
  },
  {
    src: "/images/case-studies/safari-lodges/ui-phone-4-clean.png",
    alt: "Safari Lodges India mobile UI — booking screen",
    kind: "phone",
    left: 1307 - ORIGIN_X,
    top: 12657 - ORIGIN_Y,
    width: 337,
    height: 669,
  },
  {
    src: "/images/case-studies/safari-lodges/ui-laptop-2-clean.png",
    alt: "Safari Lodges India desktop UI — experiences on tablet",
    kind: "desktop",
    left: 120 - ORIGIN_X,
    top: 13451 - ORIGIN_Y,
    width: 1106,
    height: 721,
  },
  {
    src: "/images/case-studies/safari-lodges/ui-phone-5-clean.png",
    alt: "Safari Lodges India mobile UI — experience detail",
    kind: "phone",
    left: 1325 - ORIGIN_X,
    top: 13495 - ORIGIN_Y,
    width: 361,
    height: 659,
  },
] as const;

/** Tallest phone frame — equal-height boxes on equal-width mobile slides */
const PHONE_ASPECT = "319 / 693";
const DESKTOP_ASPECT = "1106 / 721";

function FrameImage({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: aspect }}>
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

function UiCarousel() {
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
        {frames.map((frame, i) => (
          <div
            key={frame.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            <FrameImage
              src={frame.src}
              alt={frame.alt}
              aspect={frame.kind === "phone" ? PHONE_ASPECT : DESKTOP_ASPECT}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label="UI showcase pagination"
      >
        {frames.map((frame, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={frame.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to screen ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-[width,height,background-color,opacity] motion-safe:duration-200 ${
                isActive
                  ? "size-2.5 bg-white"
                  : "size-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function SafariUiShowcase() {
  return (
    <section aria-label="UI design showcase" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        {/* w-[64%]: match Amol mosaic scale; absolute Figma AABBs unchanged */}
        <FadeUp className="relative mx-auto hidden w-[64%] overflow-visible lg:block">
          <div
            className="relative w-full"
            style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
          >
            {frames.map((frame) => (
              <div
                key={frame.src}
                className="absolute"
                style={{
                  left: `${(frame.left / STAGE_W) * 100}%`,
                  top: `${(frame.top / STAGE_H) * 100}%`,
                  width: `${(frame.width / STAGE_W) * 100}%`,
                  aspectRatio: `${frame.width} / ${frame.height}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="absolute inset-0 size-full object-contain object-center"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <UiCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
