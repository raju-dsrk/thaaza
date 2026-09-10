import type { CategoryId, Product } from "./types";

/** Keys that map products → editable amounts in public/prices.json */
export type PriceKey =
  | "goatCurryPerKg"
  | "goatBiryaniPerKg"
  | "goatBonelessPerKg"
  | "goatKeemaPerKg"
  | "goatPayaPerKg"
  | "sheepCurryPerKg"
  | "sheepBiryaniPerKg"
  | "sheepBonelessPerKg"
  | "sheepKeemaPerKg"
  | "sheepPayaPerKg"
  | "boilerCurryPerKg"
  | "boilerBiryaniPerKg"
  | "boilerBonelessPerKg"
  | "boilerBreastPerKg"
  | "boilerLegPerKg"
  | "boilerWingsPerKg"
  | "countryCurryPerKg"
  | "countryBonelessPerKg"
  | "fishPerKg"
  | "prawnsLargePerKg"
  | "prawnsMediumPerKg"
  | "prawnsSmallPerKg"
  | "whiteEggs6"
  | "whiteEggs12"
  | "whiteEggs30"
  | "brownEggs6"
  | "brownEggs12"
  | "brownEggs30";

export type Prices = {
  currency: string;
} & Record<PriceKey, number>;

/** Fallback if /prices.json fails to load (same numbers as the JSON file). */
export const DEFAULT_PRICES: Prices = {
  currency: "INR",
  goatCurryPerKg: 999,
  goatBiryaniPerKg: 999,
  goatBonelessPerKg: 1099,
  goatKeemaPerKg: 999,
  goatPayaPerKg: 799,
  sheepCurryPerKg: 900,
  sheepBiryaniPerKg: 900,
  sheepBonelessPerKg: 999,
  sheepKeemaPerKg: 900,
  sheepPayaPerKg: 749,
  boilerCurryPerKg: 250,
  boilerBiryaniPerKg: 250,
  boilerBonelessPerKg: 280,
  boilerBreastPerKg: 280,
  boilerLegPerKg: 260,
  boilerWingsPerKg: 220,
  countryCurryPerKg: 400,
  countryBonelessPerKg: 450,
  fishPerKg: 280,
  prawnsLargePerKg: 380,
  prawnsMediumPerKg: 320,
  prawnsSmallPerKg: 280,
  whiteEggs6: 30,
  whiteEggs12: 58,
  whiteEggs30: 140,
  brownEggs6: 42,
  brownEggs12: 80,
  brownEggs30: 190,
};

export function getUnitPrice(prices: Prices, key: string): number {
  const value = prices[key as PriceKey];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function eggPackPrice(prices: Prices, categoryId: CategoryId, qty: number): number {
  const white = categoryId === "white-eggs";
  if (qty === 6) return getUnitPrice(prices, white ? "whiteEggs6" : "brownEggs6");
  if (qty === 12) return getUnitPrice(prices, white ? "whiteEggs12" : "brownEggs12");
  if (qty === 30) return getUnitPrice(prices, white ? "whiteEggs30" : "brownEggs30");
  const perEgg = getUnitPrice(prices, white ? "whiteEggs6" : "brownEggs6") / 6;
  return Math.round(perEgg * qty);
}

/**
 * Line total for cart / checkout.
 * kg: round(perKg * qtyKg); eggs: pack prices for 6/12/30 else per-egg from pack6.
 */
export function lineTotal(
  prices: Prices,
  product: Pick<Product, "priceKey" | "unit" | "categoryId">,
  qty: number
): number {
  if (product.unit === "eggs") {
    return eggPackPrice(prices, product.categoryId, qty);
  }
  const unit = getUnitPrice(prices, product.priceKey);
  return Math.round(unit * qty);
}

export function isPriceKey(key: string): key is PriceKey {
  return key in DEFAULT_PRICES && key !== "currency";
}
