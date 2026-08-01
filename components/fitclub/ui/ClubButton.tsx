"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const clubButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-[3px] border-club-black font-club-sans font-bold uppercase tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-sticker-lg active:translate-y-0 active:shadow-none",
  {
    variants: {
      variant: {
        pink: "bg-club-pink text-club-black shadow-sticker",
        neon: "bg-club-neon text-club-black shadow-sticker",
        white: "bg-club-white text-club-black shadow-sticker",
        black: "bg-club-black text-club-white shadow-sticker-pink",
      },
      size: {
        sm: "h-10 px-5 text-xs",
        md: "h-12 px-6 text-sm",
        lg: "h-16 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "md",
    },
  }
);

export interface ClubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof clubButtonVariants> {
  loading?: boolean;
}

export const ClubButton = forwardRef<HTMLButtonElement, ClubButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(clubButtonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {children}
      </button>
    );
  }
);
ClubButton.displayName = "ClubButton";
