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

export type ConsultationType = "presencial" | "teleconsulta";

export const CONSULTATION_TYPE_LABELS: Record<ConsultationType, string> = {
  presencial: "Consulta Presencial",
  teleconsulta: "Teleconsulta",
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
  hasLimitation: boolean | null;
  consultationType: ConsultationType | null;
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
}

export const INITIAL_BOOKING_DATA: BookingFormData = {
  name: "",
  age: null,
  phone: "",
  email: "",
  objective: null,
  otherObjective: "",
  hasLimitation: null,
  consultationType: null,
  selectedDate: null,
  selectedSlot: null,
};

/** Ordered step identifiers driving the wizard's progress bar. */
export type BookingStep =
  | "nome"
  | "idade"
  | "telefone"
  | "email"
  | "objetivo"
  | "limitacao"
  | "tipo_consulta"
  | "agenda"
  | "resumo";

export interface BookingProgressGroup {
  key: "dados" | "objetivo" | "consulta" | "agenda" | "pagamento";
  label: string;
  steps: BookingStep[];
}

export const BOOKING_PROGRESS_GROUPS: BookingProgressGroup[] = [
  { key: "dados", label: "Dados", steps: ["nome", "idade", "telefone", "email"] },
  { key: "objetivo", label: "Objetivo", steps: ["objetivo", "limitacao"] },
  { key: "consulta", label: "Consulta", steps: ["tipo_consulta"] },
  { key: "agenda", label: "Agenda", steps: ["agenda"] },
  { key: "pagamento", label: "Pagamento", steps: ["resumo"] },
];
