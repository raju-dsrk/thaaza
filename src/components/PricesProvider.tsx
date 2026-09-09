"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_PRICES,
  getUnitPrice,
  lineTotal,
  type Prices,
} from "@/lib/prices";
import type { Product } from "@/lib/types";

const PricesContext = createContext<Prices>(DEFAULT_PRICES);

export function PricesProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<Prices>(DEFAULT_PRICES);

  useEffect(() => {
    let cancelled = false;
    fetch("/prices.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`prices.json ${res.status}`);
        return res.json();
      })
      .then((data: Partial<Prices>) => {
        if (cancelled || !data || typeof data !== "object") return;
        setPrices({ ...DEFAULT_PRICES, ...data });
      })
      .catch(() => {
        /* keep DEFAULT_PRICES */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PricesContext.Provider value={prices}>{children}</PricesContext.Provider>
  );
}

export function usePrices(): Prices {
  return useContext(PricesContext);
}

export function useProductUnitPrice(product: Pick<Product, "priceKey">): number {
  const prices = usePrices();
  return useMemo(
    () => getUnitPrice(prices, product.priceKey),
    [prices, product.priceKey]
  );
}

export function useLineTotal(
  product: Pick<Product, "priceKey" | "unit">,
  qty: number
): number {
  const prices = usePrices();
  return useMemo(
    () => lineTotal(prices, product, qty),
    [prices, product, qty]
  );
}
