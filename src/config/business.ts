/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  EBI SUSHI — FICHIER DE CONFIGURATION PRINCIPAL
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  C'est LE seul fichier à modifier pour mettre à jour les informations du
 *  restaurant : téléphone, adresse, horaires, réseaux sociaux, livraison.
 *  Aucune de ces valeurs n'est écrite en dur dans les composants.
 *
 *  Les points marqués « TODO » attendent une confirmation du restaurant.
 *  Les informations ci-dessous proviennent des fiches publiques Google,
 *  Glovo et Restaurant Guru (septembre 2026) — elles doivent être validées
 *  par le restaurant avant la mise en ligne.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type WeekDay = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";

export interface OpeningPeriod {
  /** Format 24 h « HH:MM ». */
  open: string;
  close: string;
}

export const business = {
  name: "Ebi Sushi",
  /** Utilisé dans les balises title et les données structurées. */
  legalName: "Ebi Sushi",
  tagline: "Cuisine japonaise contemporaine · Fusion asiatique",
  city: "El Jadida",

  address: {
    street: "El Morabitine, Avenue Mohammed VI",
    locality: "El Jadida",
    region: "Casablanca-Settat",
    postalCode: "", // TODO — code postal à confirmer par le restaurant.
    country: "MA",
    countryName: "Maroc",
    /** Adresse complète telle qu'affichée sur le site. */
    full: "El Morabitine, Avenue Mohammed VI, El Jadida, Maroc",
  },

  /**
   * TODO — Coordonnées GPS exactes à confirmer.
   * Laissées nulles volontairement : une position approximative dégraderait
   * la fiche Google. La carte utilise la recherche par nom en attendant.
   */
  geo: null as { lat: number; lng: number } | null,

  phone: {
    /** Affichage humain. */
    display: "+212 5 23 34 18 34",
    /** Format E.164 pour les liens tel:. */
    e164: "+212523341834",
  },

  /**
   * TODO — PRIORITAIRE : confirmer le numéro WhatsApp du restaurant.
   * Le numéro ci-dessous est celui publié sur les annuaires de livraison ;
   * il n'a pas été confirmé par le restaurant. C'est la destination de
   * toutes les commandes et demandes de réservation du site.
   * Surchargeable sans toucher au code via NEXT_PUBLIC_WHATSAPP_NUMBER.
   */
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212664999693",
    display: "+212 664 999 693",
    verified: false,
  },

  email: null as string | null, // TODO — adresse e-mail de contact si elle existe.

  /**
   * TODO — HORAIRES À CONFIRMER.
   * Les sources publiques se contredisent :
   *   · Glovo (fiche gérée par le restaurant) : 12h00 – 00h00, 7j/7
   *   · Google / Restaurant Guru : 09h45 – 01h00 (00h00 le dimanche)
   * Les horaires Glovo sont retenus car ce sont ceux du service.
   */
  hours: {
    verified: false,
    schedule: {
      lundi: [{ open: "12:00", close: "00:00" }],
      mardi: [{ open: "12:00", close: "00:00" }],
      mercredi: [{ open: "12:00", close: "00:00" }],
      jeudi: [{ open: "12:00", close: "00:00" }],
      vendredi: [{ open: "12:00", close: "00:00" }],
      samedi: [{ open: "12:00", close: "00:00" }],
      dimanche: [{ open: "12:00", close: "00:00" }],
    } satisfies Record<WeekDay, OpeningPeriod[]>,
    /** Phrase courte affichée sous les horaires détaillés. */
    summary: "Tous les jours · 12h00 – 00h00",
  },

  services: {
    dineIn: true,
    delivery: true,
    takeaway: true,
    reservation: true,
  },

  delivery: {
    /** TODO — Confirmer les zones de livraison et l'éventuel minimum de commande. */
    zones: [] as string[],
    minimumOrder: null as number | null,
    fee: null as number | null,
    /** Plateforme partenaire existante — laissée accessible aux clients. */
    partner: {
      name: "Glovo",
      url: "https://glovoapp.com/ma/fr/el-jadida/ebi-sushi-ejd/",
    } as { name: string; url: string } | null,
  },

  social: {
    instagram: "https://www.instagram.com/ebi.sushi.fusion.asiatique/",
    instagramHandle: "@ebi.sushi.fusion.asiatique",
    // TODO — confirmer l'URL exacte de la page Facebook officielle.
    facebook: "https://www.facebook.com/EbiSushimazagan/",
    tiktok: null as string | null,
  },

  maps: {
    /** Fonctionne sans clé API et pointe toujours sur la bonne fiche. */
    place: "https://www.google.com/maps/search/?api=1&query=Ebi+Sushi+El+Jadida",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Ebi%20Sushi%2C%20Avenue%20Mohammed%20VI%2C%20El%20Jadida",
    embed:
      "https://www.google.com/maps?q=Ebi+Sushi+Avenue+Mohammed+VI+El+Jadida&output=embed",
    reviews: "https://www.google.com/maps/search/?api=1&query=Ebi+Sushi+El+Jadida",
  },

  currency: {
    code: "MAD",
    /** Suffixe affiché à côté des prix. */
    suffix: "DH",
  },

  /** Crédit discret en pied de page. */
  credit: { label: "Site by B12 Ventures", url: null as string | null },
} as const;

/**
 * Avis clients — voir src/data/reviews.ts.
 * L'agrégat ci-dessous provient de la fiche Google publique (191 avis, 3,8/5,
 * relevé en septembre 2026). Il reste désactivé tant que le restaurant ne l'a
 * pas confirmé : aucune donnée non validée n'est affichée en production.
 */
export const socialProof = {
  showAggregate: false, // TODO — passer à true après confirmation du restaurant.
  ratingValue: 3.8,
  reviewCount: 191,
  source: "Google",
} as const;

export type Business = typeof business;
