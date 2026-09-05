import { business } from "@/config/business";

/** « 129 DH » — espace insécable fine avant l'unité, comme en typographie française. */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const body = Number.isInteger(rounded)
    ? rounded.toLocaleString("fr-FR")
    : rounded.toLocaleString("fr-FR", { minimumFractionDigits: 2 });
  return `${body} ${business.currency.suffix}`;
}

/** Version sans espace insécable, pour les messages WhatsApp. */
export function formatPricePlain(amount: number): string {
  return `${Math.round(amount * 100) / 100} ${business.currency.suffix}`;
}

/** « 12h00 » à partir de « 12:00 ». */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m}`;
}

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Date du jour au format « YYYY-MM-DD », utilisée comme minimum du calendrier. */
export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** Un numéro est jugé exploitable dès 9 chiffres (formats marocains et internationaux). */
export function isPlausiblePhone(value: string): boolean {
  return (value.match(/\d/g) ?? []).length >= 9;
}
