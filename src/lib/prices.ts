import type { CategoryId, Product } from "./types";

/** Keys that map products → editable amounts in public/prices.json */
export type PriceKey =
  | "goatCurryPerKg"
  | "goatBonelessPerKg"
  | "goatKeemaPerKg"
  | "goatPayaPerKg"
  | "sheepCurryPerKg"
  | "sheepBonelessPerKg"
  | "sheepKeemaPerKg"
  | "sheepPayaPerKg"
  | "broilerCurryPerKg"
  | "broilerBiryaniPerKg"
  | "broilerBonelessPerKg"
  | "broilerBreastPerKg"
  | "broilerLegPerKg"
  | "broilerWingsPerKg"
  | "countryCurryPerKg"
  | "countryBonelessPerKg"
  | "fishPerKg"
  | "prawnsLargePerKg"
  | "prawnsMediumPerKg"
  | "prawnsSmallPerKg"
  | "whiteEggs6"
  | "whiteEggs12"
  | "whiteEggs30"
  | "whiteEggsPerEgg"
  | "brownEggs6"
  | "brownEggs12"
  | "brownEggs30"
  | "brownEggsPerEgg";

export type Prices = {
  currency: string;
} & Record<PriceKey, number>;

/** Fallback if /prices.json fails to load (same numbers as the JSON file). */
export const DEFAULT_PRICES: Prices = {
  currency: "INR",
  goatCurryPerKg: 999,
  goatBonelessPerKg: 1099,
  goatKeemaPerKg: 999,
  goatPayaPerKg: 799,
  sheepCurryPerKg: 900,
  sheepBonelessPerKg: 999,
  sheepKeemaPerKg: 900,
  sheepPayaPerKg: 749,
  broilerCurryPerKg: 250,
  broilerBiryaniPerKg: 250,
  broilerBonelessPerKg: 280,
  broilerBreastPerKg: 280,
  broilerLegPerKg: 260,
  broilerWingsPerKg: 220,
  countryCurryPerKg: 400,
  countryBonelessPerKg: 450,
  fishPerKg: 280,
  prawnsLargePerKg: 380,
  prawnsMediumPerKg: 320,
  prawnsSmallPerKg: 280,
  whiteEggs6: 30,
  whiteEggs12: 58,
  whiteEggs30: 140,
  whiteEggsPerEgg: 5,
  brownEggs6: 42,
  brownEggs12: 80,
  brownEggs30: 190,
  brownEggsPerEgg: 7,
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
  const dedicated = getUnitPrice(
    prices,
    white ? "whiteEggsPerEgg" : "brownEggsPerEgg"
  );
  const perEgg =
    dedicated > 0
      ? dedicated
      : getUnitPrice(prices, white ? "whiteEggs6" : "brownEggs6") / 6;
  return Math.round(perEgg * qty);
}

/**
 * Line total for cart / checkout.
 * kg: round(perKg * qtyKg); eggs: pack prices for 6/12/30 else per-egg rate.
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
