/**
 * Navigation, métadonnées SEO et préparation multilingue.
 * Le contenu éditorial se trouve dans src/i18n/fr.ts.
 */

/**
 * URL publique du site, toujours valide.
 *
 * Ordre : NEXT_PUBLIC_SITE_URL (domaine définitif — TODO à renseigner), puis
 * les variables fournies par Vercel (domaine de production, puis URL du
 * déploiement), puis le domaine par défaut. Une variable vide ou mal formée est
 * ignorée au lieu de faire échouer le build (`new URL("")`), et un domaine nu
 * comme « ebisushi.ma » reçoit son protocole.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      // Valeur illisible : on passe au candidat suivant.
    }
  }

  return "https://ebisushi.ma"; // TODO — domaine définitif.
}

export const SITE_URL = resolveSiteUrl();

/**
 * Préparation i18n : ajouter une langue = ajouter une entrée ici et un
 * dictionnaire dans src/i18n/. Les routes sont déjà prêtes à recevoir un
 * segment [locale] sans réécriture des composants (voir docs/I18N.md).
 */
export const locales = [
  { code: "fr", label: "Français", short: "FR", dir: "ltr", enabled: true },
  { code: "en", label: "English", short: "EN", dir: "ltr", enabled: false },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl", enabled: false },
] as const;

export type Locale = (typeof locales)[number]["code"];
export const defaultLocale: Locale = "fr";

export interface NavLink {
  label: string;
  href: string;
  /** Sections de la page d'accueil atteintes par ancre. */
  anchor?: boolean;
}

export const mainNav: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Notre univers", href: "/#univers", anchor: true },
  { label: "Réservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explorer: [
    { label: "Accueil", href: "/" },
    { label: "La carte", href: "/menu" },
    { label: "Notre univers", href: "/#univers" },
    { label: "Galerie", href: "/#galerie" },
  ],
  services: [
    { label: "Commander en ligne", href: "/menu" },
    { label: "Réserver une table", href: "/reservation" },
    { label: "Nous trouver", href: "/contact" },
  ],
  legal: [{ label: "Politique de confidentialité", href: "/privacy" }],
};

/** Métadonnées par route — reprises par generateMetadata. */
export const seo = {
  home: {
    title: "Ebi Sushi El Jadida | Restaurant Japonais, Livraison & À Emporter",
    description:
      "Découvrez Ebi Sushi à El Jadida : créations japonaises contemporaines, sushi préparé à la commande, livraison, à emporter et réservation de table.",
  },
  menu: {
    title: "La Carte | Ebi Sushi El Jadida — Sushi, Makis, Plateaux & Plats",
    description:
      "Parcourez la carte complète d'Ebi Sushi à El Jadida : makis, california rolls, sashimis, plateaux à partager, bentos et plats chauds. Commande en ligne pour livraison ou à emporter.",
  },
  reservation: {
    title: "Réserver une table | Ebi Sushi El Jadida",
    description:
      "Réservez votre table chez Ebi Sushi, restaurant japonais à El Jadida. Demande de réservation en quelques secondes, confirmée par le restaurant.",
  },
  contact: {
    title: "Nous trouver | Ebi Sushi — Avenue Mohammed VI, El Jadida",
    description:
      "Adresse, horaires, téléphone et itinéraire vers Ebi Sushi, Avenue Mohammed VI, El Jadida. Sur place, à emporter et livraison.",
  },
  privacy: {
    title: "Politique de confidentialité | Ebi Sushi El Jadida",
    description: "Politique de confidentialité et traitement des données personnelles d'Ebi Sushi.",
  },
} as const;

/** Mots-clés de référencement local visés. */
export const localKeywords = [
  "sushi El Jadida",
  "restaurant japonais El Jadida",
  "livraison sushi El Jadida",
  "meilleur sushi El Jadida",
  "sushi Avenue Mohammed VI",
  "restaurant asiatique El Jadida",
];
