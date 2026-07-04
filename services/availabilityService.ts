import { createClient } from "@/lib/supabase/client";
import type { BusinessHours, BusinessHoursUpdate, BlockedDate } from "@/types/availability";

/** All 7 weekday rows, ordered 0 (Sunday) through 6 (Saturday). */
export async function listBusinessHours(): Promise<BusinessHours[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business_hours")
    .select("*")
    .order("weekday", { ascending: true });

  if (error) throw new Error(`Falha ao carregar horários: ${error.message}`);
  return (data ?? []) as BusinessHours[];
}

export async function updateBusinessHours(row: BusinessHoursUpdate): Promise<BusinessHours> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business_hours")
    .upsert(row, { onConflict: "weekday" })
    .select()
    .single();

  if (error) throw new Error(`Falha ao salvar horário: ${error.message}`);
  return data as BusinessHours;
}

export async function listBlockedDates(): Promise<BlockedDate[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw new Error(`Falha ao carregar dias bloqueados: ${error.message}`);
  return (data ?? []) as BlockedDate[];
}

export async function addBlockedDate(date: string, reason?: string): Promise<BlockedDate> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blocked_dates")
    .insert({ date, reason: reason || null })
    .select()
    .single();

  if (error) throw new Error(`Falha ao bloquear data: ${error.message}`);
  return data as BlockedDate;
}

export async function removeBlockedDate(date: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("blocked_dates").delete().eq("date", date);
  if (error) throw new Error(`Falha ao remover bloqueio: ${error.message}`);
}

/** Times already booked (non-cancelled) on a given date — no patient data exposed. */
export async function getBookedTimes(date: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_booked_slots", { target_date: date });
  if (error) throw new Error(`Falha ao verificar horários ocupados: ${error.message}`);
  return (data ?? []).map((row) => row.appointment_time);
}
