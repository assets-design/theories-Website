"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

type MediaItem = {
  type: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  category: string;
};

const LIFE_MOMENTS: MediaItem[] = [
  {
    type: "video",
    src: "/images/about/happy-place/desk-work.mp4",
    title: "Deep Work & Strategy",
    category: "Studio Focus",
  },
  {
    type: "image",
    src: "/images/about/join-tribe/workspace.jpg",
    title: "Ideas on Every Wall",
    category: "Creative Space",
  },
  {
    type: "video",
    src: "/images/about/happy-place/guitar.mp4",
    title: "Office Jam Sessions",
    category: "Culture & Play",
  },
  {
    type: "image",
    src: "/images/about/hero-team.png",
    title: "Team Collaboration",
    category: "Theories Crew",
  },
  {
    type: "video",
    src: "/images/about/happy-place/diwali.mp4",
    title: "Celebrations & Festivities",
    category: "Moments",
  },
  {
    type: "video",
    src: "/images/about/happy-place/ornament.mp4",
    title: "Studio Traditions",
    category: "Memories",
  },
];

export function CareersLifeAtTheories() {
  const [activeTab, setActiveTab] = useState<"all" | "studio" | "culture">("all");

  const filtered = LIFE_MOMENTS.filter((item) => {
    if (activeTab === "studio") return item.category.includes("Studio") || item.category.includes("Space");
    if (activeTab === "culture") return item.category.includes("Culture") || item.category.includes("Moments");
    return true;
  });

  return (
    <section
      aria-label="Life at Theories"
      className="relative overflow-hidden border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3.5rem,7vw,8rem)]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[clamp(20rem,55vw,65rem)]">
            <FadeUp>
              <h2 className="text-h2 leading-[1.1] text-white max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
                Work hard. Think different.
                <br />
                <span className="text-[#feba07]">Have some fun.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={100} className="mt-4">
              <p className="font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.2vw,1.35rem)] leading-relaxed text-white/70">
                We believe great work happens when people have the space to think,
                experiment and challenge the obvious. From brainstorms to shoots,
                pitch rooms to coffee breaks — there&apos;s always something happening.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={150} className="shrink-0">
            <Link
              href="/agency"
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-[family-name:var(--font-highlight)] text-sm text-white backdrop-blur-sm transition hover:border-[#fe4a01] hover:text-[#feba07]"
            >
              <span>Explore Studio Culture</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        {/* Dynamic Media Collage Grid */}
        <div className="mt-[clamp(2.5rem,4vw,5rem)] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {filtered.map((item, idx) => (
            <FadeUp
              key={item.title}
              delay={idx * 60}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] ${
                idx === 0
                  ? "aspect-[16/11] sm:aspect-[4/3] lg:row-span-2 lg:aspect-auto lg:h-full"
                  : idx === 3
                    ? "aspect-[16/10] sm:col-span-2 lg:col-span-2 lg:aspect-[21/9]"
                    : "aspect-[16/11] sm:aspect-[4/3]"
              }`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="relative size-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* Gradient Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Media Card Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-[clamp(1rem,1.5vw,1.75rem)]">
                <span className="inline-block rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-[#feba07] backdrop-blur-md">
                  {item.category}
                </span>
                <p className="font-[family-name:var(--font-highlight)] text-[clamp(1rem,1.25vw,1.4rem)] mt-2 text-white">
                  {item.title}
                </p>
              </div>

              {/* Video Indicator */}
              {item.type === "video" && (
                <div className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white/80 backdrop-blur-md">
                  <svg
                    className="size-3.5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
