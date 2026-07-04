"use client";

import { useState } from "react";
import {
  Scale,
  Dumbbell,
  Zap,
  Salad,
  Sprout,
  Baby,
  MoreHorizontal,
} from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  PATIENT_OBJECTIVE_LABELS,
  type PatientObjective,
} from "@/types/booking";

const OBJECTIVE_ICONS: Record<PatientObjective, typeof Scale> = {
  emagrecimento: Scale,
  hipertrofia: Dumbbell,
  performance: Zap,
  reeducacao_alimentar: Salad,
  saude_intestinal: Sprout,
  gestacao: Baby,
  outro: MoreHorizontal,
};

export function ObjectiveStep() {
  const { data, setField, next, back } = useBookingStore();
  const [otherText, setOtherText] = useState(data.otherObjective ?? "");

  const canContinue =
    data.objective !== null && (data.objective !== "outro" || otherText.trim().length > 0);

  return (
    <StepShell title="Qual seu objetivo?" onBack={back} wide>
      <div className="space-y-3">
        {(Object.keys(PATIENT_OBJECTIVE_LABELS) as PatientObjective[]).map((objective) => (
          <RadioCard
            key={objective}
            label={PATIENT_OBJECTIVE_LABELS[objective]}
            icon={OBJECTIVE_ICONS[objective]}
            selected={data.objective === objective}
            onSelect={() => setField("objective", objective)}
          />
        ))}

        {data.objective === "outro" && (
          <Input
            autoFocus
            placeholder="Conte um pouco sobre seu objetivo"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
        )}

        <Button
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => {
            setField("otherObjective", otherText);
            next();
          }}
        >
          Continuar
        </Button>
      </div>
    </StepShell>
  );
}
