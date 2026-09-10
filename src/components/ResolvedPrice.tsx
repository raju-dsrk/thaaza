"use client";

import { formatINR } from "@/lib/format";
import { useProductUnitPrice } from "./PricesProvider";
import type { Product } from "@/lib/types";

export function ResolvedPrice({
  product,
  className,
  showUnit = true,
}: {
  product: Pick<Product, "priceKey" | "unit" | "minQty" | "cut">;
  className?: string;
  showUnit?: boolean;
}) {
  const unitPrice = useProductUnitPrice(product);
  const unitLabel =
    product.unit === "eggs"
      ? product.cut === "Custom" || product.minQty === 1
        ? "egg"
        : `${product.minQty} eggs`
      : product.unit;

  return (
    <span className={className}>
      {formatINR(unitPrice)}
      {showUnit && (
        <span className="ml-2 text-base font-medium text-muted">
          / {unitLabel}
        </span>
      )}
    </span>
  );
}
