import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Aircraft Cloud & Aircraft Pulse case study hero — Figma `2173:554`
 * Figma title still reads “Safari Lodges India”; corrected to brand name
 * (same pattern as Safari correcting leftover “JCN Consulting”).
 */
export function AircraftHero() {
  return (
    <section
      aria-label="Aircraft Cloud & Aircraft Pulse case study hero"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(1rem,1.56vw,1.875rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(20rem,74.48vw,89.375rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Aircraft Cloud &amp; Aircraft Pulse
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            UI/UX Design &amp; Web Development
          </h1>
        </FadeUp>
      </div>
    </section>
  );
}
