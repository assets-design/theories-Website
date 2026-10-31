import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed billboard — Figma `1980:5419`
 */
export function HowtoBillboard() {
  return (
    <section aria-label="Billboard signage" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/howto/billboard.png"
            alt="we know howTo. skyrocket your business billboard"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
