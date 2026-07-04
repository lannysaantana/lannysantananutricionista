"use client";

import { Search } from "lucide-react";
import type { AppointmentFilters } from "@/types/appointment";

interface Props {
  filters: AppointmentFilters;
  onChange: (filters: AppointmentFilters) => void;
}

export function AppointmentFiltersBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-sage/10 bg-white/70 p-4 dark:bg-white/5">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
        <input
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Buscar por nome, e-mail ou telefone"
          className="w-full rounded-xl border border-sage/15 bg-transparent py-2.5 pl-9 pr-3 font-sans text-sm text-ink outline-none focus:border-gold dark:text-offwhite"
        />
      </div>

      <select
        value={filters.status ?? "all"}
        onChange={(e) => onChange({ ...filters, status: e.target.value as AppointmentFilters["status"] })}
        className="rounded-xl border border-sage/15 bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold dark:text-offwhite"
      >
        <option value="all">Todos os status</option>
        <option value="pending">Pendente</option>
        <option value="confirmed">Confirmado</option>
        <option value="completed">Concluído</option>
        <option value="cancelled">Cancelado</option>
      </select>

      <select
        value={filters.consultationType ?? "all"}
        onChange={(e) =>
          onChange({ ...filters, consultationType: e.target.value as AppointmentFilters["consultationType"] })
        }
        className="rounded-xl border border-sage/15 bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold dark:text-offwhite"
      >
        <option value="all">Presencial e Teleconsulta</option>
        <option value="presencial">Presencial</option>
        <option value="teleconsulta">Teleconsulta</option>
      </select>

      <input
        type="date"
        value={filters.dateFrom ?? ""}
        onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
        className="rounded-xl border border-sage/15 bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold dark:text-offwhite"
      />
      <span className="text-ink/40">—</span>
      <input
        type="date"
        value={filters.dateTo ?? ""}
        onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
        className="rounded-xl border border-sage/15 bg-transparent px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold dark:text-offwhite"
      />
    </div>
  );
}
