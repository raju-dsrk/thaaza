"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, FulfilmentMode } from "@/lib/types";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_ABOVE,
  GST_RATE,
  getProduct,
} from "@/lib/data";

interface CartState {
  items: CartItem[];
  fulfilment: FulfilmentMode;
  storeId: string | null;
  addItem: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setFulfilment: (mode: FulfilmentMode) => void;
  setStoreId: (id: string | null) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      fulfilment: "delivery",
      storeId: "madhapur",
      addItem: (productId, qty) => {
        const product = getProduct(productId);
        if (!product) return;
        const addQty = qty ?? product.minQty;
        const existing = get().items.find((i) => i.productId === productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === productId
                ? { ...i, qty: Math.round((i.qty + addQty) * 100) / 100 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { productId, qty: addQty }] });
        }
      },
      setQty: (productId, qty) => {
        const product = getProduct(productId);
        if (!product) return;
        if (qty < product.minQty) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, qty: Math.round(qty * 100) / 100 }
              : i
          ),
        });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      setFulfilment: (mode) => set({ fulfilment: mode }),
      setStoreId: (id) => set({ storeId: id }),
    }),
    { name: "thaaza-cart-v1" }
  )
);

export function useCartTotals() {
  const items = useCart((s) => s.items);
  const fulfilment = useCart((s) => s.fulfilment);

  const lines = items
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const lineTotal =
        product.unit === "tray" || product.unit === "piece"
          ? product.pricePerKg * item.qty
          : product.pricePerKg * item.qty;
      return { item, product, lineTotal };
    })
    .filter(Boolean) as Array<{
    item: CartItem;
    product: NonNullable<ReturnType<typeof getProduct>>;
    lineTotal: number;
  }>;

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const deliveryFee =
    fulfilment === "delivery"
      ? subtotal >= FREE_DELIVERY_ABOVE
        ? 0
        : DELIVERY_FEE
      : 0;
  const gst = Math.round((subtotal + deliveryFee) * GST_RATE);
  const total = subtotal + deliveryFee + gst;
  const itemCount = items.reduce((n, i) => n + 1, 0);

  return { lines, subtotal, deliveryFee, gst, total, itemCount };
}
