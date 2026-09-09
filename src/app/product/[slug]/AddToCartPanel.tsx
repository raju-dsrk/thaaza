"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatINR, formatQty } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useProductUnitPrice } from "@/components/PricesProvider";

const WEIGHT_PRESETS = [
  { label: "1 kg", grams: 1000 },
  { label: "500 g", grams: 500 },
  { label: "250 g", grams: 250 },
] as const;

function weightPrice(pricePerKg: number, grams: number) {
  return Math.round((grams / 1000) * pricePerKg);
}

export function AddToCartPanel({ product }: { product: Product }) {
  const isKg = product.unit === "kg";
  const [presetGrams, setPresetGrams] = useState<number | "custom">(1000);
  const [customGrams, setCustomGrams] = useState(250);
  const [qty, setLocalQty] = useState(product.minQty);
  const addItem = useCart((s) => s.addItem);
  const inCart = useCart((s) => s.items.find((i) => i.productId === product.id));
  const unitPrice = useProductUnitPrice(product);

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

  if (!isKg) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-charcoal">Quantity</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="inline-flex h-12 items-center rounded-xl border border-border bg-cream">
            <button
              type="button"
              className="flex h-12 w-11 items-center justify-center text-burgundy"
              onClick={() =>
                setLocalQty((q) => Math.max(product.minQty, q - product.step))
              }
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[4.5rem] text-center text-sm font-semibold tabular-nums">
              {formatQty(qty, product.unit)}
            </span>
            <button
              type="button"
              className="flex h-12 w-11 items-center justify-center text-burgundy"
              onClick={() =>
                setLocalQty((q) => Math.round((q + product.step) * 100) / 100)
              }
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => addItem(product.id, qty)}
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-burgundy text-base font-semibold text-cream hover:bg-burgundy-dark active:scale-[0.99]"
          >
            {inCart ? "Update cart" : "Add to cart"} ·{" "}
            {formatINR(Math.round(unitPrice * qty))}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          {formatINR(unitPrice)} /{" "}
          {product.unit === "tray" ? "tray" : "pack"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-white p-4 shadow-sm">
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
