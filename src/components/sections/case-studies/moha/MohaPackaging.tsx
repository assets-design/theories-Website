import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Shopping bag + outdoor pillar — Figma `1720:5398`, `1720:5410`
 */
export function MohaPackaging() {
  return (
    <section aria-label="Packaging and outdoor signage" className="bg-black">
      <div className="mx-auto grid w-full max-w-[1920px] gap-[clamp(1rem,3.125vw,3.75rem)] px-4 lg:grid-cols-[minmax(0,1062fr)_minmax(0,558fr)] lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(1.5rem,2.5vw,3rem)]">
        <FadeUp>
          <div className="relative aspect-[1062/766] w-full overflow-hidden">
            <Image
              src="/images/case-studies/moha/shopping-bag.png"
              alt="MoHa shopping bag with embroidered saree and hanger"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="relative aspect-[558/766] w-full overflow-hidden max-lg:aspect-[1062/766]">
            <Image
              src="/images/case-studies/moha/were-open.png"
              alt="MoHa outdoor pillar sign — We're Open"
              fill
              sizes="(max-width: 1024px) 100vw, 29vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
