import type { Metadata } from "next";

import { MenuExperience } from "@/components/menu/MenuExperience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { seo } from "@/config/site";
import { dict } from "@/i18n/fr";
import { availableItems, visibleCategories, priceRange } from "@/data/menu";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: seo.menu.title },
  description: seo.menu.description,
  alternates: { canonical: "/menu" },
  openGraph: {
    title: seo.menu.title,
    description: seo.menu.description,
    url: "/menu",
  },
};

export default function MenuPage() {
  return (
    <>
      {/* En-tête de page — l'en-tête fixe étant opaque ici, on décale le contenu. */}
      <header className="border-b border-ivory/[0.08] bg-ink pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow={dict.menu.eyebrow}
            title={dict.menu.title}
            description={dict.menu.description}
            className="max-w-3xl"
          />

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5">
            <div>
              <dt className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-ash">
                Plats à la carte
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-light text-ivory">
                {availableItems.length}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-ash">
                Catégories
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-light text-ivory">
                {visibleCategories.length}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-ash">
                À partir de
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-light text-ivory">
                {formatPrice(priceRange.min)}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="bg-ink pt-10">
        <MenuExperience />
      </div>

      <MenuSchema />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", href: "/" },
          { name: "La carte", href: "/menu" },
        ]}
      />
    </>
  );
}
