"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart, useCartTotals } from "@/store/cart";
import { formatINR } from "@/lib/format";

export function StickyCartBar() {
  const pathname = usePathname();
  const count = useCart((s) => s.items.length);
  const { total } = useCartTotals();

  if (count === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout") || pathname.startsWith("/order")) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[4.25rem] z-40 px-3 md:bottom-6 md:px-6">
      <Link
        href="/cart"
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl bg-burgundy px-4 py-3 text-cream shadow-lg shadow-burgundy/25 ring-1 ring-white/10 transition hover:bg-burgundy-dark md:max-w-sm"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream/15">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold">
              {count} item{count > 1 ? "s" : ""} in cart
            </span>
            <span className="text-xs text-cream/75">Tap to review & checkout</span>
          </span>
        </span>
        <span className="rounded-full bg-cream px-3 py-1.5 text-sm font-bold text-burgundy">
          {formatINR(total)}
        </span>
      </Link>
    </div>
  );
}
