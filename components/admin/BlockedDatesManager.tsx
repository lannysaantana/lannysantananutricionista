"use client";

import { useState } from "react";
import { CalendarOff, Trash2 } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useBlockedDateMutations, useBlockedDates } from "@/hooks/useAvailability";
import { formatDateLong } from "@/utils/formatters";

export function BlockedDatesManager() {
  const { data: blockedDates, isLoading } = useBlockedDates();
  const { add, remove } = useBlockedDateMutations();
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  async function handleAdd() {
    if (!date) return;
    await add.mutateAsync({ date, reason: reason.trim() || undefined });
    setDate("");
    setReason("");
  }

  return (
    <Card>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
          <CalendarOff className="h-4 w-4" />
        </span>
        <div>
          <CardTitle>Dias bloqueados</CardTitle>
          <CardDescription>Feriados, férias ou qualquer dia específico sem atendimento.</CardDescription>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[160px]">
          <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">Data</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="py-2.5 text-sm" />
        </div>
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block font-sans text-xs text-ink/60 dark:text-offwhite/60">
            Motivo (opcional)
          </label>
          <Input
            placeholder="Ex: Feriado, viagem..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="py-2.5 text-sm"
          />
        </div>
        <Button size="sm" disabled={!date} loading={add.isPending} onClick={handleAdd}>
          Bloquear data
        </Button>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : blockedDates && blockedDates.length > 0 ? (
          <ul className="divide-y divide-sage/10 overflow-hidden rounded-xl border border-sage/10">
            {blockedDates.map((b) => (
              <li key={b.date} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-sans text-sm font-medium capitalize text-ink dark:text-offwhite">
                    {formatDateLong(b.date)}
                  </p>
                  {b.reason && (
                    <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">{b.reason}</p>
                  )}
                </div>
                <button
                  onClick={() => remove.mutate(b.date)}
                  className="rounded-full p-2 text-red-500 hover:bg-red-50"
                  title="Remover bloqueio"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-sans text-sm text-ink/50 dark:text-offwhite/50">
            Nenhum dia bloqueado no momento.
          </p>
        )}
      </div>
    </Card>
  );
}
