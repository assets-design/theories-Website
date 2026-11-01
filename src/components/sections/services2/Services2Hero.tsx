import { FadeUp } from "@/components/motion/FadeUp";
import { SERVICES2_STAGES } from "./data";

/**
 * Services hero — Theories brand: black band, Power Grotesk H1, Poppins support.
 * Stage jump links mirror the site's editorial index pattern (projects / agency).
 */
export function Services2Hero() {
  return (
    <section aria-label="The work we do" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(18rem,58vw,70rem)] leading-[normal] text-white max-md:!text-[32px] md:max-lg:!text-[2.625rem]">
            Design that begins where the business does.
          </h1>
        </FadeUp>
        <FadeUp immediate delay={120} y={28}>
          <p className="mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[clamp(20rem,48vw,46rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] font-normal leading-[normal] text-white/80">
            Theories works across strategy, brand, digital, growth and content.
            Everything starts with the same first step: understanding the
            business decision the work needs to serve. Four stages. Most brands
            need two or three.
          </p>
        </FadeUp>

        <FadeUp immediate delay={180} y={20}>
          <nav
            aria-label="Service stages"
            className="mt-[clamp(2rem,3.5vw,4.25rem)] border-t border-white/20 pt-[clamp(1.25rem,2vw,2.5rem)]"
          >
            <ul className="grid grid-cols-1 gap-[clamp(1rem,1.5vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES2_STAGES.map((stage) => (
                <li key={stage.id}>
                  <a
                    href={`#${stage.id}`}
                    className="group flex flex-col gap-2 border-l border-white/25 pl-[clamp(0.75rem,1vw,1.25rem)] transition-colors hover:border-[#fe4a01]"
                  >
                    <span className="font-[family-name:var(--font-display)] text-[clamp(0.875rem,1.04vw,1.25rem)] font-normal leading-none text-white/50 transition-colors group-hover:text-[#fe4a01]">
                      {stage.number}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-[clamp(1.125rem,1.56vw,1.875rem)] font-normal leading-[normal] text-white">
                      {stage.title}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.83vw,1rem)] font-normal leading-[1.45] text-white/60">
                      {stage.intro}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FadeUp>
      </div>
    </section>
  );
}
