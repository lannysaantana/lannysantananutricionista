"use client";

import { useState } from "react";
import { differenceInYears } from "date-fns";
import { User, Target, CalendarDays, Clock, Wallet, CreditCard, AlertCircle } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { useServicePlans, usePaymentSettings } from "@/hooks/usePricing";
import { StepShell } from "@/components/booking/StepShell";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { paymentService } from "@/services/paymentService";
import { getSelectedPriceCents, applyCardSurcharge } from "@/lib/packages";
import { formatCurrencyBRL, formatDateLong } from "@/utils/formatters";
import { PATIENT_OBJECTIVE_LABELS } from "@/types/booking";
import type { OrderInsert } from "@/types/order";

export function ResumoStep() {
  const { data, back } = useBookingStore();
  const { data: plans, isLoading: loadingPlans } = useServicePlans(true);
  const { data: paymentSettings, isLoading: loadingSettings } = usePaymentSettings();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = plans?.find((p) => p.key === data.plan);

  if (loadingPlans || loadingSettings || !plan || !paymentSettings) {
    return (
      <StepShell
      title="Confira os detalhes do seu atendimento"
      subtitle="Prontinho! Vamos começar essa jornada juntas rumo aos seus objetivos."
      onBack={back}
      wide
    >
        <LoadingSpinner />
      </StepShell>
    );
  }

  const baseAmount = getSelectedPriceCents(plan, data.tier);
  const amount =
    data.paymentMethod === "cartao"
      ? applyCardSurcharge(baseAmount, paymentSettings.card_surcharge_percent)
      : baseAmount;

  const tierLabel =
    data.tier === "recommended"
      ? plan.recommended_label
      : data.tier === "essential"
        ? plan.essential_label
        : null;

  async function handleConfirm() {
    setLoading(true);
    setError(null);

    const payload: OrderInsert = {
      name: data.name,
      age: data.birthDate ? differenceInYears(new Date(), new Date(`${data.birthDate}T00:00:00`)) : 0,
      birth_date: data.birthDate || null,
      sex: data.sex,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      city: data.city,
      state: data.state,
      profession: data.profession,
      objective: data.objective ?? "outro",
      other_objective: data.otherObjective || null,
      height_cm: data.heightCm,
      weight_kg: data.weightKg,
      medications_in_use: data.medicationsInUse || null,
      uses_glp1: Boolean(data.usesGlp1),
      glp1_medication: data.usesGlp1 ? data.glp1Medication || null : null,
      has_locomotion_limitation: Boolean(data.hasPhysicalLimitation),
      service_plan_key: data.plan ?? "consulta_online",
      selected_tier: data.tier,
      payment_method: data.paymentMethod ?? "pix",
      accepted_reschedule_policy: data.acceptedReschedulePolicy,
      accepted_cancellation_policy: data.acceptedCancellationPolicy,
      amount_cents: amount,
    };

    try {
      const sessionsPayload = data.sessions.map((s) => ({
        session_key: s.key,
        label: s.label,
        sequence: s.sequence,
        session_date: s.date ?? "",
        session_time: s.time ?? "",
      }));

      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: payload, sessions: sessionsPayload }),
      });

      if (!orderResponse.ok) {
        const body = await orderResponse.json().catch(() => ({}));
        throw new Error(body.error ?? "Não foi possível criar o pedido.");
      }

      const order: { id: string; amount_cents: number } = await orderResponse.json();
      sessionStorage.setItem("lanny-last-order-id", order.id);

      if (data.paymentMethod === "pix") {
        window.location.href = `/pagamento/pix?order_id=${order.id}&amount=${order.amount_cents}`;
        return;
      }

      const checkout = await paymentService.createCheckout({
        id: order.id,
        amount_cents: order.amount_cents,
      });

      window.location.href = checkout.url;
    } catch (err) {
      console.error("[booking] Falha ao criar pedido/checkout:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível iniciar o pagamento. Tente novamente em instantes."
      );
      setLoading(false);
    }
  }

  return (
    <StepShell
      title="Confira os detalhes do seu atendimento"
      subtitle="Prontinho! Vamos começar essa jornada juntas rumo aos seus objetivos."
      onBack={back}
      wide
    >
      <div className="divide-y divide-sage/10 overflow-hidden rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5">
        <SummaryRow icon={User} label="Nome" value={data.name} />
        <SummaryRow
          icon={Target}
          label="Objetivo"
          value={data.objective ? PATIENT_OBJECTIVE_LABELS[data.objective] : "—"}
        />
        <SummaryRow
          icon={CalendarDays}
          label="Serviço"
          value={tierLabel ? `${plan.name} — ${tierLabel}` : plan.name}
        />
        <SummaryRow
          icon={data.paymentMethod === "cartao" ? CreditCard : Wallet}
          label="Pagamento"
          value={data.paymentMethod === "cartao" ? "Cartão de crédito" : "Pix"}
        />
        <SummaryRow icon={Wallet} label="Valor total" value={formatCurrencyBRL(amount)} />
      </div>

      <div className="mt-6 space-y-2">
        <p className="font-sans text-sm font-medium text-ink dark:text-offwhite">
          Consultas e horários agendados
        </p>
        <div className="divide-y divide-sage/10 overflow-hidden rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5">
          {data.sessions.map((session) => (
            <div key={session.key} className="flex items-center gap-4 px-5 py-3">
              <Clock className="h-4 w-4 shrink-0 text-sage-dark dark:text-gold" />
              <span className="flex-1 font-sans text-sm text-ink/70 dark:text-offwhite/70">
                {session.label}
              </span>
              <span className="font-sans text-sm font-medium text-ink dark:text-offwhite">
                {session.date ? formatDateLong(session.date) : "—"} {session.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 font-sans text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <Button size="lg" className="mt-8 w-full" loading={loading} onClick={handleConfirm}>
        Confirmar e pagar
      </Button>
    </StepShell>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">{label}</span>
      <span className="font-sans text-sm font-medium text-ink dark:text-offwhite">{value}</span>
    </div>
  );
}
