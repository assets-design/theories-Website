import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Mid-page device showcase — Figma `2014:488`
 */
export function AmolShowcase() {
  return (
    <section aria-label="Website showcase" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <div className="relative mx-auto aspect-[1447/935] w-full max-w-[clamp(40rem,75.36vw,90.4375rem)] overflow-hidden">
            <Image
              src="/images/case-studies/amol/featured.png"
              alt="Amol Realtors website on a laptop — commercial real estate hero"
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-contain"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
