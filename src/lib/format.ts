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
  if (unit === "tray") return qty === 1 ? "1 tray" : `${qty} trays`;
  if (unit === "piece") return qty === 1 ? "1 pack" : `${qty} packs`;
  return qty === 1 ? "1 pc" : `${qty} pcs`;
}
