"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  /** Delay after reveal before the transition starts (ms). */
  delay?: number;
  /** Transition duration (ms). */
  duration?: number;
  /** Initial translateY distance in px. */
  y?: number;
  /** Animate on mount (hero) instead of waiting for scroll. */
  immediate?: boolean;
  style?: CSSProperties;
};

/**
 * Soft fade-up reveal — Intersection Observer + CSS transitions.
 * Resets on route change so soft navigations re-run the animation.
 * Skips when prefers-reduced-motion.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 700,
  y = 32,
  immediate = false,
  style,
}: FadeUpProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setVisible(false);

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    if (immediate) {
      // Double rAF so the hidden state paints before revealing (transition runs).
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [immediate, reduceMotion, pathname]);

  const shown = reduceMotion || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translate3d(0, 0, 0)" : `translate3d(0, ${y}px, 0)`,
        transition: reduceMotion
          ? undefined
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: shown || reduceMotion ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
