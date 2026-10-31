import { FadeUp } from "@/components/motion/FadeUp";

/**
 * UI montage + brand moment — Figma `2281:1451` (1920×5955).
 * Single group export (phones, tablets, desk, continuing scroll) to avoid
 * overlay AABB gaps / HBB desk leak — same Safari / How To / Mahesh pattern.
 */
export function AirusDigital() {
  return (
    <section aria-label="Airus digital UI and website scroll" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/5955] w-full max-w-[1920px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/airus/ui-brand-montage.png"
            alt="Airus website UI on phones and tablets, with full page scroll on a laptop"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
