import type { Appointment } from "./appointment";
import type { BusinessHours, BusinessHoursUpdate, BlockedDate } from "./availability";
import type {
  Order,
  OrderInsert,
  OrderSession,
  OrderSessionInsert,
  PreConsultationForm,
  PreConsultationFormInsert,
  ServicePlan,
  ServicePlanUpdate,
  PaymentSettings,
} from "./order";

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
      orders: {
        Row: Order;
        Insert: OrderInsert;
        Update: Partial<Order>;
        Relationships: [];
      };
      order_sessions: {
        Row: OrderSession;
        Insert: OrderSessionInsert;
        Update: Partial<OrderSession>;
        Relationships: [];
      };
      pre_consultation_forms: {
        Row: PreConsultationForm;
        Insert: PreConsultationFormInsert;
        Update: Partial<PreConsultationFormInsert>;
        Relationships: [];
      };
      service_plans: {
        Row: ServicePlan;
        Insert: ServicePlanUpdate;
        Update: Partial<ServicePlan>;
        Relationships: [];
      };
      payment_settings: {
        Row: PaymentSettings;
        Insert: Partial<PaymentSettings>;
        Update: Partial<PaymentSettings>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_booked_slots: {
        Args: { target_date: string };
        Returns: { appointment_time: string }[];
      };
      get_booked_session_slots: {
        Args: { target_date: string };
        Returns: { session_time: string }[];
      };
      has_previous_order: {
        Args: { patient_email: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
