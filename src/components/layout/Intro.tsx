"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";

import { dict } from "@/i18n/fr";
import { useScrollLock } from "@/lib/hooks";
import { INTRO_STORAGE_KEY } from "@/lib/intro";

/** Moment où le rideau commence à se lever (ms depuis l'ouverture). */
const CURTAIN_AT = 1400;
/** Sur mobile, l'accès au contenu prime : l'intro est plus brève. */
const CURTAIN_AT_MOBILE = 1050;
/** Durée de la levée du rideau (ms). */
const CURTAIN_DURATION = 800;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

type Phase = "play" | "exit" | "done";

interface IntroContextValue {
  /** Vrai dès que le rideau se lève : les sections peuvent lancer leurs entrées. */
  ready: boolean;
}

const IntroContext = createContext<IntroContextValue>({ ready: true });

/** Vrai si l'intro n'a pas lieu d'être : déjà vue dans la session, ou mouvement réduit. */
function introAlreadySeen(): boolean {
  if (typeof document === "undefined") return false;
  return (
    document.documentElement.getAttribute("data-intro") === "seen" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const PhaseContext = createContext<{ phase: Phase; skip: () => void; markReady: () => void }>({
  phase: "done",
  skip: () => {},
  markReady: () => {},
});

const noopSubscribe = () => () => {};

export function IntroProvider({ children }: { children: ReactNode }) {
  // Pendant l'hydratation, React lit l'instantané serveur (faux) : le premier
  // rendu client est identique au HTML reçu, puis le client masque l'intro
  // déjà vue. Aucune lecture du DOM dans un initialiseur d'état.
  const seen = useSyncExternalStore(noopSubscribe, introAlreadySeen, () => false);
  const [phase, setPhase] = useState<Phase>("play");
  const [readyState, setReady] = useState(false);
  const ready = seen || readyState;

  const markReady = useCallback(() => setReady(true), []);

  const skip = useCallback(() => {
    setPhase((current) => (current === "play" ? "exit" : current));
    setReady(true);
  }, []);

  const value = useMemo(() => ({ ready }), [ready]);
  const phaseValue = useMemo(() => ({ phase, skip, markReady }), [phase, skip, markReady]);

  return (
    <IntroContext.Provider value={value}>
      <PhaseContext.Provider value={phaseValue}>{children}</PhaseContext.Provider>
    </IntroContext.Provider>
  );
}

export function useIntro(): IntroContextValue {
  return useContext(IntroContext);
}

/**
 * Animation d'ouverture : la marque se révèle sur l'encre — les trois lettres
 * montent derrière leur masque, le filet se déploie, « Sushi » s'installe —
 * puis l'écran se lève comme un rideau sur le hero.
 *
 * Jouée une seule fois par session, interrompue d'un clic ou d'une touche,
 * jamais affichée si le système demande moins d'animations. Purement visuelle :
 * masquée aux technologies d'assistance, elle ne retient ni le focus ni le
 * contenu, déjà présent dans la page.
 */
export function IntroOverlay() {
  const { phase, skip, markReady } = useContext(PhaseContext);

  // Pendant l'hydratation React lit l'instantané serveur (faux) : le balisage
  // reste identique à celui du serveur, puis le client masque l'intro déjà vue.
  const seen = useSyncExternalStore(noopSubscribe, introAlreadySeen, () => false);

  // Progression pilotée par minuteries : « play » → « exit » → « done ».
  const [timed, setTimed] = useState<Phase>("play");
  const doneRef = useRef(false);

  // Une seule vérité, dérivée : « done » l'emporte, puis « exit », sinon « play ».
  const effective: Phase =
    seen || phase === "done" || timed === "done"
      ? "done"
      : phase === "exit" || timed === "exit"
        ? "exit"
        : "play";

  useScrollLock(effective !== "done");

  // Déterministe même si les animations sont gelées (onglet en arrière-plan) :
  // le site n'est jamais bloqué derrière l'intro.
  useEffect(() => {
    if (effective !== "play") return;
    const delay = window.matchMedia("(max-width: 767px)").matches ? CURTAIN_AT_MOBILE : CURTAIN_AT;
    const toExit = window.setTimeout(() => {
      markReady();
      setTimed("exit");
    }, delay);
    return () => window.clearTimeout(toExit);
  }, [effective, markReady]);

  useEffect(() => {
    if (effective !== "exit") return;
    const toDone = window.setTimeout(() => setTimed("done"), CURTAIN_DURATION + 60);
    return () => window.clearTimeout(toDone);
  }, [effective]);

  // Mémorise le passage pour la session, une seule fois.
  useEffect(() => {
    if (effective !== "done" || seen || doneRef.current) return;
    doneRef.current = true;
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      document.documentElement.setAttribute("data-intro", "seen");
    } catch {
      // Stockage indisponible : l'intro rejouera, sans autre conséquence.
    }
  }, [effective, seen]);

  // Un clic ou une touche passe l'intro.
  useEffect(() => {
    if (effective !== "play") return;
    const onKey = () => skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [effective, skip]);

  const letters = ["E", "B", "I"];

  return (
    <AnimatePresence>
      {effective !== "done" && (
        <motion.div
          data-intro-overlay
          aria-hidden="true"
          onClick={skip}
          initial={false}
          animate={effective === "exit" ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: CURTAIN_DURATION / 1000, ease: EASE_CURTAIN }}
          className="fixed inset-0 z-[200] flex cursor-pointer select-none flex-col items-center justify-center bg-ink"
        >
          {/* Bord inférieur du rideau : un fin filet champagne, comme une lame. */}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-champagne/40" />

          <motion.div
            className="flex flex-col items-center"
            animate={effective === "exit" ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* E · B · I — chaque lettre monte derrière son propre masque. */}
            <span className="flex overflow-hidden pb-[0.06em] pt-[0.1em] font-display text-[clamp(4.5rem,14vw,8.5rem)] font-light leading-none tracking-[0.22em] text-ivory">
              {letters.map((letter, i) => (
                <motion.span
                  key={letter}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: EASE_OUT }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            {/* Filet et « Sushi » : le lockup du logo, à grande échelle. */}
            <span className="mt-4 flex w-full items-center gap-4">
              <motion.span
                aria-hidden
                className="h-px flex-1 origin-right bg-champagne/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.75, ease: EASE_OUT }}
              />
              <motion.span
                className="font-sans text-[0.7rem] font-medium uppercase text-champagne sm:text-xs"
                initial={{ opacity: 0, letterSpacing: "0.9em" }}
                animate={{ opacity: 1, letterSpacing: "0.45em" }}
                transition={{ duration: 1, delay: 0.85, ease: EASE_OUT }}
              >
                Sushi
              </motion.span>
              <motion.span
                aria-hidden
                className="h-px flex-1 origin-left bg-champagne/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.75, ease: EASE_OUT }}
              />
            </span>

            <motion.span
              className="mt-6 font-sans text-[0.5625rem] uppercase tracking-[0.3em] text-ash/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
            >
              {dict.hero.eyebrow}
            </motion.span>
          </motion.div>

          <motion.span
            className="absolute bottom-8 font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-ash"
            initial={{ opacity: 0 }}
            animate={{ opacity: effective === "exit" ? 0 : 1 }}
            transition={{ duration: 0.6, delay: effective === "exit" ? 0 : 1.2 }}
          >
            {dict.intro.skip}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
