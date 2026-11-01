import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Responsive UI phones — Figma `2316:507` (1680×800) screenshot as-is.
 */
export function CelesteUiPhones() {
  return (
    <section aria-label="Celeste mobile UI" className="bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 pb-[clamp(2.5rem,4.17vw,5rem)] lg:px-[clamp(1rem,6.875vw,16.25rem)]">
        <FadeUp>
          <div className="relative mx-auto aspect-[1680/800] w-full max-w-[clamp(920px,72.7vw,1396px)] max-lg:aspect-[16/10]">
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
