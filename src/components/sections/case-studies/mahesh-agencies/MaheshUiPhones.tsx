"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Mobile UI phone row — Figma `2283:550` (1681×735) screenshot as-is.
 */
const uiPhones = [
  {
    src: "/images/case-studies/mahesh-agencies/ui-phone-1-v2.png",
    alt: "Mahesh Agencies mobile UI — home search",
  },
  {
    src: "/images/case-studies/mahesh-agencies/ui-phone-2-v2.png",
    alt: "Mahesh Agencies mobile UI — locations",
  },
  {
    src: "/images/case-studies/mahesh-agencies/ui-phone-3-v2.png",
    alt: "Mahesh Agencies mobile UI — genuine parts",
  },
  {
    src: "/images/case-studies/mahesh-agencies/ui-phone-4-v2.png",
    alt: "Mahesh Agencies mobile UI — contact",
  },
] as const;

export function MaheshUiPhones() {
  return (
    <section aria-label="Mahesh Agencies mobile UI" className="bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 pb-[clamp(2.5rem,4.17vw,5rem)] lg:px-[clamp(1rem,6.875vw,16.25rem)]">
        <FadeUp className="relative mx-auto hidden aspect-[1681/735] w-full max-w-[clamp(920px,72.7vw,1396px)] lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/mahesh-agencies/ui-phones-row-figma.png"
            alt="Mahesh Agencies mobile UI screens on four phones"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </FadeUp>

        <div
          className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {uiPhones.map((phone) => (
            <div key={phone.src} className="w-[70%] shrink-0 snap-start sm:w-[42%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phone.src}
                alt={phone.alt}
                className="h-auto w-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
