import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const items = getProductsByCategory(cat.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-sm text-muted">
        <Link href="/shop" className="hover:text-burgundy">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{cat.name}</span>
      </nav>
      <h1
        className="mt-3 text-3xl text-charcoal md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {cat.name}
        {cat.nameTe ? (
          <span className="ml-2 text-xl text-gold md:text-2xl">{cat.nameTe}</span>
        ) : null}
      </h1>
      <p className="mt-2 max-w-2xl text-muted">{cat.description}</p>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <Link
          href="/shop"
          className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop/${c.slug}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              c.id === cat.id
                ? "bg-burgundy text-cream"
                : "border border-border bg-white"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
