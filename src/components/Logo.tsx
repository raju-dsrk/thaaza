import Link from "next/link";

export function Logo({
  className = "",
  href = "/",
  size = "md",
}: {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights = { sm: 28, md: 36, lg: 48 };
  const h = heights[size];
  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={h}
        height={h}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="40" height="40" rx="10" fill="#8B1E3F" />
        <path
          d="M10 26V14h3.2c2.4 0 3.9 1.2 3.9 3.1 0 1.2-.6 2.1-1.6 2.6 1.3.5 2.1 1.6 2.1 3.1 0 2.2-1.7 3.2-4.2 3.2H10zm3.1-7.6h.5c1.1 0 1.7-.5 1.7-1.4s-.6-1.3-1.7-1.3h-.5v2.7zm0 5.2h.7c1.3 0 2-.6 2-1.6s-.7-1.5-2-1.5h-.7v3.1zM22.2 26V14h5.8c3.2 0 5.1 1.9 5.1 4.8V26h-3.1v-6.8c0-1.7-.9-2.7-2.6-2.7h-.9V26h-4.3z"
          fill="#FAF6F0"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-semibold tracking-tight text-burgundy ${
            size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl"
          }`}
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Thaaza
        </span>
        {size !== "sm" && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
            Live-cut · Fresh
          </span>
        )}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0" aria-label="Thaaza home">
        {content}
      </Link>
    );
  }
  return content;
}
