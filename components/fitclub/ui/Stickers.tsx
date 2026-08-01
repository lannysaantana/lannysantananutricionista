import { cn } from "@/lib/utils";

/**
 * Small sticker-style decorative marks (Y2K/scrapbook aesthetic) for the
 * Desafio Fit Club redesign. All use currentColor so placement components
 * control color via className. Purely decorative — aria-hidden.
 */

export function StarSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className} aria-hidden>
      <path d="M20 0 C20 10 30 20 40 20 C30 20 20 30 20 40 C20 30 10 20 0 20 C10 20 20 10 20 0Z" />
    </svg>
  );
}

export function SparkleSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.6 4.8 2.4 6.6 7.2 7.2-4.8.6-6.6 2.4-7.2 7.2-.6-4.8-2.4-6.6-7.2-7.2C9.6 6.6 11.4 4.8 12 0Z" />
      <path d="M20 15c.3 2.1 1 2.8 3 3.1-2 .3-2.7 1-3 3.1-.3-2.1-1-2.8-3-3.1 2-.3 2.7-1 3-3.1Z" />
    </svg>
  );
}

export function SmileySticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="currentColor" stroke="#0B0B0B" strokeWidth="2" />
      <circle cx="13.5" cy="17" r="2.4" fill="#0B0B0B" />
      <circle cx="26.5" cy="17" r="2.4" fill="#0B0B0B" />
      <path
        d="M11 24c1.8 3.5 5 5.5 9 5.5s7.2-2 9-5.5"
        fill="none"
        stroke="#0B0B0B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21.5S1 14.9 1 7.6C1 3.9 3.9 1 7.5 1c2.2 0 4 1 4.5 2.9C12.5 2 14.3 1 16.5 1 20.1 1 23 3.9 23 7.6c0 7.3-11 13.9-11 13.9Z" />
    </svg>
  );
}

export function FlowerSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className} aria-hidden>
      <g>
        <circle cx="20" cy="9" r="7" />
        <circle cx="31" cy="20" r="7" />
        <circle cx="20" cy="31" r="7" />
        <circle cx="9" cy="20" r="7" />
      </g>
      <circle cx="20" cy="20" r="5.5" fill="#0B0B0B" />
    </svg>
  );
}

export function LightningSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="currentColor" className={className} aria-hidden>
      <path d="M15 0 2 18h8l-3 14 15-19h-9l2-13Z" />
    </svg>
  );
}

export function ScribbleUnderline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" className={className} aria-hidden preserveAspectRatio="none">
      <path
        d="M2 14C40 4 70 18 100 8C130 -2 160 14 198 6"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" className={className} aria-hidden>
      <path
        d="M2 30C18 8 38 4 56 14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M44 8 L57 14 L48 25"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Checkerboard tile block — CSS pattern, not SVG, so it tiles cheaply. */
export function Checkerboard({ className, colorA = "#0B0B0B", colorB = "#D9FF5A" }: { className?: string; colorA?: string; colorB?: string }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        backgroundImage: `linear-gradient(45deg, ${colorA} 25%, transparent 25%), linear-gradient(-45deg, ${colorA} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${colorA} 75%), linear-gradient(-45deg, transparent 75%, ${colorA} 75%)`,
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
        backgroundColor: colorB,
      }}
    />
  );
}

const STICKER_MAP = {
  star: StarSticker,
  sparkle: SparkleSticker,
  smiley: SmileySticker,
  heart: HeartSticker,
  flower: FlowerSticker,
  lightning: LightningSticker,
} as const;

export type StickerKind = keyof typeof STICKER_MAP;

/** Absolutely-positioned floating sticker — drop into any `relative` section. */
export function FloatingSticker({
  kind,
  className,
  style,
  float = true,
}: {
  kind: StickerKind;
  className?: string;
  style?: React.CSSProperties;
  float?: boolean;
}) {
  const Icon = STICKER_MAP[kind];
  return (
    <span
      className={cn("pointer-events-none absolute select-none drop-shadow-md", float && "animate-float", className)}
      style={style}
    >
      <Icon className="h-full w-full" />
    </span>
  );
}
