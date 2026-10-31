import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed building signage — Figma `2263:1130`
 */
export function MaheshBuilding() {
  return (
    <section aria-label="Building signage" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/mahesh-agencies/building-v2.png"
            alt="Mahesh Agencies logo mounted on a modern office building facade"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
