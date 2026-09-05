import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { StorySection } from "@/components/home/StorySection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Gallery } from "@/components/home/Gallery";
import { Reviews } from "@/components/home/Reviews";
import { ReservationBand } from "@/components/home/ReservationBand";
import { LocationSection } from "@/components/home/LocationSection";
import { FinalCta } from "@/components/home/FinalCta";
import { seo } from "@/config/site";

export const metadata: Metadata = {
  // Titre déjà complet : on court-circuite le gabarit du layout.
  title: { absolute: seo.home.title },
  description: seo.home.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceStrip />
      <SignatureDishes />
      <StorySection />
      <ExperienceSection />
      <Gallery />
      <Reviews />
      <ReservationBand />
      <LocationSection />
      <FinalCta />
    </>
  );
}
