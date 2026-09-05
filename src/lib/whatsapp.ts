import { business } from "@/config/business";
import { formatDateFr, formatPricePlain } from "@/lib/format";
import type { CartLine } from "@/lib/cart-types";

/**
 * Passerelle de commande.
 *
 * Aucun prestataire de paiement n'est configuré : le site ne simule donc aucun
 * paiement en ligne. Les commandes et demandes de réservation partent vers le
 * WhatsApp du restaurant sous forme de message structuré, prêt à être confirmé.
 *
 * Pour brancher plus tard une vraie caisse ou un prestataire de livraison,
 * il suffit de remplacer l'implémentation de `submitOrder` : le reste de
 * l'interface est déjà indépendant du canal utilisé.
 */

const WA_BASE = "https://wa.me";

export function whatsappUrl(message: string): string {
  return `${WA_BASE}/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export interface OrderDetails {
  mode: "delivery" | "pickup";
  name: string;
  phone: string;
  address?: string;
  note?: string;
}

export function buildOrderMessage(lines: CartLine[], details: OrderDetails, subtotal: number): string {
  const parts: string[] = [];

  parts.push("Bonjour Ebi Sushi, je souhaite passer une commande.");
  parts.push("");
  parts.push(details.mode === "delivery" ? "🛵 LIVRAISON" : "🥡 À EMPORTER");
  parts.push("");
  parts.push("— MA COMMANDE —");

  for (const line of lines) {
    const pieces = line.pieces ? ` (${line.pieces} pcs)` : "";
    parts.push(`• ${line.quantity} × ${line.name}${pieces} — ${formatPricePlain(line.price * line.quantity)}`);
    if (line.note) parts.push(`   ↳ ${line.note}`);
  }

  parts.push("");
  parts.push(`Sous-total : ${formatPricePlain(subtotal)}`);
  parts.push("");
  parts.push("— MES COORDONNÉES —");
  parts.push(`Nom : ${details.name}`);
  parts.push(`Téléphone : ${details.phone}`);
  if (details.mode === "delivery" && details.address) {
    parts.push(`Adresse : ${details.address}`);
  }
  if (details.note) {
    parts.push(`Note : ${details.note}`);
  }
  parts.push("");
  parts.push("Merci de me confirmer la disponibilité et le délai.");

  return parts.join("\n");
}

export interface ReservationDetails {
  guests: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  occasion?: string;
  note?: string;
}

export function buildReservationMessage(details: ReservationDetails): string {
  const parts: string[] = [];

  parts.push("Bonjour Ebi Sushi, je souhaite réserver une table.");
  parts.push("");
  parts.push("— MA DEMANDE —");
  parts.push(`Convives : ${details.guests}`);
  parts.push(`Date : ${formatDateFr(details.date)}`);
  parts.push(`Heure : ${details.time.replace(":", "h")}`);
  if (details.occasion) parts.push(`Occasion : ${details.occasion}`);
  parts.push("");
  parts.push("— MES COORDONNÉES —");
  parts.push(`Nom : ${details.name}`);
  parts.push(`Téléphone : ${details.phone}`);
  if (details.note) parts.push(`Message : ${details.note}`);
  parts.push("");
  parts.push("Merci de me confirmer la disponibilité.");

  return parts.join("\n");
}

/**
 * Ouvre la conversation WhatsApp pré-remplie.
 * Renvoie false si le navigateur a bloqué l'ouverture, pour que l'interface
 * puisse afficher un état d'échec honnête plutôt qu'une fausse confirmation.
 */
export function openWhatsApp(message: string): boolean {
  const win = window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  return Boolean(win);
}
