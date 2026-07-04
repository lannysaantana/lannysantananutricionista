"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isBefore,
  addMonths,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useAvailableDatesInMonth, useSlotsForDate } from "@/hooks/useAvailableSlots";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { TimeSlot } from "@/types/booking";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

interface BookingCalendarProps {
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function BookingCalendar({
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
}: BookingCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));

  const { data: availableDates, isLoading: loadingDates } = useAvailableDatesInMonth(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth()
  );
  const { data: slots, isLoading: loadingSlots } = useSlotsForDate(selectedDate);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(visibleMonth));
    const end = endOfWeek(endOfMonth(visibleMonth));
    return eachDayOfInterval({ start, end });
  }, [visibleMonth]);

  const availableSet = useMemo(() => new Set(availableDates ?? []), [availableDates]);
  const today = useMemo(() => new Date(new Date().toDateString()), []);

  return (
    <div>
      <div className="rounded-2xl border border-sage/10 bg-white/70 p-5 shadow-soft dark:bg-white/5">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            aria-label="Mês anterior"
            onClick={() => setVisibleMonth((m) => subMonths(m, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-sage/10 dark:text-offwhite/60"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-display text-lg capitalize text-ink dark:text-offwhite">
            {format(visibleMonth, "MMMM yyyy", { locale: ptBR })}
          </span>
          <button
            type="button"
            aria-label="Próximo mês"
            onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-sage/10 dark:text-offwhite/60"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAY_LABELS.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="py-2 font-sans text-xs uppercase tracking-wide text-ink/40 dark:text-offwhite/40"
            >
              {label}
            </span>
          ))}

          {loadingDates
            ? Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-sage/5" />
              ))
            : days.map((day) => {
                const iso = format(day, "yyyy-MM-dd");
                const inMonth = isSameMonth(day, visibleMonth);
                const isPast = isBefore(day, today);
                const isAvailable = inMonth && !isPast && availableSet.has(iso);
                const isSelected = selectedDate === iso;

                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => onSelectDate(iso)}
                    className={cn(
                      "aspect-square rounded-lg font-sans text-sm transition-colors",
                      !inMonth && "text-transparent",
                      inMonth && !isAvailable && "text-ink/25 dark:text-offwhite/20",
                      isAvailable &&
                        !isSelected &&
                        "bg-sage/25 font-medium text-sage-dark hover:bg-sage/35 dark:bg-sage/20 dark:text-sage",
                      isSelected && "bg-gold text-ink shadow-gold"
                    )}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-sage/10 pt-4 font-sans text-xs text-ink/50 dark:text-offwhite/50">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sage/40" /> Disponível
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Selecionado
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6"
          >
            <p className="mb-3 flex items-center gap-2 font-sans text-sm font-medium text-ink dark:text-offwhite">
              <Clock className="h-4 w-4 text-gold" />
              Horários disponíveis
            </p>

            {loadingSlots ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {(slots ?? []).map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => onSelectSlot(slot)}
                    className={cn(
                      "rounded-xl border py-3 font-sans text-sm transition-colors",
                      !slot.available &&
                        "cursor-not-allowed border-transparent bg-sage/5 text-ink/25 dark:text-offwhite/20",
                      slot.available &&
                        selectedSlot?.id !== slot.id &&
                        "border-sage/20 text-ink hover:border-sage/50 dark:text-offwhite",
                      selectedSlot?.id === slot.id &&
                        "border-gold bg-gold/10 text-ink shadow-gold dark:text-offwhite"
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
                {slots && slots.length === 0 && (
                  <p className="col-span-full py-4 text-center font-sans text-sm text-ink/50 dark:text-offwhite/50">
                    Nenhum horário disponível neste dia.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
