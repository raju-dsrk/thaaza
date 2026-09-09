import { ShieldCheck, Snowflake, Scale, Leaf } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Live-cut promise" },
  { icon: Snowflake, label: "Never frozen stock" },
  { icon: Scale, label: "Weighed at counter" },
  { icon: Leaf, label: "Hygiene SOP" },
];

export function TrustStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-white px-3.5 py-3 shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-charcoal">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
