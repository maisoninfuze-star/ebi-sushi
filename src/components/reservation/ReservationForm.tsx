"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { TextField, TextAreaField, SelectField } from "@/components/ui/Field";
import { IconCheck, IconWhatsApp, IconPhone } from "@/components/ui/Icons";
import { business } from "@/config/business";
import { dict } from "@/i18n/fr";
import { isPlausiblePhone, todayIso } from "@/lib/format";
import { buildReservationMessage, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "date" | "time" | "consent", string>>;

const f = dict.reservation.form;

/**
 * Créneaux dérivés des horaires d'ouverture : si le restaurant change ses
 * horaires dans la configuration, les créneaux suivent automatiquement.
 * Le dernier créneau proposé s'arrête une heure avant la fermeture.
 */
function useTimeSlots(): string[] {
  return useMemo(() => {
    const periods = business.hours.schedule.samedi;
    const slots: string[] = [];

    for (const period of periods) {
      const [openH, openM] = period.open.split(":").map(Number);
      const [closeH] = period.close.split(":").map(Number);
      // Minuit est écrit « 00:00 » : on le ramène à 24 pour comparer.
      const endHour = (closeH === 0 ? 24 : closeH) - 1;

      for (let minutes = openH * 60 + openM; minutes <= endHour * 60; minutes += 30) {
        const h = Math.floor(minutes / 60) % 24;
        const m = minutes % 60;
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }

    return slots;
  }, []);
}

export function ReservationForm({ compact = false }: { compact?: boolean }) {
  const slots = useTimeSlots();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    guests: "2",
    date: "",
    time: slots[Math.floor(slots.length / 2)] ?? "20:00",
    name: "",
    phone: "",
    occasion: "",
    note: "",
    consent: false,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // L'erreur disparaît dès que le champ est corrigé, sans attendre l'envoi.
    if (errors[key as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Errors = {};

    if (!form.name.trim()) next.name = f.validation.name;
    else if (form.name.trim().length < 2) next.name = f.validation.nameShort;

    if (!form.phone.trim()) next.phone = f.validation.phone;
    else if (!isPlausiblePhone(form.phone)) next.phone = f.validation.phoneInvalid;

    if (!form.date) next.date = f.validation.date;
    else if (form.date < todayIso()) next.date = f.validation.datePast;

    if (!form.time) next.time = f.validation.time;
    if (!form.consent) next.consent = f.validation.consent;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const message = buildReservationMessage({
      guests: form.guests,
      date: form.date,
      time: form.time,
      name: form.name.trim(),
      phone: form.phone.trim(),
      occasion: form.occasion.trim() || undefined,
      note: form.note.trim() || undefined,
    });

    const opened = openWhatsApp(message);
    // Sans fenêtre ouverte, la demande n'est pas partie : on l'annonce.
    setStatus(opened ? "success" : "error");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-6 border border-champagne/25 bg-charcoal px-7 py-14 text-center"
        role="status"
      >
        <span className="flex size-14 items-center justify-center rounded-full border border-champagne/40">
          <IconCheck className="size-6 text-champagne" />
        </span>

        <div>
          <h3 className="font-display text-3xl font-light text-ivory">{f.success.title}</h3>
          <p className="mx-auto mt-3 max-w-[42ch] font-sans text-sm leading-relaxed text-ash">
            {f.success.text}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setForm((prev) => ({ ...prev, name: "", phone: "", occasion: "", note: "", consent: false }));
            }}
            className="inline-flex min-h-12 items-center border border-ivory/25 px-7 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory/60"
          >
            {f.success.again}
          </button>
          <a
            href={`tel:${business.phone.e164}`}
            className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-champagne underline underline-offset-4"
          >
            <IconPhone className="size-4" />
            {business.phone.display}
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-8">
      {/* Convives · date · heure */}
      <div className={cn("grid gap-7", compact ? "sm:grid-cols-3" : "sm:grid-cols-3")}>
        <SelectField
          label={f.guests}
          value={form.guests}
          onChange={(e) => set("guests", e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={String(n)}>
              {f.guestUnit(n)}
            </option>
          ))}
          <option value={f.guestMore}>{f.guestMore}</option>
        </SelectField>

        <TextField
          label={f.date}
          type="date"
          value={form.date}
          min={todayIso()}
          onChange={(e) => set("date", e.target.value)}
          error={errors.date}
          required
        />

        <SelectField
          label={f.time}
          value={form.time}
          onChange={(e) => set("time", e.target.value)}
          error={errors.time}
        >
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot.replace(":", "h")}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Coordonnées */}
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField
          label={f.name}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
          required
        />
        <TextField
          label={f.phone}
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
          autoComplete="tel"
          required
        />
      </div>

      <TextField
        label={f.occasion}
        placeholder={f.occasionPlaceholder}
        value={form.occasion}
        onChange={(e) => set("occasion", e.target.value)}
        optional
      />

      <TextAreaField
        label={f.note}
        placeholder={f.notePlaceholder}
        value={form.note}
        onChange={(e) => set("note", e.target.value)}
        optional
      />

      {/* Consentement */}
      <div>
        <label className="flex cursor-pointer items-start gap-3.5">
          <span className="relative flex size-6 shrink-0 items-center justify-center border border-ivory/30 transition-colors has-checked:border-champagne">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="peer absolute inset-0 cursor-pointer opacity-0"
              required
            />
            <IconCheck className="size-4 text-champagne opacity-0 transition-opacity peer-checked:opacity-100" />
          </span>
          <span className="font-sans text-[0.8125rem] leading-relaxed text-ash">{f.consent}</span>
        </label>

        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-2 font-sans text-xs text-salmon">
            {errors.consent}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="border border-vermilion/40 bg-vermilion/[0.07] p-5"
          >
            <p className="font-sans text-sm font-medium text-ivory">{f.error.title}</p>
            <p className="mt-1.5 font-sans text-[0.8125rem] leading-relaxed text-ash">
              {f.error.text}
            </p>
            <a
              href={`tel:${business.phone.e164}`}
              className="mt-2 inline-flex min-h-11 items-center gap-2 font-sans text-sm text-champagne underline underline-offset-4"
            >
              <IconPhone className="size-4" />
              {business.phone.display}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex min-h-14 w-full items-center justify-center gap-2.5 bg-vermilion font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-[#c33f32] disabled:opacity-60 sm:w-auto sm:px-12"
        >
          <IconWhatsApp className="size-4" />
          {status === "submitting" ? f.submitting : f.submit}
        </button>

        <p className="mt-4 max-w-[52ch] font-sans text-xs leading-relaxed text-ash/70">
          {f.disclaimer}
        </p>
      </div>
    </form>
  );
}
