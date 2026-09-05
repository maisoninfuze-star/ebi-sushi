# Ebi Sushi — El Jadida

Site vitrine et de commande pour **Ebi Sushi**, restaurant japonais et fusion
asiatique situé Avenue Mohammed VI, El Jadida.

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion

---

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

| Commande                   | Rôle                                                      |
| -------------------------- | --------------------------------------------------------- |
| `npm run dev`              | Serveur de développement                                   |
| `npm run build`            | Build de production                                        |
| `npm start`                | Sert le build de production                                |
| `npm run lint`             | ESLint                                                     |
| `npm run typecheck`        | Vérification TypeScript                                    |
| `npm run images`           | (Ré)génère les visuels d'ambiance via fal.ai (`FAL_KEY`)   |
| `npm run images:optimize`  | Recompresse `public/images` (à lancer après tout ajout)    |

Variables d'environnement : voir `.env.example`. Aucune n'est requise en local ;
`NEXT_PUBLIC_SITE_URL` est en revanche indispensable avant la mise en ligne.

---

## Où modifier quoi

Toutes les informations éditables sont regroupées. **Aucune donnée métier n'est
écrite en dur dans les composants.**

| Je veux changer…                                          | Fichier |
| --------------------------------------------------------- | ------- |
| Téléphone, adresse, horaires, réseaux sociaux, WhatsApp     | `src/config/business.ts` |
| Prix, plats, catégories, mentions végétarien / épicé        | `src/data/menu.ts` |
| Plats du carrousel d'accueil (hero) et ses réglages         | `src/data/hero.ts` |
| Plats mis en avant dans « Nos signatures »                  | `src/data/featured.ts` |
| Photos de la galerie                                        | `src/data/gallery.ts` |
| Avis clients                                                | `src/data/reviews.ts` |
| Textes du site (titres, boutons, messages d'erreur)         | `src/i18n/fr.ts` |
| Titres et descriptions SEO, menu de navigation              | `src/config/site.ts` |

### Mettre à jour la carte

Tout se passe dans `src/data/menu.ts` :

```ts
{ id: "maki-saumon", name: "Maki saumon", category: "makis", price: 40, pieces: 6 }
```

* **un prix change** → modifier `price` (nombre entier, en dirhams) ;
* **un plat n'est plus servi** → supprimer la ligne, ou ajouter `available: false`
  pour le retirer du site sans perdre la donnée ;
* **un plat est saisonnier** → `seasonal: true` (conservé, masqué du site) ;
* **une photo arrive** → `image: "/images/mon-plat.jpg"` ;
* **réordonner les catégories** → déplacer les entrées du tableau `categories`.

Les compteurs de la page carte, la navigation par catégorie, les filtres, la
recherche et les données structurées Google se recalculent automatiquement.

---

## Ce que fait le site

| Route          | Contenu |
| -------------- | ------- |
| `/`            | Accueil : hero en deux panneaux (carrousel de plats + marque), services, signatures, récit de marque, galerie, réservation, localisation |
| `/menu`        | Carte complète : recherche, filtres, panier, fiche plat |
| `/reservation` | Demande de réservation |
| `/contact`     | Adresse, horaires, carte, réseaux sociaux |
| `/privacy`     | Politique de confidentialité |
| `/sitemap.xml`, `/robots.txt` | Référencement |

### Commandes et réservations

Aucun prestataire de paiement n'étant configuré, **le site ne simule aucun
paiement en ligne**. Les commandes et demandes de réservation composent un
message français structuré (articles, quantités, notes, sous-total,
coordonnées) et ouvrent la conversation WhatsApp du restaurant.

L'interface n'affiche jamais de confirmation si la fenêtre WhatsApp n'a pas pu
s'ouvrir, et présente toujours la réservation comme une **demande** à confirmer
par le restaurant.

Pour brancher plus tard une vraie caisse ou un prestataire de livraison, il
suffit de remplacer l'implémentation dans `src/lib/whatsapp.ts` : le reste de
l'interface est indépendant du canal utilisé.

---

## Composants

```
src/components/
├── layout/    Header · MobileNavigation · Footer · MobileOrderBar · LanguageSwitcher
├── home/      Hero · ServiceStrip · SignatureDishes · StorySection · ExperienceSection
│              Gallery · Reviews · ReservationBand · LocationSection · FinalCta
├── menu/      MenuExperience · MenuCategoryNav · MenuFilters · MenuItemCard
│              MenuItemModal · MenuSkeleton
├── cart/      CartProvider · CartDrawer · QuantityStepper
├── reservation/ ReservationForm
├── seo/       StructuredData (Restaurant · Menu · Breadcrumb)
└── ui/        Logo · Button · Field · OptimizedImage · Reveal · SectionHeading · Icons · Grain
```

---

## Multilingue

Le français est la seule langue publiée. L'architecture est prête :

1. dupliquer `src/i18n/fr.ts` en `en.ts` / `ar.ts` et traduire les valeurs ;
2. passer `enabled: true` pour la langue dans `src/config/site.ts` ;
3. l'arabe est déjà déclaré `dir: "rtl"`.

Aucun composant n'a besoin d'être modifié : tous lisent le dictionnaire. Le
sélecteur de langue de l'en-tête affiche les langues non publiées comme
« Bientôt » plutôt que de les masquer.

---

## Performance et accessibilité

* Images en AVIF/WebP, dimensions responsives, chargement différé sous la ligne
  de flottaison ; le panneau photo du hero, masqué sur mobile, n'y charge
  qu'une vignette d'un pixel grâce à l'attribut `sizes`.
* La carte compte 214 plats : chaque catégorie ne monte ses cartes qu'à
  l'approche du viewport, avec squelettes de chargement.
* Polices chargées via `next/font` (aucun appel réseau tiers).
* Animations Motion via le composant `m` et `LazyMotion` : les fonctionnalités
  d'animation arrivent après l'hydratation, hors du bundle initial.
* Mouvement compatible LCP : les plus grands éléments d'un écran (nom de marque,
  carte du hero, titre de page) sont peints dès la première image et ne font que
  se poser ; seuls les petits éléments s'estompent.
* Intro logo à l'ouverture (`src/components/layout/Intro.tsx`) : jouée une fois
  par session, passable d'un clic ou d'une touche, absente si le système demande
  moins d'animations ; le hero n'anime son entrée qu'à la levée du rideau.
* Navigation clavier complète, pièges à focus dans les panneaux modaux,
  fermeture par Échap, libellés de formulaire associés, cibles tactiles ≥ 24 px,
  hiérarchie de titres continue, `prefers-reduced-motion` respecté.
* Les mentions « végétarien » et « épicé » associent toujours une icône **et** un
  texte — jamais la couleur seule.

---

## ⚠️ À compléter par le restaurant

Les informations ci-dessous proviennent des fiches publiques Google, Glovo et
Restaurant Guru (relevé de septembre 2026). **Rien n'a été inventé**, mais tout
doit être confirmé avant la mise en ligne.

| # | Point | Où | Priorité |
| - | ----- | -- | -------- |
| 1 | **Numéro WhatsApp** — destination de toutes les commandes et réservations. Non confirmé (`verified: false`). | `business.whatsapp` ou `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Critique** |
| 2 | **Horaires** — les sources se contredisent (Glovo : 12h–00h ; Google : 9h45–1h). Les horaires Glovo sont retenus. | `business.hours` | **Critique** |
| 3 | **Domaine définitif** — conditionne URL canoniques, sitemap et partages sociaux. | `NEXT_PUBLIC_SITE_URL` | **Critique** |
| 4 | **Photos réelles des plats** — voir ci-dessous. | `src/data/menu.ts` (`image`) | Haute |
| 5 | **Logo officiel** — le lockup actuel a été dessiné pour le site. | `src/components/ui/Logo.tsx` | Haute |
| 6 | **Avis clients** — aucun avis n'est affiché tant qu'aucun n'est fourni. L'agrégat Google (3,8/5 · 191 avis) est désactivé (`showAggregate: false`). | `src/data/reviews.ts`, `socialProof` | Moyenne |
| 7 | **Descriptions des plats** — seules les compositions déductibles du nom sont renseignées ; les recettes signature sont volontairement vides. | `src/data/menu.ts` | Moyenne |
| 8 | **Mentions végétarien / épicé** — renseignées de façon prudente, à compléter par la cuisine. | `src/data/menu.ts` (`tags`) | Moyenne |
| 9 | **Zones de livraison, minimum de commande, frais** | `business.delivery` | Moyenne |
| 10 | **Page Facebook** — URL à confirmer. Code postal et e-mail manquants. | `business.social`, `business.address` | Basse |
| 11 | **Mentions légales** — raison sociale, immatriculation, hébergeur, responsable du traitement. | `src/app/privacy/page.tsx` | Basse |
| 12 | **Assortiments saisonniers** — vérifier ceux encore proposés (l'assortiment de Noël est déjà `seasonal: true`). | `src/data/menu.ts` | Basse |

### À propos des visuels

Aucune photographie du restaurant n'a été fournie. Les visuels d'ambiance de
`public/images` ont été produits pour la direction artistique du site
(`scripts/generate-images.mjs`). Ils illustrent l'atmosphère et des **types** de
préparations — ils ne représentent pas un plat précis servi par Ebi Sushi.

C'est pourquoi **les 214 plats de la carte s'affichent sans photo**, avec une
vignette typographique sobre : mieux vaut une carte élégante et honnête qu'une
photo qui ne correspond pas à l'assiette servie. Six visuels illustrent la
section « Nos signatures » et quatre visuels verticaux alimentent le carrousel
du hero (`src/data/hero.ts`).

Dès réception des photos réelles : les déposer dans `public/images`, renseigner
le champ `image` du plat dans `src/data/menu.ts`, puis lancer
`npm run images:optimize`. Rien d'autre n'est à modifier.

---

Site conçu et développé par **B12 Ventures**.
