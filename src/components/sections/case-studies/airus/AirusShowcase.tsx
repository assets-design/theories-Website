import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-bleed bottle mockup — Figma `1982:5917`
 */
export function AirusShowcase() {
  return (
    <section aria-label="Product showcase" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/airus/bottle-showcase-v2.png"
            alt="Airus 1L mineral water bottle lying diagonally with branded label"
            className="absolute inset-0 size-full object-cover object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
