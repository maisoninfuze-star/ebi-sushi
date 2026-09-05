"use client";

import { useEffect, useRef } from "react";

import { type MenuCategory } from "@/data/menu";
import { dict } from "@/i18n/fr";
import { cn } from "@/lib/utils";

export function MenuCategoryNav({
  categories,
  activeId,
  onSelect,
}: {
  categories: MenuCategory[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  // Garde la catégorie active visible dans la barre défilante.
  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const target = listRef.current.querySelector<HTMLElement>(`[data-category="${activeId}"]`);
    if (!target) return;

    const list = listRef.current;
    const offset = target.offsetLeft - list.offsetWidth / 2 + target.offsetWidth / 2;
    list.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [activeId]);

  return (
    <nav
      aria-label={dict.menu.categoriesLabel}
      className="sticky top-[4.5rem] z-30 -mx-5 border-b border-ivory/[0.08] bg-ink/92 backdrop-blur-xl sm:-mx-10 lg:top-20"
    >
      <ul
        ref={listRef}
        className="no-scrollbar flex gap-1 overflow-x-auto px-5 sm:px-10 lg:px-0"
      >
        {categories.map((category) => {
          const active = activeId === category.id;
          return (
            <li key={category.id} className="shrink-0">
              <button
                type="button"
                data-category={category.id}
                onClick={() => onSelect(category.id)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative block whitespace-nowrap px-4 py-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                  active ? "text-ivory" : "text-ash hover:text-ivory/85",
                )}
              >
                {category.name}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-px bg-champagne transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
