"use client";

import { useEffect, useRef } from "react";
import { SERVICES2_STAGES } from "./data";
import { ServiceStageSection } from "./ServiceStageSection";

/**
 * Header geometry (see Header.tsx):
 *   fixed top = clamp(12px, 1.56vw, 30px)
 *   pill height = clamp(56px, 4.375vw, 84px)  (h-14 on small screens)
 * Stack stages pin to the bottom edge of that pill.
 */
const STACK_TOP =
  "calc(clamp(12px, 1.56vw, 30px) + clamp(56px, 4.375vw, 84px))";

const LG_MQ = "(min-width: 1024px)";
const REDUCE_MQ = "(prefers-reduced-motion: reduce)";

/** Scroll distance to slide a card fully in, as a multiple of panel height (>1 = slower). */
const ENTRANCE_MULT = 1.35;
/** Extra scroll after a card is fully in, before the next entrance starts. */
const SETTLE_MULT = 0.65;
/** Light dampening toward scroll targets — keep low so motion stays scroll-tied. */
const LERP = 0.32;

function measureHeaderBottom(): number {
  const w = window.innerWidth;
  const top = Math.min(30, Math.max(12, w * 0.0156));
  const pill =
    w >= 1024
      ? Math.min(84, Math.max(56, w * 0.04375))
      : 56; /* h-14 */
  return top + pill;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function clearPinStyles(
  panels: (HTMLElement | null)[],
  slots: (HTMLElement | null)[],
) {
  for (const panel of panels) {
    if (!panel) continue;
    panel.style.position = "";
    panel.style.top = "";
    panel.style.left = "";
    panel.style.right = "";
    panel.style.width = "";
    panel.style.transform = "";
    panel.style.opacity = "";
    panel.style.transformOrigin = "";
    panel.style.willChange = "";
  }
  for (const slot of slots) {
    if (!slot) continue;
    slot.style.height = "";
  }
}

/**
 * Four stage rows — Figma `2110:510` body (Shaping → Crafting) with scroll-stack pin.
 *
 * CSS `position: sticky` fails site-wide because `html`/`body` set `overflow-x: hidden`
 * (computes to a scroll containment that kills viewport sticky). This implements the
 * same pin + rising z-index stack with fixed positioning on lg+ only.
 *
 * Entrance is scroll-linked: next panels translateY from ~100% → 0 across an
 * extended runway (not an instant cover), with a light settle before the next stage.
 */
export function Services2Stages() {
  const stackRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const smoothProgress = useRef<number[]>([]);
  const smoothCover = useRef<number[]>([]);
  const heightsRef = useRef<number[]>([]);

  useEffect(() => {
    const lgMq = window.matchMedia(LG_MQ);
    const reduceMq = window.matchMedia(REDUCE_MQ);
    let raf = 0;

    const enabled = () => lgMq.matches && !reduceMq.matches;

    const n = SERVICES2_STAGES.length;
    smoothProgress.current = Array.from({ length: n }, () => 0);
    smoothCover.current = Array.from({ length: n }, () => 0);
    heightsRef.current = Array.from({ length: n }, () => 0);

    const measureHeights = () => {
      const panels = panelRefs.current;
      for (let i = 0; i < panels.length; i++) {
        const panel = panels[i];
        if (!panel) continue;
        // offsetHeight stays valid while fixed; content box is what we need.
        heightsRef.current[i] = panel.offsetHeight;
      }
    };

    const update = () => {
      raf = 0;
      const stack = stackRef.current;
      const slots = slotRefs.current;
      const panels = panelRefs.current;
      if (!stack) return;

      if (!enabled()) {
        clearPinStyles(panels, slots);
        smoothProgress.current.fill(0);
        smoothCover.current.fill(0);
        return;
      }

      const headerBottom = measureHeaderBottom();
      const targets: number[] = [];
      let needsSmooth = false;

      // Tall flow slots = entrance runway + settle hold.
      for (let i = 0; i < panels.length; i++) {
        const panel = panels[i];
        const slot = slots[i];
        if (!panel || !slot) {
          targets[i] = 0;
          continue;
        }

        const panelH = panel.offsetHeight || heightsRef.current[i] || 0;
        if (panelH) heightsRef.current[i] = panelH;
        slot.style.height = `${panelH * (ENTRANCE_MULT + SETTLE_MULT)}px`;
      }

      const stackRect = stack.getBoundingClientRect();

      for (let i = 0; i < panels.length; i++) {
        const panel = panels[i];
        const slot = slots[i];
        if (!panel || !slot) {
          targets[i] = 0;
          continue;
        }

        const panelH = heightsRef.current[i] || panel.offsetHeight;
        const entrance = panelH * ENTRANCE_MULT;
        const slotTop = slot.getBoundingClientRect().top;

        let target = 0;
        if (i === 0) {
          // First stage pins under the header without a slide-up entrance.
          target = slotTop <= headerBottom ? 1 : 0;
        } else {
          // Scroll-linked entrance: 0 when the slot is still `entrance` px below
          // the pin line, 1 when the slot top reaches the header.
          target = clamp((headerBottom + entrance - slotTop) / entrance, 0, 1);
        }
        targets[i] = target;

        const prev = smoothProgress.current[i] ?? 0;
        const next = prev + (target - prev) * LERP;
        // Snap when close enough so we don't soft-chase forever.
        smoothProgress.current[i] =
          Math.abs(target - next) < 0.001 ? target : next;
        if (Math.abs(smoothProgress.current[i] - target) > 0.001) {
          needsSmooth = true;
        }
      }

      for (let i = 0; i < panels.length; i++) {
        const panel = panels[i];
        const slot = slots[i];
        if (!panel || !slot) continue;

        const panelH = heightsRef.current[i] || panel.offsetHeight;
        const entrance = panelH * ENTRANCE_MULT;
        const slotTop = slot.getBoundingClientRect().top;
        const p = smoothProgress.current[i] ?? 0;
        const coverTarget = targets[i + 1] ?? 0;
        const coverPrev = smoothCover.current[i] ?? 0;
        const coverNext = coverPrev + (coverTarget - coverPrev) * LERP;
        smoothCover.current[i] =
          Math.abs(coverTarget - coverNext) < 0.001 ? coverTarget : coverNext;
        if (Math.abs(smoothCover.current[i] - coverTarget) > 0.001) {
          needsSmooth = true;
        }
        const cover = smoothCover.current[i];

        const shouldPin =
          i === 0
            ? slotTop <= headerBottom || p > 0.001
            : p > 0.001 || slotTop <= headerBottom + entrance;

        if (!shouldPin) {
          panel.style.position = "";
          panel.style.top = "";
          panel.style.left = "";
          panel.style.right = "";
          panel.style.width = "";
          panel.style.transform = "";
          panel.style.opacity = "";
          panel.style.transformOrigin = "";
          panel.style.willChange = "";
          panel.style.zIndex = String(i + 1);
          continue;
        }

        const pushUp = Math.min(0, stackRect.bottom - headerBottom - panelH);
        // First card: fully in when pinned. Later cards: slide up with progress.
        const enter = i === 0 ? 1 : p;
        const ty = (1 - enter) * panelH;
        const scale = 1 - 0.045 * cover;
        const opacity = 1 - 0.12 * cover;

        panel.style.position = "fixed";
        panel.style.top = `${headerBottom + pushUp}px`;
        panel.style.left = "0";
        panel.style.right = "0";
        panel.style.width = "100%";
        panel.style.transformOrigin = "center top";
        panel.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
        panel.style.opacity = String(opacity);
        panel.style.willChange = "transform, opacity";
        panel.style.zIndex = String(i + 1);
      }

      if (needsSmooth) {
        raf = requestAnimationFrame(update);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measureHeights();
      schedule();
    };

    measureHeights();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    lgMq.addEventListener("change", schedule);
    reduceMq.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      lgMq.removeEventListener("change", schedule);
      reduceMq.removeEventListener("change", schedule);
      if (raf) cancelAnimationFrame(raf);
      clearPinStyles(panelRefs.current, slotRefs.current);
    };
  }, []);

  return (
    <div
      ref={stackRef}
      className="services2-scroll-stack relative bg-black"
      style={{ ["--services2-stack-top" as string]: STACK_TOP }}
    >
      {SERVICES2_STAGES.map((stage, index) => (
        <div
          key={stage.id}
          ref={(el) => {
            slotRefs.current[index] = el;
          }}
          className="relative"
        >
          <div
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="w-full bg-black"
            style={{ zIndex: index + 1 }}
          >
            <ServiceStageSection stage={stage} />
          </div>
        </div>
      ))}
    </div>
  );
}
