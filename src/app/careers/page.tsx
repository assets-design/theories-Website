import type { Metadata } from "next";
import { CareersGeneralApplication } from "@/components/sections/careers/CareersGeneralApplication";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersLifeAtTheories } from "@/components/sections/careers/CareersLifeAtTheories";
import { CareersOpenPositions } from "@/components/sections/careers/CareersOpenPositions";
import { CareersWhatWeLookFor } from "@/components/sections/careers/CareersWhatWeLookFor";
import { CareersWhyTheories } from "@/components/sections/careers/CareersWhyTheories";

export const metadata: Metadata = {
  title: "Careers — Theories Consulting",
  description:
    "Your next big idea could start here. Join Theories Consulting — a team of thinkers, creators, strategists, and doers turning theories into traction.",
};

export default function CareersPage() {
  return (
    <div className="bg-black">
      <CareersHero />
      <CareersWhyTheories />
      <CareersLifeAtTheories />
      <CareersWhatWeLookFor />
      <CareersOpenPositions />
      <CareersGeneralApplication />
    </div>
  );
}
