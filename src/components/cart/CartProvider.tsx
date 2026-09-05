"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, OrderMode } from "@/lib/cart-types";
import { useMounted } from "@/lib/hooks";

const STORAGE_KEY = "ebi-sushi:cart:v1";

interface CartState {
  lines: CartLine[];
  mode: OrderMode;
}

type CartAction =
  | { type: "add"; line: Omit<CartLine, "quantity">; quantity: number }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "setNote"; id: string; note: string }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "setMode"; mode: OrderMode };

const initialState: CartState = { lines: [], mode: "delivery" };

/**
 * Relit le panier conservé dans le navigateur. Exécutée une seule fois, à
 * l'initialisation du reducer : côté serveur elle renvoie un panier vide, et
 * l'interface qui dépend du panier n'est affichée qu'une fois `hydrated` vrai
 * — le balisage rendu pendant l'hydratation reste donc identique.
 */
function readStoredCart(): CartState {
  if (typeof window === "undefined") return initialState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;

    const parsed = JSON.parse(raw) as Partial<CartState>;
    if (!Array.isArray(parsed.lines)) return initialState;

    return {
      lines: parsed.lines.filter(
        (l) => l && typeof l.id === "string" && typeof l.price === "number" && l.quantity > 0,
      ),
      mode: parsed.mode === "pickup" ? "pickup" : "delivery",
    };
  } catch {
    // Stockage indisponible (navigation privée) : on repart d'un panier vide.
    return initialState;
  }
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.id === action.line.id);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.id === action.line.id
              ? { ...l, quantity: l.quantity + action.quantity, note: action.line.note || l.note }
              : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, { ...action.line, quantity: action.quantity }] };
    }

    case "setQuantity": {
      if (action.quantity <= 0) {
        return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
      }
      return {
        ...state,
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, quantity: action.quantity } : l)),
      };
    }

    case "setNote":
      return {
        ...state,
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, note: action.note } : l)),
      };

    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };

    case "clear":
      return { ...state, lines: [] };

    case "setMode":
      return { ...state, mode: action.mode };
  }
}

interface CartContextValue extends CartState {
  /** Faux tant que le panier stocké n'a pas été relu — évite un compteur qui saute. */
  hydrated: boolean;
  count: number;
  subtotal: number;
  isOpen: boolean;
  /** Identifiant du dernier article ajouté, pour l'accusé de réception visuel. */
  lastAdded: string | null;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  setNote: (id: string, note: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setMode: (mode: OrderMode) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const hydrated = useMounted();

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Quota ou stockage bloqué : sans conséquence pour la session en cours.
    }
  }, [state, hydrated]);

  const add = useCallback((line: Omit<CartLine, "quantity">, quantity = 1) => {
    dispatch({ type: "add", line, quantity });
    setLastAdded(line.id);
  }, []);

  // Efface l'accusé de réception « Ajouté » au bout de deux secondes.
  useEffect(() => {
    if (!lastAdded) return;
    const timer = setTimeout(() => setLastAdded(null), 2000);
    return () => clearTimeout(timer);
  }, [lastAdded]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = state.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

    return {
      ...state,
      hydrated,
      count,
      subtotal,
      isOpen,
      lastAdded,
      add,
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
      setNote: (id, note) => dispatch({ type: "setNote", id, note }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      setMode: (mode) => dispatch({ type: "setMode", mode }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [state, hydrated, isOpen, lastAdded, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>.");
  return ctx;
}
