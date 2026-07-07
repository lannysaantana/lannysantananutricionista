"use client";

import { Building2, Video, Trophy, Syringe, Sparkles } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { useServicePlans } from "@/hooks/usePricing";
import { StepShell } from "@/components/booking/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatCurrencyBRL } from "@/utils/formatters";
import type { ServicePlanKey } from "@/types/order";

const PLAN_ICONS: Record<ServicePlanKey, typeof Building2> = {
  presencial: Building2,
  teleconsulta: Video,
  protocolo_trimestral: Trophy,
  glp1_essencial: Syringe,
  glp1_premium: Sparkles,
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
              selected={data.selectedPlan === plan.key}
              onSelect={() => chooseService(plan.key)}
            />
          ))}
        </div>
      )}
    </StepShell>
  );
}
