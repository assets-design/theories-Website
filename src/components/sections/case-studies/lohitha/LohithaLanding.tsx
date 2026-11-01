import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Lohitha Landing page — Figma `2031:831`, `2062:1249`, `2033:993`
 */
export function LohithaLanding() {
  return (
    <section aria-label="Lohitha landing page" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pt-[clamp(2.5rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Lohitha Landing page
          </h2>
        </FadeUp>

        <FadeUp delay={80}>
          <p className="mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[clamp(40rem,81.15vw,97.375rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] leading-[normal] text-white/80">
            The Lohitha landing experience brings farm-to-family storytelling onto the screen — product clarity, nutritional trust, and a warm visual system that feels local and national at once. Designed for shoppers who decide with both heart and label.
          </p>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative mt-[clamp(1.5rem,3.125vw,3.75rem)] aspect-[1680/914] w-full overflow-hidden max-lg:aspect-[16/10]">
            <Image
              src="/images/case-studies/lohitha/hero.png"
              alt="Lohitha Foods website shown on a laptop device"
              fill
              sizes="(max-width: 1024px) 100vw, 95vw"
              className="object-cover object-center"
            />
          </div>
        </FadeUp>
        </div>
      </div>
    </section>
  );
}
