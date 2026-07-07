import type { ServicePlanKey, PaymentMethod, PlanTier, PendingSession } from "./order";

/**
 * Domain types for the multi-step booking wizard (client-side state).
 */

export type PatientObjective =
  | "emagrecimento"
  | "hipertrofia"
  | "performance"
  | "reeducacao_alimentar"
  | "saude_intestinal"
  | "gestacao"
  | "outro";

export const PATIENT_OBJECTIVE_LABELS: Record<PatientObjective, string> = {
  emagrecimento: "Emagrecimento",
  hipertrofia: "Hipertrofia",
  performance: "Performance",
  reeducacao_alimentar: "Reeducação alimentar",
  saude_intestinal: "Saúde intestinal",
  gestacao: "Gestação",
  outro: "Outro",
};

export interface TimeSlot {
  /** ISO date, e.g. "2026-07-10" */
  date: string;
  /** 24h time, e.g. "14:30" */
  time: string;
  /** Unique identifier from the calendar provider */
  id: string;
  available: boolean;
}

export interface BookingFormData {
  name: string;
  age: number | null;
  phone: string;
  email: string;
  objective: PatientObjective | null;
  otherObjective?: string;

  /** Raw pick from the 5-card service step, before the limitation override. */
  selectedPlan: ServicePlanKey | null;
  hasLocomotionLimitation: boolean | null;
  /** selectedPlan, unless the limitation forces teleconsulta. */
  resolvedPlan: ServicePlanKey | null;
  tier: PlanTier;

  paymentMethod: PaymentMethod | null;

  sessions: PendingSession[];
  currentSessionIndex: number;

  acceptedReschedulePolicy: boolean;
  acceptedCancellationPolicy: boolean;
}

export const INITIAL_BOOKING_DATA: BookingFormData = {
  name: "",
  age: null,
  phone: "",
  email: "",
  objective: null,
  otherObjective: "",
  selectedPlan: null,
  hasLocomotionLimitation: null,
  resolvedPlan: null,
  tier: "base",
  paymentMethod: null,
  sessions: [],
  currentSessionIndex: 0,
  acceptedReschedulePolicy: false,
  acceptedCancellationPolicy: false,
};

/** Ordered step identifiers driving the wizard's progress bar. */
export type BookingStep =
  | "nome"
  | "idade"
  | "telefone"
  | "email"
  | "objetivo"
  | "servico"
  | "limitacao"
  | "pacote"
  | "pagamento_metodo"
  | "agenda_sessoes"
  | "politicas"
  | "resumo";

export interface BookingProgressGroup {
  key: "dados" | "servico" | "pagamento" | "agenda" | "confirmacao";
  label: string;
  steps: BookingStep[];
}

export const BOOKING_PROGRESS_GROUPS: BookingProgressGroup[] = [
  { key: "dados", label: "Dados", steps: ["nome", "idade", "telefone", "email", "objetivo"] },
  { key: "servico", label: "Serviço", steps: ["servico", "limitacao", "pacote"] },
  { key: "pagamento", label: "Pagamento", steps: ["pagamento_metodo"] },
  { key: "agenda", label: "Agenda", steps: ["agenda_sessoes"] },
  { key: "confirmacao", label: "Confirmação", steps: ["politicas", "resumo"] },
];
