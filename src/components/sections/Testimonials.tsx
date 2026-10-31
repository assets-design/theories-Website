"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import { FadeUp } from "@/components/motion/FadeUp";

type Testimonial = {
  name: string;
  quote: string;
  image: string;
  imageAlt: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Madhu Velugu",
    quote:
      '"Working with this creative agency was an absolute game-changer! Their designs wow, their strategies drive real results, and their creativity shines in every project. Professional, innovative, and truly dedicated to excellence—highly recommended for anyone looking to elevate their brand!"',
    image: "/images/testimonials/madhu-velugu.jpg",
    imageAlt: "Madhu Velugu",
  },
  {
    name: "Priya Nair",
    quote:
      '"Theories helped us redefine our brand from the ground up. The strategy was sharp, the visual system felt unmistakably ours, and every touchpoint finally spoke with one clear voice. A partner we trust with the long game."',
    image: "/images/testimonials/madhu-velugu.jpg",
    imageAlt: "Priya Nair",
  },
  {
    name: "James Okonkwo",
    quote:
      '"From positioning workshops to the final identity rollout, the team brought clarity and craft in equal measure. Our launch assets looked premium, and the brand guidelines keep our internal teams aligned every day."',
    image: "/images/testimonials/madhu-velugu.jpg",
    imageAlt: "James Okonkwo",
  },
  {
    name: "Sofia Reyes",
    quote:
      '"We needed a branding partner who understood both aesthetics and business outcomes. Theories delivered a cohesive identity, thoughtful messaging, and a design system our product team could actually ship with."',
    image: "/images/testimonials/madhu-velugu.jpg",
    imageAlt: "Sofia Reyes",
  },
  {
    name: "Arjun Mehta",
    quote:
      '"Their process is rigorous without being rigid. The brand strategy unlocked decisions we had been circling for months, and the creative execution turned those decisions into something customers notice and remember."',
    image: "/images/testimonials/madhu-velugu.jpg",
    imageAlt: "Arjun Mehta",
  },
  {
    name: "Elena Vasquez",
    quote:
      '"Collaborating with Theories felt like adding a senior brand team overnight. Thoughtful direction, polished design, and a strategy that still guides our campaigns months after the rebrand went live."',
    image: "/images/testimonials/madhu-velugu.jpg",
    imageAlt: "Elena Vasquez",
  },
];

type Direction = "next" | "prev";

/**
 * Testimonials — Figma 1804:1906
 * Portrait 624×560 + white panel 826×560 · vertical nav (outline ↑ / 6 dots / filled ↓)
 * Mobile: horizontal text slide · md+: vertical text slide (image stays put)
 *
 * Note: Tailwind v4 translate-* utilities set the CSS `translate` property
 * (not `transform`). Transitions + transitionend must target `translate`.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  /** -1 exit/enter along next axis, 0 settled, 1 along prev axis */
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const busyRef = useRef(false);
  /** idle | exiting | entering — prevents double swap from timer + transitionend */
  const phaseRef = useRef<"idle" | "exiting" | "entering">("idle");
  const reducedMotionRef = useRef(false);
  const pendingIndexRef = useRef(0);
  const directionRef = useRef<Direction>("next");
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = testimonials[index];
  const count = testimonials.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  const clearFallback = () => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const finishEnter = useCallback(() => {
    clearFallback();
    phaseRef.current = "idle";
    busyRef.current = false;
    // Guarantee active slide is fully visible if transitionend was missed
    setOffset(0);
    setAnimate(true);
  }, []);

  const swapAndEnter = useCallback(() => {
    if (phaseRef.current !== "exiting") return;
    phaseRef.current = "entering";
    clearFallback();

    // Swap content off-axis (no transition), then animate into place
    setAnimate(false);
    setIndex(pendingIndexRef.current);
    setOffset(directionRef.current === "next" ? 1 : -1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
        setOffset(0);
        // Enter settle safety net
        fallbackTimerRef.current = setTimeout(finishEnter, 400);
      });
    });
  }, [finishEnter]);

  const goTo = useCallback(
    (nextIndex: number, dir: Direction) => {
      if (nextIndex === index || busyRef.current) return;

      if (reducedMotionRef.current) {
        setIndex(nextIndex);
        setOffset(0);
        setAnimate(false);
        phaseRef.current = "idle";
        return;
      }

      busyRef.current = true;
      phaseRef.current = "exiting";
      pendingIndexRef.current = nextIndex;
      directionRef.current = dir;
      setAnimate(true);
      // Exit: next → up / left (−1); prev → down / right (+1)
      setOffset(dir === "next" ? -1 : 1);

      clearFallback();
      // If transitionend never fires, still complete the swap
      fallbackTimerRef.current = setTimeout(swapAndEnter, 400);
    },
    [index, swapAndEnter],
  );

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    // Tailwind v4 translate-* uses CSS `translate`, not `transform`
    if (e.propertyName !== "translate") return;

    if (phaseRef.current === "entering" || offset === 0) {
      finishEnter();
      return;
    }

    if (phaseRef.current === "exiting") {
      swapAndEnter();
    }
  };

  const goPrev = () => goTo((index - 1 + count) % count, "prev");
  const goNext = () => goTo((index + 1) % count, "next");

  const goDot = (i: number) => {
    if (i === index) return;
    const forward = (i - index + count) % count;
    const backward = (index - i + count) % count;
    goTo(i, forward <= backward ? "next" : "prev");
  };

  // next (−1): mobile exits left / enters from right; md+ exits up / enters from below
  // prev (+1): mobile exits right / enters from left; md+ exits down / enters from above
  // Opacity stays at 100 — a stuck offset must never blank the white panel.
  const textMotionClass =
    offset === 0
      ? "translate-x-0 translate-y-0"
      : offset < 0
        ? "max-md:-translate-x-full max-md:translate-y-0 md:translate-x-0 md:-translate-y-full"
        : "max-md:translate-x-full max-md:translate-y-0 md:translate-x-0 md:translate-y-full";

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2rem,5.625vw,6.75rem)] pb-[clamp(2.5rem,5.2vw,6.25rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,44.27vw,53.125rem)] leading-[normal] max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Delivering service excellence
            <br className="hidden sm:block" /> our clients depend on
          </h2>
        </FadeUp>

        {/* Figma: ~60px from H2 bottom to card */}
        <FadeUp delay={100}>
          <div className="mt-[clamp(1.25rem,3.125vw,3.75rem)] flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-[clamp(2.5rem,5.05vw,6.0625rem)]">
            {/* Card — 1450 wide @ 1920 (624 + 826) */}
            <div className="flex min-w-0 w-full max-w-[clamp(40rem,75.52vw,90.625rem)] flex-col overflow-hidden md:flex-row">
              <div className="relative w-full shrink-0 overflow-hidden aspect-[624/560] md:h-[clamp(15.4rem,22.46vw,26.95rem)] md:w-[clamp(18rem,32.5vw,39rem)] md:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  className="absolute inset-0 size-full object-cover object-[20%_center]"
                />
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-start overflow-hidden bg-white px-[clamp(1.25rem,3.125vw,3.75rem)] pt-[clamp(1.5rem,3.125vw,3.75rem)] pb-[clamp(1.5rem,3.125vw,3.75rem)] text-black md:h-[clamp(15.4rem,22.46vw,26.95rem)] md:justify-center">
                <div
                  onTransitionEnd={handleTransitionEnd}
                  className={`will-change-[translate] ${textMotionClass} ${
                    animate
                      ? "transition-[translate] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      : "transition-none"
                  }`}
                >
                  {/* Quote mark + rule + name — Figma Group 367 */}
                  <div className="flex h-[clamp(1.75rem,1.82vw,2.1875rem)] items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
                    <span
                      className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.125vw,3.75rem)] leading-none tracking-[0.03em] text-black"
                      aria-hidden
                    >
                      “
                    </span>
                    <span
                      className="h-px min-w-0 flex-1 bg-[#686868]/70"
                      aria-hidden
                    />
                    <span className="shrink-0 font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.9375vw,1.125rem)] font-normal capitalize leading-none tracking-[0.03em] text-black">
                      {active.name}
                    </span>
                  </div>

                  <p className="mt-[clamp(0.75rem,2.14vw,2.5625rem)] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] font-normal leading-[1.55] tracking-[0.03em] text-black capitalize">
                    {active.quote}
                  </p>
                </div>
              </div>
            </div>

            {/* Vertical nav — Figma Group 534 */}
            <div className="flex shrink-0 items-center justify-center gap-4 self-center lg:w-[clamp(3.5rem,3.65vw,4.375rem)] lg:flex-col lg:gap-[clamp(1.25rem,2vw,2.4rem)]">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="size-[clamp(2.75rem,3.65vw,4.375rem)] shrink-0 border-0 bg-transparent p-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/testimonial-arrow-up.svg"
                  alt=""
                  width={71}
                  height={70}
                  className="size-full max-md:-rotate-90"
                />
              </button>

              <div
                className="flex items-center gap-2 lg:h-[clamp(4rem,4.79vw,5.75rem)] lg:flex-col lg:justify-center lg:gap-[10px]"
                role="tablist"
                aria-label="Testimonial slides"
              >
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => goDot(i)}
                    className={`rounded-full border-0 p-0 ${
                      i === index
                        ? "size-[10px] bg-white lg:size-[12px]"
                        : "size-[7px] bg-white/45 lg:size-[8px]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="size-[clamp(2.75rem,3.65vw,4.375rem)] shrink-0 border-0 bg-transparent p-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/testimonial-arrow-down.svg"
                  alt=""
                  width={71}
                  height={70}
                  className="size-full max-md:-rotate-90"
                />
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
