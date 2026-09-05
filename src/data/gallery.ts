/**
 * Galerie — visuels d'ambiance.
 *
 * TODO — Remplacer par les photographies réelles du restaurant.
 * Les visuels actuels ont été produits pour la direction artistique du site
 * (voir scripts/generate-images.mjs et le README). Ils illustrent l'atmosphère
 * et les types de préparations, ils ne représentent pas un plat précis servi.
 */
export interface GalleryImage {
  src: string;
  alt: string;
  /** Emprise dans la grille éditoriale. */
  span: "tall" | "wide" | "square";
}

export const gallery: GalleryImage[] = [
  {
    src: "/images/salle-restaurant-ambiance.jpg",
    alt: "Salle du restaurant Ebi Sushi à El Jadida, éclairage tamisé et bois sombre",
    span: "wide",
  },
  {
    src: "/images/detail-nigiri-macro.jpg",
    alt: "Gros plan sur deux nigiris au saumon, grain du riz visible",
    span: "square",
  },
  {
    src: "/images/comptoir-sushi-bar.jpg",
    alt: "Comptoir à sushi en bois sombre éclairé par une lumière chaude",
    span: "tall",
  },
  {
    src: "/images/plateau-partage-table.jpg",
    alt: "Plateau d'assortiment de makis et nigiris dressé sur une table à partager",
    span: "wide",
  },
  {
    src: "/images/detail-texture-saumon.jpg",
    alt: "Macro d'une tranche de saumon frais et de son persillé",
    span: "square",
  },
  {
    src: "/images/soupe-et-entrees.jpg",
    alt: "Soupe miso, edamame et salade d'algues wakamé sur une table sombre",
    span: "tall",
  },
  {
    src: "/images/commande-a-emporter.jpg",
    alt: "Boîte à emporter Ebi Sushi garnie d'un assortiment de sushi",
    span: "square",
  },
  {
    src: "/images/atelier-preparation-saumon.jpg",
    alt: "Couteau japonais et longe de saumon en cours de découpe sur une planche en bois",
    span: "tall",
  },
];
