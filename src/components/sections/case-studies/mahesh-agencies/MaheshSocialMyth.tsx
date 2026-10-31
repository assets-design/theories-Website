"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Three-phone myth / product row — Figma `2283:545` (1132×726 @ x=405).
 * Transparent phone PNGs; no rectangular box-shadow wrappers.
 */
const mythPhones = [
  {
    src: "/images/case-studies/mahesh-agencies/social-myth-1-v2.png",
    alt: "Mahesh Agencies phone — login screen",
    className: "left-0 top-0 z-10 w-[31.45%]",
    aspect: "356/725",
  },
  {
    src: "/images/case-studies/mahesh-agencies/social-myth-2-v2.png",
    alt: "Mahesh Agencies phone — signup screen",
    className: "left-[34.28%] top-[0.41%] z-20 w-[31.45%]",
    aspect: "356/723",
  },
  {
    src: "/images/case-studies/mahesh-agencies/social-myth-3-v2.png",
    alt: "Mahesh Agencies phone — onboarding screen",
    className: "left-[68.55%] top-[0.14%] z-30 w-[31.45%]",
    aspect: "356/724",
  },
] as const;

export function MaheshSocialMyth() {
  return (
    <section aria-label="Mahesh Agencies social product phones" className="bg-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[clamp(2rem,4.17vw,5rem)]">
        <div className="relative mx-auto hidden aspect-[1132/726] w-full max-w-[clamp(28rem,58.96vw,70.75rem)] lg:block">
          {mythPhones.map((phone, index) => (
            <FadeUp
              key={phone.src}
              delay={index * 40}
              className={`absolute ${phone.className}`}
              style={{ aspectRatio: phone.aspect }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phone.src}
                alt={phone.alt}
                className="absolute inset-0 size-full object-contain object-center"
                draggable={false}
              />
            </FadeUp>
          ))}
        </div>

        <div
          className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {mythPhones.map((phone) => (
            <div key={phone.src} className="w-[65%] shrink-0 snap-start sm:w-[40%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phone.src}
                alt={phone.alt}
                className="h-auto w-full"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
