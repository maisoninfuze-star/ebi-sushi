import type { Metadata } from "next";

import { LocationSection } from "@/components/home/LocationSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconInstagram, IconFacebook, IconArrowRight } from "@/components/ui/Icons";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { business } from "@/config/business";
import { seo } from "@/config/site";
import { dict } from "@/i18n/fr";

export const metadata: Metadata = {
  title: { absolute: seo.contact.title },
  description: seo.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: seo.contact.title,
    description: seo.contact.description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <header className="bg-ink pb-16 pt-32 sm:pt-40">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow={dict.contact.eyebrow}
            title={dict.contact.title}
            description={dict.contact.description}
            className="max-w-3xl"
          />
        </div>
      </header>

      <LocationSection className="border-t border-ivory/[0.08]" />

      {/* Réseaux et plateforme partenaire */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="eyebrow">{dict.footer.follow}</h2>
              <p className="mt-5 max-w-[38ch] font-display text-2xl font-light leading-snug text-ivory">
                Les nouveautés de la carte et les coulisses du comptoir.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center gap-3 border border-ivory/15 px-5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory/85 transition-colors duration-500 hover:border-champagne/60 hover:text-ivory"
                >
                  <IconInstagram className="size-4 text-champagne" />
                  Instagram
                  <span className="font-normal normal-case tracking-normal text-ash">
                    {business.social.instagramHandle}
                  </span>
                </a>

                <a
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-3 border border-ivory/15 px-5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory/85 transition-colors duration-500 hover:border-champagne/60 hover:text-ivory"
                >
                  <IconFacebook className="size-4 text-champagne" />
                  Facebook
                </a>
              </div>
            </Reveal>

            {business.delivery.partner && (
              <Reveal delay={0.12}>
                <h2 className="eyebrow">{dict.contact.deliveryPartner}</h2>
                <p className="mt-5 max-w-[38ch] font-display text-2xl font-light leading-snug text-ivory">
                  Ebi Sushi est aussi disponible sur {business.delivery.partner.name}.
                </p>
                <p className="mt-4 max-w-[44ch] font-sans text-sm leading-relaxed text-ash">
                  Pour commander directement auprès du restaurant, utilisez la carte du site : votre
                  commande est transmise à l&apos;équipe sans intermédiaire.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/menu" size="md">
                    {dict.hero.primaryCta}
                  </Button>
                  <a
                    href={business.delivery.partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 items-center gap-2.5 px-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ash transition-colors hover:text-ivory"
                  >
                    Voir sur {business.delivery.partner.name}
                    <IconArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Accueil", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
    </>
  );
}
