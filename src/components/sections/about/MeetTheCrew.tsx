"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

type LeadershipMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
};

type TeamMember = {
  name: string;
  role: string;
  image?: string;
  placeholder?: boolean;
  linkedin?: string;
};

const LEADERSHIP: LeadershipMember[] = [
  {
    name: "Nithin Malkani",
    role: "Founder and Managing Director",
    bio: "I'm a Founder Director who blends creativity with intention — turning ideas into impactful visuals that connect, communicate, and convert.",
    image: "/images/about/crew/nithin-malkani.png",
  },
  {
    name: "Vamshi",
    role: "Founder and Chairmain",
    bio: "I'm a Founder Director who blends creativity with intention — turning ideas into impactful visuals that connect, communicate, and convert.",
    image: "/images/about/crew/vamshi.jpg",
  },
  {
    name: "Pavan Kumar",
    role: "Creative Head And managing Director",
    bio: "I'm a Founder Director who blends creativity with intention — turning ideas into impactful visuals that connect, communicate, and convert.",
    image: "/images/about/crew/pavan-kumar.jpg",
  },
];

const TEAM: TeamMember[] = [
  {
    name: "Lakshmi Sathivk",
    role: "HR & Social Media",
    image: "/images/about/crew/lakshmi-sathivk.png",
  },
  {
    name: "Rohith Rayudu",
    role: "Social Media Manager",
    image: "/images/about/crew/rohith-rayudu.png",
  },
  {
    name: "Harishwar .D",
    role: "Content Writer",
    image: "/images/about/crew/harishwar-d.png",
  },
  {
    name: "Vikas Donakonda",
    role: "UI/UX Designer",
    image: "/images/about/crew/vikas-donakonda.png",
  },
  {
    name: "Ajay Chavvakula",
    role: "Senior Web Developer",
    image: "/images/about/crew/ajay-chavvakula.png",
  },
  {
    name: "Teja",
    role: "Senior Graphic Designer",
    image: "/images/about/crew/teja.png",
  },
  {
    name: "Diptanshu",
    role: "Graphic Designer",
    image: "/images/about/crew/diptanshu.png",
  },
  {
    name: "Dattu Sankalp",
    role: "Graphic Designer",
    image: "/images/about/crew/dattu-sankalp.png",
  },
  {
    name: "Siddharth Pilli",
    role: "Senior Video Editor",
    image: "/images/about/crew/siddharth-pilli.png",
  },
  {
    name: "Lokesh",
    role: "Video Editor",
    image: "/images/about/crew/lokesh.png",
  },
  {
    name: "Balu .A",
    role: "Performance Specialist",
    image: "/images/about/crew/balu-a.jpg",
  },
  {
    name: "Veera Ravula",
    role: "SEO Analysist",
    image: "/images/about/crew/veera-ravula.png",
  },
  {
    name: "Samiksha pralhad hadge",
    role: "SEO executive",
    image: "/images/about/crew/samiksha-hadge.png",
  },
  {
    name: "Sagar Hrushith Singh",
    role: "Business Development Specialist",
    image: "/images/about/crew/sagar-hrushith.png",
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/linkedin-circle.svg"
        alt=""
        width={53}
        height={53}
        className="absolute inset-0 size-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/linkedin-in.png"
        alt=""
        width={18}
        height={18}
        className="absolute left-1/2 top-1/2 size-[33%] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </span>
  );
}

function Portrait({
  src,
  alt,
  placeholder,
  sizes,
}: {
  src?: string;
  alt: string;
  placeholder?: boolean;
  sizes: string;
}) {
  if (placeholder || !src) {
    return (
      <div className="relative size-full overflow-hidden bg-[#5a5a5a]">
        <Image
          src="/images/about/crew/placeholder-bg.png"
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about/crew/silhouette.svg"
          alt=""
          width={206}
          height={206}
          className="absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2"
        />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative size-full overflow-hidden bg-[#5a5a5a]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center"
      />
    </div>
  );
}

function LeadershipCard({
  member,
  sizes,
}: {
  member: LeadershipMember;
  sizes: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[517/694] w-full overflow-hidden">
        <Portrait src={member.image} alt={member.name} sizes={sizes} />
      </div>

      <h3 className="mt-[clamp(0.875rem,1.56vw,1.875rem)] font-[family-name:var(--font-display)] text-[clamp(1.25rem,1.77vw,2.125rem)] leading-[normal] font-normal tracking-[0.03em] text-white">
        {member.name}
      </h3>
      <p className="mt-[clamp(0.375rem,0.57vw,0.6875rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] leading-[normal] font-normal tracking-[0.04em] text-white">
        {member.role}
      </p>
      <p className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] max-w-[508px] font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] font-normal tracking-[0.02em] text-[rgba(255,255,255,0.8)]">
        {member.bio}
      </p>

      <a
        href={member.linkedin ?? "#"}
        aria-label={`${member.name} on LinkedIn`}
        className="mt-[clamp(0.875rem,1.56vw,1.875rem)] inline-flex w-fit"
      >
        <LinkedInIcon className="size-[clamp(2rem,2.76vw,3.3125rem)]" />
      </a>
    </article>
  );
}

/**
 * Mobile: 1 + 10% peek (`w-[90%]`).
 * Tablet md–lg: 2 + 10% peek (`md:w-[calc(100%/2.1)]`).
 * Desktop lg+: grid only (this carousel is `lg:hidden`).
 */
function LeadershipCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDist = Infinity;

    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const dist = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: slide.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-[clamp(2.5rem,11.15vw,13.375rem)] lg:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {LEADERSHIP.map((member, i) => (
          <div
            key={member.name}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-[90%] shrink-0 snap-start md:w-[calc(100%/2.1)]"
          >
            <LeadershipCard
              member={member}
              sizes="(max-width: 768px) 90vw, 48vw"
            />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Leadership pagination"
      >
        {LEADERSHIP.map((member, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={member.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to ${member.name}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-[width,height,background-color,opacity] motion-safe:duration-200 ${
                isActive
                  ? "size-2.5 bg-white"
                  : "size-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * Meet the Crew — Figma `1892:2102` (Group 1000002590)
 * Black band · H2 Power Grotesk 64 · leadership 3-col 517×694 · team 4-col 399×548
 * Leadership: mobile/tablet peeking carousel · lg+: 3-col grid
 */
export function MeetTheCrew() {
  return (
    <section aria-label="Meet the crew" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(3rem,9.375vw,11.25rem)] pb-[clamp(3rem,5vw,6rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,55.57vw,66.6875rem)] leading-[normal] tracking-[0.02em] text-white max-md:!text-[30px] md:max-lg:!text-[2.625rem]">
            {/* Mobile — exact 2 lines (30px so longest line fits ~320px gutters) */}
            <span className="md:hidden">
              <span className="inline-block whitespace-nowrap">Meet the crew.</span>
              <br />
              <span className="inline-block whitespace-nowrap">
                That smells like team spirit.
              </span>
            </span>
            {/* md+ — existing natural break */}
            <span className="hidden md:inline">
              Meet the crew.
              <br />
              That smells like team spirit.
            </span>
          </h2>
        </FadeUp>

        {/* Desktop: 3-column grid — unchanged */}
        <ul className="mt-[clamp(2.5rem,11.15vw,13.375rem)] hidden gap-[clamp(2rem,3.385vw,4.0625rem)] lg:grid lg:grid-cols-3">
          {LEADERSHIP.map((member, index) => (
            <li key={member.name}>
              <FadeUp delay={index * 80}>
                <LeadershipCard
                  member={member}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* Mobile + tablet: 1+10% / 2+10% peek carousel */}
        <FadeUp>
          <LeadershipCarousel />
        </FadeUp>

        {/* Team grid — Figma 4 cols @ 399×548, gap-x ≈ 28, gap-y ≈ 73
            Below lg: bleed out of section gutter to match Header pill inset (`px-4`) */}
        <ul className="mt-[clamp(2rem,4.17vw,5rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.46vw,1.75rem)] gap-y-[clamp(1.5rem,3.8vw,4.5625rem)] max-lg:-mx-[clamp(1.25rem,6.25vw,7.5rem)] max-lg:px-4 md:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <li key={member.name} className="flex flex-col">
              <FadeUp delay={index * 80}>
                <div className="relative aspect-[399/548] w-full overflow-hidden">
                  <Portrait
                    src={member.image}
                    alt={member.name}
                    placeholder={member.placeholder}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                <div className="mt-[clamp(0.75rem,1.56vw,1.875rem)] flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(0.875rem,1.15vw,1.375rem)] leading-[normal] font-normal text-white">
                      {member.name}
                    </h3>
                    <p className="mt-[clamp(0.25rem,0.36vw,0.4375rem)] font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.94vw,1.125rem)] leading-[normal] font-normal text-[#686868]">
                      {member.role}
                    </p>
                  </div>
                  <a
                    href={member.linkedin ?? "#"}
                    aria-label={`${member.name} on LinkedIn`}
                    className="mt-0.5 shrink-0"
                  >
                    <LinkedInIcon className="size-[clamp(1.75rem,2.76vw,3.3125rem)]" />
                  </a>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
