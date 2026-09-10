"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User } from "lucide-react";
import { Logo } from "./Logo";
import { useCart, useCartTotals } from "@/store/cart";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/stores", label: "Stores" },
  { href: "/trust", label: "Trust" },
  { href: "/about", label: "Our story" },
];

export function Header() {
  const pathname = usePathname();
  const itemCount = useCart((s) => s.items.length);
  const { total } = useCartTotals();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-3 px-4 md:h-24 md:px-6">
        <Logo href="/" size="lg" variant="lockup" />

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-burgundy text-cream"
                    : "text-charcoal/80 hover:bg-cream-dark hover:text-burgundy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-muted hover:border-burgundy/30 sm:inline-flex"
            aria-label="Search shop"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Browse cuts</span>
          </Link>
          <Link
            href="/account"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-charcoal hover:border-burgundy/40"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="relative hidden items-center gap-2 rounded-full bg-burgundy px-3.5 py-2 text-sm font-medium text-cream hover:bg-burgundy-dark md:inline-flex"
          >
            Cart
            {itemCount > 0 && (
              <span className="rounded-full bg-cream/20 px-1.5 text-xs">
                {itemCount} · ₹{Math.round(total)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
