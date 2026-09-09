"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stores } from "@/lib/data";
import { formatINR } from "@/lib/format";
import type { FulfilmentMode, Order } from "@/lib/types";
import { useCart, useCartTotals } from "@/store/cart";
import { useAuth } from "@/store/auth";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const fulfilment = useCart((s) => s.fulfilment);
  const storeId = useCart((s) => s.storeId);
  const setFulfilment = useCart((s) => s.setFulfilment);
  const setStoreId = useCart((s) => s.setStoreId);
  const clear = useCart((s) => s.clear);
  const { lines, subtotal, deliveryFee, gst, total } = useCartTotals();
  const authPhone = useAuth((s) => s.phone);
  const authName = useAuth((s) => s.name);

  const [name, setName] = useState(authName || "");
  const [phone, setPhone] = useState(authPhone || "");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const modes: { id: FulfilmentMode; label: string; hint: string }[] = [
    { id: "visit", label: "Visit shop", hint: "See animal · wait for cut" },
    { id: "takeaway", label: "Takeaway", hint: "Ready for pickup" },
    { id: "delivery", label: "Home delivery", hint: "Hyderabad hubs" },
  ];

  const canSubmit = useMemo(() => {
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) return false;
    if (fulfilment === "delivery" && address.trim().length < 8) return false;
    if ((fulfilment === "visit" || fulfilment === "takeaway") && !storeId)
      return false;
    return items.length > 0;
  }, [name, phone, address, fulfilment, storeId, items.length]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Nothing to checkout</h1>
        <Link href="/shop" className="mt-4 inline-block text-burgundy font-semibold">
          Go to shop
        </Link>
      </div>
    );
  }

  function placeOrder() {
    setError("");
    if (!canSubmit) {
      setError("Please fill name, 10-digit mobile, and delivery address if needed.");
      return;
    }
    setPaying(true);
    const orderId = `TZ${Date.now().toString(36).toUpperCase()}`;
    const order: Order = {
      id: orderId,
      items: lines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        qty: l.item.qty,
        unit: l.product.unit,
        price: l.product.pricePerKg,
        lineTotal: l.lineTotal,
      })),
      fulfilment,
      storeId: storeId || undefined,
      address: fulfilment === "delivery" ? address : undefined,
      phone: phone.replace(/\D/g, "").slice(-10),
      customerName: name.trim(),
      subtotal,
      deliveryFee,
      gst,
      total,
      createdAt: new Date().toISOString(),
      status: fulfilment === "delivery" ? "preparing" : "confirmed",
    };
    try {
      localStorage.setItem(`thaaza-order-${orderId}`, JSON.stringify(order));
      const list = JSON.parse(localStorage.getItem("thaaza-orders") || "[]") as string[];
      localStorage.setItem("thaaza-orders", JSON.stringify([orderId, ...list].slice(0, 20)));
    } catch {
      /* ignore quota */
    }
    clear();
    setTimeout(() => {
      router.push(`/order/${orderId}`);
    }, 600);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <h1
        className="text-3xl text-charcoal"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Checkout
      </h1>
      <p className="mt-1 text-sm text-muted">
        Demo checkout — no real payment is charged.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-semibold">Fulfilment</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFulfilment(m.id)}
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    fulfilment === m.id
                      ? "border-burgundy bg-burgundy/5 ring-2 ring-burgundy/30"
                      : "border-border hover:border-burgundy/30"
                  }`}
                >
                  <span className="block text-sm font-semibold">{m.label}</span>
                  <span className="text-xs text-muted">{m.hint}</span>
                </button>
              ))}
            </div>

            {(fulfilment === "visit" || fulfilment === "takeaway") && (
              <div className="mt-4">
                <label className="text-sm font-medium">Preferred shop</label>
                <select
                  value={storeId || ""}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.area}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {fulfilment === "delivery" && (
              <div className="mt-4">
                <label className="text-sm font-medium">Delivery address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Flat / street, landmark, area, Hyderabad"
                  className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
                />
                <p className="mt-1 text-xs text-muted">
                  Demo delivery from nearest hub (Madhapur / Kukatpally / LB Nagar).
                </p>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-semibold">Your details</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Mobile</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
                  placeholder="10-digit mobile"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-dashed border-gold/50 bg-gold/5 p-5">
            <h2 className="font-semibold text-charcoal">Mock payment</h2>
            <p className="mt-1 text-sm text-muted">
              UPI / card / COD — demo only. Tap place order to generate a GST-style
              bill. No money is taken.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-white p-5 shadow-sm lg:col-span-2 lg:sticky lg:top-24">
          <h2 className="font-semibold">GST-style bill (demo)</h2>
          <ul className="mt-3 space-y-2 border-b border-border pb-3 text-sm">
            {lines.map((l) => (
              <li key={l.product.id} className="flex justify-between gap-2">
                <span className="text-muted">
                  {l.product.name} × {l.item.qty}
                </span>
                <span className="shrink-0 tabular-nums">
                  {formatINR(l.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Taxable value</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd>{deliveryFee ? formatINR(deliveryFee) : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">CGST+SGST (5% demo)</dt>
              <dd>{formatINR(gst)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Grand total</dt>
              <dd className="text-burgundy">{formatINR(total)}</dd>
            </div>
          </dl>
          {error && <p className="mt-3 text-sm text-burgundy">{error}</p>}
          <button
            type="button"
            disabled={paying}
            onClick={placeOrder}
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-burgundy font-semibold text-cream hover:bg-burgundy-dark disabled:opacity-60"
          >
            {paying ? "Confirming…" : `Place order · ${formatINR(total)}`}
          </button>
        </aside>
      </div>
    </div>
  );
}
