import Link from "next/link";
import { BRAND } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-charcoal text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Thaaza home">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-burgundy text-base font-bold text-cream">T</span>
            <span>
              <span className="block text-xl font-semibold text-cream" style={{ fontFamily: "var(--font-display), serif" }}>Thaaza</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-cream/50">Live-cut · Fresh</span>
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
            {BRAND.tagline} Trustable meat from live animals cut at neighbourhood
            butcher shops in {BRAND.city}. Quality first — not frozen, not cheap
            dead stock.
          </p>
          <p className="mt-3 font-telugu text-sm text-gold">{BRAND.telugu}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["/shop", "Shop"],
              ["/stores", "Stores"],
              ["/trust", "Trust & hygiene"],
              ["/about", "About / investors"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-cream">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li>{BRAND.phone}</li>
            <li>{BRAND.email}</li>
            <li>Hyderabad, Telangana</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/45">
        © {new Date().getFullYear()} Thaaza. Demo catalogue — prices in INR for
        Hyderabad. Not a live payment site.
      </div>
    </footer>
  );
}
