"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

type FeaturedProject = {
  name: string;
  image: string;
  logo: string;
  logoClassName: string;
  metric: string;
};

/**
 * Featured strip — left → right keep-list order.
 * Horizontal showcase → site-wide peeking carousel (not a desktop grid).
 * Infinite-loop clones (`looped`) reuse this same array.
 */
const featured: FeaturedProject[] = [
  {
    name: "Versatile",
    image: "/images/featured/versatile.png",
    logo: "/images/featured/versatile-logo.png",
    logoClassName: "h-[clamp(1.5rem,1.77vw,2.125rem)] w-auto max-w-[clamp(8rem,9.43vw,11.3125rem)]",
    metric: "17.3X ROAS in three months",
  },
  {
    name: "Kiran International School",
    image: "/images/featured/kiran.png",
    logo: "/images/featured/kiran-logo.png",
    logoClassName: "h-[clamp(1.75rem,2.08vw,2.5rem)] w-auto max-w-[clamp(5.5rem,7vw,8.5rem)]",
    metric: "1,500+ admissions across two academic years",
  },
  {
    name: "ICL",
    image: "/images/featured/icl.png",
    logo: "/images/featured/icl-logo.png",
    logoClassName: "h-[clamp(1.5rem,1.77vw,2.125rem)] w-auto max-w-[clamp(4rem,4.9vw,5.9rem)]",
    metric: "176K organic visits in six months",
  },
  {
    name: "Windookrafts",
    image: "/images/featured/windookrafts.png",
    logo: "/images/featured/windookrafts-logo.png",
    logoClassName: "h-[clamp(1.5rem,1.77vw,2.125rem)] w-auto max-w-[clamp(7.5rem,10.3vw,12.4rem)]",
    metric: "4X organic traffic in three months, from SEO and social",
  },
  {
    name: "Harvest Luxury Real Estate",
    image: "/images/featured/harvest.png",
    logo: "/images/featured/harvest-logo.svg",
    logoClassName: "h-[clamp(1.5rem,1.77vw,2.125rem)] w-auto max-w-[clamp(6.5rem,8.4vw,10rem)]",
    metric: "25+ landing pages and 100+ campaigns, built to drive walk-ins",
  },
  {
    name: "Mahesh Agencies",
    image: "/images/featured/mahesh-agencies.png",
    logo: "/images/featured/mahesh-agencies-logo.svg",
    logoClassName: "h-[clamp(1.5rem,1.77vw,2.125rem)] w-auto max-w-[clamp(7.5rem,10.3vw,12.4rem)]",
    metric: "A 55-year legacy brand with 24 locations, taken digital",
  },
  {
    name: "Safari Lodges India",
    image: "/images/featured/safari-lodges.png",
    logo: "/images/featured/safari-lodges-logo.svg",
    logoClassName: "h-[clamp(1.5rem,2.08vw,2.5rem)] w-auto max-w-[clamp(6rem,8.2vw,9.8rem)]",
    metric: "Premium safari resort launched on digital",
  },
  {
    name: "Airus",
    image: "/images/featured/airus.png",
    logo: "/images/featured/airus-logo.svg",
    logoClassName: "h-[clamp(1.125rem,1.3vw,1.5625rem)] w-auto max-w-[clamp(8rem,11.7vw,14rem)]",
    metric: "Launched in 2026, online and offline",
  },
  {
    name: "Counting Breaths",
    image: "/images/featured/counting-breaths.png",
    logo: "/images/featured/counting-breaths-logo.svg",
    logoClassName: "h-[clamp(1.75rem,2.19vw,2.625rem)] w-auto max-w-[clamp(7.5rem,10.4vw,12.5rem)]",
    metric: "New identity and website for Counting Breaths",
  },
  {
    name: "Ambica",
    image: "/images/featured/ambica.png",
    logo: "/images/featured/ambica-logo.png",
    logoClassName: "h-[clamp(2rem,2.5vw,3rem)] w-auto max-w-[clamp(2.5rem,3.1vw,3.7rem)]",
    metric: "Amazon A+ content, brochures and packaging",
  },
  {
    name: "Oak Valley International School",
    image: "/images/featured/oak-valley.png",
    logo: "/images/featured/oak-valley-logo.png",
    logoClassName: "h-[clamp(1.5rem,1.98vw,2.375rem)] w-auto max-w-[clamp(7rem,10.3vw,12.4rem)]",
    metric: "Social restructured, admissions filled for 2026",
  },
  {
    name: "Graph Intel School",
    image: "/images/featured/graph-intel.png",
    logo: "/images/featured/graph-intel-logo.png",
    logoClassName: "h-[clamp(2rem,2.55vw,3.0625rem)] w-auto max-w-[clamp(5rem,6.4vw,7.7rem)]",
    metric: "Social restructured, admissions filled for 2026",
  },
  {
    name: "NewportMed",
    image: "/images/featured/newportmed.png",
    logo: "/images/featured/newportmed-logo.png",
    logoClassName: "h-[clamp(1.125rem,1.3vw,1.5625rem)] w-auto max-w-[clamp(8rem,10.4vw,12.5rem)]",
    metric: "Corporate brand communication, built for social",
  },
];

/** Reserved logo row — tall enough for the largest logoClassName (Graph Intel). */
const LOGO_SLOT_H = "h-[clamp(2rem,2.55vw,3.0625rem)]";

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="flex w-full flex-col overflow-hidden">
      <div className="relative w-full overflow-hidden aspect-[388/325]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 767px) 85vw, (max-width: 1023px) 42vw, 22vw"
          draggable={false}
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="flex min-h-[clamp(9.75rem,10.2vw,12.25rem)] flex-col justify-start bg-white px-[clamp(0.75rem,0.78vw,0.9375rem)] py-[clamp(0.75rem,0.78vw,0.9375rem)]">
        <div className={`flex ${LOGO_SLOT_H} w-full shrink-0 items-start`}>
          <Image
            src={project.logo}
            alt={project.name}
            width={640}
            height={192}
            draggable={false}
            className={`pointer-events-none ${project.logoClassName} object-contain object-left`}
          />
        </div>

        <p className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.9375vw,1.125rem)] font-normal leading-normal text-black">
          {project.metric}
        </p>
      </div>
    </article>
  );
}

const AUTO_SPEED = 0.45; // px per frame — same as BrandBand

/**
 * Peeking carousel across breakpoints (Figma is a horizontal strip):
 * mobile: 1 + 10% · tablet: 2 + 10% · lg/xl: 4 full cards
 * Gap-aware width against track (@container):
 *   (100cqw − (N−1)·gap) / N   on desktop (4 full)
 *   (100cqw − (N−1)·gap) / (N + 0.1) on mobile/tablet (peek)
 * Continuous auto-scroll marquee + drag + hover pause (BrandBand).
 */
function FeaturedProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const looped = [...featured, ...featured];

  const getSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.scrollWidth / 2;
  }, []);

  const wrapOffset = useCallback(() => {
    const setWidth = getSetWidth();
    if (setWidth <= 0) return;
    while (offsetRef.current <= -setWidth) offsetRef.current += setWidth;
    while (offsetRef.current > 0) offsetRef.current -= setWidth;
  }, [getSetWidth]);

  const apply = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track) return;

    let raf = 0;

    const tick = () => {
      const paused =
        draggingRef.current ||
        hoveringRef.current ||
        reducedMotionRef.current;

      if (!paused) {
        offsetRef.current -= AUTO_SPEED;
        wrapOffset();
        apply();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      draggingRef.current = true;
      startXRef.current = event.clientX;
      startOffsetRef.current = offsetRef.current;
      track.style.transition = "none";
      track.setPointerCapture(event.pointerId);
      track.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const delta = event.clientX - startXRef.current;
      offsetRef.current = startOffsetRef.current + delta;
      wrapOffset();
      apply();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      wrapOffset();
      apply();
      try {
        track.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
      track.style.cursor = "grab";
    };

    const onMouseEnter = () => {
      hoveringRef.current = true;
    };

    const onMouseLeave = () => {
      hoveringRef.current = false;
    };

    const onResize = () => {
      wrapOffset();
      apply();
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    viewport?.addEventListener("mouseenter", onMouseEnter);
    viewport?.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      viewport?.removeEventListener("mouseenter", onMouseEnter);
      viewport?.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [apply, wrapOffset]);

  return (
    <div className="mt-[clamp(1.25rem,3.125vw,3.75rem)]">
      <div
        ref={viewportRef}
        className="@container w-full overflow-hidden pb-1"
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-[var(--fp-gap)] active:cursor-grabbing [--fp-gap:1rem] md:[--fp-gap:1.25rem] lg:[--fp-gap:clamp(1.25rem,2.6vw,3.125rem)]"
          style={{ touchAction: "none", userSelect: "none" }}
        >
          {looped.map((project, i) => (
            <div
              key={`${project.name}-${i}`}
              className="w-[calc(100cqw/1.1)] shrink-0 md:w-[calc((100cqw-var(--fp-gap))/2.1)] lg:w-[calc((100cqw-3*var(--fp-gap))/4)]"
            >
              <FeaturedProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Featured Projects — Figma 1956:2505
 * H2 + peeking carousel (1 / 2 / 4 cards) · auto-marquee · drag · 13 projects
 * Equal card heights via shared white-footer min-height; logos share a fixed slot.
 */
export function FeaturedProjects() {
  return (
    <section
      id="featured"
      aria-label="Featured projects"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,3.65vw,4.375rem)] pb-[clamp(2.5rem,9.48vw,11.375rem)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Our Featured Projects
          </h2>
        </FadeUp>

        <FadeUp>
          <FeaturedProjectsCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
