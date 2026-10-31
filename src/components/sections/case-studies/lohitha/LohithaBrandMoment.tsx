import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Closing brand / device moment — Figma `2031:986`–`2031:988`
 * Desk atmosphere with Lohitha site on the laptop screen and continuing scroll.
 * Frame group 1920×4138.
 */
export function LohithaBrandMoment() {
  return (
    <section aria-label="Brand moment" className="bg-black">
      <FadeUp>
        <div className="relative mx-auto aspect-[1920/4138] w-full max-w-[1920px] overflow-hidden">
          {/* Desk / laptop bezel atmosphere — 1920×1363 */}
          <div className="absolute top-0 left-0 aspect-[1920/1363] w-full overflow-hidden">
            <Image
              src="/images/case-studies/lohitha/brand-moment.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              aria-hidden
            />
          </div>

          {/* Laptop screen — Figma 2031:988: left 517/1920, top 38/4138, 912×641 */}
          <div className="absolute top-[0.92%] left-[26.93%] aspect-[912/641] w-[47.5%] overflow-hidden rounded-tl-[17px] rounded-tr-[16px]">
            <Image
              src="/images/case-studies/lohitha/brand-laptop.png"
              alt="Lohitha Foods website on a laptop"
              fill
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="object-cover object-top"
            />
          </div>

          {/* Continuing scroll below bezel — Figma 2031:987: left 516, top 757, 915×3381 */}
          <div className="absolute top-[18.29%] left-[26.875%] aspect-[915/3381] w-[47.66%] overflow-hidden">
            <Image
              src="/images/case-studies/lohitha/brand-scroll.png"
              alt="Lohitha Foods full website scroll"
              fill
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
