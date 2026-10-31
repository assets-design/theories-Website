import type { Metadata } from "next";
import { AirusCollateral } from "@/components/sections/case-studies/airus/AirusCollateral";
import { AirusDigital } from "@/components/sections/case-studies/airus/AirusDigital";
import { AirusHero } from "@/components/sections/case-studies/airus/AirusHero";
import { AirusIdentity } from "@/components/sections/case-studies/airus/AirusIdentity";
import { AirusLanding } from "@/components/sections/case-studies/airus/AirusLanding";
import { AirusOverview } from "@/components/sections/case-studies/airus/AirusOverview";
import { AirusShowcase } from "@/components/sections/case-studies/airus/AirusShowcase";
import { AirusWireframes } from "@/components/sections/case-studies/airus/AirusWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Airus — Theories Consulting",
  description:
    "Logo design, UI/UX, and web development case study for Airus — brand identity, packaging, wireframes, and digital product design.",
};

/**
 * Airus Casestudy — Figma `1982:5902`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function AirusCaseStudyPage() {
  return (
    <div className="bg-black">
      <AirusHero />
      <AirusOverview />
      <AirusIdentity />
      <AirusCollateral />
      <AirusShowcase />
      <AirusLanding />
      <AirusWireframes />
      <AirusDigital />
      <ReadyToBuild />
    </div>
  );
}
