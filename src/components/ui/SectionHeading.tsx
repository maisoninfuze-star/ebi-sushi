import { cn } from "@/lib/utils";
import { Reveal, RevealText, RevealRule } from "@/components/ui/Reveal";

/**
 * En-tête de section : micro-libellé, titre éditorial et texte d'accompagnement.
 * Garantit un rythme typographique identique d'une section à l'autre.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  as = "h2",
  rule = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
  rule?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}

      <RevealText
        as={as}
        text={title}
        delay={eyebrow ? 0.08 : 0}
        className={cn(
          "mt-5 max-w-[18ch] text-balance font-display text-[clamp(2.15rem,6.2vw,4.25rem)] font-light leading-[1.04] text-ivory",
          align === "center" && "mx-auto",
          titleClassName,
        )}
      />

      {rule && (
        <RevealRule delay={0.25} className={cn("mt-8 w-16", align === "center" && "mx-auto")} />
      )}

      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-7 max-w-[46ch] font-sans text-[0.9375rem] leading-[1.75] text-ash sm:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
