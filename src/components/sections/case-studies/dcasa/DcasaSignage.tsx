import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Exterior building signage — Figma `1982:6215`
 */
export function DcasaSignage() {
  return (
    <section aria-label="Exterior signage" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/dcasa/signage.png"
            alt="D'CASA Suites metallic exterior signage on building facade"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
