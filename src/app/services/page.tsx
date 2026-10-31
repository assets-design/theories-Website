import type { Metadata } from "next";
import { Services2Cta } from "@/components/sections/services2/Services2Cta";
import { Services2Hero } from "@/components/sections/services2/Services2Hero";
import { Services2Stages } from "@/components/sections/services2/Services2Stages";

export const metadata: Metadata = {
  title: "Services — Theories Consulting",
  description:
    "Four stages of work: Shaping, Building, Transforming, and Crafting Theories. Most brands need two or three.",
};

export default function ServicesPage() {
  return (
    <div className="bg-black">
      <Services2Hero />
      <Services2Stages />
      <Services2Cta />
    </div>
  );
}
