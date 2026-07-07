import type { Metadata } from "next";
import { BusinessHoursEditor } from "@/components/admin/BusinessHoursEditor";
import { BlockedDatesManager } from "@/components/admin/BlockedDatesManager";
import { PricingEditor } from "@/components/admin/PricingEditor";
import { CardSurchargeEditor } from "@/components/admin/CardSurchargeEditor";

export const metadata: Metadata = {
  title: "Configurações",
  robots: { index: false, follow: false },
};

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink dark:text-offwhite">Configurações</h1>
        <p className="mt-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          Ajuste agenda, planos e pagamento sem precisar mexer no código.
        </p>
      </div>

      <BusinessHoursEditor />
      <BlockedDatesManager />
      <PricingEditor />
      <CardSurchargeEditor />
    </div>
  );
}
