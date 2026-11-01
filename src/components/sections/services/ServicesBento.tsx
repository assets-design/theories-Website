import type { CSSProperties } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { SERVICES_STAGES } from "./data";

type TileTone = "light" | "ink" | "field" | "ember";

/**
 * Editorial color-field bento — type-led tiles, not photo cards.
 */
const TILE: Record<
  string,
  {
    className: string;
    tone: TileTone;
    short: string;
    style: CSSProperties;
    rule: string;
  }
> = {
  shaping: {
    className: "services-bento-tile services-bento-tile--featured",
    tone: "light",
    short: "Shape",
    style: { backgroundColor: "#ffffff", color: "#000000" },
    rule: "#fe4a01",
  },
  building: {
    className: "services-bento-tile services-bento-tile--wide",
    tone: "ink",
    short: "Build",
    style: {
      backgroundColor: "#0c0c0c",
      color: "#ffffff",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
    },
    rule: "linear-gradient(90deg, #fe4a01, #feba07)",
  },
  transforming: {
    className: "services-bento-tile services-bento-tile--half",
    tone: "ember",
    short: "Transform",
    style: {
      backgroundImage:
        "linear-gradient(145deg, #fe4a01 0%, #fe8204 48%, #feba07 100%)",
      color: "#ffffff",
    },
    rule: "#000000",
  },
  crafting: {
    className: "services-bento-tile services-bento-tile--half",
    tone: "field",
    short: "Craft",
    style: {
      backgroundColor: "#161616",
      color: "#ffffff",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
    },
    rule: "linear-gradient(90deg, #fe4a01, #feba07)",
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <FadeUp>
            <h2 className="text-h2 max-w-[clamp(16rem,36vw,38rem)] leading-[1.05] max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
              Four stages.
              <br />
              One continuum.
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="max-w-[clamp(18rem,32vw,28rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,1vw,1.0625rem)] leading-[1.5] text-white/55 lg:text-right">
              Jump into a stage — or read the full map of capabilities below.
            </p>
          </FadeUp>
        </div>

        <div className="services-bento-grid mt-[clamp(2rem,4vw,3.5rem)]">
          {SERVICES_STAGES.map((stage, index) => {
            const tile = TILE[stage.id] ?? TILE.building;
            const featured = tile.tone === "light";

            return (
              <FadeUp
                key={stage.id}
                delay={index * 70}
                className={tile.className}
              >
                <a
                  href={`#${stage.id}`}
                  className="group relative flex h-full min-h-[inherit] flex-col justify-between overflow-hidden outline-none transition-transform duration-500 ease-out hover:-translate-y-0.5"
                  style={tile.style}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-[3px] w-0 transition-[width] duration-500 ease-out group-hover:w-full"
                    style={{ background: tile.rule }}
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4 p-[clamp(1.25rem,2vw,2rem)]">
                    <span className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.8vw,3rem)] leading-none opacity-35">
                      {stage.number}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[0.75rem] tracking-[0.16em] uppercase opacity-50">
                      {tile.short}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto p-[clamp(1.25rem,2vw,2rem)] pt-2">
                    <h3
                      className={
                        featured
                          ? "text-h3 font-normal leading-[1.05]"
                          : "text-h4 font-normal leading-[1.05]"
                      }
                    >
                      {stage.title.replace(" Theories", "")}
                      <span className="opacity-40"> Theories</span>
                    </h3>
                    <p
                      className={`mt-3 font-[family-name:var(--font-body)] leading-[1.45] opacity-70 ${
                        featured
                          ? "text-body max-w-[34ch]"
                          : "text-body line-clamp-3"
                      }`}
                    >
                      {stage.intro}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[0.8125rem] tracking-[0.1em] uppercase opacity-55 transition-opacity group-hover:opacity-100">
                      Open stage
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
