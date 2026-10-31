import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Primary logo + colour variants — Figma `1982:6084`
 */
export function DcasaIdentity() {
  return (
    <section aria-label="Brand identity" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden bg-white">
          <Image
            src="/images/case-studies/dcasa/logo-primary.png"
            alt="D'CASA Suites logo on white, gold, and brown backgrounds"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
