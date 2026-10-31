import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing device moment — Figma `1966:5254`
 */
export function RpplBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <div className="relative mx-auto aspect-[1536/1024] w-full max-w-[clamp(40rem,80vw,96rem)] overflow-hidden">
            <Image
              src="/images/case-studies/rppl/closing.png"
              alt="RPPL Motor Racing website on laptop — Igniting Speed hero"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain object-center"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
