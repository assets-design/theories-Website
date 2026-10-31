import type { Metadata } from "next";
import { JcnBrandMoment } from "@/components/sections/case-studies/jcn-consulting/JcnBrandMoment";
import { JcnHero } from "@/components/sections/case-studies/jcn-consulting/JcnHero";
import { JcnIdentity } from "@/components/sections/case-studies/jcn-consulting/JcnIdentity";
import { JcnOverview } from "@/components/sections/case-studies/jcn-consulting/JcnOverview";
import { JcnProcess } from "@/components/sections/case-studies/jcn-consulting/JcnProcess";
import { JcnUiShowcase } from "@/components/sections/case-studies/jcn-consulting/JcnUiShowcase";
import { JcnWireframes } from "@/components/sections/case-studies/jcn-consulting/JcnWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "JCN Consulting — Theories Consulting",
  description:
    "UI/UX Design & Web Development case study for JCN Consulting — wireframes, identity, and high-fidelity product design.",
};

/**
 * JCN Consulting case study — Figma `1975:5261`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function JcnCaseStudyPage() {
  return (
    <div className="bg-black">
      <JcnHero />
      <JcnOverview />
      <JcnProcess />
      <JcnWireframes />
      <JcnIdentity />
      <JcnUiShowcase />
      <JcnBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
