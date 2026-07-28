import type { PlanTier, PendingSession, ServicePlanKey, ServicePlan } from "@/types/order";

/** Resolves the price (in cents) for a plan + tier combination. */
export function getSelectedPriceCents(plan: ServicePlan, tier: PlanTier): number {
  if (tier === "essential") return plan.essential_price_cents ?? plan.base_price_cents;
  if (tier === "recommended") return plan.recommended_price_cents ?? plan.base_price_cents;
  return plan.base_price_cents;
}

/** Adds the admin-configured card surcharge percentage on top of a price. */
export function applyCardSurcharge(amountCents: number, surchargePercent: number): number {
  return Math.round(amountCents * (1 + surchargePercent / 100));
}

/**
 * Session scheduling templates per plan — the number of sessions, their
 * labels and suggested spacing. Prices and feature copy come from the
 * `service_plans` table (admin-editable); this part is structural
 * scheduling logic, not a price, so it stays in code. All active plans are
 * teleconsulta-only single packages (no tiers).
 */
export function getPackageSessions(plan: ServicePlanKey): PendingSession[] {
  const empty = { date: null, time: null };

  if (plan === "consulta_online") {
    return [
      {
        key: "consulta_online",
        label: "Consulta Nutricional Online",
        sequence: 1,
        suggestedOffsetDays: 0,
        ...empty,
      },
    ];
  }

  if (plan === "plano_plus") {
    return [
      { key: "primeira_consulta", label: "Primeira Consulta", sequence: 1, suggestedOffsetDays: 0, ...empty },
      { key: "retorno", label: "Retorno", sequence: 2, suggestedOffsetDays: 15, ...empty },
      { key: "nova_consulta", label: "Nova Consulta", sequence: 3, suggestedOffsetDays: 30, ...empty },
    ];
  }

  // glp1_suporte_metabolico
  return [
    { key: "avaliacao_inicial", label: "Avaliação Inicial", sequence: 1, suggestedOffsetDays: 0, ...empty },
    { key: "encontro_2", label: "2º Encontro", sequence: 2, suggestedOffsetDays: 20, ...empty },
    { key: "encontro_3", label: "3º Encontro", sequence: 3, suggestedOffsetDays: 40, ...empty },
    { key: "encontro_4", label: "4º Encontro — Reavaliação", sequence: 4, suggestedOffsetDays: 60, ...empty },
  ];
}
