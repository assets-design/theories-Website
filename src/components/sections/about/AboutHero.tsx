import { FadeUp } from "@/components/motion/FadeUp";

/**
 * About / Agency hero — Figma `1892:2101` (Group 1000002589)
 * Black band 1920×1109 · H1 Power Grotesk 64 · body Poppins 20 · media 1222×541 bottom-right
 */
export function AboutHero() {
  return (
    <section aria-label="About" className="bg-black text-white">
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col">
        <div className="px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)]">
          <FadeUp immediate y={28}>
            <h1 className="text-h2 max-w-[clamp(20rem,69.17vw,83rem)] leading-[normal] text-white max-md:!text-[32px] md:max-lg:!text-[2.625rem]">
              {/* Mobile — exact 3 lines */}
              <span className="md:hidden">
                <span className="inline-block whitespace-nowrap">
                  Driving startup growth
                </span>
                <br />
                <span className="inline-block whitespace-nowrap">
                  crafting your brand
                </span>
                <br />
                <span className="inline-block whitespace-nowrap">
                  with precision &amp; impact
                </span>
              </span>
              {/* md+ — tablet natural / desktop 2-line break */}
              <span className="hidden md:inline">
                Driving startup growth crafting your brand
                <br className="hidden lg:block" />
                <span className="lg:inline"> </span>
                with precision &amp; impact
              </span>
            </h1>
          </FadeUp>

          <FadeUp immediate delay={120} y={28}>
            <p className="mt-[clamp(1rem,1.56vw,1.875rem)] w-full max-w-none font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.04vw,1.25rem)] leading-[normal] font-normal text-[rgba(255,255,255,0.8)]">
              We specialize in accelerating startup growth by building strong,
              memorable brands with a strategic
              <br className="hidden lg:block" />
              blend of creativity and precision, delivering impactful solutions
              that resonate with your target
              <br className="hidden lg:block" />
              audience and drive success.
            </p>
          </FadeUp>
        </div>

        {/*
          Figma media: x=579 y=568 w=1222 h=541 — bottom-aligned, right inset ≈ gutter (120).
          Desktop: right-aligned under copy. Mobile/tablet: full-bleed within gutter, stacks below.
        */}
        <FadeUp
          immediate
          delay={220}
          y={28}
          className="mt-[clamp(1.5rem,1.56vw,1.875rem)] w-full px-[clamp(1.25rem,6.25vw,7.5rem)] lg:mt-[clamp(1rem,1.56vw,1.875rem)] lg:flex lg:justify-end lg:px-0 lg:pr-[clamp(1.25rem,6.25vw,7.5rem)]"
        >
          <div className="relative aspect-[1222/541] w-full overflow-hidden lg:w-[clamp(40rem,63.65vw,76.375rem)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about/hero-team.png"
              alt="Theories Consulting team collaborating in the studio"
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
