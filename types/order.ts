import type { PatientObjective } from "./booking";

/** Matches the seeded rows in service_plans.key — extend there, not here. */
export type ServicePlanKey =
  | "presencial"
  | "teleconsulta"
  | "protocolo_trimestral"
  | "glp1_essencial"
  | "glp1_premium";

export type PlanTier = "base" | "essential" | "recommended";
export type PaymentMethod = "pix" | "cartao";
export type OrderStatus = "pending" | "confirmed" | "cancelled";
export type SessionStatus = "pending" | "confirmed" | "cancelled" | "completed";

/** service_plans row — every price/feature the admin can edit. */
export type ServicePlan = {
  key: ServicePlanKey;
  name: string;
  duration_minutes: number;
  base_price_cents: number;
  features: string[];
  badge: string | null;
  payment_note: string | null;
  has_tiers: boolean;
  essential_label: string | null;
  essential_price_cents: number | null;
  essential_features: string[] | null;
  recommended_label: string | null;
  recommended_price_cents: number | null;
  recommended_features: string[] | null;
  recommended_badge: string | null;
  savings_message: string | null;
  is_active: boolean;
  sort_order: number;
  updated_at: string;
};

export type ServicePlanUpdate = Partial<Omit<ServicePlan, "key">> & { key: ServicePlanKey };

export type PaymentSettings = {
  id: true;
  card_surcharge_percent: number;
  updated_at: string;
};

export type Order = {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  objective: PatientObjective;
  other_objective: string | null;
  has_locomotion_limitation: boolean;
  service_plan_key: ServicePlanKey;
  selected_tier: PlanTier;
  payment_method: PaymentMethod;
  accepted_reschedule_policy: boolean;
  accepted_cancellation_policy: boolean;
  amount_cents: number;
  status: OrderStatus;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
};

export type OrderInsert = Pick<
  Order,
  | "name"
  | "age"
  | "phone"
  | "email"
  | "objective"
  | "has_locomotion_limitation"
  | "service_plan_key"
  | "selected_tier"
  | "payment_method"
  | "accepted_reschedule_policy"
  | "accepted_cancellation_policy"
  | "amount_cents"
> &
  Partial<Pick<Order, "other_objective">>;

export type OrderSession = {
  id: string;
  order_id: string;
  session_key: string;
  label: string;
  sequence: number;
  session_date: string;
  session_time: string;
  status: SessionStatus;
  reschedule_count: number;
  created_at: string;
  updated_at: string;
};

export type OrderSessionInsert = Pick<
  OrderSession,
  "order_id" | "session_key" | "label" | "sequence" | "session_date" | "session_time"
>;

/** A session slot the patient still needs to schedule, before it's persisted. */
export type PendingSession = {
  key: string;
  label: string;
  sequence: number;
  suggestedOffsetDays: number; // hint only — e.g. "≈20 dias após a consulta inicial"
  date: string | null;
  time: string | null;
};

export type PreConsultationResponses = {
  // Anamnese
  healthComplaints: string;
  diagnosedConditions: string;
  medicationsInUse: string;
  allergiesOrIntolerances: string;
  familyHistory: string;
  sleepQuality: string;
  waterIntakeLiters: string;
  physicalActivity: string;
  bowelHabits: string;
  previousDiets: string;
  mainGoalDescription: string;
  // Recordatório alimentar (dia alimentar típico)
  breakfast: string;
  morningSnack: string;
  lunch: string;
  afternoonSnack: string;
  dinner: string;
  eveningSnack: string;
  additionalNotes: string;
};

export type PreConsultationForm = {
  id: string;
  order_id: string;
  responses: PreConsultationResponses;
  submitted_at: string;
};

export type PreConsultationFormInsert = {
  order_id: string;
  responses: PreConsultationResponses;
};
