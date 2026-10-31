import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The city becomes the media plan — Figma `1720:4849`
 */
export function CelesteCityMedia() {
  return (
    <section
      aria-label="The city becomes the media plan"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-lg:max-w-none lg:max-w-[clamp(18rem,51.67vw,62rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            The city becomes the media plan.
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="relative mt-[clamp(1.25rem,3.125vw,3.75rem)] aspect-[1680/941] w-full overflow-hidden">
            <Image
              src="/images/case-studies/celeste/street-posters.png"
              alt="Celeste street posters on transit pillars under an overpass"
              fill
              sizes="(max-width: 1024px) 100vw, 87.5vw"
              className="object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
