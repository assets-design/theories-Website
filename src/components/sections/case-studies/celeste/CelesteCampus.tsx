import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Campus hero image — Figma `2281:1509`
 */
export function CelesteCampus() {
  return (
    <section aria-label="Celeste campus" className="bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2rem,3.125vw,3.75rem)]">
        <FadeUp>
          <div className="relative aspect-[1680/541] w-full overflow-hidden max-lg:aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/celeste/campus-v2.png"
              alt="Aerial view of Celeste International Schools campus with running track"
              className="absolute inset-0 size-full object-cover object-center"
              draggable={false}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
