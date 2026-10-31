"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const cards = [
  {
    title: "Meta & Google Ads",
    icon: "/images/case-studies/celeste/icon-meta-google.png",
    items: ["6 ad creatives", "Lead gen campaigns", "1,019 leads at ₹393 CPL"],
  },
  {
    title: "Outdoor Hoardings",
    icon: "/images/case-studies/celeste/icon-outdoor.png",
    items: [
      "2 large-format hoardings",
      "Boduppal–Chengicherla belt",
      "Massive local presence",
    ],
  },
  {
    title: "Lollipop Standees",
    icon: "/images/case-studies/celeste/icon-standees.png",
    items: [
      "5 standee designs",
      '"Beyond" creative series',
      "Strategic placement",
    ],
  },
  {
    title: "Auto Branding",
    icon: "/images/case-studies/celeste/icon-auto-branding.png",
    items: [
      "Transit media creative",
      "Day & Residential Campus",
      "Eastern corridor routes",
    ],
  },
  {
    title: "Print Collateral",
    icon: "/images/case-studies/celeste/icon-print.png",
    items: [
      "20-page school brochure",
      "Admissions flyer",
      "3×4 signage boards",
    ],
  },
  {
    title: "Instagram & Reels",
    icon: "/images/case-studies/celeste/icon-instagram.png",
    items: [
      "Campaign ad creatives",
      "Residence life reel",
      "Social content strategy",
    ],
  },
] as const;

type StrategyCard = (typeof cards)[number];

function StrategyCardItem({ card }: { card: StrategyCard }) {
  return (
    <div className="flex min-h-[clamp(16rem,26.3vw,31.5625rem)] flex-col rounded-[clamp(0.75rem,1.15vw,1.375rem)] bg-white/10 px-[clamp(1.25rem,3.125vw,3.75rem)] py-[clamp(1.5rem,3.125vw,3.75rem)]">
      <div className="relative size-[clamp(2.75rem,3.85vw,4.625rem)] overflow-hidden">
        <Image
          src={card.icon}
          alt=""
          fill
          sizes="74px"
          className="object-cover"
        />
      </div>

      <h3 className="mt-[clamp(1.25rem,3.125vw,3.75rem)] font-[family-name:var(--font-display)] text-[clamp(1.25rem,1.77vw,2.125rem)] capitalize leading-[normal] text-white">
        {card.title}
      </h3>

      <ul className="mt-[clamp(0.75rem,1.56vw,1.875rem)] list-disc space-y-[clamp(0.5rem,1.04vw,1.25rem)] pl-[clamp(1rem,1.72vw,2.0625rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] leading-[normal] text-white/80">
        {card.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Mobile: 1 + 10% peek (`w-[90%]`).
 * Tablet md–lg: 2 + 10% peek (`md:w-[calc(100%/2.1)]`).
 * Desktop lg+: grid only (this carousel is `lg:hidden`).
 * Right-only bleed (`-mr-4 pr-4`) so peek clears section `px-4` without shifting left edge.
 */
function StrategyCarousel() {
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
        {cards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            <StrategyCardItem card={card} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2 pr-4"
        role="tablist"
        aria-label="Strategy pagination"
      >
        {cards.map((card, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={card.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to ${card.title}`}
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
 * Strategy grid — Figma `1720:4756` + cards `1720:4795`–`1720:4835`
 * Mobile/tablet: peeking carousel · lg+: 3-col grid
 */
export function CelesteStrategy() {
  return (
    <section aria-label="Admissions strategy" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-lg:max-w-none lg:max-w-[clamp(20rem,53.44vw,64.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            A complete admissions machine digital, print, outdoor &amp;
            collateral.
          </h2>
        </FadeUp>

        {/* Desktop: 3-column grid — unchanged */}
        <ul className="mt-[clamp(1.5rem,3.125vw,3.75rem)] hidden gap-[clamp(1rem,1.56vw,1.875rem)] lg:grid lg:grid-cols-3">
          {cards.map((card, index) => (
            <li key={card.title}>
              <FadeUp delay={index * 80}>
                <StrategyCardItem card={card} />
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* Mobile + tablet: 1+10% / 2+10% peek carousel */}
        <FadeUp>
          <StrategyCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
