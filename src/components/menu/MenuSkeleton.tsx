/** Réserve la place d'une grille de plats pendant son montage progressif. */
export function MenuSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul aria-hidden className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="border border-ivory/[0.06]">
          <div className="flex gap-4 p-4 sm:p-5">
            <div className="skeleton size-[4.5rem] shrink-0 sm:size-20" />
            <div className="flex-1 space-y-2.5 pt-1">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/3" />
              <div className="skeleton h-3 w-full" />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-ivory/[0.06] px-4 py-3 sm:px-5">
            <div className="skeleton h-5 w-20" />
            <div className="skeleton h-10 w-24" />
          </div>
        </li>
      ))}
    </ul>
  );
}
