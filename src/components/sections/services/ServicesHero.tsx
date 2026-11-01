import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Clean Agency-style hero — typography + right-weighted media.
 * No grid overlays, no glow stacks.
 */
export function ServicesHero() {
  return (
    <section aria-label="Services" className="bg-black text-white">
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col">
        <div className="px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)]">
          <FadeUp immediate y={28}>
            <h1 className="text-h2 max-w-[clamp(20rem,62vw,74rem)] leading-[normal] text-white max-md:!text-[32px] md:max-lg:!text-[2.625rem]">
              The work we do —
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              shaped around the decision it serves.
            </h1>
          </FadeUp>

          <FadeUp immediate delay={120} y={28}>
            <p className="mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[clamp(22rem,48vw,46rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.04vw,1.25rem)] leading-[normal] text-white/80">
              Four stages. Most brands need two or three. A few need all of
              them. We start where the business actually is — then build what
              moves it forward.
            </p>
          </FadeUp>
        </div>

        <FadeUp
          immediate
          delay={200}
          y={28}
          className="mt-[clamp(1.5rem,2.2vw,2.75rem)] w-full px-[clamp(1.25rem,6.25vw,7.5rem)] lg:mt-[clamp(1.25rem,2vw,2.5rem)] lg:flex lg:justify-end lg:px-0 lg:pr-[clamp(1.25rem,6.25vw,7.5rem)]"
        >
          <div className="relative aspect-[1222/541] w-full overflow-hidden lg:w-[clamp(40rem,63.65vw,76.375rem)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/services2/stage-dashboard.png"
              alt="Theories digital product and brand work"
              width={1222}
              height={541}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
