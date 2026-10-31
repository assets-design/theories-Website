import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Logo construction — Figma `1982:6073`
 */
export function DcasaConstruction() {
  return (
    <section aria-label="Logo construction" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden bg-white">
          <Image
            src="/images/case-studies/dcasa/logo-construction.png"
            alt="D'CASA logo construction — letter D plus door gateway equals logo element"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
