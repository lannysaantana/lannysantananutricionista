import type { ConsultationType, PatientObjective } from "./booking";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

/**
 * Row shape mirroring the Supabase "appointments" table.
 * Keep in sync with lib/supabase/schema.sql.
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

export interface AppointmentFilters {
  search?: string;
  status?: AppointmentStatus | "all";
  consultationType?: ConsultationType | "all";
  dateFrom?: string;
  dateTo?: string;
}
