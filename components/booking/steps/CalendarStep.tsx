"use client";

import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { Button } from "@/components/ui/Button";

export function CalendarStep() {
  const { data, setField, next, back } = useBookingStore();

  return (
    <StepShell
      title="Escolha o melhor dia e horário"
      subtitle="Os horários exibidos já refletem a disponibilidade real da agenda."
      onBack={back}
      wide
    >
      <BookingCalendar
        selectedDate={data.selectedDate}
        selectedSlot={data.selectedSlot}
        onSelectDate={(date) => {
          setField("selectedDate", date);
          setField("selectedSlot", null);
        }}
        onSelectSlot={(slot) => setField("selectedSlot", slot)}
      />

      <Button
        size="lg"
        className="mt-8 w-full"
        disabled={!data.selectedDate || !data.selectedSlot}
        onClick={next}
      >
        Continuar
      </Button>
    </StepShell>
  );
}
