"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_PROGRESS_GROUPS, type BookingStep } from "@/types/booking";

interface ProgressBarProps {
  currentStep: BookingStep;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const currentGroupIndex = BOOKING_PROGRESS_GROUPS.findIndex((g) =>
    g.steps.includes(currentStep)
  );

  return (
    <div className="w-full">
      <ol className="flex items-center justify-between gap-1">
        {BOOKING_PROGRESS_GROUPS.map((group, index) => {
          const isDone = index < currentGroupIndex;
          const isActive = index === currentGroupIndex;

          return (
            <li key={group.key} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-sans font-medium transition-colors",
                    isDone && "border-gold bg-gold text-ink",
                    isActive && "border-sage-dark bg-sage-dark text-offwhite",
                    !isDone && !isActive && "border-sage/20 text-ink/40 dark:text-offwhite/40"
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < BOOKING_PROGRESS_GROUPS.length - 1 && (
                  <div className="relative mx-1 h-[2px] flex-1 overflow-hidden rounded-full bg-sage/15">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={false}
                      animate={{ width: isDone ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "hidden text-center font-sans text-[11px] uppercase tracking-wide sm:block",
                  isActive ? "text-ink dark:text-offwhite" : "text-ink/40 dark:text-offwhite/40"
                )}
              >
                {group.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
