"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StepShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  wide?: boolean;
}

export function StepShell({ title, subtitle, children, onBack, wide }: StepShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("mx-auto w-full", wide ? "max-w-2xl" : "max-w-lg")}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-sm text-ink/60 transition-colors hover:text-sage-dark dark:text-offwhite/60 dark:hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
      )}
      <h2 className="font-display text-2xl text-ink dark:text-offwhite sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 font-subtitle text-lg italic text-ink/60 dark:text-offwhite/60">
          {subtitle}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </motion.div>
  );
}
