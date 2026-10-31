import { FadeUp } from "@/components/motion/FadeUp";

const REASONS = [
  {
    num: "01",
    title: "Variety of Work",
    description: "Work across industries, brands, formats and ideas.",
    highlight: "No two briefs look the same.",
  },
  {
    num: "02",
    title: "Learn By Doing",
    description: "Take ownership, experiment, make mistakes and get better.",
    highlight: "High agency, fast iterations.",
  },
  {
    num: "03",
    title: "Work With Smart People",
    description:
      "Collaborate with people from creative, strategy, marketing and technology.",
    highlight: "Diverse brains, unified vision.",
  },
  {
    num: "04",
    title: "Ideas Matter",
    description: "Good ideas don't care about job titles.",
    highlight: "Best concept always wins.",
  },
  {
    num: "05",
    title: "Grow With Us",
    description: "We're growing — and there's room for you to grow with us.",
    highlight: "Direct impact on scale.",
  },
];

export function CareersWhyTheories() {
  return (
    <section
      id="why-theories"
      aria-label="Why Theories"
      className="relative scroll-mt-28 border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3.5rem,7vw,8rem)]">
        <div className="max-w-[clamp(20rem,60vw,72rem)]">
          <FadeUp>
            <h2 className="text-h2 leading-[1.1] text-white max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
              Because boring work
              <br />
              <span className="text-white/60">isn&apos;t really our thing.</span>
            </h2>
          </FadeUp>
        </div>

        {/* 5 pillars cards */}
        <div className="mt-[clamp(2.5rem,4.5vw,5.5rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {REASONS.map((item, idx) => (
            <FadeUp
              key={item.num}
              delay={idx * 70}
              className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-[clamp(1.5rem,2.2vw,2.5rem)] backdrop-blur-sm transition-all duration-300 hover:border-[#fe4a01]/60 hover:bg-white/[0.06] hover:shadow-[0_10px_30px_rgba(254,74,1,0.1)] ${
                idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.2vw,2.5rem)] text-white/30 transition-colors group-hover:text-[#fe4a01]">
                    {item.num}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors group-hover:bg-[#fe4a01]/10 group-hover:text-[#feba07]">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-highlight)] text-[clamp(1.15rem,1.45vw,1.65rem)] mt-[clamp(1.25rem,1.8vw,2rem)] text-white">
                  {item.title}
                </h3>

                <p className="font-[family-name:var(--font-body)] text-[clamp(0.875rem,1vw,1.125rem)] mt-2.5 leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-6 h-0.5 w-8 rounded-full bg-white/10 transition-all duration-300 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-[#fe4a01] group-hover:to-[#feba07]" />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
