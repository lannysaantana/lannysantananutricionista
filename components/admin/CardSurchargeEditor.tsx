"use client";

import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { usePaymentSettings, useUpdateCardSurcharge } from "@/hooks/usePricing";

export function CardSurchargeEditor() {
  const { data, isLoading } = usePaymentSettings();
  const update = useUpdateCardSurcharge();
  const [percent, setPercent] = useState("0");

  useEffect(() => {
    if (data) setPercent(String(data.card_surcharge_percent));
  }, [data]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
          <CreditCard className="h-4 w-4" />
        </span>
        <div>
          <CardTitle>Acréscimo no cartão</CardTitle>
          <CardDescription>
            Aplicado automaticamente sobre o valor total quando o paciente escolhe cartão.
          </CardDescription>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-32">
          <input
            type="text"
            inputMode="decimal"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-full rounded-xl border border-sage/20 bg-white/80 px-4 py-2.5 pr-8 font-sans text-sm text-ink outline-none focus:border-gold dark:bg-white/5 dark:text-offwhite"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-sans text-sm text-ink/40">
            %
          </span>
        </div>
        <Button
          size="sm"
          loading={update.isPending}
          onClick={() => update.mutate(Number(percent.replace(",", ".")) || 0)}
        >
          Salvar
        </Button>
      </div>
    </Card>
  );
}
