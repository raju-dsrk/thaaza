"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, ShoppingBag, MapPin, User } from "lucide-react";
import { useCart } from "@/store/cart";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/stores", label: "Stores", icon: MapPin },
  { href: "/cart", label: "Cart", icon: ShoppingCart, cart: true },
  { href: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const count = useCart((s) => s.items.length);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-cream/95 backdrop-blur-md md:hidden safe-bottom"
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-1.5 pb-1">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium ${
                  active ? "text-burgundy" : "text-muted"
                }`}
              >
                <span className="relative">
                  <Icon
                    className={`h-5 w-5 ${active ? "stroke-[2.25]" : ""}`}
                  />
                  {tab.cart && count > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[9px] font-bold text-cream">
                      {count}
                    </span>
                  )}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
