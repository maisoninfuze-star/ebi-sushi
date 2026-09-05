import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/config/business";
import { seo } from "@/config/site";
import { dict } from "@/i18n/fr";

export const metadata: Metadata = {
  title: { absolute: seo.privacy.title },
  description: seo.privacy.description,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * TODO — TEXTE JURIDIQUE À VALIDER.
 * Cette page décrit fidèlement ce que le site fait réellement aujourd'hui
 * (aucun compte, aucun paiement, aucune analyse d'audience, transmission des
 * demandes via WhatsApp). Elle doit être relue et complétée par le restaurant
 * — notamment l'identité de l'éditeur, l'hébergeur et le contact RGPD/loi 09-08.
 */
export default function PrivacyPage() {
  const sections = [
    {
      title: "Données que nous recueillons",
      body: [
        "Le site ne crée aucun compte utilisateur et ne demande aucune inscription. Les seules informations que vous fournissez sont celles saisies volontairement dans le formulaire de commande ou de réservation : nom, numéro de téléphone, adresse de livraison le cas échéant, et les précisions que vous souhaitez transmettre.",
        "Ces informations ne sont pas stockées sur un serveur du site : elles servent uniquement à composer le message que vous envoyez vous-même au restaurant.",
      ],
    },
    {
      title: "Comment ces informations sont transmises",
      body: [
        `Les commandes et demandes de réservation sont transmises à ${business.name} via WhatsApp, depuis votre propre application. Le contenu du message et son acheminement relèvent alors des conditions d'utilisation de WhatsApp.`,
        "Aucune donnée n'est envoyée à un tiers publicitaire, revendue ou utilisée à des fins de prospection.",
      ],
    },
    {
      title: "Stockage local dans votre navigateur",
      body: [
        "Votre panier est conservé dans la mémoire locale de votre navigateur afin que votre sélection ne soit pas perdue si vous changez de page. Cette donnée reste sur votre appareil, n'est jamais transmise au restaurant et disparaît si vous videz les données du site.",
        "Le site n'utilise pas de cookie publicitaire ni de traceur tiers.",
      ],
    },
    {
      title: "Durée de conservation",
      body: [
        "Les messages reçus par le restaurant sont conservés le temps nécessaire au traitement de votre commande ou de votre réservation, puis selon les obligations comptables applicables.",
      ],
    },
    {
      title: "Vos droits",
      body: [
        "Vous pouvez demander l'accès, la rectification ou la suppression des informations vous concernant détenues par le restaurant, en appelant le " +
          business.phone.display +
          " ou en écrivant à l'adresse du restaurant.",
      ],
    },
  ];

  return (
    <div className="bg-ink pb-24 pt-32 sm:pb-28 sm:pt-40">
      <div className="container-page">
        <SectionHeading as="h1" eyebrow={dict.privacy.eyebrow} title={dict.privacy.title} />

        <div className="mt-14 max-w-[68ch] space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl font-light text-ivory">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="font-sans text-[0.9375rem] leading-[1.85] text-ash">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-ivory/[0.08] pt-10">
            <h2 className="font-display text-2xl font-light text-ivory">Éditeur du site</h2>
            <address className="mt-4 space-y-1 not-italic font-sans text-[0.9375rem] leading-[1.85] text-ash">
              <p className="text-ivory">{business.name}</p>
              <p>{business.address.full}</p>
              <p>
                <a href={`tel:${business.phone.e164}`} className="hover:text-ivory">
                  {business.phone.display}
                </a>
              </p>
            </address>
            <p className="mt-6 font-sans text-[0.8125rem] leading-relaxed text-ash/60">
              Mentions légales complètes (raison sociale, immatriculation, hébergeur, responsable du
              traitement) à compléter par le restaurant avant la mise en ligne.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
