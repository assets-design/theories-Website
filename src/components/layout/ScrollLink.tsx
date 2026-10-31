"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToTopInstant } from "@/lib/scrollToTopInstant";

type ScrollLinkProps = ComponentProps<typeof Link>;

/**
 * next/link that jumps to top instantly on click (before next page paint).
 * Use for primary nav so soft navigations never open mid/bottom scroll.
 */
export function ScrollLink({ onClick, ...props }: ScrollLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Modified clicks open a new tab — leave scroll alone.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      onClick?.(event);
      return;
    }

    scrollToTopInstant();
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
