import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Logo applications / identity pair — Figma `1980:5423`, `1980:5435`
 */
export function HowtoIdentity() {
  return (
    <section aria-label="Logo identity applications" className="bg-black">
      <div className="mx-auto grid w-full max-w-[1920px] gap-[clamp(1rem,3.02vw,3.625rem)] px-4 lg:grid-cols-2 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(1.5rem,2.5vw,3rem)]">
        <FadeUp>
          <div className="relative aspect-[811/882] w-full overflow-hidden">
            <Image
              src="/images/case-studies/howto/identity-left.png"
              alt="howTo. logo applications — badges and monogram"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="relative aspect-[811/882] w-full overflow-hidden">
            <Image
              src="/images/case-studies/howto/identity-right.png"
              alt="howTo. outdoor building signage"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
