"use client";

import { IconSearch, IconClose, IconLeaf, IconFlame, IconStar } from "@/components/ui/Icons";
import { dict } from "@/i18n/fr";
import { cn } from "@/lib/utils";

export type FilterKey = "populaire" | "signature" | "vegetarien" | "epice";

const FILTERS: { key: FilterKey; label: string; Icon: typeof IconStar }[] = [
  { key: "populaire", label: dict.menu.filters.popular, Icon: IconStar },
  { key: "signature", label: dict.menu.filters.signature, Icon: IconStar },
  { key: "vegetarien", label: dict.menu.filters.vegetarian, Icon: IconLeaf },
  { key: "epice", label: dict.menu.filters.spicy, Icon: IconFlame },
];

export function MenuFilters({
  query,
  onQueryChange,
  active,
  onToggle,
  onClear,
  resultCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  active: Set<FilterKey>;
  onToggle: (key: FilterKey) => void;
  onClear: () => void;
  resultCount: number;
}) {
  const hasFilters = active.size > 0 || query.length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Recherche */}
      <div className="relative max-w-md">
        <IconSearch className="pointer-events-none absolute left-0 top-1/2 size-[1.1rem] -translate-y-1/2 text-ash" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={dict.menu.search}
          aria-label={dict.menu.searchLabel}
          className="w-full border-b border-ivory/15 bg-transparent py-3.5 pl-8 pr-9 font-sans text-[0.9375rem] text-ivory placeholder:text-ash/50 transition-colors focus:border-champagne focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label={dict.menu.noResults.reset}
            className="absolute right-0 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center text-ash transition-colors hover:text-ivory"
          >
            <IconClose className="size-4" />
          </button>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap items-center gap-2.5">
        {FILTERS.map(({ key, label, Icon }) => {
          const on = active.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              aria-pressed={on}
              className={cn(
                "flex min-h-10 items-center gap-2 border px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-400",
                on
                  ? "border-champagne bg-champagne/12 text-ivory"
                  : "border-ivory/12 text-ash hover:border-ivory/30 hover:text-ivory",
              )}
            >
              <Icon className={cn("size-3.5", on ? "text-champagne" : "text-ash")} />
              {label}
            </button>
          );
        })}

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex min-h-10 items-center gap-1.5 px-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-ash underline underline-offset-4 transition-colors hover:text-salmon"
          >
            {dict.menu.filters.clear}
          </button>
        )}
      </div>

      {/* Compte des résultats, annoncé aux technologies d'assistance. */}
      <p aria-live="polite" className="font-sans text-xs tracking-wide text-ash">
        {dict.menu.results(resultCount)}
      </p>
    </div>
  );
}
