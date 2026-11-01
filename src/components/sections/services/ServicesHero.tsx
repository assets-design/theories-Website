import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Services hero — brand-forward, one composition, full-bleed atmosphere.
 */
export function ServicesHero() {
  return (
    <section
      aria-label="Services"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Full-bleed visual plane */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/services2/cta-workspace.png"
          alt=""
          className="size-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1920px] flex-col justify-end px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(3rem,6vw,6rem)]"
        style={{ minHeight: "min(88vh, 52rem)" }}
      >
        <FadeUp immediate y={28}>
          <p className="font-[family-name:var(--font-display)] text-[clamp(0.75rem,0.94vw,1.125rem)] tracking-[0.22em] text-white/55 uppercase">
            Theories
          </p>
        </FadeUp>

        <FadeUp immediate delay={80} y={28}>
          <h1 className="text-display mt-[clamp(0.75rem,1.5vw,1.5rem)] max-w-[clamp(18rem,58vw,70rem)] leading-[1.02] text-white max-md:!text-[36px] md:max-lg:!text-[2.85rem]">
            Work shaped around the{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #fe4a01 0%, #feba07 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              decision
            </span>{" "}
            it serves.
          </h1>
        </FadeUp>

        <FadeUp immediate delay={160} y={24}>
          <p className="mt-[clamp(1.25rem,2vw,2rem)] max-w-[clamp(20rem,42vw,36rem)] font-[family-name:var(--font-body)] text-[clamp(0.9375rem,1.05vw,1.2rem)] leading-[1.5] text-white/70">
            Four stages. Most brands need two or three. We start where the
            business actually is — then build what moves it forward.
          </p>
        </FadeUp>

        <FadeUp immediate delay={220} y={20}>
          <div className="mt-[clamp(1.75rem,2.5vw,2.75rem)] flex flex-wrap gap-3">
            <a
              href="#services-bento"
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.5rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] bg-brand-gradient px-[clamp(1.25rem,1.6vw,1.875rem)] text-white"
            >
              Explore stages
            </a>
            <a
              href="/projects"
              className="text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.5rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] border border-white/40 px-[clamp(1.25rem,1.6vw,1.875rem)] text-white transition-colors hover:border-white"
            >
              View case studies
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
