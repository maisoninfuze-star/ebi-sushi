"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { TextField, TextAreaField } from "@/components/ui/Field";
import { IconClose, IconArrowLeft, IconCheck, IconWhatsApp, IconCart } from "@/components/ui/Icons";
import { dict } from "@/i18n/fr";
import { business } from "@/config/business";
import { formatPrice } from "@/lib/format";
import { isPlausiblePhone } from "@/lib/format";
import { buildOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { useFocusTrap } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

type Step = "cart" | "checkout" | "sent";
type Errors = Partial<Record<"name" | "phone" | "address", string>>;

export function CartDrawer() {
  const cart = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  useScrollLock(cart.isOpen);
  useEscapeKey(cart.isOpen, cart.closeCart);
  useFocusTrap(cart.isOpen, panelRef);

  const close = () => {
    cart.closeCart();
    // Laisse l'animation de sortie se terminer avant de réinitialiser la vue.
    setTimeout(() => {
      setStep("cart");
      setErrors({});
      setFailed(false);
    }, 400);
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = dict.cart.validation.name;
    if (!form.phone.trim()) next.phone = dict.cart.validation.phone;
    else if (!isPlausiblePhone(form.phone)) next.phone = dict.cart.validation.phoneInvalid;
    if (cart.mode === "delivery" && form.address.trim().length < 5) {
      next.address = dict.cart.validation.address;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setFailed(false);

    const message = buildOrderMessage(
      cart.lines,
      {
        mode: cart.mode,
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim() || undefined,
        note: form.note.trim() || undefined,
      },
      cart.subtotal,
    );

    const opened = openWhatsApp(message);
    setSubmitting(false);

    // Aucune confirmation affichée si la fenêtre n'a pas pu s'ouvrir :
    // la commande n'est pas partie, l'interface ne doit pas prétendre le contraire.
    if (opened) setStep("sent");
    else setFailed(true);
  };

  const isEmpty = cart.lines.length === 0;

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-ink/75 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={dict.cart.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-[28rem] flex-col border-l border-ivory/10 bg-charcoal"
          >
            {/* En-tête */}
            <header className="flex shrink-0 items-center justify-between border-b border-ivory/[0.08] px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    aria-label={dict.cart.back}
                    className="-ml-2 flex size-9 items-center justify-center text-ivory/70 hover:text-ivory"
                  >
                    <IconArrowLeft className="size-4" />
                  </button>
                )}
                <h2 className="font-display text-2xl font-light text-ivory">
                  {step === "sent" ? dict.cart.sent.title : dict.cart.title}
                </h2>
                {step === "cart" && !isEmpty && (
                  <span className="font-sans text-xs text-ash">
                    {dict.cart.itemCount(cart.count)}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={close}
                aria-label={dict.cart.close}
                className="-mr-2 flex size-11 items-center justify-center text-ivory/70 transition-colors hover:text-ivory"
              >
                <IconClose className="size-5" />
              </button>
            </header>

            {/* ── Panier vide ──────────────────────────────────────────────── */}
            {step === "cart" && isEmpty && (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <IconCart className="size-9 text-ivory/20" />
                <div>
                  <p className="font-display text-2xl font-light text-ivory">
                    {dict.cart.empty.title}
                  </p>
                  <p className="mt-2 font-sans text-sm text-ash">{dict.cart.empty.text}</p>
                </div>
                <Link
                  href="/menu"
                  onClick={close}
                  className="mt-2 inline-flex min-h-12 items-center bg-vermilion px-7 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-[#c33f32]"
                >
                  {dict.cart.empty.cta}
                </Link>
              </div>
            )}

            {/* ── Liste des articles ───────────────────────────────────────── */}
            {step === "cart" && !isEmpty && (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7">
                  <ul className="divide-y divide-ivory/[0.07]">
                    {cart.lines.map((line) => (
                      <li key={line.id} className="flex gap-4 py-5">
                        {line.image && (
                          <OptimizedImage
                            src={line.image}
                            alt={line.name}
                            width={80}
                            height={80}
                            sizes="80px"
                            wrapperClassName="size-20 shrink-0"
                            className="size-full object-cover"
                          />
                        )}

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-sans text-sm font-medium text-ivory">{line.name}</p>
                              {line.pieces && (
                                <p className="mt-0.5 font-sans text-xs text-ash">
                                  {dict.menu.pieces(line.pieces)}
                                </p>
                              )}
                            </div>
                            <p className="shrink-0 font-sans text-sm font-semibold tabular-nums text-ivory">
                              {formatPrice(line.price * line.quantity)}
                            </p>
                          </div>

                          {line.note && (
                            <p className="mt-1.5 font-sans text-xs italic text-champagne/80">
                              {line.note}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <QuantityStepper
                              size="sm"
                              value={line.quantity}
                              label={line.name}
                              onChange={(q) => cart.setQuantity(line.id, q)}
                            />
                            <button
                              type="button"
                              onClick={() => cart.remove(line.id)}
                              className="inline-flex min-h-10 items-center font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-ash transition-colors hover:text-salmon"
                            >
                              {dict.cart.remove}
                              <span className="sr-only"> {line.name}</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={cart.clear}
                    className="my-4 inline-flex min-h-10 items-center font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-ash/60 transition-colors hover:text-salmon"
                  >
                    {dict.cart.clear}
                  </button>
                </div>

                <footer className="shrink-0 border-t border-ivory/[0.08] px-5 py-5 pb-safe sm:px-7">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
                      {dict.cart.subtotal}
                    </span>
                    <span className="font-display text-3xl font-light tabular-nums text-ivory">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>
                  <p className="mt-1.5 font-sans text-xs text-ash/70">{dict.cart.subtotalNote}</p>

                  <button
                    type="button"
                    onClick={() => setStep("checkout")}
                    className="mt-5 flex min-h-14 w-full items-center justify-center bg-vermilion font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-[#c33f32]"
                  >
                    {dict.cart.checkout}
                  </button>
                </footer>
              </>
            )}

            {/* ── Coordonnées et envoi ─────────────────────────────────────── */}
            {step === "checkout" && (
              <form onSubmit={submit} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-7 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7">
                  {/* Mode de commande */}
                  <fieldset>
                    <legend className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ash">
                      {dict.cart.mode.label}
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(["delivery", "pickup"] as const).map((mode) => {
                        const active = cart.mode === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => cart.setMode(mode)}
                            aria-pressed={active}
                            className={cn(
                              "flex min-h-12 items-center justify-center gap-2 border font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                              active
                                ? "border-champagne bg-champagne/10 text-ivory"
                                : "border-ivory/15 text-ash hover:border-ivory/35 hover:text-ivory",
                            )}
                          >
                            {/* La coche évite de ne signaler la sélection que par la couleur. */}
                            {active && <IconCheck className="size-3.5 text-champagne" />}
                            {mode === "delivery" ? dict.cart.mode.delivery : dict.cart.mode.pickup}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <TextField
                    label={dict.cart.fields.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    autoComplete="name"
                    required
                  />

                  <TextField
                    label={dict.cart.fields.phone}
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    error={errors.phone}
                    autoComplete="tel"
                    required
                  />

                  {cart.mode === "delivery" && (
                    <TextAreaField
                      label={dict.cart.fields.address}
                      placeholder={dict.cart.fields.addressPlaceholder}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      error={errors.address}
                      autoComplete="street-address"
                      required
                    />
                  )}

                  <TextAreaField
                    label={dict.cart.fields.note}
                    placeholder={dict.cart.fields.notePlaceholder}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    optional
                  />

                  {failed && (
                    <p role="alert" className="font-sans text-sm text-salmon">
                      {dict.reservation.form.error.text}
                    </p>
                  )}
                </div>

                <footer className="shrink-0 border-t border-ivory/[0.08] px-5 py-5 pb-safe sm:px-7">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
                      {dict.cart.subtotal}
                    </span>
                    <span className="font-display text-3xl font-light tabular-nums text-ivory">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 flex min-h-14 w-full items-center justify-center gap-2.5 bg-vermilion font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-[#c33f32] disabled:opacity-60"
                  >
                    <IconWhatsApp className="size-4" />
                    {submitting ? dict.cart.sending : dict.cart.send}
                  </button>

                  <p className="mt-3 font-sans text-[0.6875rem] leading-relaxed text-ash/70">
                    {dict.cart.disclaimer}
                  </p>
                </footer>
              </form>
            )}

            {/* ── Confirmation d'envoi ─────────────────────────────────────── */}
            {step === "sent" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-champagne/40">
                  <IconCheck className="size-6 text-champagne" />
                </span>
                <div>
                  <p className="font-display text-3xl font-light text-ivory">
                    {dict.cart.sent.title}
                  </p>
                  <p className="mx-auto mt-3 max-w-[34ch] font-sans text-sm leading-relaxed text-ash">
                    {dict.cart.sent.text}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href={`tel:${business.phone.e164}`}
                    className="inline-flex min-h-11 items-center font-sans text-sm text-champagne underline underline-offset-4"
                  >
                    {business.phone.display}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      cart.clear();
                      close();
                    }}
                    className="mt-2 inline-flex min-h-12 items-center border border-ivory/25 px-7 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory/60"
                  >
                    {dict.cart.sent.newOrder}
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
