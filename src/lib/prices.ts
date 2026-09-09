import type { Product } from "./types";

/** Keys that map products → editable amounts in public/prices.json */
export type PriceKey =
  | "goatPerKg"
  | "sheepPerKg"
  | "chickenPerKg"
  | "countryChickenPerKg"
  | "whiteEggsPack6"
  | "whiteEggsTray30"
  | "brownEggsTray"
  | "fishPerKg"
  | "prawnsPerKg";

export type Prices = {
  currency: string;
} & Record<PriceKey, number>;

/** Fallback if /prices.json fails to load (same numbers as the JSON file). */
export const DEFAULT_PRICES: Prices = {
  currency: "INR",
  goatPerKg: 999,
  sheepPerKg: 900,
  chickenPerKg: 250,
  countryChickenPerKg: 400,
  whiteEggsPack6: 30,
  whiteEggsTray30: 210,
  brownEggsTray: 300,
  fishPerKg: 280,
  prawnsPerKg: 320,
};

export function getUnitPrice(prices: Prices, key: string): number {
  const value = prices[key as PriceKey];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

/**
 * Line total for cart / checkout.
 * kg: round(perKg * qtyKg); pack/tray/piece: round(unitPrice * qty).
 */
export function lineTotal(
  prices: Prices,
  product: Pick<Product, "priceKey" | "unit">,
  qty: number
): number {
  const unit = getUnitPrice(prices, product.priceKey);
  return Math.round(unit * qty);
}

export function isPriceKey(key: string): key is PriceKey {
  return key in DEFAULT_PRICES && key !== "currency";
}
