"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/types";
import { formatINR, formatQty } from "@/lib/format";
import { getEggProductId } from "@/lib/data";
import { useCart } from "@/store/cart";
import { usePrices, useProductUnitPrice } from "@/components/PricesProvider";
import { getUnitPrice, lineTotal as calcLineTotal } from "@/lib/prices";

const WEIGHT_PRESETS = [
  { label: "1 kg", grams: 1000 },
  { label: "500 grams", grams: 500 },
  { label: "250 grams", grams: 250 },
] as const;

const EGG_PRESETS = [6, 12, 30] as const;

function weightPrice(pricePerKg: number, grams: number) {
  return Math.round((grams / 1000) * pricePerKg);
}

function OverlayModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-charcoal">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-cream"
            aria-label="Close picker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>,
    document.body
  );
}

function WeightPicker({
  unitPrice,
  onClose,
  onAdd,
}: {
  unitPrice: number;
  onClose: () => void;
  onAdd: (qtyKg: number) => void;
}) {
  const [custom, setCustom] = useState(false);
  const [grams, setGrams] = useState(250);
  const customPrice = weightPrice(unitPrice, grams);
  const customOk = grams >= 100;

  return (
    <OverlayModal title="Select weight" onClose={onClose}>
      {!custom ? (
        <ul className="space-y-1">
          {WEIGHT_PRESETS.map((p) => (
            <li key={p.grams}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left hover:bg-cream"
                onClick={() => {
                  onAdd(p.grams / 1000);
                  onClose();
                }}
              >
                <span className="text-base font-medium text-charcoal">
                  {p.label}
                </span>
                <span className="shrink-0 text-base font-semibold tabular-nums text-burgundy">
                  {formatINR(weightPrice(unitPrice, p.grams))}
                </span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left hover:bg-cream"
              onClick={() => setCustom(true)}
            >
              <span className="text-base font-medium text-charcoal">
                Custom…
              </span>
            </button>
          </li>
        </ul>
      ) : (
        <div className="space-y-3 p-2">
          <label className="block text-xs font-medium text-muted">
            Grams (min 100)
          </label>
          <input
            type="number"
            min={100}
            step={50}
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value) || 0)}
            className="h-12 w-full rounded-xl border border-border bg-cream px-4 text-base tabular-nums outline-none focus:border-burgundy"
            autoFocus
          />
          <p className="text-sm text-muted">
            ≈ {formatQty(grams / 1000, "kg")} ·{" "}
            <span className="font-semibold text-burgundy">
              {formatINR(customPrice)}
            </span>
          </p>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              className="h-11 flex-1 rounded-xl border border-border text-sm font-medium"
              onClick={() => setCustom(false)}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!customOk}
              className="h-11 flex-1 rounded-xl bg-burgundy text-sm font-semibold text-cream disabled:opacity-40"
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
    </OverlayModal>
  );
}

function EggPicker({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (productId: string, eggCount: number) => void;
}) {
  const prices = usePrices();
  const [custom, setCustom] = useState(false);
  const [count, setCount] = useState(6);
  const categoryId =
    product.categoryId === "brown-eggs" ? "brown-eggs" : "white-eggs";
  const customOk = count >= 1;
  const customTotal = calcLineTotal(
    prices,
    { ...product, categoryId, unit: "eggs", priceKey: product.priceKey },
    count
  );

  function presetPrice(n: 6 | 12 | 30) {
    const key =
      categoryId === "white-eggs"
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
    return getUnitPrice(prices, key);
  }

  return (
    <OverlayModal title="Select egg count" onClose={onClose}>
      {!custom ? (
        <ul className="space-y-1">
          {EGG_PRESETS.map((n) => (
            <li key={n}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left hover:bg-cream"
                onClick={() => {
                  onAdd(getEggProductId(categoryId, n), n);
                  onClose();
                }}
              >
                <span className="text-base font-medium text-charcoal">
                  {n} eggs
                </span>
                <span className="shrink-0 text-base font-semibold tabular-nums text-burgundy">
                  {formatINR(presetPrice(n))}
                </span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left hover:bg-cream"
              onClick={() => setCustom(true)}
            >
              <span className="text-base font-medium text-charcoal">
                Custom…
              </span>
            </button>
          </li>
        </ul>
      ) : (
        <div className="space-y-3 p-2">
          <label className="block text-xs font-medium text-muted">
            Egg count (min 1)
          </label>
          <input
            type="number"
            min={1}
            step={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 0)}
            className="h-12 w-full rounded-xl border border-border bg-cream px-4 text-base tabular-nums outline-none focus:border-burgundy"
            autoFocus
          />
          <p className="text-sm text-muted">
            {count} eggs ·{" "}
            <span className="font-semibold text-burgundy">
              {formatINR(customTotal)}
            </span>
          </p>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              className="h-11 flex-1 rounded-xl border border-border text-sm font-medium"
              onClick={() => setCustom(false)}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!customOk}
              className="h-11 flex-1 rounded-xl bg-burgundy text-sm font-semibold text-cream disabled:opacity-40"
              onClick={() => {
                if (!customOk) return;
                const n = Math.round(count);
                onAdd(getEggProductId(categoryId, n), n);
                onClose();
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </OverlayModal>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const item = useCart((s) => s.items.find((i) => i.productId === product.id));
  const addItem = useCart((s) => s.addItem);
  const setQty = useCart((s) => s.setQty);
  const qty = item?.qty ?? 0;
  const [pickerOpen, setPickerOpen] = useState(false);
  const isKg = product.unit === "kg";
  const isEggs = product.unit === "eggs";
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
              / {isEggs ? `${product.minQty} eggs` : product.unit}
            </p>
          </div>

          {isKg || isEggs ? (
            <div>
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="inline-flex h-10 min-w-[72px] items-center justify-center rounded-xl bg-burgundy px-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark active:scale-95"
                >
                  Add
                </button>
              ) : (
                <div className="inline-flex h-10 items-center rounded-xl border border-burgundy/30 bg-cream">
                  <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() =>
                      setQty(
                        product.id,
                        isEggs ? qty - 1 : qty - product.step
                      )
                    }
                    className="flex h-10 w-9 items-center justify-center text-burgundy"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[3rem] text-center text-xs font-semibold tabular-nums">
                    {formatQty(qty, product.unit)}
                  </span>
                  <button
                    type="button"
                    aria-label="Add more"
                    onClick={() => setPickerOpen(true)}
                    className="flex h-10 w-9 items-center justify-center text-burgundy"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              {pickerOpen && isKg && (
                <WeightPicker
                  unitPrice={unitPrice}
                  onClose={() => setPickerOpen(false)}
                  onAdd={(qtyKg) => addItem(product.id, qtyKg)}
                />
              )}
              {pickerOpen && isEggs && (
                <EggPicker
                  product={product}
                  onClose={() => setPickerOpen(false)}
                  onAdd={(productId, eggCount) => addItem(productId, eggCount)}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
