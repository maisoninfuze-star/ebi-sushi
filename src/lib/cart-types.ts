export interface CartLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
  pieces?: number;
  note?: string;
  image?: string;
  category: string;
}

export type OrderMode = "delivery" | "pickup";
