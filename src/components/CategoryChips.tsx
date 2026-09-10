"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { categories } from "@/lib/data";

const SCROLL_KEY = "thaaza-cat-scroll";

export function CategoryChips({
  activeSlug = null,
}: {
  activeSlug?: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved != null) {
      const left = Number(saved);
      if (Number.isFinite(left)) el.scrollLeft = left;
    }

    if (activeSlug) {
      const active = el.querySelector<HTMLElement>(
        `[data-slug="${activeSlug}"]`
      );
      if (active) {
        const elRect = el.getBoundingClientRect();
        const aRect = active.getBoundingClientRect();
        const fullyVisible =
          aRect.left >= elRect.left && aRect.right <= elRect.right;
        if (!fullyVisible) {
          active.scrollIntoView({
            inline: "nearest",
            block: "nearest",
            behavior: "instant",
          });
          sessionStorage.setItem(SCROLL_KEY, String(el.scrollLeft));
        }
      }
    }
  }, [activeSlug]);

  function saveScroll() {
    const el = ref.current;
    if (el) sessionStorage.setItem(SCROLL_KEY, String(el.scrollLeft));
  }

  return (
    <div
      ref={ref}
      onScroll={saveScroll}
      className="flex gap-2 overflow-x-auto no-scrollbar pb-2"
    >
      <Link
        href="/shop"
        data-slug="all"
        onClick={saveScroll}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
          !activeSlug
            ? "bg-burgundy font-semibold text-cream"
            : "border border-border bg-white text-charcoal hover:border-burgundy/40"
        }`}
      >
        All
      </Link>
      {categories.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <Link
            key={c.id}
            href={`/shop/${c.slug}`}
            data-slug={c.slug}
            onClick={saveScroll}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              active
                ? "bg-burgundy text-cream"
                : "border border-border bg-white text-charcoal hover:border-burgundy/40"
            }`}
          >
            {c.name}
          </Link>
        );
      })}
    </div>
  );
}
