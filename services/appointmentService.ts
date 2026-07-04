import { createClient } from "@/lib/supabase/client";
import type {
  Appointment,
  AppointmentFilters,
  AppointmentInsert,
  AppointmentStatus,
  PaymentStatus,
} from "@/types/appointment";

const TABLE = "appointments";

/** Creates a new appointment (called from the public booking wizard). */
export async function createAppointment(
  input: AppointmentInsert
): Promise<Appointment> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(`Falha ao criar agendamento: ${error.message}`);
  return data as Appointment;
}

/** Lists appointments for the admin dashboard, with optional filters. */
export async function listAppointments(
  filters: AppointmentFilters = {}
): Promise<Appointment[]> {
  const supabase = createClient();
  let query = supabase
    .from(TABLE)
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters.consultationType && filters.consultationType !== "all") {
    query = query.eq("consultation_type", filters.consultationType);
  }
  if (filters.dateFrom) {
    query = query.gte("appointment_date", filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.lte("appointment_date", filters.dateTo);
  }
  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw new Error(`Falha ao carregar agendamentos: ${error.message}`);
  return (data ?? []) as Appointment[];
}

export async function updateAppointment(
  id: string,
  changes: Partial<Appointment>
): Promise<Appointment> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update(changes)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Falha ao atualizar agendamento: ${error.message}`);
  return data as Appointment;
}

export async function cancelAppointment(id: string): Promise<Appointment> {
  return updateAppointment(id, { status: "cancelled" satisfies AppointmentStatus });
}

export async function confirmAppointmentPayment(id: string): Promise<Appointment> {
  return updateAppointment(id, {
    status: "confirmed" satisfies AppointmentStatus,
    payment_status: "paid" satisfies PaymentStatus,
  });
}

export async function deleteAppointment(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`Falha ao excluir agendamento: ${error.message}`);
}
