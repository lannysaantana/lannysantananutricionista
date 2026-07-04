"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function LimitationStep() {
  const { data, setField, next, back } = useBookingStore();

  return (
    <StepShell
      title="Você possui alguma deficiência, limitação física ou comorbidade?"
      onBack={back}
    >
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setField("hasLimitation", true)}
          className={cn(
            "rounded-2xl border py-6 font-sans text-lg font-medium transition-colors",
            data.hasLimitation === true
              ? "border-gold bg-gold/10 text-ink dark:text-offwhite shadow-gold"
              : "border-sage/15 bg-white/70 text-ink/70 hover:border-sage/40 dark:bg-white/5 dark:text-offwhite/70"
          )}
        >
          SIM
        </button>
        <button
          type="button"
          onClick={() => setField("hasLimitation", false)}
          className={cn(
            "rounded-2xl border py-6 font-sans text-lg font-medium transition-colors",
            data.hasLimitation === false
              ? "border-gold bg-gold/10 text-ink dark:text-offwhite shadow-gold"
              : "border-sage/15 bg-white/70 text-ink/70 hover:border-sage/40 dark:bg-white/5 dark:text-offwhite/70"
          )}
        >
          NÃO
        </button>
      </div>

      <AnimatePresence>
        {data.hasLimitation === true && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 rounded-xl bg-sage/10 p-4 font-subtitle text-base italic leading-relaxed text-ink/80 dark:text-offwhite/80"
          >
            Para garantir um atendimento mais confortável e adequado às suas
            necessidades, sua consulta inicial será realizada por teleconsulta.
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className="mt-8 w-full"
        disabled={data.hasLimitation === null}
        onClick={next}
      >
        Continuar
      </Button>
    </StepShell>
  );
}
