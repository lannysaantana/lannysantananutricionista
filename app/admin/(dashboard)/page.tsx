"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Users, BadgeCheck, Wallet } from "lucide-react";
import { AppointmentFiltersBar } from "@/components/admin/AppointmentFilters";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { ExportButtons } from "@/components/admin/ExportButtons";
import { Card } from "@/components/ui/Card";
import { useAppointments } from "@/hooks/useAppointments";
import { formatCurrencyBRL } from "@/utils/formatters";
import type { AppointmentFilters } from "@/types/appointment";

export default function AdminDashboardPage() {
  const [filters, setFilters] = useState<AppointmentFilters>({ status: "all", consultationType: "all" });
  const { data: appointments = [], isLoading } = useAppointments(filters);

  const stats = useMemo(() => {
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const revenue = appointments
      .filter((a) => a.payment_status === "paid")
      .reduce((sum, a) => sum + a.amount, 0);
    return { total: appointments.length, confirmed, revenue };
  }, [appointments]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink dark:text-offwhite">Agenda de consultas</h1>
        <p className="mt-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          Gerencie pacientes, pagamentos e horários.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Total no período</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.total}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <BadgeCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Confirmadas</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.confirmed}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Faturamento pago</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">
              {formatCurrencyBRL(stats.revenue)}
            </p>
          </div>
        </Card>
      </div>

      <AppointmentFiltersBar filters={filters} onChange={setFilters} />

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          <CalendarClock className="h-4 w-4" />
          {appointments.length} agendamento(s)
        </p>
        <ExportButtons appointments={appointments} />
      </div>

      <AppointmentsTable appointments={appointments} isLoading={isLoading} />
    </div>
  );
}
