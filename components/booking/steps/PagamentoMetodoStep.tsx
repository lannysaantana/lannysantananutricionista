"use client";

import { Wallet, CreditCard, AlertCircle } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { useServicePlans, usePaymentSettings } from "@/hooks/usePricing";
import { StepShell } from "@/components/booking/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getSelectedPriceCents, applyCardSurcharge } from "@/lib/packages";
import { formatCurrencyBRL } from "@/utils/formatters";

export function PagamentoMetodoStep() {
  const { data, choosePaymentMethod, back } = useBookingStore();
  const { data: plans, isLoading: loadingPlans } = useServicePlans(true);
  const { data: paymentSettings, isLoading: loadingSettings } = usePaymentSettings();

  const plan = plans?.find((p) => p.key === data.resolvedPlan);

  if (loadingPlans || loadingSettings || !plan || !paymentSettings) {
    return (
      <StepShell title="Como você prefere pagar?" onBack={back}>
        <LoadingSpinner />
      </StepShell>
    );
  }

  const baseAmount = getSelectedPriceCents(plan, data.tier);
  const cardAmount = applyCardSurcharge(baseAmount, paymentSettings.card_surcharge_percent);

  return (
    <StepShell title="Como você prefere pagar?" onBack={back}>
      <div className="space-y-3">
        <RadioCard
          label="Pix"
          description={`${formatCurrencyBRL(baseAmount)} · valor integral, sem acréscimo`}
          icon={Wallet}
          selected={data.paymentMethod === "pix"}
          onSelect={() => choosePaymentMethod("pix")}
        />
        <RadioCard
          label="Cartão de crédito"
          description={`${formatCurrencyBRL(cardAmount)} · parcelamento disponível`}
          icon={CreditCard}
          selected={data.paymentMethod === "cartao"}
          onSelect={() => choosePaymentMethod("cartao")}
        />
      </div>

      {data.paymentMethod === "cartao" && paymentSettings.card_surcharge_percent > 0 && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-gold/10 p-3 font-sans text-xs text-ink/70 dark:text-offwhite/70">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          Pagamentos realizados no cartão poderão sofrer acréscimos conforme a
          forma de parcelamento.
        </p>
      )}
    </StepShell>
  );
}
