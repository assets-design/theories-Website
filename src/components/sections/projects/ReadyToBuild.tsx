"use client";

import Image from "next/image";
import Link from "next/link";
import { useContactPopup } from "@/components/contact/ContactPopupContext";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Ready To Build CTA — Figma `1720:5314` / Group 586 (`1720:5315`)
 * Orange radial band (`bg-mediverse`) · H2 64 · black + outlined white pills · media 405×720
 * Parent group also includes the site footer — footer is NOT rebuilt here.
 */
export function ReadyToBuild() {
  const { open: openContact } = useContactPopup();

  return (
    <section aria-label="Ready to build yours" className="bg-mediverse text-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-[clamp(2rem,3.125vw,3.75rem)] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,3.125vw,3.75rem)] lg:min-h-[clamp(28rem,40.625vw,48.75rem)] lg:flex-row lg:items-start lg:justify-between lg:gap-[clamp(2rem,4.17vw,5rem)] lg:py-0">
        <FadeUp className="flex min-w-0 flex-1 flex-col gap-[clamp(1.5rem,3.125vw,3.75rem)] lg:self-center">
          <h2 className="text-h2 max-md:max-w-none max-md:whitespace-nowrap max-w-[clamp(18rem,35vw,42rem)] capitalize leading-[normal] text-white max-md:!text-[26px] md:max-lg:!text-[2.625rem]">
            Ready To Build Yours?
          </h2>

          <div className="flex flex-row flex-wrap items-center justify-start gap-[clamp(0.75rem,1.56vw,1.875rem)]">
            <button
              type="button"
              onClick={openContact}
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] w-fit items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-black px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white"
            >
              Book a Strategy Call
            </button>
            <Link
              href="/projects"
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] w-fit items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] border border-white bg-transparent px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white"
            >
              View More Case Studies
            </Link>
          </div>
        </FadeUp>

        <FadeUp
          delay={120}
          className="relative aspect-[405/720] w-full max-w-[clamp(16rem,21.09vw,25.3125rem)] shrink-0 self-center overflow-hidden lg:self-start"
        >
          <Image
            src="/images/about/join-tribe/workspace.jpg"
            alt="Theories workspace — laptop and sticky notes on the wall"
            fill
            sizes="(max-width: 1024px) 80vw, 25vw"
            className="object-cover object-center"
          />
        </FadeUp>
      </div>
    </section>
  );
}
