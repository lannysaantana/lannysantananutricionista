import { cn } from "@/lib/utils";

const BG = {
  white: "bg-club-white",
  pink: "bg-club-pink-light",
  lilac: "bg-club-lilac",
  blue: "bg-club-blue",
  neon: "bg-club-neon",
  gold: "bg-club-gold",
  black: "bg-club-black text-club-white",
} as const;

const SHADOW = {
  black: "shadow-sticker hover:shadow-sticker-lg",
  pink: "shadow-sticker-pink hover:shadow-sticker-lg",
  white: "shadow-sticker-white",
} as const;

/** Sticker-style card: thick border, offset shadow, optional tilt — the base building block of the Fit Club redesign. */
export function StickerCard({
  children,
  className,
  bg = "white",
  shadow = "black",
  rotate,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: keyof typeof BG;
  shadow?: keyof typeof SHADOW;
  rotate?: string;
  as?: "div" | "article";
}) {
  return (
    <Component
      className={cn(
        "rounded-[1.75rem] border-[3px] border-club-black transition-transform duration-300 hover:-translate-y-1",
        BG[bg],
        SHADOW[shadow],
        className
      )}
      style={rotate ? { transform: `rotate(${rotate})` } : undefined}
    >
      {children}
    </Component>
  );
}

/** Small pill tag, e.g. "PREMIAÇÃO", "EXCLUSIVO". */
export function ClubTag({
  children,
  className,
  bg = "neon",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: keyof typeof BG;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-[3px] border-club-black px-4 py-1.5 font-club-sans text-xs font-bold uppercase tracking-widest text-club-black shadow-sticker",
        BG[bg],
        className
      )}
    >
      {children}
    </span>
  );
}
