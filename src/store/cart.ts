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
import { getUnitPrice, lineTotal as calcLineTotal } from "@/lib/prices";
import { usePrices } from "@/components/PricesProvider";

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
                ? { ...i, qty: Math.round((i.qty + addQty) * 1000) / 1000 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { productId, qty: Math.round(addQty * 1000) / 1000 },
            ],
          });
        }
      },
      setQty: (productId, qty) => {
        const product = getProduct(productId);
        if (!product) return;
        if (qty < product.minQty && product.unit !== "kg") {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        // For kg, allow going below min via stepper to remove (qty <= 0)
        if (product.unit === "kg" && qty <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        if (qty < product.minQty && product.unit === "kg" && qty > 0) {
          // keep fractional custom weights below listed min
          set({
            items: get().items.map((i) =>
              i.productId === productId
                ? { ...i, qty: Math.round(qty * 1000) / 1000 }
                : i
            ),
          });
          return;
        }
        if (qty < product.minQty) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, qty: Math.round(qty * 1000) / 1000 }
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
    { name: "thaaza-cart-v2" }
  )
);

export function useCartTotals() {
  const items = useCart((s) => s.items);
  const fulfilment = useCart((s) => s.fulfilment);
  const prices = usePrices();

  const lines = items
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const unitPrice = getUnitPrice(prices, product.priceKey);
      const lineTotal = calcLineTotal(prices, product, item.qty);
      return { item, product, unitPrice, lineTotal };
    })
    .filter(Boolean) as Array<{
    item: CartItem;
    product: NonNullable<ReturnType<typeof getProduct>>;
    unitPrice: number;
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
