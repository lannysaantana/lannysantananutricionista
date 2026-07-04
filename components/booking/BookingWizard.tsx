"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBookingStore } from "@/hooks/useBookingStore";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Logo } from "@/components/ui/Logo";
import { NameStep } from "@/components/booking/steps/NameStep";
import { AgeStep } from "@/components/booking/steps/AgeStep";
import { PhoneStep } from "@/components/booking/steps/PhoneStep";
import { EmailStep } from "@/components/booking/steps/EmailStep";
import { ObjectiveStep } from "@/components/booking/steps/ObjectiveStep";
import { LimitationStep } from "@/components/booking/steps/LimitationStep";
import { ConsultationTypeStep } from "@/components/booking/steps/ConsultationTypeStep";
import { CalendarStep } from "@/components/booking/steps/CalendarStep";
import { SummaryStep } from "@/components/booking/steps/SummaryStep";
import type { BookingStep } from "@/types/booking";

const STEP_COMPONENTS: Record<BookingStep, React.ComponentType> = {
  nome: NameStep,
  idade: AgeStep,
  telefone: PhoneStep,
  email: EmailStep,
  objetivo: ObjectiveStep,
  limitacao: LimitationStep,
  tipo_consulta: ConsultationTypeStep,
  agenda: CalendarStep,
  resumo: SummaryStep,
};

export function BookingWizard() {
  const step = useBookingStore((s) => s.step);
  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div className="min-h-screen bg-noise px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" aria-label="Início">
            <Logo />
          </Link>
        </div>

        <div className="mb-10">
          <ProgressBar currentStep={step} />
        </div>

        <AnimatePresence mode="wait">
          <div key={step}>
            <StepComponent />
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
