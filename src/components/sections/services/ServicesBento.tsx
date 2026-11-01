import { FadeUp } from "@/components/motion/FadeUp";
import { SERVICES_STAGES } from "./data";

/**
 * Asymmetric bento of the four Theories stages.
 * Image-led tiles — interaction containers, not a card deck.
 */
const TILE: Record<string, { className: string; featured?: boolean }> = {
  shaping: {
    className: "services-bento-tile services-bento-tile--featured",
    featured: true,
  },
  building: {
    className: "services-bento-tile services-bento-tile--wide",
  },
  transforming: {
    className: "services-bento-tile services-bento-tile--half",
  },
  crafting: {
    className: "services-bento-tile services-bento-tile--half",
  },
};

export function ServicesBento() {
  return (
    <section
      id="services-bento"
      aria-label="Four stages of work"
      className="scroll-mt-[clamp(5rem,8vw,7rem)] bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3rem,6vw,6.5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(16rem,40vw,42rem)] leading-[1.05] max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
            Shape. Build.
            <br />
            Transform. Craft.
          </h2>
        </FadeUp>
        <FadeUp delay={80}>
          <p className="mt-4 max-w-[clamp(20rem,42vw,36rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1vw,1.0625rem)] leading-[1.5] text-white/60">
            Pick a stage to see the capabilities behind it — or scroll the full
            map below.
          </p>
        </FadeUp>

        <div className="services-bento-grid mt-[clamp(2rem,4vw,3.5rem)]">
          {SERVICES_STAGES.map((stage, index) => {
            const tile = TILE[stage.id] ?? {
              className: "services-bento-tile",
            };
            return (
              <FadeUp
                key={stage.id}
                delay={index * 60}
                className={tile.className}
              >
                <a
                  href={`#${stage.id}`}
                  className="group relative flex h-full min-h-[inherit] flex-col justify-between overflow-hidden outline-none"
                >
                  <div aria-hidden className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={stage.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/5" />
                  </div>

                  <div className="relative z-10 flex items-start justify-between gap-4 p-[clamp(1.25rem,2vw,2rem)]">
                    <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,2.75rem)] leading-none text-white/40">
                      {stage.number}
                    </span>
                    <span className="relative size-[clamp(2rem,2.5vw,2.75rem)] shrink-0 overflow-hidden opacity-90">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stage.icon}
                        alt=""
                        width={48}
                        height={48}
                        className="size-full object-contain"
                      />
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto p-[clamp(1.25rem,2vw,2rem)] pt-0">
                    <h3
                      className={
                        tile.featured
                          ? "text-h3 font-normal leading-[1.1] text-white"
                          : "text-h4 font-normal leading-[1.1] text-white"
                      }
                    >
                      {stage.title}
                    </h3>
                    <p
                      className={`mt-3 font-[family-name:var(--font-body)] leading-[1.45] text-white/70 ${
                        tile.featured
                          ? "text-body max-w-[36ch]"
                          : "text-body line-clamp-3"
                      }`}
                    >
                      {stage.intro}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[0.8125rem] tracking-[0.08em] text-white/55 uppercase transition-colors group-hover:text-white">
                      View capabilities
                      <span
                        aria-hidden
                        className="translate-x-0 transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
