import type { Metadata } from "next";
import { HbbBrandMoment } from "@/components/sections/case-studies/hbb/HbbBrandMoment";
import { HbbHero } from "@/components/sections/case-studies/hbb/HbbHero";
import { HbbIdentity } from "@/components/sections/case-studies/hbb/HbbIdentity";
import { HbbOverview } from "@/components/sections/case-studies/hbb/HbbOverview";
import { HbbProcess } from "@/components/sections/case-studies/hbb/HbbProcess";
import { HbbUiShowcase } from "@/components/sections/case-studies/hbb/HbbUiShowcase";
import { HbbWireframes } from "@/components/sections/case-studies/hbb/HbbWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Hyderabad Black Birds — Theories Consulting",
  description:
    "UI/UX Design & Web Development case study for Hyderabad Black Birds — wireframes, identity, and high-fidelity product design.",
};

/**
 * HBB Website Casestudy — Figma `1720:5006`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function HbbCaseStudyPage() {
  return (
    <div className="bg-black">
      <HbbHero />
      <HbbOverview />
      <HbbProcess />
      <HbbWireframes />
      <HbbIdentity />
      <HbbUiShowcase />
      <HbbBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
