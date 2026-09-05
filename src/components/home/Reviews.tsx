import { ReviewCard, Stars } from "@/components/home/ReviewCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/Icons";
import { reviews } from "@/data/reviews";
import { business, socialProof } from "@/config/business";

/**
 * Preuve sociale.
 *
 * La section ne s'affiche que si de vrais avis ont été renseignés dans
 * src/data/reviews.ts. Rien n'est inventé, rien n'est simulé : sans donnée
 * vérifiée, le composant ne rend rien du tout.
 */
export function Reviews() {
  if (reviews.length === 0) return null;

  const featured = reviews.find((r) => r.featured) ?? reviews[0];
  const others = reviews.filter((r) => r !== featured).slice(0, 2);

  return (
    <section className="bg-ink py-24 sm:py-28 lg:py-(--spacing-section)">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Ils en parlent" title="La parole est à nos clients." />

          {socialProof.showAggregate && (
            <Reveal delay={0.15} className="shrink-0">
              <div className="flex items-center gap-4">
                <Stars rating={socialProof.ratingValue} />
                <p className="font-sans text-sm text-ash">
                  <span className="font-semibold text-ivory">
                    {socialProof.ratingValue.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}
                  </span>
                  {" · "}
                  {socialProof.reviewCount} avis {socialProof.source}
                </p>
              </div>
            </Reveal>
          )}
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Reveal className="h-full">
            <ReviewCard review={featured} featured />
          </Reveal>

          <div className="grid gap-4 lg:gap-6">
            {others.map((review, i) => (
              <Reveal key={review.author + i} delay={0.1 + i * 0.08} className="h-full">
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <a
            href={business.maps.reviews}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 border-b border-ivory/20 py-2.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:border-champagne hover:text-champagne"
          >
            Voir tous les avis {socialProof.source}
            <IconArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
