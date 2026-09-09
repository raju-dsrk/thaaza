"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR, formatQty } from "@/lib/format";
import { useCart } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const item = useCart((s) => s.items.find((i) => i.productId === product.id));
  const addItem = useCart((s) => s.addItem);
  const setQty = useCart((s) => s.setQty);
  const qty = item?.qty ?? 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
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
              {formatINR(product.pricePerKg)}
            </p>
            <p className="text-[11px] text-muted">
              / {product.unit === "tray" ? "tray" : product.unit}
            </p>
          </div>
          {qty === 0 ? (
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
