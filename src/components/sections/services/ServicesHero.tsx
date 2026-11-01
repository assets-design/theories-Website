import { FadeUp } from "@/components/motion/FadeUp";

const STAGE_WORDS = ["Shape", "Build", "Transform", "Craft"] as const;

/**
 * Typographic hero — Theories as brand signal, stage words as atmosphere.
 * No inset media; full-bleed type composition.
 */
export function ServicesHero() {
  return (
    <section
      aria-label="Services"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Atmospheric type plane */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center gap-[clamp(0.25rem,1vw,0.75rem)] px-[clamp(1rem,4vw,4rem)] opacity-[0.07]"
      >
        {STAGE_WORDS.map((word, i) => (
          <p
            key={word}
            className="font-[family-name:var(--font-display)] text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-[-0.04em] whitespace-nowrap"
            style={{
              transform: `translateX(${i % 2 === 0 ? "0%" : "8%"})`,
            }}
          >
            {word}
          </p>
        ))}
      </div>

      {/* Soft brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-0 h-[70%] w-[60%] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(254,74,1,0.22) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative mx-auto flex w-full max-w-[1920px] flex-col justify-end px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(3rem,6vw,6rem)]"
        style={{ minHeight: "min(88vh, 52rem)" }}
      >
        <FadeUp immediate y={28}>
          <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-white">
            Theories
          </p>
        </FadeUp>

        <FadeUp immediate delay={90} y={28}>
          <h1 className="text-h2 mt-[clamp(1rem,2vw,1.75rem)] max-w-[clamp(18rem,52vw,48rem)] leading-[1.08] text-white/90 max-md:!text-[28px] md:max-lg:!text-[2.4rem]">
            Work shaped around the decision it serves.
          </h1>
        </FadeUp>

        <FadeUp immediate delay={160} y={24}>
          <p className="mt-[clamp(1rem,1.8vw,1.5rem)] max-w-[clamp(18rem,38vw,32rem)] font-[family-name:var(--font-body)] text-[clamp(0.9375rem,1.05vw,1.125rem)] leading-[1.5] text-white/60">
            Four stages. Most brands need two or three. We start where the
            business actually is.
          </p>
        </FadeUp>

        <FadeUp immediate delay={220} y={20}>
          <div className="mt-[clamp(1.75rem,2.5vw,2.75rem)] flex flex-wrap items-center gap-3">
            <a
              href="#services-bento"
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.5rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-brand-gradient px-[clamp(1.25rem,1.6vw,1.875rem)] text-white"
            >
              Explore stages
            </a>
            <a
              href="/projects"
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.5rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] border border-white/35 px-[clamp(1.25rem,1.6vw,1.875rem)] text-white transition-colors hover:border-white"
            >
              Case studies
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
