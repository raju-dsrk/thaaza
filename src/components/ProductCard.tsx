"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { formatINR, formatQty } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useProductUnitPrice } from "@/components/PricesProvider";

const WEIGHT_PRESETS = [
  { label: "1 kg", grams: 1000 },
  { label: "500 grams", grams: 500 },
  { label: "250 grams", grams: 250 },
] as const;

function weightPrice(pricePerKg: number, grams: number) {
  return Math.round((grams / 1000) * pricePerKg);
}

function WeightPicker({
  product,
  unitPrice,
  onClose,
  onAdd,
}: {
  product: Product;
  unitPrice: number;
  onClose: () => void;
  onAdd: (qtyKg: number) => void;
}) {
  const [custom, setCustom] = useState(false);
  const [grams, setGrams] = useState(250);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const customPrice = weightPrice(unitPrice, grams);
  const customOk = grams >= 100;

  return (
    <div
      ref={ref}
      className="absolute bottom-full right-0 z-30 mb-2 w-52 overflow-hidden rounded-xl border border-border bg-white shadow-lg"
      role="dialog"
      aria-label="Select weight"
    >
      {!custom ? (
        <ul className="py-1">
          {WEIGHT_PRESETS.map((p) => (
            <li key={p.grams}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-cream"
                onClick={() => {
                  onAdd(p.grams / 1000);
                  onClose();
                }}
              >
                <span className="font-medium text-charcoal">{p.label}</span>
                <span className="tabular-nums text-burgundy">
                  {formatINR(weightPrice(unitPrice, p.grams))}
                </span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-cream"
              onClick={() => setCustom(true)}
            >
              <span className="font-medium text-charcoal">Custom…</span>
            </button>
          </li>
        </ul>
      ) : (
        <div className="space-y-2 p-3">
          <label className="block text-xs font-medium text-muted">
            Grams (min 100)
          </label>
          <input
            type="number"
            min={100}
            step={50}
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value) || 0)}
            className="h-10 w-full rounded-lg border border-border bg-cream px-3 text-sm tabular-nums outline-none focus:border-burgundy"
            autoFocus
          />
          <p className="text-xs text-muted">
            ≈ {formatQty(grams / 1000, "kg")} ·{" "}
            <span className="font-semibold text-burgundy">
              {formatINR(customPrice)}
            </span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="h-9 flex-1 rounded-lg border border-border text-xs font-medium"
              onClick={() => setCustom(false)}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!customOk}
              className="h-9 flex-1 rounded-lg bg-burgundy text-xs font-semibold text-cream disabled:opacity-40"
              onClick={() => {
                if (!customOk) return;
                onAdd(Math.round(grams) / 1000);
                onClose();
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const item = useCart((s) => s.items.find((i) => i.productId === product.id));
  const addItem = useCart((s) => s.addItem);
  const setQty = useCart((s) => s.setQty);
  const qty = item?.qty ?? 0;
  const [pickerOpen, setPickerOpen] = useState(false);
  const isKg = product.unit === "kg";
  const unitPrice = useProductUnitPrice(product);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-cream-dark"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {product.tags?.[0] && (
          <span className="absolute left-2 top-2 rounded-full bg-cream/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-burgundy">
            {product.tags[0]}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-sage">
            {product.cut}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-charcoal hover:text-burgundy"
          >
            {product.name}
          </Link>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            <p className="text-base font-bold text-burgundy">
              {formatINR(unitPrice)}
            </p>
            <p className="text-[11px] text-muted">
              /{" "}
              {product.unit === "tray"
                ? "tray"
                : product.unit === "piece"
                  ? "pack"
                  : product.unit}
            </p>
          </div>

          {isKg ? (
            <div className="relative">
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => setPickerOpen((o) => !o)}
                  className="inline-flex h-10 min-w-[72px] items-center justify-center rounded-xl bg-burgundy px-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark active:scale-95"
                >
                  Add
                </button>
              ) : (
                <div className="inline-flex h-10 items-center rounded-xl border border-burgundy/30 bg-cream">
                  <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() => setQty(product.id, qty - product.step)}
                    className="flex h-10 w-9 items-center justify-center text-burgundy"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[3rem] text-center text-xs font-semibold tabular-nums">
                    {formatQty(qty, product.unit)}
                  </span>
                  <button
                    type="button"
                    aria-label="Add more weight"
                    onClick={() => setPickerOpen((o) => !o)}
                    className="flex h-10 w-9 items-center justify-center text-burgundy"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              {pickerOpen && (
                <WeightPicker
                  product={product}
                  unitPrice={unitPrice}
                  onClose={() => setPickerOpen(false)}
                  onAdd={(qtyKg) => addItem(product.id, qtyKg)}
                />
              )}
            </div>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() => addItem(product.id)}
              className="inline-flex h-10 min-w-[72px] items-center justify-center rounded-xl bg-burgundy px-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark active:scale-95"
            >
              Add
            </button>
          ) : (
            <div className="inline-flex h-10 items-center rounded-xl border border-burgundy/30 bg-cream">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQty(product.id, qty - product.step)}
                className="flex h-10 w-9 items-center justify-center text-burgundy"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[3rem] text-center text-xs font-semibold tabular-nums">
                {formatQty(qty, product.unit)}
              </span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setQty(product.id, qty + product.step)}
                className="flex h-10 w-9 items-center justify-center text-burgundy"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
