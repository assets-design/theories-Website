"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const phones = [
  {
    src: "/images/case-studies/celeste/phone-1.png",
    alt: "Celeste Beyond campaign ad on phone — campus creative",
  },
  {
    src: "/images/case-studies/celeste/phone-2.png",
    alt: "Celeste Beyond campaign ad on phone — admissions creative",
  },
  {
    src: "/images/case-studies/celeste/phone-3.png",
    alt: "Celeste Beyond campaign ad on phone — residence creative",
  },
] as const;

type Phone = (typeof phones)[number];

function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <div className="mx-auto w-full max-w-[494px]">
      <div className="relative aspect-[494/780] w-full overflow-hidden">
        <Image
          src={phone.src}
          alt={phone.alt}
          fill
          sizes="(max-width: 1023px) 90vw, 26vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * Mobile: 1 + 10% peek (`w-[90%]`).
 * Tablet md–lg: 2 + 10% peek (`md:w-[calc(100%/2.1)]`).
 * Desktop lg+: grid only (this carousel is `lg:hidden`).
 * Right-only bleed (`-mr-4 pr-4`) so peek clears section `px-4` without shifting left edge.
 */
function AdsCarousel() {
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
        {phones.map((phone, i) => (
          <div
            key={phone.alt}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            <PhoneCard phone={phone} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label="Ad campaign pagination"
      >
        {phones.map((phone, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={phone.alt}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to ad ${i + 1}`}
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
 * Digital Ad Campaign "Beyond" Series — Figma `1720:4757` + phones `1720:4836`–`1720:4838`
 * Mobile/tablet: peeking carousel · lg+: 3-col grid
 */
export function CelesteAds() {
  return (
    <section
      aria-label="Digital Ad Campaign Beyond Series"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-lg:max-w-none lg:max-w-[clamp(20rem,59vw,70.8125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Digital Ad Campaign&nbsp;&quot;Beyond&quot; Series
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <p className="mt-[clamp(0.75rem,1.56vw,1.875rem)] max-lg:max-w-none lg:max-w-[clamp(20rem,42.14vw,50.5625rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.04vw,1.25rem)] leading-[normal] text-white/80">
            Every child walks between two worlds — the classroom and their
            limitless future.
          </p>
        </FadeUp>

        {/* Desktop: 3-column grid — unchanged */}
        <ul className="mt-[clamp(1.5rem,3.125vw,3.75rem)] hidden gap-[clamp(1rem,2.08vw,2.5rem)] lg:grid lg:grid-cols-3">
          {phones.map((phone, index) => (
            <li key={phone.alt}>
              <FadeUp delay={index * 80}>
                <PhoneCard phone={phone} />
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* Mobile + tablet: 1+10% / 2+10% peek carousel */}
        <FadeUp>
          <AdsCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
