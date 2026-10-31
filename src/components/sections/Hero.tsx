import { Fragment } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const stats = [
  { value: "30+", label: "Clients" },
  { value: "25+", label: "Industries" },
  { value: "300+", label: "Projects" },
  { value: "20+", label: "Employees" },
] as const;

export function Hero() {
  return (
    <section aria-label="Hero" className="bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(2.5rem,4.06vw,4.875rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-display text-white max-lg:!text-[2.625rem]">
            Every business is built
            <br className="hidden sm:block" /> on a theory.
          </h1>
        </FadeUp>

        <FadeUp immediate delay={120} y={28}>
          <p className="text-body-sm mt-[clamp(1.25rem,2.81vw,3.375rem)] max-w-[clamp(20rem,39.74vw,47.6875rem)] text-[rgba(255,255,255,0.6)]">
            An idea about what could be. We help you prove it, scale it, and
            evolve it.
            <br className="hidden sm:block" />
            Together, we turn your theory into traction.
          </p>
        </FadeUp>

        {/* Mobile only — 2 columns; divider under number width with gap */}
        <FadeUp immediate delay={220} y={28}>
          <div
            className="mt-[clamp(1.5rem,1.56vw,1.875rem)] grid grid-cols-2 gap-x-6 md:hidden"
            role="list"
            aria-label="Company stats"
          >
            {([0, 1] as const).map((col) => {
              const top = stats[col];
              const bottom = stats[col + 2];
              return (
                <div key={top.label} className="flex flex-col items-start">
                  <div role="listitem">
                    <p className="text-stat whitespace-nowrap leading-none text-white">
                      {top.value}
                    </p>
                    <p className="text-body-sm mt-2 whitespace-nowrap text-[#686868]">
                      {top.label}
                    </p>
                  </div>

                  {/* Horizontal rule: number width only; 5px gap top/bottom (mobile only) */}
                  <div className="my-[5px] inline-grid" aria-hidden>
                    <span className="invisible col-start-1 row-start-1 block h-px overflow-hidden whitespace-nowrap text-stat leading-none">
                      {top.value}
                    </span>
                    <div className="col-start-1 row-start-1 h-px self-center bg-white/25" />
                  </div>

                  <div role="listitem">
                    <p className="text-stat whitespace-nowrap leading-none text-white">
                      {bottom.value}
                    </p>
                    <p className="text-body-sm mt-2 whitespace-nowrap text-[#686868]">
                      {bottom.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Tablet + desktop — one row; desktop keeps left offset */}
        <FadeUp immediate delay={220} y={28}>
          <div
            className="mt-[clamp(1.5rem,1.56vw,1.875rem)] hidden h-[clamp(5.5rem,7.24vw,8.6875rem)] items-stretch md:flex lg:ml-[clamp(0px,23.75vw,28.5rem)]"
            role="list"
            aria-label="Company stats"
          >
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 ? (
                  <div
                    className="flex min-w-[clamp(1.25rem,4vw,5rem)] flex-1 items-stretch justify-center"
                    aria-hidden
                  >
                    <div className="w-px bg-white/40" />
                  </div>
                ) : null}
                <div role="listitem" className="flex shrink-0 flex-col justify-start">
                  <p className="text-stat whitespace-nowrap leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="text-body-sm mt-[clamp(0.75rem,1.04vw,1.25rem)] whitespace-nowrap text-[#686868]">
                    {stat.label}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
