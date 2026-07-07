"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { cn } from "@/lib/utils";

export function LimitacaoStep() {
  const { data, answerLimitation, back } = useBookingStore();

  return (
    <StepShell
      title="Você possui alguma limitação de locomoção que dificulte o comparecimento ao consultório?"
      onBack={back}
    >
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => answerLimitation(true)}
          className={cn(
            "rounded-2xl border py-6 font-sans text-lg font-medium transition-colors",
            "border-sage/15 bg-white/70 text-ink/70 hover:border-sage/40 dark:bg-white/5 dark:text-offwhite/70"
          )}
        >
          SIM
        </button>
        <button
          type="button"
          onClick={() => answerLimitation(false)}
          className={cn(
            "rounded-2xl border py-6 font-sans text-lg font-medium transition-colors",
            "border-sage/15 bg-white/70 text-ink/70 hover:border-sage/40 dark:bg-white/5 dark:text-offwhite/70"
          )}
        >
          NÃO
        </button>
      </div>

      <AnimatePresence>
        {data.hasLocomotionLimitation === true && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 rounded-xl bg-sage/10 p-4 font-subtitle text-base italic leading-relaxed text-ink/80 dark:text-offwhite/80"
          >
            Para garantir um atendimento mais confortável e adequado às suas
            necessidades, sua consulta será realizada por teleconsulta.
          </motion.p>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
