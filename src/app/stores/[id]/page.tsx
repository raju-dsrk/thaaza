import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";
import { getStore, stores } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return stores.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const store = getStore(id);
  if (!store) return { title: "Store" };
  return { title: store.name, description: store.address };
}

export default async function StoreDetailPage({ params }: Props) {
  const { id } = await params;
  const store = getStore(id);
  if (!store) notFound();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-sm text-muted">
        <Link href="/stores" className="hover:text-burgundy">
          Stores
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{store.area}</span>
      </nav>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
        <div className="relative aspect-[21/9] min-h-[200px]">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6">
            <h1
              className="text-3xl text-cream md:text-4xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {store.name}
            </h1>
            <p className="mt-1 text-cream/80">{store.area}, Hyderabad</p>
          </div>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-2 md:p-8">
          <div className="space-y-4">
            <p className="flex items-start gap-3 text-sm text-muted">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-burgundy" />
              {store.address}
            </p>
            <p className="flex items-center gap-3 text-sm text-muted">
              <Clock className="h-5 w-5 text-sage" />
              Open {store.hours}
            </p>
            <p className="flex items-center gap-3 text-sm text-muted">
              <Phone className="h-5 w-5 text-sage" />
              <a href={`tel:${store.phone}`} className="hover:text-burgundy">
                {store.phone}
              </a>
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {store.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-cream-dark px-3 py-1 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl bg-cream p-5">
            <h2 className="font-semibold text-charcoal">Fulfilment from this store</h2>
            <p className="text-sm text-muted">
              Visit to see the animal and wait for the cut. Or order takeaway /
              delivery — we still cut fresh at this counter.
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <Link
                href="/shop"
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-burgundy px-4 text-sm font-semibold text-cream"
              >
                Order from here
              </Link>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-charcoal"
              >
                Open maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
