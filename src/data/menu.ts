/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LA CARTE EBI SUSHI
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Source : fiche de commande en ligne officielle Ebi Sushi (relevée en
 *  septembre 2026). Noms et tarifs repris tels quels, à la normalisation
 *  typographique près (majuscules, accents, coquilles évidentes).
 *
 *  POUR METTRE À JOUR LA CARTE, tout se passe ici :
 *    · un prix change      → modifier `price` (en dirhams, nombre entier)
 *    · un plat disparaît   → supprimer la ligne, ou passer `available: false`
 *    · un plat saisonnier  → `seasonal: true` (masqué du site, données gardées)
 *    · une photo arrive    → renseigner `image` ("/images/mon-plat.jpg")
 *    · une catégorie bouge → réordonner le tableau `categories`
 *
 *  TODO — À COMPLÉTER PAR LE RESTAURANT
 *   1. Descriptions : seules les compositions déductibles du nom du plat sont
 *      renseignées. Les recettes signature (Osaka, Geisha, Tiger, box…) sont
 *      volontairement laissées vides plutôt que d'être inventées.
 *   2. Mentions « épicé » et « végétarien » : renseignées de façon minimale et
 *      prudente. À compléter par la cuisine — elles alimentent les filtres.
 *   3. Allergènes : champ `allergens` prêt, non renseigné.
 *   4. Photos : aucune photo de plat réelle n'a été fournie. Voir README.
 *   5. Vérifier la disponibilité des assortiments saisonniers.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type MenuTag = "populaire" | "vegetarien" | "epice" | "signature";

export interface MenuItem {
  id: string;
  name: string;
  /** Identifiant de la catégorie parente. */
  category: string;
  /** Prix en dirhams marocains (MAD). */
  price: number;
  /** Nombre de pièces, quand la carte le précise. */
  pieces?: number;
  description?: string;
  tags?: MenuTag[];
  /** Chemin dans /public — laissé vide tant que la photo réelle manque. */
  image?: string;
  /** TODO — allergènes à renseigner par la cuisine. */
  allergens?: string[];
  /** Retiré de la carte sans perdre la donnée. */
  available?: boolean;
  /** Article saisonnier : conservé en base, masqué du site. */
  seasonal?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  /** Phrase courte affichée sous le titre de la catégorie. */
  tagline?: string;
  /** Nombre de pièces commun à toute la catégorie. */
  pieces?: number;
  image?: string;
  hidden?: boolean;
}

export const categories: MenuCategory[] = [
  { id: "plateaux", name: "Plateaux & Assortiments", tagline: "À partager, de deux à toute la table." },
  { id: "lunch", name: "Lunch Box", tagline: "La formule complète, midi et soir." },
  { id: "entrees", name: "Entrées", tagline: "Pour ouvrir le repas." },
  { id: "soupes", name: "Soupes", tagline: "Bouillons réconfortants." },
  { id: "salades", name: "Salades", tagline: "Fraîcheur et croquant." },
  { id: "makis", name: "Makis", tagline: "Riz vinaigré, nori, garniture.", pieces: 6 },
  { id: "california", name: "California Rolls", tagline: "Le roll inversé, roulé à la commande.", pieces: 4 },
  { id: "speciaux", name: "Spéciaux Rolls", tagline: "Les créations de la maison.", pieces: 4 },
  { id: "fry", name: "Fry Rolls", tagline: "Panés minute, croustillants.", pieces: 6 },
  { id: "spring", name: "Spring Rolls", tagline: "Rouleaux frais, feuille de riz.", pieces: 6 },
  { id: "fresh", name: "Fresh Rolls", tagline: "Sans cuisson, tout en légèreté.", pieces: 4 },
  { id: "futomakis", name: "Futomakis", tagline: "Le maki grand format.", pieces: 5 },
  { id: "nigiris", name: "Nigiris", tagline: "Une tranche, une pointe de riz.", pieces: 2 },
  { id: "sashimis", name: "Sashimis", tagline: "Le poisson, sans détour.", pieces: 4 },
  { id: "chirashis", name: "Chirashis", tagline: "Le bol de riz garni." },
  { id: "pokes", name: "Pokés", tagline: "Bols composés, généreux." },
  { id: "tartares", name: "Tartares", tagline: "Coupé au couteau." },
  { id: "tacos", name: "Tacos", tagline: "La bouchée croustillante.", pieces: 2 },
  { id: "pizzas", name: "Pizzas Sushi", tagline: "La base croustillante, garnie.", pieces: 8 },
  { id: "brochettes", name: "Brochettes", tagline: "Grillées à la commande." },
  { id: "bentos", name: "Bentos", tagline: "Le plateau-repas japonais." },
  { id: "plats", name: "Plats chauds", tagline: "Thaï, wok et currys." },
  { id: "boissons", name: "Boissons" },
];

export const items: MenuItem[] = [
  // ─── Plateaux & Assortiments ─────────────────────────────────────────────
  { id: "akira-box", name: "Akira Box", category: "plateaux", price: 467, pieces: 64 },
  { id: "kiev", name: "Assortiment Kiev", category: "plateaux", price: 375 },
  { id: "surat", name: "Assortiment Surat", category: "plateaux", price: 375 },
  { id: "large-box-munch", name: "Large Box Munch", category: "plateaux", price: 369, pieces: 42 },
  { id: "large-box-seurat", name: "Large Box Seurat", category: "plateaux", price: 369, pieces: 48 },
  { id: "large-box-greco", name: "Large Box Greco", category: "plateaux", price: 369, pieces: 52 },
  { id: "large-box-morisot", name: "Large Box Morisot", category: "plateaux", price: 369, pieces: 46 },
  { id: "sushi-passion", name: "Sushi Passion", category: "plateaux", price: 362 },
  { id: "nagoya-box", name: "Nagoya Box", category: "plateaux", price: 357, pieces: 46 },
  { id: "assortiment-newmix", name: "Assortiment Newmix", category: "plateaux", price: 318 },
  { id: "osaka-box", name: "Osaka Box", category: "plateaux", price: 318, pieces: 42 },
  { id: "sakura-box", name: "Sakura Box", category: "plateaux", price: 275, pieces: 36 },
  { id: "assortiment-ebi", name: "Assortiment Ebi", category: "plateaux", price: 259 },
  { id: "assortiment-zen", name: "Assortiment Zen", category: "plateaux", price: 258 },
  { id: "assortiment-balli", name: "Assortiment Balli", category: "plateaux", price: 254 },
  { id: "buddha-bar-box", name: "Buddha Bar Box", category: "plateaux", price: 254, pieces: 26 },
  { id: "zuma-box", name: "Zuma Box", category: "plateaux", price: 254, pieces: 33 },
  { id: "coya-box", name: "Coya Box", category: "plateaux", price: 253, pieces: 30 },
  { id: "kyoto-box", name: "Kyoto Box", category: "plateaux", price: 253, pieces: 30 },
  { id: "big-box-bonheur", name: "Big Box Bonheur", category: "plateaux", price: 249, pieces: 30 },
  { id: "big-box-hopper", name: "Big Box Hopper", category: "plateaux", price: 249, pieces: 34 },
  { id: "big-box-pissarro", name: "Big Box Pissarro", category: "plateaux", price: 249, pieces: 28 },
  { id: "big-box-turner", name: "Big Box Turner", category: "plateaux", price: 249, pieces: 24 },
  { id: "assortiment-nippons", name: "Assortiment Nippons", category: "plateaux", price: 249 },
  { id: "oslo", name: "Assortiment Oslo", category: "plateaux", price: 239 },
  { id: "assortiment-tokyo", name: "Assortiment Tokyo", category: "plateaux", price: 224 },
  { id: "taipie", name: "Assortiment Taipie", category: "plateaux", price: 219 },
  { id: "kingston", name: "Assortiment Kingston", category: "plateaux", price: 210 },
  { id: "festivale-box", name: "Festivale Box", category: "plateaux", price: 193 },
  { id: "medium-box-goya", name: "Medium Box Goya", category: "plateaux", price: 179, pieces: 24 },
  { id: "medium-box-michel-ange", name: "Medium Box Michel-Ange", category: "plateaux", price: 179, pieces: 24 },
  { id: "medium-box-dali", name: "Medium Box Dali", category: "plateaux", price: 179, pieces: 24 },
  { id: "medium-box-delacroix", name: "Medium Box Delacroix", category: "plateaux", price: 179, pieces: 24 },
  { id: "medium-box-matisse", name: "Medium Box Matisse", category: "plateaux", price: 179, pieces: 24 },
  { id: "medium-box-mondrian", name: "Medium Box Mondrian", category: "plateaux", price: 179, pieces: 22 },
  { id: "kadour", name: "Assortiment Kadour", category: "plateaux", price: 169 },
  { id: "eden-box", name: "Éden Box", category: "plateaux", price: 167 },
  { id: "signature-box", name: "Signature Box", category: "plateaux", price: 167 },
  { id: "assortiment-noel", name: "Assortiment Noël Ebi", category: "plateaux", price: 155, seasonal: true },
  { id: "classique-lovers", name: "Classique Lovers", category: "plateaux", price: 154 },
  { id: "assortiment-ebi-lovers", name: "Assortiment Ebi Lovers", category: "plateaux", price: 154 },
  { id: "exotic-box", name: "Exotic Box", category: "plateaux", price: 152 },
  { id: "spring-box", name: "Assortiment Spring Box", category: "plateaux", price: 152 },
  { id: "duo-box", name: "Assortiment Duo Box", category: "plateaux", price: 152, tags: ["populaire"] },
  { id: "praia", name: "Assortiment Praia", category: "plateaux", price: 149 },
  { id: "berne", name: "Assortiment Berne", category: "plateaux", price: 149 },
  { id: "salade-viet-fry", name: "Salade Viet & Fry Ebi Sushi", category: "plateaux", price: 149 },
  { id: "vadus", name: "Assortiment Vadus", category: "plateaux", price: 135 },
  { id: "assortiment-harmonie", name: "Assortiment Harmonie", category: "plateaux", price: 129, tags: ["populaire"] },
  { id: "formule-thai", name: "Formule Thaï", category: "plateaux", price: 126 },
  { id: "crispy-party", name: "Crispy Party", category: "plateaux", price: 126, pieces: 18 },
  { id: "small-box-van-gogh", name: "Small Box Van Gogh", category: "plateaux", price: 119, pieces: 16 },
  { id: "small-box-gauguin", name: "Small Box Gauguin", category: "plateaux", price: 119, pieces: 16 },
  { id: "small-box-cezanne", name: "Small Box Cézanne", category: "plateaux", price: 119, pieces: 12 },
  { id: "small-box-renoir", name: "Small Box Renoir", category: "plateaux", price: 119, pieces: 16 },
  { id: "small-box-manet", name: "Small Box Manet", category: "plateaux", price: 119, pieces: 14 },
  { id: "small-box-picasso", name: "Small Box Picasso", category: "plateaux", price: 119, pieces: 12 },
  { id: "small-box-degas", name: "Small Box Degas", category: "plateaux", price: 119, pieces: 16 },
  { id: "small-box-vinci", name: "Small Box Vinci", category: "plateaux", price: 119, pieces: 16 },
  { id: "small-box-botticelli", name: "Small Box Botticelli", category: "plateaux", price: 119, pieces: 18 },
  { id: "puket-box", name: "Puket Box", category: "plateaux", price: 119 },
  { id: "special-thai", name: "Assortiment Spécial Thaï", category: "plateaux", price: 119 },
  { id: "assortiment-rio", name: "Assortiment Rio", category: "plateaux", price: 114 },
  { id: "new-fry", name: "New Fry", category: "plateaux", price: 105 },
  { id: "box-24", name: "Box 24", category: "plateaux", price: 99, pieces: 24 },

  // ─── Lunch Box ────────────────────────────────────────────────────────────
  { id: "lunch-box-5", name: "Lunch Box 5", category: "lunch", price: 167 },
  { id: "lunch-box-8", name: "Lunch Box 8", category: "lunch", price: 167, tags: ["populaire"] },
  { id: "lunch-box-3", name: "Lunch Box 3", category: "lunch", price: 154 },
  { id: "lunch-box-2", name: "Lunch Box 2", category: "lunch", price: 143 },
  { id: "lunch-box-6", name: "Lunch Box 6", category: "lunch", price: 143 },
  { id: "lunch-box-7", name: "Lunch Box 7", category: "lunch", price: 129 },
  { id: "lunch-box-1", name: "Lunch Box 1", category: "lunch", price: 123 },
  { id: "lunch-box-4", name: "Lunch Box 4", category: "lunch", price: 123 },

  // ─── Entrées ──────────────────────────────────────────────────────────────
  { id: "boulette-saumon", name: "Boulette de saumon", category: "entrees", price: 88 },
  { id: "gyoza-mixte", name: "Gyoza mixte", category: "entrees", price: 70, description: "Raviolis japonais poêlés, garniture mixte.", tags: ["signature"], image: "/images/signature-gyoza.jpg" },
  { id: "crevettes-dynamites", name: "Crevettes dynamites", category: "entrees", price: 70, tags: ["epice"] },
  { id: "gambas-fils-ange", name: "Gambas fils d'ange", category: "entrees", price: 70, description: "Gambas enrobées de cheveux d'ange, frites minute." },
  { id: "nems-fruits-de-mer", name: "Nems fruits de mer", category: "entrees", price: 65 },
  { id: "ebi-tempura", name: "Ebi tempura", category: "entrees", price: 65, description: "Crevettes en beignet tempura." },
  { id: "gyoza-crevettes", name: "Gyoza crevettes", category: "entrees", price: 63, description: "Raviolis japonais poêlés aux crevettes." },
  { id: "gyoza-poulet", name: "Gyoza poulet", category: "entrees", price: 60, description: "Raviolis japonais poêlés au poulet." },
  { id: "nems-crevettes", name: "Nems crevettes", category: "entrees", price: 59 },
  { id: "bouchee-vapeur-crevettes", name: "Bouchée vapeur crevettes", category: "entrees", price: 59 },
  { id: "bouchee-vapeur-poulet", name: "Bouchée vapeur poulet", category: "entrees", price: 55 },
  { id: "nems-mixte", name: "Nems mixte", category: "entrees", price: 50 },
  { id: "tempura-poulet", name: "Tempura poulet", category: "entrees", price: 50, description: "Poulet en beignet tempura." },
  { id: "nems-poulet", name: "Nems poulet", category: "entrees", price: 49 },

  // ─── Soupes ───────────────────────────────────────────────────────────────
  { id: "soupe-fruits-de-mer", name: "Soupe aux fruits de mer", category: "soupes", price: 65 },
  { id: "soupe-ramen", name: "Soupe ramen", category: "soupes", price: 65 },
  { id: "soupe-crevettes", name: "Soupe aux crevettes", category: "soupes", price: 60 },
  { id: "soupe-poulet", name: "Soupe au poulet", category: "soupes", price: 49 },
  { id: "soupe-miso", name: "Soupe miso", category: "soupes", price: 39 },

  // ─── Salades ──────────────────────────────────────────────────────────────
  { id: "salade-wakame-saumon", name: "Salade wakamé saumon", category: "salades", price: 79, description: "Algues wakamé et saumon." },
  { id: "salade-seafood", name: "Salade seafood", category: "salades", price: 75 },
  { id: "salade-umi", name: "Salade Umi", category: "salades", price: 69 },
  { id: "salade-viet", name: "Salade viet", category: "salades", price: 55 },
  { id: "salade-tempura", name: "Salade tempura", category: "salades", price: 55 },
  { id: "salade-poulet", name: "Salade poulet", category: "salades", price: 49 },
  { id: "salade-veggie", name: "Salade veggie", category: "salades", price: 49, tags: ["vegetarien"] },

  // ─── Makis (6 pièces) ─────────────────────────────────────────────────────
  { id: "maki-saumon-avocat", name: "Maki saumon avocat", category: "makis", price: 43, pieces: 6, description: "Riz vinaigré, nori, saumon et avocat." },
  { id: "maki-saumon", name: "Maki saumon", category: "makis", price: 40, pieces: 6, description: "Riz vinaigré, nori, saumon." },
  { id: "maki-crevettes-panees", name: "Maki crevettes panées", category: "makis", price: 39, pieces: 6 },
  { id: "maki-surimi", name: "Maki surimi", category: "makis", price: 35, pieces: 6, description: "Riz vinaigré, nori, surimi." },
  { id: "maki-avocat", name: "Maki avocat", category: "makis", price: 33, pieces: 6, description: "Riz vinaigré, nori, avocat.", tags: ["vegetarien"] },
  { id: "maki-concombre", name: "Maki concombre", category: "makis", price: 30, pieces: 6, description: "Riz vinaigré, nori, concombre.", tags: ["vegetarien"] },

  // ─── California Rolls (4 pièces) ──────────────────────────────────────────
  { id: "california-kani", name: "California kani", category: "california", price: 50, pieces: 4 },
  { id: "california-shake-yaki", name: "California shake yaki", category: "california", price: 45, pieces: 4 },
  { id: "california-tanouke-saumon", name: "California tanouké saumon", category: "california", price: 45, pieces: 4 },
  { id: "california-cream-cheese", name: "California cream cheese", category: "california", price: 45, pieces: 4, description: "Fromage frais." },
  { id: "california-tanouke-crevettes", name: "California tanouké crevettes", category: "california", price: 45, pieces: 4 },
  { id: "california-sesame", name: "California sésame", category: "california", price: 40, pieces: 4, description: "Enrobage sésame." },
  { id: "california-ebi-tobiko", name: "California ebi tobiko", category: "california", price: 40, pieces: 4, description: "Crevette et œufs de poisson volant." },
  { id: "california-ebi-fry", name: "California ebi fry", category: "california", price: 40, pieces: 4, description: "Crevette panée." },
  { id: "california-hawai", name: "California Hawaï", category: "california", price: 40, pieces: 4 },
  { id: "california-leopard", name: "California léopard", category: "california", price: 39, pieces: 4 },
  { id: "california-classique", name: "California classique", category: "california", price: 35, pieces: 4, tags: ["signature"], image: "/images/signature-california-rolls.jpg" },

  // ─── Spéciaux Rolls (4 pièces) ────────────────────────────────────────────
  { id: "special-okinawa", name: "Spécial rolls Okinawa", category: "speciaux", price: 59, pieces: 4 },
  { id: "special-natsu", name: "Spécial rolls Natsu", category: "speciaux", price: 59, pieces: 4 },
  { id: "special-unagui", name: "Spécial unagui rolls", category: "speciaux", price: 59, pieces: 4, description: "Anguille." },
  { id: "special-osaka", name: "Spécial rolls Osaka", category: "speciaux", price: 55, pieces: 4 },
  { id: "special-naomi", name: "Spécial rolls Naomi", category: "speciaux", price: 55, pieces: 4 },
  { id: "special-supreme", name: "Spécial rolls Suprême", category: "speciaux", price: 55, pieces: 4 },
  { id: "special-tiger", name: "Spécial rolls Tiger", category: "speciaux", price: 55, pieces: 4 },
  { id: "special-geisha", name: "Spécial rolls Geisha", category: "speciaux", price: 55, pieces: 4 },
  { id: "special-volcano", name: "Spécial rolls Volcano", category: "speciaux", price: 50, pieces: 4, tags: ["epice"] },
  { id: "special-goma", name: "Spécial goma rolls", category: "speciaux", price: 50, pieces: 4, description: "Sésame." },
  { id: "special-red", name: "Spécial rolls Red", category: "speciaux", price: 50, pieces: 4 },
  { id: "special-miami", name: "Spécial rolls Miami", category: "speciaux", price: 40, pieces: 4 },

  // ─── Fry Rolls (6 pièces) ─────────────────────────────────────────────────
  { id: "fry-aromaki-panee", name: "Fry rolls aromaki panée", category: "fry", price: 69, pieces: 6 },
  { id: "fry-atlantic", name: "Fry rolls Atlantic", category: "fry", price: 65, pieces: 6 },
  { id: "fry-royal", name: "Fry rolls Royal", category: "fry", price: 65, pieces: 6 },
  { id: "fry-tornado", name: "Fry rolls Tornado", category: "fry", price: 59, pieces: 6 },
  { id: "fry-unagui", name: "Unagui fry rolls", category: "fry", price: 55, pieces: 6, description: "Anguille." },
  { id: "fry-casablanca", name: "Fry rolls Casablanca", category: "fry", price: 55, pieces: 6 },
  { id: "fry-golden", name: "Fry rolls Golden", category: "fry", price: 50, pieces: 6 },
  { id: "fry-crunchy", name: "Fry rolls Crunchy", category: "fry", price: 49, pieces: 6, tags: ["signature"], image: "/images/signature-fry-rolls-crispy.jpg" },
  { id: "fry-dragon-eye", name: "Fry rolls Dragon Eye", category: "fry", price: 49, pieces: 6 },
  { id: "fry-shake-tempura", name: "Fry rolls shaké tempura", category: "fry", price: 49, pieces: 6, description: "Saumon tempura." },
  { id: "fry-crispy-cheese", name: "Fry rolls crispy cheese", category: "fry", price: 45, pieces: 6, description: "Fromage frais, panure croustillante." },
  { id: "fry-ebi-fry", name: "Fry rolls ebi fry", category: "fry", price: 45, pieces: 6, description: "Crevette panée." },
  { id: "fry-crispy-saumon", name: "Fry rolls crispy saumon", category: "fry", price: 45, pieces: 6, description: "Saumon, panure croustillante." },

  // ─── Spring Rolls (6 pièces) ──────────────────────────────────────────────
  { id: "spring-jakarta", name: "Spring rolls Jakarta", category: "spring", price: 65, pieces: 6 },
  { id: "spring-bangkok", name: "Spring rolls Bangkok", category: "spring", price: 65, pieces: 6 },
  { id: "spring-singapour", name: "Spring rolls Singapour", category: "spring", price: 65, pieces: 6 },
  { id: "spring-manille", name: "Spring rolls Manille", category: "spring", price: 59, pieces: 6 },
  { id: "spring-hanoi", name: "Spring rolls Hanoï", category: "spring", price: 55, pieces: 6, tags: ["signature"], image: "/images/signature-spring-rolls.jpg" },
  { id: "spring-seoul", name: "Spring rolls Séoul", category: "spring", price: 55, pieces: 6 },
  { id: "spring-pekin", name: "Spring rolls Pékin", category: "spring", price: 55, pieces: 6 },
  { id: "spring-poulet", name: "Spring rolls poulet", category: "spring", price: 35, pieces: 6 },

  // ─── Fresh Rolls (4 pièces) ───────────────────────────────────────────────
  { id: "fresh-saumon-cheese", name: "Fresh roll saumon cheese", category: "fresh", price: 65, pieces: 4, description: "Saumon et fromage frais, sans cuisson." },
  { id: "fresh-saumon-avocat", name: "Fresh roll saumon avocat", category: "fresh", price: 59, pieces: 4, description: "Saumon et avocat, sans cuisson." },

  // ─── Futomakis (5 pièces) ─────────────────────────────────────────────────
  { id: "futomaki-saumon", name: "Futomaki saumon", category: "futomakis", price: 45, pieces: 5 },
  { id: "futomaki-crevettes", name: "Futomaki crevettes", category: "futomakis", price: 45, pieces: 5 },
  { id: "futomaki-classique", name: "Futomaki classique", category: "futomakis", price: 40, pieces: 5 },

  // ─── Nigiris (2 pièces) ───────────────────────────────────────────────────
  { id: "nigiri-anguille", name: "Nigiri anguille", category: "nigiris", price: 40, pieces: 2 },
  { id: "nigiri-saumon-avocat", name: "Nigiri saumon avocat", category: "nigiris", price: 38, pieces: 2 },
  { id: "nigiri-saumon-braise", name: "Nigiri saumon braisé", category: "nigiris", price: 38, pieces: 2 },
  { id: "nigiri-saumon", name: "Nigiri saumon", category: "nigiris", price: 35, pieces: 2 },
  { id: "nigiri-crevettes", name: "Nigiri crevettes", category: "nigiris", price: 35, pieces: 2 },

  // ─── Sashimis (4 pièces) ──────────────────────────────────────────────────
  { id: "sashimi-saumon", name: "Sashimi saumon", category: "sashimis", price: 59, pieces: 4, tags: ["signature"], image: "/images/signature-sashimi-saumon.jpg" },

  // ─── Chirashis ────────────────────────────────────────────────────────────
  { id: "chirashi-anguille", name: "Chirashi anguille", category: "chirashis", price: 79 },
  { id: "chirashi-saumon", name: "Chirashi saumon", category: "chirashis", price: 69 },
  { id: "chirashi-saumon-avocat", name: "Chirashi saumon avocat", category: "chirashis", price: 65 },

  // ─── Pokés ────────────────────────────────────────────────────────────────
  { id: "poke-adriatique", name: "Poké Adriatique", category: "pokes", price: 79, tags: ["signature"], image: "/images/signature-poke-bowl.jpg" },
  { id: "poke-caraibe", name: "Poké Caraïbe", category: "pokes", price: 79 },
  { id: "poke-baltique", name: "Poké Baltique", category: "pokes", price: 79 },

  // ─── Tartares ─────────────────────────────────────────────────────────────
  { id: "tartare-saumon-avocat", name: "Tartare saumon avocat", category: "tartares", price: 65, description: "Saumon coupé au couteau et avocat." },

  // ─── Tacos (2 pièces) ─────────────────────────────────────────────────────
  { id: "tacos-saumon", name: "Tacos saumon", category: "tacos", price: 45, pieces: 2 },
  { id: "tacos-ebi", name: "Tacos ebi", category: "tacos", price: 45, pieces: 2, description: "Crevette." },

  // ─── Pizzas Sushi (8 pièces) ──────────────────────────────────────────────
  { id: "pizza-royale", name: "Pizza royale", category: "pizzas", price: 59, pieces: 8 },
  { id: "pizza-mozzarella", name: "Pizza mozzarella", category: "pizzas", price: 59, pieces: 8 },

  // ─── Brochettes ───────────────────────────────────────────────────────────
  { id: "brochettes-saumon", name: "Brochettes saumon", category: "brochettes", price: 65 },
  { id: "brochettes-boulettes", name: "Brochettes boulettes", category: "brochettes", price: 40 },

  // ─── Bentos ───────────────────────────────────────────────────────────────
  { id: "bento-luxe", name: "Bento Luxe", category: "bentos", price: 159 },
  { id: "bento-paris", name: "Bento Paris", category: "bentos", price: 159 },
  { id: "bento-asia", name: "Bento Asia", category: "bentos", price: 152 },
  { id: "bento-crispy", name: "Bento Crispy", category: "bentos", price: 152 },
  { id: "bento-thai", name: "Bento Thaï", category: "bentos", price: 152 },
  { id: "bento-queen", name: "Bento Queen", category: "bentos", price: 152 },
  { id: "bento-prince", name: "Bento Prince", category: "bentos", price: 152 },
  { id: "bento-lovers", name: "Bento Lovers", category: "bentos", price: 139 },
  { id: "bento-ebi", name: "Bento Ebi", category: "bentos", price: 139 },
  { id: "bento-star", name: "Bento Star", category: "bentos", price: 129 },
  { id: "bento-magic", name: "Bento Magic", category: "bentos", price: 120 },

  // ─── Plats chauds ─────────────────────────────────────────────────────────
  { id: "curry-saumon", name: "Curry lait de coco — saumon", category: "plats", price: 120 },
  { id: "curry-fruits-de-mer", name: "Curry lait de coco — fruits de mer", category: "plats", price: 99 },
  { id: "thai-basilic-fruits-de-mer", name: "Thaï basilic — fruits de mer", category: "plats", price: 95 },
  { id: "thai-vermicelles-fruits-de-mer", name: "Thaï vermicelles — fruits de mer", category: "plats", price: 95 },
  { id: "pad-thai-fruits-de-mer", name: "Pad thaï — fruits de mer", category: "plats", price: 90 },
  { id: "curry-poulet", name: "Curry lait de coco — poulet", category: "plats", price: 89 },
  { id: "riz-cantonais-fruits-de-mer", name: "Riz cantonais — fruits de mer", category: "plats", price: 85 },
  { id: "pad-thai-crevettes", name: "Pad thaï — crevettes", category: "plats", price: 85 },
  { id: "thai-basilic-crevettes", name: "Thaï basilic — crevettes", category: "plats", price: 85 },
  { id: "nouilles-fruits-de-mer", name: "Nouilles — fruits de mer", category: "plats", price: 80 },
  { id: "thai-vermicelles-crevettes", name: "Thaï vermicelles — crevettes", category: "plats", price: 79 },
  { id: "nouilles-crevettes", name: "Nouilles — crevettes", category: "plats", price: 79 },
  { id: "pad-thai-poulet", name: "Pad thaï — poulet", category: "plats", price: 75 },
  { id: "thai-basilic-poulet", name: "Thaï basilic — poulet", category: "plats", price: 75 },
  { id: "thai-vermicelles-poulet", name: "Thaï vermicelles — poulet", category: "plats", price: 75 },
  { id: "pad-thai-veggie", name: "Pad thaï — veggie", category: "plats", price: 70, tags: ["vegetarien"] },
  { id: "curry-veggie", name: "Curry lait de coco — veggie", category: "plats", price: 69, tags: ["vegetarien"] },
  { id: "riz-cantonais-crevettes", name: "Riz cantonais — crevettes", category: "plats", price: 65 },
  { id: "nouilles-poulet", name: "Nouilles — poulet", category: "plats", price: 65 },
  { id: "riz-cantonais-poulet", name: "Riz cantonais — poulet", category: "plats", price: 60 },
  { id: "thai-basilic-veggie", name: "Thaï basilic — veggie", category: "plats", price: 60, tags: ["vegetarien"] },
  { id: "thai-vermicelles-veggie", name: "Thaï vermicelles — veggie", category: "plats", price: 60, tags: ["vegetarien"] },
  { id: "nouilles-veggie", name: "Nouilles — veggie", category: "plats", price: 49, tags: ["vegetarien"] },
  { id: "riz-cantonais-veggie", name: "Riz cantonais — veggie", category: "plats", price: 45, tags: ["vegetarien"] },

  // ─── Boissons ─────────────────────────────────────────────────────────────
  { id: "jus-citron-gingembre", name: "Jus citron & gingembre", category: "boissons", price: 39, tags: ["vegetarien"] },
  { id: "jus-kiwi-gingembre", name: "Jus kiwi & gingembre", category: "boissons", price: 39, tags: ["vegetarien"] },
  { id: "jus-orange", name: "Jus d'orange", category: "boissons", price: 30, tags: ["vegetarien"] },
  { id: "eau-1-5l", name: "Eau minérale 1,5 L", category: "boissons", price: 20, tags: ["vegetarien"] },
  { id: "soda-25cl", name: "Soda 25 cl", category: "boissons", price: 12, tags: ["vegetarien"] },
  { id: "oulmes", name: "Oulmès", category: "boissons", price: 12, tags: ["vegetarien"] },
  { id: "eau-50cl", name: "Eau minérale 50 cl", category: "boissons", price: 12, tags: ["vegetarien"] },
];

/* ─────────────────────────── Sélecteurs ──────────────────────────────────── */

/** Articles réellement proposés sur le site (hors retirés et saisonniers). */
export const availableItems = items.filter((i) => i.available !== false && !i.seasonal);

export const visibleCategories = categories.filter(
  (c) => !c.hidden && availableItems.some((i) => i.category === c.id),
);

export function itemsByCategory(categoryId: string): MenuItem[] {
  return availableItems.filter((i) => i.category === categoryId);
}

export function getItem(id: string): MenuItem | undefined {
  return items.find((i) => i.id === id);
}

export function getCategory(id: string): MenuCategory | undefined {
  return categories.find((c) => c.id === id);
}

/** Nombre de pièces effectif : celui de l'article, sinon celui de la catégorie. */
export function piecesOf(item: MenuItem): number | undefined {
  return item.pieces ?? getCategory(item.category)?.pieces;
}

export const priceRange = {
  min: Math.min(...availableItems.map((i) => i.price)),
  max: Math.max(...availableItems.map((i) => i.price)),
};
