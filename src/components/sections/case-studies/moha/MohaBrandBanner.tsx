import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed brand hero — Figma `2235:527` (Group 604)
 */
export function MohaBrandBanner() {
  return (
    <section aria-label="MoHa brand identity" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/696] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/moha/hero-clean.png"
            alt="MoHa brand identity — gold logo and lifestyle portrait on burgundy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
