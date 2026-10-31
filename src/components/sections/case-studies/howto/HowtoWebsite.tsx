import { FadeUp } from "@/components/motion/FadeUp";



/**

 * Website scroll / brand moment — Figma `2255:1033` (1920×3532 group export).

 * Single composite (desk + laptop + page scroll) to avoid overlay AABB gaps.

 */

export function HowtoWebsite() {

  return (

    <section aria-label="How To website scroll" className="bg-black">

      <FadeUp>

        <div className="relative mx-auto aspect-[1920/3532] w-full max-w-[1920px]">

          {/* eslint-disable-next-line @next/next/no-img-element */}

          <img

            src="/images/case-studies/howto/website-scroll.png"

            alt="howTo. website on a laptop with continuing page scroll"

            className="absolute inset-0 size-full object-contain object-center"

            draggable={false}

          />

        </div>

      </FadeUp>

    </section>

  );

}


