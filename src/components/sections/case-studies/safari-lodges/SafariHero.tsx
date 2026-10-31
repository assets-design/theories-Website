import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Safari Lodges India case study hero — Figma `2037:997`
 * Title only; laptop mockup lives in SafariLanding after Social.
 */
export function SafariHero() {
  return (
    <section
      aria-label="Safari Lodges India case study hero"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(1rem,1.56vw,1.875rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(20rem,74.48vw,89.375rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Safari Lodges India
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            UI/UX Design &amp; Web Development
          </h1>
        </FadeUp>
      </div>
    </section>
  );
}
