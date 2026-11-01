import { FadeUp } from "@/components/motion/FadeUp";
import type { ServiceStage } from "./data";

type Props = {
  stage: ServiceStage;
  index: number;
};

/**
 * Stage deep-dive — header strip + bento mosaic of capabilities.
 * First two services span wider for hierarchy.
 */
export function ServicesStageBento({ stage, index }: Props) {
  const reverse = index % 2 === 1;

  return (
    <section
      id={stage.id}
      aria-labelledby={`${stage.id}-title`}
      className="scroll-mt-[clamp(5rem,8vw,7rem)] border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3rem,5.5vw,6rem)]">
        <div
          className={`grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-end lg:gap-12 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FadeUp>
            <p className="font-[family-name:var(--font-display)] text-[clamp(0.75rem,0.9vw,0.875rem)] tracking-[0.18em] text-white/40 uppercase">
              Stage {stage.number}
            </p>
            <h2
              id={`${stage.id}-title`}
              className="text-h2 mt-3 leading-[1.05] max-md:!text-[30px] md:max-lg:!text-[2.5rem]"
            >
              {stage.title}
            </h2>
            <p className="mt-4 max-w-[40ch] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1vw,1.0625rem)] leading-[1.5] text-white/60">
              {stage.intro}
            </p>
          </FadeUp>

          <FadeUp delay={80}>
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stage.image}
                alt={stage.imageAlt}
                className="absolute inset-0 size-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent"
              />
            </div>
          </FadeUp>
        </div>

        {/* Capability bento */}
        <div className="services-capability-grid mt-[clamp(2rem,3.5vw,3.5rem)]">
          {stage.services.map((service, i) => {
            const wide = i < 2;
            return (
              <FadeUp
                key={service.title}
                delay={40 + i * 30}
                className={wide ? "services-capability-wide" : undefined}
              >
                <article className="flex h-full flex-col border border-white/10 bg-white/5 p-[clamp(1.1rem,1.6vw,1.5rem)] transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/10">
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.05rem,1.35vw,1.35rem)] font-normal leading-[1.2] text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.5] text-white/55">
                    {service.body}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
