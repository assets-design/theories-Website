"use client";

import { useEffect, useRef } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

/** Encode each path segment so spaces / @ work on static hosts */
function assetUrl(path: string) {
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .join("/");
}

/** Logo order: alphabetical by filename from public/images/clients */
const clientLogos = [
  { file: "_Group_ (1).png", alt: "_Group_ (1)" },
  { file: "_Group_ (2).png", alt: "_Group_ (2)" },
  { file: "_Group_ (3).png", alt: "_Group_ (3)" },
  { file: "_Group_.png", alt: "_Group_" },
  { file: "Airus logo_Original@4x.png", alt: "Airus logo_Original@4x" },
  { file: "Green Logo 3.png", alt: "Green Logo 3" },
  { file: "Group 1000002555.png", alt: "Group 1000002555" },
  { file: "Group 1000002556.png", alt: "Group 1000002556" },
  { file: "Group 1000002557.png", alt: "Group 1000002557" },
  { file: "Group 1000002558.png", alt: "Group 1000002558" },
  { file: "Group 1000002559.png", alt: "Group 1000002559" },
  { file: "Group 1000002561.png", alt: "Group 1000002561" },
  { file: "Group 1000002563.png", alt: "Group 1000002563" },
  { file: "Group 1000002567.png", alt: "Group 1000002567" },
  { file: "Group 1000002568.png", alt: "Group 1000002568" },
  { file: "Group 1000002569.png", alt: "Group 1000002569" },
  { file: "Group 1000002571.png", alt: "Group 1000002571" },
  { file: "Group 109.png", alt: "Group 109" },
  { file: "Group 120.png", alt: "Group 120" },
  { file: "Group 180.png", alt: "Group 180" },
  { file: "Group 4.png", alt: "Group 4" },
  { file: "Group 577.png", alt: "Group 577" },
  { file: "Group 76.png", alt: "Group 76" },
  { file: "Layer 1-2 5.png", alt: "Layer 1 2 5" },
  { file: "Layer_1-2 (1).png", alt: "Layer_1 2 (1)" },
  { file: "Layer_1-2 1.png", alt: "Layer_1 2 1" },
  { file: "Layer_1-2.png", alt: "Layer_1 2" },
  { file: "logo 16.png", alt: "logo 16" },
  { file: "Website-1 2.png", alt: "Website 1 2" },
  { file: "windoorkraftlogo.png", alt: "windoorkraftlogo" },
].map((logo) => ({
  src: assetUrl(`/images/clients/${logo.file}`),
  alt: logo.alt,
}));

const AUTO_SPEED = 0.45; // px per frame

/**
 * Brand band — Figma 1804:1902 + client logos 1875:6522
 * Infinite auto-scroll + manual drag.
 * Visible: 3 (mobile) / 6 (tablet) / 9 (desktop).
 */
export function BrandBand() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const wrapOffset = () => {
      const half = track.scrollWidth / 2;
      if (half <= 0) return;
      while (offsetRef.current <= -half) offsetRef.current += half;
      while (offsetRef.current > 0) offsetRef.current -= half;
    };

    const apply = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const tick = () => {
      if (!draggingRef.current && !reducedMotionRef.current) {
        offsetRef.current -= AUTO_SPEED;
        wrapOffset();
        apply();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onPointerDown = (event: PointerEvent) => {
      draggingRef.current = true;
      startXRef.current = event.clientX;
      startOffsetRef.current = offsetRef.current;
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

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const loop = [...clientLogos, ...clientLogos];

  return (
    <FadeUp y={28}>
      <section
        aria-label="Client logos"
        className="relative w-full overflow-hidden bg-black"
        style={{
          aspectRatio: "1920 / 581",
          maxHeight: "36.3125rem",
        }}
      >
        {/* Background — glow + THE (full-bleed; no negative margin / bleed into hero) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetUrl("/images/home/Group 645.png")}
          alt=""
          width={7680}
          height={3088}
          className="pointer-events-none absolute inset-0 z-0 size-full max-w-none select-none object-cover object-center"
          draggable={false}
        />

        {/* Logos — centered; 3 / 6 / 9 visible; auto + drag */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max cursor-grab items-center active:cursor-grabbing"
              style={{ touchAction: "none", userSelect: "none" }}
            >
              {loop.map((logo, index) => (
                <div
                  key={`${logo.src}-${index}`}
                  className="flex w-[calc(100vw/3)] shrink-0 items-center justify-center px-[clamp(0.35rem,0.8vw,1rem)] md:w-[calc(100vw/6)] lg:w-[calc(100vw/9)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    draggable={false}
                    className="pointer-events-none h-[clamp(2.1rem,3.84vw,4.2rem)] w-auto max-w-[85%] object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
