import type { Metadata } from "next";

import { HowtoApplications } from "@/components/sections/case-studies/howto/HowtoApplications";

import { HowtoBillboard } from "@/components/sections/case-studies/howto/HowtoBillboard";

import { HowtoBrandBanner } from "@/components/sections/case-studies/howto/HowtoBrandBanner";

import { HowtoColours } from "@/components/sections/case-studies/howto/HowtoColours";

import { HowtoHero } from "@/components/sections/case-studies/howto/HowtoHero";

import { HowtoIdentity } from "@/components/sections/case-studies/howto/HowtoIdentity";

import { HowtoLanding } from "@/components/sections/case-studies/howto/HowtoLanding";

import { HowtoOverview } from "@/components/sections/case-studies/howto/HowtoOverview";

import { HowtoSocial } from "@/components/sections/case-studies/howto/HowtoSocial";

import { HowtoWebsite } from "@/components/sections/case-studies/howto/HowtoWebsite";

import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";



export const metadata: Metadata = {

  title: "How To — Theories Consulting",

  description:

    "Logo designing case study for How To — brand identity, colour system, social media, and digital applications.",

};



/**

 * How To Casestudy — Figma `2239:800`

 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.

 */

export default function HowtoCaseStudyPage() {

  return (

    <div className="bg-black">

      <HowtoHero />

      <HowtoOverview />

      <HowtoBrandBanner />

      <HowtoColours />

      <HowtoIdentity />

      <HowtoBillboard />

      <HowtoApplications />

      <HowtoSocial />

      <HowtoLanding />

      <HowtoWebsite />

      <ReadyToBuild />

    </div>

  );

}
