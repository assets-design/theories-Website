"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

type Project = {
  title: string;
  summary: string;
  image: string;
  video?: string;
  tags: string[];
  wide?: boolean;
  tagBreakBefore?: string;
  tagsSingleRowMobile?: boolean;
  tagsSingleRow?: boolean;
  href?: string;
};

const filters = [
  "All",
  "Website Design & Development",
  "Mobile App Design",
  "Packaging Design",
  "Logo Designing",
  "Performance Marketing",
  "Social Media Marketing",
] as const;

type Filter = (typeof filters)[number];

/** Aliases only where Figma filter label ≠ project tag string. Exact match is tried first. */
const FILTER_TAG_ALIASES: Partial<Record<Exclude<Filter, "All">, string[]>> = {
  "Website Design & Development": ["Web Development"],
  "Logo Designing": ["Logo Design"],
  "Social Media Marketing": ["Social Media", "Social Media Design"],
};

function normalizeLabel(value: string) {
  return value.trim().toLowerCase();
}

function projectMatchesFilter(project: Project, filter: Filter): boolean {
  if (filter === "All") return true;

  const filterNorm = normalizeLabel(filter);
  if (project.tags.some((tag) => normalizeLabel(tag) === filterNorm)) {
    return true;
  }

  const aliases = FILTER_TAG_ALIASES[filter] ?? [];
  return project.tags.some((tag) => {
    const tagNorm = normalizeLabel(tag);
    return aliases.some((alias) => normalizeLabel(alias) === tagNorm);
  });
}

/** 2 → full → 2 rhythm from filtered index (0,1 half; 2 full; 3,4 half; …). */
function layoutRows(items: Project[]) {
  const rows: Array<
    | { type: "pair"; projects: Project[] }
    | { type: "full"; project: Project }
  > = [];
  let i = 0;

  while (i < items.length) {
    if (i % 3 === 2) {
      rows.push({ type: "full", project: items[i]! });
      i += 1;
      continue;
    }

    const pair: Project[] = [items[i]!];
    i += 1;
    if (i < items.length && i % 3 !== 2) {
      pair.push(items[i]!);
      i += 1;
    }
    rows.push({ type: "pair", projects: pair });
  }

  return rows;
}

const projects: Project[] = [
  {
    title: "Hyderabad Black Birds",
    summary:
      "A racing team needed a platform as fast as the cars. We rebuilt it around race updates, media and team profiles — built for fans, not archives.",
    image: "/images/projects/hbb.png",
    video: "/videos/hbb.mp4",
    tags: ["UI/UX Design", "Web Development"],
    href: "/projects/hbb",
  },
  {
    title: "RPPL Motor Racing",
    summary:
      "Motorsport ambition translated into a digital identity with the same precision as the track.",
    image: "/images/projects/rppl.jpg",
    tags: ["UI/UX Design", "Web Development"],
    href: "/projects/rppl",
  },
  {
    title: "JCN Consulting",
    summary:
      "A growth studio needed a digital presence as sharp as their execution. We designed the site that makes complex venture work feel clear and confident.",
    image: "/images/projects/jcn-consulting.png",
    tags: ["UI/UX Design", "Web Development"],
    href: "/projects/jcn-consulting",
  },
  {
    title: "MOHA",
    summary:
      "Developed MOHA's complete branding ecosystem, combining strategic brand thinking with elegant visual design to establish a memorable identity across digital and social platforms.",
    image: "/images/projects/moha.png",
    video: "/videos/mp4.mp4",
    tags: [
      "Brand Identity",
      "Logo Design",
      "Brand Guidelines",
      "Social Media Design",
    ],
    wide: true,
    href: "/projects/moha",
  },
  {
    title: "How To",
    summary:
      "A complete identity system for a brand that needed to feel instantly familiar and impossible to confuse.",
    image: "/images/projects/howto.png",
    tags: [
      "Brand Identity",
      "Logo Design",
      "Brochure Design",
      "Social Media Design",
    ],
    href: "/projects/howto",
  },
  {
    title: "Airus",
    summary:
      "Designed the Airus logo system — wordmark, droplet mark, and brand applications across packaging and product.",
    image: "/images/projects/airus.png",
    tags: ["Logo Designing"],
    href: "/projects/airus",
  },
  {
    title: "Mahesh Agencies",
    summary:
      "Designed the Mahesh Agencies logo system — monogram, colour palette, and brand applications across stationery, ID, and environmental signage.",
    image: "/images/projects/mahesh-agencies.png",
    tags: ["Logo Designing"],
    href: "/projects/mahesh-agencies",
  },
  {
    title: "D'CASA",
    summary:
      "Designed the D'CASA Suites logo system — monogram, wordmark, and brand applications across stationery and signage.",
    image: "/images/projects/dcasa.png",
    tags: ["Logo Designing"],
    href: "/projects/dcasa",
  },
  {
    title: "Aircraft Cloud & Aircraft Pulse",
    summary:
      "Two products, one coherent brand. Positioning and interfaces built to make complex software feel obvious.",
    image: "/images/projects/aircraft.png",
    tags: [
      "UI/UX Design",
      "Web Development",
      "SEO",
      "Social Media",
    ],
    tagBreakBefore: "Social Media",
    href: "/projects/aircraft-cloud-pulse",
  },
  {
    title: "Eswap.in",
    summary:
      "Built a seamless ticket resale experience through a high-performance mobile app and campaigns that drove real downloads.",
    image: "/images/projects/eswap.png",
    tags: ["UI/UX Design", "Application Development", "Mobile App Design"],
    href: "/projects/eswap",
  },
  {
    title: "Lohitha Foods",
    summary:
      "Took a trusted local name and gave it the shelf presence and digital reach to compete on the national aisle.",
    image: "/images/projects/lohitha.png",
    video: "/videos/1c42-c2fb-4cc7-abbe-3b32bf8552e1.mp4",
    tags: [
      "UI/UX Design",
      "Web Development",
      "Social Media",
      "SEO",
      "WhatsApp Commerce",
    ],
    wide: true,
    href: "/projects/lohitha",
  },
  {
    title: "Zykaz Clothing Brand",
    summary:
      "A clothing label built for a generation that decides in three seconds. Identity, storefront and social, working as one.",
    image: "/images/projects/zykaz.png",
    video: "/videos/zykaz.mp4",
    tags: [
      "UI/UX Design",
      "Web Development",
      "SEO",
      "Social Media",
      "Brand Positioning",
      "Performance Marketing",
    ],
    tagBreakBefore: "Social Media",
    href: "/projects/zykaz",
  },
  {
    title: "Celeste International Schools",
    summary:
      "Positioned a school for parents who compare before they commit, then built the digital front door to match.",
    image: "/images/projects/celeste.png",
    tags: [
      "Social Media",
      "Performance Marketing",
      "SEO",
      "UI/UX Design",
      "Design",
      "Web Development",
    ],
    tagBreakBefore: "SEO",
    tagsSingleRowMobile: true,
    href: "/projects/celeste",
  },
  {
    title: "Amol",
    summary:
      "A commercial real estate brand needed a digital front door as solid as the buildings — we designed and built the site around clarity, projects, and trust.",
    image: "/images/projects/amol.png",
    tags: ["UI/UX Design", "Web Development"],
    href: "/projects/amol",
  },
  {
    title: "Safari Lodges India",
    summary:
      "A wildlife hospitality brand needed a digital experience as immersive as the lodges — we designed the site and social system around nature, booking, and quiet luxury.",
    image: "/images/projects/safari-lodges-india.png",
    tags: ["UI/UX Design", "Web Development", "Social Media"],
    href: "/projects/safari-lodges-india",
  },
  {
    title: "Zene AI",
    summary:
      "An education AI brand needed social that converts curiosity into admissions — we built Instagram creatives, reels, and campaign systems around the mascot and message.",
    image: "/images/projects/zene-ai.png",
    tags: ["Social Media", "Social Media Marketing"],
    href: "/projects/zene-ai",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const media = (
    <div
      className={
        project.wide
          ? "relative w-full overflow-hidden aspect-[1404/767]"
          : "relative w-full overflow-hidden aspect-[815/726]"
      }
    >
      {project.video ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={project.title}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  );

  const title = (
    <h3 className="text-h3 mt-[clamp(1rem,1.56vw,1.875rem)] text-white max-lg:!text-[1.75rem]">
      {project.title}
    </h3>
  );

  return (
    <article
      className={
        project.wide
          ? "w-full max-w-[clamp(840px,73.125vw,1404px)]"
          : "w-full"
      }
    >
      {project.href ? (
        <Link href={project.href} className="block focus-visible:outline-offset-4">
          {media}
          {title}
        </Link>
      ) : (
        <>
          {media}
          {title}
        </>
      )}

      <p
        className={`text-body-sm mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-normal text-white ${
          project.wide
            ? "max-w-[clamp(36rem,50.89vw,61.0625rem)]"
            : "max-w-[clamp(20rem,39.22vw,47.0625rem)]"
        }`}
      >
        {project.summary.includes("strategic brand ") ? (
          <>
            {project.summary.slice(
              0,
              project.summary.indexOf("strategic brand ") +
                "strategic brand ".length,
            )}
            <br className="hidden lg:block" />
            {project.summary.slice(
              project.summary.indexOf("strategic brand ") +
                "strategic brand ".length,
            )}
          </>
        ) : (
          project.summary
        )}
      </p>

      <ul
        className={`mt-[clamp(0.75rem,1.56vw,1.875rem)] flex flex-wrap gap-[clamp(0.5rem,0.78vw,0.9375rem)] ${
          project.tagsSingleRowMobile ? "flex-nowrap md:flex-wrap" : ""
        } ${project.tagsSingleRow ? "lg:flex-nowrap" : ""}`}
      >
        {project.tags.map((tag) => {
          const pill = (
            <span className="inline-flex h-[clamp(2.5rem,2.97vw,3.5625rem)] items-center rounded-[clamp(1.25rem,1.8vw,2.15625rem)] border border-white px-[clamp(0.875rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.9375vw,18px)] font-normal whitespace-nowrap text-white max-lg:!text-[10px] lg:shrink-0">
              {tag}
            </span>
          );

          if (project.tagBreakBefore === tag) {
            return (
              <li key={tag} className="contents">
                <span
                  className="hidden w-full basis-full lg:block"
                  aria-hidden
                />
                {pill}
              </li>
            );
          }

          return <li key={tag}>{pill}</li>;
        })}
      </ul>
    </article>
  );
}

/**
 * Projects page listing — Figma 1912:2115
 * Grid: 2 → full → 2 → full → 2; stacks to 1 col below lg.
 * Dark band: white type / white tag borders; media from homepage Projects assets.
 */
export function ProjectsListing() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const filteredProjects = projects.filter((project) =>
    projectMatchesFilter(project, activeFilter),
  );
  const rows = layoutRows(filteredProjects);

  return (
    <section aria-label="Projects" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(7.5rem,13.75vw,16.5rem)] pb-[clamp(3rem,6.2vw,7.4375rem)]">
        <FadeUp immediate y={28}>
          <h1 className="text-h2 max-w-[clamp(20rem,33.44vw,40.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Designing brands.
            <br />
            Growing businesses.
          </h1>
        </FadeUp>

        <FadeUp immediate delay={120} y={28}>
          <div
            role="group"
            aria-label="Filter projects"
            className="mt-[clamp(1.5rem,3.7vw,4.4375rem)] flex gap-x-[clamp(0.75rem,1.56vw,1.875rem)] gap-y-[clamp(0.75rem,1.56vw,1.875rem)] max-lg:-mr-[clamp(1.25rem,6.25vw,7.5rem)] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:pl-0 max-lg:pr-4 max-lg:snap-x max-lg:snap-mandatory max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:flex-wrap lg:gap-y-[clamp(0.375rem,0.78vw,0.9375rem)]"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              const pill = (
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] shrink-0 items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize whitespace-nowrap ${
                    isActive
                      ? "bg-brand-gradient border-0 text-white"
                      : "border border-white bg-transparent text-white"
                  }`}
                >
                  {filter}
                </button>
              );

              if (filter === "Performance Marketing") {
                return (
                  <span key={filter} className="contents">
                    <span
                      className="hidden w-full basis-full lg:block"
                      aria-hidden
                    />
                    <span className="shrink-0 snap-start">{pill}</span>
                  </span>
                );
              }

              return (
                <span key={filter} className="shrink-0 snap-start">
                  {pill}
                </span>
              );
            })}
          </div>
        </FadeUp>

        <div className="mt-[clamp(2.5rem,6.25vw,7.5rem)] flex flex-col gap-[clamp(2.5rem,4.17vw,5rem)]">
          {rows.map((row, rowIndex) =>
            row.type === "full" ? (
              <FadeUp key={row.project.title} delay={rowIndex * 80}>
                <ProjectCard
                  project={{ ...row.project, wide: true }}
                />
              </FadeUp>
            ) : (
              <div
                key={row.projects.map((p) => p.title).join("-")}
                className="grid grid-cols-1 gap-[clamp(2.5rem,2.6vw,3.125rem)] lg:grid-cols-2"
              >
                {row.projects.map((project, colIndex) => (
                  <FadeUp
                    key={project.title}
                    delay={(rowIndex * 2 + colIndex) * 80}
                  >
                    <ProjectCard
                      project={{ ...project, wide: false }}
                    />
                  </FadeUp>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
