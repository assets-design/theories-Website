import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

/** Homepage / contact-form service offerings (four stages). */
export const HOMEPAGE_SERVICES = [
  {
    number: "01",
    title: "Shaping Theories",
    href: "/services#shaping",
    description:
      "Before anything gets made, it gets decided. Brand naming, identity, positioning and strategy, the thinking that makes every later choice easier.",
    icon: "/images/icons/service-shaping.png",
  },
  {
    number: "02",
    title: "Building Theories",
    href: "/services#building",
    description:
      "Websites, apps and platforms that load fast and convert honestly. Design and development in one room, so nothing gets lost in handoff.",
    icon: "/images/icons/service-building.png",
  },
  {
    number: "03",
    title: "Transforming Theories",
    href: "/services#transforming",
    description:
      "Performance marketing, SEO, social and AI automation. Systems that compound instead of campaigns that expire.",
    icon: "/images/icons/service-transforming.png",
  },
  {
    number: "04",
    title: "Crafting Theories",
    href: "/services#crafting",
    description:
      "Films, content and campaign creative. Ideas made for where they'll actually be watched, not where they'll be presented.",
    icon: "/images/icons/service-crafting.png",
  },
] as const;

export const SERVICE_OPTIONS = HOMEPAGE_SERVICES.map((s) => s.title);

/**
 * Services — Figma 1804:1904 (100% desktop match)
 *
 * Content inset 120 · band 1680
 * H2 @ 64 · number/title @ 50 · desc @ 18 Poppins Regular
 * Columns (from content left): num 5.536% · icon 20% · title 25.357% · desc 61.548% / 32.917%
 * Row height 300 (120 pad + 60 content + 120 pad) · section pt 149
 */
export function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] pt-[clamp(2.5rem,7.76vw,9.3125rem)] pb-[clamp(2rem,3.75vw,4.5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(20rem,58.54vw,70.25rem)] leading-[normal] max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            <span className="max-md:inline-block max-md:whitespace-nowrap">
              We shape, build,
            </span>
            <br className="md:hidden" />{" "}
            <span className="max-md:inline-block max-md:whitespace-nowrap">
              transform, and design
            </span>
            <br className="md:hidden" />{" "}
            <span className="max-md:inline-block max-md:whitespace-nowrap">
              for tomorrow.
            </span>
          </h2>
        </FadeUp>

        {/* Figma: first hairline 252px below H2 top ≈ 124px after 2-line title */}
        <ul className="mt-[clamp(2.5rem,6.46vw,7.75rem)]">
          {HOMEPAGE_SERVICES.map((service, index) => (
            <li
              key={service.number}
              className="border-t border-[#ffffff33] last:border-b"
            >
              <FadeUp delay={index * 80}>
                {/* Mobile / tablet */}
                <div className="flex flex-col gap-4 py-8 lg:hidden">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-[1.75rem] font-normal leading-none">
                      {service.number}
                    </span>
                    <span className="relative size-10 shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.icon}
                        alt=""
                        width={60}
                        height={60}
                        className="absolute inset-0 size-full object-contain"
                      />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.75rem] font-normal leading-none">
                      <Link
                        href={service.href}
                        className="transition-opacity hover:opacity-80"
                      >
                        {service.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[15px] font-normal leading-[1.445]">
                    {service.description}
                  </p>
                </div>

                {/* Desktop — Figma column locks */}
                <div className="relative hidden h-[clamp(11.25rem,15.625vw,18.75rem)] lg:block">
                  <span className="absolute top-1/2 left-[5.536%] -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.604vw,3.125rem)] font-normal leading-none whitespace-nowrap">
                    {service.number}
                  </span>

                  <span className="absolute top-1/2 left-[20%] size-[clamp(40px,3.125vw,60px)] -translate-y-1/2 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.icon}
                      alt=""
                      width={60}
                      height={60}
                      className="absolute inset-0 size-full object-contain"
                    />
                  </span>

                  <h3 className="absolute top-1/2 left-[25.357%] -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.604vw,3.125rem)] font-normal leading-none whitespace-nowrap">
                    <Link
                      href={service.href}
                      className="transition-opacity hover:opacity-80"
                    >
                      {service.title}
                    </Link>
                  </h3>

                  <p className="absolute top-1/2 left-[61.548%] w-[32.917%] -translate-y-1/2 font-[family-name:var(--font-body)] text-[clamp(0.8125rem,0.9375vw,18px)] font-normal leading-[1.445]">
                    {service.description}
                  </p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
