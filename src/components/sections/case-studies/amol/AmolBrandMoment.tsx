import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `2014:520` + `2014:598` + `2014:521`
 * (1920×1369 @1x). Single composite @2x: clipped desk plate + Amol screen +
 * continuing scroll — same Safari/Mahesh pattern. Replaces the raw HBB desk
 * fill (4096×3641) that `object-cover` was cropping through the bezel.
 */
export function AmolBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1369] w-full max-w-[1920px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/amol/brand-moment.png"
            alt="Amol Realtors website on a laptop with continuing page scroll"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
