import { FadeUp } from "@/components/motion/FadeUp";

const services = [
  {
    icon: "/images/case-studies/celeste/icon-meta-v2.png",
    title: "Meta & Google Ads",
    lines: ["6 ad creatives", "Lead gen campaigns", "1,019 leads at ₹393 CPL"],
  },
  {
    icon: "/images/case-studies/celeste/icon-outdoor-v2.png",
    title: "Outdoor Hoardings",
    lines: [
      "2 large-format hoardings",
      "Boduppal–Chengicherla belt",
      "Massive local presence",
    ],
  },
  {
    icon: "/images/case-studies/celeste/icon-standees-v2.png",
    title: "Lollipop Standees",
    lines: [
      "5 standee designs",
      '"Beyond" creative series',
      "Strategic placement",
    ],
  },
  {
    icon: "/images/case-studies/celeste/icon-auto-v2.png",
    title: "Auto Branding",
    lines: [
      "Transit media creative",
      "Day & Residential Campus",
      "Eastern corridor routes",
    ],
  },
  {
    icon: "/images/case-studies/celeste/icon-print-v2.png",
    title: "Print Collateral",
    lines: [
      "20-page school brochure",
      "Admissions flyer",
      "3×4 signage boards",
    ],
  },
  {
    icon: "/images/case-studies/celeste/icon-instagram-v2.png",
    title: "Instagram & Reels",
    lines: [
      "Campaign ad creatives",
      "Residence life reel",
      "Social content strategy",
    ],
  },
] as const;

/**
 * Services scope cards — Figma `2281:1735`
 */
export function CelesteServices() {
  return (
    <section aria-label="Campaign scope" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(18rem,53.44vw,64.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            A complete admissions machine digital, print, outdoor &amp;
            collateral.
          </h2>
        </FadeUp>

        <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] grid gap-[clamp(0.75rem,1.56vw,1.875rem)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={40 + i * 40}>
              <article className="flex min-h-[clamp(16rem,26.3vw,31.5625rem)] flex-col rounded-[clamp(0.75rem,1.04vw,1.25rem)] bg-[#1a1a1a] p-[clamp(1.25rem,3.125vw,3.75rem)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt=""
                  className="size-[clamp(2.5rem,3.85vw,4.625rem)] object-contain"
                  aria-hidden
                  draggable={false}
                />
                <h3 className="mt-[clamp(1.25rem,3.125vw,3.75rem)] font-[family-name:var(--font-display)] text-[clamp(1.125rem,1.77vw,2.125rem)] leading-[normal] text-white">
                  {s.title}
                </h3>
                <ul className="mt-[clamp(0.75rem,1.56vw,1.875rem)] space-y-1 font-[family-name:var(--font-body)] text-[clamp(0.875rem,1.15vw,1.375rem)] leading-[1.45] text-white/80">
                  {s.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
