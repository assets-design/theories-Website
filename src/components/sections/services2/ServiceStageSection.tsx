import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";
import type { ServiceStage } from "./data";

type ServiceStageSectionProps = {
  stage: ServiceStage;
};

/**
 * Split stage block — Figma Services (A) rows (~920px @ 1920).
 * Left: stage label + visual · Right: intro + capabilities grid.
 * Alternating lightLeft white rail vs full black (Figma 01/03 dark, 02/04 light).
 *
 * Pinning / scroll-linked stack is owned by Services2Stages (lg+). Panels are opaque
 * and roughly viewport-tall under the header so the next stage can ease up over this
 * one across an extended scroll runway.
 */
export function ServiceStageSection({ stage }: ServiceStageSectionProps) {
  const label = `${stage.number} · ${stage.title}`;

  return (
    <section
      id={stage.id}
      aria-labelledby={`${stage.id}-title`}
      className="relative bg-black text-white lg:min-h-[calc(100svh-var(--services2-stack-top))]"
    >
      <div className="mx-auto grid w-full max-w-[1920px] lg:min-h-[calc(100svh-var(--services2-stack-top))] lg:grid-cols-2">
        {/* Left visual rail */}
        <div
          className={`relative flex flex-col items-center justify-center gap-[clamp(1.5rem,2.5vw,3rem)] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4vw,5rem)] lg:px-[clamp(2rem,6.25vw,7.5rem)] ${
            stage.lightLeft ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          <FadeUp>
            <h2
              className={`text-center font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.6vw,3.125rem)] font-normal leading-[normal] ${
                stage.lightLeft ? "text-black" : "text-white"
              }`}
            >
              {label}
            </h2>
          </FadeUp>
          <FadeUp delay={80} className="relative w-full max-w-[clamp(16rem,29.5vw,35.375rem)]">
            <div className="relative aspect-[566/368] w-full overflow-hidden">
              <Image
                src={stage.image}
                alt={stage.imageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 35vw"
                className="object-cover object-center"
              />
            </div>
          </FadeUp>
        </div>

        {/* Vertical divider — desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/40 lg:block"
        />

        {/* Right content */}
        <div className="flex flex-col justify-center bg-black px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4vw,5rem)] lg:px-[clamp(2rem,5.2vw,6.25rem)]">
          <FadeUp>
            <h3
              id={`${stage.id}-title`}
              className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.33vw,4rem)] font-normal leading-[normal] text-white"
            >
              {label}
            </h3>
          </FadeUp>

          <FadeUp delay={60}>
            <p className="mt-[clamp(0.75rem,1.25vw,1.5rem)] max-w-[clamp(18rem,43vw,51.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.94vw,1.125rem)] font-normal leading-[normal] text-white/85">
              {stage.intro}
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <p className="mt-[clamp(1.5rem,2.5vw,3rem)] font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,3.125rem)] font-normal leading-[normal] text-white">
              Our Core Capabilities
            </p>
          </FadeUp>

          <FadeUp delay={140}>
            <ul className="mt-[clamp(1.25rem,2vw,2.5rem)] grid grid-cols-1 gap-x-[clamp(1rem,2vw,2.5rem)] gap-y-[clamp(1.25rem,2vw,2.5rem)] sm:grid-cols-2">
              {stage.capabilities.map((cap) => (
                <li key={cap.title} className="min-w-0">
                  <p className="font-[family-name:var(--font-body)] text-[clamp(1rem,1.3vw,1.5625rem)] font-semibold leading-[normal] text-white">
                    {cap.title}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.83vw,1rem)] font-normal leading-[1.45] text-white/70">
                    {cap.body}
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
