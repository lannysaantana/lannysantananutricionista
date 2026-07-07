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
 * Session scheduling templates per plan/tier — the number of sessions,
 * their labels and suggested spacing. Prices and feature copy come from
 * the `service_plans` table (admin-editable); this part is structural
 * scheduling logic, not a price, so it stays in code.
 */
export function getPackageSessions(plan: ServicePlanKey, tier: PlanTier): PendingSession[] {
  const empty = { date: null, time: null };

  if (plan === "presencial") {
    const sessions: PendingSession[] = [
      { key: "consulta_inicial", label: "Consulta Inicial", sequence: 1, suggestedOffsetDays: 0, ...empty },
      { key: "avaliacao_fisica", label: "Avaliação Física", sequence: 2, suggestedOffsetDays: 20, ...empty },
    ];
    if (tier === "recommended") {
      sessions.push({
        key: "segunda_consulta",
        label: "Segunda Consulta Presencial",
        sequence: 3,
        suggestedOffsetDays: 40,
        ...empty,
      });
    }
    return sessions;
  }

  if (plan === "teleconsulta") {
    const sessions: PendingSession[] = [
      { key: "consulta_online", label: "Teleconsulta", sequence: 1, suggestedOffsetDays: 0, ...empty },
      { key: "retorno_online", label: "Retorno Online", sequence: 2, suggestedOffsetDays: 15, ...empty },
    ];
    if (tier === "recommended") {
      sessions.push({
        key: "segunda_consulta",
        label: "Segunda Consulta Online",
        sequence: 3,
        suggestedOffsetDays: 30,
        ...empty,
      });
    }
    return sessions;
  }

  if (plan === "protocolo_trimestral") {
    return [
      { key: "consulta_1", label: "Consulta 1", sequence: 1, suggestedOffsetDays: 0, ...empty },
      { key: "retorno_1", label: "Retorno 1", sequence: 2, suggestedOffsetDays: 15, ...empty },
      { key: "consulta_2", label: "Consulta 2", sequence: 3, suggestedOffsetDays: 45, ...empty },
      { key: "retorno_2", label: "Retorno 2", sequence: 4, suggestedOffsetDays: 60, ...empty },
      { key: "consulta_3", label: "Consulta 3", sequence: 5, suggestedOffsetDays: 90, ...empty },
    ];
  }

  if (plan === "glp1_essencial") {
    return [
      { key: "teleconsulta", label: "Teleconsulta", sequence: 1, suggestedOffsetDays: 0, ...empty },
      { key: "retorno_online", label: "Retorno Online", sequence: 2, suggestedOffsetDays: 30, ...empty },
    ];
  }

  // glp1_premium
  return [
    { key: "teleconsulta_1", label: "Teleconsulta 1", sequence: 1, suggestedOffsetDays: 0, ...empty },
    { key: "teleconsulta_2", label: "Teleconsulta 2", sequence: 2, suggestedOffsetDays: 30, ...empty },
    { key: "teleconsulta_3", label: "Teleconsulta 3", sequence: 3, suggestedOffsetDays: 60, ...empty },
  ];
}

/** Whether choosing this plan should ask the locomotion-limitation question. */
export function usesInPersonVisits(plan: ServicePlanKey): boolean {
  return plan === "presencial" || plan === "protocolo_trimestral";
}
