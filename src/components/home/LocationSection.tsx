import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconPin, IconClock, IconPhone, IconArrowRight, IconWhatsApp } from "@/components/ui/Icons";
import { business } from "@/config/business";
import { dict } from "@/i18n/fr";
import { formatTime } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"] as const;

export function LocationSection({ className }: { className?: string }) {
  const schedule = DAYS.map((day) => ({
    day,
    label: business.hours.schedule[day]
      .map((p) => `${formatTime(p.open)} – ${formatTime(p.close)}`)
      .join(", "),
  }));

  const uniform = new Set(schedule.map((s) => s.label)).size === 1;

  return (
    <section
      id="nous-trouver"
      className={cn("bg-charcoal py-24 sm:py-28 lg:py-(--spacing-section)", className)}
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Informations */}
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={dict.location.eyebrow} title={dict.location.title} />

            <div className="mt-12 space-y-9">
              <Reveal>
                <div className="flex gap-4">
                  <IconPin className="mt-1 size-[1.15rem] shrink-0 text-champagne" />
                  <div>
                    <h3 className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ash">
                      {dict.location.addressLabel}
                    </h3>
                    <p className="mt-2 max-w-[30ch] font-display text-xl font-light leading-snug text-ivory">
                      {business.address.street}
                    </p>
                    <p className="font-display text-xl font-light text-ivory">
                      {business.address.locality}, {business.address.countryName}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex gap-4">
                  <IconClock className="mt-1 size-[1.15rem] shrink-0 text-champagne" />
                  <div>
                    <h3 className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ash">
                      {dict.location.hoursLabel}
                    </h3>
                    {uniform ? (
                      <p className="mt-2 font-display text-xl font-light text-ivory">
                        {business.hours.summary}
                      </p>
                    ) : (
                      <dl className="mt-2 space-y-1">
                        {schedule.map((s) => (
                          <div key={s.day} className="flex gap-4 font-sans text-sm">
                            <dt className="w-24 capitalize text-ash">{s.day}</dt>
                            <dd className="text-ivory/85">{s.label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="flex gap-4">
                  <IconPhone className="mt-1 size-[1.15rem] shrink-0 text-champagne" />
                  <div>
                    <h3 className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ash">
                      {dict.location.phoneLabel}
                    </h3>
                    <a
                      href={`tel:${business.phone.e164}`}
                      className="mt-1 inline-block py-1.5 font-display text-xl font-light text-ivory transition-colors hover:text-champagne"
                    >
                      {business.phone.display}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Actions */}
            <Reveal delay={0.22}>
              <div className="mt-11 grid grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-4">
                <a
                  href={business.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[3.25rem] flex-col items-center justify-center gap-1.5 border border-ivory/15 px-2 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ivory/85 transition-colors duration-500 hover:border-champagne/60 hover:text-ivory"
                >
                  <IconArrowRight className="size-4 text-champagne" />
                  {dict.location.directions}
                </a>
                <a
                  href={`tel:${business.phone.e164}`}
                  className="flex min-h-[3.25rem] flex-col items-center justify-center gap-1.5 border border-ivory/15 px-2 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ivory/85 transition-colors duration-500 hover:border-champagne/60 hover:text-ivory"
                >
                  <IconPhone className="size-4 text-champagne" />
                  {dict.location.call}
                </a>
                <a
                  href={whatsappUrl("Bonjour Ebi Sushi, j'aurais une question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[3.25rem] flex-col items-center justify-center gap-1.5 border border-ivory/15 px-2 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ivory/85 transition-colors duration-500 hover:border-champagne/60 hover:text-ivory"
                >
                  <IconWhatsApp className="size-4 text-champagne" />
                  {dict.location.whatsapp}
                </a>
                <Link
                  href="/reservation"
                  className="flex min-h-[3.25rem] flex-col items-center justify-center gap-1.5 bg-vermilion px-2 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ivory transition-colors duration-500 hover:bg-[#b43023]"
                >
                  <IconClock className="size-4" />
                  {dict.location.reserve}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Carte */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="relative h-[22rem] overflow-hidden border border-ivory/[0.08] sm:h-[28rem] lg:h-full lg:min-h-[32rem]">
              <iframe
                src={business.maps.embed}
                title={dict.location.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="size-full grayscale-[0.85] invert-[0.92] contrast-[1.05] hue-rotate-180"
              />
              {/* Le filtre inverse la carte pour l'accorder au fond sombre ;
                  le voile rétablit un contraste confortable. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/10 mix-blend-multiply"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
