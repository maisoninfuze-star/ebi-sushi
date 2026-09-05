"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { TextAreaField } from "@/components/ui/Field";
import { IconClose, IconLeaf, IconFlame, IconStar } from "@/components/ui/Icons";
import { useCart } from "@/components/cart/CartProvider";
import { piecesOf, getCategory, type MenuItem } from "@/data/menu";
import { dict } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";
import { useEscapeKey, useScrollLock, useMediaQuery } from "@/lib/hooks";
import { useFocusTrap } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

const TAG_META = {
  vegetarien: { Icon: IconLeaf, className: "text-champagne" },
  epice: { Icon: IconFlame, className: "text-vermilion" },
  populaire: { Icon: IconStar, className: "text-champagne" },
  signature: { Icon: IconStar, className: "text-champagne" },
} as const;

/**
 * Contenu du panneau, monté avec une `key` liée au plat : passer d'un plat à
 * l'autre repart d'une quantité et d'une note vierges, sans réinitialisation
 * manuelle depuis un effet.
 */
function ItemPanel({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const pieces = piecesOf(item);
  const category = getCategory(item.category);
  const tags = (item.tags ?? []).filter((t) => t in TAG_META);

  const confirm = () => {
    add(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        pieces,
        image: item.image,
        category: item.category,
        note: note.trim() || undefined,
      },
      quantity,
    );
    onClose();
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {item.image && (
          <OptimizedImage
            src={item.image}
            alt={`${item.name} — Ebi Sushi`}
            width={900}
            height={600}
            quality={80}
            sizes="(min-width: 768px) 32rem, 100vw"
            wrapperClassName="aspect-3/2 w-full"
            className="size-full object-cover"
          />
        )}

        <div className="px-5 pb-6 pt-6 sm:px-7">
          {category && <p className="eyebrow">{category.name}</p>}

          <h2
            id="plat-titre"
            className="mt-3 font-display text-[1.9rem] font-light leading-tight text-ivory"
          >
            {item.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-display text-2xl font-light tabular-nums text-champagne">
              {formatPrice(item.price)}
            </p>
            {pieces && (
              <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ash">
                {dict.menu.pieces(pieces)}
              </p>
            )}
          </div>

          <p className="mt-5 font-sans text-sm leading-[1.75] text-ash">
            {item.description ?? dict.menu.descriptionMissing}
          </p>

          {tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {tags.map((tag) => {
                const { Icon, className } = TAG_META[tag as keyof typeof TAG_META];
                return (
                  <li key={tag} className="flex items-center gap-2 border border-ivory/12 px-3 py-1.5">
                    <Icon className={cn("size-3.5", className)} />
                    <span className="font-sans text-[0.625rem] uppercase tracking-[0.14em] text-ivory/85">
                      {dict.menu.tags[tag]}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-7">
            <TextAreaField
              label={dict.menu.noteLabel}
              placeholder={dict.menu.notePlaceholder}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              optional
            />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-t border-ivory/[0.08] px-5 py-4 pb-safe sm:px-7">
        <QuantityStepper value={quantity} min={1} onChange={setQuantity} label={item.name} />
        <button
          type="button"
          onClick={confirm}
          className="flex min-h-12 flex-1 items-center justify-center bg-vermilion px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-[#c33f32]"
        >
          {dict.menu.addWithPrice(formatPrice(item.price * quantity))}
        </button>
      </div>
    </>
  );
}

/** Détail d'un plat : feuille remontante sur mobile, fenêtre centrée au-delà. */
export function MenuItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const open = item !== null;

  useScrollLock(open);
  useEscapeKey(open, onClose);
  useFocusTrap(open, panelRef);

  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 z-[80] bg-ink/78 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plat-titre"
            initial={isDesktop ? { opacity: 0, scale: 0.97 } : { y: "100%" }}
            animate={isDesktop ? { opacity: 1, scale: 1 } : { y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.97 } : { y: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed z-[85] flex flex-col border-ivory/12 bg-charcoal",
              "inset-x-0 bottom-0 max-h-[92svh] rounded-t-lg border-t",
              "md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[86vh] md:w-full md:max-w-lg",
              "md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-none md:border",
            )}
          >
            {/* Poignée tactile */}
            <div aria-hidden className="flex shrink-0 justify-center pt-3 md:hidden">
              <span className="h-1 w-11 rounded-full bg-ivory/20" />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={dict.gallery.close}
              className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center bg-ink/50 text-ivory backdrop-blur-sm transition-colors hover:bg-ink/80 md:bg-transparent"
            >
              <IconClose className="size-5" />
            </button>

            <ItemPanel key={item.id} item={item} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
