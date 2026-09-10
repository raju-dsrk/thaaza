import Link from "next/link";
import { BRAND } from "@/lib/data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-charcoal text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Logo href="/" size="md" className="rounded-lg bg-cream/95 p-1" />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
            {BRAND.tagline} Trustable meat from live animals cut at neighbourhood
            stores. Quality first — not frozen, not cheap dead stock.
          </p>
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
              ["/about", "Our story"],
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
        © {new Date().getFullYear()} Thaaazaa. Fresh meat across India — prices in ₹.
        Online payments coming soon.
      </div>
    </footer>
  );
}
