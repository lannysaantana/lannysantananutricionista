"use client";

import { Video, Trophy, Syringe } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { useServicePlans } from "@/hooks/usePricing";
import { StepShell } from "@/components/booking/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatCurrencyBRL } from "@/utils/formatters";
import type { ServicePlanKey } from "@/types/order";

const PLAN_ICONS: Record<ServicePlanKey, typeof Video> = {
  consulta_online: Video,
  plano_plus: Trophy,
  glp1_suporte_metabolico: Syringe,
};

export function ServicoStep() {
  const { data, chooseService, back } = useBookingStore();
  const { data: plans, isLoading } = useServicePlans(true);

  return (
    <StepShell title="Escolha o tipo de atendimento" onBack={back} wide>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-3">
          {(plans ?? []).map((plan) => (
            <RadioCard
              key={plan.key}
              label={plan.name}
              description={`${formatCurrencyBRL(plan.base_price_cents)} · ${plan.duration_minutes} min`}
              icon={PLAN_ICONS[plan.key]}
              selected={data.plan === plan.key}
              onSelect={() => chooseService(plan.key)}
            />
          ))}
        </div>
      )}
    </StepShell>
  );
}
