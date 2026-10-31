import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Brand stationery mockup — Figma `1982:6214`
 */
export function DcasaCollateral() {
  return (
    <section aria-label="Brand collateral" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/dcasa/collateral.png"
            alt="D'CASA Suites stationery — notebooks, envelope, pens, and wooden box"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
