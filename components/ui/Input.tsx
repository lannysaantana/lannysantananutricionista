import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-sage/20 bg-white/80 dark:bg-white/5 px-5 py-4 text-lg font-sans text-ink dark:text-offwhite placeholder:text-ink/30 dark:placeholder:text-offwhite/30 transition-colors focus:border-gold focus:outline-none",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
