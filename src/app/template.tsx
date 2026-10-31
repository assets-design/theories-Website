"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { scrollToTopInstant } from "@/lib/scrollToTopInstant";

/**
 * App Router templates remount on navigation. Reset scroll before paint
 * and key children by pathname so FadeUp / motion remount fresh at top.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    scrollToTopInstant();

    const raf = requestAnimationFrame(() => {
      scrollToTopInstant();
    });
    queueMicrotask(() => {
      scrollToTopInstant();
    });
    const timeout = window.setTimeout(() => {
      scrollToTopInstant();
    }, 0);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return <div key={pathname}>{children}</div>;
}
