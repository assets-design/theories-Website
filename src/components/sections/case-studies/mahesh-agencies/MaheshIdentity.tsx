import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Logo + colour palette band — Figma `2263:1118`
 */
export function MaheshIdentity() {
  return (
    <section aria-label="Brand identity and colours" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/mahesh-agencies/identity-v2.png"
            alt="Mahesh Agencies logo on white with red and blue brand colour blocks"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
