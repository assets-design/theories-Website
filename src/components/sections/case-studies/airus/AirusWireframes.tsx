"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const wireframes = [
  {
    src: "/images/case-studies/airus/wireframe-1.png",
    alt: "Airus website wireframe — hero and primary layout",
    aspect: "824/766",
  },
  {
    src: "/images/case-studies/airus/wireframe-2.png",
    alt: "Airus website wireframe — navigation and header blocks",
    aspect: "824/335",
  },
  {
    src: "/images/case-studies/airus/wireframe-3.png",
    alt: "Airus website wireframe — content grid section",
    aspect: "825/529",
  },
  {
    src: "/images/case-studies/airus/wireframe-4.png",
    alt: "Airus website wireframe — multi-column content blocks",
    aspect: "825/486",
  },
  {
    src: "/images/case-studies/airus/wireframe-5.png",
    alt: "Airus website wireframe — footer and info section",
    aspect: "825/366",
  },
] as const;

function WireframeFrame({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#d9d9d9]"
      style={{ aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-contain object-top"
        draggable={false}
      />
    </div>
  );
}

function WireframesCarousel() {
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
    <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] max-lg:-mr-4 lg:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-1 [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {wireframes.map((frame, i) => (
          <div
            key={frame.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            <WireframeFrame {...frame} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label="Wireframes pagination"
      >
        {wireframes.map((frame, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={frame.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to wireframe ${i + 1}`}
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
 * Website Wireframes — Figma `2024:683`
 */
export function AirusWireframes() {
  return (
    <section aria-label="Website wireframes" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Website Wireframes
          </h2>
        </FadeUp>

        <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] hidden gap-[clamp(1rem,1.56vw,1.875rem)] lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-[clamp(1rem,1.56vw,1.875rem)]">
            <FadeUp delay={40}>
              <WireframeFrame {...wireframes[0]} />
            </FadeUp>
            <FadeUp delay={120}>
              <WireframeFrame {...wireframes[3]} />
            </FadeUp>
          </div>
          <div className="flex flex-col gap-[clamp(1rem,1.56vw,1.875rem)]">
            <FadeUp delay={80}>
              <WireframeFrame {...wireframes[1]} />
            </FadeUp>
            <FadeUp delay={160}>
              <WireframeFrame {...wireframes[2]} />
            </FadeUp>
            <FadeUp delay={200}>
              <WireframeFrame {...wireframes[4]} />
            </FadeUp>
          </div>
        </div>

        <FadeUp>
          <WireframesCarousel />
        </FadeUp>
        </div>
      </div>
    </section>
  );
}
