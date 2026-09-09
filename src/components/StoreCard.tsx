import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import type { Store } from "@/lib/types";

export function StoreCard({ store }: { store: Store }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/stores/${store.id}`} className="relative block aspect-[16/9]">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-1 text-xs font-semibold text-burgundy">
          {store.area}
        </span>
      </Link>
      <div className="space-y-2.5 p-4">
        <h3 className="text-lg font-semibold text-charcoal">
          <Link href={`/stores/${store.id}`} className="hover:text-burgundy">
            {store.name}
          </Link>
        </h3>
        <p className="flex items-start gap-2 text-sm text-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" />
          {store.address}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Clock className="h-4 w-4 text-sage" />
          {store.hours}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Phone className="h-4 w-4 text-sage" />
          {store.phone}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {store.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full bg-cream-dark px-2 py-0.5 text-[11px] font-medium text-muted"
            >
              {s}
            </span>
          ))}
        </div>
        <Link
          href={`/stores/${store.id}`}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-burgundy/25 py-2.5 text-sm font-semibold text-burgundy hover:bg-burgundy hover:text-cream"
        >
          View store
        </Link>
      </div>
    </article>
  );
}
