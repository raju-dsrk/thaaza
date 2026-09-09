import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Thaaza investor story — problem, solution and neighbourhood butcher model in Hyderabad.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
        About · Investors
      </p>
      <h1
        className="mt-2 text-3xl text-charcoal md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Why Thaaza exists
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Hyderabad still trusts meat the old way — see the animal, choose the cut,
        watch it being dressed. National apps pushed convenience, but often with
        frozen or long cold-chain stock. {BRAND.name} sits in the middle:{" "}
        <strong className="text-charcoal">neighbourhood live-cut</strong> with
        app-grade fulfilment.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">The problem</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>
            Urban buyers want hygiene and convenience, but distrust opaque
            &quot;fresh&quot; packs that arrived frozen.
          </li>
          <li>
            Traditional butcher shops have trust and skill — but weak discovery,
            inconsistent packing, and no delivery stack.
          </li>
          <li>
            Cheap dead stock races to the bottom on price and quality. Families
            cooking biryani or Sunday curry notice immediately.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Our solution</h2>
        <p className="text-muted leading-relaxed">
          Partner with neighbourhood butcher shops. Digitise catalogue, cut
          preferences, GST-style billing and fulfilment (visit / takeaway /
          delivery) — while the core promise stays{" "}
          <em className="text-charcoal">live-cut after order</em>.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Quality first", "Not the cheapest frozen SKU."],
            ["Local trust", "Shops people already know."],
            ["Modern ops", "App cart, SOPs, hub delivery."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-burgundy">{t}</p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Model</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted">
          <li>Asset-light partnerships with existing butcher shops.</li>
          <li>Shared brand, hygiene SOP, weighing & packing standards.</li>
          <li>
            Three fulfilment modes so we don&apos;t force every customer into
            delivery.
          </li>
          <li>
            Category breadth: goat, sheep, broiler, country chicken, eggs, fish,
            prawns — one neighbourhood stop.
          </li>
          <li>Start dense in Hyderabad, then replicate city by city.</li>
        </ol>
      </section>

      <section className="mt-10 rounded-2xl bg-burgundy p-6 text-cream">
        <h2
          className="text-2xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {BRAND.tagline}
        </h2>
        <p className="mt-2 text-cream/80">
          This site is a product demo for the brand experience. Reach us at{" "}
          {BRAND.email} for partnership conversations.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/trust"
            className="rounded-xl bg-cream px-4 py-2.5 text-sm font-semibold text-burgundy"
          >
            Trust & hygiene
          </Link>
          <Link
            href="/stores"
            className="rounded-xl border border-cream/40 px-4 py-2.5 text-sm font-semibold"
          >
            Demo stores
          </Link>
        </div>
      </section>
    </div>
  );
}
