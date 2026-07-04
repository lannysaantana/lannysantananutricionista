import type { Appointment } from "./appointment";

/**
 * Minimal typed schema for the Supabase client (see lib/supabase/schema.sql
 * for the full DDL). Extend with `supabase gen types typescript` once the
 * project is linked to a real Supabase instance.
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
