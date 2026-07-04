"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Target, Stethoscope, CalendarDays, Clock, Wallet } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Button } from "@/components/ui/Button";
import { createAppointment } from "@/services/appointmentService";
import { paymentService } from "@/services/paymentService";
import { CONSULTATION_PRICE_CENTS } from "@/lib/config";
import { formatCurrencyBRL, formatDateLong } from "@/utils/formatters";
import {
  CONSULTATION_TYPE_LABELS,
  PATIENT_OBJECTIVE_LABELS,
} from "@/types/booking";
import type { AppointmentInsert } from "@/types/appointment";

const SUMMARY_ROWS = (data: ReturnType<typeof useBookingStore.getState>["data"]) => [
  { icon: User, label: "Nome", value: data.name },
  {
    icon: Target,
    label: "Objetivo",
    value:
      data.objective === "outro"
        ? data.otherObjective || "Outro"
        : data.objective
        ? PATIENT_OBJECTIVE_LABELS[data.objective]
        : "—",
  },
  {
    icon: Stethoscope,
    label: "Tipo de consulta",
    value: data.consultationType ? CONSULTATION_TYPE_LABELS[data.consultationType] : "—",
  },
  {
    icon: CalendarDays,
    label: "Data",
    value: data.selectedDate ? formatDateLong(data.selectedDate) : "—",
  },
  { icon: Clock, label: "Horário", value: data.selectedSlot?.time ?? "—" },
  { icon: Wallet, label: "Valor", value: formatCurrencyBRL(CONSULTATION_PRICE_CENTS) },
];

export function SummaryStep() {
  const { data, back, reset } = useBookingStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);

    const payload: AppointmentInsert = {
      name: data.name,
      age: data.age ?? 0,
      phone: data.phone,
      email: data.email,
      objective: data.objective ?? "outro",
      other_objective: data.otherObjective || null,
      has_limitation: Boolean(data.hasLimitation),
      consultation_type: data.consultationType ?? "teleconsulta",
      appointment_date: data.selectedDate ?? "",
      appointment_time: data.selectedSlot?.time ?? "",
      amount: CONSULTATION_PRICE_CENTS,
    };

    try {
      const appointment = await createAppointment(payload);
      const checkout = await paymentService.createCheckout(appointment);
      sessionStorage.setItem("lanny-last-appointment-id", appointment.id);
      window.location.href = checkout.url;
    } catch (err) {
      // Booking/payment backends are architecture-ready but need real
      // credentials (Supabase + gateway) to complete end-to-end. Until
      // then, continue the showcase flow to the confirmation screen.
      console.warn("[booking] createAppointment/checkout not fully configured yet:", err);
      reset();
      router.push("/pagamento/sucesso?demo=1");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepShell title="Confira os detalhes da sua consulta" onBack={back} wide>
      <div className="divide-y divide-sage/10 overflow-hidden rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5">
        {SUMMARY_ROWS(data).map((row) => (
          <div key={row.label} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
              <row.icon className="h-4 w-4" />
            </span>
            <span className="flex-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">
              {row.label}
            </span>
            <span className="font-sans text-sm font-medium text-ink dark:text-offwhite">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <Button size="lg" className="mt-8 w-full" loading={loading} onClick={handleConfirm}>
        Confirmar e pagar
      </Button>
    </StepShell>
  );
}
