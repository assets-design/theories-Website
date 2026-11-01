import { FadeUp } from "@/components/motion/FadeUp";
import type { ServiceStage } from "./data";

type Props = {
  stage: ServiceStage;
  index: number;
};

/**
 * Stage deep-dive — editorial header + index mosaic (not a card deck).
 * Alternates light / ink panels for rhythm down the page.
 */
export function ServicesStageBento({ stage, index }: Props) {
  const light = index % 2 === 1;

  return (
    <section
      id={stage.id}
      aria-labelledby={`${stage.id}-title`}
      className="scroll-mt-[clamp(5rem,8vw,7rem)]"
      style={
        light
          ? { backgroundColor: "#f5f5f5", color: "#000000" }
          : {
              backgroundColor: "#000000",
              color: "#ffffff",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }
      }
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3rem,5.5vw,6rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-14">
          <FadeUp>
            <div className="flex h-full flex-col">
              <p
                className={`font-[family-name:var(--font-display)] text-[clamp(0.75rem,0.9vw,0.875rem)] tracking-[0.2em] uppercase ${
                  light ? "text-black/40" : "text-white/40"
                }`}
              >
                Stage {stage.number}
              </p>
              <h2
                id={`${stage.id}-title`}
                className="text-h2 mt-3 leading-[1.05] max-md:!text-[30px] md:max-lg:!text-[2.5rem]"
              >
                {stage.title}
              </h2>
              <p
                className={`mt-4 max-w-[40ch] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1vw,1.0625rem)] leading-[1.5] ${
                  light ? "text-black/60" : "text-white/60"
                }`}
              >
                {stage.intro}
              </p>

              <div
                className={`mt-auto hidden pt-10 lg:block ${
                  light ? "opacity-90" : "opacity-80"
                }`}
              >
                <div className="relative aspect-[16/10] w-full max-w-[36rem] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stage.image}
                    alt={stage.imageAlt}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <ol className="services-index-list">
              {stage.services.map((service, i) => (
                <li key={service.title}>
                  <article
                    className={`services-index-item group ${
                      light ? "services-index-item--light" : ""
                    }`}
                  >
                    <span
                      className={`font-[family-name:var(--font-display)] text-[clamp(0.875rem,1vw,1rem)] tabular-nums opacity-35 ${
                        i < 2 ? "pt-1" : ""
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className={`font-[family-name:var(--font-display)] font-normal leading-[1.2] ${
                          i < 2
                            ? "text-[clamp(1.25rem,1.7vw,1.65rem)]"
                            : "text-[clamp(1.05rem,1.3vw,1.25rem)]"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-1.5 font-[family-name:var(--font-body)] leading-[1.5] ${
                          light ? "text-black/55" : "text-white/50"
                        } ${
                          i < 2
                            ? "text-[clamp(0.875rem,0.95vw,1rem)]"
                            : "text-[clamp(0.8125rem,0.9vw,0.9375rem)]"
                        }`}
                      >
                        {service.body}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
