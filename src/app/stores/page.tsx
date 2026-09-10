import type { Metadata } from "next";
import { stores } from "@/lib/data";
import { StoreCard } from "@/components/StoreCard";

export const metadata: Metadata = {
  title: "Our Stores",
  description:
    "Thaaza neighbourhood live-cut stores in Madhapur, Kukatpally & LB Nagar.",
};

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <h1
        className="text-3xl text-charcoal md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Our Stores
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Neighbourhood live-cut counters. Walk in to see the animal, or order for
        takeaway / delivery from the same place.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {stores.map((s) => (
          <StoreCard key={s.id} store={s} />
        ))}
      </div>
    </div>
  );
}
