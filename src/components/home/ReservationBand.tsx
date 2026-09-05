import { ReservationForm } from "@/components/reservation/ReservationForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconPhone } from "@/components/ui/Icons";
import { business } from "@/config/business";
import { dict } from "@/i18n/fr";

/**
 * La réservation est proposée directement sur la page d'accueil : un visiteur
 * décidé n'a pas à changer de page pour convertir. Le formulaire est le même
 * composant que celui de /reservation.
 */
export function ReservationBand() {
  return (
    <section
      id="reservation"
      className="border-y border-ivory/[0.08] bg-ink py-24 sm:py-28 lg:py-(--spacing-section)"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={dict.reservation.eyebrow}
              title={dict.reservation.title}
              description={dict.reservation.text}
            />

            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-ivory/[0.08] pt-8">
                <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ash">
                  Une demande urgente ?
                </p>
                <a
                  href={`tel:${business.phone.e164}`}
                  className="mt-2 inline-flex min-h-11 items-center gap-3 font-display text-2xl font-light text-ivory transition-colors hover:text-champagne"
                >
                  <IconPhone className="size-5 text-champagne" />
                  {business.phone.display}
                </a>
                <p className="mt-3 font-sans text-sm text-ash">{business.hours.summary}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-ivory/[0.08] bg-charcoal p-6 sm:p-9 lg:p-11">
              <ReservationForm compact />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
