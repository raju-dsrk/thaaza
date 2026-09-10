import type { Metadata } from "next";
import Link from "next/link";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { CategoryGrid } from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse live-cut goat, sheep, boiler & country chicken, white & brown eggs, fish & prawns in Hyderabad.",
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
        Demo catalogue with Hyderabad INR prices. Choose a category or scroll the
        full list. Fulfilment: visit shop, takeaway or home delivery.
      </p>

      <div className="mt-6">
        <CategoryGrid compact />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <Link
          href="/shop"
          className="shrink-0 rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-cream"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop/${c.slug}`}
            className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-charcoal hover:border-burgundy/40"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
