"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/** Dimensions match PNGs on disk. */
const frames = [
  {
    src: "/images/case-studies/rppl/phone-1.png",
    alt: "RPPL mobile UI — home hero with racing car",
    kind: "phone" as const,
    width: 686,
    height: 1474,
  },
  {
    src: "/images/case-studies/rppl/desktop-home.png",
    alt: "RPPL desktop UI — home hero",
    kind: "desktop" as const,
    width: 1536,
    height: 1024,
  },
  {
    src: "/images/case-studies/rppl/phone-3.png",
    alt: "RPPL mobile UI — news and articles",
    kind: "phone" as const,
    width: 852,
    height: 1846,
  },
  {
    src: "/images/case-studies/rppl/phone-2.png",
    alt: "RPPL mobile UI — mid-page section",
    kind: "phone" as const,
    width: 853,
    height: 1844,
  },
  {
    src: "/images/case-studies/rppl/phone-4.png",
    alt: "RPPL mobile UI — driver profile",
    kind: "phone" as const,
    width: 853,
    height: 1844,
  },
  {
    src: "/images/case-studies/rppl/desktop-secondary.png",
    alt: "RPPL desktop UI — secondary section",
    kind: "desktop" as const,
    width: 1536,
    height: 1024,
  },
  {
    src: "/images/case-studies/rppl/phone-5.png",
    alt: "RPPL mobile UI — content detail",
    kind: "phone" as const,
    width: 852,
    height: 1846,
  },
] as const;

function aspectTrack(...pairs: Array<readonly [number, number]>) {
  return pairs
    .map(([w, h]) => `minmax(0, ${(w / h).toFixed(4)}fr)`)
    .join(" ");
}

const ROW_3_TRACK = aspectTrack([852, 1846], [853, 1844], [853, 1844]);
const PHONE_DESKTOP_TRACK = aspectTrack([686, 1474], [1536, 1024]);
const DESKTOP_PHONE_TRACK = aspectTrack([1536, 1024], [852, 1846]);

function FrameCard({
  src,
  alt,
  kind,
  width,
  height,
}: {
  src: string;
  alt: string;
  kind: "phone" | "desktop";
  width: number;
  height: number;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          kind === "phone"
            ? "(max-width: 1023px) 90vw, 22vw"
            : "(max-width: 1023px) 90vw, 58vw"
        }
        className="object-contain object-top"
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
            <FrameCard {...frame} />
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

/**
 * High-fidelity UI collage — header-aligned width; full images; equal-height rows.
 */
export function RpplUiShowcase() {
  return (
    <section aria-label="UI design showcase" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 py-[clamp(2.5rem,4.17vw,5rem)] lg:px-[clamp(1rem,6.875vw,16.25rem)]">
        <div className="mx-auto hidden w-full max-w-[clamp(920px,72.7vw,1396px)] flex-col gap-[clamp(1.25rem,2.76vw,3.3125rem)] lg:flex">
          <div
            className="grid items-start gap-[clamp(1rem,2.6vw,3.125rem)]"
            style={{ gridTemplateColumns: PHONE_DESKTOP_TRACK }}
          >
            <FadeUp>
              <FrameCard {...frames[0]} />
            </FadeUp>
            <FadeUp delay={80}>
              <FrameCard {...frames[1]} />
            </FadeUp>
          </div>

          <div
            className="grid items-start gap-[clamp(1rem,2.6vw,3.125rem)]"
            style={{ gridTemplateColumns: ROW_3_TRACK }}
          >
            <FadeUp delay={40}>
              <FrameCard {...frames[2]} />
            </FadeUp>
            <FadeUp delay={100}>
              <FrameCard {...frames[3]} />
            </FadeUp>
            <FadeUp delay={160}>
              <FrameCard {...frames[4]} />
            </FadeUp>
          </div>

          <div
            className="grid items-start gap-[clamp(1rem,2.6vw,3.125rem)]"
            style={{ gridTemplateColumns: DESKTOP_PHONE_TRACK }}
          >
            <FadeUp delay={60}>
              <FrameCard {...frames[5]} />
            </FadeUp>
            <FadeUp delay={120}>
              <FrameCard {...frames[6]} />
            </FadeUp>
          </div>
        </div>

        <FadeUp>
          <UiCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
