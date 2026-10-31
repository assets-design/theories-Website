import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed brand moment — Figma `1720:5048`
 */
export function HbbBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1304] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/hbb/brand-moment.jpg"
            alt="Hyderabad Black Birds racing branding — cars and drivers"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
