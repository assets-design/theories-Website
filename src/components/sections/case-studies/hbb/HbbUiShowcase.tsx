"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const frames = [
  {
    src: "/images/case-studies/hbb/ui-mobile-1.png",
    alt: "HBB mobile UI — home hero with racing car",
    kind: "phone" as const,
    width: 863,
    height: 1823,
    /** Figma `1720:5042` — full class so Tailwind picks it up */
    lgAspectClass: "lg:aspect-[375/713]",
  },
  {
    src: "/images/case-studies/hbb/ui-desktop-1.png",
    alt: "HBB desktop UI — Engineered for Glory section",
    kind: "desktop" as const,
    width: 1536,
    height: 1024,
    /** Figma `1720:5045` */
    lgAspectClass: "lg:aspect-[1106/721]",
  },
  {
    src: "/images/case-studies/hbb/ui-mobile-5.png",
    alt: "HBB mobile UI — Championship Moments",
    kind: "phone" as const,
    width: 853,
    height: 1844,
    /** Figma phone row shared height (`1720:5049`) */
    lgAspectClass: "lg:aspect-[375/713]",
  },
  {
    src: "/images/case-studies/hbb/ui-mobile-2.png",
    alt: "HBB mobile UI — Passion Precision Speed",
    kind: "phone" as const,
    width: 863,
    height: 1822,
    /** Figma `1720:5043` */
    lgAspectClass: "lg:aspect-[375/713]",
  },
  {
    src: "/images/case-studies/hbb/ui-mobile-3.png",
    alt: "HBB mobile UI — driver profile",
    kind: "phone" as const,
    width: 864,
    height: 1821,
    /** Figma `1720:5044` — shared 713 keeps the 3-up row even */
    lgAspectClass: "lg:aspect-[375/713]",
  },
  {
    src: "/images/case-studies/hbb/ui-desktop-2.png",
    alt: "HBB desktop UI — driver and car collage",
    kind: "desktop" as const,
    width: 1536,
    height: 1024,
    /** Figma `1720:5046` */
    lgAspectClass: "lg:aspect-[1036/695]",
  },
  {
    src: "/images/case-studies/hbb/ui-mobile-4.png",
    alt: "HBB mobile UI — Race Calendar",
    kind: "phone" as const,
    width: 863,
    height: 1823,
    /** Figma `1720:5047` */
    lgAspectClass: "lg:aspect-[375/713]",
  },
] as const;

/** Shared phone frame below lg — carousel keeps current tall aspect. */
const PHONE_ASPECT_CLASS = "aspect-[863/1823]";
/** Desktop asset aspect below lg (carousel). Literal so Tailwind JIT sees it. */
const DESKTOP_ASPECT_CLASS = "aspect-[1536/1024]";

function FrameCard({
  src,
  alt,
  kind,
  lgAspectClass,
}: {
  src: string;
  alt: string;
  kind: "phone" | "desktop";
  width: number;
  height: number;
  lgAspectClass: string;
}) {
  const baseAspectClass =
    kind === "phone" ? PHONE_ASPECT_CLASS : DESKTOP_ASPECT_CLASS;

  return (
    <div
      className={`relative w-full overflow-hidden max-lg:h-full ${baseAspectClass} ${lgAspectClass}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          kind === "phone"
            ? "(max-width: 1023px) 90vw, 20vw"
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
 * High-fidelity UI collage — Figma `1720:5042`–`1720:5049`
 * Desktop mosaic at ~64% (Amol scale) · below lg: 1+10% / 2+10% peek carousel
 */
export function HbbUiShowcase() {
  return (
    <section aria-label="UI design showcase" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        {/* w-[64%]: aspect-driven rows shrink ~20% more while keeping ratios */}
        <div className="mx-auto hidden w-[64%] flex-col gap-[clamp(1.25rem,2.76vw,3.3125rem)] lg:flex">
          {/* +20% vs mosaic: phone+tablet row */}
          <div className="grid w-[120%] self-center grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] items-start gap-[clamp(1rem,2.6vw,3.125rem)]">
            <FadeUp>
              <FrameCard {...frames[0]} />
            </FadeUp>
            <FadeUp delay={80}>
              <FrameCard {...frames[1]} />
            </FadeUp>
          </div>

          <div className="grid grid-cols-3 items-stretch gap-[clamp(1rem,2.6vw,3.125rem)]">
            <FadeUp className="h-full" delay={40}>
              <FrameCard {...frames[2]} />
            </FadeUp>
            <FadeUp className="h-full" delay={100}>
              <FrameCard {...frames[3]} />
            </FadeUp>
            <FadeUp className="h-full" delay={160}>
              <FrameCard {...frames[4]} />
            </FadeUp>
          </div>

          {/* +20% vs mosaic: tablet+phone row */}
          <div className="grid w-[120%] self-center grid-cols-[minmax(0,1fr)_minmax(0,0.36fr)] items-start gap-[clamp(1rem,2.6vw,3.125rem)]">
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
