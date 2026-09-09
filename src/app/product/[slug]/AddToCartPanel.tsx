"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatQty } from "@/lib/format";
import { useCart } from "@/store/cart";

export function AddToCartPanel({ product }: { product: Product }) {
  const [qty, setLocalQty] = useState(product.minQty);
  const addItem = useCart((s) => s.addItem);
  const inCart = useCart((s) => s.items.find((i) => i.productId === product.id));

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
            onClick={() => setLocalQty((q) => Math.round((q + product.step) * 100) / 100)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => addItem(product.id, qty)}
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-burgundy text-base font-semibold text-cream hover:bg-burgundy-dark active:scale-[0.99]"
        >
          {inCart ? "Update cart" : "Add to cart"}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted">
        Min {formatQty(product.minQty, product.unit)} · step{" "}
        {formatQty(product.step, product.unit)}
      </p>
    </div>
  );
}
