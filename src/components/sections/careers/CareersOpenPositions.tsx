"use client";

import { useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

type Job = {
  id: string;
  title: string;
  department: "Creative" | "Marketing" | "Strategy" | "Technology" | "Operations";
  location: string;
  workMode: string;
  experience: string;
  salary: string;
  summary: string;
  tags: string[];
  featured?: boolean;
};

const JOBS: Job[] = [
  {
    id: "junior-graphic-designer",
    title: "Junior Graphic Designer",
    department: "Creative",
    location: "Jubilee Hills, Hyderabad",
    workMode: "On-site",
    experience: "1–2 years experience",
    salary: "₹3–3.5 LPA",
    summary:
      "Craft scroll-stopping social creatives, campaign identities, brand assets, and digital decks. Obsessed with typography, hierarchy, composition and saving too many design references.",
    tags: ["Typography", "Photoshop", "Illustrator", "Social-First", "Brand Identity"],
    featured: true,
  },
];

const FILTERS = ["All (1)", "Creative (1)", "Marketing (0)", "Strategy (0)", "Technology (0)"] as const;

export function CareersOpenPositions() {
  const [selectedFilter, setSelectedFilter] = useState("All (1)");

  const scrollToApply = () => {
    const el = document.getElementById("general-application");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="open-positions"
      aria-label="Open positions"
      className="relative scroll-mt-28 border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3.5rem,7vw,8rem)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[clamp(20rem,60vw,72rem)]">
            <FadeUp>
              <h2 className="text-h2 leading-[1.1] text-white max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
                Something here look interesting?
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.2vw,1.35rem)] mt-3 text-white/70">
                We&apos;re always looking for people who can make Theories better.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Filter Badges */}
        <FadeUp delay={120} className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                selectedFilter === f
                  ? "bg-white text-black font-semibold"
                  : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </FadeUp>

        {/* Job Cards List */}
        <div className="mt-8 space-y-4">
          {JOBS.map((job) => (
            <FadeUp
              key={job.id}
              delay={150}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.04] to-transparent p-[clamp(1.5rem,2.8vw,3rem)] backdrop-blur-sm transition-all duration-300 hover:border-[#fe4a01]/60 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Top Meta info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="rounded-full bg-[#fe4a01]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#feba07]">
                    {job.department}
                  </span>
                  <span className="text-xs text-white/50">·</span>
                  <span className="text-xs text-white/70">{job.location}</span>
                  <span className="text-xs text-white/50">·</span>
                  <span className="text-xs text-white/70">{job.workMode}</span>
                  <span className="text-xs text-white/50">·</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/80">
                    {job.salary}
                  </span>
                </div>

                <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/80">
                  {job.experience}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.4vw,2.75rem)] text-white group-hover:text-white">
                    {job.title}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-[clamp(0.9rem,1.05vw,1.15rem)] mt-3 leading-relaxed text-white/70">
                    {job.summary}
                  </p>

                  {/* Skills pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                  <button
                    type="button"
                    onClick={scrollToApply}
                    className="bg-brand-gradient text-cta group/btn inline-flex h-[clamp(44px,3.07vw,59px)] items-center justify-center gap-3 rounded-[clamp(28px,3.125vw,60px)] px-[clamp(1.5rem,2.2vw,2.5rem)] capitalize text-white shadow-[0_10px_25px_rgba(254,74,1,0.25)] transition hover:opacity-90"
                  >
                    <span>Apply for Role</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
