/**
 * Grain photographique très léger appliqué à toute la page.
 * Rendu en SVG inline : aucune requête réseau, aucun coût de chargement.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      // Réservé aux grands écrans : un calque plein écran en fusion coûte cher
      // aux GPU mobiles pour un effet invisible sur un petit écran.
      className="pointer-events-none fixed inset-0 z-[60] hidden opacity-[0.035] mix-blend-overlay lg:block"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
