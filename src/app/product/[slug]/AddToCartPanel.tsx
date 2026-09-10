"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatINR, formatQty } from "@/lib/format";
import { getEggProductId } from "@/lib/data";
import { useCart } from "@/store/cart";
import { usePrices, useProductUnitPrice } from "@/components/PricesProvider";
import { getUnitPrice, lineTotal as calcLineTotal } from "@/lib/prices";

const WEIGHT_PRESETS = [
  { label: "1 kg", grams: 1000 },
  { label: "500 g", grams: 500 },
  { label: "250 g", grams: 250 },
] as const;

const EGG_PRESETS = [6, 12, 30] as const;

function weightPrice(pricePerKg: number, grams: number) {
  return Math.round((grams / 1000) * pricePerKg);
}

export function AddToCartPanel({ product }: { product: Product }) {
  const isKg = product.unit === "kg";
  const isEggs = product.unit === "eggs";
  const [presetGrams, setPresetGrams] = useState<number | "custom">(1000);
  const [customGrams, setCustomGrams] = useState(250);
  const [eggPreset, setEggPreset] = useState<number | "custom">(
    product.minQty || 6
  );
  const [customEggs, setCustomEggs] = useState(6);
  const addItem = useCart((s) => s.addItem);
  const inCart = useCart((s) => s.items.find((i) => i.productId === product.id));
  const unitPrice = useProductUnitPrice(product);
  const prices = usePrices();

  const selectedGrams =
    presetGrams === "custom" ? customGrams : presetGrams;
  const qtyKg = useMemo(
    () => Math.round(selectedGrams) / 1000,
    [selectedGrams]
  );
  const pricePreview = useMemo(
    () => weightPrice(unitPrice, Math.round(selectedGrams)),
    [unitPrice, selectedGrams]
  );
  const customOk = selectedGrams >= 100;

  const eggCount = eggPreset === "custom" ? customEggs : eggPreset;
  const eggCategory =
    product.categoryId === "brown-eggs" ? "brown-eggs" : "white-eggs";
  const eggTotal = calcLineTotal(
    prices,
    { ...product, categoryId: eggCategory, unit: "eggs" },
    eggCount
  );
  const eggOk = eggCount >= 1;

  if (isEggs) {
    return (
      <div className="mt-8 w-full rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-medium text-charcoal">Select egg count</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {EGG_PRESETS.map((n) => {
            const active = eggPreset === n;
            const key =
              eggCategory === "white-eggs"
                ? n === 6
                  ? "whiteEggs6"
                  : n === 12
                    ? "whiteEggs12"
                    : "whiteEggs30"
                : n === 6
                  ? "brownEggs6"
                  : n === 12
                    ? "brownEggs12"
                    : "brownEggs30";
            return (
              <button
                key={n}
                type="button"
                onClick={() => setEggPreset(n)}
                className={`rounded-xl border px-2 py-3 text-center text-sm font-medium transition ${
                  active
                    ? "border-burgundy bg-burgundy text-cream"
                    : "border-border bg-cream text-charcoal hover:border-burgundy/40"
                }`}
              >
                <span className="block">{n} eggs</span>
                <span
                  className={`mt-0.5 block text-xs tabular-nums ${
                    active ? "text-cream/90" : "text-muted"
                  }`}
                >
                  {formatINR(getUnitPrice(prices, key))}
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setEggPreset("custom")}
          className={`mt-2 w-full rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
            eggPreset === "custom"
              ? "border-burgundy bg-burgundy/5 text-burgundy"
              : "border-border bg-cream text-charcoal hover:border-burgundy/40"
          }`}
        >
          Custom count…
        </button>
        {eggPreset === "custom" && (
          <div className="mt-3 space-y-2">
            <label className="block text-xs font-medium text-muted">
              Egg count (min 1)
            </label>
            <input
              type="number"
              min={1}
              step={1}
              value={customEggs}
              onChange={(e) => setCustomEggs(Number(e.target.value) || 0)}
              className="h-12 w-full rounded-xl border border-border bg-cream px-3 text-base tabular-nums outline-none focus:border-burgundy"
            />
          </div>
        )}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">{formatQty(eggCount, "eggs")}</span>
          <span className="text-lg font-bold tabular-nums text-burgundy">
            {formatINR(eggTotal)}
          </span>
        </div>
        <button
          type="button"
          disabled={!eggOk}
          onClick={() =>
            addItem(getEggProductId(eggCategory, eggCount), eggCount)
          }
          className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-burgundy text-base font-semibold text-cream hover:bg-burgundy-dark active:scale-[0.99] disabled:opacity-40"
        >
          {inCart ? "Add more to cart" : "Add to cart"} · {formatINR(eggTotal)}
        </button>
      </div>
    );
  }

  if (!isKg) {
    return null;
  }

  return (
    <div className="mt-8 w-full rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-medium text-charcoal">Select weight</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {WEIGHT_PRESETS.map((p) => {
          const active = presetGrams === p.grams;
          return (
            <button
              key={p.grams}
              type="button"
              onClick={() => setPresetGrams(p.grams)}
              className={`rounded-xl border px-2 py-2.5 text-center text-sm font-medium transition ${
                active
                  ? "border-burgundy bg-burgundy text-cream"
                  : "border-border bg-cream text-charcoal hover:border-burgundy/40"
              }`}
            >
              <span className="block">{p.label}</span>
              <span
                className={`mt-0.5 block text-xs tabular-nums ${
                  active ? "text-cream/90" : "text-muted"
                }`}
              >
                {formatINR(weightPrice(unitPrice, p.grams))}
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setPresetGrams("custom")}
        className={`mt-2 w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${
          presetGrams === "custom"
            ? "border-burgundy bg-burgundy/5 text-burgundy"
            : "border-border bg-cream text-charcoal hover:border-burgundy/40"
        }`}
      >
        Custom weight…
      </button>
      {presetGrams === "custom" && (
        <div className="mt-3 space-y-2">
          <label className="block text-xs font-medium text-muted">
            Grams (min 100 suggested)
          </label>
          <input
            type="number"
            min={100}
            step={50}
            value={customGrams}
            onChange={(e) => setCustomGrams(Number(e.target.value) || 0)}
            className="h-11 w-full rounded-xl border border-border bg-cream px-3 text-sm tabular-nums outline-none focus:border-burgundy"
          />
        </div>
      )}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted">
          {formatQty(qtyKg, "kg")} · {formatINR(unitPrice)}/kg
        </span>
        <span className="text-lg font-bold tabular-nums text-burgundy">
          {formatINR(pricePreview)}
        </span>
      </div>
      <button
        type="button"
        disabled={!customOk}
        onClick={() => addItem(product.id, qtyKg)}
        className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-burgundy text-base font-semibold text-cream hover:bg-burgundy-dark active:scale-[0.99] disabled:opacity-40"
      >
        {inCart ? "Add more to cart" : "Add to cart"} · {formatINR(pricePreview)}
      </button>
    </div>
  );
}
