"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * UI/UX + web — Figma `2255:1014` heading, `2263:1112` laptop, phones `2255:1016`–`2255:1026`.
 * Phone PNGs: clean alpha outside frames — native <img>, no box-shadow wrappers.
 *
 * Figma phones share height 727 with widths 367 / 332 / 332 / 365. Equal `grid-cols-4`
 * + per-width aspects made 1 & 4 shorter; desktop uses proportional cols so bottoms align.
 * Mobile carousel is equal-width slides → shared tall aspect (332/727) + object-contain.
 */

/** Tallest Figma phone frames (2 & 3) — equal-height boxes on equal-width layouts */
const PHONE_ASPECT = "332 / 727";

const phones = [
  {
    src: "/images/case-studies/howto/ui-phone-1-clean.png",
    alt: "howTo. mobile UI — skyrocket your business hero",
    /** Figma 2255:1016 — 367×727 */
    desktopAspect: "367 / 727",
  },
  {
    src: "/images/case-studies/howto/ui-phone-2-clean.png",
    alt: "howTo. mobile UI — about section",
    /** Figma 2255:1018 — 332×727 */
    desktopAspect: "332 / 727",
  },
  {
    src: "/images/case-studies/howto/ui-phone-3-clean.png",
    alt: "howTo. mobile UI — what we do stats",
    /** Figma 2255:1020 — 332×727 */
    desktopAspect: "332 / 727",
  },
  {
    src: "/images/case-studies/howto/ui-phone-4-clean.png",
    alt: "howTo. mobile UI — services playground",
    /** Figma 2255:1026 — 365×727 */
    desktopAspect: "365 / 727",
  },
] as const;

function PhoneCard({
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

function PhoneCarousel() {
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
        {phones.map((phone, i) => (
          <div
            key={phone.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[70%] shrink-0 snap-start md:w-[calc(100%/2.2)]"
          >
            <PhoneCard
              src={phone.src}
              alt={phone.alt}
              aspect={PHONE_ASPECT}
            />
          </div>
        ))}
      </div>
      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label="How To mobile UI pagination"
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
                isActive ? "size-2.5 bg-white" : "size-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function HowtoLanding() {
  return (
    <section aria-label="How To UI and web design" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 py-[clamp(2.5rem,4.17vw,5rem)] lg:px-[clamp(1rem,6.875vw,16.25rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
          <FadeUp>
            <h2 className="text-h2 max-w-[clamp(20rem,59.64vw,71.5625rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              How To
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Brand Identity &amp; Social Design
            </h2>
          </FadeUp>

          <FadeUp delay={120}>
            {/* Figma 2263:1112 — 1680×914; clean alpha, no rectangular shadow */}
            <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1680/914] w-full max-lg:aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/case-studies/howto/landing-laptop-clean.png"
                alt="howTo. website shown on a laptop device"
                className="absolute inset-0 size-full object-contain object-center"
                draggable={false}
              />
            </div>
          </FadeUp>

          {/* Proportional cols (367/332/332/365 @ h=727) → equal height, full frames */}
          <div
            className="mt-[clamp(1.5rem,4.17vw,5rem)] hidden items-start gap-[clamp(1rem,4.48vw,5.375rem)] lg:grid"
            style={{
              gridTemplateColumns:
                "minmax(0, 0.5048fr) minmax(0, 0.4567fr) minmax(0, 0.4567fr) minmax(0, 0.5021fr)",
            }}
          >
            {phones.map((phone, index) => (
              <FadeUp key={phone.src} delay={index * 40}>
                <PhoneCard
                  src={phone.src}
                  alt={phone.alt}
                  aspect={phone.desktopAspect}
                />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={80} className="mt-[clamp(1.5rem,4vw,3rem)]">
            <PhoneCarousel />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
