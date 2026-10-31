"use client";

import Image from "next/image";
import { useContactPopup } from "@/components/contact/ContactPopupContext";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Services2 closing CTA — Figma Ready-to-build band (`2117:560`) visuals,
 * authoritative closing copy (not Figma “Ready to build yours?”).
 */
export function Services2Cta() {
  const { open: openContact } = useContactPopup();

  return (
    <section aria-label="Not sure which stage" className="bg-mediverse text-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-[clamp(2rem,3.125vw,3.75rem)] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,3.125vw,3.75rem)] lg:min-h-[clamp(28rem,40.625vw,48.75rem)] lg:flex-row lg:items-start lg:justify-between lg:gap-[clamp(2rem,4.17vw,5rem)] lg:py-0">
        <FadeUp className="flex min-w-0 flex-1 flex-col gap-[clamp(1.25rem,2.5vw,2.5rem)] lg:self-center">
          <h2 className="text-h2 max-w-[clamp(18rem,40vw,48rem)] leading-[normal] text-white max-md:!text-[28px] md:max-lg:!text-[2.625rem]">
            Not sure which stage you&apos;re at?
          </h2>
          <p className="max-w-[clamp(18rem,36vw,40rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] font-normal leading-[1.445] text-white/90">
            Most clients aren&apos;t. Tell us what&apos;s not working and we&apos;ll
            point you to the right one, even if it isn&apos;t us.
          </p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-[clamp(0.75rem,1.56vw,1.875rem)]">
            <button
              type="button"
              onClick={openContact}
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] w-fit items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-black px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white"
            >
              Start a conversation
            </button>
          </div>
        </FadeUp>

        <FadeUp
          delay={120}
          className="relative aspect-[405/720] w-full max-w-[clamp(16rem,21.09vw,25.3125rem)] shrink-0 self-center overflow-hidden lg:self-start"
        >
          <Image
            src="/images/services2/cta-workspace.png"
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
