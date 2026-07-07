"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useServicePlans, useUpdateServicePlan } from "@/hooks/usePricing";
import type { ServicePlan } from "@/types/order";

function centsToReais(cents: number | null): string {
  if (cents === null) return "";
  return (cents / 100).toFixed(2);
}

function reaisToCents(value: string): number {
  const parsed = Number(value.replace(",", "."));
  return Math.round((Number.isFinite(parsed) ? parsed : 0) * 100);
}

function PlanCard({ plan }: { plan: ServicePlan }) {
  const update = useUpdateServicePlan();
  const [form, setForm] = useState(() => ({
    base_price_cents: plan.base_price_cents,
    features: plan.features.join("\n"),
    is_active: plan.is_active,
    essential_price_cents: plan.essential_price_cents,
    recommended_price_cents: plan.recommended_price_cents,
    savings_message: plan.savings_message ?? "",
  }));

  async function handleSave() {
    await update.mutateAsync({
      key: plan.key,
      base_price_cents: form.base_price_cents,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      is_active: form.is_active,
      essential_price_cents: form.essential_price_cents,
      recommended_price_cents: form.recommended_price_cents,
      savings_message: form.savings_message || null,
    });
  }

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>{plan.duration_minutes} minutos por atendimento</CardDescription>
        </div>
        <label className="flex items-center gap-2 font-sans text-sm text-ink/70 dark:text-offwhite/70">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
            className="h-4 w-4 accent-sage-dark"
          />
          Ativo
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">
            Valor base (R$)
          </label>
          <Input
            type="text"
            inputMode="decimal"
            value={centsToReais(form.base_price_cents)}
            onChange={(e) =>
              setForm((f) => ({ ...f, base_price_cents: reaisToCents(e.target.value) }))
            }
            className="py-2.5 text-sm"
          />
        </div>

        {plan.has_tiers && (
          <>
            <div>
              <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">
                {plan.essential_label} (R$)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={centsToReais(form.essential_price_cents)}
                onChange={(e) =>
                  setForm((f) => ({ ...f, essential_price_cents: reaisToCents(e.target.value) }))
                }
                className="py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">
                {plan.recommended_label} (R$)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={centsToReais(form.recommended_price_cents)}
                onChange={(e) =>
                  setForm((f) => ({ ...f, recommended_price_cents: reaisToCents(e.target.value) }))
                }
                className="py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">
                Mensagem de economia
              </label>
              <Input
                value={form.savings_message}
                onChange={(e) => setForm((f) => ({ ...f, savings_message: e.target.value }))}
                className="py-2.5 text-sm"
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-4">
        <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">
          O que está incluso (uma linha por item)
        </label>
        <textarea
          value={form.features}
          onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
          rows={5}
          className="w-full rounded-xl border border-sage/20 bg-white/80 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-gold dark:bg-white/5 dark:text-offwhite"
        />
      </div>

      <Button className="mt-4" size="sm" loading={update.isPending} onClick={handleSave}>
        Salvar plano
      </Button>
    </Card>
  );
}

export function PricingEditor() {
  const { data: plans, isLoading } = useServicePlans();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
          <DollarSign className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-display text-xl text-ink dark:text-offwhite">Planos e valores</h2>
          <p className="font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Altere preços e o que está incluso em cada plano sem precisar de programação.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {(plans ?? []).map((plan) => (
          <PlanCard key={plan.key} plan={plan} />
        ))}
      </div>
    </div>
  );
}
