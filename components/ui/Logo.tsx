"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders the official brand horizontal lockup, swapping between the
 * sage-green (light backgrounds) and cream (dark backgrounds) versions
 * exported from the master artwork at /public/logo/.
 */
export function Logo({
  className,
  variant = "auto",
}: {
  className?: string;
  variant?: "auto" | "light" | "dark";
}) {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (variant !== "auto") return;
    const isDark = document.documentElement.classList.contains("dark");
    setResolvedTheme(isDark ? "dark" : "light");
    const observer = new MutationObserver(() => {
      setResolvedTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [variant]);

  const effective = variant === "auto" ? resolvedTheme : variant;
  const src = effective === "dark" ? "/logo/logo-horizontal-cream.png" : "/logo/logo-horizontal-sage.png";

  return (
    <span className="relative inline-flex items-center select-none">
      <Image
        src={src}
        alt="Lanny Santana Nutricionista"
        width={384}
        height={77}
        className={cn("h-9 w-auto object-contain", className)}
        priority
      />
    </span>
  );
}
