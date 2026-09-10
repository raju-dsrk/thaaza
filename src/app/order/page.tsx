"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import type { Order } from "@/lib/types";
import { formatINR, formatQty } from "@/lib/format";
import { getStore } from "@/lib/data";

function OrderContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!id) {
      setOrder(null);
      setReady(true);
      return;
    }
    try {
      const raw = localStorage.getItem(`thaaza-order-${id}`);
      if (raw) setOrder(JSON.parse(raw) as Order);
      else setOrder(null);
    } catch {
      setOrder(null);
    }
    setReady(true);
  }, [id]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-muted">
        Loading order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <p className="mt-2 text-muted">
          Demo orders live in this browser&apos;s localStorage.
          {!id ? " Add ?id= your order id to the URL." : null}
        </p>
        <Link href="/shop" className="mt-4 inline-block font-semibold text-burgundy">
          Back to shop
        </Link>
      </div>
    );
  }

  const store = order.storeId ? getStore(order.storeId) : null;
  const fulfilmentLabel =
    order.fulfilment === "visit"
      ? "Visit store"
      : order.fulfilment === "takeaway"
        ? "Takeaway"
        : "Home delivery";

  return (
    <div className="mx-auto max-w-lg px-4 py-10 md:py-14">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1
            className="mt-4 text-2xl text-charcoal"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Order confirmed
          </h1>
          <p className="mt-1 text-sm text-muted">
            Demo order · no payment collected
          </p>
          <p className="mt-3 rounded-full bg-cream-dark px-3 py-1 font-mono text-sm font-semibold text-burgundy">
            {order.id}
          </p>
        </div>

        <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Customer</span>
            <span className="font-medium">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Mobile</span>
            <span>+91 {order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Fulfilment</span>
            <span>{fulfilmentLabel}</span>
          </div>
          {store && (
            <div className="flex justify-between gap-4">
              <span className="text-muted">Shop</span>
              <span className="text-right">{store.name}</span>
            </div>
          )}
          {order.address && (
            <div className="flex justify-between gap-4">
              <span className="shrink-0 text-muted">Address</span>
              <span className="text-right">{order.address}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted">Status</span>
            <span className="capitalize text-sage">{order.status.replace(/_/g, " ")}</span>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-cream p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Tax invoice (demo)
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-2">
                <span>
                  {item.name}
                  <span className="block text-xs text-muted">
                    {formatQty(item.qty, item.unit)} × {formatINR(item.price)}
                  </span>
                </span>
                <span className="tabular-nums">{formatINR(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Taxable</dt>
              <dd>{formatINR(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd>{order.deliveryFee ? formatINR(order.deliveryFee) : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">GST 5%</dt>
              <dd>{formatINR(order.gst)}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd className="text-burgundy">{formatINR(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/shop"
            className="flex min-h-12 items-center justify-center rounded-xl bg-burgundy font-semibold text-cream"
          >
            Order again
          </Link>
          <Link
            href="/stores"
            className="flex min-h-11 items-center justify-center text-sm font-medium text-burgundy"
          >
            View shops
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-20 text-center text-muted">
          Loading order…
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
