"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useBusinessHours, useUpdateBusinessHours } from "@/hooks/useAvailability";
import { WEEKDAY_LABELS, WEEKDAY_ORDER, type BusinessHoursUpdate } from "@/types/availability";
import { cn } from "@/lib/utils";

const DURATIONS = [30, 45, 60, 90, 120];

export function BusinessHoursEditor() {
  const { data, isLoading } = useBusinessHours();
  const update = useUpdateBusinessHours();
  const [rows, setRows] = useState<BusinessHoursUpdate[]>([]);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setRows(
        data.map((d) => ({
          weekday: d.weekday,
          is_open: d.is_open,
          start_time: d.start_time.slice(0, 5),
          end_time: d.end_time.slice(0, 5),
          slot_duration_minutes: d.slot_duration_minutes,
        }))
      );
    }
  }, [data]);

  function patchRow(weekday: number, changes: Partial<BusinessHoursUpdate>) {
    setRows((prev) => prev.map((r) => (r.weekday === weekday ? { ...r, ...changes } : r)));
  }

  async function handleSave() {
    await Promise.all(rows.map((row) => update.mutateAsync(row)));
    setSavedAt(Date.now());
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <Card>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
          <Clock className="h-4 w-4" />
        </span>
        <div>
          <CardTitle>Dias e horários de atendimento</CardTitle>
          <CardDescription>Controla o que aparece disponível para o paciente agendar.</CardDescription>
        </div>
      </div>

      <div className="space-y-2">
        {WEEKDAY_ORDER.map((weekday) => {
          const row = rows.find((r) => r.weekday === weekday);
          if (!row) return null;

          return (
            <div
              key={weekday}
              className={cn(
                "flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                row.is_open ? "border-sage/20 bg-sage/5" : "border-sage/10 bg-transparent opacity-60"
              )}
            >
              <label className="flex w-36 shrink-0 items-center gap-2 font-sans text-sm font-medium text-ink dark:text-offwhite">
                <input
                  type="checkbox"
                  checked={row.is_open}
                  onChange={(e) => patchRow(weekday, { is_open: e.target.checked })}
                  className="h-4 w-4 accent-sage-dark"
                />
                {WEEKDAY_LABELS[weekday]}
              </label>

              <input
                type="time"
                value={row.start_time}
                disabled={!row.is_open}
                onChange={(e) => patchRow(weekday, { start_time: e.target.value })}
                className="rounded-lg border border-sage/20 bg-transparent px-2 py-1.5 font-sans text-sm text-ink outline-none focus:border-gold disabled:opacity-40 dark:text-offwhite"
              />
              <span className="text-ink/40 dark:text-offwhite/40">até</span>
              <input
                type="time"
                value={row.end_time}
                disabled={!row.is_open}
                onChange={(e) => patchRow(weekday, { end_time: e.target.value })}
                className="rounded-lg border border-sage/20 bg-transparent px-2 py-1.5 font-sans text-sm text-ink outline-none focus:border-gold disabled:opacity-40 dark:text-offwhite"
              />

              <select
                value={row.slot_duration_minutes}
                disabled={!row.is_open}
                onChange={(e) =>
                  patchRow(weekday, { slot_duration_minutes: Number(e.target.value) })
                }
                className="rounded-lg border border-sage/20 bg-transparent px-2 py-1.5 font-sans text-sm text-ink outline-none focus:border-gold disabled:opacity-40 dark:text-offwhite"
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d} min por consulta
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Button loading={update.isPending} onClick={handleSave}>
          Salvar horários
        </Button>
        {savedAt && !update.isPending && (
          <span className="font-sans text-sm text-sage-dark dark:text-gold">Salvo!</span>
        )}
      </div>
    </Card>
  );
}
