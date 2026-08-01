import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-8 sm:h-9",
  md: "h-12 sm:h-14",
  hero: "h-24 sm:h-32 md:h-40",
} as const;

/** Lanny Fit Club wordmark — black-on-white artwork, so it's wrapped in a white chip to read cleanly on the black background. */
export function ChallengeLogo({
  className,
  size = "sm",
}: {
  className?: string;
  size?: keyof typeof SIZES;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-2xl border-[3px] border-club-black bg-white px-4 py-2 shadow-sticker",
        className
      )}
    >
      <Image
        src="/images/fitclub/lanny-fit-club-wordmark.png"
        alt="Lanny Fit Club"
        width={1060}
        height={550}
        className={cn(SIZES[size], "w-auto object-contain")}
        priority
      />
    </span>
  );
}
