import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `2273:1351` (1920×4867).
 * Single group export (desk + Mahesh site overlays) — same Safari/How To pattern.
 * Avoids layered crops leaking the reused HBB desk screen content.
 */
export function MaheshBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/4867] w-full max-w-[1920px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/mahesh-agencies/brand-moment.png"
            alt="Mahesh Agencies website on a laptop with continuing page scroll"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
