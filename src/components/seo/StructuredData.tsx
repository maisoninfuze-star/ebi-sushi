import { business } from "@/config/business";
import { SITE_URL } from "@/config/site";
import { categories, availableItems, piecesOf } from "@/data/menu";

/**
 * Données structurées Schema.org.
 *
 * Règle appliquée : seules les informations vérifiées sont publiées.
 * Les coordonnées GPS et la note moyenne sont volontairement omises tant que
 * le restaurant ne les a pas confirmées — une donnée fausse pénalise la fiche.
 */

const DAY_SCHEMA: Record<string, string> = {
  lundi: "Monday",
  mardi: "Tuesday",
  mercredi: "Wednesday",
  jeudi: "Thursday",
  vendredi: "Friday",
  samedi: "Saturday",
  dimanche: "Sunday",
};

function openingHoursSpecification() {
  return Object.entries(business.hours.schedule).map(([day, periods]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAY_SCHEMA[day],
    opens: periods[0].open,
    closes: periods[0].close,
  }));
}

export function RestaurantSchema() {
  const sameAs = [business.social.instagram, business.social.facebook].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: business.name,
    description:
      "Restaurant japonais et fusion asiatique à El Jadida : sushi préparé à la commande, plateaux à partager, plats chauds, livraison et vente à emporter.",
    url: SITE_URL,
    telephone: business.phone.e164,
    image: [`${SITE_URL}/images/og-ebi-sushi.jpg`],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    servesCuisine: ["Japonaise", "Sushi", "Asiatique", "Thaïlandaise"],
    priceRange: "$$",
    currenciesAccepted: business.currency.code,
    acceptsReservations: business.services.reservation,
    hasDeliveryMethod: [
      ...(business.services.delivery ? ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"] : []),
      ...(business.services.takeaway ? ["http://purl.org/goodrelations/v1#DeliveryModePickUp"] : []),
    ],
    openingHoursSpecification: openingHoursSpecification(),
    hasMenu: `${SITE_URL}/menu`,
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Carte structurée — aide Google à afficher les plats et leurs tarifs. */
export function MenuSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/menu#menu`,
    name: `La carte — ${business.name}`,
    inLanguage: "fr",
    hasMenuSection: categories
      .map((category) => {
        const items = availableItems.filter((i) => i.category === category.id);
        if (items.length === 0) return null;
        return {
          "@type": "MenuSection",
          name: category.name,
          ...(category.tagline ? { description: category.tagline } : {}),
          hasMenuItem: items.map((item) => {
            const pieces = piecesOf(item);
            // Le nombre de pièces n'a pas de propriété dédiée : on l'expose
            // dans la description, seul endroit où Google le restituera.
            const description = [item.description, pieces ? `${pieces} pièces` : null]
              .filter(Boolean)
              .join(" · ");
            return {
              "@type": "MenuItem",
              name: item.name,
              ...(description ? { description } : {}),
              ...(item.tags?.includes("vegetarien")
                ? { suitableForDiet: "https://schema.org/VegetarianDiet" }
                : {}),
              offers: {
                "@type": "Offer",
                price: item.price,
                priceCurrency: business.currency.code,
                availability: "https://schema.org/InStock",
              },
            };
          }),
        };
      })
      .filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; href: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
