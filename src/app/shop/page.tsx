import type { Metadata } from "next";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { CategoryChips } from "@/components/CategoryChips";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse live-cut goat (Meka Pothu), sheep (Pottelu), chicken, eggs, fish & prawns — cut fresh after you order.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <h1
        className="text-3xl text-charcoal md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Shop fresh cuts
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Fresh cuts from live animals — see what you buy, then we cut to order.
        Visit the shop, takeaway, or get it delivered.
      </p>

      <div className="mt-6">
        <CategoryChips />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
