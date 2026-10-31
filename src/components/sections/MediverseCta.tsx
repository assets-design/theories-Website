"use client";

import { useContactPopup } from "@/components/contact/ContactPopupContext";
import { FadeUp } from "@/components/motion/FadeUp";

type MediverseCtaProps = {
  headline?: string;
  description?: string;
  primaryCtaLabel?: string;
};

/**
 * Mediverse CTA — Figma 1804:1894 / 1720:4546
 * Orange radial band (`bg-mediverse`) · H2 white · black + white pills · right media 405×720
 */
export function MediverseCta({
  headline = "Have a theory worth testing?",
  description,
  primaryCtaLabel = "Let’s Begin",
}: MediverseCtaProps) {
  const { open: openContact } = useContactPopup();

  return (
    <section aria-label="Mediverse" className="bg-mediverse text-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-[clamp(2rem,3.125vw,3.75rem)] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,3.125vw,3.75rem)] lg:min-h-[clamp(28rem,40.625vw,48.75rem)] lg:flex-row lg:items-start lg:justify-between lg:gap-[clamp(2rem,4.17vw,5rem)] lg:py-0">
        <FadeUp className="flex min-w-0 flex-1 flex-col gap-[clamp(1.5rem,3.125vw,3.75rem)] lg:self-center">
          <div className="flex flex-col gap-[clamp(1rem,1.5vw,1.5rem)]">
            <h2 className="text-h2 max-w-[clamp(20rem,55.83vw,67rem)] leading-[normal] text-white max-md:!text-[30px] md:max-lg:!text-[2.625rem]">
              {headline}
            </h2>
            {description ? (
              <p className="max-w-[clamp(18rem,36vw,40rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] font-normal leading-[1.445] text-white/90">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-[clamp(0.75rem,1.56vw,1.875rem)]">
            <button
              type="button"
              onClick={openContact}
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-black px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white"
            >
              {primaryCtaLabel}
            </button>
            <a
              href="https://mediversemarketing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-white px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-black"
            >
              Explore Mediverse
            </a>
          </div>
        </FadeUp>

        <FadeUp
          delay={120}
          className="relative w-full max-w-[clamp(16rem,21.09vw,25.3125rem)] shrink-0 overflow-hidden aspect-[405/720] self-center lg:self-start"
        >
          <video
            src="/videos/db1b-05fc-4a94-aebb-e4165357410c.mp4"
            autoPlay
            muted
            loop
            playsInline
            width={405}
            height={720}
            aria-label="Mediverse — capturing the landscape"
            className="absolute inset-0 size-full object-cover"
          />
        </FadeUp>
      </div>
    </section>
  );
}
