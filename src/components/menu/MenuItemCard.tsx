"use client";

import { m, useReducedMotion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconPlus, IconCheck, IconLeaf, IconFlame, IconStar } from "@/components/ui/Icons";
import { useCart } from "@/components/cart/CartProvider";
import { piecesOf, type MenuItem } from "@/data/menu";
import { dict } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const TAG_META = {
  vegetarien: { Icon: IconLeaf, className: "text-champagne" },
  epice: { Icon: IconFlame, className: "text-vermilion" },
  populaire: { Icon: IconStar, className: "text-champagne" },
  signature: { Icon: IconStar, className: "text-champagne" },
} as const;

export function MenuItemCard({
  item,
  onOpen,
  index = 0,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  index?: number;
}) {
  const { add, lastAdded } = useCart();
  const reduced = useReducedMotion();
  const pieces = piecesOf(item);
  const justAdded = lastAdded === item.id;

  // Les mentions les plus utiles d'abord ; deux au maximum pour ne pas charger.
  const tags = (item.tags ?? []).filter((t) => t in TAG_META).slice(0, 2);

  return (
    <m.article
      layout={false}
      // Montée seule, sans fondu : les cartes sont visibles avant l'hydratation
      // et le titre de page n'est pas le seul texte compté pour le LCP.
      initial={reduced ? undefined : { y: 14 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col border border-ivory/[0.08] bg-charcoal transition-colors duration-500 hover:border-ivory/20"
    >
      {/* La carte entière ouvre le détail ; les boutons restent au-dessus. */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex flex-1 items-start gap-4 p-4 text-left sm:p-5"
      >
        <span className="sr-only">{dict.menu.detail} — </span>

        <OptimizedImage
          src={item.image ?? ""}
          alt=""
          aria-hidden
          width={200}
          height={200}
          quality={70}
          loading="lazy"
          sizes="88px"
          wrapperClassName="size-[4.5rem] shrink-0 sm:size-20"
          className="size-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-quint)] group-hover:scale-105"
        />

        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-start justify-between gap-3">
            <span className="font-display text-[1.15rem] font-normal leading-snug text-ivory">
              {item.name}
            </span>
          </span>

          {pieces && (
            <span className="mt-1 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-champagne/80">
              {dict.menu.pieces(pieces)}
            </span>
          )}

          {item.description && (
            <span className="mt-2 line-clamp-2 font-sans text-[0.8125rem] leading-relaxed text-ash">
              {item.description}
            </span>
          )}

          {tags.length > 0 && (
            <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {tags.map((tag) => {
                const { Icon, className } = TAG_META[tag as keyof typeof TAG_META];
                return (
                  <span key={tag} className="flex items-center gap-1.5">
                    <Icon className={cn("size-3", className)} />
                    <span className="font-sans text-[0.5625rem] uppercase tracking-[0.14em] text-ash">
                      {dict.menu.tags[tag]}
                    </span>
                  </span>
                );
              })}
            </span>
          )}
        </span>
      </button>

      <div className="flex items-center justify-between gap-3 border-t border-ivory/[0.07] px-4 py-3 sm:px-5">
        <p className="font-display text-xl font-light tabular-nums text-ivory">
          {formatPrice(item.price)}
        </p>

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
            "flex min-h-10 items-center gap-2 border px-4 font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-400",
            justAdded
              ? "border-champagne bg-champagne/10 text-champagne"
              : "border-ivory/18 text-ivory/80 hover:border-vermilion hover:bg-vermilion hover:text-ivory",
          )}
        >
          {justAdded ? <IconCheck className="size-3.5" /> : <IconPlus className="size-3.5" />}
          {justAdded ? dict.signatures.added : dict.signatures.add}
          <span className="sr-only"> — {item.name}</span>
        </button>
      </div>
    </m.article>
  );
}
