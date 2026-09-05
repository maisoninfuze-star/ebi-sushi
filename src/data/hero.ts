/**
 * Carrousel de la page d'accueil.
 *
 * Chaque diapositive met en scène un plat réellement à la carte (identifiant
 * de src/data/menu.ts) dans un visuel vertical. Pour changer les plats mis en
 * avant ou leurs photos, tout se règle ici — le composant Hero lit ce fichier.
 *
 * TODO — Les visuels actuels sont des photographies d'ambiance produites pour
 * la direction artistique (voir README) : ils illustrent le type de préparation
 * et non l'assiette exacte servie. Remplacer par les photos réelles du
 * restaurant dès réception, puis lancer `npm run images:optimize`.
 */
export interface HeroSlide {
  /** Identifiant du plat dans src/data/menu.ts. */
  itemId: string;
  /** Visuel vertical (2:3) — le plat dans la moitié haute, surface libre en bas. */
  image: string;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    itemId: "california-classique",
    image: "/images/carte-california-rolls-portrait.jpg",
    alt: "California rolls au sésame alignés sur une ardoise noire",
  },
  {
    itemId: "fry-crunchy",
    image: "/images/carte-fry-rolls-portrait.jpg",
    alt: "Fry rolls croustillants nappés de sauce teriyaki sur assiette sombre",
  },
  {
    itemId: "sashimi-saumon",
    image: "/images/carte-nigiri-sashimi-portrait.jpg",
    alt: "Nigiris et sashimis de saumon sur assiette en céramique sombre",
  },
  {
    itemId: "spring-hanoi",
    image: "/images/carte-spring-rolls-portrait.jpg",
    alt: "Spring rolls frais aux crevettes et menthe, sauce cacahuète",
  },
];

export const heroCarousel = {
  /** Temps d'affichage de chaque plat avant le défilement automatique (ms). */
  autoplayDelay: 3800,
  /** Durée de la transition entre deux diapositives (échelle Embla, ~25 ≈ 0,9 s). */
  scrollDuration: 28,
  /** Le défilement s'interrompt tant que le pointeur survole la carte. */
  pauseOnHover: true,
} as const;

/** Visuels de fond des deux panneaux. */
export const heroBackdrops = {
  /** Panneau du carrousel : image sobre et peu contrastée, la carte doit ressortir. */
  left: {
    src: "/images/commande-a-emporter.jpg",
    alt: "",
  },
  /** Panneau de marque : la photographie porte le nom du restaurant. */
  right: {
    src: "/images/hero-plateau-signature-ebi-sushi-mobile.jpg",
    alt: "Assortiment de sushi Ebi Sushi dressé sur ardoise noire",
  },
} as const;
