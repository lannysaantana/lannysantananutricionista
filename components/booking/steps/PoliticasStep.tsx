"use client";

import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Button } from "@/components/ui/Button";

export function PoliticasStep() {
  const { data, setField, goTo, back } = useBookingStore();

  const canContinue = data.acceptedReschedulePolicy && data.acceptedCancellationPolicy;

  return (
    <StepShell title="Antes de confirmar, leia com atenção" onBack={back} wide>
      <div className="space-y-5">
        <div className="rounded-2xl border border-sage/10 bg-white/70 p-5 dark:bg-white/5">
          <h3 className="font-display text-lg text-ink dark:text-offwhite">
            Política de Reagendamento
          </h3>
          <ul className="mt-3 space-y-2 font-sans text-sm text-ink/70 dark:text-offwhite/70">
            <li>• Cada consulta terá direito a apenas um reagendamento.</li>
            <li>
              • O reagendamento deverá ser solicitado com no mínimo 24 horas de
              antecedência, exclusivamente pelo WhatsApp da clínica, e estará
              sujeito à disponibilidade de horários.
            </li>
            <li>• Após utilizar esse reagendamento, não será possível realizar uma nova alteração para a mesma consulta.</li>
            <li>
              • Caso o paciente não compareça ou não solicite o reagendamento
              com pelo menos 24 horas de antecedência, a consulta ou retorno
              será considerado realizado, sem direito a reembolso ou
              remarcação.
            </li>
          </ul>
          <label className="mt-4 flex items-start gap-2.5 font-sans text-sm text-ink dark:text-offwhite">
            <input
              type="checkbox"
              checked={data.acceptedReschedulePolicy}
              onChange={(e) => setField("acceptedReschedulePolicy", e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-sage-dark"
            />
            Li e concordo com a Política de Reagendamento
          </label>
        </div>

        <div className="rounded-2xl border border-sage/10 bg-white/70 p-5 dark:bg-white/5">
          <h3 className="font-display text-lg text-ink dark:text-offwhite">
            Política de Cancelamento
          </h3>
          <ul className="mt-3 space-y-2 font-sans text-sm text-ink/70 dark:text-offwhite/70">
            <li>• Cancelamento até 48 horas antes da consulta: 100% de reembolso.</li>
            <li>• Cancelamento entre 24 e 48 horas antes: 50% de reembolso.</li>
            <li>• Cancelamento com menos de 24 horas de antecedência ou não comparecimento: não haverá reembolso.</li>
          </ul>
          <label className="mt-4 flex items-start gap-2.5 font-sans text-sm text-ink dark:text-offwhite">
            <input
              type="checkbox"
              checked={data.acceptedCancellationPolicy}
              onChange={(e) => setField("acceptedCancellationPolicy", e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-sage-dark"
            />
            Li e concordo com a Política de Cancelamento
          </label>
        </div>

        <Button
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => goTo("resumo")}
        >
          Continuar
        </Button>
      </div>
    </StepShell>
  );
}
