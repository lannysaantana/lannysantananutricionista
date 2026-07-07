"use client";

import { useState } from "react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import type { TimeSlot } from "@/types/booking";

function SessionScheduler({ sessionIndex }: { sessionIndex: number }) {
  const { data, scheduleCurrentSession, back } = useBookingStore();
  const session = data.sessions[sessionIndex];
  const [pickedDate, setPickedDate] = useState<string | null>(session?.date ?? null);

  if (!session) return null;

  const isFirst = sessionIndex === 0;
  const selectedSlot: TimeSlot | null =
    session.date && session.time
      ? { id: `${session.date}-${session.time}`, date: session.date, time: session.time, available: true }
      : null;

  return (
    <StepShell
      title={`Sessão ${sessionIndex + 1} de ${data.sessions.length}: ${session.label}`}
      subtitle={
        isFirst
          ? "Esse horário será reservado exclusivamente para você."
          : `Sugestão: agende aproximadamente ${session.suggestedOffsetDays} dias após a sessão anterior.`
      }
      onBack={back}
      wide
    >
      <BookingCalendar
        selectedDate={pickedDate}
        selectedSlot={selectedSlot}
        onSelectDate={(date) => setPickedDate(date)}
        onSelectSlot={(slot) => scheduleCurrentSession(slot.date, slot.time)}
      />
    </StepShell>
  );
}

export function AgendaSessoesStep() {
  const currentSessionIndex = useBookingStore((s) => s.data.currentSessionIndex);
  return <SessionScheduler key={currentSessionIndex} sessionIndex={currentSessionIndex} />;
}
