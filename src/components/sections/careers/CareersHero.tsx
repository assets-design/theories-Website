"use client";

import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

export function CareersHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Careers hero"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Background ambient gold/orange glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-[clamp(20rem,35vw,40rem)] w-[clamp(20rem,35vw,40rem)] rounded-full bg-[radial-gradient(circle,rgba(254,74,1,0.18)_0%,rgba(254,186,7,0.06)_40%,transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(3.5rem,6vw,6rem)]">
        {/* Hero Title */}
        <FadeUp immediate delay={100} y={28}>
          <h1 className="text-display max-w-[clamp(20rem,75vw,90rem)] leading-[1.05] text-white max-md:!text-[36px] md:max-lg:!text-[2.85rem]">
            Your next big idea
            <br />
            could start here.
          </h1>
        </FadeUp>

        {/* Subtitle & Impact Copy */}
        <FadeUp immediate delay={180} y={28}>
          <div className="mt-[clamp(1.5rem,2.2vw,2.75rem)] max-w-[clamp(20rem,50vw,60rem)] space-y-[clamp(0.75rem,1vw,1.25rem)]">
            <p className="font-[family-name:var(--font-body)] text-[clamp(1rem,1.35vw,1.5rem)] leading-[1.45] text-white/80">
              We’re building a team of thinkers, creators, strategists and doers
              who believe good work starts with a good theory.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.25rem)] leading-[1.45] text-white/60">
              At Theories, you don&apos;t just get a job.{" "}
              <span className="font-semibold text-white">
                You get to build things that matter.
              </span>
            </p>
          </div>
        </FadeUp>

        {/* Action CTAs */}
        <FadeUp immediate delay={260} y={28}>
          <div className="mt-[clamp(2rem,3.2vw,3.75rem)] flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo("open-positions")}
              className="bg-brand-gradient text-cta group inline-flex h-[clamp(44px,3.07vw,59px)] items-center justify-center gap-3 rounded-[clamp(28px,3.125vw,60px)] px-[clamp(1.5rem,2.2vw,2.5rem)] capitalize text-white shadow-[0_10px_30px_rgba(254,74,1,0.25)] transition hover:opacity-90 hover:shadow-[0_15px_35px_rgba(254,74,1,0.35)]"
            >
              <span>View Open Roles</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-y-1">
                ↓
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("why-theories")}
              className="text-cta inline-flex h-[clamp(44px,3.07vw,59px)] items-center justify-center rounded-[clamp(28px,3.125vw,60px)] border border-white/30 bg-white/5 px-[clamp(1.5rem,2.2vw,2.5rem)] capitalize text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
            >
              Our Philosophy
            </button>
          </div>
        </FadeUp>

        {/* Quick Facts Strip */}
        <FadeUp immediate delay={320} y={28}>
          <div className="mt-[clamp(3.5rem,5.5vw,6.5rem)] grid grid-cols-2 gap-4 border-t border-white/15 pt-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-4 lg:gap-8">
            <div>
              <p className="font-[family-name:var(--font-highlight)] text-[clamp(1.25rem,1.85vw,2.25rem)] text-white">
                Jubilee Hills
              </p>
              <p className="text-label mt-1 text-white/50">Hyderabad Studio HQ</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-highlight)] text-[clamp(1.25rem,1.85vw,2.25rem)] text-white">
                Cross-Discipline
              </p>
              <p className="text-label mt-1 text-white/50">Strategy · Design · Tech</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-highlight)] text-[clamp(1.25rem,1.85vw,2.25rem)] text-white">
                Zero Red Tape
              </p>
              <p className="text-label mt-1 text-white/50">Ideas Over Titles</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-highlight)] text-[clamp(1.25rem,1.85vw,2.25rem)] text-[#feba07]">
                Real Traction
              </p>
              <p className="text-label mt-1 text-white/50">High-Impact Brands</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
