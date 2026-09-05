import type { Metadata } from "next";

import { ReservationForm } from "@/components/reservation/ReservationForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Reveal } from "@/components/ui/Reveal";
import { IconPhone, IconClock, IconPin } from "@/components/ui/Icons";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { business } from "@/config/business";
import { seo } from "@/config/site";
import { dict } from "@/i18n/fr";

export const metadata: Metadata = {
  title: { absolute: seo.reservation.title },
  description: seo.reservation.description,
  alternates: { canonical: "/reservation" },
  openGraph: {
    title: seo.reservation.title,
    description: seo.reservation.description,
    url: "/reservation",
  },
};

export default function ReservationPage() {
  return (
    <>
      <div className="bg-ink pb-24 pt-32 sm:pb-28 sm:pt-40">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Colonne éditoriale */}
            <div className="lg:col-span-5">
              <SectionHeading
                as="h1"
                eyebrow={dict.reservation.eyebrow}
                title={dict.reservation.title}
                description={dict.reservation.text}
              />

              <Reveal delay={0.18}>
                <div className="mt-12 overflow-hidden">
                  <OptimizedImage
                    src="/images/comptoir-sushi-bar.jpg"
                    alt="Comptoir à sushi d'Ebi Sushi, éclairage chaud et bois sombre"
                    width={800}
                    height={1000}
                    quality={76}
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    wrapperClassName="aspect-4/5 w-full max-w-md"
                    className="size-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <ul className="mt-11 space-y-5 border-t border-ivory/[0.08] pt-8">
                  <li className="flex gap-3.5">
                    <IconPhone className="mt-0.5 size-4 shrink-0 text-champagne" />
                    <a
                      href={`tel:${business.phone.e164}`}
                      className="inline-block py-1 font-sans text-sm text-ivory/80 transition-colors hover:text-ivory"
                    >
                      {business.phone.display}
                    </a>
                  </li>
                  <li className="flex gap-3.5">
                    <IconClock className="mt-0.5 size-4 shrink-0 text-champagne" />
                    <span className="font-sans text-sm text-ivory/80">
                      {business.hours.summary}
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <IconPin className="mt-0.5 size-4 shrink-0 text-champagne" />
                    <span className="max-w-[30ch] font-sans text-sm leading-relaxed text-ivory/80">
                      {business.address.full}
                    </span>
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* Formulaire */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="border border-ivory/[0.08] bg-charcoal p-6 sm:p-10 lg:p-12">
                <h2 className="font-display text-2xl font-light text-ivory">
                  Votre demande de réservation
                </h2>
                <p className="mt-2 font-sans text-sm text-ash">
                  Tous les champs marqués comme obligatoires sont nécessaires au traitement.
                </p>

                <div className="mt-9">
                  <ReservationForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <BreadcrumbSchema
        items={[
          { name: "Accueil", href: "/" },
          { name: "Réservation", href: "/reservation" },
        ]}
      />
    </>
  );
}
