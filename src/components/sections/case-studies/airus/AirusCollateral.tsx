import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Pattern + bottle in hand — Figma `1982:5918`, `1982:5919`
 */
export function AirusCollateral() {
  return (
    <section aria-label="Brand collateral" className="bg-black">
      <div className="mx-auto grid w-full max-w-[1920px] gap-[clamp(1rem,3.02vw,3.625rem)] px-4 lg:grid-cols-2 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(1.5rem,2.5vw,3rem)]">
        <FadeUp>
          <div className="relative aspect-[811/882] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/airus/pattern-v2.png"
              alt="Airus brand pattern — interlocking A and droplet motifs on blue"
              className="absolute inset-0 size-full object-cover object-center"
              draggable={false}
            />
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="relative aspect-[811/882] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/airus/bottle-hand-v2.png"
              alt="Hand holding Airus water bottle with blue logo label"
              className="absolute inset-0 size-full object-cover object-center"
              draggable={false}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
