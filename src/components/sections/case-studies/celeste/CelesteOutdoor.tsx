import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Owning the street — Figma `1720:4845`
 */
export function CelesteOutdoor() {
  return (
    <section aria-label="Owning the street" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-lg:max-w-none lg:max-w-[clamp(18rem,51.67vw,62rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Owning the street.
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <p className="mt-[clamp(0.75rem,1.56vw,1.875rem)] max-lg:max-w-none lg:max-w-[clamp(20rem,44.79vw,53.75rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.04vw,1.25rem)] leading-[normal] text-white/80">
            Two large-format hoardings deployed across the
            Boduppal–Chengicherla corridor.
          </p>
        </FadeUp>

        <FadeUp delay={160}>
          <div className="relative mt-[clamp(1.25rem,3.125vw,3.75rem)] aspect-[1680/941] w-full overflow-hidden">
            <Image
              src="/images/case-studies/celeste/billboard.png"
              alt="Celeste outdoor billboard on Boduppal–Chengicherla corridor"
              fill
              sizes="(max-width: 1024px) 100vw, 87.5vw"
              className="object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
