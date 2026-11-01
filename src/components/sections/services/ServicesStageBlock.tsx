import { FadeUp } from "@/components/motion/FadeUp";
import type { ServiceStage } from "./data";

type Props = {
  stage: ServiceStage;
};

/**
 * Split stage detail — polished media rail + calm capability grid.
 * Alternating light/dark left panels (site services language).
 */
export function ServicesStageBlock({ stage }: Props) {
  const light = stage.lightPanel;

  return (
    <section
      id={stage.id}
      aria-labelledby={`${stage.id}-title`}
      className="relative scroll-mt-[clamp(5rem,8vw,7rem)] bg-black text-white"
    >
      <div className="relative mx-auto grid w-full max-w-[1920px] lg:min-h-[clamp(36rem,52vw,58rem)] lg:grid-cols-2">
        {/* Media / identity rail */}
        <div
          className={`relative flex flex-col justify-between gap-10 px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3rem,5vw,6rem)] lg:px-[clamp(2rem,5vw,6rem)] ${
            light ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          <FadeUp>
            <div>
              <p
                className={`font-[family-name:var(--font-display)] text-[clamp(0.9375rem,1.1vw,1.25rem)] tracking-[0.12em] ${
                  light ? "text-black/40" : "text-white/40"
                }`}
              >
                {stage.number}
              </p>
              <h2
                id={`${stage.id}-title`}
                className={`mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,3.2vw,3.75rem)] font-normal leading-[1.1] ${
                  light ? "text-black" : "text-white"
                }`}
              >
                {stage.title}
              </h2>
              <p
                className={`mt-5 max-w-[34ch] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.95vw,1.125rem)] leading-[1.5] ${
                  light ? "text-black/65" : "text-white/70"
                }`}
              >
                {stage.intro}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="relative aspect-[566/368] w-full max-w-[clamp(18rem,28vw,34rem)] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stage.image}
                alt={stage.imageAlt}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </FadeUp>
        </div>

        {/* Center rule on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/25 lg:block"
        />

        {/* Capabilities */}
        <div className="relative flex flex-col justify-center bg-black px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3rem,5vw,6rem)] lg:px-[clamp(2rem,5vw,6.25rem)]">
          <FadeUp>
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.2vw,2.5rem)] font-normal leading-[normal] text-white">
              Capabilities
            </p>
          </FadeUp>

          <FadeUp delay={80}>
            <ul className="mt-[clamp(1.5rem,2.5vw,3rem)] grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {stage.services.map((service) => (
                <li key={service.title} className="min-w-0">
                  <h3 className="font-[family-name:var(--font-body)] text-[clamp(1rem,1.15vw,1.25rem)] font-semibold leading-[1.3] text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.85vw,1rem)] font-normal leading-[1.5] text-white/60">
                    {service.body}
                  </p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
