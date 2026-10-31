import type { Metadata } from "next";

import { MohaBrandBanner } from "@/components/sections/case-studies/moha/MohaBrandBanner";

import { MohaCollateral } from "@/components/sections/case-studies/moha/MohaCollateral";

import { MohaHero } from "@/components/sections/case-studies/moha/MohaHero";

import { MohaOverview } from "@/components/sections/case-studies/moha/MohaOverview";

import { MohaPackaging } from "@/components/sections/case-studies/moha/MohaPackaging";

import { MohaHeritageCards } from "@/components/sections/case-studies/moha/MohaHeritageCards";
import { MohaSocialCampaign } from "@/components/sections/case-studies/moha/MohaSocialCampaign";
import { MohaSocialFan } from "@/components/sections/case-studies/moha/MohaSocialFan";
import { MohaSocialOverlap } from "@/components/sections/case-studies/moha/MohaSocialOverlap";

import { MohaStorefront } from "@/components/sections/case-studies/moha/MohaStorefront";

import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";



export const metadata: Metadata = {

  title: "MOHA — Theories Consulting",

  description:

    "Logo design case study — premium brand identity system spanning strategy, visual identity, and customer touchpoints.",

};



/**

 * MOHA Logo Casestudy — Figma `2235:523`

 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.

 */

export default function MohaCaseStudyPage() {

  return (

    <div className="bg-black">

      <MohaHero />

      <MohaOverview />

      <MohaBrandBanner />

      <MohaCollateral />

      <MohaStorefront />

      <MohaPackaging />

      <MohaSocialFan />

      <MohaSocialCampaign />

      <MohaSocialOverlap />

      <MohaHeritageCards />

      <ReadyToBuild />

    </div>

  );

}
