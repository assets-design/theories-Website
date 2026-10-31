import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `1974:5258`–`2008:472`
 */
export function JcnBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1369] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/jcn-consulting/brand-moment.png"
            alt="JCN Consulting website on laptop — full homepage design"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
