/**
 * Instant jump to top — never smooth.
 * Required because CSS `scroll-behavior: smooth` makes bare scrollTo() animate.
 */
export function scrollToTopInstant() {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
