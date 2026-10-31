import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Responsive UI phones — Figma `2316:507` (1680×800) screenshot as-is.
 */
export function CelesteUiPhones() {
  return (
    <section aria-label="Celeste mobile UI" className="bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <div className="relative mx-auto aspect-[1680/800] w-full max-lg:aspect-[16/10] lg:w-[64%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/ui-phones-row-figma.png"
              alt="Celeste website responsive screens on four phones"
              className="absolute inset-0 size-full object-contain object-center"
              draggable={false}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
