import type { Appointment } from "./appointment";
import type { BusinessHours, BusinessHoursUpdate, BlockedDate } from "./availability";

/**
 * Minimal typed schema for the Supabase client (see lib/supabase/schema.sql
 * and lib/supabase/migrations/ for the full DDL). Extend with
 * `supabase gen types typescript` once the project is linked to a real
 * Supabase instance.
 */
export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: Appointment;
        Insert: Partial<Appointment> &
          Pick<
            Appointment,
            | "name"
            | "age"
            | "phone"
            | "email"
            | "objective"
            | "has_limitation"
            | "consultation_type"
            | "appointment_date"
            | "appointment_time"
            | "amount"
          >;
        Update: Partial<Appointment>;
        Relationships: [];
      };
      business_hours: {
        Row: BusinessHours;
        Insert: BusinessHoursUpdate;
        Update: Partial<BusinessHoursUpdate>;
        Relationships: [];
      };
      blocked_dates: {
        Row: BlockedDate;
        Insert: Pick<BlockedDate, "date"> & Partial<Pick<BlockedDate, "reason">>;
        Update: Partial<BlockedDate>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_booked_slots: {
        Args: { target_date: string };
        Returns: { appointment_time: string }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
