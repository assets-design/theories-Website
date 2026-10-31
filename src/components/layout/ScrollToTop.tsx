"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToTopInstant } from "@/lib/scrollToTopInstant";

const OVERFLOW_LOCK_MS = 50;

/**
 * Forces the document to the top on refresh and client navigations.
 * Uses useLayoutEffect so scroll resets before browser paint (avoids
 * briefly showing the new page at the previous scroll offset).
 * Disables the browser's automatic scroll restoration so App Router
 * soft navigations don't leave the page mid-scroll.
 *
 * Also scrolls on internal link click (capture) so the jump happens
 * before the next page paints.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  // Persist manual restoration for the whole session (refresh + soft nav).
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToTopInstant();
  }, []);

  // Capture-phase: any same-origin internal <a> click → top before paint.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        // Hash-only change on same path — let the browser handle anchors.
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash
        ) {
          return;
        }
      } catch {
        return;
      }

      scrollToTopInstant();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    // Brief lock avoids a one-frame flash at the old offset during remount.
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    scrollToTopInstant();

    const raf = requestAnimationFrame(() => {
      scrollToTopInstant();
    });
    queueMicrotask(() => {
      scrollToTopInstant();
    });
    const timeout = window.setTimeout(() => {
      scrollToTopInstant();
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    }, OVERFLOW_LOCK_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [pathname]);

  return null;
}
