/**
 * Avis clients.
 *
 * ⚠️ AUCUN AVIS N'EST INVENTÉ. Le tableau est volontairement vide : la section
 * ne s'affiche sur le site que lorsqu'il contient au moins un avis réel.
 *
 * TODO — Coller ici les avis Google authentiques que le restaurant souhaite
 * mettre en avant (prénom réel, note réelle, texte réel). L'agrégat Google
 * (note moyenne et nombre d'avis) se règle dans src/config/business.ts.
 */
export interface Review {
  /** Prénom uniquement, tel que publié par l'auteur. */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: "Google" | "TripAdvisor" | "Facebook";
  /** Format ISO, ex. « 2026-04-12 ». */
  date?: string;
  featured?: boolean;
}

export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;
