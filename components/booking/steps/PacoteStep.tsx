"use client";

import { Check, Sparkles } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { useServicePlans } from "@/hooks/usePricing";
import { useIsNewPatient } from "@/hooks/usePatientHistory";
import { StepShell } from "@/components/booking/StepShell";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";
import { formatCurrencyBRL } from "@/utils/formatters";
import type { PlanTier } from "@/types/order";

export function PacoteStep() {
  const { data, choosePacoteTier, back } = useBookingStore();
  const { data: plans, isLoading } = useServicePlans(true);
  const { isNewPatient } = useIsNewPatient(data.email);

  const plan = plans?.find((p) => p.key === data.resolvedPlan);

  if (isLoading || !plan) {
    return (
      <StepShell title="Carregando seu plano..." onBack={back}>
        <LoadingSpinner />
      </StepShell>
    );
  }

  if (!plan.has_tiers) {
    return (
      <StepShell title={plan.name} onBack={back} wide>
        <div className="rounded-3xl border border-sage/10 bg-white/70 p-6 shadow-soft dark:bg-white/5">
          <p className="font-display text-3xl text-sage-dark dark:text-gold">
            {formatCurrencyBRL(plan.base_price_cents)}
          </p>
          {plan.payment_note && (
            <p className="mt-1 font-sans text-xs text-ink/50 dark:text-offwhite/50">
              {plan.payment_note}
            </p>
          )}
          <ul className="mt-5 space-y-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 font-sans text-sm text-ink/80 dark:text-offwhite/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark dark:text-gold" />
                {feature}
              </li>
            ))}
          </ul>
          {plan.savings_message && (
            <p className="mt-4 rounded-xl bg-gold/10 p-3 font-subtitle text-sm italic text-ink/80 dark:text-offwhite/80">
              {plan.savings_message}
            </p>
          )}
        </div>

        <Button size="lg" className="mt-6 w-full" onClick={() => choosePacoteTier("base")}>
          Quero {plan.name.toLowerCase().startsWith("protocolo") ? "este protocolo" : "este programa"}
        </Button>
      </StepShell>
    );
  }

  const tiers: { tier: PlanTier; label: string; price: number; features: string[]; badge?: string | null }[] = [
    {
      tier: "essential",
      label: plan.essential_label ?? "Atendimento Essencial",
      price: plan.essential_price_cents ?? plan.base_price_cents,
      features: plan.essential_features ?? plan.features,
    },
  ];

  if (isNewPatient) {
    tiers.push({
      tier: "recommended",
      label: plan.recommended_label ?? "Acompanhamento Recomendado",
      price: plan.recommended_price_cents ?? plan.base_price_cents,
      features: plan.recommended_features ?? plan.features,
      badge: plan.recommended_badge,
    });
  }

  return (
    <StepShell title={plan.name} onBack={back} wide>
      <div className={cn("grid gap-5", tiers.length > 1 && "sm:grid-cols-2")}>
        {tiers.map((option) => (
          <div
            key={option.tier}
            className={cn(
              "relative flex flex-col rounded-3xl border p-6 shadow-soft",
              option.badge
                ? "border-gold bg-gold/[0.06] shadow-gold"
                : "border-sage/10 bg-white/70 dark:bg-white/5"
            )}
          >
            {option.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-sans text-xs font-medium uppercase tracking-wide text-ink shadow-gold">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {option.badge}
                </span>
              </span>
            )}
            <h3 className="font-display text-lg text-ink dark:text-offwhite">{option.label}</h3>
            <p className="mt-1 font-display text-2xl text-sage-dark dark:text-gold">
              {formatCurrencyBRL(option.price)}
            </p>
            <ul className="mt-4 flex-1 space-y-2">
              {option.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 font-sans text-sm text-ink/80 dark:text-offwhite/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark dark:text-gold" />
                  {feature}
                </li>
              ))}
            </ul>
            {option.tier === "recommended" && plan.savings_message && (
              <p className="mt-3 font-subtitle text-sm italic text-ink/70 dark:text-offwhite/70">
                {plan.savings_message}
              </p>
            )}
            <Button
              size="md"
              className="mt-5 w-full"
              variant={option.badge ? "gold" : "primary"}
              onClick={() => choosePacoteTier(option.tier)}
            >
              {option.tier === "recommended"
                ? `Adicionar segunda consulta`
                : "Quero apenas a consulta inicial"}
            </Button>
          </div>
        ))}
      </div>
    </StepShell>
  );
}
