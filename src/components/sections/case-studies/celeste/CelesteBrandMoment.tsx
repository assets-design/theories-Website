import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `2292:3482` (1920×5528)
 * Single group export (desk + continuing scroll).
 */
export function CelesteBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/5528] w-full max-w-[1920px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/celeste/brand-moment.png"
            alt="Celeste International Schools website on a laptop with continuing page scroll"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
