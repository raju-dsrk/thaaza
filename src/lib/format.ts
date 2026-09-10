export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatQty(qty: number, unit: string): string {
  if (unit === "kg") {
    return qty < 1 ? `${Math.round(qty * 1000)} g` : `${qty} kg`;
  }
  if (unit === "eggs") {
    return qty === 1 ? "1 egg" : `${qty} eggs`;
  }
  return qty === 1 ? "1 pc" : `${qty} pcs`;
}
