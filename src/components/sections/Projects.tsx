import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

type Project = {
  title: string;
  summary: string;
  image: string;
  /** Optional looping video — replaces the top image, same frame size */
  video?: string;
  tags: string[];
  wide?: boolean;
  /** Desktop only — force a new tag row before this label */
  tagBreakBefore?: string;
  /** Mobile only — keep all tags on one row */
  tagsSingleRowMobile?: boolean;
  /** Desktop only — keep all tags on one row */
  tagsSingleRow?: boolean;
  href?: string;
};

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
    tagsSingleRowMobile: true,
    href: "/projects/celeste",
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
    wide: true,
    href: "/projects/howto",
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
    video: "/videos/1fc9-e07c-4600-89f7-1342fa087fc7.mp4",
    tags: ["UI/UX Design", "Application Development", "Mobile App Design"],
    tagsSingleRow: true,
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
    title: "RPPL Motor Racing",
    summary:
      "Motorsport ambition translated into a digital identity with the same precision as the track.",
    image: "/images/projects/rppl.jpg",
    tags: ["UI/UX Design", "Web Development"],
    href: "/projects/rppl",
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
    <h3 className="text-h3 mt-[clamp(1rem,1.56vw,1.875rem)] text-black max-lg:!text-[1.75rem]">
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
        className={`text-body-sm mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-normal text-black ${
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
            <span className="inline-flex h-[clamp(2.5rem,2.97vw,3.5625rem)] items-center rounded-[clamp(1.25rem,1.8vw,2.15625rem)] border border-black px-[clamp(0.875rem,1.56vw,1.875rem)] font-[family-name:var(--font-body)] text-[clamp(0.875rem,0.9375vw,18px)] font-normal whitespace-nowrap text-black max-lg:!text-[10px] lg:shrink-0">
              {tag}
            </span>
          );

          if (project.tagBreakBefore === tag) {
            return (
              <li key={tag} className="contents">
                {/* Desktop only: push following tags to line 2 */}
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
 * Projects — homepage grid: 2 → full → 2 → full → 2.
 * Omits Airus, Mahesh Agencies, D'CASA (projects page only).
 */
export function Projects() {
  const [hbb, oakside, howto, aircraft, eswap, lohitha, zykla, rppl] =
    projects;

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="bg-white text-black"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2.5rem,3.125vw,3.75rem)] pb-[clamp(3rem,6.2vw,7.4375rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,57.66vw,69.1875rem)] max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            <span className="max-md:inline-block max-md:whitespace-nowrap">
              Explore how theory
            </span>
            <br className="md:hidden" />{" "}
            <span className="max-md:inline-block max-md:whitespace-nowrap">
              meets execution.
            </span>
          </h2>
        </FadeUp>

        <div className="mt-[clamp(2rem,4.17vw,5rem)] flex flex-col gap-[clamp(2.5rem,4.17vw,5rem)]">
          {/* Row 1 — half / half */}
          <div className="grid grid-cols-1 gap-[clamp(2.5rem,2.6vw,3.125rem)] lg:grid-cols-2">
            <FadeUp>
              <ProjectCard project={{ ...hbb, wide: false }} />
            </FadeUp>
            <FadeUp delay={100}>
              <ProjectCard project={{ ...oakside, wide: false }} />
            </FadeUp>
          </div>

          {/* Row 2 — full */}
          <FadeUp>
            <ProjectCard project={{ ...howto, wide: true }} />
          </FadeUp>

          {/* Row 3 — half / half */}
          <div className="grid grid-cols-1 gap-[clamp(2.5rem,2.6vw,3.125rem)] lg:grid-cols-2">
            <FadeUp>
              <ProjectCard project={{ ...aircraft, wide: false }} />
            </FadeUp>
            <FadeUp delay={100}>
              <ProjectCard project={{ ...eswap, wide: false }} />
            </FadeUp>
          </div>

          {/* Row 4 — full */}
          <FadeUp>
            <ProjectCard project={{ ...lohitha, wide: true }} />
          </FadeUp>

          {/* Row 5 — half / half */}
          <div className="grid grid-cols-1 gap-[clamp(2.5rem,2.6vw,3.125rem)] lg:grid-cols-2">
            <FadeUp>
              <ProjectCard project={{ ...zykla, wide: false }} />
            </FadeUp>
            <FadeUp delay={100}>
              <ProjectCard project={{ ...rppl, wide: false }} />
            </FadeUp>
          </div>
        </div>

        <FadeUp>
          <div className="mt-[clamp(2.5rem,4.17vw,5rem)] flex justify-center">
            <Link
              href="/projects/"
              className="bg-brand-gradient text-cta inline-flex h-[clamp(2.75rem,3.07vw,3.6875rem)] items-center justify-center rounded-[clamp(1.75rem,3.125vw,3.75rem)] px-[clamp(1.25rem,1.56vw,1.875rem)] capitalize text-white"
            >
              View all projects
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
