import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export function CategoryGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4"
          : "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      }
    >
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/shop/${cat.slug}`}
          className={`group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md ${
            compact ? "w-[140px] shrink-0" : ""
          }`}
        >
          <div className={`relative ${compact ? "aspect-square" : "aspect-[5/4]"}`}>
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2.5">
              <p className="text-sm font-semibold text-cream">{cat.name}</p>
              {cat.nameTe && (
                <p className="text-[11px] text-cream/75">{cat.nameTe}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
