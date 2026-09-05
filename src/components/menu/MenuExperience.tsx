"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { MenuFilters, type FilterKey } from "@/components/menu/MenuFilters";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import dynamic from "next/dynamic";

// La fiche plat n'est chargée qu'au premier clic.
const MenuItemModal = dynamic(
  () => import("@/components/menu/MenuItemModal").then((m) => m.MenuItemModal),
  { ssr: false },
);
import { MenuSkeleton } from "@/components/menu/MenuSkeleton";
import { availableItems, visibleCategories, getCategory, type MenuItem } from "@/data/menu";
import { dict } from "@/i18n/fr";

/** Recherche insensible à la casse et aux accents. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Une section de catégorie ne monte ses cartes qu'à l'approche du viewport.
 * Sans cela, les 238 plats de la carte seraient tous rendus d'un coup au
 * chargement de la page — au prix d'un blocage visible sur mobile.
 */
function CategorySection({
  categoryId,
  items,
  onOpen,
  eager,
}: {
  categoryId: string;
  items: MenuItem[];
  onOpen: (item: MenuItem) => void;
  eager: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(eager);
  const category = getCategory(categoryId);

  useEffect(() => {
    if (mounted || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted]);

  if (!category) return null;

  const showCards = mounted || eager;

  return (
    <section
      ref={ref}
      id={`categorie-${categoryId}`}
      data-category-section={categoryId}
      aria-labelledby={`titre-${categoryId}`}
      // Compense l'en-tête et la barre de catégories lors des sauts d'ancre.
      className="scroll-mt-14 pt-14 first:pt-10 sm:pt-16"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ivory/[0.08] pb-5">
        <h2
          id={`titre-${categoryId}`}
          className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-light leading-none text-ivory"
        >
          {category.name}
        </h2>
        {category.tagline && (
          <p className="font-sans text-[0.8125rem] text-ash">{category.tagline}</p>
        )}
      </div>

      <div className="mt-7">
        {showCards ? (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.id}>
                <MenuItemCard item={item} onOpen={onOpen} index={i} />
              </li>
            ))}
          </ul>
        ) : (
          // Autant de squelettes que de plats : la section occupe déjà sa hauteur
          // finale, et un lien profond vers une catégorie plus bas ne dérive pas
          // quand les sections du dessus montent leurs cartes.
          <MenuSkeleton count={items.length} />
        )}
      </div>
    </section>
  );
}

export function MenuExperience() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Set<FilterKey>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(
    visibleCategories[0]?.id ?? null,
  );
  const [selected, setSelected] = useState<MenuItem | null>(null);
  /** Catégorie visée par l'ancre de l'URL : montée immédiatement, puis cadrée. */
  const [anchoredCategory, setAnchoredCategory] = useState<string | null>(null);

  const isFiltering = query.trim().length > 0 || filters.size > 0;

  const results = useMemo(() => {
    const q = normalize(query.trim());

    return availableItems.filter((item) => {
      // Union et non intersection : cocher « Végétarien » puis « Épicé » élargit
      // la sélection au lieu de la vider — aucun plat ne porte les deux mentions.
      if (filters.size > 0 && !Array.from(filters).some((f) => item.tags?.includes(f))) {
        return false;
      }
      if (!q) return true;

      const haystack = normalize(
        `${item.name} ${item.description ?? ""} ${getCategory(item.category)?.name ?? ""}`,
      );
      return haystack.includes(q);
    });
  }, [query, filters]);

  const toggleFilter = useCallback((key: FilterKey) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setQuery("");
    setFilters(new Set());
  }, []);

  // Liens profonds « /menu#categorie-xxx » (cartes du hero, partages).
  // Le navigateur ne peut pas cadrer seul une section dont les cartes se
  // montent à la demande : on la monte d'abord, puis on la fait défiler.
  useEffect(() => {
    const applyHash = () => {
      const id = decodeURIComponent(window.location.hash).replace(/^#categorie-/, "");
      if (!id || !visibleCategories.some((c) => c.id === id)) return;
      setAnchoredCategory(id);
      setActiveCategory(id);
      // Un court délai laisse la section recevoir ses cartes avant le cadrage.
      // Pas de requestAnimationFrame : il reste gelé dans un onglet d'arrière-plan.
      // Second cadrage un peu plus tard : les catégories situées au-dessus montent
      // leurs cartes en approchant du viewport et décalent la cible vers le bas.
      const frame = () =>
        document
          .getElementById(`categorie-${id}`)
          ?.scrollIntoView({ block: "start", behavior: "instant" });
      window.setTimeout(frame, 60);
      window.setTimeout(frame, 450);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Suivi de la catégorie courante pendant le défilement.
  useEffect(() => {
    if (isFiltering) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-category-section]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // La section la plus haute encore visible dans la bande de lecture gagne.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveCategory(visible[0].target.getAttribute("data-category-section"));
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isFiltering]);

  const goToCategory = useCallback((id: string) => {
    const target = document.getElementById(`categorie-${id}`);
    if (!target) return;
    setActiveCategory(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <div className="container-page">
        <MenuFilters
          query={query}
          onQueryChange={setQuery}
          active={filters}
          onToggle={toggleFilter}
          onClear={clearAll}
          resultCount={results.length}
        />
      </div>

      <div className="container-page mt-8 pb-24 sm:pb-28">
        {!isFiltering && (
          <MenuCategoryNav
            categories={visibleCategories}
            activeId={activeCategory}
            onSelect={goToCategory}
          />
        )}

        {isFiltering ? (
          results.length > 0 ? (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item, i) => (
                <li key={item.id}>
                  <MenuItemCard item={item} onOpen={setSelected} index={i} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-20 flex flex-col items-center gap-5 text-center">
              <p aria-hidden className="font-display text-5xl font-light text-ivory/12">
                海老
              </p>
              <div>
                <h2 className="font-display text-2xl font-light text-ivory">
                  {dict.menu.noResults.title}
                </h2>
                <p className="mt-2 font-sans text-sm text-ash">{dict.menu.noResults.text}</p>
              </div>
              <button
                type="button"
                onClick={clearAll}
                className="mt-1 inline-flex min-h-12 items-center border border-ivory/25 px-7 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory/60"
              >
                {dict.menu.noResults.reset}
              </button>
            </div>
          )
        ) : (
          visibleCategories.map((category, i) => (
            <CategorySection
              key={category.id}
              categoryId={category.id}
              items={results.filter((item) => item.category === category.id)}
              onOpen={setSelected}
              eager={i < 2 || category.id === anchoredCategory}
            />
          ))
        )}
      </div>

      <MenuItemModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
