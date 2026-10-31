import type { Metadata } from "next";
import { ZykazHero } from "@/components/sections/case-studies/zykaz/ZykazHero";
import { ZykazMetrics } from "@/components/sections/case-studies/zykaz/ZykazMetrics";
import { ZykazOverview } from "@/components/sections/case-studies/zykaz/ZykazOverview";
import { ZykazSocial } from "@/components/sections/case-studies/zykaz/ZykazSocial";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Zykaz — Theories Consulting",
  description:
    "Social media marketing case study for Zykaz — Instagram creatives, reels, and campaign design.",
};

/**
 * Zykaz case study — Figma `2354:1213`
 * Order: Hero → Overview → Metrics → Social → CTA
 * Header/Footer via layout. Route: `/projects/zykaz`
 */
export default function ZykazCaseStudyPage() {
  return (
    <div className="bg-black">
      <ZykazHero />
      <ZykazOverview />
      <ZykazMetrics />
      <ZykazSocial />
      <ReadyToBuild />
    </div>
  );
}
