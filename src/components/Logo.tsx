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
        {/* Clean letter T — cream on burgundy */}
        <path
          d="M11 11.5h18v4.2H24.2V28.5h-8.4V15.7H11V11.5z"
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
