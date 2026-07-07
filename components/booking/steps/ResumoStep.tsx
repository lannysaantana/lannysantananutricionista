"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Target, CalendarDays, Clock, Wallet, CreditCard } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { useServicePlans, usePaymentSettings } from "@/hooks/usePricing";
import { StepShell } from "@/components/booking/StepShell";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { createOrder, createOrderSessions } from "@/services/orderService";
import { paymentService } from "@/services/paymentService";
import { getSelectedPriceCents, applyCardSurcharge } from "@/lib/packages";
import { formatCurrencyBRL, formatDateLong } from "@/utils/formatters";
import { PATIENT_OBJECTIVE_LABELS } from "@/types/booking";
import type { OrderInsert, OrderSessionInsert } from "@/types/order";

export function ResumoStep() {
  const { data, back, reset } = useBookingStore();
  const { data: plans, isLoading: loadingPlans } = useServicePlans(true);
  const { data: paymentSettings, isLoading: loadingSettings } = usePaymentSettings();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const plan = plans?.find((p) => p.key === data.resolvedPlan);

  if (loadingPlans || loadingSettings || !plan || !paymentSettings) {
    return (
      <StepShell title="Confira os detalhes do seu atendimento" onBack={back} wide>
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

    const payload: OrderInsert = {
      name: data.name,
      age: data.age ?? 0,
      phone: data.phone,
      email: data.email,
      objective: data.objective ?? "outro",
      other_objective: data.otherObjective || null,
      has_locomotion_limitation: Boolean(data.hasLocomotionLimitation),
      service_plan_key: data.resolvedPlan ?? "presencial",
      selected_tier: data.tier,
      payment_method: data.paymentMethod ?? "pix",
      accepted_reschedule_policy: data.acceptedReschedulePolicy,
      accepted_cancellation_policy: data.acceptedCancellationPolicy,
      amount_cents: amount,
    };

    try {
      const order = await createOrder(payload);

      const sessionsPayload: OrderSessionInsert[] = data.sessions.map((s) => ({
        order_id: order.id,
        session_key: s.key,
        label: s.label,
        sequence: s.sequence,
        session_date: s.date ?? "",
        session_time: s.time ?? "",
      }));
      await createOrderSessions(sessionsPayload);

      const checkout = await paymentService.createCheckout({
        id: order.id,
        amount_cents: order.amount_cents,
      });

      sessionStorage.setItem("lanny-last-order-id", order.id);
      window.location.href = checkout.url;
    } catch (err) {
      console.warn("[booking] createOrder/checkout not fully configured yet:", err);
      reset();
      router.push("/pagamento/sucesso?demo=1");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepShell title="Confira os detalhes do seu atendimento" onBack={back} wide>
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
