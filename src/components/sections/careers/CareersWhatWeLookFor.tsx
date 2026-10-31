import { FadeUp } from "@/components/motion/FadeUp";

const TRAITS = [
  {
    word: "Think.",
    subtitle: "Don't just execute. Ask why.",
    detail:
      "Question the assumptions, understand the business problem, and look beyond the surface.",
  },
  {
    word: "Create.",
    subtitle: "Bring ideas, perspectives and new approaches.",
    detail:
      "Originality matters. We encourage fresh visual thinking and bold conceptual leaps.",
  },
  {
    word: "Learn.",
    subtitle: "Stay curious and keep getting better.",
    detail:
      "Tools evolve, culture changes, design shifts. We value people hungry to master the new.",
  },
  {
    word: "Own.",
    subtitle: "Take responsibility for the work.",
    detail:
      "We believe in extreme ownership. If you build it, see it through to perfection.",
  },
  {
    word: "Collaborate.",
    subtitle: "Great work is rarely a solo project.",
    detail:
      "We critique respectfully, share knowledge, and lift the collective standard together.",
  },
  {
    word: "Adapt.",
    subtitle: "Because the brief can change. And that's okay.",
    detail:
      "Real client work is fast-moving. Resilience and agility turn constraints into art.",
  },
];

export function CareersWhatWeLookFor() {
  return (
    <section
      aria-label="What we look for"
      className="relative border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3.5rem,7vw,8rem)]">
        <div className="max-w-[clamp(20rem,60vw,72rem)]">
          <FadeUp>
            <h2 className="text-h2 leading-[1.1] text-white max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
              Talent is great.
              <br />
              <span className="text-[#feba07]">Curiosity is better.</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.2vw,1.35rem)] mt-4 text-white/70">
              We&apos;re looking for people who bring conviction, taste, and craft:
            </p>
          </FadeUp>
        </div>

        {/* 6 core traits grid */}
        <div className="mt-[clamp(2.5rem,4.5vw,5.5rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {TRAITS.map((trait, idx) => (
            <FadeUp
              key={trait.word}
              delay={idx * 60}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-[clamp(1.5rem,2.2vw,2.5rem)] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07]"
            >
              <div>
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,2.8vw,3.25rem)] tracking-tight text-white transition-colors group-hover:text-[#fe4a01]">
                    {trait.word}
                  </h3>
                  <span className="font-mono text-xs text-white/40">
                    0{idx + 1}
                  </span>
                </div>

                <p className="font-[family-name:var(--font-highlight)] text-[clamp(1rem,1.2vw,1.35rem)] mt-4 font-semibold text-white/95">
                  {trait.subtitle}
                </p>

                <p className="font-[family-name:var(--font-body)] text-[clamp(0.85rem,0.95vw,1.05rem)] mt-2 leading-relaxed text-white/60">
                  {trait.detail}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#feba07] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span>Theories Mindset</span>
                <span>→</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
