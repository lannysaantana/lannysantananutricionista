"use client";

import { Building2, Video } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { Button } from "@/components/ui/Button";
import { CONSULTATION_TYPE_LABELS, type ConsultationType } from "@/types/booking";

export function ConsultationTypeStep() {
  const { data, setField, next, back } = useBookingStore();

  return (
    <StepShell title="Como prefere ser atendido(a)?" onBack={back}>
      <div className="space-y-3">
        <RadioCard
          label={CONSULTATION_TYPE_LABELS.presencial}
          description="No consultório, com todo o conforto."
          icon={Building2}
          selected={data.consultationType === "presencial"}
          onSelect={() => setField("consultationType", "presencial" as ConsultationType)}
        />
        <RadioCard
          label={CONSULTATION_TYPE_LABELS.teleconsulta}
          description="Por videochamada, onde você estiver."
          icon={Video}
          selected={data.consultationType === "teleconsulta"}
          onSelect={() => setField("consultationType", "teleconsulta" as ConsultationType)}
        />

        <Button
          size="lg"
          className="w-full"
          disabled={data.consultationType === null}
          onClick={next}
        >
          Continuar
        </Button>
      </div>
    </StepShell>
  );
}
