import type { Metadata } from "next";
import { ServicesCatalog } from "@/components/sections/services/ServicesCatalog";
import { ServicesCta } from "@/components/sections/services/ServicesCta";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesOverview } from "@/components/sections/services/ServicesOverview";

export const metadata: Metadata = {
  title: "Services — Theories Consulting",
  description:
    "The work we do at Theories: shaping brands, building products, transforming growth, and crafting content — design that begins where the business does.",
};

export default function ServicesPage() {
  return (
    <div className="bg-black">
      <ServicesHero />
      <ServicesOverview />
      <ServicesCatalog />
      <ServicesCta />
    </div>
  );
}
