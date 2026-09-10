import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why Thaaazaa exists — the quiet worry behind every Sunday curry, and how we bring back live-cut trust.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
        Our story
      </p>
      <h1
        className="mt-2 text-3xl text-charcoal md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Meat you can look in the eye
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Most of us grew up knowing where dinner came from. Someone at the
        counter chose the bird. Someone cut it while you waited. You could smell
        that it was fresh before it reached the pan.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Somewhere along the way, that comfort got replaced by sealed trays and
        promises on a label. Convenient — yes. Easy to trust — not always. Too
        many families have opened a pack that looked fine online and felt wrong
        at home.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-charcoal">
        {BRAND.name} is our way back. Live animals. Cuts made after you order.
        Neighbourhood stores you can walk into. The same care your parents
        insisted on — with ordering that fits how we live now.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">What we refuse to forget</h2>
        <p className="leading-relaxed text-muted">
          Freshness is not a marketing word. It is the quiet relief when your
          mother-in-law nods at the colour of the meat. It is the biryani that
          tastes like Sunday used to. It is knowing the animal was still alive
          when you decided what to cook tonight.
        </p>
        <p className="leading-relaxed text-muted">
          We are not here to be the cheapest tray in the city. We are here so
          you do not have to wonder.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">How we work</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>See the animal — or trust that we cut only after your order.</li>
          <li>Goat, sheep, chicken, eggs, fish and prawns from one counter.</li>
          <li>Visit the store, takeaway, or delivery — your choice.</li>
          <li>Clean packing, honest weighing, clear bills.</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-burgundy p-6 text-cream">
        <h2
          className="text-2xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {BRAND.tagline}
        </h2>
        <p className="mt-2 text-cream/80">
          If this feels like the meat culture you grew up with, we would love to
          hear from you — {BRAND.email}
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
            Our Stores
          </Link>
        </div>
      </section>
    </div>
  );
}
