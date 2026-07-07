import type { PatientObjective } from "./booking";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

/** @deprecated superseded by ServicePlanKey in types/order.ts */
export type ConsultationType = "presencial" | "teleconsulta";

/**
 * Row shape mirroring the legacy Supabase "appointments" table (see
 * lib/supabase/schema.sql). Superseded by orders/order_sessions
 * (types/order.ts) for new bookings — kept only so `get_booked_slots`
 * still type-checks against any pre-existing rows.
 */
export type Appointment = {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  objective: PatientObjective;
  other_objective: string | null;
  has_limitation: boolean;
  consultation_type: ConsultationType;
  appointment_date: string; // ISO date
  appointment_time: string; // HH:mm
  status: AppointmentStatus;
  payment_status: PaymentStatus;
  amount: number;
  created_at: string;
  updated_at: string;
};

export type AppointmentInsert = Omit<
  Appointment,
  "id" | "created_at" | "updated_at" | "status" | "payment_status"
> & {
  status?: AppointmentStatus;
  payment_status?: PaymentStatus;
};
