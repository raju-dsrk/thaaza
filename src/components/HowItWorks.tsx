import { Eye, Scissors, Package, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Eye,
    title: "See the animal",
    text: "At the neighbourhood store — or confirm live stock for delivery slots.",
  },
  {
    icon: Scissors,
    title: "Choose your cut",
    text: "Curry, biryani, boneless, keema, paya — tell the butcher exactly.",
  },
  {
    icon: CheckCircle2,
    title: "We cut fresh",
    text: "Live-cut after your order. Not thawed dead stock from a cold room.",
  },
  {
    icon: Package,
    title: "Pack & fulfil",
    text: "Visit store, takeaway, or home delivery across Hyderabad hubs.",
  },
];

export function HowItWorks() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li
            key={step.title}
            className="relative rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/10 text-burgundy">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Step {i + 1}
            </p>
            <h3 className="mt-1 text-base font-semibold text-charcoal">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
