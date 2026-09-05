import { cn } from "@/lib/utils";

/**
 * Marque typographique Ebi Sushi.
 *
 * TODO — Aucun logo officiel n'a été fourni. Ce lockup a été dessiné pour le
 * site (serif éditorial + capitales espacées, filet champagne). Dès réception
 * du logo réel, remplacer le contenu de ce composant : il est utilisé partout
 * (en-tête, menu mobile, pied de page), rien d'autre n'est à modifier.
 */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  /** `sm` en-tête compacte · `md` en-tête · `lg` pied de page et menu mobile. */
  size?: "sm" | "md" | "lg";
}) {
  const scale = {
    sm: { word: "text-[1.35rem]", sub: "text-[0.5rem]", gap: "gap-[0.2rem]" },
    md: { word: "text-[1.6rem] sm:text-[1.75rem]", sub: "text-[0.55rem]", gap: "gap-[0.25rem]" },
    lg: { word: "text-4xl sm:text-5xl", sub: "text-[0.7rem]", gap: "gap-2" },
  }[size];

  return (
    <span className={cn("inline-flex flex-col items-center leading-none", scale.gap, className)}>
      <span
        className={cn(
          "font-display font-light tracking-[0.2em] text-ivory",
          // Le pas de tracking crée un vide à droite : on le compense.
          "indent-[0.2em]",
          scale.word,
        )}
      >
        EBI
        {/* Espace lu par les lecteurs d'écran : « EBI Sushi », pas « EBISushi ». */}
        <span className="sr-only"> </span>
      </span>
      <span className="flex w-full items-center gap-[0.4em]">
        <span aria-hidden className="h-px flex-1 bg-champagne/45" />
        <span
          className={cn(
            "font-sans font-medium uppercase tracking-[0.38em] text-champagne indent-[0.38em]",
            scale.sub,
          )}
        >
          Sushi
        </span>
        <span aria-hidden className="h-px flex-1 bg-champagne/45" />
      </span>
    </span>
  );
}
