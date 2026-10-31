import type { Metadata } from "next";
import { DcasaCollateral } from "@/components/sections/case-studies/dcasa/DcasaCollateral";
import { DcasaConstruction } from "@/components/sections/case-studies/dcasa/DcasaConstruction";
import { DcasaHero } from "@/components/sections/case-studies/dcasa/DcasaHero";
import { DcasaIdentity } from "@/components/sections/case-studies/dcasa/DcasaIdentity";
import { DcasaOverview } from "@/components/sections/case-studies/dcasa/DcasaOverview";
import { DcasaSignage } from "@/components/sections/case-studies/dcasa/DcasaSignage";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "D'CASA — Theories Consulting",
  description:
    "Logo designing case study for D'CASA Suites — brand identity, logo system, and applications across print and signage.",
};

/**
 * D'CASA Casestudy — Figma `1982:6070`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function DcasaCaseStudyPage() {
  return (
    <div className="bg-black">
      <DcasaHero />
      <DcasaOverview />
      <DcasaConstruction />
      <DcasaIdentity />
      <DcasaCollateral />
      <DcasaSignage />
      <ReadyToBuild />
    </div>
  );
}
