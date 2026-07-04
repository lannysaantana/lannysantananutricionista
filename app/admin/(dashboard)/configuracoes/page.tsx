import type { Metadata } from "next";
import { BusinessHoursEditor } from "@/components/admin/BusinessHoursEditor";
import { BlockedDatesManager } from "@/components/admin/BlockedDatesManager";

export const metadata: Metadata = {
  title: "Configurações de agenda",
  robots: { index: false, follow: false },
};

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink dark:text-offwhite">
          Configurações de agenda
        </h1>
        <p className="mt-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          Defina quais dias e horários ficam disponíveis para os pacientes agendarem.
        </p>
      </div>

      <BusinessHoursEditor />
      <BlockedDatesManager />
    </div>
  );
}
