import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Logo identity + collateral + tablet — Figma `2354:809`, `2342:666`
 */
export function EswapIdentity() {
  return (
    <section aria-label="Eswap logo designing" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(16rem,34.27vw,41.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Eswap Logo Designing
          </h2>
        </FadeUp>
      </div>

      <FadeUp>
        <div className="relative mx-auto mt-[clamp(1.25rem,3.125vw,3.75rem)] aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/eswap/identity-v3.png"
            alt="Eswap Swap logo on white with ticket-stub motif"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>

      <div className="mx-auto grid w-full max-w-[1920px] gap-[clamp(1rem,3.02vw,3.625rem)] px-4 lg:grid-cols-2 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(1.5rem,2.5vw,3rem)]">
        <FadeUp>
          <div className="relative aspect-[811/882] w-full overflow-hidden">
            <Image
              src="/images/case-studies/eswap/phone-v3.png"
              alt="Eswap app icon on an iPhone home screen"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="relative aspect-[811/882] w-full overflow-hidden">
            <Image
              src="/images/case-studies/eswap/tote-v3.png"
              alt="Black Eswap tote bag with red handles and logo print"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
      </div>

      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          <Image
            src="/images/case-studies/eswap/tablet-v3.png"
            alt="Eswap website on a tablet — Esports World Cup interface"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </section>
  );
}
