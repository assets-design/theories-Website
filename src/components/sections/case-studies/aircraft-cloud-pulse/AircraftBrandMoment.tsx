import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `2386:1492`
 * Group export (desk + scroll overlay) @2x.
 */
export function AircraftBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        {/* Figma group 2386:1492 — 1920×7071 @1x (asset @2x 3840×14142) */}
        <div className="relative mx-auto aspect-[1920/7071] w-full max-w-[1920px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/aircraft-cloud-pulse/brand-moment.png"
            alt="Aircraft Cloud website on a laptop with continuing page scroll"
            className="absolute inset-0 size-full object-contain object-top"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
