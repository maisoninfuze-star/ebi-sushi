import Link from "next/link";

import { SignatureDishCard } from "@/components/home/SignatureDishCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/Icons";
import { featuredItemIds } from "@/data/featured";
import { getItem } from "@/data/menu";
import { dict } from "@/i18n/fr";
import { cn } from "@/lib/utils";

export function SignatureDishes() {
  const dishes = featuredItemIds
    .map(getItem)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (dishes.length === 0) return null;

  return (
    <section id="signatures" className="bg-ink py-24 sm:py-28 lg:py-(--spacing-section)">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            eyebrow={dict.signatures.eyebrow}
            title={dict.signatures.title}
            description={dict.signatures.description}
            className="lg:max-w-2xl"
          />

          <Reveal delay={0.2} className="shrink-0">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 border-b border-ivory/20 py-2.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:border-champagne hover:text-champagne"
            >
              {dict.signatures.viewAll}
              <IconArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Carrousel à aimantation sur mobile, grille décalée sur grand écran. */}
        <ul
          className={cn(
            "no-scrollbar mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:mt-20",
            // Le débord ramène le carrousel bord à bord ; `scroll-pl` évite que
            // l'aimantation ne mange la marge de gauche à la première carte.
            "-mx-5 px-5 scroll-pl-5 sm:-mx-10 sm:px-10 sm:scroll-pl-10",
            "lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 lg:overflow-visible lg:px-0 lg:pb-0",
          )}
        >
          {dishes.map((dish, i) => (
            <Reveal
              as="li"
              key={dish.id}
              delay={(i % 3) * 0.09}
              className={cn(
                "w-[78vw] max-w-[21rem] shrink-0 snap-start sm:w-[52vw] lg:w-auto lg:max-w-none",
                // Décalage vertical de la colonne centrale : rythme éditorial.
                i % 3 === 1 && "lg:mt-24",
              )}
            >
              <SignatureDishCard item={dish} />
            </Reveal>
          ))}
        </ul>

        <p
          aria-hidden
          className="mt-6 text-center font-sans text-[0.625rem] uppercase tracking-[0.2em] text-ash/50 lg:hidden"
        >
          {dict.signatures.swipeHint}
        </p>
      </div>
    </section>
  );
}
