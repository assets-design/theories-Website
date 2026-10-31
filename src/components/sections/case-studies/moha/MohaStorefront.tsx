import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed storefront signage — Figma `1720:5393`
 */
export function MohaStorefront() {
  return (
    <section aria-label="Storefront signage" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/moha/storefront.png"
            alt="MoHa gold storefront signage on stone facade"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
