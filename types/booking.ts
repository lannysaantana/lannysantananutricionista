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

export type PatientSex = "feminino" | "masculino" | "prefiro_nao_informar";

export const PATIENT_SEX_LABELS: Record<PatientSex, string> = {
  feminino: "Feminino",
  masculino: "Masculino",
  prefiro_nao_informar: "Prefiro não informar",
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
  birthDate: string; // ISO date, e.g. "1990-05-20"
  sex: PatientSex | null;

  phone: string;
  whatsapp: string;
  email: string;

  city: string;
  state: string;
  profession: string;

  objective: PatientObjective | null;
  otherObjective?: string;

  heightCm: number | null;
  weightKg: number | null;
  medicationsInUse: string;
  usesGlp1: boolean | null;
  glp1Medication?: string;
  hasPhysicalLimitation: boolean | null;

  /** Teleconsulta-only — all active plans use the same session flow. */
  plan: ServicePlanKey | null;
  tier: PlanTier;

  paymentMethod: PaymentMethod | null;

  sessions: PendingSession[];
  currentSessionIndex: number;

  acceptedReschedulePolicy: boolean;
  acceptedCancellationPolicy: boolean;
}

export const INITIAL_BOOKING_DATA: BookingFormData = {
  name: "",
  birthDate: "",
  sex: null,
  phone: "",
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  profession: "",
  objective: null,
  otherObjective: "",
  heightCm: null,
  weightKg: null,
  medicationsInUse: "",
  usesGlp1: null,
  glp1Medication: "",
  hasPhysicalLimitation: null,
  plan: null,
  tier: "base",
  paymentMethod: null,
  sessions: [],
  currentSessionIndex: 0,
  acceptedReschedulePolicy: false,
  acceptedCancellationPolicy: false,
};

/** Ordered step identifiers driving the wizard's progress bar. */
export type BookingStep =
  | "dados_pessoais"
  | "contato"
  | "localizacao"
  | "objetivo"
  | "saude"
  | "servico"
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
  {
    key: "dados",
    label: "Dados",
    steps: ["dados_pessoais", "contato", "localizacao", "objetivo", "saude"],
  },
  { key: "servico", label: "Serviço", steps: ["servico", "pacote"] },
  { key: "pagamento", label: "Pagamento", steps: ["pagamento_metodo"] },
  { key: "agenda", label: "Agenda", steps: ["agenda_sessoes"] },
  { key: "confirmacao", label: "Confirmação", steps: ["politicas", "resumo"] },
];
