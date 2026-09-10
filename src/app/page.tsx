import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustStrip } from "@/components/TrustStrip";
import { ProductCard } from "@/components/ProductCard";
import { StoreCard } from "@/components/StoreCard";
import {
  getFeaturedProducts,
  stores,
  testimonials,
} from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src="/images/products/goat-curry.png"
            alt="Fresh goat curry cut — live-cut at Thaaza"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/75 to-burgundy/50" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:px-6 md:py-24 lg:py-28">
          <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Hyderabad · Neighbourhood butcher network
          </p>
          <h1
            className="animate-fade-up max-w-2xl text-4xl leading-tight text-cream sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-display), serif", animationDelay: "60ms" }}
          >
            Live-cut.
            <br />
            Always fresh.
          </h1>
          <p
            className="animate-fade-up max-w-xl text-base leading-relaxed text-cream/80 md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            Trustable meat from live animals cut at neighbourhood stores. Quality
            first — not frozen, not cheap dead stock. Visit, takeaway or home
            delivery.
          </p>
          <div
            className="animate-fade-up flex flex-wrap gap-3 pt-2"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-burgundy px-6 text-base font-semibold text-cream shadow-lg shadow-burgundy/30 hover:bg-burgundy-light"
            >
              Order fresh cuts
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/stores"
              className="inline-flex min-h-12 items-center rounded-2xl border border-cream/30 bg-cream/10 px-6 text-base font-semibold text-cream backdrop-blur hover:bg-cream/20"
            >
              Find a store
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 md:space-y-20 md:px-6 md:py-16">
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal md:text-3xl">
                Shop by category
              </h2>
              <p className="mt-1 text-sm text-muted">
                Goat, sheep, chicken, eggs, fish & prawns — 8 categories
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-burgundy hover:underline sm:inline"
            >
              View all
            </Link>
          </div>
          <CategoryGrid />
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-charcoal md:text-3xl">
            How it works
          </h2>
          <p className="mb-6 max-w-2xl text-muted">
            See animal → Choose cut → We cut → Pack. The way Hyderabad has always
            trusted meat — with a modern fulfilment layer.
          </p>
          <HowItWorks />
        </section>

        <section>
          <TrustStrip />
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal md:text-3xl">
                Featured today
              </h2>
              <p className="mt-1 text-sm text-muted">
                Live-cut favourites · prices in ₹
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-burgundy hover:underline"
            >
              Full catalogue
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal md:text-3xl">
                Our Stores
              </h2>
              <p className="mt-1 text-sm text-muted">
                Madhapur · Kukatpally · LB Nagar
              </p>
            </div>
            <Link
              href="/stores"
              className="text-sm font-semibold text-burgundy hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {stores.map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[220px] md:min-h-full">
              <Image
                src="/images/story/our-story.png"
                alt="Preparing fresh meat at home with care"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Our story
              </p>
              <h2
                className="mt-2 text-2xl text-charcoal md:text-3xl"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Because dinner is never just dinner
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                It is the person who waits at the counter. The child who asks
                what is cooking. The quiet hope that today&apos;s meat will taste
                the way you remember. Thaaza exists so that hope does not have to
                compete with sealed trays and guesswork — only with a live cut,
                done right, from a store near you.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-burgundy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-burgundy-dark"
              >
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-charcoal md:text-3xl">
            What Hyderabad families say
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <Quote className="h-5 w-5 text-gold" />
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  “{t.text}”
                </p>
                <footer className="mt-4 flex items-center justify-between text-sm">
                  <span>
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-muted"> · {t.area}</span>
                  </span>
                  <span className="text-gold">{"★".repeat(t.rating)}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-burgundy px-6 py-10 text-center text-cream md:px-12">
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Ready for Sunday biryani?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-cream/80">
            Pick your cut now. We&apos;ll live-cut, pack, and get it to your door —
            or meet you at the store.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center rounded-2xl bg-cream px-6 font-semibold text-burgundy hover:bg-white"
            >
              Browse catalogue
            </Link>
            <Link
              href="/trust"
              className="inline-flex min-h-12 items-center rounded-2xl border border-cream/40 px-6 font-semibold text-cream hover:bg-cream/10"
            >
              Our freshness SOP
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
