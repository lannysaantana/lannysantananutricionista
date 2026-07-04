"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioCardProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}

export function RadioCard({ label, description, icon: Icon, selected, onSelect }: RadioCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-colors",
        selected
          ? "border-gold bg-gold/10 shadow-gold"
          : "border-sage/15 bg-white/70 dark:bg-white/5 hover:border-sage/40"
      )}
    >
      {Icon && (
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            selected ? "bg-gold text-ink" : "bg-sage/10 text-sage-dark dark:text-sage"
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span className="flex-1">
        <span className="block font-sans font-medium text-ink dark:text-offwhite">{label}</span>
        {description && (
          <span className="mt-0.5 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            {description}
          </span>
        )}
      </span>
      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
          <Check className="h-4 w-4" />
        </span>
      )}
    </motion.button>
  );
}
