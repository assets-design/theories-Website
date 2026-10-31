import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `2037:1100`
 *
 * Single Figma group export (desk + Safari overlays). The atmosphere plate is a
 * reused HBB desk photo with racing UI baked into the screen/scroll; layered
 * laptop/scroll crops left a gap that leaked that LUPIN content. Composite
 * matches design and avoids overlay AABB / gap issues on cutouts.
 */
export function SafariBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        {/* Figma 2037:1100 — 1920×1363 @1x; asset stored @2x. Native img, no box-shadow. */}
        <div className="relative mx-auto aspect-[1920/1363] w-full max-w-[1920px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/safari-lodges/brand-moment.png"
            alt="Safari Lodges India website on a laptop with continuing page scroll"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
