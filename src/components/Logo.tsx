"use client";

import Image from "next/image";
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
  const heights = { sm: 44, md: 56, lg: 72 };
  const h = heights[size];
  const content = (
    <span className={`relative inline-block ${className}`} style={{ height: h, width: h }}>
      <Image
        src="/images/brand/logo.png"
        alt="Thaaazaa"
        width={h}
        height={h}
        className="h-full w-full object-contain"
        priority
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center" aria-label="Thaaazaa home">
        {content}
      </Link>
    );
  }
  return content;
}
