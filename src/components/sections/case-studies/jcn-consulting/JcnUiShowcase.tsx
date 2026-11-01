"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Dimensions match the PNGs on disk so native aspects drive equal-height rows.
 * phone-2/3/4 row uses column fr = width/height so bottoms align.
 */
const frames = [
  {
    src: "/images/case-studies/jcn-consulting/phone-1.png",
    alt: "JCN mobile UI — red hero with mountain climber",
    kind: "phone" as const,
    width: 686,
    height: 1474,
  },
  {
    src: "/images/case-studies/jcn-consulting/desktop-1.png",
    alt: "JCN desktop UI — Tailored Growth Solutions section",
    kind: "desktop" as const,
    width: 1106,
    height: 721,
  },
  {
    src: "/images/case-studies/jcn-consulting/phone-2.png",
    alt: "JCN mobile UI — who we are overview",
    kind: "phone" as const,
    width: 330,
    height: 674,
  },
  {
    src: "/images/case-studies/jcn-consulting/phone-3.png",
    alt: "JCN mobile UI — services and content",
    kind: "phone" as const,
    width: 341,
    height: 674,
  },
  {
    src: "/images/case-studies/jcn-consulting/phone-4.png",
    alt: "JCN mobile UI — team profile",
    kind: "phone" as const,
    width: 308,
    height: 654,
  },
  {
    src: "/images/case-studies/jcn-consulting/desktop-2.png",
    alt: "JCN desktop UI — Accelerating Tomorrow's Venture Today",
    kind: "desktop" as const,
    width: 1844,
    height: 1426,
  },
  {
    src: "/images/case-studies/jcn-consulting/phone-5.png",
    alt: "JCN mobile UI — secondary content",
    kind: "phone" as const,
    width: 341,
    height: 705,
  },
] as const;

/** width/height → equal-height columns when each cell uses its native aspect */
function aspectTrack(...pairs: Array<readonly [number, number]>) {
  return pairs
    .map(([w, h]) => `minmax(0, ${(w / h).toFixed(4)}fr)`)
    .join(" ");
}

const ROW_3_TRACK = aspectTrack([330, 674], [341, 674], [308, 654]);
const PHONE_DESKTOP_TRACK = aspectTrack([686, 1474], [1106, 721]);
const DESKTOP_PHONE_TRACK = aspectTrack([1844, 1426], [341, 705]);

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
export function JcnUiShowcase() {
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

          {/* Proportional cols from each asset aspect → equal visual height, full image */}
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
