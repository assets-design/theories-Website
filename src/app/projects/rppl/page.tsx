import type { Metadata } from "next";
import { RpplBrandMoment } from "@/components/sections/case-studies/rppl/RpplBrandMoment";
import { RpplHero } from "@/components/sections/case-studies/rppl/RpplHero";
import { RpplIdentity } from "@/components/sections/case-studies/rppl/RpplIdentity";
import { RpplOverview } from "@/components/sections/case-studies/rppl/RpplOverview";
import { RpplShowcase } from "@/components/sections/case-studies/rppl/RpplShowcase";
import { RpplUiShowcase } from "@/components/sections/case-studies/rppl/RpplUiShowcase";
import { RpplWireframes } from "@/components/sections/case-studies/rppl/RpplWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "RPPL Motor Racing — Theories Consulting",
  description:
    "UI/UX Design & Web Development case study for RPPL Motor Racing — wireframes, identity, and high-fidelity product design.",
};

/**
 * RPPL Motor Racing case study — Figma `1966:3172`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function RpplCaseStudyPage() {
  return (
    <div className="bg-black">
      <RpplHero />
      <RpplOverview />
      <RpplShowcase />
      <RpplWireframes />
      <RpplIdentity />
      <RpplUiShowcase />
      <RpplBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
