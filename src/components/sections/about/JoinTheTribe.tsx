import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Join the tribe CTA — Figma `1892:2107` (Group 1000002592)
 * Orange radial band (`bg-mediverse`) · H2 Power Grotesk 80 · body 22 · black pill · media 405×720
 * Parent group `1892:2108` also includes the site footer — footer is NOT rebuilt here.
 */
export function JoinTheTribe() {
  return (
    <section aria-label="Join the tribe" className="bg-mediverse text-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-[clamp(2rem,3.125vw,3.75rem)] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,3.125vw,3.75rem)] lg:min-h-[clamp(28rem,40.625vw,48.75rem)] lg:flex-row lg:items-start lg:justify-between lg:gap-[clamp(2rem,4.17vw,5rem)] lg:py-0">
        <FadeUp className="flex min-w-0 flex-1 flex-col gap-[clamp(1.25rem,1.56vw,1.875rem)] lg:self-center">
          <h2 className="text-display leading-[normal] text-white max-md:!text-[32px] md:max-lg:!text-[2.625rem]">
            Join the tribe.
          </h2>

          <p className="text-body max-w-[clamp(20rem,46.875vw,56.25rem)] leading-[normal] font-normal text-white">
            At Theories, you get to define your career path and sky&apos;s the
            limit. If you&apos;re someone who&apos;s your own boss and always on
            the lookout for the next big thing, we&apos;d love to meet you.
          </p>

          <Link
            href="/careers"
            className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] w-fit items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-black px-[clamp(1.25rem,1.56vw,1.875rem)] text-white"
          >
            Explore Careers
          </Link>
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
