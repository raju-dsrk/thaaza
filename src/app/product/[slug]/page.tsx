import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getProduct,
  getProductsByCategory,
  products,
} from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ResolvedPrice } from "@/components/ResolvedPrice";
import { AddToCartPanel } from "./AddToCartPanel";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const cat = categories.find((c) => c.id === product.categoryId);
  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-sm text-muted">
        <Link href="/shop" className="hover:text-burgundy">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {cat && (
          <>
            <Link href={`/shop/${cat.slug}`} className="hover:text-burgundy">
              {cat.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-charcoal">{product.cut}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-cream-dark sm:aspect-[4/3] lg:aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sage">
            {product.cut}
          </p>
          <h1
            className="mt-1 text-3xl text-charcoal md:text-4xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-burgundy">
            <ResolvedPrice product={product} />
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {product.description}
          </p>
          {product.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-cream-dark px-3 py-1 text-xs font-semibold text-charcoal"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <ul className="mt-5 space-y-2 text-sm text-muted">
            <li>✓ Live-cut at partner butcher shops</li>
            <li>✓ Not frozen cold-chain stock</li>
            <li>✓ Visit · Takeaway · Home delivery</li>
          </ul>
          <AddToCartPanel product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-semibold">More from {cat?.name}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
