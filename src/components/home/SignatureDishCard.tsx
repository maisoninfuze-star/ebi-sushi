"use client";

import { m, useReducedMotion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconPlus, IconCheck, IconLeaf, IconFlame } from "@/components/ui/Icons";
import { useCart } from "@/components/cart/CartProvider";
import { piecesOf, type MenuItem } from "@/data/menu";
import { dict } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function SignatureDishCard({
  item,
  priority = false,
  className,
}: {
  item: MenuItem;
  priority?: boolean;
  className?: string;
}) {
  const { add, lastAdded } = useCart();
  const reduced = useReducedMotion();
  const pieces = piecesOf(item);
  const justAdded = lastAdded === item.id;

  return (
    <article className={cn("group flex flex-col", className)}>
      <div className="relative overflow-hidden">
        <m.div
          whileHover={reduced ? undefined : { scale: 1.045 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center"
        >
          <OptimizedImage
            src={item.image ?? ""}
            alt={`${item.name} — Ebi Sushi El Jadida`}
            width={900}
            height={675}
            priority={priority}
            quality={78}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 78vw"
            wrapperClassName="aspect-[4/3] w-full"
            className="size-full object-cover"
          />
        </m.div>

        {/* Voile permettant au prix de rester lisible sur toute photo. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent"
        />

        <p className="absolute bottom-4 left-4 font-display text-2xl font-light text-ivory">
          {formatPrice(item.price)}
        </p>

        {/* Mentions : icône + texte, jamais la couleur seule. */}
        {(item.tags?.includes("vegetarien") || item.tags?.includes("epice")) && (
          <ul className="absolute right-4 top-4 flex flex-col items-end gap-2">
            {item.tags?.includes("vegetarien") && (
              <li className="flex items-center gap-1.5 bg-ink/70 px-2.5 py-1.5 backdrop-blur-sm">
                <IconLeaf className="size-3 text-champagne" />
                <span className="font-sans text-[0.5625rem] uppercase tracking-[0.14em] text-ivory">
                  {dict.menu.tags.vegetarien}
                </span>
              </li>
            )}
            {item.tags?.includes("epice") && (
              <li className="flex items-center gap-1.5 bg-ink/70 px-2.5 py-1.5 backdrop-blur-sm">
                <IconFlame className="size-3 text-vermilion" />
                <span className="font-sans text-[0.5625rem] uppercase tracking-[0.14em] text-ivory">
                  {dict.menu.tags.epice}
                </span>
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[1.4rem] font-light leading-tight text-ivory">
            {item.name}
          </h3>
          {pieces && (
            <span className="shrink-0 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-champagne">
              {dict.menu.pieces(pieces)}
            </span>
          )}
        </div>

        {item.description && (
          <p className="mt-2 max-w-[38ch] font-sans text-[0.8125rem] leading-relaxed text-ash">
            {item.description}
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            add({
              id: item.id,
              name: item.name,
              price: item.price,
              pieces,
              image: item.image,
              category: item.category,
            })
          }
          className={cn(
            "mt-5 flex min-h-11 w-full items-center justify-center gap-2 border font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-400",
            justAdded
              ? "border-champagne bg-champagne/10 text-champagne"
              : "border-ivory/18 text-ivory/80 hover:border-vermilion hover:bg-vermilion hover:text-ivory",
          )}
        >
          {justAdded ? (
            <>
              <IconCheck className="size-3.5" />
              {dict.signatures.added}
            </>
          ) : (
            <>
              <IconPlus className="size-3.5" />
              {dict.signatures.add}
            </>
          )}
          <span className="sr-only"> — {item.name}</span>
        </button>
      </div>
    </article>
  );
}
