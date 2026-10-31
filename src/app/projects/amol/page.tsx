import type { Metadata } from "next";
import { AmolBrandMoment } from "@/components/sections/case-studies/amol/AmolBrandMoment";
import { AmolHero } from "@/components/sections/case-studies/amol/AmolHero";
import { AmolIdentity } from "@/components/sections/case-studies/amol/AmolIdentity";
import { AmolOverview } from "@/components/sections/case-studies/amol/AmolOverview";
import { AmolShowcase } from "@/components/sections/case-studies/amol/AmolShowcase";
import { AmolUiShowcase } from "@/components/sections/case-studies/amol/AmolUiShowcase";
import { AmolWireframes } from "@/components/sections/case-studies/amol/AmolWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Amol — Theories Consulting",
  description:
    "UI/UX Design & Web Development case study for Amol — wireframes, identity, and high-fidelity product design.",
};

/**
 * Amol case study — Figma `2014:476`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function AmolCaseStudyPage() {
  return (
    <div className="bg-black">
      <AmolHero />
      <AmolOverview />
      <AmolShowcase />
      <AmolWireframes />
      <AmolIdentity />
      <AmolUiShowcase />
      <AmolBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
