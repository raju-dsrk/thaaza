import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Thermometer, ClipboardCheck, SprayCan } from "lucide-react";

export const metadata: Metadata = {
  title: "Trust & hygiene",
  description:
    "Thaaza freshness SOP, hygiene practices and FSSAI placeholder for Hyderabad shops.",
};

const sop = [
  {
    icon: ShieldCheck,
    title: "Live-cut promise",
    body: "Goat and sheep are cut after selection / order confirmation — not thawed from overnight cold-room carcasses sold as 'fresh'.",
  },
  {
    icon: Thermometer,
    title: "Cold handling after cut",
    body: "Once dressed, product is packed and moved to chilled bags for takeaway or delivery. We do not re-freeze and re-sell.",
  },
  {
    icon: SprayCan,
    title: "Counter hygiene",
    body: "Daily cleaning checklist for blocks, knives, grinders and weighing scales. Separate boards for fish where space allows.",
  },
  {
    icon: ClipboardCheck,
    title: "Trace & weigh",
    body: "Weight shown at counter or on the bill. Cut preference noted on the order ticket so the butcher doesn't guess.",
  },
];

export default function TrustPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
        Trust centre
      </p>
      <h1
        className="mt-2 text-3xl text-charcoal md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Hygiene & freshness SOP
      </h1>
      <p className="mt-4 text-muted leading-relaxed">
        Families in Hyderabad don&apos;t buy meat on brand ads alone — they buy on
        what they can see. Thaaza codifies that trust into a simple operating
        playbook for partner shops.
      </p>

      <div className="mt-8 grid gap-4">
        {sop.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-semibold text-charcoal">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-10 rounded-2xl border border-dashed border-burgundy/30 bg-burgundy/5 p-6">
        <h2 className="font-semibold text-burgundy">FSSAI (placeholder)</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Partner shops operate under applicable FSSAI licences. Licence numbers
          will be displayed per store once live operations begin. This demo uses
          placeholder compliance copy only — replace with real registration
          details before production launch.
        </p>
        <p className="mt-3 font-mono text-xs text-muted">
          Demo FSSAI: XXXXXXXXXXXXXX · Hyderabad
        </p>
      </section>

      <section className="mt-8 space-y-3 text-sm text-muted">
        <h2 className="text-lg font-semibold text-charcoal">What we don&apos;t do</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Sell old frozen stock as fresh live-cut.</li>
          <li>Hide weights or add unexplained &quot;service&quot; line items.</li>
          <li>Force delivery-only when visit or takeaway is better for you.</li>
        </ul>
      </section>

      <Link
        href="/shop"
        className="mt-10 inline-flex min-h-12 items-center rounded-2xl bg-burgundy px-6 font-semibold text-cream"
      >
        Shop with confidence
      </Link>
    </div>
  );
}
