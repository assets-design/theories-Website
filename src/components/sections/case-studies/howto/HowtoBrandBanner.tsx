import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed brand logo banner — Figma `2239:814`
 */
export function HowtoBrandBanner() {
  return (
    <section aria-label="How To brand identity" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/696] w-full max-w-[1920px] overflow-hidden bg-white max-lg:aspect-[16/10]">
          <Image
            src="/images/case-studies/howto/hero.png"
            alt="howTo. brand logo on white"
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
