"use client";

import { useEffect, useState } from "react";
import { PricesProvider } from "./PricesProvider";

/** Ensures zustand persist rehydrates before interactive cart UI. */
export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return (
      <PricesProvider>
        <div className="min-h-screen bg-cream">{children}</div>
      </PricesProvider>
    );
  }
  return <PricesProvider>{children}</PricesProvider>;
}
