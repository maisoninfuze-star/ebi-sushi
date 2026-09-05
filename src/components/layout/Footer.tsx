import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { IconInstagram, IconFacebook, IconPhone, IconPin, IconClock } from "@/components/ui/Icons";
import { business } from "@/config/business";
import { footerNav } from "@/config/site";
import { dict } from "@/i18n/fr";
import { formatTime } from "@/lib/format";

const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"] as const;

/** Regroupe les jours consécutifs partageant le même horaire. */
function groupedHours() {
  const groups: { days: string[]; label: string }[] = [];

  for (const day of DAYS) {
    const periods = business.hours.schedule[day];
    const label = periods.map((p) => `${formatTime(p.open)} – ${formatTime(p.close)}`).join(", ");
    const last = groups.at(-1);
    if (last && last.label === label) last.days.push(day);
    else groups.push({ days: [day], label });
  }

  return groups.map((g) => ({
    label: g.label,
    days:
      g.days.length === 1
        ? g.days[0]
        : g.days.length === 7
          ? "Tous les jours"
          : `${g.days[0]} – ${g.days.at(-1)}`,
  }));
}

export function Footer() {
  const year = new Date().getFullYear();
  const hours = groupedHours();

  return (
    <footer className="relative border-t border-ivory/[0.08] bg-charcoal">
      <div className="container-page py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Marque */}
          <div className="lg:col-span-4">
            <Logo size="lg" className="items-start" />
            <p className="mt-8 max-w-[38ch] font-sans text-sm leading-[1.8] text-ash">
              {dict.footer.statement}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ebi Sushi sur Instagram (${business.social.instagramHandle})`}
                className="flex size-11 items-center justify-center border border-ivory/12 text-ivory/60 transition-colors duration-300 hover:border-champagne/50 hover:text-champagne"
              >
                <IconInstagram className="size-[1.15rem]" />
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ebi Sushi sur Facebook"
                className="flex size-11 items-center justify-center border border-ivory/12 text-ivory/60 transition-colors duration-300 hover:border-champagne/50 hover:text-champagne"
              >
                <IconFacebook className="size-[1.15rem]" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Pied de page" className="lg:col-span-2">
            <h2 className="eyebrow">{dict.footer.explore}</h2>
            <ul className="mt-6 space-y-3.5">
              {footerNav.explorer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 font-sans text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow">{dict.footer.services}</h2>
            <ul className="mt-6 space-y-3.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 font-sans text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div className="lg:col-span-4">
            <h2 className="eyebrow">{dict.footer.contact}</h2>

            <address className="mt-6 space-y-5 not-italic">
              <div className="flex gap-3.5">
                <IconPin className="mt-0.5 size-4 shrink-0 text-champagne" />
                <a
                  href={business.maps.place}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block max-w-[30ch] py-1 font-sans text-sm leading-relaxed text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  {business.address.full}
                </a>
              </div>

              <div className="flex gap-3.5">
                <IconPhone className="mt-0.5 size-4 shrink-0 text-champagne" />
                <a
                  href={`tel:${business.phone.e164}`}
                  className="inline-block py-1 font-sans text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  {business.phone.display}
                </a>
              </div>

              <div className="flex gap-3.5">
                <IconClock className="mt-0.5 size-4 shrink-0 text-champagne" />
                <div className="space-y-1">
                  {hours.map((group) => (
                    <p key={group.days} className="font-sans text-sm text-ivory/70">
                      <span className="capitalize">{group.days}</span>
                      <span className="mx-2 text-ivory/25">·</span>
                      <span>{group.label}</span>
                    </p>
                  ))}
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-16 flex flex-col gap-5 border-t border-ivory/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-ash/70">
            © {year} {business.name}. {dict.footer.rights}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-block py-1 font-sans text-xs text-ash/70 transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
            <span className="font-sans text-xs text-ash/40">{business.credit.label}</span>
          </div>
        </div>
      </div>

      {/* Dégage la barre d'action mobile fixée en bas d'écran. */}
      <div aria-hidden className="h-safe-bar lg:hidden" />
    </footer>
  );
}
