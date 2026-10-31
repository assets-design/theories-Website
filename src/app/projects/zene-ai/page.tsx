import type { Metadata } from "next";
import { ZeneHero } from "@/components/sections/case-studies/zene-ai/ZeneHero";
import { ZeneMetrics } from "@/components/sections/case-studies/zene-ai/ZeneMetrics";
import { ZeneOverview } from "@/components/sections/case-studies/zene-ai/ZeneOverview";
import { ZeneSocial } from "@/components/sections/case-studies/zene-ai/ZeneSocial";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Zene AI — Theories Consulting",
  description:
    "Social media marketing case study for Zene AI — Instagram creatives, reels, and campaign design.",
};

/**
 * Zene AI case study — Figma `2354:886`
 * Order: Hero → Overview → Metrics → Social → CTA
 * Frame also contains leftover Safari Lodges UI blocks (already on
 * /projects/safari-lodges-india) — not duplicated here.
 */
export default function ZeneAiCaseStudyPage() {
  return (
    <div className="bg-black">
      <ZeneHero />
      <ZeneOverview />
      <ZeneMetrics />
      <ZeneSocial />
      <ReadyToBuild />
    </div>
  );
}
