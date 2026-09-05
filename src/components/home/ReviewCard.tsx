import { IconStar } from "@/components/ui/Icons";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-1", className)} role="img" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar
          key={i}
          className={cn("size-3.5", i <= Math.round(rating) ? "text-champagne" : "text-ivory/20")}
          fill={i <= Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col border border-ivory/[0.08] bg-charcoal p-7",
        featured && "sm:p-10",
      )}
    >
      <Stars rating={review.rating} />

      <blockquote
        className={cn(
          "mt-6 flex-1 font-display font-light leading-[1.45] text-ivory",
          featured ? "text-[clamp(1.4rem,3vw,2rem)]" : "text-lg",
        )}
      >
        <p>“{review.text}”</p>
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-ivory/[0.08] pt-5">
        <span className="font-sans text-sm font-medium text-ivory">{review.author}</span>
        <span aria-hidden className="h-3 w-px bg-ivory/20" />
        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ash">
          {review.source}
        </span>
      </figcaption>
    </figure>
  );
}
