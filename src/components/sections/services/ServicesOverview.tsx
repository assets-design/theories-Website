import { FadeUp } from "@/components/motion/FadeUp";
import { SERVICES_STAGES } from "./data";

/**
 * Homepage-style stage index — numbers, icons, titles, intros.
 * Sets the page rhythm before deep service lists.
 */
export function ServicesOverview() {
  return (
    <section
      id="services-overview"
      aria-label="Four stages of work"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(3rem,6vw,7rem)] pb-[clamp(1.5rem,3vw,3.5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,50vw,58rem)] leading-[normal] max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
            We shape, build, transform,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            and craft for tomorrow.
          </h2>
        </FadeUp>

        <ul className="mt-[clamp(2.5rem,5.5vw,6.5rem)]">
          {SERVICES_STAGES.map((stage, index) => (
            <li
              key={stage.id}
              className="border-t border-white/20 last:border-b"
            >
              <FadeUp delay={index * 70}>
                <a
                  href={`#${stage.id}`}
                  className="group block outline-none transition-opacity focus-visible:opacity-90"
                >
                  {/* Mobile */}
                  <div className="flex flex-col gap-4 py-8 lg:hidden">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-display)] text-[1.75rem] font-normal leading-none text-white">
                        {stage.number}
                      </span>
                      <span className="relative size-10 shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={stage.icon}
                          alt=""
                          width={60}
                          height={60}
                          className="absolute inset-0 size-full object-contain"
                        />
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-normal leading-none text-white group-hover:opacity-80">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="font-[family-name:var(--font-body)] text-[15px] font-normal leading-[1.445] text-white/75">
                      {stage.intro}
                    </p>
                  </div>

                  {/* Desktop — mirrors homepage Services columns */}
                  <div className="relative hidden h-[clamp(11.25rem,15.625vw,18.75rem)] lg:block">
                    <span className="absolute top-1/2 left-[5.536%] -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.604vw,3.125rem)] font-normal leading-none whitespace-nowrap text-white transition-opacity group-hover:opacity-80">
                      {stage.number}
                    </span>

                    <span className="absolute top-1/2 left-[20%] size-[clamp(40px,3.125vw,60px)] -translate-y-1/2 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stage.icon}
                        alt=""
                        width={60}
                        height={60}
                        className="absolute inset-0 size-full object-contain"
                      />
                    </span>

                    <h3 className="absolute top-1/2 left-[25.357%] -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.604vw,3.125rem)] font-normal leading-none whitespace-nowrap text-white transition-opacity group-hover:opacity-80">
                      {stage.title}
                    </h3>

                    <p className="absolute top-1/2 left-[61.548%] w-[32.917%] -translate-y-1/2 font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.9375vw,18px)] font-normal leading-[1.445] text-white/80">
                      {stage.intro}
                    </p>
                  </div>
                </a>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
