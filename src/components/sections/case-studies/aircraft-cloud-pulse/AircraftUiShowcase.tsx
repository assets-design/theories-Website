"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * High-fidelity UI phones — Figma `2404:512` (1680×697)
 * Desktop: Figma group screenshot as-is. Mobile: individual fill crops.
 */
const phones = [
  {
    src: "/images/case-studies/aircraft-cloud-pulse/ui-phone-1-crop.png",
    alt: "Aircraft Cloud mobile UI — splash / login",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/ui-phone-2-crop.png",
    alt: "Aircraft Cloud mobile UI — dashboard",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/ui-phone-3-crop.png",
    alt: "Aircraft Cloud mobile UI — data list",
  },
  {
    src: "/images/case-studies/aircraft-cloud-pulse/ui-phone-4-crop.png",
    alt: "Aircraft Cloud mobile UI — entry keypad",
  },
] as const;

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
        {phones.map((phone, i) => (
          <div
            key={phone.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={phone.src}
              alt={phone.alt}
              className="h-auto w-full object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label="UI showcase pagination"
      >
        {phones.map((phone, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={phone.src}
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

export function AircraftUiShowcase() {
  return (
    <section aria-label="UI design showcase" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp className="relative mx-auto hidden w-[64%] lg:block">
          <div className="relative aspect-[1680/697] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/aircraft-cloud-pulse/ui-phones-row-figma.png"
              alt="Aircraft Cloud mobile UI screens on four phones"
              className="absolute inset-0 size-full object-contain object-center"
              draggable={false}
            />
          </div>
        </FadeUp>

        <FadeUp>
          <UiCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
