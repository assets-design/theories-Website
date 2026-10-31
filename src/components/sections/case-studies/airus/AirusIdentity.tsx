import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Logo construction concept — Figma `1982:5905`
 */
export function AirusIdentity() {
  return (
    <section aria-label="Brand identity" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/1008] w-full max-w-[1920px] overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/airus/concept-v2.png"
            alt="Airus logo construction — letter A plus water droplet equals blue A mark"
            className="absolute inset-0 size-full object-cover object-center"
            draggable={false}
          />
        </div>
      </FadeUp>
    </section>
  );
}
