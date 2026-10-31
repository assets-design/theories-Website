import type { Metadata } from "next";
import { SafariBrandMoment } from "@/components/sections/case-studies/safari-lodges/SafariBrandMoment";
import { SafariHero } from "@/components/sections/case-studies/safari-lodges/SafariHero";
import { SafariIdentity } from "@/components/sections/case-studies/safari-lodges/SafariIdentity";
import { SafariLanding } from "@/components/sections/case-studies/safari-lodges/SafariLanding";
import { SafariMetrics } from "@/components/sections/case-studies/safari-lodges/SafariMetrics";
import { SafariOverview } from "@/components/sections/case-studies/safari-lodges/SafariOverview";
import { SafariSocial } from "@/components/sections/case-studies/safari-lodges/SafariSocial";
import { SafariUiShowcase } from "@/components/sections/case-studies/safari-lodges/SafariUiShowcase";
import { SafariWireframes } from "@/components/sections/case-studies/safari-lodges/SafariWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Safari Lodges India — Theories Consulting",
  description:
    "UI/UX Design & Web Development case study for Safari Lodges India — social creatives, wireframes, identity, and high-fidelity product design.",
};

/**
 * Safari Lodges India case study — Figma `2037:996`
 * Order: Hero → Overview → Metrics → Social → Landing → Wireframes → Identity → UI → Brand moment → CTA
 */
export default function SafariLodgesCaseStudyPage() {
  return (
    <div className="bg-black">
      <SafariHero />
      <SafariOverview />
      <SafariMetrics />
      <SafariSocial />
      <SafariLanding />
      <SafariWireframes />
      <SafariIdentity />
      <SafariUiShowcase />
      <SafariBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
