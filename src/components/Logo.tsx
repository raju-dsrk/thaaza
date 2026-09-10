"use client";

import Image from "next/image";
import Link from "next/link";

type LogoSize = "sm" | "md" | "lg" | "xl";

/** Logo / name always routes to home (/). */
export function Logo({
  className = "",
  href = "/",
  size = "md",
  variant = "lockup",
}: {
  className?: string;
  href?: string;
  size?: LogoSize;
  variant?: "lockup" | "badge";
}) {
  const medal = { sm: 40, md: 52, lg: 64, xl: 80 }[size];
  const title = {
    sm: "text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl",
  }[size];
  const badgeH = { sm: 72, md: 96, lg: 120, xl: 148 }[size];
  const homeHref = href || "/";

  const content =
    variant === "badge" ? (
      <span
        className={`relative inline-block overflow-hidden rounded-2xl bg-cream shadow-sm ${className}`}
        style={{ height: badgeH, width: badgeH }}
      >
        <Image
          src="/images/brand/logo.png"
          alt="Thaaazaa — Fresh & delicious meat"
          width={badgeH}
          height={badgeH}
          className="h-full w-full object-contain p-1.5"
          priority
        />
      </span>
    ) : (
      <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
        <span
          className="relative shrink-0 overflow-hidden rounded-full bg-cream shadow-sm ring-1 ring-burgundy/10"
          style={{ height: medal, width: medal }}
        >
          <Image
            src="/images/brand/medal.png"
            alt=""
            width={medal}
            height={medal}
            className="h-full w-full object-cover"
            priority
          />
        </span>
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={`font-semibold tracking-[0.04em] text-burgundy ${title}`}
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            THAAAZAA
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-muted sm:text-[10px] sm:tracking-[0.14em]">
            Fresh & delicious meat
          </span>
        </span>
      </span>
    );

  return (
    <Link
      href={homeHref}
      className="inline-flex shrink-0 items-center"
      aria-label="Thaaazaa home"
    >
      {content}
    </Link>
  );
}
