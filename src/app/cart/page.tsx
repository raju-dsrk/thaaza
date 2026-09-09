"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, useCartTotals } from "@/store/cart";
import { formatINR, formatQty } from "@/lib/format";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const { lines, subtotal, deliveryFee, gst, total } = useCartTotals();
  const fulfilment = useCart((s) => s.fulfilment);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark text-burgundy">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted">
          Add fresh cuts from the shop — goat, sheep, chicken, fish & more.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex min-h-12 items-center rounded-2xl bg-burgundy px-6 font-semibold text-cream"
        >
          Browse shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <h1
        className="text-3xl text-charcoal"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Your cart
      </h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-5">
        <ul className="space-y-3 lg:col-span-3">
          {lines.map(({ item, product, unitPrice, lineTotal }) => (
            <li
              key={product.id}
              className="flex gap-3 rounded-2xl border border-border bg-white p-3 shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/product/${product.slug}`}
                  className="truncate font-semibold hover:text-burgundy"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-muted">
                  {formatINR(unitPrice)} / {product.unit}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <div className="inline-flex h-9 items-center rounded-lg border border-border bg-cream">
                    <button
                      type="button"
                      className="flex h-9 w-8 items-center justify-center"
                      onClick={() =>
                        setQty(product.id, item.qty - product.step)
                      }
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[3rem] text-center text-xs font-semibold">
                      {formatQty(item.qty, product.unit)}
                    </span>
                    <button
                      type="button"
                      className="flex h-9 w-8 items-center justify-center"
                      onClick={() =>
                        setQty(product.id, item.qty + product.step)
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-burgundy">
                      {formatINR(lineTotal)}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() => removeItem(product.id)}
                      className="text-muted hover:text-burgundy"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-white p-5 shadow-sm lg:col-span-2 lg:sticky lg:top-24">
          <h2 className="font-semibold">Bill summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">
                Delivery {fulfilment !== "delivery" ? "(N/A)" : ""}
              </dt>
              <dd>{deliveryFee === 0 ? "Free / —" : formatINR(deliveryFee)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">GST (5% demo)</dt>
              <dd>{formatINR(gst)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd className="text-burgundy">{formatINR(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-burgundy font-semibold text-cream hover:bg-burgundy-dark"
          >
            Proceed to checkout
          </Link>
          <Link
            href="/shop"
            className="mt-2 flex min-h-11 items-center justify-center text-sm font-medium text-burgundy"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
