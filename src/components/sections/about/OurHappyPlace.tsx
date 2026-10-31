"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

type CultureClip = {
  src: string;
  label: string;
};

const CLIPS: CultureClip[] = [
  {
    src: "/images/about/happy-place/diwali.mp4",
    label:
      "Diwali celebration at Theories — team member in an orange kurta playing a cup toss game",
  },
  {
    src: "/images/about/happy-place/ornament.mp4",
    label:
      "Close-up of a red gift-box Christmas ornament hanging on a pine branch",
  },
  {
    src: "/images/about/happy-place/guitar.mp4",
    label: "Team member playing an acoustic guitar in the Theories office",
  },
  {
    src: "/images/about/happy-place/desk-work.mp4",
    label: "Team member on a phone call while working at a laptop",
  },
];

function HappyPlaceVideo({ clip }: { clip: CultureClip }) {
  return (
    <div className="relative aspect-[394/805] w-full overflow-hidden">
      <video
        src={clip.src}
        aria-label={clip.label}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 size-full object-cover object-center"
      />
    </div>
  );
}

/**
 * Mobile: 1 + 10% peek (`w-[90%]`).
 * Tablet md–lg: 2 + 10% peek (`md:w-[calc(100%/2.1)]`).
 * Desktop lg+: grid only (this carousel is `lg:hidden`).
 */
function HappyPlaceCarousel() {
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
    <div className="mt-[clamp(1.25rem,3.125vw,3.75rem)] lg:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {CLIPS.map((clip, i) => (
          <div
            key={clip.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            <HappyPlaceVideo clip={clip} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Happy place pagination"
      >
        {CLIPS.map((clip, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={clip.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to clip ${i + 1}`}
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

/**
 * Our happy place — Figma `1892:2104` (Group 1000002591)
 * Black band 1920×1302 · H2 Power Grotesk 64 · 4 culture videos 394×805, gap 35
 * Mobile/tablet: peeking carousel · lg+: 4-col grid
 */
export function OurHappyPlace() {
  return (
    <section aria-label="Our happy place" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(3rem,9.375vw,11.25rem)] pb-[clamp(3rem,9.375vw,11.25rem)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] text-white max-md:!text-[32px] md:max-lg:!text-[2.625rem]">
            Our happy place
          </h2>
        </FadeUp>

        {/* Desktop: 4-column grid — Figma 4 cols @ 394×805, gap ≈ 35 */}
        <ul className="mt-[clamp(1.25rem,3.125vw,3.75rem)] hidden gap-[clamp(0.75rem,1.823vw,2.1875rem)] lg:grid lg:grid-cols-4">
          {CLIPS.map((clip, index) => (
            <li key={clip.src}>
              <FadeUp delay={index * 80}>
                <HappyPlaceVideo clip={clip} />
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* Mobile + tablet: 1+10% / 2+10% peek carousel */}
        <FadeUp>
          <HappyPlaceCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
