import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Colour palette band — Figma `1981:5546`
 */
export function HowtoColours() {
  return (
    <section aria-label="Brand colours" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/howto/colours.png"
            alt="howTo. colour palette — ocean blue, sky blue, and clean white"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
