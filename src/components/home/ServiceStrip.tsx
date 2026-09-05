import { IconDineIn, IconDelivery, IconTakeaway, IconReservation } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business";
import { dict } from "@/i18n/fr";
import { cn } from "@/lib/utils";

const ICONS = [IconDineIn, IconDelivery, IconTakeaway, IconReservation];
const ENABLED = [
  business.services.dineIn,
  business.services.delivery,
  business.services.takeaway,
  business.services.reservation,
];

/**
 * Bandeau de services : une ligne continue scandée par des filets verticaux,
 * plutôt que quatre cartes détachées — la lecture reste éditoriale.
 */
export function ServiceStrip() {
  const services = dict.services.items
    .map((item, i) => ({ ...item, Icon: ICONS[i], enabled: ENABLED[i] }))
    .filter((s) => s.enabled);

  return (
    <section className="border-y border-ivory/[0.08] bg-charcoal">
      <div className="container-page">
        {/* Titre de section réservé aux lecteurs d'écran : il rétablit la
            hiérarchie h1 › h2 › h3 sans alourdir la composition. */}
        <h2 className="sr-only">{dict.services.title}</h2>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {services.map(({ label, description, Icon }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 0.08}
              className={cn(
                "group flex flex-col gap-4 py-9 sm:py-11 lg:py-14",
                // Filets : entre les colonnes, et entre les deux rangées mobiles.
                "border-ivory/[0.08] [&:nth-child(n+3)]:border-t [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-5",
                "sm:[&:nth-child(even)]:pl-8",
                "lg:border-t-0 lg:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8 lg:[&:nth-child(n+3)]:border-t-0",
                "pr-3 sm:pr-6",
              )}
            >
              <Icon className="size-6 text-champagne transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-0.5" />

              <div>
                <h3 className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-ivory">
                  {label}
                </h3>
                <p className="mt-2 max-w-[26ch] font-sans text-[0.8125rem] leading-relaxed text-ash">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
