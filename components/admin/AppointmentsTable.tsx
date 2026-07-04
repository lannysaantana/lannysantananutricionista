"use client";

import { useState } from "react";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import { StatusBadge, PaymentBadge } from "@/components/admin/StatusBadge";
import { EditAppointmentModal } from "@/components/admin/EditAppointmentModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAppointmentMutations } from "@/hooks/useAppointments";
import { formatDateShort, formatCurrencyBRL } from "@/utils/formatters";
import { CONSULTATION_TYPE_LABELS, PATIENT_OBJECTIVE_LABELS } from "@/types/booking";
import type { Appointment } from "@/types/appointment";

interface Props {
  appointments: Appointment[];
  isLoading: boolean;
}

export function AppointmentsTable({ appointments, isLoading }: Props) {
  const { cancel, confirmPayment } = useAppointmentMutations();
  const [editing, setEditing] = useState<Appointment | null>(null);

  if (isLoading) return <LoadingSpinner />;

  if (appointments.length === 0) {
    return (
      <p className="py-16 text-center font-sans text-sm text-ink/50 dark:text-offwhite/50">
        Nenhum agendamento encontrado para os filtros selecionados.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5">
        <table className="w-full min-w-[880px] text-left font-sans text-sm">
          <thead>
            <tr className="border-b border-sage/10 text-xs uppercase tracking-wide text-ink/50 dark:text-offwhite/50">
              <th className="px-4 py-3 font-medium">Paciente</th>
              <th className="px-4 py-3 font-medium">Data / Horário</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Objetivo</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Pagamento</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-sage/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-ink dark:text-offwhite">{appointment.name}</p>
                  <p className="text-xs text-ink/50 dark:text-offwhite/50">{appointment.email}</p>
                </td>
                <td className="px-4 py-3 text-ink/80 dark:text-offwhite/80">
                  {formatDateShort(appointment.appointment_date)} · {appointment.appointment_time}
                </td>
                <td className="px-4 py-3 text-ink/80 dark:text-offwhite/80">
                  {CONSULTATION_TYPE_LABELS[appointment.consultation_type]}
                </td>
                <td className="px-4 py-3 text-ink/80 dark:text-offwhite/80">
                  {PATIENT_OBJECTIVE_LABELS[appointment.objective]}
                </td>
                <td className="px-4 py-3 text-ink/80 dark:text-offwhite/80">
                  {formatCurrencyBRL(appointment.amount)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="px-4 py-3">
                  <PaymentBadge status={appointment.payment_status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      title="Confirmar pagamento"
                      onClick={() => confirmPayment.mutate(appointment.id)}
                      className="rounded-full p-2 text-sage-dark hover:bg-sage/10 dark:text-gold disabled:opacity-30"
                      disabled={appointment.payment_status === "paid"}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      title="Editar"
                      onClick={() => setEditing(appointment)}
                      className="rounded-full p-2 text-ink/60 hover:bg-sage/10 dark:text-offwhite/60"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      title="Cancelar"
                      onClick={() => cancel.mutate(appointment.id)}
                      className="rounded-full p-2 text-red-500 hover:bg-red-50 disabled:opacity-30"
                      disabled={appointment.status === "cancelled"}
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditAppointmentModal appointment={editing} onClose={() => setEditing(null)} />
    </>
  );
}
